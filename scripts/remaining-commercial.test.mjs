import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const routes=['seo-services-uk','seo-services-usa','ecommerce-seo-services','saas-seo-services'];
for(const route of routes) test(`${route}: avoids unsupported delivery and causal claims`,()=>{
 const s=fs.readFileSync(`src/pages/${route}.astro`,'utf8').split('<style')[0];
 assert.doesNotMatch(s,/—|monthly clicks|268k a month|page-one territory|without cannibali|driven by category|better snippets|Overnight turnaround|Done While You Sleep|12 five-star|Sarah Thompson|£300|£1,100|\$2,500|\$5,000|highest-converting|invoice factories|eventually torch|Most offshore providers hide|Luke, Marketing Director|Your Paid CAC Keeps|Compounding Organic Revenue/);
 assert.match(s,/comparison|scope/i);
});
for(const route of routes) test(`${route}: does not reuse unsupported AI analytics as proof`,()=>{
 const source=fs.readFileSync(`src/pages/${route}.astro`,'utf8').split('<style')[0];
 assert.doesNotMatch(source,/4,549|1,322|1,660%|434\.7%|405%|662%|8\.2%|7:11|239 AI|80 countries|75 countries/);
});
