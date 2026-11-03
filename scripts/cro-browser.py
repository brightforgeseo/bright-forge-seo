"""Local-only Chromium CRO checks. Every POST is intercepted; off-origin blocked."""
import argparse
import json
import time
import traceback
import mimetypes
from pathlib import Path
from urllib.parse import urlparse, parse_qs
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT.parent
BASE = 'http://127.0.0.1:8775'
CONTEXTS = {
 'seo-services-philippines': ('seo-services', ''),
 'white-label-seo-services-philippines': ('white-label-seo', ''),
 'technical-seo-services-philippines': ('technical-seo', ''),
 'on-page-seo-services-philippines': ('on-page-seo', ''),
 'keyword-research-services': ('keyword-research', ''),
 'ai-search-optimization-services-philippines': ('ai-search-readiness', ''),
 'seo-services-australia': ('seo-services', 'AU'),
 'seo-services-uk': ('seo-services', 'UK'),
 'seo-services-usa': ('seo-services', 'US'),
}
VIEWPORTS = [(1440,900),(390,844)]
INIT = """window.__events=[]; window.gtag=(...args)=>window.__events.push(args);
window.addEventListener('beforeunload',()=>{try{sessionStorage.setItem('__events',JSON.stringify(window.__events));}catch{}});"""

def guard(route):
    req = route.request
    if req.method != 'GET':
        route.abort('blockedbyclient')
    elif urlparse(req.url).netloc == '127.0.0.1:8775':
        route.continue_()
    else:
        route.abort('blockedbyclient')

def context(browser, size, js=True):
    c = browser.new_context(viewport={'width':size[0], 'height':size[1]}, java_script_enabled=js)
    c.route('**/*', guard)
    c.add_init_script(INIT)
    return c

def visit(page, path):
    r = page.goto(BASE+path, wait_until='load')
    assert r.status == 200, (path,r.status)
    page.wait_for_timeout(350)
    expect(page.locator('h1')).to_be_visible()

def geometry(page, selector):
    return page.locator(selector).first.evaluate('(el)=>{const r=el.getBoundingClientRect();return {top:r.top,bottom:r.bottom,left:r.left,right:r.right,height:r.height}}')

def record(name, detail):
    with (OUT/'browser-results.ndjson').open('a') as f:
        f.write(json.dumps({'check':name,**detail})+'\n')
    print(name,json.dumps(detail),flush=True)

