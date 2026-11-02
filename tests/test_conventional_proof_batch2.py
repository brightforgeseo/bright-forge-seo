"""Claim-level regressions; figures stay separate from causal explanations."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def source(slug):
    return (ROOT / 'src/pages/case-studies' / f'{slug}.astro').read_text()

def test_boiler_comparison_and_recommendations_not_implementation():
    s = source('boiler-heating-spares-seo')
    assert '<h3>Category access</h3>' in s
    assert '<h3>Search metrics and orders</h3>' in s
    assert 'Last 6 months versus Previous 6 months' in s
    assert 'Recommended catalogue checks' in s
    assert 'does not establish snippet causation' in s
    for claim in ['We separated boiler model searches', 'We supported the stronger page structure', 'More qualified entry points', 'A modest snippet improvement matters']:
        assert claim not in s
    for proof in ['14.1k', '16.6k', '1.06M', '1.17M', '18.5', '18.0', '1.3%', '1.4%']:
        assert proof in s

def test_wallet_no_snippet_causation_rank_distribution_or_qualified_visits():
    s = source('leather-wallet-ecommerce-seo')
    assert 'Arizona-based Lost Dutchman Leather makes full-grain wallets by hand in the USA.' in s
    assert 'Last 3 months versus Same period last year' in s
    assert 'Recommended product-page checks' in s
    assert 'not orders or revenue' in s
    for claim in ['mostly beyond the first page', 'qualified visits', 'qualified shoppers', 'We tightened titles', 'by improving snippets', 'Second-page improvements', 'page two territory']:
        assert claim not in s
    for proof in ['15.2k', '22.7k', '485k', '500k', '3.1%', '4.5%', '15.2', '13.8', 'Arizona']:
        assert proof in s


def test_industrial_published_values_not_misrepresented_as_visible_raw_evidence():
    s = source('industrial-parts-washing-search-growth')
    assert 'Previous-window totals and CTR are retained from the published comparison' in s
    assert 'efficiency work still to do' not in s
    assert 'clear optimisation work remaining' not in s
    assert 'a clear next optimisation focus' not in s


def test_industrial_no_intent_inference_and_date_conflict_disclosed():
    s = source('industrial-parts-washing-search-growth')
    assert 'more relevant searches overall' not in s
    assert 'isolate the newly visible query groups' not in s
    assert '6 February to 3 August 2026' in s
    assert '7 May to 4 August 2026' not in s
    assert 'exact comparison endpoints' in s
    for proof in ['704', '1,054', '44,715', '75,544', '13.6', '15.6', '1.57%', '1.40%']:
        assert proof in s


def test_garden_totals_do_not_establish_fixed_demand_or_snippet_cause():
    s = source('garden-products-search-growth')
    assert 'same queries and pages' in s
    assert 'not prove a snippet change caused' in s
    for claim in ['CTR did the commercial work', 'demand the site already reached', 'CTR and position tell you if the result itself got stronger']:
        assert claim not in s
    for proof in ['1,883', '2,804', '57,221', '58,048', 'orders', '31 May to 28 August 2026']:
        assert proof in s


def test_presentation_only_position_values_are_attributed():
    for slug in ['custom-home-builder-search-growth', 'garden-products-search-growth']:
        s = source(slug)
        assert 'Average-position values are retained from the published comparison' in s
        assert 'not displayed in this totals chart' in s


def test_builder_query_expansion_is_hypothesis_not_observed_cause():
    s = source('custom-home-builder-search-growth')
    assert 'observational comparison' in s
    assert 'new queries could' in s
    assert 'as coverage widened' not in s
    assert 'ranking work still to do on the new queries' not in s
    for proof in ['7,201', '9,634', '431,104', '469,097', '18.0', '24.0', '31 May to 28 August 2026']:
        assert proof in s


def test_bridal_same_period_year_earlier_not_rank_distribution():
    s = source('bridal-dress-designer-seo')
    assert 'Last 3 months versus Same period last year' in s
    assert '7.41k' in s
    assert 'Recommended bridal-page checks' in s
    assert 'What does the bridal Search Console comparison show?' in s
    for claim in ['page-three', 'page-two', 'page three', 'page two', 'We separated broad inspiration', 'campaign strengthened']:
        assert claim not in s
    for proof in ['17.6k', '+137.5%', '342k', '746k', '24.8', '14.9', '2.2%', '2.4%', 'Sheffield']:
        assert proof in s
