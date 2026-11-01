from pathlib import Path
import unittest
ROOT=Path(__file__).resolve().parents[1]
class Acceptance(unittest.TestCase):
    def test_buyer_workflow(self):
        s=(ROOT / 'src/pages/finance-crypto-seo-services.astro').read_text()
        for term in ['claim register', 'qualified financial or legal reviewer', 'application starts', 'jurisdiction']:
            self.assertIn(term,s)
        for term in ['need compliant content', 'Proof over filler', 'sustainable results usually need']:
            self.assertNotIn(term,s)
if __name__ == '__main__': unittest.main()
