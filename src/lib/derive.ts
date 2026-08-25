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
  type MastCellBasis,
  type StudyDesign,
  STALE_AFTER_DAYS,
  type Rating,
  type RatingAxis,
  type TreatmentContext,
  TREATMENT_CONTEXT_INFO,
  TREATMENT_CONTEXTS,
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
 * Internal browsing rank for the strongest cited design that directly involved
 * mast cells.
 *
 * This is not rendered to patients and does not describe usefulness, clinical
 * importance or overall evidence. It exists only for the user-selected fallback
 * ordering where a clinical source supplies no order of its own.
 */
export function directMastCellStudyRank(entry: {
  mastCellBasis: MastCellBasis;
  studyDesigns: readonly StudyDesign[];
}): number {
  // A related-condition trial or downstream mediator mechanism does not become
  // a direct mast-cell study merely because the study itself was randomised.
  if (entry.mastCellBasis === 'related-condition' || entry.mastCellBasis === 'downstream') {
    return 4;
  }

  const d = entry.studyDesigns;
  if (d.includes('randomised-controlled')) return 0;
  if (
    d.includes('cohort') ||
    d.includes('cross-sectional') ||
    d.includes('case-series') ||
    d.includes('case-report')
  ) {
    return 1;
  }
  if (d.includes('in-vitro')) return 2;
  if (d.includes('non-human-in-vitro') || d.includes('animal')) return 3;
  return 4;
}

/** Direct mast-cell study rank first, then alphabetically. Internal only. */
export function byDirectMastCellStudyThenName<T extends {
  mastCellBasis: MastCellBasis;
  studyDesigns: readonly StudyDesign[];
  name: string;
}>(a: T, b: T): number {
  const d = directMastCellStudyRank(a) - directMastCellStudyRank(b);
  return d !== 0 ? d : a.name.localeCompare(b.name);
}

/**
 * A treatment's place in the published sequence, as a sortable rank.
 *
 * Both the index and the appointment picker order treatments, and they used to
 * do it differently: the index grouped by step, the picker flat-sorted every
 * entry by its direct-study rank. That put benzodiazepines, hydroxyurea, sunitinib
 * and tofacitinib above routine antihistamines in the one view a patient takes
 * to an appointment — an ordering that reads as a suggestion. Both callers now
 * share this, so the two cannot drift apart again.
 */
export function sequenceRank(entry: {
  treatmentStep?: number;
  treatmentContext?: TreatmentContext;
}): number {
  if (entry.treatmentContext) {
    const position = TREATMENT_CONTEXT_INFO[entry.treatmentContext].indexPosition;
    // Preserve the published context order as well as its position around the
    // numbered steps. Without distinct ranks, a Map-based consumer can order
    // whole context groups by whichever evidence-ranked item happens to appear
    // first.
    return position === 'before-steps'
      ? 0
      : 100 + TREATMENT_CONTEXTS.indexOf(entry.treatmentContext);
  }
  if (entry.treatmentStep) return 10 + entry.treatmentStep;
  return 200;
}

/**
 * The order a reader should meet treatments in: sequence position first, then
 * the order the step's own source describes, then the internal direct-study rank.
 */
export function byClinicalSequence<T extends {
  treatmentStep?: number;
  treatmentContext?: TreatmentContext;
  stepOrder?: number;
  mastCellBasis: MastCellBasis;
  studyDesigns: readonly StudyDesign[];
  name: string;
}>(a: T, b: T): number {
  const rank = sequenceRank(a) - sequenceRank(b);
  if (rank !== 0) return rank;
  const order = (a.stepOrder ?? Infinity) - (b.stepOrder ?? Infinity);
  if (order !== 0 && Number.isFinite(order)) return order;
  if (a.stepOrder !== b.stepOrder) return a.stepOrder === undefined ? 1 : -1;
  return byDirectMastCellStudyThenName(a, b);
}
