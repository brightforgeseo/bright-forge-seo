"""Spelling by market: American English by default, British-style spelling on the UK, Australia and
New Zealand pages. The built-site check runs in CI through `npm run qa:static`; these tests pin its rules."""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from market_spelling import check_dist  # noqa: E402

PAGES = ROOT / "src/pages"


def build(tmp_path, pages):
    for route, body in pages.items():
        target = tmp_path / route.strip("/") / "index.html" if route != "/" else tmp_path / "index.html"
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(f"<html><head><title>T</title></head><body>{body}</body></html>", encoding="utf-8")
    return tmp_path


def test_general_pages_reject_british_spelling(tmp_path):
    dist = build(tmp_path, {"/": "<p>We optimise the catalogue and track every enquiry.</p>"})
    found = " ".join(check_dist(dist))
    for word in ("optimise", "catalogue", "enquiry"):
        assert f"'{word}'" in found


def test_country_pages_reject_american_spelling(tmp_path):
    dist = build(tmp_path, {
        "/seo-services-uk/": "<p>We optimize the catalog.</p>",
        "/seo-services-australia/": "<img alt='Organization chart'>",
        "/seo-services-new-zealand/": "<p>Send your inquiry.</p>",
    })
    found = " ".join(check_dist(dist))
    for word in ("optimize", "catalog", "Organization", "inquiry"):
        assert f"'{word}'" in found


def test_each_market_passes_in_its_own_spelling(tmp_path):
    dist = build(tmp_path, {
        "/": "<p>We optimize the catalog and track every inquiry. See the SEO Command Centre.</p>",
        "/seo-services-uk/": "<p>We optimise the catalogue. AI Search Optimization is our service name.</p>",
        "/seo-services-australia/": "<p>Australian English (optimisation, not optimization).</p>",
        "/blog/an-article/": "<h1>Site Speed Optimisation for Service Businesses</h1>",
        "/blog/": "<a href='/blog/an-article/'>Site Speed Optimisation for Service Businesses</a>",
    })
    assert check_dist(dist) == []


def test_country_pages_still_say_which_english_they_use():
    assert "British English" in (PAGES / "seo-services-uk.astro").read_text(encoding="utf-8")
    assert "Australian English" in (PAGES / "seo-services-australia.astro").read_text(encoding="utf-8")
    assert "American English" in (PAGES / "seo-services-usa.astro").read_text(encoding="utf-8")


def test_shared_header_takes_the_market_spelling():
    header = (ROOT / "src/components/LegacyHeader.astro").read_text(encoding="utf-8")
    helper = (ROOT / "src/lib/marketSpelling.ts").read_text(encoding="utf-8")
    assert "spellingFor(Astro.url.pathname)" in header
    for route in ("/seo-services-uk", "/seo-services-australia", "/seo-services-new-zealand"):
        assert f"'{route}'" in helper
