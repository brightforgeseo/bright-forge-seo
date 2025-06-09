#!/bin/bash

# Create a backup of the current file
cp src/pages/index.astro src/pages/index.astro.bak11

# Fix the broken structure between the logo section and the "Why Choose Us" section
sed -i '' '80,85c\
    </div>\
  </section>\
  
  <!-- Why Choose Us Section -->\
  <section class="why-choose-section py-16">\
    <div class="container max-w-7xl mx-auto px-4">\
      <h2 class="section-title text-center text-3xl font-bold mb-12">Why Choose Us</h2>\
      <div class="why-choose-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">\
        <div class="why-choose-item">\
          <div class="choose-icon">\
            <i class="fas fa-globe"></i>\
          </div>\
          <h3>Globally Inspired Strategies</h3>\
          <p>We use proven methods and tools to deliver customized solutions that work effectively across industries and markets.</p>\
        </div>' src/pages/index.astro

echo "Fixed the broken 'Globally Inspired Strategies' section"
