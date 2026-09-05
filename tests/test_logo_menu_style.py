from pathlib import Path
import unittest
R=Path(__file__).resolve().parents[1]
class LogoMenuStyle(unittest.TestCase):
    def test_logo_tiles_are_transparent_and_images_white(self):
        s=(R/'src/components/TrustedBySection.astro').read_text()
        item=s.split('  .logo-item {',1)[1].split('}',1)[0]
        image=s.split('  .logo-item img {',1)[1].split('}',1)[0]
        self.assertIn('background: transparent;',item)
        self.assertIn('filter: brightness(0) invert(1);',image)
    def test_menu_icons_are_orange_vectors_not_colour_emoji(self):
        s=(R/'src/components/LegacyHeader.astro').read_text()
        for emoji in ['🌍','💼','🇬🇧','🇺🇸','🇦🇺','🇳🇿']:self.assertNotIn(emoji,s)
        self.assertIn('color: #f0622a;',s)
        self.assertGreaterEqual(s.count('class="menu-icon"'),12)
