import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
const routes=['technical-seo-services-philippines','seo-audit-services','keyword-research-services','on-page-seo-services-philippines','content-seo-services-philippines','website-migration-services'];
for(const route of routes){
 const doc=new JSDOM(fs.readFileSync(`dist/${route}/index.html`,'utf8')).window.document;
 assert.equal(doc.querySelectorAll('h1').length,1,route);
 assert.equal(doc.querySelector('link[rel=canonical]').href,`https://brightforge.com.ph/${route}/`);
 assert(doc.querySelector('h1 span'),`${route}: meaningful H1 emphasis retained`);
 const main=doc.querySelector('main');
 const visibleFAQs=[...main.querySelectorAll('details')].map(e=>({question:e.querySelector('summary').textContent.trim(),answer:e.querySelector('p').textContent.trim()}));
 const schemas=[...doc.querySelectorAll('script[type="application/ld+json"]')].flatMap(e=>{const d=JSON.parse(e.textContent);return Array.isArray(d)?d:d['@graph']||[d]});
 const faqs=schemas.filter(s=>s['@type']==='FAQPage').flatMap(s=>s.mainEntity);
 assert.equal(faqs.length,visibleFAQs.length,`${route}: FAQ count`);
 for(const faq of faqs)assert(visibleFAQs.some(v=>v.question===faq.name&&v.answer===faq.acceptedAnswer.text),`${route}: FAQ parity ${faq.name}`);
 for(const a of main.querySelectorAll('a[href]')){
  const href=a.getAttribute('href');
  if(href.startsWith('/')&&!href.startsWith('//')){
   const local=path.join('dist',href.split(/[?#]/)[0]);
   assert(fs.existsSync(local)||fs.existsSync(path.join(local,'index.html')),`${route}: broken internal destination ${href}`);
  }
  if(href.startsWith('#'))assert(doc.getElementById(href.slice(1)),`${route}: broken anchor ${href}`);
 }
 assert(main.querySelector('a[href="/contact/"]'),`${route}: enquiry route retained`);
 console.log(`PASS built ${route}: canonical, H1, FAQ parity, destinations and CTA`);
}
