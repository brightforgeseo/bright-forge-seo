#!/bin/bash

# Create a clean version of index.astro
cp src/pages/index.astro src/pages/index.astro.clean

# Check if ProcessSection.astro exists
if [ -f "src/components/ProcessSection.astro" ]; then
  echo "ProcessSection.astro exists, no need to create it"
else
  # Create a basic ProcessSection component if it doesn't exist
  echo "---
// Basic Process Section component
---

<section class=\"process-section py-16 bg-gray-50\">
  <div class=\"container max-w-7xl mx-auto px-4\">
    <div class=\"text-center mb-12\">
      <span class=\"text-sm font-semibold tracking-widest text-brand-accent uppercase\">Our Approach</span>
      <h2 class=\"text-3xl md:text-4xl font-extrabold text-brand-dark mb-4\">Our SEO <span class=\"text-brand-accent\">Process</span></h2>
      <p class=\"text-lg text-text-secondary max-w-2xl mx-auto\">Our proven methodology delivers consistent results for businesses of all sizes.</p>
    </div>
    <!-- Process steps would go here -->
  </div>
</section>" > src/components/ProcessSection.astro
  echo "Created basic ProcessSection.astro component"
fi

# Clean up backup files
rm -f src/pages/index.astro.backup src/pages/index.astro.bak2 src/pages/index.astro.bak3

echo "Fixed ProcessSection issue and cleaned up backup files!"
