// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://leantrace.github.io',
  base: '/GoRehab_Webpage/',
  trailingSlash: 'always',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    routing: { prefixDefaultLocale: true },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
