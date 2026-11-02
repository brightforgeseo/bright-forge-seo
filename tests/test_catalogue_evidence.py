"""Catalogue must describe measurements, not unsupported causes or leads."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]

def test_conventional_catalogue_measurement_boundaries():
    source = (ROOT / 'src/pages/case-studies.astro').read_text()
    for unsupported in ['>Organic Traffic<', 'generating more qualified leads',
                        'CTR did the work, not market growth', 'as coverage widened',
                        'wider pool of equipment and process searches',
                        'by tightening wallet snippets', 'by covering football team management',
                        'by tying service pages to Brighton demand',
                        'with B2B consultancy content that matched',
                        'through targeted SEO strategies',
                        'by tightening catalogue structure',
                        'after a Google core update by tightening',
                        'stronger stories show search visibility becoming enquiries']:
        assert unsupported not in source
    assert 'CTR fell from 4.1% to 3.0%' in source
    assert '31.7 to 39.7' in source
    assert 'same period a year earlier' in source
    assert 'recommendations separately from completed work' in source
    assert len(re.findall('class="modern-case-card ', source)) == 25
    assert source.count('>Organic Clicks<') == 6
