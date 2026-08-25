/**
 * Controlled vocabularies for the whole site.
 *
 * Every enum lives here exactly once. `content.config.ts` turns these arrays
 * into Zod enums (so bad data fails the build), components turn them into
 * labels, and /methodology turns them into published definitions. If a term's
 * meaning changes, it changes in one place and the site stays honest.
 */

/**
 * How a treatment relates to mast cells.
 *
 * Most values describe where the cited work was done; `downstream` instead
 * describes where the intervention acts. Presenting those facts as a single
 * strength grade made emergency and routine downstream treatments look as if
 * they had "no evidence". The UI therefore states the relationship literally
 * and keeps study design in its own field.
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

/*
 * Labels are written as literal statements, not category names.
 *
 * The category names — "Downstream of the mast cell", "Related inflammatory
 * condition" — were accurate and meant nothing to a reader meeting the term for
 * the first time. Saying what was actually done ("Acts after mast-cell mediators
 * are released") costs a few words and removes the need to already know the
 * vocabulary. They are read most often by someone deciding whether an entry is
 * relevant to them, not by someone auditing the taxonomy.
 */
export const MAST_CELL_BASIS_INFO: Record<
  MastCellBasis,
  { label: string; definition: string }
> = {
  'mcas-patients': {
    label: 'Studied in people with MCAS',
    definition:
      'Studied in people diagnosed with mast cell activation syndrome. Current evidence consists of case reports, uncontrolled series, or retrospective review rather than randomised comparisons — so it establishes that people have taken it, not that it worked.',
  },
  'mast-cell-disease': {
    label: 'Studied in another mast-cell disease',
    definition:
      'Studied in patients with a different mast cell disease, usually systemic mastocytosis. Those disorders have diagnostic criteria and disease biology that differ from MCAS, so a result there does not establish an MCAS outcome.',
  },
  'mast-cell-mediated-condition': {
    label: 'Studied in another mast-cell-mediated condition',
    definition:
      'Given to people with a condition in which mast cells are central to the disease process, with a human mast-cell effect also measured. This is human evidence, but it is not evidence in MCAS or in a clonal mast cell disorder, and it cannot establish an MCAS outcome.',
  },
  laboratory: {
    label: 'Studied directly on mast cells in a laboratory',
    definition:
      'Studied on mast cells directly, but in cell culture or animals rather than in people. The study-design field distinguishes human cells from non-human models. A mechanism demonstrated in a dish is a reason to investigate, not a result — and the concentrations used are frequently ones that human exposure does not reach.',
  },
  'related-condition': {
    label: 'Studied in a related condition, with no mast-cell effect measured',
    definition:
      'Studied in people with a condition in which mast cells can contribute, but the study did not measure an effect on mast cells. This is a clinical bridge for inclusion, not a direct observation of mast cells and not an MCAS outcome.',
  },
  downstream: {
    label: 'Acts after mast-cell mediators are released',
    definition:
      'Acts after mast-cell mediators are released rather than stabilising the mast cell itself. This includes treatments that block mediator receptors, degrade a mediator, or oppose the physiology of an acute reaction. It describes where the intervention acts, not its clinical importance.',
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
    label: 'Randomised controlled trial',
    definition: 'Participants allocated at random to treatment or comparison, with published results.',
  },
  cohort: {
    label: 'Cohort study',
    definition: 'A defined group followed over time, without randomisation.',
  },
  'cross-sectional': {
    label: 'Cross-sectional survey',
    definition: 'A group assessed at one point in time. Treatment histories and ratings are retrospective and can be affected by recall and selection.',
  },
  'case-series': {
    label: 'Case series',
    definition: 'A set of individual patients described together, with no comparison group.',
  },
  'case-report': {
    label: 'Case report',
    definition: 'One patient, or a very small number, described individually.',
  },
  'in-vitro': {
    label: 'Human mast cells in vitro',
    definition: 'A human mast-cell line or mast cells isolated from human tissue and studied outside the body.',
  },
  'non-human-in-vitro': {
    label: 'Non-human mast cells in vitro',
    definition: 'Mast cells taken from a non-human animal and studied outside the body.',
  },
  animal: {
    label: 'Animal model',
    definition: 'Live animals rather than people or isolated human cells.',
  },
};

