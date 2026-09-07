from pathlib import Path
import unittest
ROOT=Path(__file__).resolve().parents[1]
class IntentCoverage(unittest.TestCase):
 def test_distinct_buyer_questions_have_visible_sections(self):
  for page,section,phrase in [('development/index.astro','store-build-scope','Ecommerce web design'),('local-seo-services-philippines.astro','local-authority','Local links'),('ecommerce-seo-services.astro','store-page-roles','homepage')]:
   with self.subTest(page=page):
    s=(ROOT/'src/pages'/page).read_text()
    self.assertIn('id="'+section+'"',s)
    self.assertIn(phrase,s)
 def test_remaining_review_requirements(self):
  dev=(ROOT/'src/pages/development/index.astro').read_text()
  local=(ROOT/'src/pages/local-seo-services-philippines.astro').read_text()
  self.assertIn('For Manila businesses',dev)
  self.assertIn('test an enquiry path',dev)
  self.assertIn('branch inventory',local)
  self.assertIn('profile eligibility',local)
if __name__=='__main__':unittest.main()
