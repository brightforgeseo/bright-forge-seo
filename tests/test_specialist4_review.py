from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def test_workbench_claims_match_observed_demo_scope():
    source = (ROOT / 'src/components/DevelopmentWorkbench.astro').read_text()
    assert 'Reduced-motion safe' not in source
    assert 'Muted video loop' in source
    assert 'Routes return 200: cases, studio, services, contact' not in source
    assert 'Studio redirects to About' in source
    assert 'Hero video that still ranks as a document' not in source
    assert 'Hero video with readable page content' in source
    assert '<iframe' in source and 'hero.mp4' in source
    assert source.count('role="tab"') == 4


def test_pet_editorial_copy_is_buyer_specific():
    source = (ROOT / "src/pages/pet-seo-services.astro").read_text()
    assert 'For <span>pet SEO</span> businesses reviewing bookings or catalogue discovery' not in source
    assert 'For <span>pet businesses</span> reviewing bookings or catalogue discovery' in source
    assert 'A practical SEO process for <span>pet SEO</span>' not in source
    assert 'Improve the path to <span>an appointment or purchase</span>' in source
    assert 'Prepare an example page brief' not in source
    assert 'Prepare the page brief' in source
    assert 'An illustrative boarding page might need' not in source
    assert 'For example, a boarding page may need' in source
    assert 'Connect industry work to the wider SEO system.' not in source
    assert 'Plan appointment or catalogue improvements within the wider search campaign.' in source
    assert 'Fix crawl, speed, structure and indexation limits.' not in source
    assert 'Check service-page access, product variants and mobile usability.' in source
    assert 'Build pages that answer real buyer questions.' not in source
    assert 'Brief service and product pages with the right factual review.' in source


def test_gaming_editorial_copy_is_buyer_specific():
    source = (ROOT / "src/pages/gaming-seo-services.astro").read_text()
    assert 'For <span>gaming SEO</span> teams with a release, catalogue or guide library' not in source
    assert 'For <span>gaming teams</span> with a release, catalogue or guide library' in source
    assert 'A practical SEO process for <span>gaming SEO</span>' not in source
    assert 'From release plans to <span>search-ready pages</span>' in source
    assert 'These are illustrative brief fields for the product team to confirm, not features we infer from the trailer.' not in source
    assert 'Your product team confirms those details against the current build.' in source
    assert 'Connect industry work to the wider SEO system.' not in source
    assert 'Connect title launches and catalogue priorities to the wider search campaign.' in source
    assert 'Fix crawl, speed, structure and indexation limits.' not in source
    assert 'Check trailer delivery, crawlable descriptions and guide archives.' in source
    assert 'Build pages that answer real buyer questions.' not in source
    assert 'Plan game pages and guides around discovery and player questions.' in source


def test_football_editorial_copy_is_buyer_specific():
    source = (ROOT / "src/pages/football-soccer-seo-services.astro").read_text()
    assert 'SEO for football clubs, academies, apps and sports brands that need stronger search visibility, content structure and fan acquisition.' not in source
    assert 'SEO for football clubs, academies and apps: programme pages, season updates, software comparisons and booking or signup paths.' in source
    assert 'For <span>football SEO</span> teams planning the next season or product campaign' not in source
    assert 'For <span>football businesses</span> planning the next season or product campaign' in source
    assert 'A practical SEO process for <span>football SEO</span>' not in source
    assert 'Plan the pages around <span>your season or product</span>' in source
    assert 'An illustrative academy page would explain' not in source
    assert 'An academy page should explain' in source
    assert 'For an illustrative coaching enquiry, the missing answer might be' not in source
    assert 'For example, a coaching page may need to explain' in source
    assert 'Connect industry work to the wider SEO system.' not in source
    assert 'Plan programme or product pages within the wider search campaign.' in source
    assert 'Fix crawl, speed, structure and indexation limits.' not in source
    assert 'Check recurring season URLs, archives and mobile page delivery.' in source
    assert 'Build pages that answer real buyer questions.' not in source
    assert 'Brief programme information, feature pages and useful supporting guides.' in source


def test_finance_editorial_copy_is_buyer_specific():
    source = (ROOT / "src/pages/finance-crypto-seo-services.astro").read_text()
    assert 'For <span>finance and crypto SEO</span> teams with a product and a review owner' not in source
    assert 'For <span>finance and crypto businesses</span> with a product and a review owner' in source
    assert 'A practical SEO process for <span>finance and crypto SEO</span>' not in source
    assert 'From product facts to <span>approved page changes</span>' in source
    assert 'Connect industry work to the wider SEO system.' not in source
    assert 'Plan product-page work alongside the wider search campaign.' in source
    assert 'Fix crawl, speed, structure and indexation limits.' not in source
    assert 'Review public-page crawling, performance and indexation controls.' in source
    assert 'Build pages that answer real buyer questions.' not in source
    assert 'Turn approved product facts into useful page briefs.' in source
