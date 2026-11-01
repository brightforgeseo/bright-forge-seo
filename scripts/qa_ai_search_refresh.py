"""Rendered AI service-page gate. Run: uv run --with playwright python scripts/qa_ai_search_refresh.py"""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'qa-artifacts/ai-search-refresh'
OUT.mkdir(parents=True, exist_ok=True)
URL = 'http://127.0.0.1:4325/ai-search-optimization-services-philippines/'
report = {'url': URL, 'viewports': [], 'errors': []}
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/sbin/chromium', headless=True, args=['--no-sandbox'])
    for name, width, height in [('desktop', 1440, 1000), ('mobile', 390, 844), ('narrow-mobile', 360, 800)]:
        page = browser.new_page(viewport={'width': width, 'height': height}, device_scale_factor=1)
        page.on('pageerror', lambda e: report['errors'].append(str(e)))
        response = page.goto(URL, wait_until='networkidle')
        assert response and response.status == 200
        page.screenshot(path=str(OUT / f'{name}-hero.png'))
        v = {'name': name, 'width': width, 'sections': []}
        assert page.locator('h1').count() == 1
        assert page.locator('.forge-sculpture').evaluate('(x)=>x.complete && x.naturalWidth > 0')
        v['hero_cta_bottom'] = page.locator('.forge-actions').bounding_box()['y'] + page.locator('.forge-actions').bounding_box()['height']
        page.locator('.forge-actions a[href="#method"]').click()
        page.wait_for_timeout(2000)
        v['method_anchor_heading_top'] = page.locator('#method h2').bounding_box()['y']
        assert 70 <= v['method_anchor_heading_top'] <= 320, v
        page.add_style_tag(content='html { scroll-behavior: auto !important; }')
        sections = page.locator('.ai-page > section')
        for i in range(sections.count()):
            section = sections.nth(i)
            section.scroll_into_view_if_needed()
            page.wait_for_timeout(150)
            state = section.evaluate('''x=>({section:x.className, text:x.innerText.length, height:x.getBoundingClientRect().height, visibility:getComputedStyle(x).visibility, opacity:getComputedStyle(x).opacity, overflow:document.documentElement.scrollWidth>innerWidth})''')
            assert state['text'] > 0 and state['height'] > 0 and state['visibility'] == 'visible' and state['opacity'] != '0', state
            assert not state['overflow'], state
            v['sections'].append(state)
            if name != 'narrow-mobile':
                section.screenshot(path=str(OUT / f'{name}-{i:02d}-{state["section"]}.png'), style='.navbar-professional { visibility: hidden !important; }')
        faq = page.locator('.faq-list details')
        answers = []
        for i in range(faq.count()):
            item = faq.nth(i)
            item.locator('summary').click()
            assert item.get_attribute('open') is not None
            assert item.locator('p').is_visible()
            answers.append(item.evaluate('''x=>({question:x.querySelector('summary').textContent.replace(/^\\s*0\\d\\s*/, '').trim(),answer:x.querySelector('p').textContent.trim()})'''))
        schema = page.locator('script[type="application/ld+json"]').evaluate_all('(xs)=>xs.map(x=>JSON.parse(x.textContent))')
        def walk(x):
            if isinstance(x, dict):
                if x.get('@type') == 'FAQPage':
                    yield x
                for val in x.values():
                    yield from walk(val)
            elif isinstance(x, list):
                for val in x:
                    yield from walk(val)
        faqs = list(walk(schema))
        assert len(faqs) == 1
        expected = [{'question':x['name'], 'answer':x['acceptedAnswer']['text']} for x in faqs[0]['mainEntity']]
        assert answers == expected, (answers, expected)
        v['faq_count'] = len(answers)
        v['faq_schema_parity'] = True
        v['horizontal_overflow'] = page.evaluate('document.documentElement.scrollWidth>innerWidth')
        assert not v['horizontal_overflow']
        if name == 'desktop':
            links = page.locator('.ai-page a,.forge-actions a').evaluate_all('(xs)=>[...new Set(xs.map(x=>x.getAttribute("href")))]')
            report['links'] = []
            for href in links:
                if href.startswith('/'):
                    r = page.request.get('http://127.0.0.1:4325' + href)
                    report['links'].append({'href':href,'status':r.status})
                    assert r.status == 200, href
                elif href.startswith('#'):
                    assert page.locator(href).count() == 1
            report['metadata'] = page.evaluate('''()=>({title:document.title,description:document.querySelector('meta[name="description"]').content,canonical:document.querySelector('link[rel="canonical"]').href,h1:document.querySelector('h1').textContent,robots:document.querySelector('meta[name="robots"]')?.content})''')
        report['viewports'].append(v)
        page.close()
    page = browser.new_page(java_script_enabled=False)
    response = page.goto(URL, wait_until='networkidle')
    assert response and response.status == 200
    assert page.locator('.ai-page > section').count() == 15
    for section in page.locator('.ai-page > section').all():
        assert section.inner_text().strip()
    report['no_javascript_body_readable'] = True
    page.close()
    browser.close()
assert not report['errors'], report['errors']
(OUT / 'report.json').write_text(json.dumps(report, indent=2))
print(json.dumps(report, indent=2))
