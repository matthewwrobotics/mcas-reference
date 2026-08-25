#!/usr/bin/env node
/**
 * Local accessibility sweep.
 *
 * CI asserts a Lighthouse accessibility score of 100, but a failing CI run only
 * tells you the score dropped — it does not tell you which element broke it.
 * This runs the same axe-core engine directly and prints the offending node, so
 * the fix is obvious before you push.
 *
 * Requires a running preview server:
 *   npm run build && npm run preview
 *   node scripts/a11y.mjs [baseUrl]
 */

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BASE = process.argv[2] ?? 'http://localhost:4321';

/**
 * Every route, discovered from the build rather than listed by hand.
 *
 * This was a fixed list of nine paths. The site now builds forty-eight, so
 * every entry added since the list was written had never been swept — the
 * script reported "9 pages clean" and sounded like full coverage. A hardcoded
 * inventory of a growing thing decays silently, which is the worst way for a
 * check to fail.
 */
function discoverPaths() {
  const dist = join(ROOT, 'dist');
  if (!existsSync(dist)) {
    console.error('No dist/ — run `npm run build` first so routes can be discovered.');
    process.exit(1);
  }
  const out = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (name === 'index.html') {
        out.push(relative(dist, dir).split(/[\\/]/).join('/'));
      }
    }
  };
  walk(dist);
  return out.sort();
}

const PATHS = discoverPaths();

const axeSource = readFileSync(
  new URL('../node_modules/axe-core/axe.min.js', import.meta.url),
  'utf8',
);

const browser = await chromium.launch();
const violations = new Map();

for (const path of PATHS) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${BASE}/${path}`, { waitUntil: 'networkidle' });
  await page.addScriptTag({ content: axeSource });
  const result = await page.evaluate(async () =>
    // @ts-expect-error injected at runtime
    await window.axe.run(document, { resultTypes: ['violations'] }),
  );

  for (const v of result.violations) {
    if (!violations.has(v.id)) {
      violations.set(v.id, {
        impact: v.impact,
        help: v.help,
        helpUrl: v.helpUrl,
        pages: [],
        node: v.nodes[0],
      });
    }
    violations.get(v.id).pages.push(path || '/');
  }
  await page.close();
}

await browser.close();

if (violations.size === 0) {
  console.log(`✓ No accessibility violations across all ${PATHS.length} built pages.`);
  process.exit(0);
}

console.error(`\n✗ ${violations.size} accessibility violation type(s):\n`);
for (const [id, v] of violations) {
  console.error(`  [${v.impact}] ${id} — ${v.help}`);
  console.error(`    pages:  ${v.pages.join(', ')}`);
  console.error(`    target: ${v.node?.target?.join(' ')}`);
  console.error(`    html:   ${v.node?.html?.slice(0, 200)}`);
  console.error(`    ${v.helpUrl}\n`);
}
process.exit(1);
