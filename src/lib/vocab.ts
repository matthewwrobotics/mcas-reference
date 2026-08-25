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
  'mast-cell-mediated-condition',
  'laboratory',
  'related-condition',
  'downstream',
] as const;
export type MastCellBasis = (typeof MAST_CELL_BASIS)[number];

export const MAST_CELL_BASIS_INFO: Record<
  MastCellBasis,
  { label: string; heading: string; definition: string }
> = {
  'mcas-patients': {
    label: 'MCAS patients',
    heading: 'Studied in MCAS patients',
    definition:
      'Studied in people diagnosed with mast cell activation syndrome. Current evidence consists of case reports, uncontrolled series, or retrospective review rather than randomised comparisons — so it establishes that people have taken it, not that it worked.',
  },
  'mast-cell-disease': {
    label: 'Mast cell disease',
    heading: 'Studied in another mast cell disease',
    definition:
      'Studied in patients with a different mast cell disease, usually systemic mastocytosis. Those disorders have diagnostic criteria and disease biology that differ from MCAS, so a result there does not establish an MCAS outcome.',
  },
  'mast-cell-mediated-condition': {
    label: 'Mast-cell-mediated condition',
    heading: 'Studied in another mast-cell-mediated condition',
    definition:
      'Given to people with a condition in which mast cells are central to the disease process, with a human mast-cell effect also measured. This is human evidence, but it is not evidence in MCAS or in a clonal mast cell disorder, and it cannot establish an MCAS outcome.',
  },
  laboratory: {
    label: 'Mast cells in the laboratory',
    heading: 'Studied on mast cells in the laboratory',
    definition:
      'Studied on mast cells directly, but in cell culture or animals rather than in people. The study-design badge distinguishes human cells from non-human models. A mechanism demonstrated in a dish is a reason to investigate, not a result — and the concentrations used are frequently ones that human exposure does not reach.',
  },
  'related-condition': {
    label: 'Related inflammatory condition',
    heading: 'Studied in a related inflammatory condition',
    definition:
      'Studied in people with a condition in which mast cells can contribute, but the study did not measure an effect on mast cells. This is a clinical bridge for inclusion, not direct mast-cell evidence and not an MCAS outcome.',
  },
  downstream: {
    label: 'Downstream of the mast cell',
    heading: 'Acts downstream of the mast cell',
    definition:
      'Not studied in mast cells, and not acting on them. These block or degrade a mediator after release — histamine at its receptor, leukotrienes at theirs. That is a coherent thing to do and needs no mast cell data to justify it, but it is a different kind of intervention from the ones above.',
  },
};

/**
 * What kind of study supports the entry — the design, wherever it was run.
 *
 * This is one of two independent axes and does not stand alone. `studyDesigns`
 * says *what design*; `mastCellBasis` says *how close to mast cells* it came.
 * Cetirizine carries `randomised-controlled` because randomised trials of it
 * exist; they were in chronic urticaria, which is what its `downstream` basis
 * records. Both facts are true and the entry shows them side by side.
 *
 * Recorded per entry rather than inferred from the population, because it
 * previously *was* inferred: every laboratory entry claimed "cell lines and
 * animal models" regardless of what happened, which was wrong for a
 * cell-line-only entry and wrong for an animal-only one in opposite directions.
 */
export const STUDY_DESIGNS = [
  'randomised-controlled',
  'cohort',
  'cross-sectional',
  'case-series',
  'case-report',
  'in-vitro',
  'non-human-in-vitro',
  'animal',
] as const;
export type StudyDesign = (typeof STUDY_DESIGNS)[number];

export const STUDY_DESIGN_INFO: Record<StudyDesign, { label: string; definition: string }> = {
  'randomised-controlled': {
    label: 'randomised controlled trial',
    definition: 'Participants allocated at random to treatment or comparison, with published results.',
  },
  cohort: {
    label: 'cohort study',
    definition: 'A defined group followed over time, without randomisation.',
  },
  'cross-sectional': {
    label: 'cross-sectional survey',
    definition: 'A group assessed at one point in time. Treatment histories and ratings are retrospective and can be affected by recall and selection.',
  },
  'case-series': {
    label: 'case series',
    definition: 'A set of individual patients described together, with no comparison group.',
  },
  'case-report': {
    label: 'case report',
    definition: 'One patient, or a very small number, described individually.',
  },
  'in-vitro': {
    label: 'human mast cells in vitro',
    definition: 'A human mast-cell line or mast cells isolated from human tissue and studied outside the body.',
  },
  'non-human-in-vitro': {
    label: 'non-human mast cells in vitro',
    definition: 'Mast cells taken from a non-human animal and studied outside the body.',
  },
  animal: {
    label: 'animal model',
    definition: 'Live animals rather than people or isolated human cells.',
  },
};

