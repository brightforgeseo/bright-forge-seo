from pathlib import Path
import unittest
ROOT=Path(__file__).resolve().parents[1]
class Acceptance(unittest.TestCase):
    def test_buyer_workflow(self):
        s=(ROOT / 'src/pages/gaming-seo-services.astro').read_text()
        for term in ['patch version', 'outbound store clicks', 'Moderation policy', 'separate agreed scope']:
            self.assertIn(term,s)
        for term in ['Proof over filler', 'sustainable results usually need', 'not vanity traffic']:
            self.assertNotIn(term,s)
if __name__ == '__main__': unittest.main()
