from pathlib import Path
import unittest
ROOT=Path(__file__).resolve().parents[1]
class Acceptance(unittest.TestCase):
    def test_buyer_workflow(self):
        s=(ROOT / 'src/pages/football-soccer-seo-services.astro').read_text()
        for term in ['An academy page should explain age range', 'For example, a coaching page may need to explain', 'Season-aware pages', 'not evidence of academy bookings', 'football and soccer']:
            self.assertIn(term,s)
        for term in ['Proof over filler', 'sustainable results usually need', 'How long does football SEO take']:
            self.assertNotIn(term,s)
if __name__ == '__main__': unittest.main()
