# Claude handoff: evidence labels and omalizumab

## What the user wants

Simplify the patient-facing evidence labels because **“Confound risk: high”** can
be mistaken for a medication-safety warning. The user’s preferred direction is
to remove the confound-risk label entirely, not merely rename it.

The user also identified that omalizumab (Xolair) appears to be classified
incorrectly as `observational`. Under this site’s published definition, it
should be `rct-adjacent`.

No implementation changes have been made yet; this file only records the
discussion and supporting research.

The broader ongoing medication/supplement audit and missing-candidate screen is
in `RESEARCH_HANDOFF.md`. Treat that as the living evidence record; this file is
the concise UX decision handoff.

## Recommended editorial changes

1. Remove the public confound-risk badge and its `low` / `moderate` / `high`
   scale. The evidence tier already communicates study design, while the word
   “risk” can be misread as danger or adverse-effect risk.
2. Decide whether to remove `confoundRisk` from the content model entirely or
   retain unscored, entry-specific evidence limitations in another field. The
   user favors getting rid of the confusing label entirely.
3. Reclassify omalizumab from `observational` to `rct-adjacent`.
4. Keep its regulatory status as `approved-us-other`: Xolair is FDA-approved
   for other indications, not for MCAS.
5. Retain the MCAS-specific systematic review as a citation. It accurately
   documents that the direct MCAS literature is observational, even though the
   strongest overall tier is adjacent RCT evidence.
6. Add at least one verified adjacent RCT citation and preferably the current
   FDA label or approval source to the omalizumab entry.

## Why omalizumab qualifies as RCT-adjacent

The site defines `rct-adjacent` in `src/lib/vocab.ts` as:

> One or more randomized controlled trials in a related mast-cell-mediated or
> allergic condition — systemic mastocytosis, chronic spontaneous urticaria,
> allergic asthma — but not in MCAS itself.

Omalizumab has randomized, placebo-controlled evidence in chronic spontaneous
urticaria and IgE-mediated food allergy. Its FDA approvals and the evidence
tier are conceptually separate, but the RCTs supporting these related
indications satisfy the site’s own adjacent-tier definition.

Verified sources:

- OUtMATCH food-allergy RCT, PMID 38407394:
  https://pubmed.ncbi.nlm.nih.gov/38407394/
- Phase 3 chronic spontaneous urticaria RCT, PMID 23432142:
  https://pubmed.ncbi.nlm.nih.gov/23432142/
- ASTERIA I chronic spontaneous urticaria RCT, PMID 25046337:
  https://pubmed.ncbi.nlm.nih.gov/25046337/
- FDA’s February 2024 food-allergy approval announcement:
  https://www.fda.gov/news-events/press-announcements/fda-approves-first-medication-help-reduce-allergic-reactions-multiple-foods-after-accidental
- Current 2026 FDA Xolair prescribing information:
  https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/103976s5253lbl.pdf
- MCAS-specific systematic review already used by the entry, PMID 39741373:
  https://pubmed.ncbi.nlm.nih.gov/39741373/

Every PMID, URL, source type, year, and access date must be rechecked before
editing content. Do not bump `lastVerified` unless the sources have actually
been opened and reviewed as required by the project methodology.

## Likely files affected

- `src/content/medications/omalizumab.md`
  - Change `evidenceTier: observational` to `evidenceTier: rct-adjacent`.
  - Remove `confoundRisk` if that field is being retired, or note that it is no
    longer required once the tier changes.
  - Add verified RCT and regulatory citations.
  - Preserve the distinction between adjacent RCT evidence and observational
    MCAS-specific evidence.
- `src/components/ConfoundFlag.astro`
- `src/components/TreatmentIndex.astro`
- `src/components/AppointmentBuilder.tsx`
- `src/pages/appointment.astro`
- `src/pages/index.astro`
- `src/pages/methodology.astro`
- `src/content.config.ts`
- `src/lib/vocab.ts`
- `scripts/lint-content.mjs`
- `src/styles/global.css`

Use `rg -n -i "confound risk|confoundRisk|confound" src scripts` to find the
complete dependency surface before editing.

## Important project constraints

Read `AGENTS.md` before implementation. In particular:

- Every published methodology rule must match its schema/lint enforcement.
  Removing the confound rule requires updating both the checks and the
  `/methodology` page so they do not drift.
- Do not add dosing information.
- Do not make efficacy claims. Describe mechanisms, study designs, regulatory
  facts, and evidence provenance.
- Never invent a citation.
- `lastVerified` represents a real source review.
- Run `npm run validate` after all content or methodology changes.

## Desired patient-facing result for Xolair

- Evidence tier: **RCT, adjacent condition**
- Regulatory status: **FDA-approved, other indication**
- No badge that could be interpreted as “Xolair is high risk”
- Detail text may still explain, without an ordinal risk score, that direct
  MCAS evidence is observational while related allergic-condition evidence
  includes randomized controlled trials.
