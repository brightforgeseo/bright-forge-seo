from pathlib import Path
from bs4 import BeautifulSoup
import pytest

ROOT = Path(__file__).resolve().parents[1]
TOPICS = ['ai', 'business', 'local', 'philippines', 'reporting', 'seo', 'technical-seo']

@pytest.mark.parametrize('topic', TOPICS)
def test_topic_explains_tag_scope_without_claiming_exhaustive_coverage(topic):
    soup = BeautifulSoup((ROOT / 'dist/blog/topics' / topic / 'index.html').read_text(), 'html.parser')
    intro = soup.select_one('.forge-note-copy').get_text(' ', strip=True)
    assert 'existing article tags' in intro
    assert 'may not include every article' in intro
    assert 'no JavaScript filter' not in intro
    count = len(soup.select('.topic-main li'))
    assert f'{count} articles' in intro
    assert 'existing article tags' in soup.select_one('meta[name="description"]')['content']

@pytest.mark.parametrize('topic', TOPICS)
def test_topic_has_useful_crawlable_escape_routes_after_the_list(topic):
    soup = BeautifulSoup((ROOT / 'dist/blog/topics' / topic / 'index.html').read_text(), 'html.parser')
    main = soup.select_one('.topic-main')
    nav = main.select_one('nav[aria-label="More articles"]')
    assert nav is not None, 'Readers reaching the list end need topic and full-archive routes'
    assert [(a['href'], a.get_text(' ', strip=True)) for a in nav.select('a')] == [
        ('/blog/topics/', 'Browse all topics'), ('/blog/', 'Browse all articles')]
    assert main.select_one('ul').find_next('nav') == nav
    assert main.select_one('h2').get_text(' ', strip=True) == 'Articles in this topic'
    assert soup.select_one('.forge-breadcrumb [aria-current="page"]').get_text(' ', strip=True) == soup.h1.get_text(' ', strip=True)
