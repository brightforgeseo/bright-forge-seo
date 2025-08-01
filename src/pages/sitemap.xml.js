export async function GET() {
  // Complete sitemap rebuild with proper XML structure
  const currentDate = '2025-08-01';
  
  const urls = [
    // Homepage
    { url: 'https://brightforgeseo.com/', lastmod: currentDate, changefreq: 'weekly', priority: '1.0' },
    
    // Main SEO Services
    { url: 'https://brightforgeseo.com/philippines-seo-services/', lastmod: currentDate, changefreq: 'monthly', priority: '0.9' },
    { url: 'https://brightforgeseo.com/content-seo-services-philippines/', lastmod: currentDate, changefreq: 'monthly', priority: '0.9' },
    { url: 'https://brightforgeseo.com/white-label-seo-services-philippines/', lastmod: currentDate, changefreq: 'monthly', priority: '0.9' },
    { url: 'https://brightforgeseo.com/backlink-seo-services-philippines/', lastmod: currentDate, changefreq: 'monthly', priority: '0.9' },
    { url: 'https://brightforgeseo.com/on-page-seo-services-philippines/', lastmod: currentDate, changefreq: 'monthly', priority: '0.9' },
    { url: 'https://brightforgeseo.com/technical-seo-services-philippines/', lastmod: currentDate, changefreq: 'monthly', priority: '0.9' },
    
    // Additional SEO Services
    { url: 'https://brightforgeseo.com/seo-audit-services/', lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { url: 'https://brightforgeseo.com/keyword-research-services/', lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { url: 'https://brightforgeseo.com/website-migration-services/', lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { url: 'https://brightforgeseo.com/answer-engine-optimization-services-philippines/', lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { url: 'https://brightforgeseo.com/astro-seo-website-development/', lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    
    // Industry-Specific Services
    { url: 'https://brightforgeseo.com/gaming-seo-services/', lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { url: 'https://brightforgeseo.com/finance-crypto-seo-services/', lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { url: 'https://brightforgeseo.com/football-soccer-seo-services/', lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { url: 'https://brightforgeseo.com/pet-seo-services/', lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { url: 'https://brightforgeseo.com/real-estate-seo-services/', lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    
    // Blog
    { url: 'https://brightforgeseo.com/blog/', lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { url: 'https://brightforgeseo.com/blog/importance-of-local-seo-for-small-businesses/', lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { url: 'https://brightforgeseo.com/blog/answer-engine-revolution/', lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { url: 'https://brightforgeseo.com/blog/ai-seo-transformation/', lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    
    // Case Studies
    { url: 'https://brightforgeseo.com/case-studies/', lastmod: currentDate, changefreq: 'yearly', priority: '0.7' },
    { url: 'https://brightforgeseo.com/case-studies/phoenix-spa-beauty-seo/', lastmod: currentDate, changefreq: 'yearly', priority: '0.7' },
    { url: 'https://brightforgeseo.com/case-studies/car-auction-seo/', lastmod: currentDate, changefreq: 'yearly', priority: '0.7' },
    { url: 'https://brightforgeseo.com/case-studies/boiler-heating-spares-seo/', lastmod: currentDate, changefreq: 'yearly', priority: '0.7' },
    { url: 'https://brightforgeseo.com/case-studies/consulting-firm-seo/', lastmod: currentDate, changefreq: 'yearly', priority: '0.7' },
    { url: 'https://brightforgeseo.com/case-studies/speediance-au-fitness-seo/', lastmod: currentDate, changefreq: 'yearly', priority: '0.7' },
    { url: 'https://brightforgeseo.com/case-studies/speediance-nz-fitness-seo/', lastmod: currentDate, changefreq: 'yearly', priority: '0.7' },
    { url: 'https://brightforgeseo.com/case-studies/speediance-uk-fitness-seo/', lastmod: currentDate, changefreq: 'yearly', priority: '0.7' },
    { url: 'https://brightforgeseo.com/case-studies/car-recycling-seo/', lastmod: currentDate, changefreq: 'yearly', priority: '0.7' },
    { url: 'https://brightforgeseo.com/case-studies/pest-control-core-update-seo/', lastmod: currentDate, changefreq: 'yearly', priority: '0.7' },
    
    // Knowledge Base
    { url: 'https://brightforgeseo.com/knowledge-base/australian-fitness-seo/', lastmod: currentDate, changefreq: 'yearly', priority: '0.7' },
    { url: 'https://brightforgeseo.com/knowledge-base/beauty-salon-spa-seo/', lastmod: currentDate, changefreq: 'yearly', priority: '0.7' },
    { url: 'https://brightforgeseo.com/knowledge-base/car-recycling-seo/', lastmod: currentDate, changefreq: 'yearly', priority: '0.7' },
    { url: 'https://brightforgeseo.com/knowledge-base/consulting-seo/', lastmod: currentDate, changefreq: 'yearly', priority: '0.7' },
    { url: 'https://brightforgeseo.com/knowledge-base/fitness-seo/', lastmod: currentDate, changefreq: 'yearly', priority: '0.7' },
    
    // Static Pages
    { url: 'https://brightforgeseo.com/about-us/', lastmod: currentDate, changefreq: 'monthly', priority: '0.6' },
    { url: 'https://brightforgeseo.com/contact/', lastmod: currentDate, changefreq: 'monthly', priority: '0.6' },
    { url: 'https://brightforgeseo.com/privacy-policy/', lastmod: currentDate, changefreq: 'yearly', priority: '0.3' },
    { url: 'https://brightforgeseo.com/terms-of-service/', lastmod: currentDate, changefreq: 'yearly', priority: '0.3' },
    { url: 'https://brightforgeseo.com/thanks/', lastmod: currentDate, changefreq: 'yearly', priority: '0.2' },
    { url: 'https://brightforgeseo.com/facebook-og-generator/', lastmod: currentDate, changefreq: 'yearly', priority: '0.4' }
  ];

  // Generate XML with proper formatting
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(item => {
    xml += '  <url>\n';
    xml += `    <loc>${item.url}</loc>\n`;
    xml += `    <lastmod>${item.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${item.changefreq}</changefreq>\n`;
    xml += `    <priority>${item.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
