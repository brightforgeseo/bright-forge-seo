import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [],
    gfm: true,
    smartypants: true
  }
});
