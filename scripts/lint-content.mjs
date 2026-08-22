#!/usr/bin/env node
/**
 * Editorial policy guard.
 *
 * The Zod schemas in src/content.config.ts enforce everything expressible as
 * structure — citations present, confound flags where required, trial statuses
 * fresh. They cannot see inside the prose. This does.
 *
 * The site states publicly that it carries no dosing information and makes no
 * efficacy claims. That promise is only worth making if something checks it on
 * every build, because the failure mode is gradual: one entry says a drug
 * "helps with" a symptom, nobody notices, and six months later the site is
 * quietly giving advice.
 *
 * Run: node scripts/lint-content.mjs
 */

import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

// fileURLToPath, not `.pathname` — the latter leaves %20 in place and breaks
// on any checkout whose path contains a space.
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PROSE_DIRS = ['src/content/medications', 'src/content/supplements'];

/**
 * Reader-facing prose that does not live in a Markdown entry.
 *
 * The advocacy page is the highest-risk text on the site — it is addressed to
 * prescribers and lists drug classes — and it sat outside this check until it
 * was added here. `labs.json` carries diagnostic thresholds and timing, which
 * is the other place a stray dose could appear.
 */
const JSON_PROSE = [
  { file: 'src/content/labs.json', fields: ['measures', 'timing', 'caveat', 'name'] },
];
const PAGE_PROSE = ['src/pages/advocacy.astro'];
const MAX_BODY_WORDS = 400;
const MIN_BODY_WORDS = 25;

/** Patterns that must never appear in reader-facing prose. */
const FORBIDDEN = [
  {
    name: 'dosage',
    pattern: /\b\d+(?:\.\d+)?\s?(?:mg|mcg|µg|ug|g|kg|IU|ml|mL|cc)\b/gi,
    why: 'This site carries no dosing information. Dosing belongs with a prescriber, not a web page.',
  },
  {
    name: 'efficacy claim',
    pattern:
      /\b(?:cures?|treats|relieves|alleviates|resolves)\b|\bis effective (?:for|in|at)\b|\bworks (?:for|well)\b|\bwill help\b|\bhelps? with\b|\bproven to\b|\bimproves symptoms\b|\bshould take\b|\brecommended for\b/gi,
    why: 'Entries describe mechanisms and cite evidence. They never claim that something works — the reader and their clinician draw that conclusion.',
  },
  {
    name: 'insecure link',
    pattern: /http:\/\/(?!localhost)/gi,
    why: 'Cite the https URL. Plain http citations break silently and downgrade the page.',
  },
];

/** Split a Markdown file into its frontmatter block and its body. */
function splitFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { frontmatter: '', body: raw };
  return { frontmatter: match[1], body: match[2] };
}

