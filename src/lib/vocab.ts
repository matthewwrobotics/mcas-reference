/**
 * Controlled vocabularies for the whole site.
 *
 * Every enum lives here exactly once. `content.config.ts` turns these arrays
 * into Zod enums (so bad data fails the build), the badge components turn them
 * into labels, and /methodology turns them into published definitions. If a
 * tier's meaning changes, it changes in one place and the site stays honest.
 */

/**
 * Evidence is recorded as two separate facts, not one ordinal badge.
 *
 * A single tier cannot describe omalizumab honestly: it has randomised
 * placebo-controlled trials in chronic urticaria and food allergy, and only
 * uncontrolled case series in MCAS itself. Calling it "RCT-adjacent" hides how
 * thin the MCAS evidence is; calling it "observational" hides that real trials
 * exist next door. Both facts matter, and they are different questions, so the
 * site answers them separately and lets the reader weigh them.
 */
export const DIRECT_EVIDENCE = [
  'randomized',
  'observational',
  'case-report',
  'none',
] as const;
export type DirectEvidence = (typeof DIRECT_EVIDENCE)[number];

export const DIRECT_EVIDENCE_INFO: Record<
  DirectEvidence,
  { label: string; short: string; definition: string }
> = {
  randomized: {
    label: 'Randomised results in MCAS',
    short: 'Randomised',
    definition:
      'A randomised controlled comparison in mast cell activation syndrome with publicly available, evaluable outcome results. A registered protocol, an unreported trial, or a trial stopped before it could estimate an effect does not qualify — those are facts about a trial, not evidence of one.',
  },
  observational: {
    label: 'Observational in MCAS',
    short: 'Observational',
    definition:
      'Cohorts, case series, or retrospective review in MCAS. No randomisation and no control arm, so improvement after starting treatment cannot be separated from the fluctuation of a relapsing-remitting condition.',
  },
  'case-report': {
    label: 'Case reports in MCAS',
    short: 'Case reports',
    definition:
      'One or a small number of individually reported patients with MCAS.',
  },
  none: {
    label: 'No direct MCAS evidence',
    short: 'None direct',
    definition:
      'Nothing published in MCAS itself. Whatever supports this entry comes from a related condition or from the laboratory, and is recorded separately.',
  },
};

/** Index-page sort order: strongest direct evidence first. */
export const DIRECT_EVIDENCE_RANK: Record<DirectEvidence, number> = {
  randomized: 0,
  observational: 1,
  'case-report': 2,
  none: 3,
};

/** How strong the evidence is somewhere other than MCAS. */
export const OTHER_EVIDENCE_DESIGNS = [
  'randomized',
  'observational',
  'laboratory',
] as const;
export type OtherEvidenceDesign = (typeof OTHER_EVIDENCE_DESIGNS)[number];

export const OTHER_EVIDENCE_LABELS: Record<OtherEvidenceDesign, string> = {
  randomized: 'Randomised trials',
  observational: 'Observational studies',
  laboratory: 'Laboratory models only',
};

export const REGULATORY_STATUSES = [
  'approved-us-mcas',
  'approved-us-other',
  'approved-non-us',
  'investigational',
  'otc',
  'dietary-supplement',
  'compounded',
  'none',
] as const;
export type RegulatoryStatus = (typeof REGULATORY_STATUSES)[number];

export const REGULATORY_INFO: Record<
  RegulatoryStatus,
  { label: string; definition: string }
> = {
  'approved-us-mcas': {
    label: 'FDA-approved for MCAS',
    definition: 'Carries a US label for mast cell activation disease.',
  },
  'approved-us-other': {
    label: 'FDA-approved, other indication',
    definition:
      'Carries a US label for a different condition. Any use in MCAS is off-label.',
  },
  'approved-non-us': {
    label: 'Approved outside the US',
    definition:
      'Approved by at least one non-US regulator but not by the FDA. Entries in this bucket must state the off-label rationale explicitly.',
  },
  investigational: {
    label: 'Investigational',
    definition: 'In clinical trials; not approved by any regulator.',
  },
  otc: {
    label: 'Over-the-counter drug',
    definition:
      'A non-prescription drug, regulated under an FDA over-the-counter monograph or an approved application. Reserved for drugs; a dietary supplement is a different thing and has its own status below.',
  },
  'dietary-supplement': {
    label: 'US dietary supplement — not FDA-approved as a drug',
    definition:
      'Sold as a dietary supplement, which in the US means it does not undergo premarket FDA review for safety or effectiveness. Availability and approval are separate axes, and being easy to buy says nothing about either.',
  },
  compounded: {
    label: 'Compounded',
    definition:
      'Not commercially manufactured in this form; prepared by a compounding pharmacy.',
  },
  none: {
    label: 'No regulatory approval',
    definition: 'Not approved by any regulator for any indication.',
  },
};

