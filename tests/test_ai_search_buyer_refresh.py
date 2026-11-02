"""Buyer refresh acceptance: current visual design is preserved separately."""
from pathlib import Path
import re
ROOT = Path(__file__).resolve().parents[1]
SOURCE = (ROOT / 'src/pages/ai-search-optimization-services-philippines.astro').read_text()

def test_service_leads_with_buying_decisions_not_internal_ownership():
    hero = SOURCE.split('<Hero', 1)[1].split('</Hero>', 1)[0]
    assert 'AI search optimisation' in hero
    assert 'buyers research before choosing' in hero
    for phrase in ['one owner page', 'existing owner page', 'not the automated SEO team', 'GEO-only shop', 'Brochure GEO', 'rented GEO bench']:
        assert phrase.lower() not in SOURCE.lower()
    assert 'Philippines' in hero and 'UK, US and Australian' in hero


def test_four_buying_situations_link_to_existing_sector_owners():
    assert 'id="buying-situations"' in SOURCE
    for label, url, detail in [
        ('Industrial suppliers', '/construction-seo-services/', 'compatibility'),
        ('Local and trade services', '/home-services-seo/', 'service area'),
        ('Professional services', '/b2b-seo-services/', 'credentials'),
        ('Ecommerce', '/ecommerce-seo-services/', 'returns'),
    ]:
        assert label in SOURCE
        assert f'href="{url}"' in SOURCE
        assert detail in SOURCE
    assert 'Examples of buying decisions' in SOURCE
    assert 'industrial parts washer' in SOURCE
    assert 'repair a leaking roof' in SOURCE
    assert 'outsourcing payroll' in SOURCE
    assert 'laptop bag' in SOURCE
    public_copy = SOURCE.split('<main', 1)[1].split('</main>', 1)[0]
    assert 'not measured prompt volumes' not in public_copy


def test_editorial_copy_explains_work_without_agency_posturing():
    for phrase in ['WE WILL NOT PRETEND', 'secret GEO switch', 'without fake mentions',
                   'Measurement without make-believe', 'entity repair',
                   'separate magic tricks', 'commercial movement', 'agreed surfaces']:
        assert phrase not in SOURCE
    assert 'page edits' in SOURCE
    assert 'implementation' in SOURCE
    assert 'Your technical team approves' in SOURCE


def test_proof_and_measurement_do_not_turn_events_into_leads():
    # Proof cards now lead to source-report reviews, not unsupported metric promos.
    assert '13 tracked key events' not in SOURCE and '4,549' not in SOURCE
    assert 'original GEO reports' in SOURCE
    assert 'August 2025 to January 2026' in SOURCE
    assert 'not proof that a particular edit caused growth' in SOURCE
    assert 'without treating tracked events as enquiries' in SOURCE
    assert 'A brand mention is not necessarily a linked citation' in SOURCE
    assert 'confirmed lead' in SOURCE.lower()
    assert 'automated SEO team' not in SOURCE
    assert 'Send your website' in SOURCE
    assert 'prioritised page plan' in SOURCE
    assert '7:11' not in SOURCE


def test_concise_hero_and_valid_page_colour_tokens():
    hero = SOURCE.split('<Hero', 1)[1].split('</Hero>', 1)[0]
    match = re.search(r'title="([^"]+)"', hero)
    assert match
    title = match.group(1)
    assert len(re.sub(r'<[^>]+>', '', title)) <= 45
    assert 'var(--ai-#' not in SOURCE
    assert '.ai-page h2 span' in SOURCE
