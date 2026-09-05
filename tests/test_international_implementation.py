from pathlib import Path
import unittest
ROOT=Path(__file__).resolve().parents[1]
class InternationalImplementation(unittest.TestCase):
    def test_country_positioning_does_not_claim_local_base_or_overnight_completion(self):
        uk=(ROOT/'src/pages/seo-services-uk.astro').read_text()
        us=(ROOT/'src/pages/seo-services-usa.astro').read_text()
        au=(ROOT/'src/pages/seo-services-australia.astro').read_text()
        self.assertNotIn('Trusted UK SEO Agency',uk)
        self.assertNotIn('done by 8am',us)
        self.assertNotIn('delivered overnight',us.lower())
        self.assertNotIn('Same-Timezone Specialist Agency',au)
        for page in [uk,us,au]:
            self.assertIn('Philippines',page)
            self.assertIn('hreflangs={seoServicesHreflangs}',page)
    def test_new_zealand_has_its_own_honest_market_page_and_discovery(self):
        page=ROOT/'src/pages/seo-services-new-zealand.astro'
        self.assertTrue(page.exists(),'Missing NZ market page')
        text=page.read_text()
        for required in ['New Zealand','Philippines','NZD','en-NZ','speediance-nz-fitness-seo','hreflangs={seoServicesHreflangs}']:
            self.assertIn(required,text)
        for file in ['src/components/LegacyHeader.astro','src/components/Footer.astro','src/data/internationalSeoPages.js']:
            self.assertIn('/seo-services-new-zealand/',(ROOT/file).read_text())
        self.assertNotIn('Auckland office',text)
    def test_existing_owners_receive_distinct_delivery_sections(self):
        import json
        path=ROOT/'src/data/serviceEvidence.json'
        self.assertTrue(path.exists(),'Missing page-specific delivery evidence')
        panels=json.loads(path.read_text())
        self.assertEqual(len(panels),9)
        self.assertEqual(len({v['title'] for v in panels.values()}),9)
        for slug,panel in panels.items():
            self.assertGreaterEqual(len(panel['rows']),3)
            self.assertIn(f'<ServiceEvidencePanel panel={{serviceEvidence[\'{slug}\']}}',(ROOT/f'src/pages/{slug}.astro').read_text())
            self.assertTrue(all(row['body'] and row['title'] for row in panel['rows']))
    def test_new_services_have_distinct_evidence_and_do_not_spawn_unproven_sectors(self):
        for slug,proof in [('international-seo-services','speediance-nz-fitness-seo'),('b2b-seo-services','consulting-firm-seo')]:
            path=ROOT/f'src/pages/{slug}.astro'
            self.assertTrue(path.exists(),f'Missing approved distinct offer: {slug}')
            self.assertIn(proof,path.read_text())
            for file in ['LegacyHeader.astro','Footer.astro']:
                self.assertIn(f'/{slug}/',(ROOT/'src/components'/file).read_text())
        for slug in ['shopify-seo-services','dental-seo-services','healthcare-seo-services']:
            self.assertFalse((ROOT/f'src/pages/{slug}.astro').exists())
    def test_new_routes_are_reachable_from_mobile_menu(self):
        source=(ROOT/'src/components/LegacyHeader.astro').read_text().split('id="mobile-menu"',1)[1]
        for slug in ['seo-services-new-zealand','international-seo-services','b2b-seo-services']:
            self.assertIn(f'href="/{slug}/"',source)
if __name__=='__main__':unittest.main()
