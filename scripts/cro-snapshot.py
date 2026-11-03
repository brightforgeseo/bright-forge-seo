"""Built metadata/preservation inventory. Run against a completed, idle build."""
import hashlib
import json
import sys
from pathlib import Path
from bs4 import BeautifulSoup

root = Path(sys.argv[1])
output = Path(sys.argv[2])
rows = {}
for path in sorted(root.rglob('*.html')):
    soup = BeautifulSoup(path.read_text(), 'html.parser')
    rel = str(path.relative_to(root))
    rows[rel] = {
        'title': soup.title.get_text() if soup.title else None,
        'meta': [dict(x.attrs) for x in soup.select('meta')],
        'canonical': [dict(x.attrs) for x in soup.select('link[rel=canonical]')],
        'schema': [json.loads(x.string or x.get_text()) for x in soup.select('script[type="application/ld+json"]')],
        'article': str(soup.select_one('.content-body')) if soup.select_one('article.blog-article') else None,
        'consumers': {
            'analytics_scope': bool(soup.select_one('script[data-analytics-scope]')),
            'lead_tracking': 'BFLeadTracking' in path.read_text(),
            'popup': bool(soup.select_one('#contact-popup-overlay')),
            'contact_cta': bool(soup.select_one('.contact-cta-section')),
        },
    }
output.write_text(json.dumps(rows, indent=2, ensure_ascii=False))
print(f'Saved {len(rows)} built HTML routes to {output}')