/**
 * A traceable signal that an MCAS clinician-researcher has used or discussed a
 * treatment in practice. This is deliberately separate from study design: a
 * treating author can publish a case series, but authorship and clinical use do
 * not turn that series into a controlled trial.
 */
export const SPECIALIST_USE_BASES = [
  'treating-author-report',
  'authored-clinical-guidance',
  'recorded-first-party-discussion',
] as const;
export type SpecialistUseBasis = (typeof SPECIALIST_USE_BASES)[number];

/**
 * A patient-facing placement note for treatments that sit outside the
 * published stepwise sequence. This is neither a study grade nor a regulatory
 * status; it prevents a case-level refractory report from looking like a
 * routine next step merely because it appears in the same index.
 */
export const TREATMENT_CONTEXTS = [
  'emergency-intervention',
  'trigger-specific',
  'emerging-refractory',
  'local-route',
] as const;
export type TreatmentContext = (typeof TREATMENT_CONTEXTS)[number];

export const TREATMENT_CONTEXT_INFO: Record<
  TreatmentContext,
  {
    label: string;
    definition: string;
    groupTitle: string;
    groupDetail: string;
    indexPosition: 'before-steps' | 'after-steps';
  }
> = {
  'emergency-intervention': {
    label: 'Emergency intervention',
    definition:
      'Used for a time-critical acute event, particularly one meeting anaphylaxis criteria. It appears before the maintenance sequence because emergency treatment and prevention answer different questions; this placement is not an instruction to diagnose an event or use a device.',
    groupTitle: 'Emergency intervention',
    groupDetail: 'time-critical acute treatment, not a maintenance step',
    indexPosition: 'before-steps',
  },
  'trigger-specific': {
    label: 'Trigger-specific treatment',
    definition:
      'Directed at a defined sensitization or trigger, such as venom allergy. It may change risk from that trigger but is not a general treatment for every MCAS episode.',
    groupTitle: 'Trigger-specific treatment',
    groupDetail: 'directed at a defined sensitization or trigger',
    indexPosition: 'after-steps',
  },
  'emerging-refractory': {
    label: 'Emerging / refractory evidence',
    definition:
      'Included because a published report or survey documents use in people with MCAS, usually after extensive prior treatment. The evidence is uncontrolled, and this placement is not a recommendation or a routine treatment step.',
    groupTitle: 'Emerging / refractory evidence',
    groupDetail: 'direct reports or surveys outside the routine stepwise sequence',
    indexPosition: 'after-steps',
  },
  'local-route': {
    label: 'Local-route symptom treatment',
    definition:
      'The studied product is delivered to a particular site, such as the eye, nose, or airway. Its route-specific evidence does not establish systemic MCAS treatment or equivalence to an oral or injected formulation.',
    groupTitle: 'Local-route symptom treatments',
    groupDetail: 'route-specific products, not systemic MCAS interventions',
    indexPosition: 'after-steps',
  },
};

export const SPECIALIST_USE_BASIS_INFO: Record<
  SpecialistUseBasis,
  { label: string; definition: string }
> = {
  'treating-author-report': {
    label: 'Treating-author report',
    definition:
      'A named clinician is an author and the source identifies that clinician as having treated or managed the reported patient or cohort.',
  },
  'authored-clinical-guidance': {
    label: 'Authored clinical guidance',
    definition:
      'A named clinician describes the treatment in authored clinical guidance or a practice-focused publication rather than an outcome comparison.',
  },
  'recorded-first-party-discussion': {
    label: 'Recorded first-party discussion',
    definition:
      'A durable recording or transcript captures the named clinician discussing their own practice; a second-hand recap does not qualify.',
  },
};

/**
 * The at-a-glance grade, derived rather than authored so it cannot drift from
 * the underlying data.
 *
 * It grades the strongest design carried out *in mast cells* — not the strongest
 * evidence anywhere, which would rank famotidine top for heartburn and aspirin
 * top for minor aches. Ordering puts everything human above everything that is
 * not, and places human mast cells in culture above an animal model because the
 * cells are both human and the cell type in question.
 *
 * An earlier grade was removed for having no variance. This one was checked
 * against the data before being adopted, and `tests/derive.test.ts` asserts it
 * stays spread.
 */
export const RELEVANCE_GRADES = [
  'randomised',
  'human-observational',
  'in-vitro',
  'animal',
  'none',
] as const;
export type RelevanceGrade = (typeof RELEVANCE_GRADES)[number];

export const RELEVANCE_GRADE_INFO: Record<
  RelevanceGrade,
  { label: string; short: string; definition: string }
