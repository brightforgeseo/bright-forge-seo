import fs from 'node:fs';
import assert from 'node:assert/strict';
const contracts = {
 'technical-seo-services-philippines': ['Reproduce the fault', 'release owner', '/samples/technical-review-handoff.csv', 'recrawl'],
 'seo-audit-services': ['Illustrative audit decision', 'Evidence to collect', 'Acceptance check', 'separately agreed'],
 'keyword-research-services': ['Illustrative keyword-map row', 'Rejected alternative', 'Market inputs', 'not measured demand'],
 'on-page-seo-services-philippines': ['Illustrative page revision', 'Client approval', 'Publishing responsibility', 'release date'],
 'content-seo-services-philippines': ['What we need from you', 'Claim and source review', 'Publishing responsibility', 'revision rounds'],
 'website-migration-services': ['Illustrative redirect-map entry', 'Exception decision', 'rollback', 'monitoring period'],
};
const banned={
 'technical-seo-services-philippines':['within weeks','one to three months','next US morning','spreadsheet graveyard','Protect rankings during migrations'],
 'seo-audit-services':['This page is the diagnosis','Fixes live on technical','support those lanes'],
 'keyword-research-services':['spreadsheet nobody uses','A long spreadsheet is not a strategy'],
 'on-page-seo-services-philippines':['No thin AI padding'],
 'content-seo-services-philippines':['This page is the writing','as a product lives','move the needle fastest'],
 'website-migration-services':['Most <span>migration losses</span> are preventable'],
};
const chosen=process.argv[2]?[process.argv[2]]:Object.keys(contracts);
for(const slug of chosen){
 const s=fs.readFileSync(`src/pages/${slug}.astro`,'utf8');
 for(const term of contracts[slug])assert(s.includes(term),`${slug}: missing buyer detail: ${term}`);
 for(const term of banned[slug])assert(!s.includes(term),`${slug}: stale copy: ${term}`);
 assert(!s.includes('—'),`${slug}: em dash`);
 assert(s.includes('faqs={'),`${slug}: FAQ schema binding`);
 assert(s.includes('<span>'),`${slug}: heading emphasis`);
 console.log(`PASS ${slug}`);
}
