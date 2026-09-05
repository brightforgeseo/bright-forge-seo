from pathlib import Path
import re
import unittest
ROOT=Path(__file__).resolve().parents[1]
class CountryMenu(unittest.TestCase):
    def test_countries_have_icons_in_both_menus(self):
        source=(ROOT/'src/components/LegacyHeader.astro').read_text()
        desktop,mobile=source.split('id="mobile-menu"',1)
        for market,flag in [('uk','🇬🇧'),('usa','🇺🇸'),('australia','🇦🇺'),('new-zealand','🇳🇿')]:
            for menu in [desktop,mobile]:
                links=re.findall(r'<a\b[^>]*href="/seo-services-'+market+r'/"[^>]*>(.*?)</a>',menu,re.S)
                self.assertEqual(len(links),1,market)
                self.assertIn('class="menu-icon"',links[0])
    def test_nz_footer_remains_present_once(self):
        source=(ROOT/'src/components/Footer.astro').read_text()
        self.assertEqual(source.count('href="/seo-services-new-zealand/"'),1)