def matrix(browser):
    shots=OUT/'screenshots';shots.mkdir(exist_ok=True)
    for size in VIEWPORTS:
        for route in ['',*CONTEXTS,'contact']:
            c=context(browser,size);p=c.new_page();errors=[]
            p.on('pageerror',lambda error: errors.append(str(error)))
            try:
                visit(p,f'/{route}/' if route else '/')
                assert p.locator('h1').count()==1
                assert p.evaluate('document.documentElement.scrollWidth <= innerWidth'), route
                assert not errors, errors
                hero=geometry(p,'.forge-actions a')
                h1=geometry(p,'h1')
                p.screenshot(path=str(shots/f'{route or "home"}-{size[0]}.png'))
                detail={'viewport':size,'hero_cta':hero,'h1':h1,'overflow':False,'errors':errors}
                if route=='':
                    for selector in ['.commercial-actions .btn-view-all','#why-choose-us-section .cta-primary']:
                        visit(p,'/')
                        cta=p.locator(selector)
                        expect(cta).to_contain_text('Request an SEO Review')
                        cta.scroll_into_view_if_needed()
                        p.screenshot(path=str(shots/f'home-review-{selector.startswith("#")}-{size[0]}.png'))
                        cta.click();p.wait_for_url('**/contact/**#contactForm')
                        expect(p.locator('#contactForm')).to_be_focused()
                        expect(p.locator('#service')).to_have_value('')
                        expect(p.locator('#market')).to_have_value('')
                    detail['homepage_review_ctas']='both real clicks PASS'
                if route in CONTEXTS:
                    svc,market=CONTEXTS[route]
                    href=p.locator('.forge-actions a').first.get_attribute('href')
                    p.locator('.forge-actions a').first.click()
                    p.wait_for_url('**/contact/**#contactForm')
                    expect(p.locator('#service')).to_have_value(svc)
                    expect(p.locator('#market')).to_have_value(market)
                    expect(p.locator('#contactForm')).to_be_focused()
                    form=geometry(p,'#contactForm')
                    assert 50<=form['top']<=250,form
                    expect(p.locator('#name')).to_be_visible()
                    p.screenshot(path=str(shots/f'prefill-{route}-{size[0]}.png'))
                    # Choices remain editable after arrival, not hidden/locked context.
                    p.locator('#service').select_option('not-sure')
                    p.locator('#market').select_option('other')
                    expect(p.locator('#service')).to_have_value('not-sure')
                    expect(p.locator('#market')).to_have_value('other')
                    detail.update({'href':href,'form_target':form,'editable':True})
                    p.screenshot(path=str(shots/f'handoff-{route}-{size[0]}.png'))
                if route=='white-label-seo-services-philippines':
                    visit(p,'/'+route+'/')
                    sample=p.locator('.forge-actions a[href="#delivery-sample"]')
                    sample.click()
                    p.wait_for_timeout(800)
                    section=p.locator('#delivery-sample')
                    section.scroll_into_view_if_needed()
                    expect(section.get_by_text('This dated excerpt',exact=False)).to_be_visible()
                    assert 'our own website' in section.text_content()
                    expect(section.locator('a[href="/samples/technical-review-handoff.csv"]')).to_be_visible()
                    p.screenshot(path=str(shots/f'sample-{size[0]}.png'))
                    detail['sample_preserved']=True
                record(f'matrix:{route or "home"}:{size[0]}',{'status':'PASS',**detail})
            except Exception as e:
                p.screenshot(path=str(shots/f'FAILED-{route or "home"}-{size[0]}.png'))
                record(f'matrix:{route or "home"}:{size[0]}',{'status':'FAIL','error':str(e),'trace':traceback.format_exc()})
                raise
            finally:c.close()

def baseline(browser):
    for size in VIEWPORTS:
        for route in ['',*CONTEXTS,'contact']:
            c=context(browser,size);p=c.new_page()
            def baseline_html(request_route):
                req=request_route.request
                if req.method=='GET' and urlparse(req.url).netloc=='127.0.0.1:8775':
                    path=urlparse(req.url).path.strip('/')
                    file=OUT/'baseline-dist'/path
                    if req.is_navigation_request():file=file/'index.html'
                    assert file.is_file(),file
                    request_route.fulfill(status=200,content_type=mimetypes.guess_type(file)[0] or 'application/octet-stream',body=file.read_bytes())
                else:guard(request_route)
            c.route('**/*',baseline_html)
            visit(p,f'/{route}/' if route else '/')
            detail={'route':route or 'home','viewport':size,'hero_cta':geometry(p,'.forge-actions a'),'h1':geometry(p,'h1')}
            with (OUT/'baseline-browser-matrix.ndjson').open('a') as f:f.write(json.dumps(detail)+'\n')
            print(json.dumps(detail),flush=True)
            c.close()

def fill(page, selector):
    form=page.locator(selector)
    for name in ['name','firstName','lastName']:
        field=form.locator(f'input[name="{name}"]')
        if field.count():field.fill('Local Test')
    form.locator('input[name="email"]').fill('local-cro@example.invalid')
    msg=form.locator('textarea[name="message"]')
    if msg.count():msg.fill('Local intercepted test. Never submitted to Netlify.')
    service=form.locator('select[name="services"]')
    if service.count():service.select_option('not-sure')
    return form

