import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://brightforgeseo.com',
  base: '/',
  trailingSlash: 'always',
  integrations: [tailwind()],
  output: 'static',
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [],
    gfm: true,
    smartypants: true
  }
});
