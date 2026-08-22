import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { relevanceGrade } from '../src/lib/derive';
import { RELEVANCE_GRADES } from '../src/lib/vocab';

/**
 * The previous evidence grade was removed because it had no variance — ten of
 * twelve entries scored the same value and it distinguished nothing. This test
 * exists so that failure cannot recur silently: if the grade ever collapses
 * onto one or two rungs, it has stopped doing its job and should be rethought
 * rather than quietly kept.
 */
const ROOT = fileURLToPath(new URL('..', import.meta.url));

function entries() {
  const out: { name: string; grade: string }[] = [];
  for (const dir of ['src/content/medications', 'src/content/supplements']) {
    for (const file of readdirSync(ROOT + dir).filter((f) => f.endsWith('.md'))) {
      const raw = readFileSync(`${ROOT}${dir}/${file}`, 'utf8');
      const name = raw.match(/^name:\s*(.+)$/m)?.[1] ?? file;
      const basis = raw.match(/^mastCellBasis:\s*(\S+)/m)?.[1] as never;
      const designs = [...raw.matchAll(/^ {2}- (randomised-controlled|cohort|case-series|case-report|in-vitro|animal)$/gm)]
        .map((m) => m[1]) as never[];
      out.push({ name, grade: relevanceGrade({ mastCellBasis: basis, studyDesigns: designs }) });
    }
  }
  return out;
}

describe('grade distribution across published entries', () => {
  const all = entries();

  it('reads a design and a basis from every entry', () => {
    expect(all.length).toBeGreaterThan(10);
    for (const e of all) expect(RELEVANCE_GRADES).toContain(e.grade);
  });

  it('spreads across at least four of the five rungs', () => {
    const used = new Set(all.map((e) => e.grade));
    expect([...used].sort().join(', ')).toBeTruthy();
    expect(used.size).toBeGreaterThanOrEqual(4);
  });

  it('never puts more than 60% of entries on one rung', () => {
    const counts = new Map<string, number>();
    for (const e of all) counts.set(e.grade, (counts.get(e.grade) ?? 0) + 1);
    const biggest = Math.max(...counts.values());
    expect(biggest / all.length).toBeLessThanOrEqual(0.6);
  });
});
