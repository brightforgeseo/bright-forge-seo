"""Page-specific acceptance contracts; run each repair before and after editing."""
from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]

class SpecialistBatch5(unittest.TestCase):
    def test_nextjs(self):
        s = (ROOT / 'src/pages/development/nextjs.astro').read_text()
        for term in ['revalidation', 'Draft Mode', 'static export', 'authenticated', 'version', 'rollback']:
            self.assertIn(term, s)
        self.assertNotIn('If Googlebot gets a spinner, the architecture is wrong.', s)

    def test_react(self):
        s = (ROOT / 'src/pages/development/react.astro').read_text()
        for term in ['library', 'keyboard', 'loading', 'error', 'API', 'backend', 'publishing', 'dependencies']:
            self.assertIn(term, s)
        self.assertNotIn('If the page is mostly copy, React is the wrong default.', s)

    def test_sveltekit(self):
        s = (ROOT / 'src/pages/development/sveltekit.astro').read_text()
        for term in ['adapter', 'form actions', 'prerender', 'JavaScript', 'CMS', 'rollback', 'Illustrative']:
            self.assertIn(term, s)
        self.assertNotIn('Fast and uncrawlable is a rebuild waiting to happen.', s)

    def test_wordpress(self):
        s = (ROOT / 'src/pages/development/wordpress.astro').read_text()
        for term in ['database', 'files', 'staging', 'licence', 'restore', 'dependencies']:
            self.assertIn(term, s)
        self.assertNotIn('Plugin diet', s)
        self.assertNotIn('plugin pile', s)

    def test_b2b_proof(self):
        s = (ROOT / 'src/pages/b2b-seo-services.astro').read_text()
        self.assertIn('calendar dates', s)
        self.assertIn('filters', s)
        self.assertIn('3.3% to 2.1%', s)
        self.assertIn('not proof of a particular sales pipeline', s)

    def test_international_retains_boundaries(self):
        s = (ROOT / 'src/pages/international-seo-services.astro').read_text()
        for term in ['UK, US, Australia', 'Philippines-based', 'reciprocal hreflang', 'separately scoped', 'does not establish']:
            self.assertIn(term, s)

if __name__ == '__main__':
    unittest.main()
