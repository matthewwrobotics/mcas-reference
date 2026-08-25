import { describe, expect, it } from 'vitest';
import {
  axisGroups,
  relevanceGrade,
  byGradeThenName,
  byEvidenceThenName,
  byClinicalSequence,
  sequenceRank,
  consensusRating,
  daysSince,
  disagreementAxes,
  formatDate,
  staleness,
} from '../src/lib/derive';
import {
  AGING_AFTER_DAYS,
  STALE_AFTER_DAYS,
  type MastCellBasis,
  type StudyDesign,
} from '../src/lib/vocab';

const NOW = new Date('2026-08-20T12:00:00Z');
const daysBefore = (n: number) =>
  new Date(NOW.getTime() - n * 86_400_000);

describe('daysSince', () => {
  it('counts today as zero regardless of clock time', () => {
    // Content dates parse to UTC midnight; a local afternoon `now` must not
    // make a same-day entry look a day old.
    expect(daysSince(new Date('2026-08-20T00:00:00Z'), NOW)).toBe(0);
    expect(daysSince(new Date('2026-08-20T00:00:00Z'), new Date('2026-08-20T23:59:00Z'))).toBe(0);
  });

  it('counts whole calendar days', () => {
    expect(daysSince(new Date('2026-08-19T00:00:00Z'), NOW)).toBe(1);
    expect(daysSince(new Date('2026-07-21T00:00:00Z'), NOW)).toBe(30);
  });

  it('never returns a negative count for a future date', () => {
    expect(daysSince(new Date('2026-09-01T00:00:00Z'), NOW)).toBe(0);
  });
});

describe('staleness', () => {
  it('is fresh right up to the aging boundary', () => {
    expect(staleness(daysBefore(AGING_AFTER_DAYS - 1), NOW).level).toBe('fresh');
  });

  it('flips to aging exactly on the boundary', () => {
    expect(staleness(daysBefore(AGING_AFTER_DAYS), NOW).level).toBe('aging');
  });

  it('stays aging up to the stale boundary', () => {
    expect(staleness(daysBefore(STALE_AFTER_DAYS - 1), NOW).level).toBe('aging');
  });

  it('flips to stale exactly on the boundary', () => {
    expect(staleness(daysBefore(STALE_AFTER_DAYS), NOW).level).toBe('stale');
  });
});

const linkOnly = (source: string) => source === 'proprietary';

describe('axisGroups', () => {
  it('flags an axis where two citable sources give different values', () => {
    const groups = axisGroups(
      [
        { axis: 'oxalate', source: 'raw-analysis', rating: 'high' },
        { axis: 'oxalate', source: 'cooked-analysis', rating: 'variable' },
      ],
      linkOnly,
    );
    expect(groups).toHaveLength(1);
    expect(groups[0]!.disagreement).toBe(true);
    expect(groups[0]!.distinct).toEqual(['high', 'variable']);
    expect(disagreementAxes(groups)).toEqual(['oxalate']);
  });

  it('does not flag agreement, even across several sources', () => {
    const groups = axisGroups(
      [
        { axis: 'histamine', source: 'a', rating: 'high' },
        { axis: 'histamine', source: 'b', rating: 'high' },
        { axis: 'histamine', source: 'c', rating: 'high' },
      ],
      linkOnly,
    );
    expect(groups[0]!.disagreement).toBe(false);
    expect(groups[0]!.distinct).toEqual(['high']);
  });

  it('routes link-only sources away from the ratings that can be restated', () => {
    const groups = axisGroups(
      [
        { axis: 'fodmap', source: 'proprietary', url: 'https://example.com/' },
        { axis: 'fodmap', source: 'open-paper', rating: 'low' },
      ],
      linkOnly,
    );
    expect(groups[0]!.linkOnly).toHaveLength(1);
    expect(groups[0]!.open).toHaveLength(1);
    // A link-only source has no value to conflict with, so it cannot create a
    // disagreement on its own.
    expect(groups[0]!.disagreement).toBe(false);
  });

  it('cannot manufacture a disagreement from link-only sources alone', () => {
    const groups = axisGroups(
      [
        { axis: 'fodmap', source: 'proprietary', url: 'https://example.com/a' },
        { axis: 'fodmap', source: 'proprietary', url: 'https://example.com/b' },
      ],
      linkOnly,
    );
    expect(groups[0]!.open).toHaveLength(0);
    expect(groups[0]!.disagreement).toBe(false);
  });

  it('keeps separate axes separate', () => {
    const groups = axisGroups(
      [
        { axis: 'oxalate', source: 'a', rating: 'high' },
        { axis: 'salicylate', source: 'b', rating: 'low' },
      ],
      linkOnly,
    );
    expect(groups.map((g) => g.axis).sort()).toEqual(['oxalate', 'salicylate']);
    expect(groups.every((g) => !g.disagreement)).toBe(true);
  });
});