export const TRIAL_STATUSES = [
  'recruiting',
  'active-not-recruiting',
  'completed',
  'terminated',
  'withdrawn',
  'unknown',
] as const;
export type TrialStatus = (typeof TRIAL_STATUSES)[number];

export const TRIAL_STATUS_LABELS: Record<TrialStatus, string> = {
  recruiting: 'Recruiting',
  'active-not-recruiting': 'Active, not recruiting',
  completed: 'Completed',
  terminated: 'Terminated',
  withdrawn: 'Withdrawn',
  unknown: 'Status unknown',
};

/**
 * Deliberately has no "aggregator" option. Aggregator sites go stale without
 * saying so — this list once reported an active status for a masitinib trial
 * that had already stopped. Restricting the field to the registry and the
 * sponsor makes that mistake a build error rather than a habit.
 */
/**
 * Whether a status should be presented as reassuring or as needing a second
 * look. "Unknown" is deliberately grouped with the stopped states: a record the
 * sponsor has abandoned is not a running trial.
 */
export const TRIAL_STATUS_TONE: Record<TrialStatus, 'neutral' | 'caution'> = {
  recruiting: 'neutral',
  'active-not-recruiting': 'neutral',
  completed: 'neutral',
  terminated: 'caution',
  withdrawn: 'caution',
  unknown: 'caution',
};

export const TRIAL_STATUS_SOURCES = [
  'clinicaltrials-gov',
  'sponsor-press-release',
] as const;
export type TrialStatusSource = (typeof TRIAL_STATUS_SOURCES)[number];

export const TRIAL_STATUS_SOURCE_LABELS: Record<TrialStatusSource, string> = {
  'clinicaltrials-gov': 'ClinicalTrials.gov',
  'sponsor-press-release': 'Sponsor announcement',
};

export const CITATION_SOURCE_TYPES = [
  'peer-reviewed',
  'review',
  'trial-registry',
  'drug-label',
  'reference',
  'org',
  'preprint',
] as const;
export type CitationSourceType = (typeof CITATION_SOURCE_TYPES)[number];

export const CITATION_SOURCE_TYPE_LABELS: Record<CitationSourceType, string> = {
  'peer-reviewed': 'Peer-reviewed study',
  review: 'Review article',
  'trial-registry': 'Trial registry',
  'drug-label': 'Drug label',
  reference: 'Reference work',
  org: 'Organization',
  preprint: 'Preprint',
};

/**
 * Citation types that satisfy the inclusion bar. An entry supported only by an
 * `org` page or a `preprint` does not clear it.
 */
export const QUALIFYING_CITATION_TYPES = [
  'peer-reviewed',
  'review',
  'drug-label',
  'reference',
] as const satisfies readonly CitationSourceType[];

export const RATING_AXES = [
  'fodmap',
  'histamine',
  'oxalate',
  'salicylate',
  'amine',
  'tyramine',
  'lectin',
] as const;
export type RatingAxis = (typeof RATING_AXES)[number];

export const RATING_AXIS_INFO: Record<
  RatingAxis,
  { label: string; definition: string }
> = {
  fodmap: {
    label: 'FODMAP',
    definition:
      'Fermentable oligosaccharides, disaccharides, monosaccharides and polyols.',
  },
  histamine: {
    label: 'Histamine',
    definition:
      'Preformed histamine content, plus histamine generated by fermentation or ageing.',
  },
  oxalate: { label: 'Oxalate', definition: 'Total oxalate content.' },
  salicylate: {
    label: 'Salicylate',
    definition: 'Naturally occurring salicylate content.',
  },
  amine: {
    label: 'Other amines',
    definition: 'Biogenic amines other than histamine and tyramine.',
  },
  tyramine: { label: 'Tyramine', definition: 'Tyramine content.' },
  lectin: { label: 'Lectin', definition: 'Lectin content.' },
};

export const RATINGS = ['low', 'moderate', 'high', 'variable'] as const;
export type Rating = (typeof RATINGS)[number];

export const RATING_LABELS: Record<Rating, string> = {
  low: 'Low',
  moderate: 'Moderate',
  high: 'High',
  variable: 'Variable',
};

/**
 * Whether a source's per-food values may be reproduced on this site.
 *
 * `link-only` sources are cited and linked but never have their ratings
 * restated here. Bucketing a proprietary database into low/moderate/high
 * reduces its precision, not its provenance — the result is still derived from
 * that database. The schema enforces the distinction so it cannot be forgotten
 * during a content pass.
 */
export const REDISTRIBUTION = ['open', 'link-only'] as const;
export type Redistribution = (typeof REDISTRIBUTION)[number];

/** Days after which an entry is nudged, and then flagged, for re-verification. */
export const AGING_AFTER_DAYS = 120;
export const STALE_AFTER_DAYS = 180;

/** A trial status older than this is not trustworthy enough to publish. */
export const TRIAL_STATUS_MAX_AGE_DAYS = 180;
