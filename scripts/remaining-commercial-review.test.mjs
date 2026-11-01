import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { JSDOM } from 'jsdom';
const page = route => new JSDOM(fs.readFileSync(`dist/${route}/index.html`, 'utf8')).window.document;
test('UK service proof describes scope and preserves its case destination', () => {
 const d = page('seo-services-uk');
 const card = d.querySelector('.forge-proof-card');
 assert.equal(card.querySelector('.forge-card-value').textContent.trim(), 'Campaign scope.');
 assert.match(card.textContent, /UK storefront · project work and measurement limits/);
 assert.equal(card.getAttribute('href'), '/case-studies/speediance-uk-fitness-seo/');
 assert.doesNotMatch(d.querySelector('main').textContent, /119%|4\.74K|2\.16K/);
});
test('independent editorial repairs remove misdirection and unsupported generic outcomes', () => {
 const texts = Object.fromEntries(['seo-services-uk','seo-services-usa','ecommerce-seo-services','saas-seo-services'].map(r => [r, page(r).querySelector('main').textContent]));
 assert.doesNotMatch(texts['seo-services-uk'], /project below|18\+ month UK partnerships/);
 assert.doesNotMatch(texts['seo-services-usa'], /lower average position|brutal US|most passionate consumer/);
 assert.doesNotMatch(texts['ecommerce-seo-services'], /projects below|that win the long tail/);
 assert.doesNotMatch(texts['saas-seo-services'], /become link magnets|by pipeline impact/);
});
test('supported ecommerce, software and Australian hero results remain visible', () => {
 for (const [route, value] of [['ecommerce-seo-services','+49.3%'],['saas-seo-services','+34%'],['seo-services-australia','+66%'],['seo-services-new-zealand','+177%']]) {
  assert.equal(page(route).querySelector('.forge-proof-card .forge-card-value').textContent.trim(), value, route);
 }
 const d = page('case-studies/speediance-uk-fitness-seo');
 assert.equal(d.querySelector('.forge-proof-card').getAttribute('href'), '#campaign-measurement');
 assert.equal(d.querySelector('.forge-card-value').textContent.trim(), 'Campaign scope.');
});
