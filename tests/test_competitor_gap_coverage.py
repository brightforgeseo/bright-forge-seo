from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]
PAGES = ROOT / "src" / "pages"


def source(name: str) -> str:
    return (PAGES / name).read_text(encoding="utf-8")


class CompetitorGapCoverageTest(unittest.TestCase):
    def test_homepage_owns_philippines_agency_company_and_specialist_intent(self):
        page = source("index.astro")

        for phrase in (
            "Philippine SEO agencies",
            "established companies",
            "independent consultants",
            "Filipino SEO specialists",
            "accountable for the work",
        ):
            self.assertIn(phrase, page)

        self.assertIn('href="/seo-services-philippines/"', page)
        self.assertIn('href="/white-label-seo-services-philippines/"', page)

    def test_philippines_services_page_owns_core_services_and_private_pricing_intent(self):
        page = source("seo-services-philippines.astro")

        for phrase in (
            "Philippine businesses comparing SEO services",
            "joined around the same commercial goal",
            "SEO pricing in the Philippines",
            "SEO costs in the Philippines",
            "SEO packages in the Philippines",
        ):
            self.assertIn(phrase, page)

        self.assertIn('id="pricing-and-scope"', page)
        lower_page = page.lower()
        for factor in ("site size", "competition", "implementation", "content", "authority", "private proposal"):
            self.assertIn(factor, lower_page)
        self.assertFalse((PAGES / "seo-pricing-philippines.astro").exists())

        pricing_section = page.split('id="pricing-and-scope"', 1)[1].split("</section>", 1)[0]
        self.assertNotRegex(pricing_section, r"(?:₱|PHP|USD|AUD|GBP|\$|£)\s?\d")
        self.assertNotRegex(pricing_section, r"\d[\d,]*(?:\.\d+)?\s*(?:-|–|to)\s*(?:₱|PHP|USD|AUD|GBP|\$|£)?\s?\d")

    def test_white_label_page_owns_outsourcing_reseller_and_white_label_intent(self):
        page = source("white-label-seo-services-philippines.astro")

        for phrase in (
            "outsource delivery",
            "Philippines-based white-label team",
            "agreed scope",
            "reseller programmes",
        ):
            self.assertIn(phrase, page)

    def test_specialist_pages_own_every_remaining_qualified_service_cluster(self):
        expected = {
            "local-seo-services-philippines.astro": (
                "local search partner",
                "Philippine businesses",
                "Manila-focused campaigns",
            ),
            "technical-seo-services-philippines.astro": (
                "Philippine technical team",
                "one-off audit",
                "advise developers",
            ),
            "content-seo-services-philippines.astro": (
                "Philippine content team",
                "white-label agency partners",
            ),
            "on-page-seo-services-philippines.astro": (
                "on-page team",
                "Philippine and overseas campaigns",
            ),
            "backlink-seo-services-philippines.astro": (
                "Philippine link team",
                "client-safe prospect review",
            ),
            "seo-audit-services.astro": (
                "Philippine audit team",
                "implementation order",
            ),
        }

        for filename, phrases in expected.items():
            page = source(filename)
            for phrase in phrases:
                with self.subTest(filename=filename, phrase=phrase):
                    self.assertIn(phrase, page)

    def test_gap_coverage_copy_does_not_stack_exact_match_variants(self):
        combined = "\n".join(
            source(filename)
            for filename in (
                "index.astro",
                "seo-services-philippines.astro",
                "white-label-seo-services-philippines.astro",
                "local-seo-services-philippines.astro",
                "technical-seo-services-philippines.astro",
                "content-seo-services-philippines.astro",
                "on-page-seo-services-philippines.astro",
                "backlink-seo-services-philippines.astro",
                "seo-audit-services.astro",
            )
        )
        for stuffed_fragment in (
            "SEO agency in the Philippines, an SEO company in the Philippines",
            "local SEO company in the Philippines, a local SEO agency in the Philippines",
            "technical SEO agency in the Philippines, commission a technical SEO audit in the Philippines",
            "content SEO agency in the Philippines, we provide content SEO services in the Philippines",
        ):
            self.assertNotIn(stuffed_fragment, combined)

    def test_gap_coverage_does_not_create_duplicate_country_or_pricing_routes(self):
        forbidden = (
            "seo-pricing-philippines.astro",
            "seo-outsourcing-australia.astro",
            "seo-outsourcing-uk.astro",
            "seo-outsourcing-usa.astro",
        )
        for filename in forbidden:
            self.assertFalse((PAGES / filename).exists())


if __name__ == "__main__":
    unittest.main()
