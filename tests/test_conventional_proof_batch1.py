from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]
def page(name):
    return (ROOT / 'src/pages/case-studies' / (name + '.astro')).read_text()

class ConventionalProof(unittest.TestCase):
    def test_teamstats_observation_not_causal_how_to(self):
        s = page('football-app-seo')
        self.assertNotIn('How TeamStats increased', s)
        self.assertNotIn('the result should be framed', s)
        self.assertIn('Exact calendar dates and query filters are not shown', s)

    def test_teamstats_comparator_and_scope(self):
        s = page('football-app-seo')
        self.assertIn('Last 3 months / Same period last year', s)
        for text in ['200k', '268k', '7.14M', '9.23M', '11.4', '9.1', '2.8%', '2.9%']:
            self.assertIn(text, s)
        for text in ['transfer windows', 'predictions', 'large sports publishers', 'wider keyword set', 'first-page coverage', 'match-day search relevance', 'were mapped', 'We reviewed']:
            self.assertNotIn(text, s)
        self.assertIn('does not show how many queries', s)
        self.assertIn('Recommendations', s)

    def test_conscient_preserves_buyer_context_and_position_direction(self):
        s = page('consulting-firm-seo')
        self.assertIn('B2B tech marketing', s)
        self.assertIn('1.6 positions better', s)
        self.assertNotIn('Conscient offers business consulting services.', s)

    def test_conscient_measures_clicks_not_qualified_visits(self):
        s = page('consulting-firm-seo')
        self.assertIn('-1.2 percentage points', s)
        self.assertIn('Last 6 months / Previous 6 months', s)
        self.assertIn('Organic Clicks', s)
        for text in ['impressions widened first', 'qualified visits', 'qualified leads', 'Built authoritative backlinks', 'Enhanced site architecture', 'Sarah Thompson', 'label: "Organic Traffic"']:
            self.assertNotIn(text, s)
        for text in ['13,200', '15,700', '398,000', '742,000', '23.3', '21.7', '3.3%', '2.1%']:
            self.assertIn(text, s)
        self.assertIn('Recommended', s)

    def test_auction_worsening_is_explicit(self):
        s = page('car-auction-seo')
        self.assertGreaterEqual(s.count('8.0 positions worse'), 2)
        self.assertIn('Last 6 months / Previous 6 months', s)
        for text in ['exceptional growth', 'Implemented a holistic', 'Secured links', 'Identified high-intent']:
            self.assertNotIn(text, s)
        for text in ['31.7', '39.7', '+5%', '+32%', '398,000', '419,000', '7.96M', '10.5M', '5%', '4%']:
            self.assertIn(text, s)
        self.assertIn('Recommended', s)

    def test_recycling_decline_and_commercial_limits(self):
        s = page('car-recycling-seo')
        self.assertIn('-1.1 percentage points', s)
        self.assertIn('Last 3 months / Previous 3 months', s)
        self.assertIn('does not measure leads', s)
        for text in ['quick wins', 'Slight decrease', 'Secured links', 'delivered quick', 'qualified leads', 'exceptional growth', 'link-building that actually worked']:
            self.assertNotIn(text, s)
        for text in ['4,960', '6,380', '120,000', '213,000', '29.1', '24.9', '4.1%', '3.0%', 'Confidential Car Recycler']:
            self.assertIn(text, s)
        self.assertIn('Recommended', s)

if __name__ == '__main__':
    unittest.main()
