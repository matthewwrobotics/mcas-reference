import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

import {
  CITATION_SOURCE_TYPES,
  ESTABLISHED_BASIS,
  MAST_CELL_BASIS,
  SPECIALIST_USE_BASES,
  STUDY_DESIGNS,
  TREATMENT_CONTEXTS,
  TRIAL_PHASES,
  QUALIFYING_CITATION_TYPES,
  FOOD_FORMS,
  FOOD_TRIGGER_SIGNALS,
  RATING_AXES,
  RATINGS,
  REDISTRIBUTION,
  REGULATORY_STATUSES,
  TRIAL_STATUS_MAX_AGE_DAYS,
  TRIAL_STATUS_SOURCES,
  TRIAL_STATUSES,
} from './lib/vocab';
import sourceRegistry from './content/sources.json' with { type: 'json' };

const DAY_MS = 86_400_000;

/** Source ids available to food ratings, with their redistribution terms. */
const REDISTRIBUTION_BY_SOURCE = new Map(
  sourceRegistry.map((s) => [s.id, s.redistribution]),
);

const citation = z.object({
  title: z.string().min(1),
  url: z.url(),
  sourceType: z.enum(CITATION_SOURCE_TYPES),
  year: z.number().int().min(1950).max(2100).optional(),
  pmid: z.string().regex(/^\d{1,8}$/).optional(),
  nctId: z.string().regex(/^NCT\d{8}$/).optional(),
  /** When a human last opened this URL and confirmed it says what we claim. */
  accessed: z.coerce.date(),
});

const trial = z.object({
  nctId: z.string().regex(/^NCT\d{8}$/),
  phase: z.enum(TRIAL_PHASES),
  status: z.enum(TRIAL_STATUSES),
  /** Registry or sponsor only — see TRIAL_STATUS_SOURCES. */
  statusSource: z.enum(TRIAL_STATUS_SOURCES),
  /** What the trial studied, which is often not MCAS. */
  condition: z.string().min(1).max(120),
  /**
   * Participants, and whether that is the number reached or merely planned.
   * The distinction is the point: a trial carrying an estimate and a status of
   * "unknown" never reported what actually happened.
   */
  enrolment: z.object({
    count: z.number().int().min(0),
    basis: z.enum(['actual', 'estimated']),
  }),
  verified: z.coerce.date(),
});

/**
 * A condition this treatment is actually approved or trialled for, and which
 * of those two it is. Never "effective for" — see ESTABLISHED_BASIS.
 */
const established = z.object({
  condition: z.string().min(1).max(120),
  basis: z.enum(ESTABLISHED_BASIS),
});

const specialistUse = z.object({
  basis: z.enum(SPECIALIST_USE_BASES),
  /**
   * Where the reported use came from and at what scale — not who reported it.
   *
   * This field named individual clinicians until 2026-08-25. The attributions
   * were accurate, but naming them contradicted a position this site publishes:
   * /methodology states it does not adjudicate between the consensus-1 and
   * consensus-2 criteria, and the clinicians named are the authors and
   * advocates of one of them. Citing that camp's leaders as the practice
   * authority quietly picked the side the site says it does not pick.
   *
   * Provenance is also the more useful fact. "47 patients across six specialist
   * practices" tells a reader something the names do not, and the authors stay
   * one click away in the citation `sourceUrl` is required to match.
   */
  provenance: z.string().min(10).max(200),
  /** Must match a citation URL on this entry so the tag is source-auditable. */
  sourceUrl: z.url(),
});

/**
 * Fields shared by medications and supplements. The two collections are
 * separate so they can be browsed separately, but they answer to the same bar.
 */
