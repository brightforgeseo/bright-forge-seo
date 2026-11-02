"""Built-DOM regression checks; run after npm run build."""
from pathlib import Path
from datetime import datetime
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]

def page():
    return BeautifulSoup((ROOT / 'dist/blog/index.html').read_text(), 'html.parser')

def test_recent_articles_are_bounded_latest_selection_with_archive_access():
    soup = page()
    recent = soup.select('.recent-article')
    cards = soup.select('.featured-article, .article-card')
    expected = sorted(cards, key=lambda c: datetime.strptime(c.select_one('.date').text, '%B %d, %Y'), reverse=True)[:4]
    assert len(recent) == min(4, len(cards))
    assert [x.select_one('a')['href'] for x in recent] == [x.select_one('h2 a, h3 a')['href'] for x in expected]
    assert soup.select_one('.recent-articles + a[href="#blog-posts"]')

def test_topic_navigation_matches_sidebar_and_links_to_topic_index():
    soup = page()
    top = soup.select('nav.filter-container a[href^="/blog/topics/"]')
    sidebar = soup.select('.categories-list a[href^="/blog/topics/"]')
    assert [(a['href'], a.text.strip()) for a in top] == [(a['href'], a.text.strip()) for a in sidebar]
    assert len(top) == len(list((ROOT / 'dist/blog/topics').glob('*/index.html'))) + 1
    assert soup.select_one('nav.filter-container[aria-label="Article topics"]')
    assert soup.select_one('nav.filter-container a[href="/blog/"][aria-current="page"]')
    assert soup.select_one('nav.filter-container a[href="/blog/topics/"]')

def test_navigation_copy_explains_archive_and_existing_tag_scope():
    soup = page()
    hero = soup.select_one('.forge-note-copy').get_text(' ', strip=True)
    about = soup.select_one('.blog-sidebar .sidebar-widget').get_text(' ', strip=True)
    intro = soup.select_one('.section-header').get_text(' ', strip=True)
    assert 'full archive' in hero
    assert 'existing tags' in intro
    assert 'topic index' in about
    assert 'dominate' not in hero and 'proven strategies' not in hero + about
    description = soup.select_one('meta[name="description"]')['content']
    assert description == 'Browse Bright Forge articles on SEO, AI search, reporting and hiring an SEO team. Choose a topic or explore the complete article archive.'

def test_desktop_recent_links_can_be_scrolled_into_view():
    import functools
    import shutil
    import threading
    from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
    import pytest
    playwright = pytest.importorskip('playwright.sync_api')
    chromium = shutil.which('chromium')
    if not chromium:
        pytest.skip('Chromium is required for rendered keyboard accessibility QA')
    server = ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(SimpleHTTPRequestHandler, directory=str(ROOT / 'dist')))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    try:
        with playwright.sync_playwright() as p:
            browser = p.chromium.launch(executable_path=chromium, args=['--no-sandbox'])
            page = browser.new_page(viewport={'width': 1440, 'height': 900}, reduced_motion='reduce')
            page.goto(f'http://127.0.0.1:{server.server_port}/blog/', wait_until='networkidle')
            for link in page.locator('.recent-articles a').all():
                link.focus()
                link.scroll_into_view_if_needed()
                box = link.bounding_box()
                assert box and 0 <= box['y'] and box['y'] + box['height'] <= 900, box
            browser.close()
    finally:
        server.shutdown()
        server.server_close()
