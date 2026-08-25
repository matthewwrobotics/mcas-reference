/**
 * Pure functions over content data.
 *
 * Kept free of `astro:content` imports so they can be unit-tested directly.
 * Everything here is derived at build time from the data files — none of it is
 * curated by hand, which is the point: a disagreement between sources shows up
 * because the data contains one, not because someone remembered to label it.
 */

import {
  AGING_AFTER_DAYS,
  MAST_CELL_BASIS_RANK,
  RELEVANCE_GRADE_RANK,
  type MastCellBasis,
  type RelevanceGrade,
  type StudyDesign,
  STALE_AFTER_DAYS,
  type Rating,
  type RatingAxis,
} from './vocab';

const DAY_MS = 86_400_000;

export type StalenessLevel = 'fresh' | 'aging' | 'stale';

export interface Staleness {
  level: StalenessLevel;
  days: number;
}

/**
 * Whole days between two dates, counted on UTC calendar boundaries.
 *
 * Content dates are authored as bare `YYYY-MM-DD` and parse to UTC midnight, so
 * comparing raw timestamps against a local `now` reports a day that has not
 * happened yet for anyone west of UTC. Normalising both ends to UTC midnight
 * keeps "verified today" reading as 0 days everywhere.
 */
export function daysSince(date: Date, now: Date = new Date()): number {
  const utcMidnight = (d: Date) =>
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  return Math.max(0, Math.round((utcMidnight(now) - utcMidnight(date)) / DAY_MS));
}

/**
 * How much trust the reader should place in an entry's "last verified" date.
 *
 * A citation that was accurate in March may point at a withdrawn trial in
 * September. Rather than let entries quietly rot, every one carries a date and
 * decays visibly through these levels.
 */
export function staleness(lastVerified: Date, now: Date = new Date()): Staleness {
  const days = daysSince(lastVerified, now);
  if (days >= STALE_AFTER_DAYS) return { level: 'stale', days };
  if (days >= AGING_AFTER_DAYS) return { level: 'aging', days };
  return { level: 'fresh', days };
}

export const STALENESS_LABELS: Record<StalenessLevel, string> = {
  fresh: 'Recently verified',
  aging: 'Due for re-check',
  stale: 'Overdue for re-check',
};

export interface RatingLike {
  axis: RatingAxis;
  source: string;
  rating?: Rating;
  note?: string;
  url?: string;
}

export interface OpenRating {
  source: string;
  rating: Rating;
  note?: string;
}

export interface LinkOnlyRating {
  source: string;
  url?: string;
  note?: string;
}

export interface AxisGroup {
  axis: RatingAxis;
  /** Sources whose values we may restate. */
  open: OpenRating[];
  /** Sources we may only point at. */
  linkOnly: LinkOnlyRating[];
  /** Distinct values among `open`, in first-seen order. */
  distinct: Rating[];
  /**
   * True when two citable sources give this axis different values. Surfaced in
   * the UI rather than resolved away — a food the literature disagrees about is
   * a different thing to know than a food it agrees is moderate.
   */
  disagreement: boolean;
}

/**
 * Group a food's ratings by axis, splitting restatable sources from link-only
 * ones and flagging axes where the restatable sources conflict.
 */
export function axisGroups(
  ratings: readonly RatingLike[],
  isLinkOnly: (source: string) => boolean,
): AxisGroup[] {
  const byAxis = new Map<RatingAxis, AxisGroup>();

  for (const r of ratings) {
    let group = byAxis.get(r.axis);
    if (!group) {
      group = {
        axis: r.axis,
        open: [],
        linkOnly: [],
        distinct: [],
        disagreement: false,
      };
      byAxis.set(r.axis, group);
    }

    if (isLinkOnly(r.source)) {
      group.linkOnly.push({ source: r.source, url: r.url, note: r.note });
      continue;
    }

    if (r.rating === undefined) continue;
    group.open.push({ source: r.source, rating: r.rating, note: r.note });
    if (!group.distinct.includes(r.rating)) group.distinct.push(r.rating);
  }

  for (const group of byAxis.values()) {
    group.disagreement = group.distinct.length > 1;
  }

  return [...byAxis.values()];
}

/** Every axis on which a food's citable sources disagree. */
export function disagreementAxes(groups: readonly AxisGroup[]): RatingAxis[] {
  return groups.filter((g) => g.disagreement).map((g) => g.axis);
}

/**
 * A single value for an axis when one is needed for sorting or filtering.
 * Returns undefined where sources disagree — collapsing a disagreement into one
 * value is exactly the thing this site refuses to do, so callers must handle it.
 */
export function consensusRating(group: AxisGroup): Rating | undefined {
  return group.distinct.length === 1 ? group.distinct[0] : undefined;
}

/**
 * Most directly studied in mast cells first, then alphabetically.
 *
 * Sorting on this rather than on trial strength is deliberate: avapritinib has
 * a placebo-controlled trial behind it, in a disease MCAS patients do not have.
 * Ranking by trial quality would put it top and quietly recommend it.
 */
export function byEvidenceThenName<T extends { mastCellBasis: MastCellBasis; name: string }>(
  a: T,
  b: T,
): number {
  const d = MAST_CELL_BASIS_RANK[a.mastCellBasis] - MAST_CELL_BASIS_RANK[b.mastCellBasis];
  return d !== 0 ? d : a.name.localeCompare(b.name);
}

/** Formats a date as e.g. "20 Aug 2026", stable across locales and time zones. */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/**
 * The at-a-glance grade, computed from the entry rather than authored on it.
 *
 * Grades the strongest design done *in mast cells*. An approval elsewhere is a
 * separate fact and deliberately does not feed in here — otherwise famotidine
 * would grade top for heartburn and aspirin for minor aches, which is how the
 * previous grade lost its meaning.
 */
export function relevanceGrade(entry: {
  mastCellBasis: MastCellBasis;
  studyDesigns: readonly StudyDesign[];
}): RelevanceGrade {
  // A related-condition trial or downstream mediator mechanism does not become
  // mast-cell evidence merely because the study itself was randomised.
  if (entry.mastCellBasis === 'related-condition' || entry.mastCellBasis === 'downstream') {
    return 'none';
  }

  const d = entry.studyDesigns;
  if (d.includes('randomised-controlled')) return 'randomised';
  if (
    d.includes('cohort') ||
    d.includes('cross-sectional') ||
    d.includes('case-series') ||
    d.includes('case-report')
  ) {
    return 'human-observational';
  }
  if (d.includes('in-vitro')) return 'in-vitro';
  if (d.includes('non-human-in-vitro') || d.includes('animal')) return 'animal';
  return 'none';
}

/** Strongest grade first, then alphabetically. */
export function byGradeThenName<T extends {
  mastCellBasis: MastCellBasis;
  studyDesigns: readonly StudyDesign[];
  name: string;
}>(a: T, b: T): number {
  const d = RELEVANCE_GRADE_RANK[relevanceGrade(a)] - RELEVANCE_GRADE_RANK[relevanceGrade(b)];
  return d !== 0 ? d : a.name.localeCompare(b.name);
}
