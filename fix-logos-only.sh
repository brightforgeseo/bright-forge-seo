#!/bin/bash

# Create a backup of the current file
cp src/pages/index.astro src/pages/index.astro.bak5

# Replace only the logo items with fixed versions
sed -i '' '71,85c\
        <div class="logo-item flex justify-center items-center bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow w-48 h-24">\
          <a href="https://www.designrush.com/agency/profile/bright-forge-seo-agency" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center w-full h-full">\
            <img src="/images/proud/design-rush-logo.png" alt="Design Rush" class="max-h-12 w-auto object-contain">\
          </a>\
        </div>\
        <div class="logo-item flex justify-center items-center bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow w-48 h-24">\
          <a href="https://www.upwork.com/freelancers/~015e24fd8608be3b83" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center w-full h-full">\
            <img src="/images/proud/upwork-logo.png" alt="Upwork" class="max-h-12 w-auto object-contain">\
          </a>\
        </div>\
        <div class="logo-item flex justify-center items-center bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow w-48 h-24">\
          <a href="https://clutch.co/profile/bright-forge-seo-agency" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center w-full h-full">\
            <img src="/images/proud/clutch-logo.png" alt="Clutch" class="max-h-12 w-auto object-contain">\
          </a>\
        </div>' src/pages/index.astro

echo "Fixed ONLY the logo items in the Proudly Featured On section"