def forms(browser):
    for size in VIEWPORTS:
        c=context(browser,size);p=c.new_page()
        visit(p,'/contact/?service=white-label-seo&market=AU#contactForm')
        expect(p.locator('#enquiry-context')).to_have_text('Tell us which SEO work your agency needs help delivering, your target markets and whether this is a one-off project or ongoing support.')
        expect(p.locator('#contactForm button[type=submit] span')).to_have_text('Discuss White Label Delivery')
        for code,prompt in [('technical-seo','Send the affected URL and describe the issue or recent release.'),('keyword-research','Tell us what you sell, where you serve customers and which pages need a search plan.')]:
            p.locator('#service').select_option(code)
            expect(p.locator('#enquiry-context')).to_have_text(prompt)
        p.locator('#contactForm button[type=submit]').click()
        assert not p.locator('#name').evaluate('(el)=>el.checkValidity()')
        p.locator('#name').fill('Local Test');p.locator('#email').fill('bad')
        assert not p.locator('#email').evaluate('(el)=>el.checkValidity()')
        p.locator('#website').fill('example.invalid')
        assert not p.locator('#website').evaluate('(el)=>el.checkValidity()')
        p.locator('#website').fill('https://example.invalid')
        assert p.locator('#website').evaluate('(el)=>el.checkValidity()')
        record(f'contact-validation:{size[0]}',{'status':'PASS','plain_domain':'native URL rejects; unchanged','prompts':'exact','validation':'native'})
        # Untrusted inputs never become DOM content, select values or stored attribution.
        visit(p,'/contact/?service=%3Cimg%20src=x%20onerror=window.__xss%3D1%3E&market=ZZ&email=private%40example.invalid&utm_source=private%40example.invalid&utm_term=private%40example.invalid#contactForm')
        expect(p.locator('#service')).to_have_value('');expect(p.locator('#market')).to_have_value('')
        assert p.evaluate('window.__xss') is None
        assert 'private' not in p.evaluate('JSON.stringify(window.__events)+JSON.stringify(window.BFLeadTracking.attribution)+localStorage.getItem("bf_first_touch_v1")')
        assert 'email=' not in p.url
        record(f'unknown-xss-pii:{size[0]}',{'status':'PASS'})
        # First-touch persists across route change. Delayed refill still runs.
        p.evaluate('localStorage.removeItem("bf_first_touch_v1")')
        visit(p,'/keyword-research-services/?utm_source=google&utm_medium=organic')
        visit(p,'/contact/?service=keyword-research#contactForm')
        assert p.locator('[name=first_touch_utm_source]').input_value()=='google'
        assert p.locator('[name=first_touch_landing_page]').input_value()==BASE+'/keyword-research-services/'
        p.locator('[name=landing_page]').evaluate('(el)=>el.value=""')
        p.wait_for_timeout(1700)
        assert p.locator('[name=landing_page]').input_value()==BASE+'/contact/'
        p.locator('[name=landing_page]').evaluate('(el)=>el.value=""')
        p.evaluate('dispatchEvent(new Event("pageshow"))');p.wait_for_timeout(300)
        assert p.locator('[name=landing_page]').input_value()==BASE+'/contact/'
        record(f'first-touch-delayed-pageshow:{size[0]}',{'status':'PASS'})
        c.close()
        for scenario in ['network','http','accepted-duplicate','plain-thanks']:
            c=context(browser,size);p=c.new_page();posts=[]
            if scenario=='plain-thanks':
                visit(p,'/contact/')
                p.evaluate('sessionStorage.setItem("bf_pending_lead_v1",JSON.stringify({form_name:"old-failed"}))')
                visit(p,'/thanks/')
                assert p.evaluate('window.__events.filter(e=>e[1]==="generate_lead").length')==0
                assert p.evaluate('sessionStorage.getItem("bf_pending_lead_v1")') is None
            else:
                def intercept(route):
                    if route.request.method=='POST':
                        posts.append({'url':route.request.url,'method':route.request.method,'body':route.request.post_data})
                        if scenario=='network':route.abort('failed')
                        elif scenario=='http':route.fulfill(status=500,body='Local mocked failure')
                        else:
                            time.sleep(.15)
                            route.fulfill(status=200,body='Local mocked acceptance')
                    else:guard(route)
                c.route('**/*',intercept)
                visit(p,'/contact/#contactForm');form=fill(p,'#contactForm')
                # Dispatch two actual validated submits in one task to exercise in-flight lock.
                form.evaluate('(f)=>{f.requestSubmit();f.requestSubmit();}')
                if scenario=='accepted-duplicate':
                    p.wait_for_url('**/thanks/')
                    events=json.loads(p.evaluate('sessionStorage.getItem("__events")'))
                    assert len([e for e in events if e[1]=='generate_lead'])==1,events
                    assert len(posts)==1,posts
                    body=parse_qs(posts[0]['body']);assert body['form-name']==['contact']
                    assert posts[0]['url']==BASE+'/'
                    assert 'local-cro' not in json.dumps(events)
                    p.reload(wait_until='load')
                    assert p.evaluate('window.__events.filter(e=>e[1]==="generate_lead").length')==0
                else:
                    expect(form.locator('[role=alert]')).to_contain_text('try again')
                    expect(form.locator('button[type=submit]')).to_be_enabled()
                    expect(form.locator('input[name=email]')).to_have_value('local-cro@example.invalid')
                    expect(form.locator('[role=alert]')).to_be_focused()
                    assert len(posts)==1
                    assert p.evaluate('window.__events.filter(e=>e[1]==="generate_lead").length')==0
                    # A later manual thanks visit cannot turn failure into a lead.
                    visit(p,'/thanks/')
                    assert p.evaluate('window.__events.filter(e=>e[1]==="generate_lead").length')==0
            record(f'lead:{scenario}:{size[0]}',{'status':'PASS','intercepted_posts':len(posts),'real_posts':0})
            c.close()
        # No-JS native Netlify form remains POST + hidden form-name + /thanks/.
        c=context(browser,size,False);p=c.new_page();native_posts=[]
        def native_intercept(route):
            if route.request.method=='POST':
                native_posts.append({'url':route.request.url,'body':route.request.post_data})
                route.fulfill(status=200,content_type='text/html',body='<html><h1>Local mocked native acceptance</h1></html>')
            else:guard(route)
        c.route('**/*',native_intercept)
        visit(p,'/contact/#contactForm')
        f=p.locator('#contactForm')
        assert f.get_attribute('method')=='POST' and f.get_attribute('action')=='/thanks/'
        assert f.locator('input[name=form-name]').input_value()=='contact'
        assert f.get_attribute('data-netlify')=='true'
        fill(p,'#contactForm').locator('button[type=submit]').click()
        p.wait_for_url('**/thanks/')
        assert len(native_posts)==1
        assert parse_qs(native_posts[0]['body'])['form-name']==['contact']
        record(f'no-js-native-form:{size[0]}',{'status':'PASS','intercepted_native_posts':1,'real_posts':0})
        c.close()

