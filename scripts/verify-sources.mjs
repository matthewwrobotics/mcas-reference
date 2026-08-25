#!/usr/bin/env node
/**
 * Source-integrity check.
 *
 * Confirms that every identifier this site cites resolves to what the site says
 * it does. That is a narrower job than it sounds, and the boundary matters:
 *
 *   - This script checks **identity**. Does PMID 12345 resolve to the paper we
 *     named? Does the registry still say phase 2, terminated, 2 enrolled?
 *   - `lycheeverse/lychee-action` in the weekly workflow checks **liveness** —
 *     whether a URL still answers. Not duplicated here.
 *   - Whether a cited paper actually supports our mechanism wording, population
 *     or route is **semantic**, and no script can judge it. That stays with an
 *     agent or a person reading the source.
 *
 * It also cannot justify an absence. "There is no controlled evidence for X" has
 * no identifier to check, and that is the failure class that has actually bitten
 * this project — four times. Adversarial search catches those; this does not.
 *
 * It never edits content, and never writes `lastVerified`. That field means a
 * human opened the sources, and a script bumping it would quietly destroy the
 * only signal the freshness system has.
 *
 * Usage:
 *   node scripts/verify-sources.mjs [--out report.md]
 *
 * Exits non-zero when anything FAILS, so the weekly workflow can raise it.
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

// fileURLToPath, not `.pathname` — the latter leaves %20 in place and this
// repo's checkout has a space in its path.
const ROOT = fileURLToPath(new URL('..', import.meta.url));

const EUTILS = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';
const CTG = 'https://clinicaltrials.gov/api/v2/studies';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const problems = [];
const fail = (file, msg) => problems.push({ level: 'FAIL', file, msg });
const warn = (file, msg) => problems.push({ level: 'WARN', file, msg });

/* ---------------------------------------------------------------- collect */

/** Citations and trials across every collection that carries them. */
function collect() {
  const citations = [];
  const trials = [];

  for (const dir of ['src/content/medications', 'src/content/supplements']) {
    for (const f of readdirSync(join(ROOT, dir)).filter((x) => x.endsWith('.md'))) {
      const path = join(dir, f);
      const raw = readFileSync(join(ROOT, path), 'utf8');
      const name = raw.match(/^name:\s*(.+)$/m)?.[1]?.replace(/^["']|["']$/g, '') ?? f;

      for (const block of raw.split(/\n {2}- title:/).slice(1)) {
        citations.push({
          path,
          name,
          title: block.match(/^\s*"([^"]+)"/)?.[1] ?? '',
          url: block.match(/url:\s*"([^"]+)"/)?.[1] ?? '',
          pmid: block.match(/pmid:\s*"(\d+)"/)?.[1],
          nctId: block.match(/nctId:\s*(NCT\d{8})/)?.[1],
        });
      }

      for (const block of raw.split(/\n {2}- nctId:/).slice(1)) {
        const nctId = block.match(/^\s*(NCT\d{8})/)?.[1];
        if (!nctId) continue;
        trials.push({
          path,
          name,
          nctId,
          phase: block.match(/phase:\s*"([^"]+)"/)?.[1],
          status: block.match(/status:\s*([a-z-]+)/)?.[1],
          count: Number(block.match(/count:\s*(\d+)/)?.[1] ?? NaN),
          basis: block.match(/basis:\s*(actual|estimated)/)?.[1],
        });
      }
    }
  }

  // The food directory cites through a registry: foods.json names a source id,
  // and sources.json holds the URL. Without this the entire food side of the
  // site went unchecked, because no food entry carries a PMID directly.
  try {
    for (const src of JSON.parse(readFileSync(join(ROOT, 'src/content/sources.json'), 'utf8'))) {
      const pmid = src.url?.match(/pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)/)?.[1];
      if (!pmid) continue;
      citations.push({
        path: 'src/content/sources.json',
        name: src.id,
        title: src.name ?? '',
        url: src.url,
        pmid,
      });
    }
  } catch {
    /* registry absent in some checkouts */
  }

  for (const file of ['src/content/labs.json', 'src/content/resources.json']) {
    let data;
    try {
      data = JSON.parse(readFileSync(join(ROOT, file), 'utf8'));
    } catch {
      continue;
    }
    for (const entry of data) {
      for (const c of entry.citations ?? [entry]) {
        if (!c?.url) continue;
        citations.push({
          path: file,
          name: entry.name ?? entry.id,
          title: c.title ?? entry.name ?? '',
          url: c.url,
          pmid: c.pmid ?? c.url.match(/pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)/)?.[1],
        });
      }
    }
  }

  return { citations, trials };
}