const treatmentBase = z.object({
  name: z.string().min(1),
  aliases: z.array(z.string()).default([]),
  /** One line, shown on index pages. Describes the class, not the benefit. */
  summary: z.string().min(1).max(200),
  mechanismClass: z.string().min(1),
  /** How directly this has been studied in mast cells. */
  mastCellBasis: z.enum(MAST_CELL_BASIS),
  /** What kinds of study were actually done. Drives the derived grade. */
  studyDesigns: z.array(z.enum(STUDY_DESIGNS)).min(1),
  /** Position in the sequence described by PMC12639879, where it appears. */
  treatmentStep: z
    .union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8)])
    .optional(),
  /**
   * Order within a treatment step, lowest first.
   *
   * Sorting a step purely by evidence strength put sedating first-generation
   * antihistamines above second-generation ones, in a step whose own source
   * describes the opposite preference — so the list implied a clinical ranking
   * that reversed the literature it came from.
   *
   * This carries the same provenance as the step itself: it records the order
   * described by the review behind `treatmentStep`, not an editorial judgement
   * about what is better. Where the review states no order within a step, leave
   * it unset and the evidence sort still decides. Each card keeps its evidence
   * grade, so re-ordering hides nothing.
   */
  stepOrder: z.number().int().min(1).max(99).optional(),
  /** Separate placement for low-certainty use outside that sequence. */
  treatmentContext: z.enum(TREATMENT_CONTEXTS).optional(),
  /** Conditions it is approved or trialled for. Empty is a real answer. */
  establishedFor: z.array(established).default([]),
  /** Documented clinical-practice use, kept separate from study evidence. */
  specialistUse: z.array(specialistUse).default([]),
  /**
   * Other drugs this page stands for.
   *
   * Near-identical class members do not each get an entry — six second-generation
   * antihistamine pages would repeat one evidence base six times. But a reader
   * looking for Xyzal or Allegra has to find something, and before this field
   * existed neither string appeared anywhere on the site. Listing them here keeps
   * one page per evidence base while making the class searchable.
   *
   * Not aliases: fexofenadine is a different drug from cetirizine, not another
   * name for it.
   */
  classMembers: z.array(z.string().min(2).max(80)).default([]),
  /**
   * What this evidence cannot establish, in plain prose. Replaces an earlier
   * ordinal "confound risk: high" score, which several readers took to mean the
   * drug was dangerous rather than that the study design was weak.
   */
  evidenceLimits: z.string().min(1),
  regulatory: z.enum(REGULATORY_STATUSES),
  offLabelRationale: z.string().min(1).optional(),
  trials: z.array(trial).default([]),
  citations: z.array(citation).min(1),
  lastVerified: z.coerce.date(),
  draft: z.boolean().default(false),
});

/**
 * The site's editorial policy, expressed as validation.
 *
 * Everything below is stated publicly on /methodology. Encoding it here means
 * the published policy and the actual contents of the site cannot drift apart:
 * an entry that violates the policy fails `astro build` and never reaches main.
 */
