from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]
PAGES = ROOT / "src" / "pages"


class OverseasCommercialPagesTest(unittest.TestCase):
    def test_white_label_page_owns_agency_fulfilment_across_au_and_uk(self):
        source = (PAGES / "white-label-seo-services-philippines.astro").read_text()

        self.assertIn('id="markets-and-pricing"', source)
        self.assertIn('href="/seo-services-australia/"', source)
        self.assertIn('href="/seo-services-uk/"', source)
        self.assertIn('href="/seo-services-usa/"', source)
        self.assertIn('AUD', source)
        self.assertIn('GBP', source)
        self.assertIn('USD', source)
        self.assertIn('class="market-ledger"', source)
        self.assertNotIn('AI Prompts', source)

    def test_technical_page_explains_overseas_and_agency_delivery(self):
        source = (PAGES / "technical-seo-services-philippines.astro").read_text()

        self.assertIn('id="international-delivery"', source)
        self.assertIn('href="/seo-services-australia/"', source)
        self.assertIn('href="/seo-services-uk/"', source)
        self.assertIn('href="/seo-services-usa/"', source)
        self.assertIn('href="/white-label-seo-services-philippines/"', source)
        self.assertIn('href="/ecommerce-seo-services/"', source)
        self.assertIn('class="delivery-notes"', source)
        self.assertNotIn('href="mailto:seo@brightforgeseo.com" text="Email Bright Forge"', source)

    def test_content_page_serves_overseas_brands_without_another_free_offer(self):
        source = (PAGES / "content-seo-services-philippines.astro").read_text()

        self.assertIn('id="international-content"', source)
        self.assertIn('href="/seo-services-australia/"', source)
        self.assertIn('href="/seo-services-uk/"', source)
        self.assertIn('href="/seo-services-usa/"', source)
        self.assertIn('href="/white-label-seo-services-philippines/"', source)
        self.assertIn('href="/ecommerce-seo-services/"', source)
        self.assertIn('class="editorial-markets"', source)
        self.assertIn('Australian English', source)
        self.assertIn('British English', source)
        self.assertIn('American English', source)
        self.assertNotIn('Free Content SEO Audit', source)
        self.assertNotIn('free content SEO audit', source)
        self.assertNotIn('href="mailto:seo@brightforgeseo.com" text="Email the Team"', source)


if __name__ == "__main__":
    unittest.main()
