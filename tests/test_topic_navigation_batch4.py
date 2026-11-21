import json
from pathlib import Path
from bs4 import BeautifulSoup
import pytest

ROOT = Path(__file__).resolve().parents[1]
RETIRED = json.loads((ROOT / 'src/data/retiredBlogSlugs.json').read_text())
RETIRED_TOPICS = sorted(RETIRED['topicArchives'])


def hub():
    return BeautifulSoup((ROOT / 'dist/blog/topics/index.html').read_text(), 'html.parser')


@pytest.mark.parametrize('topic', RETIRED_TOPICS)
def test_thin_topic_archive_is_no_longer_built_and_is_redirected(topic):
    assert not (ROOT / 'dist/blog/topics' / topic).exists()
    rules = [line.split() for line in (ROOT / 'dist/_redirects').read_text().splitlines()]
    target = RETIRED['topicArchives'][topic]
    for source in (f'/blog/topics/{topic}', f'/blog/topics/{topic}/'):
        assert [rule for rule in rules if rule and rule[0] == source] == [[source, target, '301']]


def test_no_topic_archive_pages_are_generated():
    assert not (ROOT / 'src/pages/blog/topics/[topic].astro').exists()
    assert list((ROOT / 'dist/blog/topics').glob('*/index.html')) == []


def test_topic_hub_explains_tag_scope_without_claiming_exhaustive_coverage():
    soup = hub()
    intro = soup.select_one('.forge-note-copy').get_text(' ', strip=True)
    assert 'existing article tags' in intro
    assert 'may not include every article' in intro
    assert 'no JavaScript filter' not in intro


def test_topic_hub_lists_each_topic_as_a_section_with_its_articles():
    soup = hub()
    main = soup.select_one('.topic-main')
    sections = main.select('section.topic-section')
    assert len(sections) >= 3
    assert not main.select_one('section#seo'), 'The catch-all tag only repeated the blog index'
    jump = [(a['href'], a.get_text(' ', strip=True)) for a in main.select('nav.topic-jump a')]
    assert jump == [(f"#{s['id']}", s.h2.get_text(' ', strip=True)) for s in sections]
    for section in sections:
        links = section.select('ul.topic-articles li a')
        assert len(links) >= 3
        for link in links:
            slug = link['href'].strip('/').split('/')[-1]
            assert link['href'].startswith('/blog/') and slug not in RETIRED['articles']
            assert (ROOT / 'dist/blog' / slug / 'index.html').exists()


def test_topic_hub_has_a_crawlable_route_to_the_full_archive_after_the_lists():
    main = hub().select_one('.topic-main')
    nav = main.select_one('nav[aria-label="More articles"]')
    assert nav is not None
    assert [(a['href'], a.get_text(' ', strip=True)) for a in nav.select('a')] == [('/blog/', 'Browse all articles')]
    assert main.select('section.topic-section')[-1].find_next('nav') == nav
