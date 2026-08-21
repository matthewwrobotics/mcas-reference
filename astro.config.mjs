// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Deployed to GitHub Pages at <site><base>. If the repo is ever renamed,
// `base` must change with it or every internal link 404s.
export default defineConfig({
  site: 'https://matthewwrobotics.github.io',
  base: '/mcas-reference',
  trailingSlash: 'ignore',
  integrations: [react(), sitemap()],
  vite: { plugins: [tailwindcss()] },
});
