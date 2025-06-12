import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://brightforgeseo.com',
  integrations: [
    tailwind(),
    sitemap()
  ],
  output: 'static',
  // Use trailing slashes consistently so canonical URLs point directly to final URL
  trailingSlash: 'always',
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
