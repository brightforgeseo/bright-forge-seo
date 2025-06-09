import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://brightforgeseo.com',
  integrations: [tailwind()],
  output: 'static',
  build: {
    inlineStylesheets: 'never'
  }
});