describe('consensusRating', () => {
  it('returns the single agreed value', () => {
    const [group] = axisGroups(
      [
        { axis: 'histamine', source: 'a', rating: 'low' },
        { axis: 'histamine', source: 'b', rating: 'low' },
      ],
      linkOnly,
    );
    expect(consensusRating(group!)).toBe('low');
  });

  it('refuses to collapse a disagreement into one value', () => {
    const [group] = axisGroups(
      [
        { axis: 'histamine', source: 'a', rating: 'low' },
        { axis: 'histamine', source: 'b', rating: 'high' },
      ],
      linkOnly,
    );
    expect(consensusRating(group!)).toBeUndefined();
  });
});

describe('byEvidenceThenName', () => {
  it('sorts most directly studied in mast cells first, then alphabetically', () => {
    const sorted = [
      { mastCellBasis: 'downstream' as const, name: 'Cetirizine' },
      { mastCellBasis: 'related-condition' as const, name: 'TLL-018' },
      { mastCellBasis: 'mast-cell-mediated-condition' as const, name: 'Barzolvolimab' },
      { mastCellBasis: 'mcas-patients' as const, name: 'Zebra' },
      { mastCellBasis: 'mast-cell-disease' as const, name: 'Beta' },
      { mastCellBasis: 'mast-cell-disease' as const, name: 'Alpha' },
    ].sort(byEvidenceThenName);
    expect(sorted.map((e) => e.name)).toEqual(['Zebra', 'Alpha', 'Beta', 'Barzolvolimab', 'TLL-018', 'Cetirizine']);
  });

  it('does not let trial strength outrank proximity to mast cells', () => {
    // Avapritinib has a placebo-controlled trial behind it — in a disease MCAS
    // patients do not have. Ranking on trial quality would put it top and
    // quietly recommend it.
    const sorted = [
      { mastCellBasis: 'mast-cell-disease' as const, name: 'Avapritinib' },
      { mastCellBasis: 'mcas-patients' as const, name: 'Studied in MCAS itself' },
    ].sort(byEvidenceThenName);
    expect(sorted[0]!.name).toBe('Studied in MCAS itself');
  });

  it('ranks a drug acting on mast cells above one acting downstream', () => {
    const sorted = [
      { mastCellBasis: 'downstream' as const, name: 'Famotidine' },
      { mastCellBasis: 'laboratory' as const, name: 'Quercetin' },
    ].sort(byEvidenceThenName);
    expect(sorted[0]!.name).toBe('Quercetin');
  });
});

describe('relevanceGrade', () => {
  it('grades on the strongest design done in mast cells', () => {
    expect(relevanceGrade({ mastCellBasis: 'mast-cell-disease', studyDesigns: ['randomised-controlled'] })).toBe('randomised');
    expect(relevanceGrade({ mastCellBasis: 'mast-cell-mediated-condition', studyDesigns: ['randomised-controlled'] })).toBe('randomised');
    expect(relevanceGrade({ mastCellBasis: 'mcas-patients', studyDesigns: ['case-series'] })).toBe('human-observational');
    expect(relevanceGrade({ mastCellBasis: 'mcas-patients', studyDesigns: ['cross-sectional'] })).toBe('human-observational');
    expect(relevanceGrade({ mastCellBasis: 'laboratory', studyDesigns: ['in-vitro'] })).toBe('in-vitro');
    expect(relevanceGrade({ mastCellBasis: 'laboratory', studyDesigns: ['animal'] })).toBe('animal');
  });

  it('returns none for anything acting downstream, whatever designs it lists', () => {
    // Famotidine has a randomised trial — in acute urticaria, not in mast
    // cells. Letting that count is how the previous grade became meaningless.
    expect(
      relevanceGrade({ mastCellBasis: 'downstream', studyDesigns: ['randomised-controlled'] }),
    ).toBe('none');
  });

  it('does not convert a related-condition trial into mast-cell evidence', () => {
    expect(
      relevanceGrade({ mastCellBasis: 'related-condition', studyDesigns: ['randomised-controlled'] }),
    ).toBe('none');
  });

  it('keeps non-human cells on the non-human rung', () => {
    expect(
      relevanceGrade({ mastCellBasis: 'laboratory', studyDesigns: ['non-human-in-vitro'] }),
    ).toBe('animal');
  });

  it('takes the strongest design when several are present', () => {
    expect(
      relevanceGrade({ mastCellBasis: 'mast-cell-disease', studyDesigns: ['in-vitro', 'randomised-controlled'] }),
    ).toBe('randomised');
  });

  it('ranks human in vitro above an animal model', () => {
    const sorted = [
      { mastCellBasis: 'laboratory' as const, studyDesigns: ['animal' as const], name: 'PEA' },
      { mastCellBasis: 'laboratory' as const, studyDesigns: ['in-vitro' as const], name: 'Quercetin' },
    ].sort(byGradeThenName);
    expect(sorted[0]!.name).toBe('Quercetin');
  });
});

