import fs from 'node:fs';
import path from 'node:path';
import {JSDOM} from 'jsdom';
const root = process.cwd(), dist=path.join(root,'dist'), baseline='/home/benecho/state/backups/brightforge-site/sculptural-hero-before/dist';
const files=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(d,e.name)):[path.join(d,e.name)]);
const norm=s=>s.replace(/\s+/g,' ').trim();
const doc=p=>new JSDOM(fs.readFileSync(p,'utf8')).window.document;
const route=f=>'/'+path.relative(dist,f).replace(/index\.html$/,'').replace(/\\/g,'/');
const rows=[],errors=[];
for(const f of files(dist).filter(f=>f.endsWith('.html')&&!['__forms.html','google-site-verification.html'].includes(path.basename(f)))){
 const d=doc(f),p=route(f), old=path.join(baseline,path.relative(dist,f));
 const row={route:p,h1:norm(d.querySelector('h1')?.textContent||''),hero:d.querySelectorAll('[data-hero-design="sculptural"]').length,cards:d.querySelectorAll('.forge-proof-card').length,firstCard:d.querySelector('.forge-proof-card')?.textContent.trim(),problems:[]};
 if(row.hero!==1)row.problems.push('Expected one supplied-design hero');
 if(row.cards!==3)row.problems.push('Expected three proof cards');
 if(d.querySelectorAll('h1').length!==1)row.problems.push('Expected one H1');
 if(fs.existsSync(old)){
  const b=doc(old);
  if(norm(b.querySelector('h1')?.textContent||'')!==row.h1)row.problems.push('Original H1 changed');
  for(const sel of ['head > title','link[rel="canonical"]','meta[name="description"]','meta[name="robots"]']){
   const val=e=>e?.getAttribute('content')??e?.getAttribute('href')??e?.textContent??'';
   if(val(b.querySelector(sel))!==val(d.querySelector(sel)))row.problems.push(`Head changed: ${sel}`);
  }
  const schema=x=>[...x.querySelectorAll('script[type="application/ld+json"]')].map(e=>norm(e.textContent));
  if(JSON.stringify(schema(b))!==JSON.stringify(schema(d)))row.problems.push('Structured data changed');
  // Preserve every original paragraph verbatim, allowing its layout/location to change.
  const paragraphs=[...d.querySelectorAll('p')].map(e=>norm(e.textContent));
  const missing=[...b.querySelectorAll('p')].map(e=>norm(e.textContent)).filter(t=>t && !paragraphs.includes(t));
  if(missing.length){row.missingParagraphs=missing;row.problems.push('Original paragraphs missing');}
  const oldHrefs=[...b.querySelectorAll('.navbar-professional a')].map(e=>e.getAttribute('href'));
  const newHrefs=[...d.querySelectorAll('.navbar-professional a')].map(e=>e.getAttribute('href'));
  if(JSON.stringify(oldHrefs)!==JSON.stringify(newHrefs))row.problems.push('Header destinations changed');
 }
 for(const a of d.querySelectorAll('.forge-proof-card,.forge-actions a,.forge-work-link')){
  const href=a.getAttribute('href');if(!href)continue;
  if(href.startsWith('#')){if(!d.getElementById(href.slice(1)))row.problems.push(`Missing anchor ${href}`);}
  else if(href.startsWith('/')&&!href.startsWith('//')){
   const [url,hash]=href.split('#');let target=path.join(dist,url);if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'index.html');
   if(!fs.existsSync(target))row.problems.push(`Missing destination ${href}`);
   else if(hash&&!doc(target).getElementById(hash))row.problems.push(`Missing destination anchor ${href}`);
  }
 }
 if(row.problems.length)errors.push({route:p,problems:row.problems});rows.push(row);
}
fs.mkdirSync('qa-artifacts/sculptural-hero',{recursive:true});
fs.writeFileSync('qa-artifacts/sculptural-hero/route-inventory.json',JSON.stringify({count:rows.length,errors,rows},null,2));
console.log(JSON.stringify({routes:rows.length,errors,missingParagraphs:rows.filter(r=>r.missingParagraphs).map(r=>({route:r.route,missing:r.missingParagraphs}))},null,2));
process.exitCode=errors.length?1:0;
