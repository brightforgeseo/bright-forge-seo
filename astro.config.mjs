import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { getAllBlogPosts } from './src/lib/contentful.js';

// Get dynamic blog post URLs for sitemap
async function getBlogSitemapUrls() {
  try {
    const posts = await getAllBlogPosts();
    return posts.map(post => `https://brightforgeseo.com/blog/${post.slug}/`);
  } catch (error) {
    console.warn('Could not fetch blog posts for sitemap:', error);
    return [];
  }
}

// https://astro.build/config
export default defineConfig({
  site: 'https://brightforgeseo.com',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => {
        // Exclude certain pages from sitemap
        return !page.includes('/facebook-og-generator/') && 
               !page.includes('/bright-forge-seo/') &&
               !page.includes('/generative-engine-optimization/') &&
               !page.includes('/thanks/');
      },
      customPages: await getBlogSitemapUrls(),
      serialize: (item) => {
        // Ensure all URLs have trailing slashes and proper priority/changefreq
        if (item.url.endsWith('/')) {
          item.url = item.url;
        } else {
          item.url = item.url + '/';
        }
        
        // Set priorities and change frequencies
        if (item.url === 'https://brightforgeseo.com/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/blog/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/case-studies/')) {
          item.priority = 0.7;
          item.changefreq = 'yearly';
        } else if (item.url.includes('/knowledge-base/')) {
          item.priority = 0.7;
          item.changefreq = 'yearly';
        } else if (item.url.includes('-seo-services') || item.url.includes('philippines-seo-services')) {
          item.priority = 0.9;
          item.changefreq = 'monthly';
        } else {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        }
        
        return item;
      }
    })
  ],
  output: 'static',
  // Enforce trailing slashes on all URLs to avoid 301 redirects
  trailingSlash: 'always',
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
