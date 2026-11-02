import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
test('new article schema identifies team as organization and keeps illustration uncropped', () => {
 const doc = new JSDOM(readFileSync('dist/blog/why-invest-in-seo-and-ai-search/index.html','utf8')).window.document;
 const schema = [...doc.querySelectorAll('script[type="application/ld+json"]')].map(e=>JSON.parse(e.textContent)).find(x=>x['@type']==='BlogPosting');
 assert.equal(schema.author['@type'],'Organization');
 assert.match(schema.datePublished,/^\d{4}-\d\d-\d\dT/);
 assert.equal(doc.querySelector('.featured-image img').style.objectFit,'contain');
});
