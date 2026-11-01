import fs from 'node:fs';
import assert from 'node:assert/strict';
const checks = {
 'technical-seo-services-philippines': {absent:['crawl equity','Thin or conflicting canonical','Slow pages, broken tracking, poor mobile layouts'],present:['pre-repair review of our own website','Redirect chains adding unnecessary requests']},
 'seo-audit-services': {absent:['A ranking issue can be caused by crawl waste'],present:['A page can also rank well but fail to generate enquiries.']},
 'keyword-research-services': {absent:[],present:['Illustrative example: Australia','not measured demand']},
 'on-page-seo-services-philippines': {absent:['the page itself usually needs work'],present:['check query fit, tracking and the enquiry route before choosing edits']},
 'content-seo-services-philippines': {absent:['google.co.uk','That is how content becomes a growth asset'],present:['UK-localised search results']},
 'website-migration-services': {absent:['usually lazy and risky','What we will not <span>promise</span>','without losing useful equity'],present:['Launch decisions','Redirect exceptions','Tracking acceptance']}
};
for (const slug of process.argv[2] ? [process.argv[2]] : Object.keys(checks)) {
 const s=fs.readFileSync(`src/pages/${slug}.astro`,'utf8');
 for(const text of checks[slug].absent) assert(!s.includes(text),`${slug}: unsupported or imprecise copy: ${text}`);
 for(const text of checks[slug].present) assert(s.includes(text),`${slug}: missing clarification: ${text}`);
 console.log(`PASS editorial ${slug}`);
}
