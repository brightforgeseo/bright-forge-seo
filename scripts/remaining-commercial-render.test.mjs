import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {JSDOM} from 'jsdom';
for(const route of ['seo-services-uk','seo-services-usa','ecommerce-seo-services','saas-seo-services']) {
 test(`${route}: built intent, FAQ schema and hero remain coherent`,()=>{
  const d=new JSDOM(fs.readFileSync(`dist/${route}/index.html`,'utf8')).window.document;
  assert.equal(d.querySelectorAll('h1').length,1);
  assert.ok(d.querySelector('h1 span').textContent.trim());
  assert.equal(d.querySelector('link[rel="canonical"]').href,`https://brightforge.com.ph/${route}/`);
  // CRO now carries the buyer context instead of dropping it at generic contact.
  const contact = route === 'seo-services-uk' ? '/contact/?service=seo-services&market=UK#contactForm'
    : route === 'seo-services-usa' ? '/contact/?service=seo-services&market=US#contactForm' : '/contact/';
  assert.ok([...d.querySelectorAll('.forge-actions a')].some(a => a.getAttribute('href') === contact));
  assert.equal(d.querySelector('.forge-sculpture').getAttribute('src'),'/assets/forge-conversions-corrected-960.webp');
  const nodes=[...d.querySelectorAll('script[type="application/ld+json"]')].flatMap(n=>{const j=JSON.parse(n.textContent);return j['@graph']||[j];});
  const faqs=nodes.filter(n=>n['@type']==='FAQPage').flatMap(n=>n.mainEntity);
  assert.deepEqual(faqs.map(q=>[q.name,q.acceptedAnswer.text]),[...d.querySelectorAll('details.faq-item')].map(n=>[n.querySelector('summary').textContent.trim(),n.querySelector('p').textContent.trim()]));
  assert.doesNotMatch(d.querySelector('main').textContent,/4,549|1,322|1,660%|434\.7%|405%|8\.2%|7:11|239 AI|monthly clicks|268k a month/);
  if(route.endsWith('-uk')||route.endsWith('-usa'))assert.ok(d.querySelectorAll('link[hreflang]').length>=4);
 });
}