/* ------------------------------------------------------------- comparison */

/**
 * Titles are compared loosely on purpose. PubMed returns Greek letters and HTML
 * entities — "11&#x3b2;-prostaglandin2&#x3b1;" — and wraps markup in titles, so
 * an exact match produces noise rather than signal. Stripping to alphanumerics
 * and requiring 60% of the substantial words to survive ran 33 real pairs with
 * zero false positives.
 */
const normalise = (s) =>
  s
    .replace(/&#x?[0-9a-f]+;/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

function titlesAgree(cited, fetched) {
  const a = normalise(fetched);
  const b = normalise(cited);
  // Compared in both directions. Entries legitimately append a journal to
  // disambiguate a generic title — "Mast Cell Activation Syndrome" is cited here
  // as "Mast Cell Activation Syndrome (Clinical Reviews in Allergy &
  // Immunology)" — so a one-way check flags the correct paper as wrong. A match
  // in either direction means one title contains the other.
  const overlap = (from, into) => {
    const words = from.split(' ').filter((w) => w.length > 4);
    if (words.length === 0) return 1;
    return words.filter((w) => into.includes(w)).length / words.length;
  };
  return Math.max(overlap(b, a), overlap(a, b)) >= 0.6;
}

/** Registry phases are PHASE2, PHASE2/PHASE3, NA; the site stores "2", "2/3". */
const normalisePhase = (p) =>
  String(p ?? '')
    .toUpperCase()
    .replace(/PHASE/g, '')
    .replace(/NA|NOT_APPLICABLE/g, 'not-applicable')
    .replace(/\s/g, '');

const normaliseStatus = (s) => String(s ?? '').toLowerCase().replace(/_/g, '-');

/* ------------------------------------------------------------------ PubMed */

async function checkPubmed(citations) {
  const withPmid = citations.filter((c) => c.pmid);

  // URL and pmid must agree with each other before either is worth fetching.
  for (const c of withPmid) {
    const inUrl = c.url.match(/pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)/)?.[1];
    if (inUrl && inUrl !== c.pmid) {
      fail(c.path, `"${c.name}": pmid ${c.pmid} disagrees with its own URL (${inUrl}).`);
    }
  }

  const ids = [...new Set(withPmid.map((c) => c.pmid))];
  const found = new Map();

  // Batched: one request per 100 ids rather than one per citation.
  for (let i = 0; i < ids.length; i += 100) {
    const chunk = ids.slice(i, i + 100);
    const res = await fetch(
      `${EUTILS}/esummary.fcgi?db=pubmed&retmode=json&id=${chunk.join(',')}`,
    );
    if (!res.ok) {
      warn('pubmed', `E-utilities returned ${res.status} for a batch of ${chunk.length}.`);
      continue;
    }
    const json = await res.json();
    for (const id of chunk) {
      const d = json.result?.[id];
      if (d && !d.error) found.set(id, d.title ?? '');
    }
    await sleep(400);
  }

  for (const c of withPmid) {
    if (!found.has(c.pmid)) {
      fail(c.path, `"${c.name}": PMID ${c.pmid} did not resolve at PubMed.`);
      continue;
    }
    const actual = found.get(c.pmid);
    if (!titlesAgree(c.title, actual)) {
      fail(
        c.path,
        `"${c.name}": PMID ${c.pmid} is a different paper.\n` +
          `      cited:  ${c.title}\n` +
          `      actual: ${actual}`,
      );
    }
  }

  return withPmid.length;
}

