import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';

export default defineConfig({
  // Ponemos una URL base para que no de error de "Invalid URL"
  site: 'https://ejemplo.com', 
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
              export const SITE = { name: 'Universo', base: 'https://ejemplo.com', trailingSlash: false };
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