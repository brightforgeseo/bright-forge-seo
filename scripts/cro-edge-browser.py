"""Browser regression for denied storage getters and automatic modal focus."""
import sys
from playwright.sync_api import sync_playwright,expect
BASE=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:8786'
with sync_playwright() as p:
 b=p.chromium.launch(headless=True)
 for store in ['sessionStorage','localStorage']:
  c=b.new_context();c.add_init_script(f"Object.defineProperty(window,'{store}',{{get(){{throw new DOMException('blocked','SecurityError')}}}})")
  c.route('**/*',lambda r:r.continue_() if r.request.method=='GET' and r.request.url.startswith(BASE) else r.abort())
  q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));q.goto(BASE+'/contact/',wait_until='load')
  assert q.evaluate('!!window.BFLeadTracking'),(store,errors)
  assert not errors,(store,errors)
  print(store,'PASS');c.close()
 c=b.new_context();c.route('**/*',lambda r:r.continue_() if r.request.method=='GET' and r.request.url.startswith(BASE) else r.abort());q=c.new_page();q.clock.install();q.goto(BASE+'/',wait_until='load')
 assert q.evaluate('document.activeElement===document.body')
 q.clock.fast_forward(45000);expect(q.locator('#popup-close')).to_be_focused()
 q.keyboard.press('Escape');expect(q.locator('#contact-popup-overlay')).to_have_attribute('aria-hidden','true')
 assert q.evaluate('document.activeElement===document.body')
 assert q.evaluate('!document.body.hasAttribute("tabindex")')
 print('automatic popup body focus PASS');b.close()
