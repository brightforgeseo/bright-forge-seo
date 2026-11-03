import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {JSDOM, VirtualConsole} from 'jsdom';
const component = n => fs.readFileSync(`src/components/${n}.astro`,'utf8');
const inline = s => s.match(/<script[^>]*>([\s\S]*?)<\/script>/)[1];
function setup({url='https://brightforge.com.ph/contact/', response={ok:true}, stored=null, first=null, storageBlocked=false}={}) {
 const html=`<link rel="canonical" href="https://brightforge.com.ph/contact/"><form name="contact" data-lead-form="contact-page" method="POST" action="/thanks/"><input name="form-name" value="contact" type="hidden"><input name="name" required value="Local Test"><input type="email" name="email" required value="local@example.invalid"><textarea name="message" required>Local test only</textarea><button type="submit">Send</button></form>`;
 const vc=new VirtualConsole();
 const dom=new JSDOM(html,{url,referrer:'https://www.google.com/search?q=private@example.invalid',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc});
 const w=dom.window; const requests=[],events=[];
 w.gtag=(...args)=>events.push(args);
 w.fetch=(...args)=>{requests.push(args);return response instanceof Error ? Promise.reject(response) : Promise.resolve(response);};
 if(stored) w.sessionStorage.setItem('bf_pending_lead_v1',JSON.stringify(stored));
 if(first) w.localStorage.setItem('bf_first_touch_v1',JSON.stringify(first));
 if(storageBlocked) for(const name of ['localStorage','sessionStorage']) Object.defineProperty(w,name,{get(){throw new Error('Storage blocked');}});
 w.knownAnalyticsPaths=['/','/contact/','/thanks/','/keyword-research-services/'];
 w.eval(inline(component('AnalyticsScope')));
 w.eval(inline(component('LeadTracking')));
 const form=w.document.querySelector('form');
 const submit=()=>{const e=new w.Event('submit',{bubbles:true,cancelable:true});form.dispatchEvent(e);return e;};
 return {w,dom,form,submit,requests,events,leads:()=>events.filter(e=>e[1]==='generate_lead')};
}
const settle = () => new Promise(resolve=>setImmediate(resolve));
test('CRO unavailable browser storage objects do not break editable forms or accepted-only tracking',async()=>{
 const h=setup({storageBlocked:true});h.submit();await settle();
 assert.equal(h.leads().length,1);assert.equal(h.requests.length,1);h.dom.window.close();
});
test('CRO privacy drops PII/unsafe UTMs, strips referrer path and cleans legacy first touch',()=>{
 const h=setup({url:'https://brightforge.com.ph/contact/?service=technical-seo&market=UK&utm_source=private%40example.invalid&utm_medium=cpc&utm_campaign=customer-123456789&utm_term=private%40example.invalid&email=private%40example.invalid',first:{captured_at:Date.now(),landing_page:'https://brightforge.com.ph/contact/?email=private@example.invalid',referrer:'https://www.google.com/search?q=private@example.invalid',utm_source:'private@example.invalid',utm_medium:'cpc',utm_campaign:'customer-123456789'}});
 const a=h.w.BFLeadTracking.attribution;
 assert.equal(a.utm_source,''); assert.equal(a.utm_campaign,''); assert.equal(a.utm_term,'');
 assert.equal(a.utm_medium,'cpc'); assert.equal(a.referrer,'https://www.google.com');
 assert.ok(!JSON.stringify(a).includes('private'));
 assert.ok(!h.w.localStorage.getItem('bf_first_touch_v1').includes('private'));
 assert.equal(h.w.location.search,'?service=technical-seo&market=UK&utm_medium=cpc');
 const settings=h.events.find(e=>e[0]==='set');
 assert.equal(settings[1].page_location,'https://brightforge.com.ph/contact/');
 assert.ok(!JSON.stringify(h.events).includes('private'));
 h.dom.window.close();
});
test('CRO first touch is preserved across pages and delayed refresh repairs reset hidden fields',()=>{
 const h=setup({url:'https://brightforge.com.ph/contact/?utm_source=google&utm_medium=organic',first:{captured_at:Date.now(),landing_page:'https://brightforge.com.ph/keyword-research-services/',referrer:'https://www.bing.com/search?q=search',utm_source:'bing',utm_medium:'organic',utm_campaign:''}});
 assert.equal(h.w.BFLeadTracking.attribution.first_touch_utm_source,'bing');
 assert.equal(h.w.BFLeadTracking.attribution.first_touch_landing_page,'https://brightforge.com.ph/keyword-research-services/');
 h.form.elements.landing_page.value=''; h.w.BFLeadTracking.refreshAttribution();
 assert.equal(h.form.elements.landing_page.value,'https://brightforge.com.ph/contact/');
 h.dom.window.close();
});
for(const [name,response] of [['network',new Error('offline')],['HTTP',{ok:false,status:500}]]) {
 test(`CRO ${name} failure leaves data, exposes retry and cannot create a later thanks lead`,async()=>{
  const h=setup({response,stored:{form_name:'stale'}});
  const e=h.submit(); await settle();
  assert.equal(e.defaultPrevented,true);
  assert.equal(h.requests.length,1);
  assert.equal(h.leads().length,0);
  assert.equal(h.w.sessionStorage.getItem('bf_pending_lead_v1'),null);
  assert.equal(h.form.elements.email.value,'local@example.invalid');
  assert.ok(h.form.querySelector('[role="alert"]').textContent.includes('try again'));
  assert.equal(h.form.querySelector('button').disabled,false);
  h.dom.window.close();
 });
}
test('CRO accepted URLencoded same-origin request emits one lead only after response and blocks duplicate submits',async()=>{
 const h=setup();
 let resolve; h.w.fetch=(...args)=>{h.requests.push(args);return new Promise(r=>{resolve=r;});};
 h.submit();h.submit();
 assert.equal(h.requests.length,1);assert.equal(h.leads().length,0);
 resolve({ok:true}); await settle(); h.submit(); await settle();
 assert.equal(h.leads().length,1); assert.equal(h.requests.length,1);
 assert.equal(h.requests[0][0],'/');
 assert.equal(h.requests[0][1].method,'POST');
 assert.match(h.requests[0][1].headers['Content-Type'],/application\/x-www-form-urlencoded/);
 assert.equal(new URLSearchParams(h.requests[0][1].body).get('form-name'),'contact');
 assert.ok(!JSON.stringify(h.events).includes('local@example.invalid'));
 h.dom.window.close();
});
test('CRO plain thanks never emits a lead, including legacy pending state',()=>{
 const h=setup({url:'https://brightforge.com.ph/thanks/',stored:{form_name:'old-failed',email:'private@example.invalid'}});
 assert.equal(h.leads().length,0);
 assert.equal(h.w.sessionStorage.getItem('bf_pending_lead_v1'),null);
 h.dom.window.close();
});
test('CRO invalid native form is not posted and emits no lead',()=>{
 const h=setup();h.form.elements.email.value='bad';h.submit();
 assert.equal(h.requests.length,0);assert.equal(h.leads().length,0);h.dom.window.close();
});
