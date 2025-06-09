#!/bin/bash

# Create a backup of the current file
cp src/pages/index.astro src/pages/index.astro.bak2

# Fix the import issue - move ProudlyFeaturedSection import inside the frontmatter
sed -i '' '7d' src/pages/index.astro  # Remove the closing frontmatter delimiter
sed -i '' '8d' src/pages/index.astro  # Remove the incorrect import line
sed -i '' '6a\
import ProudlyFeaturedSection from '"'"'../components/ProudlyFeaturedSection.astro'"'"';\
---' src/pages/index.astro  # Add the import inside frontmatter and close it

echo "Fixed index.astro import issue!"