def sharedforms(browser):
    for size in VIEWPORTS:
        for name in ['homepage-contact','popup-contact']:
            c=context(browser,size);p=c.new_page();posts=[]
            def intercept(route):
                if route.request.method=='POST':
                    posts.append(route.request.post_data)
                    route.fulfill(status=500 if len(posts)==1 else 200,body='Local mock only')
                else:guard(route)
            c.route('**/*',intercept)
            if name=='popup-contact':p.clock.install()
            visit(p,'/')
            if name=='popup-contact':
                p.clock.fast_forward(45000)
                expect(p.get_by_role('dialog')).to_be_visible()
            f=fill(p,f'form[name="{name}"]')
            f.locator('button[type=submit]').click()
            expect(f.locator('[role=alert]')).to_contain_text('try again')
            expect(f.locator('[role=alert]')).to_be_focused()
            expect(f.locator('input[name=email]')).to_have_value('local-cro@example.invalid')
            assert p.evaluate('window.__events.filter(e=>e[1]==="generate_lead").length')==0
            f.locator('button[type=submit]').click()
            p.wait_for_url('**/thanks/')
            events=json.loads(p.evaluate('sessionStorage.getItem("__events")'))
            assert len([e for e in events if e[1]=='generate_lead'])==1
            assert len(posts)==2
            assert all(parse_qs(body)['form-name']==[name] for body in posts)
            record(f'shared-form-retry:{name}:{size[0]}',{'status':'PASS','intercepted_posts':2,'real_posts':0,'accepted_leads':1})
            c.close()

