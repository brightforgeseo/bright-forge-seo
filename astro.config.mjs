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
  // Use ignore for trailing slashes to avoid 404s in development
  trailingSlash: 'ignore',
  // Output each page as /path/index.html so public URL is extension-less (/path)
  build: {
    inlineStylesheets: 'never', // Force external CSS files instead of inlining
    format: 'directory', // switch from "file" to "directory" to drop .html in canonical URLs
    assets: '_astro',
    // Enable asset bundling and optimization
    // Split chunks for better caching
    split: true
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
      // Enable minification and optimization
      minify: 'terser',
      cssMinify: true,
      rollupOptions: {
        output: {
          // Better asset naming for caching
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              return `assets/images/[name].[hash][extname]`;
            }
            if (/css/i.test(ext)) {
              return `assets/css/[name].[hash][extname]`;
            }
            if (/js/i.test(ext)) {
              return `assets/js/[name].[hash][extname]`;
            }
            return `assets/[name].[hash][extname]`;
          },
          chunkFileNames: 'assets/js/[name].[hash].js',
          entryFileNames: 'assets/js/[name].[hash].js',
          // Bundle vendor libraries separately for better caching
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      },
      // Enable terser for better compression
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    ssr: {
      noExternal: []
    },
    // Enable CSS code splitting
    css: {
      devSourcemap: false
    }
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    // Optimize images
    domains: ['brightforgeseo.com'],
    formats: ['webp', 'avif']
  }
});
