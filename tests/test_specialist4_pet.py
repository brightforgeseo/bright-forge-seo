from pathlib import Path
import unittest
ROOT=Path(__file__).resolve().parents[1]
class Acceptance(unittest.TestCase):
    def test_buyer_workflow(self):
        s=(ROOT / 'src/pages/pet-seo-services.astro').read_text()
        for term in ['qualified veterinary reviewer', 'For example, a boarding page may need accepted species', 'attended appointments', 'dimensions']:
            self.assertIn(term,s)
        for term in ['Proof over filler', 'sustainable results usually need', 'poor review practices']:
            self.assertNotIn(term,s)
if __name__ == '__main__': unittest.main()
