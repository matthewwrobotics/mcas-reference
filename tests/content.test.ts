import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  AGING_AFTER_DAYS,
  STALE_AFTER_DAYS,
  RATING_AXES,
  REDISTRIBUTION,
} from '../src/lib/vocab';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const read = (p: string) => readFileSync(ROOT + p, 'utf8');
const readJson = (p: string) => JSON.parse(read(p));

const sources = readJson('src/content/sources.json');
const foods = readJson('src/content/foods.json');
const resources = readJson('src/content/resources.json');

describe('staleness thresholds', () => {
  // scripts/check-staleness.mjs runs as plain node and cannot import the
  // TypeScript vocabulary, so it redeclares these. If the two drift, the site
  // and the job that polices it would disagree about what "stale" means.
  const script = read('scripts/check-staleness.mjs');

  it('match between the site vocabulary and the maintenance script', () => {
    expect(script).toContain(`const AGING_AFTER_DAYS = ${AGING_AFTER_DAYS};`);
    expect(script).toContain(`const STALE_AFTER_DAYS = ${STALE_AFTER_DAYS};`);
  });
});

describe('source registry', () => {
  it('has unique ids', () => {
    const ids = sources.map((s: any) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('only uses known redistribution terms', () => {
    for (const s of sources) {
      expect(REDISTRIBUTION).toContain(s.redistribution);
    }
  });

  it('states terms for every source, so /methodology can publish them', () => {
    for (const s of sources) {
      expect(s.terms?.length, `${s.id} has no stated terms`).toBeGreaterThan(20);
    }
  });
});

describe('food data', () => {
  const byId = new Map<string, any>(sources.map((s: any) => [s.id, s]));

  it('has unique ids', () => {
    const ids = foods.map((f: any) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('cites only registered sources', () => {
    for (const food of foods) {
      for (const r of food.ratings) {
        expect(byId.has(r.source), `${food.id} cites unknown source ${r.source}`).toBe(true);
      }
    }
  });

  it('uses only known axes', () => {
    for (const food of foods) {
      for (const r of food.ratings) {
        expect(RATING_AXES).toContain(r.axis);
      }
    }
  });

  it('never restates a value from a link-only source', () => {
    // The same rule the schema enforces, asserted here so a regression shows up
    // as a named test failure rather than as a build error in CI logs.
    for (const food of foods) {
      for (const r of food.ratings) {
        if (byId.get(r.source)?.redistribution === 'link-only') {
          expect(r.rating, `${food.id} restates ${r.source}`).toBeUndefined();
          expect(r.url, `${food.id} links nowhere for ${r.source}`).toBeTruthy();
        }
      }
    }
  });

  it('never rates the same axis twice from one source', () => {
    for (const food of foods) {
      const keys = food.ratings.map((r: any) => `${r.source}::${r.axis}`);
      expect(new Set(keys).size, `${food.id} has duplicate ratings`).toBe(keys.length);
    }
  });
});

describe('resources', () => {
  it('has unique ids and https urls', () => {
    const ids = resources.map((r: any) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const r of resources) {
      expect(r.url.startsWith('https://'), `${r.id} is not https`).toBe(true);
    }
  });
});

describe('citations across all treatment entries', () => {
  const files = [
    ...['cromolyn-sodium', 'ketotifen', 'omalizumab', 'avapritinib', 'masitinib', 'cetirizine', 'famotidine', 'montelukast'].map(
      (n) => `src/content/medications/${n}.md`,
    ),
    ...['quercetin', 'luteolin', 'diamine-oxidase', 'palmitoylethanolamide'].map(
      (n) => `src/content/supplements/${n}.md`,
    ),
  ];

  it('use https for every cited url', () => {
    for (const f of files) {
      const urls = [...read(f).matchAll(/url:\s*"([^"]+)"/g)].map((m) => m[1]!);
      expect(urls.length, `${f} has no citations`).toBeGreaterThan(0);
      for (const u of urls) {
        expect(u.startsWith('https://'), `${f} cites insecure ${u}`).toBe(true);
      }
    }
  });

  it('give every PubMed citation a matching pmid field', () => {
    // A citation whose url and pmid disagree is worse than one with no pmid.
    for (const f of files) {
      const raw = read(f);
      const blocks = raw.split(/\n  - title:/).slice(1);
      for (const block of blocks) {
        const url = block.match(/url:\s*"([^"]+)"/)?.[1] ?? '';
        const pmid = block.match(/pmid:\s*"(\d+)"/)?.[1];
        const inUrl = url.match(/pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)/)?.[1];
        if (inUrl) {
          expect(pmid, `${f}: PubMed citation ${url} has no pmid field`).toBe(inUrl);
        }
      }
    }
  });
});