/** Glossary anchors for study designs that have a matching patient definition. */
export const STUDY_DESIGN_GLOSSARY_IDS: Partial<Record<StudyDesign, string>> = {
  'randomised-controlled': 'randomised-controlled-trial',
  cohort: 'observational',
  'cross-sectional': 'observational',
  'case-series': 'case-report',
  'case-report': 'case-report',
  'in-vitro': 'in-vitro',
  'non-human-in-vitro': 'in-vitro',
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
 * published stepwise sequence. This is neither a study result nor a regulatory
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

/**
 * Plain-language definitions of the vocabulary this site uses constantly and
 * never explained.
 *
 * An audit counted 250+ uses of `tryptase`, `mediator`, `clonal`, `refractory`,
 * `in vitro` and `degranulation` across the site with no definition anywhere —
 * a reference written as though its reader already knew the words. These are
 * written for someone who has just heard the term for the first time.
 *
 * Kept here rather than in the page so that entry pages and index labels can
 * link to the same definitions, and so a term cannot be defined twice and drift.
 */
export interface GlossaryTerm {
  /** Anchor id. Stable — entry pages link to these. */
  id: string;
  term: string;
  /** Other spellings a reader may arrive with. */
  also?: readonly string[];
  definition: string;
  group: 'condition' | 'biology' | 'evidence' | 'regulation';
}

export const GLOSSARY_GROUPS = {
  condition: {
    title: 'The condition',
    blurb: 'Words that describe the diagnosis itself and its relatives.',
  },
  biology: {
    title: 'The biology',
    blurb: 'What mast cells do, and the substances a test looks for.',
  },
  evidence: {
    title: 'Kinds of evidence',
    blurb:
      'Every entry on this site records what kind of study its evidence came from. These definitions explain what each design can and cannot establish.',
  },
  regulation: {
    title: 'Approval and prescribing',
    blurb: 'What a regulator has and has not said about a drug.',
  },
} as const;

export const GLOSSARY: readonly GlossaryTerm[] = [
  {
    id: 'mast-cell',
    term: 'Mast cell',
    group: 'biology',
    definition:
      'A type of immune cell that sits in tissues meeting the outside world — skin, gut lining, airways, and around blood vessels. It stores packets of active chemicals and releases them when triggered. That release is useful against parasites and central to allergy.',
  },
  {
    id: 'mediator',
    term: 'Mediator',
    group: 'biology',
    definition:
      'One of the chemicals a mast cell releases — histamine, tryptase, prostaglandins and leukotrienes among them. "Mediator" is the collective word for them. Symptoms in mast cell disease are attributed to these substances reaching tissues, not to the cells travelling anywhere.',
  },
  {
    id: 'degranulation',
    term: 'Degranulation',
    group: 'biology',
    definition:
      'The moment a mast cell empties its stored granules and releases mediators all at once. It is the fast part of a reaction; other mediators are made fresh over the following hours, which is one reason an episode can have two phases.',
  },
  {
    id: 'histamine',
    term: 'Histamine',
    group: 'biology',
    definition:
      'The best known mast cell mediator. It acts on several different receptors, which is why medicines are grouped by which receptor they block — H1 and H2 are the two that appear most on this site.',
  },
  {
    id: 'tryptase',
    term: 'Tryptase',
    group: 'biology',
    definition:
      'An enzyme found almost only in mast cells, which makes it the most useful thing to measure in blood. Levels sit at a personal baseline and rise during an episode. Because the rise fades within hours, when the sample is drawn matters as much as the number.',
    also: ['serum tryptase', 'baseline tryptase'],
  },
  {
    id: 'fceri',
    term: 'FcεRI',
    group: 'biology',
    definition:
      'The receptor on a mast cell that IgE antibodies attach to. When an allergen bridges two of these, the cell degranulates. Several medicines act by reducing how much IgE can reach this receptor.',
    also: ['high-affinity IgE receptor'],
  },
  {
    id: 'mcas',
    term: 'Mast cell activation syndrome (MCAS)',
    group: 'condition',
    definition:
      'Repeated episodes in which mast cells release mediators too readily, affecting more than one organ system at once. Diagnosis rests on three criteria — the pattern of episodes, a measured rise in a mediator, and a response to treatment aimed at mast cells. Two competing versions of those criteria are in active use and admit different patients.',
  },
  {
    id: 'mastocytosis',
    term: 'Mastocytosis',
    group: 'condition',
    definition:
      'A separate, rarer condition in which there are too many mast cells, usually driven by an acquired KIT mutation. It is diagnosed on biopsy findings rather than on episodes alone. Much of the evidence on this site was gathered in mastocytosis rather than in MCAS, which is why each entry records where its evidence came from.',
  },
  {
    id: 'clonal',
    term: 'Clonal',
    group: 'condition',
    definition:
      'Describing cells that are all descended from a single abnormal cell, usually carrying the same mutation. Clonal mast cell disease is a different thing from mast cell activation without such a mutation, and the distinction changes which investigations follow.',
  },
  {
    id: 'anaphylaxis',
    term: 'Anaphylaxis',
    group: 'condition',
    definition:
      'A severe, usually rapid systemic allergic reaction. It may affect breathing, circulation, skin or the gut and can be life-threatening. It is a medical emergency requiring immediate care, whatever the underlying diagnosis turns out to be.',
  },
  {
    id: 'refractory',
    term: 'Refractory',
    group: 'condition',
    definition:
      'Describing episodes that continue despite the treatments usually tried first. On this site the word marks entries considered only after earlier options, not entries considered stronger.',
  },
  {
    id: 'in-vitro',
    term: 'In vitro',
    group: 'evidence',
    definition:
      'Latin for "in glass": an experiment done on cells in a dish rather than in a living body. It can show that a substance acts on a mast cell, but nothing about what happens in a person who swallows it — dose, absorption and everything else in the body are absent.',
    also: ['laboratory study', 'cell culture'],
  },
  {
    id: 'case-report',
    term: 'Case report',
    group: 'evidence',
    definition:
      'A published description of what happened to one patient, or a handful. Useful for noticing something unexpected, but with nobody to compare against, improvement cannot be separated from chance or from the condition settling on its own.',
    also: ['case series'],
  },
  {
    id: 'observational',
    term: 'Observational study',
    group: 'evidence',
    definition:
      'A study that watches what happens without deciding who receives what. Patients already taking a drug tend to differ from those who are not, so an apparent difference may reflect who chose it rather than the drug itself.',
    also: ['cohort study', 'cross-sectional study'],
  },
  {
    id: 'randomised-controlled-trial',
    term: 'Randomised controlled trial',
    group: 'evidence',
    definition:
      'A study in which chance decides who receives the treatment and who receives a comparison, so the two groups start alike. It is the strongest ordinary design, because a difference afterwards is harder to explain away.',
    also: ['RCT', 'randomised trial'],
  },
  {
    id: 'confounding',
    term: 'Confounding',
    group: 'evidence',
    definition:
      'When something else, shared by the people who received a treatment, explains the result instead. It is the reason an observational finding carries less weight than a randomised one.',
  },
  {
    id: 'consensus-criteria',
    term: 'Consensus criteria',
    group: 'evidence',
    definition:
      'A definition of a condition agreed by a panel of specialists rather than settled by a single experiment. Two such definitions for MCAS are in use and disagree about who qualifies. This site describes both and does not pick between them.',
  },
  {
    id: 'off-label',
    term: 'Off-label',
    group: 'regulation',
    definition:
      'Prescribing an approved drug for a condition it was not approved for. It is legal and common, and it is the situation for essentially everything on this site, because no drug is approved for MCAS itself.',
  },
  {
    id: 'approved',
    term: 'Approved',
    group: 'regulation',
    definition:
      'A regulator has reviewed evidence for a drug in a named condition and permitted it to be sold for that use. Approval says nothing about any other condition. On this site approval is always paired with the named conditions it applies to.',
    also: ['indication'],
  },
  {
    id: 'dietary-supplement',
    term: 'Dietary supplement',
    group: 'regulation',
    definition:
      'A product sold under food rules rather than drug rules. It is not assessed for effectiveness before sale, and the amount in a capsule need not match a studied preparation, so evidence gathered on one product may not transfer to another.',
  },
];
