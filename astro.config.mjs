import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://brightforgeseo.com',
  integrations: [
    tailwind()
  ],
  output: 'static',
  // Enforce trailing slashes on all URLs to avoid 301 redirects
  trailingSlash: 'always',
  // Output each page as /path/index.html so public URL is extension-less (/path)
  build: {
    inlineStylesheets: 'auto', // Inline small stylesheets for better mobile performance
    format: 'directory', // switch from "file" to "directory" to drop .html in canonical URLs
    assets: '_astro',
    // Enable asset bundling and optimization
    // Split chunks for better caching
    split: true,
    // Optimize for mobile
    assetsPrefix: undefined
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
          drop_debugger: true,
          passes: 2,
          pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
          unsafe_arrows: true,
          unsafe_methods: true,
          unsafe_proto: true,
          unsafe_regexp: true,
          reduce_funcs: true,
          reduce_vars: true,
          collapse_vars: true,
          join_vars: true,
          sequences: true,
          dead_code: true,
          conditionals: true,
          evaluate: true,
          booleans: true,
          loops: true,
          unused: true,
          hoist_funs: true,
          hoist_props: true,
          hoist_vars: false,
          if_return: true,
          inline: true,
          properties: true,
          side_effects: true
        },
        mangle: {
          toplevel: true,
          safari10: true,
          properties: {
            regex: /^_/
          }
        },
        format: {
          comments: false,
          ascii_only: true
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
