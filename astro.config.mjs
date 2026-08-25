// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// The public site uses a custom domain. GitHub Pages remains the deployment
// target, but the site is served from the domain root rather than a repository
// subpath.
export default defineConfig({
  site: 'https://mcasreference.org',
  trailingSlash: 'ignore',
  // Astro's HTML compression collapses the newline between prose and an inline
  // element, so "…found that\n<a>only fermented foods…" renders as
  // "thatonly fermented foods". On a site that is mostly cited prose that is a
  // correctness bug, not a cosmetic one, and it fails silently on every future
  // inline link. Costs roughly 3 KB per page before gzip; Lighthouse still 100.
  compressHTML: false,
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    // Pre-bundle the React runtimes at dev-server start instead of letting Vite
    // discover them lazily. Lazy discovery triggers a mid-session
    // "re-optimizing dependencies" pass, and a browser tab held open across it
    // can end up with `react/jsx-dev-runtime` resolved to a half-initialised
    // module — `jsxDEV` comes back undefined and the island dies on its first
    // JSX call, after the server-rendered markup has already painted. The
    // visible symptom is the food table appearing for a moment and then
    // vanishing. Production builds never hit this; it is a dev-only path.
    optimizeDeps: {
      include: [
        'react',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'react-dom',
        'react-dom/client',
      ],
    },
  },
});
