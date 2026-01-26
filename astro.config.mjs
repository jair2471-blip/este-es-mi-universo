import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { readingTimeRemark } from './src/utils/frontmatter.mjs';

export default defineConfig({
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [readingTimeRemark],
  },
  vite: {
    resolve: {
      alias: {
        '~': '/src',
      },
    },
  },
});