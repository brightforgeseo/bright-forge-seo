"""Claim regressions tied to the recovered original GEO reports, not public copy."""
import json
from pathlib import Path
import unittest
ROOT=Path(__file__).resolve().parents[1]

def data(slug):
    s=(ROOT/'src/pages/case-studies'/f'{slug}.astro').read_text()
    return json.loads(s.split('const data = ',1)[1].split(';\n---',1)[0])

class AIProofSources(unittest.TestCase):
    def test_template_labels_review_not_implementation(self):
        s=(ROOT/'src/components/AICaseStudyPage.astro').read_text()
        self.assertIn('data.measurementNote',s)
        self.assertNotIn('>What changed<',s)
        self.assertNotIn('>Before<',s)
        self.assertNotIn('>After<',s)
        self.assertNotIn('decide whether AI systems',s)

    def check_case(self,slug,omitted):
        d=data(slug); text=json.dumps(d)
        self.assertIn('original GEO Performance Report',d['measurementNote'])
        self.assertIn('not confirmed',text)
        self.assertIn('Review findings',d['workLabel'])
        self.assertIn('August 2025',text)
        self.assertNotIn('Growth |',d['metaTitle'])
        for phrase in omitted:self.assertNotIn(phrase,text)
        self.assertEqual(4,len(d['metrics']))
        self.assertEqual(4,len(d['results']))
        self.assertGreaterEqual(len(d['workstreams']),5)
        self.assertEqual(5,len(d['faqs']))

    def test_bridal(self):
        self.check_case('ai-bridal-ecommerce-geo',['+71.6%','8,600','12:53','because they answered','AI engines reward','rate dipped because'])
    def test_bridal_heading_does_not_infer_unrecorded_ai_questions(self):
        heading = data('ai-bridal-ecommerce-geo')['problemTitle']
        self.assertNotIn('ask AI systems', heading)
        self.assertIn('compare', heading)

    def test_fintech(self):
        self.check_case('ai-fintech-saas-geo',['83:59','7:11','5:09','1.95%','strongest quality signal','earned 1,322','high engagement'])
    def test_leather(self):
        self.check_case('ai-leather-goods-ecommerce-geo',['5 to 10x','19.05%','5.04%','9:40','outperformed broad','meaningful conversion activity'])
    def test_storage(self):
        self.check_case('ai-self-storage-geo',['8.2%','1:06:03','11:43','5:11','measurable enquiries','showed commercial intent'])
    def test_sports_does_not_invent_exact_report_days(self):
        self.assertNotIn('1 August 2025', data('ai-sports-saas-geo')['measurementNote'])

    def test_sports(self):
        self.check_case('ai-sports-saas-geo',['162','239','155 mentions','0 mentions','1.45%','anonymous AI citations','high-converting','biggest platform weakness'])
    def test_service(self):
        s=(ROOT/'src/pages/ai-search-optimization-services-philippines.astro').read_text()
        for number in ['4,549','162 AI','239 AI','1,322','893 AI','13 tracked']:
            self.assertNotIn(number,s)
        for topic in ['Industrial suppliers','Local and trade services','Professional services','Ecommerce','laptop bag','parts washer']:
            self.assertIn(topic,s)
        self.assertIn('Report reviews',s)
    def test_service_does_not_publish_an_undefined_case_count(self):
        s=(ROOT/'src/pages/ai-search-optimization-services-philippines.astro').read_text()
        self.assertNotIn('<strong>17</strong><span>Published case studies', s)

    def test_catalogue(self):
        s=(ROOT/'src/pages/case-studies.astro').read_text()
        for number in ['4,549','+662.5%','893','1,322','162','239','88 LLM']:
            self.assertNotIn(number,s)
        for slug in ['ai-bridal-ecommerce-geo','ai-fintech-saas-geo','ai-leather-goods-ecommerce-geo','ai-self-storage-geo','ai-sports-saas-geo']:
            self.assertIn(slug,s)

if __name__=='__main__':unittest.main()