describe('formatDate', () => {
  it('formats in UTC so the displayed day does not shift by time zone', () => {
    expect(formatDate(new Date('2026-08-20T00:00:00Z'))).toBe('20 Aug 2026');
  });
});

describe('sequenceRank', () => {
  const at = (over: Record<string, unknown>) => sequenceRank(over as any);

  it('puts emergency treatment before every numbered step', () => {
    expect(at({ treatmentContext: 'emergency-intervention' })).toBeLessThan(
      at({ treatmentStep: 1 }),
    );
  });

  it('keeps the numbered steps in their published order', () => {
    expect(at({ treatmentStep: 1 })).toBeLessThan(at({ treatmentStep: 8 }));
  });

  it('puts after-steps contexts below every numbered step', () => {
    expect(at({ treatmentStep: 8 })).toBeLessThan(
      at({ treatmentContext: 'emerging-refractory' }),
    );
  });

  it('preserves the defined order of after-steps context groups', () => {
    expect(at({ treatmentContext: 'trigger-specific' })).toBeLessThan(
      at({ treatmentContext: 'emerging-refractory' }),
    );
    expect(at({ treatmentContext: 'emerging-refractory' })).toBeLessThan(
      at({ treatmentContext: 'local-route' }),
    );
  });

  it('puts unplaced entries last', () => {
    expect(at({ treatmentContext: 'emerging-refractory' })).toBeLessThan(at({}));
  });
});

describe('byClinicalSequence', () => {
  type Entry = {
    name: string;
    treatmentStep?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    treatmentContext?: 'emergency-intervention' | 'emerging-refractory' | 'trigger-specific' | 'local-route';
    stepOrder?: number;
    mastCellBasis: MastCellBasis;
    studyDesigns: readonly StudyDesign[];
  };
  // The defect this ordering exists to prevent: a sedating first-generation
  // antihistamine outranking a second-generation one, because a direct-but-weak
  // mast-cell study beats strong evidence borrowed from another condition.
  const cetirizine: Entry = {
    name: 'Cetirizine',
    treatmentStep: 1,
    stepOrder: 1,
    mastCellBasis: 'downstream',
    studyDesigns: ['randomised-controlled'],
  };
  const hydroxyzine: Entry = {
    name: 'Hydroxyzine',
    treatmentStep: 1,
    stepOrder: 2,
    mastCellBasis: 'mcas-patients',
    studyDesigns: ['randomised-controlled'],
  };

  it('follows stepOrder even when the later entry has stronger mast-cell evidence', () => {
    expect(byClinicalSequence(cetirizine, hydroxyzine)).toBeLessThan(0);
    expect(byClinicalSequence(hydroxyzine, cetirizine)).toBeGreaterThan(0);
  });

  it('falls back to evidence strength when neither sets stepOrder', () => {
    const a: Entry = { ...cetirizine, stepOrder: undefined };
    const b: Entry = { ...hydroxyzine, stepOrder: undefined };
    // b is studied in MCAS patients directly, so it should lead on evidence.
    expect(byClinicalSequence(a, b)).toBeGreaterThan(0);
  });

  it('sorts an entry without stepOrder after one that has it', () => {
    const unordered: Entry = { ...hydroxyzine, stepOrder: undefined };
    expect(byClinicalSequence(cetirizine, unordered)).toBeLessThan(0);
    expect(byClinicalSequence(unordered, cetirizine)).toBeGreaterThan(0);
  });

  it('ranks by sequence position before anything else', () => {
    const emergency: Entry = {
      name: 'Epinephrine',
      treatmentContext: 'emergency-intervention',
      mastCellBasis: 'downstream',
      studyDesigns: ['cohort'],
    };
    expect(byClinicalSequence(emergency, cetirizine)).toBeLessThan(0);
  });
});
