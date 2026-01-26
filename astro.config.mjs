import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';

export default defineConfig({
  // Tu dominio real para que Astro genere los links correctamente
  site: 'https://eluniversodelamente.com', 
  base: '/',
  trailingSlash: 'never', 
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    icon(),
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
              export const SITE = { name: 'El Universo de la Mente', base: 'https://eluniversodelamente.com', trailingSlash: false };
              export const METADATA = {};
              export const APP_BLOG = { isEnabled: true };
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