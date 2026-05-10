// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://jalonsomerchan.github.io',
  base: '/proyect-admin',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [preact(), mdx(), sitemap()]
});
