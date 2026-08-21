import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

import {
  CITATION_SOURCE_TYPES,
  CONFOUND_LEVELS,
  CONFOUND_REQUIRED_TIERS,
  EVIDENCE_TIERS,
  QUALIFYING_CITATION_TYPES,
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
  status: z.enum(TRIAL_STATUSES),
  /** Registry or sponsor only — see TRIAL_STATUS_SOURCES. */
  statusSource: z.enum(TRIAL_STATUS_SOURCES),
  verified: z.coerce.date(),
});

const confoundRisk = z.object({
  level: z.enum(CONFOUND_LEVELS),
  note: z.string().min(1),
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
  evidenceTier: z.enum(EVIDENCE_TIERS),
  regulatory: z.enum(REGULATORY_STATUSES),
  offLabelRationale: z.string().min(1).optional(),
  trial: trial.optional(),
  confoundRisk: confoundRisk.optional(),
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

  // 2. Uncontrolled evidence in a relapsing-remitting condition never ships
  //    unflagged — spontaneous remission reads as response.
  if (
    (CONFOUND_REQUIRED_TIERS as readonly string[]).includes(entry.evidenceTier) &&
    !entry.confoundRisk
  ) {
    ctx.addIssue({
      code: 'custom',
      path: ['confoundRisk'],
      message:
        `"${entry.name}" is tier "${entry.evidenceTier}", so confoundRisk is required. ` +
        `Uncontrolled evidence in a relapsing-remitting condition cannot be ` +
        `separated from spontaneous fluctuation, and the entry must say so.`,
    });
  }

  // 3. "Approved elsewhere" is its own bucket and owes the reader a reason.
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

  // 4. A trial status is only as good as the day it was checked.
  if (entry.trial) {
    const ageDays = (Date.now() - entry.trial.verified.getTime()) / DAY_MS;
    if (ageDays > TRIAL_STATUS_MAX_AGE_DAYS) {
      ctx.addIssue({
        code: 'custom',
        path: ['trial', 'verified'],
        message:
          `"${entry.name}" carries a trial status last verified ${Math.round(ageDays)} ` +
          `days ago (limit ${TRIAL_STATUS_MAX_AGE_DAYS}). Re-check ${entry.trial.nctId} ` +
          `on ClinicalTrials.gov and update \`verified\`, or remove the trial block.`,
      });
    }
    if (ageDays < 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['trial', 'verified'],
        message: `"${entry.name}" has a trial verified date in the future.`,
      });
    }
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

const foods = defineCollection({
  loader: file('./src/content/foods.json'),
  schema: z
    .object({
      name: z.string().min(1),
      category: z.string().min(1),
      aliases: z.array(z.string()).default([]),
      ratings: z.array(foodRating).min(1),
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

export const collections = { medications, supplements, foods, sources, resources };
