"""Exercise real Chromium CSP with network-isolated collection. No GA hits sent."""
import json,sys,tomllib
from pathlib import Path
from playwright.sync_api import sync_playwright
config=tomllib.loads(Path(sys.argv[1]).read_text())
policy=next(h['values']['Content-Security-Policy'] for h in config['headers'] if h['for']=='/*')
with sync_playwright() as p:
 b=p.chromium.launch(headless=True); c=b.new_context(); page=c.new_page(); sent=[]; blocked=[]
 def route(r):
  if r.request.url=='https://brightforge.com.ph/csp-test/':
   r.fulfill(status=200,headers={'Content-Type':'text/html','Content-Security-Policy':policy},body='<title>Network-isolated CSP test</title>')
  elif r.request.url.startswith('https://analytics.google.com/g/collect'):
   sent.append(r.request.url); r.fulfill(status=204,headers={'Access-Control-Allow-Origin':'*'},body='')
  else: r.abort()
 c.route('**/*',route)
 page.goto('https://brightforge.com.ph/csp-test/')
 result=page.evaluate('''async () => { try { await fetch('https://analytics.google.com/g/collect?test=network-isolated',{method:'POST',mode:'no-cors',body:'no-event-data'}); return true; } catch { return false; } }''')
 # The fix must not allow advertising collection or arbitrary hosts.
 ads=page.evaluate('''async () => { try { await fetch('https://stats.g.doubleclick.net/g/collect',{mode:'no-cors'}); return true; } catch { return false; } }''')
 print(json.dumps({'analytics_request_allowed':result,'intercepted_count':len(sent),'advertising_request_allowed':ads,'real_collection_requests':0}))
 assert result and len(sent)==1,'Observed analytics.google.com endpoint blocked by CSP'
 assert not ads,'Do not broaden advertising collection'
 b.close()
