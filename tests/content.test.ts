import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  AGING_AFTER_DAYS,
  STALE_AFTER_DAYS,
  FOOD_TRIGGER_SIGNALS,
  MAST_CELL_BASIS_INFO,
  RATING_AXES,
  REDISTRIBUTION,
  STUDY_DESIGN_INFO,
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
      for (const trigger of food.potentialTriggers ?? []) {
        expect(
          byId.has(trigger.source),
          `${food.id} cites unknown potential-trigger source ${trigger.source}`,
        ).toBe(true);
      }
    }
  });

  it('uses only known potential-trigger signals and open sources', () => {
    for (const food of foods) {
      for (const trigger of food.potentialTriggers ?? []) {
        expect(FOOD_TRIGGER_SIGNALS).toContain(trigger.signal);
        expect(
          byId.get(trigger.source)?.redistribution,
          `${food.id} restates link-only potential-trigger source ${trigger.source}`,
        ).toBe('open');
        expect(trigger.note?.length).toBeGreaterThan(20);
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

  it('never records the same potential-trigger signal twice from one source', () => {
    for (const food of foods) {
      const keys = (food.potentialTriggers ?? []).map(
        (trigger: any) => `${trigger.source}::${trigger.signal}`,
      );
      expect(new Set(keys).size, `${food.id} has duplicate trigger signals`).toBe(keys.length);
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

describe('treatment sequence metadata', () => {
  const config = read('src/content.config.ts');

  it('keeps the schema guard for stepOrder without a treatmentStep', () => {
    expect(config).toContain('entry.stepOrder !== undefined && !entry.treatmentStep');
    expect(config).toContain('sets stepOrder but has no treatmentStep');
  });
});

describe('patient-facing treatment facts', () => {
  const treatmentFiles = ['medications', 'supplements'].flatMap((collection) =>
    readdirSync(`${ROOT}src/content/${collection}`)
      .filter((file) => file.endsWith('.md'))
      .map((file) => `src/content/${collection}/${file}`),
  );

  it('keeps the six relationship labels concise and non-ordinal', () => {
    expect(Object.fromEntries(
      Object.entries(MAST_CELL_BASIS_INFO).map(([key, value]) => [key, value.label]),
    )).toEqual({
      'mcas-patients': 'MCAS patients',
      'mast-cell-disease': 'Mast cell disease',
      'mast-cell-mediated-condition': 'Mast-cell-mediated condition',
      laboratory: 'Mast cells in the laboratory',
      'related-condition': 'Related inflammatory condition',
      downstream: 'Downstream of the mast cell',
    });
  });

  it('keeps the acceptance examples on their intended relationship and study type', () => {
    const expected = [
      ['medications/epinephrine.md', 'downstream', 'cohort'],
      ['medications/cetirizine.md', 'downstream', 'randomised-controlled'],
      ['medications/famotidine.md', 'downstream', 'randomised-controlled'],
      ['medications/omalizumab.md', 'mcas-patients', 'case-series'],
      ['supplements/quercetin.md', 'laboratory', 'in-vitro'],
    ];

    for (const [file, basis, design] of expected) {
      const raw = read(`src/content/${file}`);
      expect(raw, file).toMatch(new RegExp(`^mastCellBasis: ${basis}$`, 'm'));
      expect(raw, file).toMatch(new RegExp(`^  - ${design}$`, 'm'));
      expect(STUDY_DESIGN_INFO[design as keyof typeof STUDY_DESIGN_INFO].label).toBeTruthy();
    }
  });

  it('uses the same two fact headings on cards, entries, and appointment printouts', () => {
    const card = read('src/components/TreatmentFacts.astro');
    const entry = read('src/components/EvidenceRows.astro');
    const appointment = read('src/components/AppointmentBuilder.tsx');

    expect(card).toContain('How it relates:');
    expect(card).toContain('Study types:');
    expect(entry).toContain('How it relates to mast cells');
    expect(entry).toContain('Types of studies cited');
    expect(appointment).toContain('How it relates to mast cells:');
    expect(appointment).toContain('Types of studies cited:');
    expect(card + entry + appointment).not.toContain('GradeBadge');
    expect(card + entry + appointment).not.toContain('Approved for other conditions');
  });

  it('does not restore retired grade or tier prose in treatment content', () => {
    for (const file of treatmentFiles) {
      expect(read(file), file).not.toMatch(
        /(?:mast[- ]cell|evidence)\s+(?:grade|tier)|no mast cell evidence/i,
      );
    }
  });
});
