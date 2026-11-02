"""The archive must not collect addresses without a subscription backend."""
from pathlib import Path
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]


def test_archive_newsletter_is_truthfully_unavailable_without_collection():
    soup = BeautifulSoup((ROOT / 'dist/blog/index.html').read_text(), 'html.parser')
    widget = soup.select_one('.newsletter-widget')
    assert 'Email subscriptions are currently unavailable.' in widget.get_text(' ', strip=True)
    assert not widget.select('form, input, button')
    assert widget.select_one('a[href="#blog-posts"]')
    source = (ROOT / 'src/pages/blog.astro').read_text()
    assert 'Thank you for subscribing!' not in source
    assert "document.querySelector('.newsletter-form')" not in source
