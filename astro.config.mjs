import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://eluniversodelamente.com',
  output: 'static',
  base: '/',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    icon(),
    sitemap(),
  ],
  vite: {
    plugins: [
      {
        name: 'fix-astrowind-config',
        resolveId(id) {
          if (id === 'astrowind:config') return id;
        },
        load(id) {
          if (id === 'astrowind:config') {
            return `
              export const I18N = { language: 'es', textDirection: 'ltr' };
              export const SITE = { 
                name: 'El Universo de la Mente', 
                site: 'https://eluniversodelamente.com', 
                base: '/', 
                trailingSlash: false 
              };
              export const METADATA = { 
                title: 'El Universo de la Mente',
                titleTemplate: '%s — El Universo de la Mente',
              };
              export const APP_BLOG = { 
                isEnabled: true, 
                postsPerPage: 6, 
                isRelatedPostsEnabled: true,
                post: { isEnabled: true },
                list: { isEnabled: true },
                category: { isEnabled: true },
                tag: { isEnabled: true }
              };
              export const UI = { theme: 'system' };
              export const ANALYTICS = { vendors: { googleAnalytics: { id: null } } };
              export default { I18N, SITE, METADATA, APP_BLOG, UI, ANALYTICS };
            `;
          }
        },
      },
    ],
    resolve: {
      alias: {
        '~': '/src',
      },
    },
  },
});