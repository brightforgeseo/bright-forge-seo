from pathlib import Path
import unittest
ROOT=Path(__file__).resolve().parents[1]
class Acceptance(unittest.TestCase):
    def test_buyer_workflow(self):
        s=(ROOT / 'src/pages/development/index.astro').read_text()
        for term in ['Plan for launch risk', 'own-brand demonstration', 'dependency updates', 'rollback decision']:
            self.assertIn(term,s)
        for term in ['Launch without a drop', 'dies on a phone', 'Fashion frameworks', 'not the fashion cycle']:
            self.assertNotIn(term,s)
if __name__ == '__main__': unittest.main()