> = {
  randomised: {
    label: 'Randomised trial in a mast-cell condition',
    short: 'Randomised',
    definition: 'A randomised controlled trial with published results in MCAS, another mast cell disease, or another condition with a measured human mast-cell basis.',
  },
  'human-observational': {
    label: 'Observed in patients',
    short: 'Observational',
    definition: 'Studied in people with MCAS, another mast cell disease, or another condition with a measured human mast-cell basis, but without randomisation or a control group.',
  },
  'in-vitro': {
    label: 'Human mast cells in culture',
    short: 'In vitro',
    definition: 'Tested on human mast cells in the laboratory. A mechanism in a dish, not a result in a person.',
  },
  animal: {
    label: 'Non-human mast-cell evidence',
    short: 'Non-human',
    definition: 'Tested in live animals or on non-human mast cells outside the body. It does not establish a human mast-cell effect.',
  },
  none: {
    label: 'No mast cell evidence',
    short: 'None',
    definition: 'Nothing has been measured in mast cells. The entry rests on a related-condition study or a published mechanism acting downstream of the cell.',
  },
};

export const RELEVANCE_GRADE_RANK: Record<RelevanceGrade, number> = {
  randomised: 0,
  'human-observational': 1,
  'in-vitro': 2,
  animal: 3,
  none: 4,
};

export const TRIAL_PHASES = ['1', '1/2', '2', '2/3', '3', '4', 'not-applicable'] as const;
export type TrialPhase = (typeof TRIAL_PHASES)[number];

/**
 * The sequence described in a 2025 open-access practical-management review
 * (PMC12639879). Reported, not recommended — and partly Canada-specific, which
 * individual entries note where it matters.
 */
export const TREATMENT_STEPS = [1, 2, 3, 4, 5, 6, 7, 8] as const;
export type TreatmentStep = (typeof TREATMENT_STEPS)[number];

export const TREATMENT_STEP_INFO: Record<TreatmentStep, { label: string; described: string }> = {
  1: { label: 'H1 antihistamines', described: 'described as the initial treatment, with second-generation agents prioritised over first' },
  2: { label: 'H2 antihistamines', described: 'described as add-on therapy where episodes involve gastrointestinal symptoms' },
  3: { label: 'Leukotriene receptor antagonists', described: 'the next class described; in Canada montelukast is the only available option' },
  4: { label: 'Cromolyn', described: 'described for persistent gastrointestinal symptoms despite H1 and H2 blockade' },
  5: { label: 'Ketotifen', described: 'described for patients not controlled on high-dose second-generation H1 antihistamines' },
  6: { label: 'Aspirin', described: 'described as limited evidence, for persistent episodes despite H1 blockade' },
  7: { label: 'Oral corticosteroids', described: 'described for frequent episodes, with use limited by adverse effects' },
  8: { label: 'Omalizumab', described: 'described for severe recurrent reactions despite the preceding treatments' },
};

/** Index sort order: most directly studied in mast cells first. */
export const MAST_CELL_BASIS_RANK: Record<MastCellBasis, number> = {
  'mcas-patients': 0,
  'mast-cell-disease': 1,
  'mast-cell-mediated-condition': 2,
  laboratory: 3,
  'related-condition': 4,
  downstream: 5,
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

/**
 * Preparation, kept as its own field rather than folded into the name.
 *
 * A 2023 review compiling oxalate across bean type and preparation reports
 * values from 13.9 to 547.9 mg per 100 g. A single "Beans" entry makes that
 * range disappear. Where a source measured a specific form, the entry says so
 * here — and `aliases` is policed by the content lint so preparations cannot
 * be smuggled in as synonyms instead.
 */
export const FOOD_FORMS = [
  'raw',
  'boiled',
  'cooked',
  'canned',
  'dried',
  'aged',
  'fermented',
  'juice',
  'powder',
  'unspecified',
] as const;
export type FoodForm = (typeof FOOD_FORMS)[number];

export const RATINGS = ['low', 'moderate', 'high', 'variable'] as const;
export type Rating = (typeof RATINGS)[number];

export const RATING_LABELS: Record<Rating, string> = {
  low: 'Low',
  moderate: 'Moderate',
  high: 'High',
  variable: 'Variable',
};

/**
 * A source-level signal that a food is described as a possible trigger for a
 * reason other than its measured histamine content.
 *
 * This is deliberately not another low/moderate/high rating axis. The current
 * literature does not establish a reproducible clinical "histamine liberator"
 * effect, so the UI reports the claim without turning it into a food property.
 */
export const FOOD_TRIGGER_SIGNALS = ['reported-histamine-release'] as const;
export type FoodTriggerSignal = (typeof FOOD_TRIGGER_SIGNALS)[number];

export const FOOD_TRIGGER_SIGNAL_INFO: Record<
  FoodTriggerSignal,
  { label: string; detailLabel: string; definition: string }
> = {
  'reported-histamine-release': {
    label: 'Reported',
    detailLabel: 'Proposed histamine release',
    definition:
      'A reviewed source names the food as a possible endogenous-histamine trigger, while also stating that the mechanism and controlled human evidence are unresolved.',
  },
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
