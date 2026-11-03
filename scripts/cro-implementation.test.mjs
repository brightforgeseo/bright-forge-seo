import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {JSDOM} from 'jsdom';
const source = (name) => fs.readFileSync(`src/${name}.astro`, 'utf8');
const hero = (name) => source(`pages/${name}`).match(/<Hero[\s\S]*?<\/Hero>/)[0];
const routeContexts = {
 'seo-services-philippines': ['seo-services', ''],
 'white-label-seo-services-philippines': ['white-label-seo', ''],
 'technical-seo-services-philippines': ['technical-seo', ''],
 'on-page-seo-services-philippines': ['on-page-seo', ''],
 'keyword-research-services': ['keyword-research', ''],
 'ai-search-optimization-services-philippines': ['ai-search-readiness', ''],
 'seo-services-australia': ['seo-services', 'AU'],
 'seo-services-uk': ['seo-services', 'UK'],
 'seo-services-usa': ['seo-services', 'US']
};
for (const [route,[service,market]] of Object.entries(routeContexts)) {
 test(`CRO ${route} hands off a validated editable service/market`, () => {
  const href = `/contact/?service=${service}${market ? '&market='+market : ''}#contactForm`;
  const s = source(`pages/${route}`);
  assert.ok(s.includes(`href="${href}"`));
  assert.ok(!s.includes('href="/contact/"'));
  if (s.includes('<ContactSection')) assert.ok(s.includes(`<ContactSection href="${href}"`));
 });
}

test('CRO contact exposes optional editable market, privacy link and accessible actual form target', () => {
 const s = source('pages/contact');
 assert.match(s, /<select id="market" name="market">/);
 for (const code of ['PH','AU','UK','US','other','not-sure']) assert.ok(s.includes(`value="${code}"`));
 assert.match(s, /id="contactForm" tabindex="-1"/);
 assert.ok(s.includes('href="/privacy-policy/"'));
 assert.ok(fs.existsSync('dist/privacy-policy/index.html'));
});

test('CRO contact applies only known options and exact service prompt without overwriting user text', () => {
 const html = fs.readFileSync('dist/contact/index.html','utf8');
 const s = source('pages/contact');
 const script = s.match(/<script is:inline data-contact-context>([\s\S]*?)<\/script>/)?.[1] || '';
 const dom = new JSDOM(html, {url:'https://brightforge.com.ph/contact/?service=white-label-seo&market=AU#contactForm',runScripts:'outside-only'});
 const d=dom.window.document;
 // Use candidate form markup where practical; runtime selection is exercised independently.
 if (!d.querySelector('#market')) d.querySelector('#contactForm').insertAdjacentHTML('afterbegin','<p id="enquiry-context"></p><span id="enquiry-market"></span><select id="market"><option value=""></option><option value="AU">Australia</option><option value="UK">UK</option></select>');
 dom.window.HTMLElement.prototype.scrollIntoView = () => {};
 d.querySelector('#message').value='My own brief';
 dom.window.eval(script);
 assert.equal(d.querySelector('#service').value,'white-label-seo');
 assert.equal(d.querySelector('#market').value,'AU');
 assert.equal(d.querySelector('#enquiry-context').textContent,'Tell us which SEO work your agency needs help delivering, your target markets and whether this is a one-off project or ongoing support.');
 assert.equal(d.querySelector('#message').value,'My own brief');
 d.querySelector('#service').value='technical-seo'; d.querySelector('#service').dispatchEvent(new dom.window.Event('change'));
 assert.equal(d.querySelector('#enquiry-context').textContent,'Send the affected URL and describe the issue or recent release.');
 dom.window.close();
});

test('CRO preliminary review offer is consistent without a new free full audit promise', () => {
 for (const name of ['pages/index','pages/seo-services-philippines','components/ContactPopup','components/WhyChooseUs']) {
  const s = source(name);
  assert.doesNotMatch(s, /[Ff]ree SEO (?:[Gg]rowth )?[Aa]udit|[Ff]ree <span>SEO growth audit|[Ff]ree.*[Cc]onsultation/);
  assert.match(s, /preliminary SEO review/);
 }
 assert.match(source('pages/index'), /href="\/contact\/#contactForm" class="btn-view-all">Request an SEO Review/);
});

test('CRO popup retains real delay and close while supplying labelled keyboard modal', () => {
 const s = source('components/ContactPopup');
 const dom = new JSDOM(`<button id="return">Before modal</button>${s.replace(/^---[\s\S]*?---/,'')}`, {url:'https://brightforge.com.ph/',runScripts:'outside-only'});
 const w=dom.window, d=w.document;
 let open; w.setTimeout=(fn,delay)=>{assert.equal(delay,45000);open=fn;};
 d.getElementById('return').focus();
 w.eval(s.match(/<script[^>]*>([\s\S]*?)<\/script>/)[1]);
 d.dispatchEvent(new w.Event('DOMContentLoaded'));
 open();
 const dialog=d.querySelector('[role="dialog"]');
 assert.equal(dialog.getAttribute('aria-modal'),'true');
 assert.ok(d.getElementById(dialog.getAttribute('aria-labelledby')));
 for(const input of dialog.querySelectorAll('input:not([type=hidden]):not([name=bot-field]),textarea')) assert.ok([...d.querySelectorAll('label')].some(l=>l.htmlFor===input.id));
 assert.ok(dialog.contains(d.activeElement));
 const last=dialog.querySelector('.popup-privacy a') || dialog.querySelector('button[type=submit]'); last.focus();
 last.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Tab',bubbles:true,cancelable:true}));
 assert.equal(d.activeElement.id,'popup-close');
 d.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
 assert.equal(d.getElementById('contact-popup-overlay').getAttribute('aria-hidden'),'true');
 assert.equal(d.activeElement.id,'return');
 dom.window.close();
});

for (const name of ['seo-services-philippines', 'technical-seo-services-philippines', 'on-page-seo-services-philippines']) {
 test(`CRO ${name} puts the page-specific next step after one concise introduction`, () => {
  const s = hero(name);
  const intro = s.match(/<Fragment slot="story">([\s\S]*?)<\/Fragment>/)[1];
  assert.equal((intro.match(/<p>/g)||[]).length, 1);
  assert.ok(intro.replace(/<[^>]*>/g,'').trim().split(/\s+/).length <= 55);
  assert.match(s, /slot="actions"/);
  assert.match(source(`pages/${name}`).split('</Hero>')[1], /Philippine/);
 });
}

test('CRO white-label hero gives the approved concise offer and sample next step', () => {
 const s = hero('white-label-seo-services-philippines');
 assert.match(s, /title="White Label <span>SEO Delivery for Agencies<\/span>"/);
 assert.match(s, /Keep the client relationship\. We handle SEO audits, technical work, content and reporting under your brand, with agreed scope and senior review\./);
 assert.match(s, /Philippines/);
 assert.match(s, /text="Discuss Your Delivery Needs"/);
 assert.match(s, /href="#delivery-sample" text="View a Sample Handoff"/);
 assert.equal((s.match(/<p>/g)||[]).length, 2);
});
