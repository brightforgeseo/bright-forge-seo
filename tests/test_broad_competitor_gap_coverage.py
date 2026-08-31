from pathlib import Path
import json
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]
PAGES = ROOT / "src" / "pages"
FIXTURE = ROOT / "tests" / "fixtures" / "broad_competitor_gap_clusters.json"


def source(name: str) -> str:
    return (PAGES / name).read_text(encoding="utf-8")


class BroadCompetitorGapCoverageTest(unittest.TestCase):
    def test_every_qualified_cluster_has_one_existing_owner(self):
        clusters = json.loads(FIXTURE.read_text(encoding="utf-8"))
        names = [item["cluster"] for item in clusters]
        self.assertEqual(len(clusters), 18)
        self.assertEqual(len(names), len(set(names)))
        self.assertEqual(sum(item["evidence_rows"] for item in clusters), 135)
        for item in clusters:
            with self.subTest(cluster=item["cluster"]):
                self.assertTrue((PAGES / item["owner"]).exists())

    def test_homepage_owns_broad_strategy_and_consulting_intent(self):
        page = source("index.astro").lower()
        for concept in ("seo strategy", "seo consulting", "commercial roadmap"):
            self.assertIn(concept, page)

    def test_development_page_owns_broad_design_build_outsourcing_and_new_site_intent(self):
        page = source("development/index.astro").lower()
        for concept in (
            "web design",
            "web development",
            "philippine and international businesses",
            "outsource",
            "new website seo",
            "responsive",
        ):
            self.assertIn(concept, page)
        self.assertIn('id="pricing-and-scope"', page)

    def test_development_pricing_intent_is_private_and_discloses_no_amounts(self):
        page = source("development/index.astro")
        section = page.split('id="pricing-and-scope"', 1)[1].split("</section>", 1)[0]
        lower_section = section.lower()
        for factor in ("site size", "design", "content", "integrations", "private proposal"):
            self.assertIn(factor, lower_section)
        self.assertNotRegex(section, r"(?:₱|PHP|USD|AUD|GBP|\$|£)\s?\d")
        self.assertNotRegex(section, r"\d[\d,]*(?:\.\d+)?\s*(?:-|–|to)\s*(?:₱|PHP|USD|AUD|GBP|\$|£)?\s?\d")

    def test_wordpress_page_owns_wordpress_development_and_seo_intent(self):
        page = source("development/wordpress.astro").lower()
        for concept in ("wordpress development in the philippines", "wordpress seo", "wordpress developer"):
            self.assertIn(concept, page)

    def test_existing_specialist_pages_keep_their_distinct_clusters(self):
        expected = {
            "ecommerce-seo-services.astro": ("shopify seo", "woocommerce seo"),
            "local-seo-services-philippines.astro": ("multi-location brands", "location-page structure"),
            "seo-audit-services.astro": ("seo audit checklist", "prioritised roadmap"),
            "on-page-seo-services-philippines.astro": ("title tags and meta descriptions",),
            "keyword-research-services.astro": ("competitor gap analysis",),
            "seo-command-centre.astro": ("seo dashboard", "reporting"),
            "ai-search-optimization-services-philippines.astro": ("ai seo",),
        }
        for filename, concepts in expected.items():
            page = source(filename).lower()
            for concept in concepts:
                with self.subTest(filename=filename, concept=concept):
                    self.assertIn(concept, page)

    def test_broad_pass_creates_no_strategy_development_pricing_or_duplicate_country_routes(self):
        for filename in (
            "seo-strategy-services.astro",
            "web-development-pricing-philippines.astro",
            "web-design-pricing-philippines.astro",
            "web-development-australia.astro",
            "web-development-uk.astro",
            "web-development-usa.astro",
        ):
            self.assertFalse((PAGES / filename).exists())

    def test_public_copy_does_not_stack_near_duplicate_variants(self):
        combined = "\n".join(
            source(name)
            for name in (
                "index.astro",
                "development/index.astro",
                "development/wordpress.astro",
                "ecommerce-seo-services.astro",
                "seo-audit-services.astro",
            )
        )
        for stuffed in (
            "web design company in the Philippines, web development company in the Philippines",
            "SEO strategy, SEO strategies, SEO consulting",
            "WordPress developer Philippines, WordPress development Philippines",
            "Shopify SEO, WooCommerce SEO, ecommerce SEO services",
        ):
            self.assertNotIn(stuffed, combined)


if __name__ == "__main__":
    unittest.main()
