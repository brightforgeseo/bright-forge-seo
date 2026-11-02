from pathlib import Path
import re
ROOT = Path(__file__).resolve().parents[1]

def test_pest_shared_proof_is_comparison_not_recovery():
    text = (ROOT / 'src/lib/heroProof.ts').read_text()
    assert "'ThermoPest search comparison'" in text
    assert 'Pest control recovery' not in text

def test_pest_catalogue_rounding():
    text = (ROOT / 'src/pages/case-studies.astro').read_text()
    cards = re.findall(r'<article class="modern-case-card.*?</article>', text, re.S)
    assert len(cards) == 25
    pest = next(c for c in cards if '<h3 class="card-title">ThermoPest</h3>' in c)
    assert '+147.6%' in pest
    assert '+147%' not in pest
    assert round((3120000 / 1260000 - 1) * 100, 1) == 147.6

def test_pest_faq_heading_does_not_recast_case_as_recovery():
    text = (ROOT / 'src/pages/case-studies/pest-control-core-update-seo.astro').read_text()
    assert '<h2><span>Pest control SEO</span> comparison FAQs</h2>' in text
    assert 'Core update case studies should' not in text
