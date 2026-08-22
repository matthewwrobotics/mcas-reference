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

import { readFileSync } from 'node:fs';
import { chromium } from 'playwright';

const BASE = process.argv[2] ?? 'http://localhost:4321/mcas-reference';
const PATHS = [
  '',
  'medications',
  'medications/masitinib',
  'supplements',
  'foods',
  'advocacy',
  'appointment',
  'methodology',
  'resources',
];

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
  console.log(`✓ No accessibility violations across ${PATHS.length} pages.`);
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
