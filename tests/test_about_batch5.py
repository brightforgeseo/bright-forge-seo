from pathlib import Path
import re

SOURCE = Path(__file__).resolve().parents[1] / 'src/pages/about-us.astro'


def test_mobile_scope_does_not_prescribe_amp_or_guarantee_speed():
    source = SOURCE.read_text()
    match = re.search(r'<h3>Mobile Optimization</h3>\s*<p>(.*?)</p>', source)
    assert match
    paragraph = match.group(1)
    assert 'AMP' not in paragraph
    assert 'seamless' not in paragraph
    assert all(term in paragraph for term in ('loading speed', 'layout', 'enquiry'))


def test_local_service_uses_current_product_name_without_domination_promise():
    source = SOURCE.read_text()
    assert 'Google My Business' not in source
    assert 'Google Business Profile' in source
    assert 'dominate your local market' not in source


def test_introduction_gives_scope_without_repeating_biography():
    source = SOURCE.read_text()
    hero = source.split('<Fragment slot="story">')[1].split('</Fragment>')[0]
    assert 'trusted partner' not in hero
    assert '15 years' not in hero
    assert 'technical SEO' in hero
    assert 'dynamic heart' not in source
    assert 'align perfectly' not in source
    assert 'Quezon City, Metro Manila' in source
