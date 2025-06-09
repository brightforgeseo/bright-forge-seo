#!/bin/bash

# Create a backup of the current file
cp src/pages/index.astro src/pages/index.astro.bak9

# Replace the logo section with white background and bigger logos
sed -i '' '67,87c\
  <section class="partners-section py-10 bg-white">\
    <div class="container max-w-7xl mx-auto px-4">\
      <h3 class="partners-title text-center text-2xl font-bold mb-8">Proudly Featured On</h3>\
      <div class="flex justify-center items-center gap-16 flex-wrap">\
        <a href="https://www.designrush.com/agency/profile/bright-forge-seo-agency" target="_blank" rel="noopener noreferrer" class="transition-transform hover:scale-105">\
          <img src="/images/proud/design-rush-logo.png" alt="Design Rush" class="h-20 w-auto">\
        </a>\
        <a href="https://www.upwork.com/freelancers/~015e24fd8608be3b83" target="_blank" rel="noopener noreferrer" class="transition-transform hover:scale-105">\
          <img src="/images/proud/2021-upwork-new-logo-design.png" alt="Upwork" class="h-20 w-auto">\
        </a>\
        <a href="https://clutch.co/profile/bright-forge-seo-agency" target="_blank" rel="noopener noreferrer" class="transition-transform hover:scale-105">\
          <img src="/images/proud/66ede09890c1d16a8ccb2d2c_1.png" alt="Clutch" class="h-20 w-auto">\
        </a>\
      </div>\
    </div>\
  </section>' src/pages/index.astro

echo "Updated logo section with white background and bigger logos"
