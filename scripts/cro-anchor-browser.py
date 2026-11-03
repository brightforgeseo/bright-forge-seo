"""Contact fragment regression: real links, motion, history and visible focus.
Usage: python scripts/cro-anchor-browser.py BASE OUTPUT.json
No form submissions or analytics collection are sent. No timing sleeps or CSS overrides.
"""
import json
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = sys.argv[1].rstrip('/')
OUT = Path(sys.argv[2])
ROUTES = {
    'white-label-seo-services-philippines': ('white-label-seo', ''),
    'seo-services-philippines': ('seo-services', ''),
    'technical-seo-services-philippines': ('technical-seo', ''),
    'on-page-seo-services-philippines': ('on-page-seo', ''),
    'keyword-research-services': ('keyword-research', ''),
    'ai-search-optimization-services-philippines': ('ai-search-readiness', ''),
    'seo-services-australia': ('seo-services', 'AU'),
    'seo-services-uk': ('seo-services', 'UK'),
    'seo-services-usa': ('seo-services', 'US'),
}
rows = []

def settle(page):
    page.wait_for_load_state('load')
    page.evaluate('document.fonts.ready')
    page.evaluate('''() => new Promise((resolve, reject) => {
      let last = '', stable = 0, frames = 0;
      function tick() {
        const f = document.getElementById('contactForm');
        const value = [scrollY, f.getBoundingClientRect().y, f.offsetHeight].join();
        stable = value === last ? stable + 1 : 0; last = value;
        if (stable >= 20) resolve();
        else if (++frames > 300) reject(new Error('Contact geometry did not settle'));
        else requestAnimationFrame(tick);
      }
      tick();
    })''')

def check(page, route, motion, iteration, journey, width):
    settle(page)
    row = page.evaluate('''() => {
      const f = document.getElementById('contactForm');
      const input = f.querySelector('input:not([type="hidden"]):not([name="bot-field"])');
      const visible = [...document.querySelectorAll('header, nav')].map(e => ({
        rect: e.getBoundingClientRect(), style: getComputedStyle(e)
      })).filter(e => ['fixed', 'sticky'].includes(e.style.position) && e.rect.top <= 0 && e.rect.bottom > 0);
      return {top: f.getBoundingClientRect().top, focus: document.activeElement.id,
        headerBottom: Math.max(0, ...visible.map(e => e.rect.bottom)),
        firstField: {top: input.getBoundingClientRect().top, bottom: input.getBoundingClientRect().bottom},
        service: document.getElementById('service').value, market: document.getElementById('market').value,
        viewport: innerHeight, scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior};
    }''')
    row.update(route=route, motion=motion, iteration=iteration, journey=journey, width=width)
    row['pass'] = (row['focus'] == 'contactForm' and
                   max(100, row['headerBottom']) <= row['top'] < row['viewport'] / 2 and
                   row['firstField']['top'] >= row['headerBottom'] and
                   row['firstField']['bottom'] <= row['viewport'] and
                   (row['service'], row['market']) == ROUTES[route])
    rows.append(row)
    OUT.write_text(json.dumps({'base': BASE, 'rows': rows, 'passed': sum(r['pass'] for r in rows), 'real_posts': 0}, indent=2))
    assert row['pass'], row

with sync_playwright() as p:
    browser = p.chromium.launch()
    for width, height in [(390, 844), (1440, 900)]:
        for motion in ['no-preference', 'reduce']:
            context = browser.new_context(viewport={'width': width, 'height': height}, reduced_motion=motion)
            context.route('**/*', lambda r: r.abort() if r.request.method == 'POST' or '/collect' in r.request.url else r.continue_())
            context.add_init_script("sessionStorage.setItem('popupShown','1')")
            page = context.new_page()
            page.set_default_timeout(30000)
            for iteration in range(2):
                for route in ROUTES:
                    page.goto(f'{BASE}/{route}/', wait_until='load')
                    page.locator('a[href^="/contact/?service="]').first.click()
                    page.wait_for_url('**/contact/?**')
                    check(page, route, motion, iteration, 'service-link', width)
                    # Natural browser history, not a scripted scroll to the target.
                    page.go_back(wait_until='load')
                    page.go_forward(wait_until='load')
                    check(page, route, motion, iteration, 'history-forward', width)
            context.close()
    browser.close()
assert len(rows) == len(ROUTES) * 2 * 2 * 2 * 2
print(json.dumps({'completed': len(rows), 'passed': sum(r['pass'] for r in rows)}))
