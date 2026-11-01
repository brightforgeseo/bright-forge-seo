import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
const base='da055f710e7d6060ed6f76748d34b034a9b4ad74';
const routes=['backlink-seo-services-philippines','local-seo-for-google-maps-and-gbp','construction-seo-services','home-services-seo','legal-seo-services','real-estate-seo-services'];
const read=r=>fs.readFileSync(`src/pages/${r}.astro`,'utf8');
for(const r of routes) test(`${r}: preserve design, title/H1 ownership, media and existing links`,()=>{
 const old=execFileSync('git',['show',`${base}:src/pages/${r}.astro`],{encoding:'utf8'}),now=read(r);
 const matches=(s,re)=>[...s.matchAll(re)].map(m=>m[0]);
 const preserved=[/<style[\s\S]*?<\/style>/g,/<img\b[^>]+>/g];
 if(r!==routes[0]) preserved.push(/<MainLayout\s+title="[^"]+"/g,/<Hero[\s\S]*?title="[^"]+"/g);
 for(const re of preserved) assert.deepEqual(matches(now,re),matches(old,re));
 if(r===routes[0]) {
  assert.ok(now.includes('title="Link Building Services Philippines | Backlink Outreach"'));
  assert.ok(now.includes('title="Link Building Services Philippines for <span>Relevant Backlinks</span>"'));
  assert.ok(!/Safe SEO Backlinks|Safer SEO Authority|Safe Link Building|safer authority growth/.test(now));
 }
 for(const href of matches(old,/href="[^"]+"/g)) assert.ok(now.includes(href),`${r}: removed ${href}`);
 assert.ok(!now.includes('—'));
});
test('shared proof is explicitly bounded on home and property routes',()=>{
 assert.ok(read(routes[3]).includes('not plumbing or HVAC bookings'));
 assert.ok(read(routes[5]).includes('adjacent construction experience'));
 assert.ok(read(routes[1]).includes('not Google Maps actions'));
});
test('real estate: listing lifecycle, feed ownership and enquiry definitions',()=>{
 const s=read(routes[5]);
 for(const word of ['sold','feed provider','viewing','content rights','availability']) assert.ok(s.includes(word),word);
 for(const phrase of ['Intent before content','Proof over filler','Usually both, but existing service, product']) assert.ok(!s.includes(phrase),phrase);
});
test('legal: jurisdiction review, sensitive intake and noncausal evidence',()=>{
 const s=read(routes[4]);
 for(const word of ['advertising','jurisdiction','sensitive','signed matters','2,065']) assert.ok(s.includes(word),word);
 for(const phrase of ['People do not search for a generic law firm','thin copy and invented claims get ignored','each need their own URL']) assert.ok(!s.includes(phrase),phrase);
});
test('home services: job fit, hours and operational outcome ownership',()=>{
 const s=read(routes[3]);
 for(const word of ['missed calls','emergency','dispatch','postcode','/local-seo-for-google-maps-and-gbp/']) assert.ok(s.includes(word),word);
 for(const phrase of ['protect lead quality','Intent before content','Proof over filler','Usually both, but existing service, product']) assert.ok(!s.includes(phrase),phrase);
});
test('construction: buyer specification and bounded click evidence',()=>{
 const s=read(routes[2]);
 for(const word of ['PDF','Illustrative page brief','supplier','query mix','additional clicks']) assert.ok(s.includes(word),word);
 for(const phrase of ['extra visits','+4,621 visits','+350 visits','CTR did the work','One page per trade or product','Every distinct service or product line that people search for needs its own page']) assert.ok(!s.includes(phrase),phrase);
});
test('local GBP: eligibility, available features and distinct action metrics',()=>{
 const s=read(routes[1]);
 for(const word of ['call-button clicks','hide the address','available on your profile','Australia, the UK and the USA']) assert.ok(s.includes(word),word);
 for(const phrase of ['two to six months','posts, Q&A','<strong>Leads</strong>']) assert.ok(!s.includes(phrase),phrase);
});
test('backlinks: approval, paid-link qualification and exceptional disavow',()=>{
 const s=read(routes[0]);
 for(const word of ['rel="sponsored"','nofollow','manual action','publisher decides','Illustrative prospect decision']) assert.ok(s.includes(word),word);
 for(const phrase of ['anchor text control','obvious toxic sources','anchors around brand, relevance, intent and safety']) assert.ok(!s.includes(phrase),phrase);
});
