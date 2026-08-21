#!/usr/bin/env node
/**
 * Freshness sweep.
 *
 * A reference site's characteristic failure is not being wrong on day one — it
 * is being right on day one and never checked again. Every entry records when a
 * human last verified it; this reports the ones that have aged past the
 * published thresholds so the weekly job can raise them.
 *
 * Informational by design: it exits 0 even when entries are overdue, because
 * an overdue entry should open an issue, not block an unrelated deploy.
 *
 * Usage: node scripts/check-staleness.mjs [--out report.md]
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

// Kept in step with src/lib/vocab.ts. Duplicated rather than imported because
// this runs as plain node with no TypeScript pipeline; the schema test asserts
// the two stay equal.
const AGING_AFTER_DAYS = 120;
const STALE_AFTER_DAYS = 180;

const MARKDOWN_DIRS = [
  ['src/content/medications', 'Medication'],
  ['src/content/supplements', 'Supplement'],
];
const JSON_FILES = [
  ['src/content/foods.json', 'Food'],
  ['src/content/resources.json', 'Resource'],
];

const DAY_MS = 86_400_000;
const utcMidnight = (d) => Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
const daysSince = (d, now = new Date()) =>
  Math.max(0, Math.round((utcMidnight(now) - utcMidnight(d)) / DAY_MS));

const entries = [];

for (const [dir, kind] of MARKDOWN_DIRS) {
  const abs = join(ROOT, dir);
  for (const file of readdirSync(abs).filter((f) => f.endsWith('.md'))) {
    const raw = readFileSync(join(abs, file), 'utf8');
    const name = raw.match(/^name:\s*(.+)$/m)?.[1]?.replace(/^["']|["']$/g, '') ?? file;
    const verified = raw.match(/^lastVerified:\s*(\S+)/m)?.[1];
    if (!verified) continue;
    entries.push({
      kind,
      name,
      path: relative(ROOT, join(abs, file)),
      days: daysSince(new Date(verified)),
      verified,
    });
  }
}

for (const [file, kind] of JSON_FILES) {
  const data = JSON.parse(readFileSync(join(ROOT, file), 'utf8'));
  for (const item of data) {
    if (!item.lastVerified) continue;
    entries.push({
      kind,
      name: item.name ?? item.id,
      path: file,
      days: daysSince(new Date(item.lastVerified)),
      verified: item.lastVerified,
    });
  }
}

const stale = entries.filter((e) => e.days >= STALE_AFTER_DAYS).sort((a, b) => b.days - a.days);
const aging = entries
  .filter((e) => e.days >= AGING_AFTER_DAYS && e.days < STALE_AFTER_DAYS)
  .sort((a, b) => b.days - a.days);

const lines = [];
if (stale.length || aging.length) {
  lines.push('## Entries due for re-verification', '');
  const table = (rows, heading) => {
    if (!rows.length) return;
    lines.push(`### ${heading}`, '', '| Entry | Type | Last verified | Age |', '| --- | --- | --- | --- |');
    for (const e of rows) {
      lines.push(`| ${e.name} | ${e.kind} | ${e.verified} | ${e.days} days |`);
    }
    lines.push('');
  };
  table(stale, `Overdue — past ${STALE_AFTER_DAYS} days`);
  table(aging, `Due soon — past ${AGING_AFTER_DAYS} days`);
  lines.push(
    'Re-checking means opening each cited source and confirming it still says what the',
    'entry claims, then updating `lastVerified`. Bumping the date without opening the',
    'source defeats the entire mechanism.',
    '',
  );
} else {
  lines.push(
    `All ${entries.length} entries verified within the last ${AGING_AFTER_DAYS} days.`,
    '',
  );
}

const report = lines.join('\n');
const outFlag = process.argv.indexOf('--out');
if (outFlag !== -1 && process.argv[outFlag + 1]) {
  writeFileSync(process.argv[outFlag + 1], report);
}

console.log(report);
console.log(
  `Summary: ${entries.length} entries · ${stale.length} overdue · ${aging.length} due soon`,
);
