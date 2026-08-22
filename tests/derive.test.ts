import { describe, expect, it } from 'vitest';
import {
  axisGroups,
  byEvidenceThenName,
  consensusRating,
  daysSince,
  disagreementAxes,
  formatDate,
  staleness,
} from '../src/lib/derive';
import { AGING_AFTER_DAYS, STALE_AFTER_DAYS } from '../src/lib/vocab';

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
  it('sorts strongest direct evidence first, then alphabetically within a level', () => {
    const sorted = [
      { directEvidence: 'none' as const, name: 'Quercetin' },
      { directEvidence: 'randomized' as const, name: 'Zebra' },
      { directEvidence: 'observational' as const, name: 'Beta' },
      { directEvidence: 'observational' as const, name: 'Alpha' },
    ].sort(byEvidenceThenName);
    expect(sorted.map((e) => e.name)).toEqual(['Zebra', 'Alpha', 'Beta', 'Quercetin']);
  });

  it('ranks a drug studied in MCAS above one studied only elsewhere', () => {
    // The whole point of sorting on direct evidence: avapritinib has a
    // placebo-controlled trial, but in systemic mastocytosis, and must not
    // outrank something with real MCAS data behind it.
    const sorted = [
      { directEvidence: 'none' as const, name: 'Avapritinib' },
      { directEvidence: 'case-report' as const, name: 'Something studied in MCAS' },
    ].sort(byEvidenceThenName);
    expect(sorted[0]!.name).toBe('Something studied in MCAS');
  });
});

describe('formatDate', () => {
  it('formats in UTC so the displayed day does not shift by time zone', () => {
    expect(formatDate(new Date('2026-08-20T00:00:00Z'))).toBe('20 Aug 2026');
  });
});
