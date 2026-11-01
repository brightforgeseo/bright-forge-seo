import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { JSDOM } from 'jsdom';
const page = (route='') => new JSDOM(fs.readFileSync(`dist/${route ? route+'/' : ''}index.html`, 'utf8')).window.document;
const norm = value => new JSDOM(`<body>${value}</body>`).window.document.body.textContent.replace(/\s+/g,' ').trim();
const schemas = d => [...d.querySelectorAll('script[type="application/ld+json"]')].flatMap(s => { const v=JSON.parse(s.textContent); return v['@graph'] || [v]; });
const faq = d => schemas(d).filter(s=>s['@type']==='FAQPage');
const source = name => fs.readFileSync(`src/${name}.astro`,'utf8');
test('homepage first screen includes all four buyers without unverified catalogue or billing claims',()=>{
 const s=source('pages/index').split('<!-- Commercial Proof')[0];
 assert.match(s,/Philippine, Australian, UK and US businesses/);
 assert.doesNotMatch(s,/17 published|trustBadgeCount="17"|We bill in GBP or USD/);
 assert.match(s,/title="SEO Agency Philippines for Enquiries, Not Vanity Traffic"/);
});
test('low CTR prompts investigation rather than a trust diagnosis',()=>{
 const s=source('components/HomepageSearchLab');
 assert.doesNotMatch(s,/Position 6 with almost no clicks is a trust problem/);
 assert.match(s,/query mix, device and SERP features/);
});
test('homepage case cards label Search Console clicks, preserving comparison periods',()=>{
 const s=source('pages/index');
 const cards=s.split('<!-- Cards Grid -->')[1].split('<!-- Revenue')[0];
 assert.doesNotMatch(cards,/Organic Traffic Growth|>Organic Traffic< /);
 assert.match(cards,/137.5% Organic Click Growth/);
 assert.match(cards,/34% Organic Click Growth/);
 assert.match(cards,/3 mo\./);
});
test('managed services uses inspectable published proof rather than undefined website count',()=>{
 const s=source('pages/seo-services-philippines');
 assert.doesNotMatch(s,/1000\+|Websites Ranked/);
 assert.match(s,/Published<\/span>/);
 assert.match(s,/Case Studies<\/span>/);
});
test('Australia promise and pricing claims stay within agreed scope',()=>{
 const s=source('pages/seo-services-australia').split('<style>')[0];
 for (const claim of [/same working day/,/behind AEST/,/our 8am desk/,/Same-day answers/,/A\$[0-9]/,/17 case studies/,/17 published case studies/,/Good SEO now earns/]) assert.doesNotMatch(s,claim);
 assert.match(s,/9:00 Manila/); assert.match(s,/AEDT/); assert.match(s,/agreed delivery/); assert.match(s,/AUD/);
 assert.match(s,/6,550 → 10,900/); assert.match(s,/site-wide/); assert.match(s,/aggregate position worsened/);
});
test('NZ case and NZ service share the supported six-month hero comparison',()=>{
 for(const route of ['case-studies/speediance-nz-fitness-seo','seo-services-new-zealand']) {
  const d=page(route); const proof=d.querySelector('.forge-proof-grid').textContent;
  assert.match(proof,/6-month comparison/); assert.doesNotMatch(proof,/3-month comparison/);
 }
});
test('UK cleared case advertises scope rather than unsupported numeric results',()=>{
 const d=page('case-studies/speediance-uk-fitness-seo');
 assert.doesNotMatch(d.body.textContent,/119%/); assert.match(d.body.textContent,/Campaign scope\./);
 assert.match(d.body.textContent,/not a campaign performance chart/);
});
test('shared contact asks for website context without promising response time',()=>{
 const d=page('editorial-standards'); const c=d.querySelector('.contact-cta-section');
 assert.match(c.textContent,/Tell us about your website, target market/);
 assert.doesNotMatch(c.textContent,/one business day|Free Consultation/);
 assert.equal(c.querySelector('a[href="/contact/"]').textContent.trim(),'Discuss Your Website');
});
test('white-label market cards use agreed handovers rather than overnight promises',()=>{
 const d=page('white-label-seo-services-philippines'); const text=d.querySelector('.market-ledger').textContent;
 assert.doesNotMatch(text,/Same-day agency support|before the next UK working day|next US working day/);
 assert.match(text,/delivery dates and review windows agreed/);
});
test('editorial standards has no invisible FAQ schema',()=> assert.equal(faq(page('editorial-standards')).length,0));
test('homepage FAQ questions and complete answers match visible accordion', () => {
 const d=page(); const visible=[...d.querySelectorAll('.faq-container details')].map(e=>({q:norm(e.querySelector('summary').textContent),a:norm(e.querySelector('p').innerHTML)}));
 assert.equal(visible.length,7); assert.equal(faq(d).length,1);
 assert.deepEqual(faq(d)[0].mainEntity.map(e=>({q:norm(e.name),a:norm(e.acceptedAnswer.text)})),visible);
 assert.ok(d.querySelector('.faq-container a[href="/ai-search-optimization-services-philippines/"]'));
});