function applyPolicy(
  entry: z.infer<typeof treatmentBase>,
  ctx: z.RefinementCtx,
) {
  // A context placement is explicitly outside the numbered sequence.
  if (entry.treatmentStep && entry.treatmentContext) {
    ctx.addIssue({
      code: 'custom',
      path: ['treatmentContext'],
      message:
        `"${entry.name}" has both a numbered treatmentStep and a separate treatmentContext. ` +
        `It cannot be inside and outside the published sequence at the same time.`,
    });
  }

  // stepOrder positions an entry inside a step, so there must be a step.
  if (entry.stepOrder !== undefined && !entry.treatmentStep) {
    ctx.addIssue({
      code: 'custom',
      path: ['stepOrder'],
      message:
        `"${entry.name}" sets stepOrder but has no treatmentStep. An order within a ` +
        `sequence is meaningless for an entry the sequence does not contain.`,
    });
  }

  // 1. The inclusion bar. A citable published mechanism, never anecdote.
  const qualifying = entry.citations.filter((c) =>
    (QUALIFYING_CITATION_TYPES as readonly string[]).includes(c.sourceType),
  );
  if (qualifying.length === 0) {
    ctx.addIssue({
      code: 'custom',
      path: ['citations'],
      message:
        `"${entry.name}" has no qualifying citation. The inclusion bar requires at ` +
        `least one of: ${QUALIFYING_CITATION_TYPES.join(', ')}. ` +
        `Organization pages and preprints do not clear it on their own.`,
    });
  }

  // A specialist-use tag is a sourced practice signal, not a credential claim
  // written from memory. The cited URL must appear in the entry's source list,
  // and a regulator label or registry record cannot document a clinician's use.
  entry.specialistUse.forEach((signal, i) => {
    const source = entry.citations.find((c) => c.url === signal.sourceUrl);
    if (!source) {
      ctx.addIssue({
        code: 'custom',
        path: ['specialistUse', i, 'sourceUrl'],
        message:
          `"${entry.name}" claims documented specialist use but the source URL is not ` +
          `present in citations. Add and verify the source, or remove the tag.`,
      });
      return;
    }
    if (source.sourceType === 'drug-label' || source.sourceType === 'trial-registry') {
      ctx.addIssue({
        code: 'custom',
        path: ['specialistUse', i, 'sourceUrl'],
        message:
          `"${entry.name}" uses a ${source.sourceType} to support specialist use. ` +
          `Use an authored report, guidance source, or first-party recording.`,
      });
    }
  });

  // 2. Every claimed approval must be backed by a drug label on this page.
  //    Approval lists are exactly the sort of thing written from memory, and a
  //    wrong one is a factual claim about what a regulator decided.
  const approvals = entry.establishedFor.filter((e) => e.basis.startsWith('approved'));
  if (approvals.length > 0 && !entry.citations.some((c) => c.sourceType === 'drug-label')) {
    ctx.addIssue({
      code: 'custom',
      path: ['establishedFor'],
      message:
        `"${entry.name}" lists ${approvals.length} approved indication(s) but cites no ` +
        `drug label. Cite the current label, or drop the approval and say in prose ` +
        `what you could not verify.`,
    });
  }

  // 3. A trials claim needs a published primary report, for the same reason a
  //    randomised badge used to: a registered protocol or a trial terminated
  //    after two participants is a fact about a trial, not a result from one.
  const trialled = entry.establishedFor.filter((e) => e.basis === 'randomised-trials');
  if (trialled.length > 0 && !entry.citations.some((c) => c.sourceType === 'peer-reviewed')) {
    ctx.addIssue({
      code: 'custom',
      path: ['establishedFor'],
      message:
        `"${entry.name}" claims randomised trials in ${trialled.length} condition(s) but ` +
        `cites no peer-reviewed primary report.`,
    });
  }

  // 4. "Approved elsewhere" is its own bucket and owes the reader a reason.
  if (entry.regulatory === 'approved-non-us' && !entry.offLabelRationale) {
    ctx.addIssue({
      code: 'custom',
      path: ['offLabelRationale'],
      message:
        `"${entry.name}" is approved outside the US, so offLabelRationale is ` +
        `required: say which regulator approved it, for what, and why that is ` +
        `relevant here.`,
    });
  }

  // 5. A trial status is only as good as the day it was checked.
  entry.trials.forEach((t, i) => {
    const ageDays = (Date.now() - t.verified.getTime()) / DAY_MS;
    if (ageDays > TRIAL_STATUS_MAX_AGE_DAYS) {
      ctx.addIssue({
        code: 'custom',
        path: ['trials', i, 'verified'],
        message:
          `"${entry.name}" carries a status for ${t.nctId} last verified ` +
          `${Math.round(ageDays)} days ago (limit ${TRIAL_STATUS_MAX_AGE_DAYS}). Re-check ` +
          `it on ClinicalTrials.gov, or remove the record.`,
      });
    }
    if (ageDays < 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['trials', i, 'verified'],
        message: `"${entry.name}" has a verified date in the future for ${t.nctId}.`,
      });
    }
  });

  // 6. Study design and population must agree. An entry studied in patients
  //    cannot be supported only by cell culture, and one whose evidence is a
  //    dish cannot claim patients.
  const humanDesigns = [
    'randomised-controlled',
    'cohort',
    'cross-sectional',
    'case-series',
    'case-report',
  ];
  const inPatients =
    entry.mastCellBasis === 'mcas-patients' ||
    entry.mastCellBasis === 'mast-cell-disease' ||
    entry.mastCellBasis === 'mast-cell-mediated-condition' ||
    entry.mastCellBasis === 'related-condition';
  const hasHuman = entry.studyDesigns.some((d) => humanDesigns.includes(d));
  if (inPatients && !hasHuman) {
    ctx.addIssue({
      code: 'custom',
      path: ['studyDesigns'],
      message:
        `"${entry.name}" is recorded as studied in patients, but every listed study ` +
        `design is preclinical. One of them is wrong.`,
    });
  }
  if (entry.mastCellBasis === 'laboratory' && hasHuman) {
    ctx.addIssue({
      code: 'custom',
      path: ['studyDesigns'],
      message:
        `"${entry.name}" is recorded as laboratory-only but lists a human study ` +
        `design. If people were studied, mastCellBasis should say so.`,
    });
  }
}

