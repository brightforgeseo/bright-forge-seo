#!/bin/bash

# Create a backup of the current file
cp src/pages/index.astro src/pages/index.astro.bak3

# Fix the frontmatter closing delimiter
sed -i '' 's/------/---/' src/pages/index.astro

echo "Fixed frontmatter delimiter in index.astro!"
