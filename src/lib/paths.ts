/**
 * The site is served from a subpath on GitHub Pages, so every internal link
 * has to carry the base. Centralised here so a repo rename is a one-line change
 * in astro.config.mjs rather than a site-wide find-and-replace.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function href(path: string): string {
  if (!path.startsWith('/')) return path;
  return path === '/' ? BASE || '/' : `${BASE}${path}`;
}