const treatmentSchema = treatmentBase.superRefine(applyPolicy);

const medications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/medications' }),
  schema: treatmentSchema,
});

const supplements = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/supplements' }),
  schema: treatmentSchema,
});

const foodRating = z.object({
  axis: z.enum(RATING_AXES),
  /** Must be an id in sources.json. */
  source: z.string().min(1),
  /** Omitted for link-only sources — see the superRefine below. */
  rating: z.enum(RATINGS).optional(),
  note: z.string().optional(),
  url: z.url().optional(),
});

const foodPotentialTrigger = z.object({
  signal: z.enum(FOOD_TRIGGER_SIGNALS),
  /** Must be an open, registered source whose full text supports the signal. */
  source: z.string().min(1),
  note: z.string().min(1),
});

const foods = defineCollection({
  loader: file('./src/content/foods.json'),
  schema: z
    .object({
      name: z.string().min(1),
      category: z.string().min(1),
      /** Preparation, where a source measured a specific one. */
      form: z.enum(FOOD_FORMS).optional(),
      aliases: z.array(z.string()).default([]),
      ratings: z.array(foodRating).min(1),
      /** Literature signals kept separate from measured-content ratings. */
      potentialTriggers: z.array(foodPotentialTrigger).default([]),
      note: z.string().optional(),
      lastVerified: z.coerce.date(),
    })
    .superRefine((food, ctx) => {
      food.ratings.forEach((r, i) => {
        const redistribution = REDISTRIBUTION_BY_SOURCE.get(r.source);

        if (!redistribution) {
          ctx.addIssue({
            code: 'custom',
            path: ['ratings', i, 'source'],
            message:
              `"${food.name}" cites unknown source "${r.source}". Add it to ` +
              `src/content/sources.json first.`,
          });
          return;
        }

        if (redistribution === 'link-only') {
          // Bucketing a proprietary database into low/moderate/high loses its
          // precision but not its provenance. We link to it instead.
          if (r.rating !== undefined) {
            ctx.addIssue({
              code: 'custom',
              path: ['ratings', i, 'rating'],
              message:
                `"${food.name}" restates a rating from "${r.source}", which is ` +
                `link-only. Drop the rating and link to the source instead.`,
            });
          }
          if (!r.url) {
            ctx.addIssue({
              code: 'custom',
              path: ['ratings', i, 'url'],
              message:
                `"${food.name}" references link-only source "${r.source}" without ` +
                `a url. A link-only source is useless to the reader unlinked.`,
            });
          }
        } else if (r.rating === undefined) {
          ctx.addIssue({
            code: 'custom',
            path: ['ratings', i, 'rating'],
            message: `"${food.name}" has no rating for open source "${r.source}".`,
          });
        }
      });

      food.potentialTriggers.forEach((trigger, i) => {
        const redistribution = REDISTRIBUTION_BY_SOURCE.get(trigger.source);
        if (!redistribution) {
          ctx.addIssue({
            code: 'custom',
            path: ['potentialTriggers', i, 'source'],
            message:
              `"${food.name}" cites unknown potential-trigger source ` +
              `"${trigger.source}". Add it to src/content/sources.json first.`,
          });
        } else if (redistribution !== 'open') {
          ctx.addIssue({
            code: 'custom',
            path: ['potentialTriggers', i, 'source'],
            message:
              `"${food.name}" restates a trigger signal from link-only source ` +
              `"${trigger.source}". Use an opened, restatable source instead.`,
          });
        }
      });

      // Two ratings from the same source on the same axis is a data entry bug,
      // and would show up downstream as a source disagreeing with itself.
      const seen = new Set<string>();
      food.ratings.forEach((r, i) => {
        const key = `${r.source}::${r.axis}`;
        if (seen.has(key)) {
          ctx.addIssue({
            code: 'custom',
            path: ['ratings', i],
            message: `"${food.name}" rates ${r.axis} twice from source "${r.source}".`,
          });
        }
        seen.add(key);
      });

      const seenTriggers = new Set<string>();
      food.potentialTriggers.forEach((trigger, i) => {
        const key = `${trigger.source}::${trigger.signal}`;
        if (seenTriggers.has(key)) {
          ctx.addIssue({
            code: 'custom',
            path: ['potentialTriggers', i],
            message:
              `"${food.name}" records ${trigger.signal} twice from source ` +
              `"${trigger.source}".`,
          });
        }
        seenTriggers.add(key);
      });
    }),
});

