/**
 * Controlled vocabularies for the whole site.
 *
 * Every enum lives here exactly once. `content.config.ts` turns these arrays
 * into Zod enums (so bad data fails the build), the badge components turn them
 * into labels, and /methodology turns them into published definitions. If a
 * tier's meaning changes, it changes in one place and the site stays honest.
 */

/**
 * How directly a treatment has been studied in mast cells.
 *
 * This replaced a "direct MCAS evidence" grade that could not do its job:
 * nothing is approved for MCAS and almost nothing has been tested in it, so ten
 * of twelve entries scored the same value and the badge distinguished nothing.
 *
 * This axis does vary, and it carries a distinction the site made nowhere else:
 * some of these act *on* the mast cell, and some only block what the mast cell
 * releases. An antihistamine is not a weaker mast cell drug — it is not a mast
 * cell drug at all, and a reader deciding what to ask about deserves to know
 * which kind they are looking at.
 */
export const MAST_CELL_BASIS = [
  'mcas-patients',
  'mast-cell-disease',
  'laboratory',
  'downstream',
] as const;
export type MastCellBasis = (typeof MAST_CELL_BASIS)[number];

export const MAST_CELL_BASIS_INFO: Record<
  MastCellBasis,
  { label: string; heading: string; gloss: string; definition: string }
> = {
  'mcas-patients': {
    label: 'MCAS patients',
    heading: 'Studied in MCAS patients',
    gloss: 'uncontrolled case series',
    definition:
      'Studied in people diagnosed with mast cell activation syndrome. In every current case that means open-label series or retrospective review, never a randomised comparison — so it establishes that people have taken it, not that it worked.',
  },
  'mast-cell-disease': {
    label: 'Mast cell disease',
    heading: 'Studied in another mast cell disease',
    gloss: 'trials in mastocytosis',
    definition:
      'Studied in patients with a different mast cell disease, usually systemic mastocytosis. This is the closest anything here comes to trial evidence, and it still is not MCAS: mastocytosis is a clonal disease defined by a mutation MCAS patients are not established to have.',
  },
  laboratory: {
    label: 'Mast cells in the laboratory',
    heading: 'Studied on mast cells in the laboratory',
    gloss: 'cell lines and animal models',
    definition:
      'Studied on mast cells directly, but in cell culture or animals rather than in people. A mechanism demonstrated in a dish is a reason to investigate, not a result — and the concentrations used are frequently ones that ingestion does not reach.',
  },
  downstream: {
    label: 'Downstream of the mast cell',
    heading: 'Acts downstream of the mast cell',
    gloss: 'blocks the mediator, not the cell',
    definition:
      'Not studied in mast cells, and not acting on them. These block or degrade a mediator after release — histamine at its receptor, leukotrienes at theirs. That is a coherent thing to do and needs no mast cell data to justify it, but it is a different kind of intervention from the ones above.',
  },
};

/** Index sort order: most directly studied in mast cells first. */
export const MAST_CELL_BASIS_RANK: Record<MastCellBasis, number> = {
  'mcas-patients': 0,
  'mast-cell-disease': 1,
  laboratory: 2,
  downstream: 3,
};

/**
 * Why a condition is listed against an entry.
 *
 * Deliberately never "effective for". An approval and a body of trials are both
 * verifiable facts; "effective" is a conclusion, and drawing it is not this
 * site's job.
 */
export const ESTABLISHED_BASIS = [
  'approved-us',
  'approved-non-us',
  'randomised-trials',
] as const;
export type EstablishedBasis = (typeof ESTABLISHED_BASIS)[number];

export const ESTABLISHED_BASIS_INFO: Record<
  EstablishedBasis,
  { label: string; definition: string }
> = {
  'approved-us': {
    label: 'Approved in the US for',
    definition: 'Carries this indication on its current FDA label.',
  },
  'approved-non-us': {
    label: 'Approved outside the US for',
    definition: 'Approved by at least one non-US regulator for this indication.',
  },
  'randomised-trials': {
    label: 'Randomised trials in',
    definition:
      'Has published, evaluable randomised trial results in this condition. It says trials exist and reported, not that the drug worked.',
  },
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