def popup(browser):
    for size in VIEWPORTS:
        c=context(browser,size);p=c.new_page();visit(p,'/')
        anchor=p.locator('.forge-actions a').first;anchor.focus()
        start=time.monotonic()
        assert p.locator('#contact-popup-overlay').get_attribute('aria-hidden')=='true'
        p.wait_for_timeout(43500)
        assert p.locator('#contact-popup-overlay').get_attribute('aria-hidden')=='true'
        expect(p.locator('#contact-popup-overlay')).to_have_attribute('aria-hidden','false',timeout=6000)
        elapsed=time.monotonic()-start
        d=p.get_by_role('dialog');expect(d).to_be_visible();expect(p.locator('#popup-close')).to_be_focused()
        assert d.get_attribute('aria-modal')=='true';assert d.get_attribute('aria-labelledby')=='popup-title'
        assert p.evaluate('document.body.style.overflow')=='hidden'
        for name in ['popup-name','popup-email','popup-phone','popup-message']:
            expect(d.locator(f'label[for="{name}"]')).to_be_visible()
        last=d.locator('.popup-privacy a');last.focus();p.keyboard.press('Tab');expect(p.locator('#popup-close')).to_be_focused()
        p.keyboard.press('Shift+Tab');expect(last).to_be_focused()
        # Actual keyboard traversal remains confined and focused controls scroll into view.
        for _ in range(12):
            p.keyboard.press('Tab')
            assert p.evaluate('document.querySelector("[role=dialog]").contains(document.activeElement)')
            r=p.evaluate('(()=>{const r=document.activeElement.getBoundingClientRect();return {top:r.top,bottom:r.bottom}})()')
            assert r['top']>=0 and r['bottom']<=size[1],r
        p.screenshot(path=str(OUT/'screenshots'/f'popup-45sec-{size[0]}.png'))
        box=d.evaluate('(el)=>({height:el.clientHeight,scrollHeight:el.scrollHeight,top:el.getBoundingClientRect().top,bottom:el.getBoundingClientRect().bottom})')
        assert box['top']>=0 and box['bottom']<=size[1],box
        # Force a shorter viewport after the genuine timer observation to prove scrolling.
        p.set_viewport_size({'width':size[0],'height':500})
        d.evaluate('(el)=>el.scrollTop=el.scrollHeight')
        assert d.evaluate('(el)=>el.scrollTop')>0
        last.focus();expect(last).to_be_in_viewport()
        p.screenshot(path=str(OUT/'screenshots'/f'popup-scroll-{size[0]}.png'))
        p.keyboard.press('Escape');expect(d).not_to_be_visible();expect(anchor).to_be_focused()
        assert p.evaluate('document.body.style.overflow')==''
        assert not p.locator('main').evaluate('(el)=>el.inert')
        # New contexts retain real close and backdrop paths, fast-forwarding only timer.
        record(f'popup-real45-keyboard-scroll:{size[0]}',{'status':'PASS','elapsed_since_load_seconds':elapsed,'initial_box':box,'short_height_scroll':True})
        c.close()
        for action in ['close','backdrop']:
            c=context(browser,size);p=c.new_page();p.clock.install();visit(p,'/');p.clock.fast_forward(45000)
            expect(p.get_by_role('dialog')).to_be_visible()
            if action=='close':p.locator('#popup-close').click()
            else:p.locator('#contact-popup-overlay').click(position={'x':2,'y':2})
            expect(p.get_by_role('dialog')).not_to_be_visible()
            record(f'popup-{action}:{size[0]}',{'status':'PASS','timer':'virtual'})
            c.close()
        c=context(browser,size);p=c.new_page();p.clock.install();visit(p,'/contact/');p.clock.fast_forward(46000)
        assert p.locator('#contact-popup-overlay').count()==0
        record(f'popup-contact-excluded:{size[0]}',{'status':'PASS'})
        c.close()

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('phase',choices=['matrix','forms','popup','sharedforms','baseline']);args=parser.parse_args()
    with sync_playwright() as pw:
        browser=pw.chromium.launch(executable_path='/usr/sbin/chromium',headless=True,args=['--no-sandbox'])
        try:globals()[args.phase](browser)
        finally:browser.close()
