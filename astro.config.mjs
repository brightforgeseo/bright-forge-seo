import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://brightforgeseo.com',
  integrations: [
    tailwind(),
    sitemap({
      customPages: [
        'https://brightforgeseo.com',
        'https://brightforgeseo.com/about',
        'https://brightforgeseo.com/services',
        'https://brightforgeseo.com/case-studies',
        'https://brightforgeseo.com/blog',
        'https://brightforgeseo.com/contact'
      ],
      entryLimit: 45000,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date()
    })
  ],
  output: 'static',
  // Ensure no automatic trailing-slash redirects (avoids /page → /page/ loops)
  trailingSlash: 'never',
  // Output each page as /path/index.html so public URL is extension-less (/path)
  build: {
    inlineStylesheets: 'auto',
    format: 'directory', // switch from "file" to "directory" to drop .html in canonical URLs
    assets: '_astro'
  },
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [],
    gfm: true,
    smartypants: true
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  server: {
    port: 4321,
    open: true
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash][extname]'
        }
      }
    },
    ssr: {
      noExternal: []
    }
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});
