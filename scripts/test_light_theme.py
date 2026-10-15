"""Structural regression for the requested white/orange rebrand, without copy changes."""
from pathlib import Path
import re,unittest
ROOT=Path(__file__).resolve().parents[1]
class LightTheme(unittest.TestCase):
 def test_light_browser_controls(self):
  t=(ROOT/'src/layouts/MainLayout.astro').read_text()
  self.assertIn('name="color-scheme" content="light"',t)
 def test_sitewide_light_foundation(self):
  t=(ROOT/'src/styles/global.css').read_text()
  self.assertNotIn('color: #e8eaf2;',t)
  self.assertNotRegex(t,r'(?<![\w-])color:\s*#ffffff\s*!important;')
  self.assertNotIn('color-scheme: dark;',t)
 def test_globe_is_contained_artwork(self):
  t=(ROOT/'src/components/HeroGlobe.astro').read_text()
  self.assertIn('/images/brand-globe.svg',t)
  self.assertNotIn('cdnjs.cloudflare.com',t)
  self.assertNotIn('<canvas',t)
  self.assertTrue((ROOT/'public/images/brand-globe.svg').exists())
 def test_shared_header_logo(self):
  self.assertIn('header-logo-light.webp',(ROOT/'src/components/LegacyHeader.astro').read_text())
if __name__=='__main__':unittest.main()
