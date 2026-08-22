# Handoff to Codex — 2026-08-22

Everything below is committed, deployed, and green: CI, Pages, 85 tests, axe
clean across nine pages, 724 links checked with zero errors.

`RESEARCH_HANDOFF.md` and `TREATMENT_CANDIDATE_CATALOG.md` were left untouched
and uncommitted — they are yours.

## Read this first: the treatment schema changed and will reject your entries

`studyDesigns` is now **required** on every medication and supplement, `trial`
became `trials`, and `treatmentStep` was added. Any entry written against the
old shape fails `astro build`. Current shape:

```yaml
name: Cetirizine
mechanismClass: H1 antihistamine
mastCellBasis: downstream          # mcas-patients | mast-cell-disease | laboratory | downstream
studyDesigns:                      # REQUIRED, at least one
  - randomised-controlled          # | cohort | case-series | case-report | in-vitro | animal
treatmentStep: 1                   # optional, 1–8, only if in the PMC12639879 sequence
establishedFor:
  - condition: "chronic spontaneous urticaria"
    basis: randomised-trials       # | approved-us | approved-non-us
evidenceLimits: >                  # REQUIRED
  ...
trials:                            # optional list, replaces the old singular `trial`
  - nctId: NCT05652907
    phase: "2"                     # 1 | 1/2 | 2 | 2/3 | 3 | 4 | not-applicable
    status: terminated
    statusSource: clinicaltrials-gov
    condition: "mast cell activation syndrome"
    enrolment:
      count: 2
      basis: actual                # | estimated
    verified: 2026-08-22
```

Two new refinements will reject contradictions in either direction: a
`laboratory` entry listing a human design, and a patient-level entry whose
designs are all preclinical. Both are deliberate — pick the field that is wrong
rather than working around them.

`aspirin.md` and your `remibrutinib.md` label change are now committed. Their
citations were verified independently first.

## The grade came back, and why it should stay checked

Evidence grading returned at the site owner's request, over *study design in
mast cells only*. Grading on evidence anywhere was tested and rejected: it puts
famotidine top for heartburn and aspirin for minor aches, and bunches 59% on one
rung. Current spread across 17 entries — randomised 5, in vitro 5, none 4,
observational 2, animal 1.

`tests/grade-distribution.test.ts` fails if any rung exceeds 60% or if fewer
than four rungs are used. That guard exists because the *previous* grade was
removed for having no variance. If your additions collapse it, the grade needs
rethinking rather than the test loosening.

## What shipped from your handoffs

**From `RESEARCH_HANDOFF.md`** — the evidence-model split, the evaluable-results
requirement, the supplement regulatory distinction, and three of your sourcing
gaps closed with the primaries you supplied: cetirizine (8893110), cromolyn
(2110198), masitinib (28069279).

You also caught three false statements of mine, all live, all the same failure —
asserting an absence without searching for it. Ketotifen's basis was
unsupported; famotidine claimed no related controlled evidence when a randomised
urticaria trial exists; DAO called its evidence open-label when a
placebo-controlled crossover exists. All corrected, all your PMIDs reverified
before use. That failure mode is now recorded in `AGENTS.md`: the schema can
force a claim to be cited, but nothing can force a search for evidence the
author assumed away.

**From `FOOD_RESEARCH_HANDOFF.md`** — all three sources registered with their
mapping rules in `terms`, twelve entries added, five enriched. The directory is
46 entries and 131 ratings, and disagreements rose from 3 to 7.

Your preparation warning became structural rather than advisory: food entries
carry `form`, and the content lint now rejects preparation words in `aliases`.
It found two real violations the moment it ran — "Cured cheese" and "Cured
sausage" were aliases.

Your beans finding also corrected a live claim. The note said the two oxalate
reviews disagree *because of* the denominator; your 13.9–547.9 mg/100 g range
means they may simply have measured different beans. It now offers the
denominator as one candidate.

## Still open from your handoffs

- Second-wave foods: pineapple, papaya, pear, ketchup, star fruit, watermelon,
  asparagus, chicken breast.
- The generic-entry splits beyond raw/boiled beans — fish, cheese, soy.
- Medication candidates: barzolvolimab, hydroxyzine, midostaurin, imatinib.
- Supplement candidates: the second-wave human mast-cell list.
- Cetirizine and montelukast prose repair.
- Issues [#2](https://github.com/matthewwrobotics/mcas-reference/issues/2)
  deep-linking and [#4](https://github.com/matthewwrobotics/mcas-reference/issues/4)
  providers.

## Process

**Never `git add -A` here.** Four of your in-progress entries were swept into a
commit and deployed before anyone verified them. They turned out sound, which
was luck. Stage explicit paths and account for every line of
`git status --porcelain`.

Run `npm run validate` before considering anything done. `npm run dev:clean` if
an island goes blank in dev — `astro.config.mjs` pins the React runtimes in
`optimizeDeps` to prevent it, and that block should not be removed.
