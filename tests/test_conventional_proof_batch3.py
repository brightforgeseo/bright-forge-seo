from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
def source(slug):
    return (ROOT / 'src/pages/case-studies' / (slug + '.astro')).read_text().split('<style>')[0]

def test_pest_comparison_not_causal_recovery():
    s = source('pest-control-core-update-seo')
    assert 'Last 6 months versus Previous 6 months' in s
    assert 'Recommended treatment-page checks' in s
    assert 'does not identify a core update' in s
    assert '+147.6%' in s
    assert '147.6% increases use the rounded totals' in s
    for claim in ['How ThermoPest recovered', 'We tightened', 'We strengthened', 'The campaign was adjusted', 'wider recovery across relevant searches', 'lost trust', 'without wasting the extra reach']:
        assert claim not in s
    for number in ['10.3k', '23.5k', '1.26M', '3.12M', '19.1', '17.2', '0.8%']:
        assert number in s

def test_scaffolding_dates_and_ctr_precision():
    s = source('regional-scaffolding-growth')
    assert '6 February to 3 August 2026' in s
    assert 'split at 6 May' in s
    assert '7 May to 4 August' not in s
    assert '33.8%' in s
    assert 'calculated from the reported click and impression totals' in s
    assert 'not proof of better snippets' in s
    assert 'Recommended service-page review' in s
    for number in ['1,016', '1,216', '272,961', '244,153', '18.1', '14.7']:
        assert number in s

def test_pvc_no_first_page_distribution_inference():
    s = source('pvc-building-products-search-growth')
    assert 'redacted presentation chart' in s
    assert 'Recommended product-page checks' in s
    assert 'first-page mix' not in s
    assert 'Thin category pages miss' not in s
    assert 'does not show how many queries ranked on page one' in s
    assert '170 to 1,311' in s

def test_pool_no_inferred_new_queries():
    s = source('pool-control-systems-search-growth')
    assert 'redacted presentation chart' in s
    assert 'Recommended catalogue review' in s
    for claim in ['as search coverage expanded', 'new queries entered', 'once product language is indexed', 'A thin distributor site']:
        assert claim not in s
    assert '31 May to 28 August 2026' in s
    assert '168 to 302' in s

def test_phoenix_recommendations_not_delivery():
    s = source('phoenix-spa-beauty-seo')
    assert 'Recommended <span>booking-path checks</span>' in s
    assert 'not a record of completed campaign work' in s
    for claim in ['drove significant traffic growth', 'Earned links', 'Improved site speed', 'Enhanced Google Business Profile', 'drives foot-traffic']:
        assert claim not in s
    for number in ['5,570', '9,480', '145,000', '418,000', '21.5', '17.8', '2.3%', '3.8%']:
        assert number in s
