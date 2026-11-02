from pathlib import Path
import re
ROOT = Path(__file__).resolve().parents[1]
AUTHOR = ROOT / 'src/pages/authors/[slug].astro'

def test_empty_faq_section_is_not_rendered():
    source = AUTHOR.read_text()
    assert re.search(r'\{author\.faqs\.length > 0 && \(\s*<section class="author-faq-section">', source)
    assert 'and how he works' not in source

def test_author_cta_contacts_team_not_another_person():
    source = AUTHOR.read_text()
    assert 'text="Work With Ben"' not in source
    assert 'href="/contact/" text="Contact the team"' in source

def test_topic_index_explains_scope_and_links_full_archive():
    source = (ROOT / 'src/pages/blog/topics/index.astro').read_text()
    assert 'not enough for Google' not in source
    assert 'not a JavaScript filter' not in source
    assert 'existing article tags' in source
    assert 'href="/blog/">Browse all articles</a>' in source

def test_contact_closing_points_to_cases_without_repeating_diagnostics():
    source = (ROOT / 'src/pages/contact.astro').read_text()
    assert 'Before we suggest work, we look for the patterns' not in source
    assert 'Browse the case studies' in source
    assert 'href="/case-studies/"' in source
    assert 'We usually reply within one business day.' in source
    assert 'Saturday: 9:00 AM to 2:00 PM' in source
    assert 'Asia/Manila (UTC+08:00)' in source

def test_quick_facts_omit_missing_values():
    source = AUTHOR.read_text().split('<dl>', 1)[1].split('</dl>', 1)[0]
    for field in ('yearsExperience', 'education'):
        assert re.search(r'\{author\.' + field + r' && \(\s*<div>', source), f'{field} must not render an empty fact'
