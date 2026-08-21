# MCAS Reference

A sourced reference index for mast cell activation disease: what the published
mechanism is for each treatment or trigger, and — the part that is usually hard
to find — how strong the evidence behind it actually is.

**No dosing. No efficacy claims. Nothing without a citable published mechanism.**

## The idea

Patient-facing information about MCAS is abundant and mostly ungraded. The same
substance appears in a forum post, a supplement advert, and a review article
with equal apparent authority. This site indexes the same material but keeps the
provenance attached: every entry carries an evidence tier, a regulatory status,
and the date a human last checked it.

The part worth looking at as engineering is that **none of that is enforced by
discipline**. The editorial policy published at `/methodology` is implemented as
validation, so an entry that violates it cannot reach `main`:

| Published rule | Enforced by | Failure mode |
| --- | --- | --- |
| Needs a citable published mechanism | `src/content.config.ts` refinement | Build fails |
| Uncontrolled evidence must carry a confound flag | `src/content.config.ts` refinement | Build fails |
| "Approved elsewhere" must state its rationale | `src/content.config.ts` refinement | Build fails |
| Trial statuses come only from the registry or sponsor | Enum with two members | Build fails |
| Trial statuses older than 180 days are not published | `src/content.config.ts` refinement | Build fails |
| Proprietary food data is linked, never restated | `src/content.config.ts` refinement | Build fails |
| No dosing, no efficacy claims | `scripts/lint-content.mjs` | CI fails |
| Citations stay alive | `.github/workflows/maintenance.yml` | Opens an issue |
| Entries do not go stale silently | `scripts/check-staleness.mjs` + visible badges | Reported weekly |

## Two design decisions worth explaining

**Food ratings are shown per source, not merged.** Published food lists
contradict each other more than patients are usually told — a
[2021 review of ten low-histamine diets](https://pubmed.ncbi.nlm.nih.gov/33919293/)
found only fermented foods were excluded unanimously, and that measured
histamine content justified fewer than a third of the exclusions. Averaging
those sources into one number would manufacture a certainty the literature does
not have, so the data model stores an array of `{source, rating, note}` per
entry and the UI says "sources differ" where they do.

**Trial statuses have no aggregator option.** The permitted values for
`trial.statusSource` are `clinicaltrials-gov` and `sponsor-press-release`, and
that is the whole list. Aggregators cache the last confident-sounding status and
display it long after the underlying record has gone quiet — the masitinib
Phase 3 record `NCT04333108` is currently carried by the registry itself as
*status unknown*, which is exactly the state trackers tend to render as
"ongoing".

## Stack

Astro 7 with React islands, TypeScript, Tailwind 4, Vitest. Static output,
deployed to GitHub Pages. Content is Markdown with schema-validated frontmatter
for prose entries and schema-validated JSON for tabular data.

## Commands

| Command | Does |
| --- | --- |
| `npm run dev` | Dev server at `localhost:4321/mcas-reference` |
| `npm run validate` | Lint, typecheck, test, and build — run before every commit |
| `npm run lint` | Editorial policy check (dosing, efficacy claims, insecure links) |
| `npm run check` | `astro check` |
| `npm run test` | Vitest |
| `npm run staleness` | Report entries due for re-verification |
| `npm run build` | Production build; enforces every content schema |

## Adding an entry

1. Add a Markdown file to `src/content/medications/` or `src/content/supplements/`.
2. Every citation needs a real, verified URL. For PubMed, confirm the PMID with
   the E-utilities API rather than from memory; for trials, read the status off
   ClinicalTrials.gov directly.
3. Write the mechanism in two or three sentences describing *action*, never
   outcome.
4. `npm run validate`. The schema will tell you precisely what the policy
   requires and why.

## Disclaimer

This is a reference index, not medical advice, and it makes no claim that
anything listed works. Treatment decisions belong with a clinician.
