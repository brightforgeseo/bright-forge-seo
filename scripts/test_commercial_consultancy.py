import unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
class Coverage(unittest.TestCase):
 def test_consultancy_has_existing_owner_and_visible_offer(self):
  s=(ROOT/'src/pages/seo-audit-services.astro').read_text()
  self.assertIn('title="SEO Audit & Consultancy Philippines | Bright Forge"',s)
  self.assertIn('SEO Audits and <span>Consultancy in the Philippines</span>',s)
  self.assertIn('id="seo-consultancy"',s)
  self.assertIn('What needs a consultant, and what needs a delivery team?',s.replace('<span>','').replace('</span>',''))
  self.assertIn('href="/seo-services-philippines/"',s)
  self.assertFalse((ROOT/'src/pages/seo-consultancy.astro').exists())
 def test_desktop_mobile_discover_consultancy_on_existing_route(self):
  s=(ROOT/'src/components/LegacyHeader.astro').read_text()
  self.assertEqual(s.count('SEO Audits &amp; Consultancy'),2)
if __name__=='__main__':unittest.main()
