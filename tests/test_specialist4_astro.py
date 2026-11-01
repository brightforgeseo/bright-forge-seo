from pathlib import Path
import unittest
ROOT=Path(__file__).resolve().parents[1]
class Acceptance(unittest.TestCase):
    def test_buyer_workflow(self):
        s=(ROOT / 'src/pages/development/astro.astro').read_text()
        for term in ['publishing-workflow', 'hosting-specific adapter', 'code-managed templates', 'generated sitemap']:
            self.assertIn(term,s)
        for term in ['No stale XML file', 'not around fashion', 'not the fashion cycle']:
            self.assertNotIn(term,s)
if __name__ == '__main__': unittest.main()
