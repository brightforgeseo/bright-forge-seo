#!/bin/bash

# Create backups of all case study files
mkdir -p backups/case-studies
cp src/pages/case-studies/*.astro backups/case-studies/

# Update boiler-heating-spares-seo.astro
sed -i '' 's|heroImage: ".*"|heroImage: "/images/case-studies/SEO Case Study- Driving Sustained Growth for a Boiler \& Heating Spares Supplier .webp"|g' src/pages/case-studies/boiler-heating-spares-seo.astro

# Update car-auction-seo.astro
sed -i '' 's|heroImage: ".*"|heroImage: "/images/case-studies/SEO Case Study- Expanding Organic Reach for a Car Auction Platform .webp"|g' src/pages/case-studies/car-auction-seo.astro

# Update car-recycling-seo.astro
sed -i '' 's|heroImage: ".*"|heroImage: "/images/case-studies/SEO Case Study- Boosting Organic Traffic for a Car Recycling Client.webp"|g' src/pages/case-studies/car-recycling-seo.astro

# Update consulting-firm-seo.astro
sed -i '' 's|heroImage: ".*"|heroImage: "/images/case-studies/SEO Case Study- Increasing Organic Traffic for a Consulting Firm .webp"|g' src/pages/case-studies/consulting-firm-seo.astro

# Update pest-control-core-update-seo.astro
sed -i '' 's|heroImage: ".*"|heroImage: "/images/case-studies/SEO Case Study- Recovering and Growing Organic Traffic for a Pest Control Firm After Core Update .webp"|g' src/pages/case-studies/pest-control-core-update-seo.astro

# Update phoenix-spa-beauty-seo.astro
sed -i '' 's|heroImage: ".*"|heroImage: "/images/case-studies/SEO Case Study- Growing Organic Traffic for Phoenix Spa and Beauty – Beauty Salon and Spa .webp"|g' src/pages/case-studies/phoenix-spa-beauty-seo.astro

# Update speediance-au-fitness-seo.astro
sed -i '' 's|heroImage: ".*"|heroImage: "/images/case-studies/SEO Case Study- Increasing Organic Traffic for Speediance AU – Fitness Equipment Supplier .webp"|g' src/pages/case-studies/speediance-au-fitness-seo.astro

# Update speediance-nz-fitness-seo.astro
sed -i '' 's|heroImage: ".*"|heroImage: "/images/case-studies/SEO Case Study- Boosting Organic Traffic for Speediance NZ – Gym Equipment Supplier .webp"|g' src/pages/case-studies/speediance-nz-fitness-seo.astro

echo "Updated case study pages with their corresponding images"
