from pathlib import Path

P = Path(__file__).resolve().parents[1] / 'src/pages'


def test_missing_page_explains_recovery_without_fake_search():
    s = (P / '404.astro').read_text()
    assert 'We could not find the page at this address.' in s
    assert 'href="/site-index/"' in s
    assert 'action="/search"' not in s
    assert '/blog?search=' not in s
    assert 'ranking success' not in s
    assert 'noindex={true}' in s
    assert 'error-visual-container' in s
    assert 'href="/contact/"' in s


def test_thanks_qualifies_response_and_does_not_assert_delivery():
    s = (P / 'thanks.astro').read_text()
    assert 'usually reply within one business day' in s
    assert 'If you have just submitted our contact form' in s
    assert 'Message Sent Successfully' not in s
    assert "We'll get back to you shortly." not in s
    assert 'Contact-form next steps and links to continue browsing Bright Forge SEO.' in s
    assert 'noindex={true}' in s
    assert 'href="/"' in s
    contact = (P / 'contact.astro').read_text()
    assert 'action="/thanks/"' in contact


def test_site_index_scope_and_country_wayfinding():
    s = (P / 'site-index.astro').read_text()
    assert 'Every public page' not in s
    assert 'Service directory' in s
    markets = s.split('const markets = [')[1].split('];')[0]
    services = s.split('const services = [')[1].split('];')[0]
    assert "label: 'Philippines'" in markets
    for href in ['/b2b-seo-services/', '/international-seo-services/']:
        assert href not in markets
        assert href in services
    assert 'posts.map((post)' in s
    assert 'href="/sitemap.xml"' in s


def test_utility_shared_card_does_not_restore_every_page_claim():
    import subprocess
    import json
    code = "import {heroCards} from './src/lib/heroProof.ts'; console.log(JSON.stringify(['/404/','/thanks/','/site-index/'].map(p=>heroCards(p,''))))"
    cards = json.loads(subprocess.check_output(['node', '--input-type=module', '-e', code], cwd=P.parents[1], text=True))
    for route_cards in cards:
        assert route_cards[0]['value'] == 'Browse the directory.'
        assert route_cards[0]['href'] == '/site-index/'