/* ---------------------------------------------------------- ClinicalTrials */

async function checkTrials(trials, citations) {
  const ids = [
    ...new Set([
      ...trials.map((t) => t.nctId),
      ...citations.filter((c) => c.nctId).map((c) => c.nctId),
    ]),
  ];

  const records = new Map();
  for (const id of ids) {
    let record = null;
    for (let attempt = 0; attempt < 3 && !record; attempt++) {
      try {
        const res = await fetch(`${CTG}/${id}`);
        if (res.ok) record = await res.json();
        else if (res.status === 404) break;
      } catch {
        /* retried below */
      }
      if (!record) await sleep(800 * (attempt + 1));
    }
    records.set(id, record);
    await sleep(300);
  }

  for (const c of citations.filter((x) => x.nctId)) {
    if (!records.get(c.nctId)) {
      fail(c.path, `"${c.name}": ${c.nctId} has no ClinicalTrials.gov record.`);
    }
  }

  for (const t of trials) {
    const rec = records.get(t.nctId);
    if (!rec) {
      fail(t.path, `"${t.name}": ${t.nctId} has no ClinicalTrials.gov record.`);
      continue;
    }
    const p = rec.protocolSection;
    const phase = normalisePhase((p.designModule?.phases ?? []).join('/'));
    const status = normaliseStatus(p.statusModule?.overallStatus);
    const enrol = p.designModule?.enrollmentInfo;

    // A status that changed inside the schema's 180-day window means the site is
    // displaying something false right now, and the freshness rule will not fire
    // for months. That is a failure, not a nudge.
    if (status !== normaliseStatus(t.status)) {
      fail(
        t.path,
        `"${t.name}": ${t.nctId} status changed — site says "${t.status}", registry says "${status}".`,
      );
    }
    if (phase && normalisePhase(t.phase) !== phase) {
      fail(
        t.path,
        `"${t.name}": ${t.nctId} phase changed — site says "${t.phase}", registry says "${phase}".`,
      );
    }
    if (enrol) {
      const basis = String(enrol.type ?? '').toLowerCase();
      if (Number(enrol.count) !== t.count || (basis && basis !== t.basis)) {
        fail(
          t.path,
          `"${t.name}": ${t.nctId} enrolment changed — site says ${t.count} ${t.basis}, ` +
            `registry says ${enrol.count} ${basis}.`,
        );
      }
    }
  }

  return ids.length;
}

/* -------------------------------------------------------------------- run */

const { citations, trials } = collect();
const pmidCount = await checkPubmed(citations);
const trialCount = await checkTrials(trials, citations);

const fails = problems.filter((p) => p.level === 'FAIL');
const warns = problems.filter((p) => p.level === 'WARN');

const lines = ['## Source integrity', ''];
lines.push(
  `Checked ${pmidCount} PubMed citation(s) and ${trialCount} trial record(s) ` +
    `across ${citations.length} citation(s).`,
  '',
);
if (fails.length === 0 && warns.length === 0) {
  lines.push('Every identifier resolves to what the site says it does.', '');
} else {
  for (const group of [
    ['Failures', fails],
    ['Warnings', warns],
  ]) {
    if (!group[1].length) continue;
    lines.push(`### ${group[0]}`, '');
    for (const p of group[1]) lines.push(`- \`${relative(ROOT, p.file)}\` — ${p.msg}`);
    lines.push('');
  }
  lines.push(
    'This check covers identity only. Whether a cited paper supports the wording ' +
      'around it, and whether any absence claim is true, still needs a reader.',
    '',
  );
}

const report = lines.join('\n');
const outFlag = process.argv.indexOf('--out');
if (outFlag !== -1 && process.argv[outFlag + 1]) {
  writeFileSync(process.argv[outFlag + 1], report);
}
console.log(report);

if (fails.length) {
  console.error(`✗ ${fails.length} source-integrity failure(s).`);
  process.exit(1);
}
console.log(`✓ Source integrity: ${pmidCount} citations, ${trialCount} trials, no failures.`);
