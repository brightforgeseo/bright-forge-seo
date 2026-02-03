import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://brightforge.com.ph',
  integrations: [
    tailwind()
  ],
  output: 'static',
  // Enforce trailing slashes on all URLs to avoid 301 redirects
  trailingSlash: 'always',
  // Output each page as /path/index.html so public URL is extension-less (/path)
  build: {
    inlineStylesheets: 'always', // Inline all stylesheets to eliminate render-blocking CSS
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
      cssMinify: true, // Use default CSS minifier
      // Reduce chunk size for faster parsing
      chunkSizeWarningLimit: 250,
      // Target modern browsers for smaller code
      target: 'es2020',
      // Enable module preload for faster loading
      modulePreload: {
        polyfill: false
      },
      // Optimize CSS code splitting
      cssCodeSplit: true,
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
          // Split into smaller chunks for faster parsing and execution
          manualChunks: (id) => {
            // Split large vendors into separate chunks
            if (id.includes('node_modules')) {
              if (id.includes('contentful')) {
                return 'contentful';
              }
              if (id.includes('astro')) {
                return 'astro-runtime';
              }
              return 'vendor';
            }
          }
        }
      },
      // Enable terser for better compression and reduce parse time
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          passes: 3, // Increased from 2 to 3 for maximum compression
          pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace', 'console.warn'],
          unsafe_arrows: true,
          unsafe_methods: true,
          unsafe_proto: true,
          unsafe_regexp: true,
          unsafe_comps: true,
          unsafe_math: true,
          unsafe_symbols: true,
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
          inline: 3, // Aggressive inlining
          properties: true,
          side_effects: true,
          switches: true,
          negate_iife: true,
          toplevel: true
        },
        mangle: {
          toplevel: true,
          safari10: true,
          eval: true,
          properties: {
            regex: /^_/
          }
        },
        format: {
          comments: false,
          ascii_only: true,
          ecma: 2020,
          semicolons: false
        },
        ecma: 2020,
        module: true,
        toplevel: true
      }
    },
    ssr: {
      noExternal: []
    },
    // Enable CSS code splitting and optimization
    css: {
      devSourcemap: false,
      postcss: {
        plugins: []
      }
    },
    // Optimize dependencies and tree shaking
    optimizeDeps: {
      include: [],
      esbuildOptions: {
        target: 'es2020',
        minify: true,
        treeShaking: true
      }
    }
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    // Optimize images
    domains: ['brightforge.com.ph'],
    formats: ['webp', 'avif']
  }
});