const sources = defineCollection({
  loader: file('./src/content/sources.json'),
  schema: z
    .object({
      name: z.string().min(1),
      url: z.url(),
      kind: z.string().min(1),
      redistribution: z.enum(REDISTRIBUTION),
      /** One line shown beside every link-only rating in the food table. */
      linkReason: z.string().min(1).max(200).optional(),
      /** Why this source carries these terms — shown on /methodology. */
      terms: z.string().min(1),
    })
    .superRefine((source, ctx) => {
      // A link-only source appears in the table as a bare link. Without a
      // reason next to it the reader cannot tell whether the value is missing
      // or withheld, which are very different things.
      if (source.redistribution === 'link-only' && !source.linkReason) {
        ctx.addIssue({
          code: 'custom',
          path: ['linkReason'],
          message:
            `"${source.name}" is link-only and needs a linkReason: one line saying ` +
            `why its values are linked rather than restated.`,
        });
      }
    }),
});

/**
 * Diagnostic tests, for the page a patient hands to a clinician.
 *
 * `timing` is required and is the point of the collection. A tryptase drawn at
 * the wrong moment reads normal however severe the episode was, and a page that
 * said "ask for a tryptase" without saying when would leave the reader worse
 * off than before it was written.
 */
const labs = defineCollection({
  loader: file('./src/content/labs.json'),
  schema: z.object({
    name: z.string().min(1),
    aliases: z.array(z.string()).default([]),
    specimen: z.string().min(1),
    role: z.enum(['core', 'broader', 'differential', 'not-recommended']),
    measures: z.string().min(1),
    timing: z.string().min(1),
    caveat: z.string().min(1),
    citations: z.array(citation).min(1),
  }),
});

const resources = defineCollection({
  loader: file('./src/content/resources.json'),
  schema: z.object({
    name: z.string().min(1),
    url: z.url(),
    /** What it actually is, so the reader knows before clicking. */
    kind: z.enum([
      'patient-organization',
      'community',
      'clinical-guideline',
      'key-paper',
      'registry',
      'reference',
      'practitioner-resource',
    ]),
    description: z.string().min(1).max(400),
    year: z.number().int().min(1950).max(2100).optional(),
    lastVerified: z.coerce.date(),
  }),
});

export const collections = { medications, supplements, foods, sources, resources, labs };
