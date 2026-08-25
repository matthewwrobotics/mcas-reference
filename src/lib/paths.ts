/**
 * Keep internal URLs aware of Astro's configured base. Production is served
 * from the custom-domain root, while retaining this helper makes previewing a
 * build under a temporary base path safe.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function href(path: string): string {
  if (!path.startsWith('/')) return path;
  return path === '/' ? BASE || '/' : `${BASE}${path}`;
}