/** The one frontmatter field that is displayed as prose alongside the body. */
function extractSummary(frontmatter) {
  const m = frontmatter.match(/^summary:\s*(.+)$/m);
  return m ? m[1].replace(/^["']|["']$/g, '') : '';
}

function lineOf(text, index) {
  return text.slice(0, index).split('\n').length;
}

const problems = [];

/**
 * Roughly the words a reader sees on an .astro page.
 *
 * Returns the template text *and* the long string literals from the component
 * script, because prose routinely lives in both. An earlier version scanned
 * only the template and silently passed a probe that put dosing into a data
 * array in the frontmatter — which is exactly where this page keeps its drug
 * class descriptions.
 */
function astroProse(raw) {
  const script = raw.match(/^---([\s\S]*?)\n---\n/)?.[1] ?? '';
  const template = raw
    .replace(/^---[\s\S]*?\n---\n/, '')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/\{[^{}]*\}/g, ' ')
    .replace(/<[^>]+>/g, ' ');

  // Newlines are excluded deliberately. Without that the character class runs
  // from one string's closing quote to the next string's opening quote and
  // captures the code in between, which is how an earlier version "found" 18
  // literals that were mostly import statements and matched no real prose.
  const literals = [...script.matchAll(/'([^'\\\n]{25,})'|"([^"\\\n]{25,})"|`([^`\\\n]{25,})`/g)]
    .map((m) => m[1] ?? m[2] ?? m[3])
    .join(' \n ');

  return `${template} \n ${literals}`.replace(/\s+/g, ' ');
}

for (const dir of PROSE_DIRS) {
  const abs = join(ROOT, dir);
  let files;
  try {
    files = readdirSync(abs).filter((f) => f.endsWith('.md'));
  } catch {
    problems.push({ file: dir, line: 0, message: `Content directory not found: ${dir}` });
    continue;
  }

  if (files.length === 0) {
    problems.push({ file: dir, line: 0, message: `No entries found in ${dir}` });
  }

  for (const file of files) {
    const path = join(abs, file);
    const rel = relative(ROOT, path);
    const raw = readFileSync(path, 'utf8');
    const { frontmatter, body } = splitFrontmatter(raw);
    const summary = extractSummary(frontmatter);
    const frontmatterLines = frontmatter.split('\n').length + 2;

    // Scan the body and the summary. Confound-risk notes are deliberately
    // exempt: their whole job is to discuss why an apparent effect may not be
    // one, which requires the vocabulary this lint otherwise forbids.
    const targets = [
      { label: 'body', text: body, lineOffset: frontmatterLines },
      { label: 'summary', text: summary, lineOffset: 0 },
    ];

    for (const { label, text, lineOffset } of targets) {
      for (const rule of FORBIDDEN) {
        rule.pattern.lastIndex = 0;
        let match;
        while ((match = rule.pattern.exec(text)) !== null) {
          problems.push({
            file: rel,
            line: lineOffset + lineOf(text, match.index) - (label === 'body' ? 1 : 0),
            message: `${rule.name} in ${label}: “${match[0]}” — ${rule.why}`,
          });
        }
      }
    }

    const words = body.trim().split(/\s+/).filter(Boolean).length;
    if (words < MIN_BODY_WORDS) {
      problems.push({
        file: rel,
        line: frontmatterLines,
        message: `Mechanism write-up is ${words} words. An entry needs a real sourced description, not a stub (minimum ${MIN_BODY_WORDS}).`,
      });
    }
    if (words > MAX_BODY_WORDS) {
      problems.push({
        file: rel,
        line: frontmatterLines,
        message: `Mechanism write-up is ${words} words (maximum ${MAX_BODY_WORDS}). Entries describe a mechanism; past this length they start becoming guidance.`,
      });
    }
  }
}

// --- prose outside the Markdown collections -------------------------------

for (const { file, fields } of JSON_PROSE) {
  let entries;
  try {
    entries = JSON.parse(readFileSync(join(ROOT, file), 'utf8'));
  } catch (err) {
    problems.push({ file, line: 0, message: `Could not read or parse: ${err.message}` });
    continue;
  }
  for (const entry of entries) {
    for (const field of fields) {
      const text = entry[field];
      if (typeof text !== 'string') continue;
      for (const rule of FORBIDDEN) {
        rule.pattern.lastIndex = 0;
        let match;
        while ((match = rule.pattern.exec(text)) !== null) {
          problems.push({
            file,
            line: 0,
            message: `${rule.name} in ${entry.id ?? '?'}.${field}: “${match[0]}” — ${rule.why}`,
          });
        }
      }
    }
  }
}

for (const file of PAGE_PROSE) {
  let raw;
  try {
    raw = readFileSync(join(ROOT, file), 'utf8');
  } catch (err) {
    problems.push({ file, line: 0, message: `Could not read: ${err.message}` });
    continue;
  }
  const text = astroProse(raw);
  for (const rule of FORBIDDEN) {
    rule.pattern.lastIndex = 0;
    let match;
    while ((match = rule.pattern.exec(text)) !== null) {
      problems.push({
        file,
        line: 0,
        message: `${rule.name} in page prose: “${match[0]}” — ${rule.why}`,
      });
    }
  }
}

if (problems.length > 0) {
  console.error(`\n✗ Editorial policy check failed — ${problems.length} problem(s):\n`);
  for (const p of problems) {
    console.error(`  ${p.file}:${p.line}`);
    console.error(`    ${p.message}\n`);
  }
  console.error('These rules are published at /methodology. Fix the entry, or change the');
  console.error('stated policy — but do not let the two drift apart.\n');
  process.exit(1);
}

console.log(
  `✓ Editorial policy check passed across ${PROSE_DIRS.length} collection(s), ` +
    `${JSON_PROSE.length} data file(s) and ${PAGE_PROSE.length} page(s) — ` +
    `no dosing, no efficacy claims, no insecure citations.`,
);
