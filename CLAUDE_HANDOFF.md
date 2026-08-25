# Handoff to Claude — 2026-08-24

## Codex handback — ready for final review and landing

The current 49-file batch is audited, source-checked, and staged, but Codex did
not commit, push, or deploy it. Before landing it:

1. Review `git diff --cached` and preserve the explicit staging boundary; do
   not use `git add -A` or `git add .` in this shared worktree.
2. Run `npm run validate`, `npm run verify:sources`, and
   `git diff --cached --check` once more after any edits.
3. If those checks remain green, commit the staged batch, push it, wait for the
   deployment, and smoke-test the medication, food, and methodology pages.

Final local evidence before this handback: 89 tests and the 48-page build
passed; source verification checked 123 PubMed citations, 16 trial records,
and 171 citations total with no failures. Desktop and mobile browser QA found
no console errors. The late corrections were a balanced azelastine trial
summary, a mobile food-detail clipping fix, and a cromolyn update adding the
direct five-person MCAS case series (PMID 41728426) while removing a false
formulation-exclusivity claim and an unsupported label rationale.

The detailed implementation, source, falsification, and QA record follows.

Claude's checkpoint below is committed, deployed, and green: CI, Pages, 85
tests, axe clean across nine pages, 724 links checked with zero errors. The
Codex continuation described later in this file is validated locally but is
not committed or deployed.

`RESEARCH_HANDOFF.md` and `TREATMENT_CANDIDATE_CATALOG.md` were left untouched
and uncommitted — they are yours.

## Read this first: the treatment schema changed and will reject your entries

`studyDesigns` is now **required** on every medication and supplement, `trial`
became `trials`, and `treatmentStep` was added. Any entry written against the
old shape fails `astro build`. Current shape:

```yaml
name: Cetirizine
mechanismClass: H1 antihistamine
mastCellBasis: downstream          # mcas-patients | mast-cell-disease | mast-cell-mediated-condition | related-condition | laboratory | downstream
studyDesigns:                      # REQUIRED, at least one
  - randomised-controlled          # | cohort | cross-sectional | case-series | case-report | in-vitro | non-human-in-vitro | animal
treatmentStep: 1                   # optional, 1–8, only if in the PMC12639879 sequence
treatmentContext: emerging-refractory # optional; cannot coexist with treatmentStep
establishedFor:
  - condition: "chronic spontaneous urticaria"
    basis: randomised-trials       # | approved-us | approved-non-us
evidenceLimits: >                  # REQUIRED
  ...
specialistUse:                     # optional; sourced clinical-practice signal
  - basis: treating-author-report  # | authored-clinical-guidance | recorded-first-party-discussion
    clinicians: ["Named clinician"]
    sourceUrl: "https://..."       # must exactly match a citation on the entry
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

The schema rejects contradictions in either direction: a `laboratory` entry
listing a human patient design, and a patient-level entry whose designs are all
preclinical. Pick the field that is wrong rather than working around it.
`in-vitro` now means human mast cells; use `non-human-in-vitro` for isolated
non-human cells. `related-condition` is for a human condition in which mast
cells may contribute when the study did not measure a drug effect on mast
cells. It preserves the inclusion bridge without awarding mast-cell evidence.
Use `cross-sectional` for a one-time survey rather than mislabelling it as a
longitudinal cohort. `treatmentContext: emerging-refractory` is a patient-facing
placement, not an evidence grade; the build rejects it on a numbered step.

`aspirin.md` and your `remibrutinib.md` label change are now committed. Their
citations were verified independently first.

## The grade came back, and why it should stay checked

Evidence grading returned at the site owner's request, over *study design in
mast cells only*. Grading on evidence anywhere was tested and rejected: it puts
famotidine top for heartburn and aspirin for minor aches, and bunches 59% on one
rung. Current spread after the local Codex continuation across 39 entries —
randomised 9, in vitro 6, none 8, observational 13, animal 3.

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

On 2026-08-24, a separate source-auditable **Potential trigger** column was
added for the owner's strawberry/histamine-liberator concern. It reports
**Reported — mechanism uncertain** independently of measured histamine content.
The initial direct-name set is strawberry, kiwi, tomato, and spinach. The build
requires an opened, restatable registered source and a food-specific note; a
blank cell is explicitly not a safety or tolerance claim. See
`FOOD_RESEARCH_HANDOFF.md` for the field and sourcing boundary.

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
- Medication candidates after the local continuation: the trigger-specific
  venom-immunotherapy and route-specific olopatadine entries are implemented;
  remaining local stabilizers and dual-action antihistamines still require the
  formulation-specific decisions described in `TREATMENT_CANDIDATE_CATALOG.md`.
- Supplement implementation: the second-wave human-mast-cell list is now
  researched and routed in `TREATMENT_CANDIDATE_CATALOG.md`; formulation
  decisions remain for curcumin, butyrate, vitamin D,
  cinnamon/cinnamaldehyde, omega-3 species, methoxyluteolin, and cannabidiol.
  Rosmarinic-acid-enriched Perilla leaf extract is now implemented as the
  formulation-specific evidence object.
- Issues [#2](https://github.com/matthewwrobotics/mcas-reference/issues/2)
  deep-linking and [#4](https://github.com/matthewwrobotics/mcas-reference/issues/4)
  providers.

## Codex continuation — final validation record

- Added barzolvolimab, hydroxyzine, midostaurin, imatinib, zileuton, tranilast,
  dupilumab, doxepin, cyclosporine, TLL-018, a GLP-1-based-medicines class page,
  and a formulation-specific rosmarinic-acid-enriched Perilla leaf-extract
  supplement page.
- Added low-dose naltrexone, hydroxyurea, tofacitinib, and sunitinib in a
  separate **Emerging / refractory evidence** group. `treatmentContext` drives
  both the index grouping and the detail-page tag and cannot coexist with a
  numbered treatment step.
- Added a benzodiazepine-class page with lorazepam as the regulatory
  representative. The 324-person exposure object remains class-level; the
  laboratory results are compound-specific and non-uniform, and none directly
  tests lorazepam. Leonard B. Weinstock's first-party transcript supports a
  documented-practice tag without turning that discussion into outcome
  evidence.
- Added hydroxychloroquine as an emerging/refractory page. It separates the
  mixed four-person report (two MCAS and two cutaneous mastocytosis), primary
  human-mast-cell experiments, two small randomised chronic-urticaria studies,
  the stale NCT05084872 mastocytosis record, and the current Plaquenil label.
  The paper does not identify a treating clinician precisely enough for a
  specialist-use tag.
- Added `emergency-intervention`, `trigger-specific`, and `local-route` catalog
  contexts. The index renders emergency entries before the maintenance
  sequence and keeps trigger-specific and route-specific products in separate
  groups. The schema rejects unknown contexts and methodology publishes every
  definition.
- Added epinephrine to the emergency group, with anaphylaxis approval and a
  5,364-event registry cohort kept separate from MCAS-specific evidence. Added
  a systemic-corticosteroid class page, using prednisone as the regulatory
  representative, at the already-published step 7. Its clinical bridge is the
  uncontrolled 1996 idiopathic-anaphylaxis series and later observational
  registry data, not a controlled MCAS comparison.
- Added Hymenoptera venom immunotherapy to the trigger-specific group. Its
  direct bridge is the prospective 84-person systemic-mastocytosis plus venom-
  allergy cohort, not an MCAS-wide outcome; the current standardized-venom
  biologic label supplies the diagnostic-selection and supervised-
  administration boundaries.
- Added olopatadine ophthalmic solution to the local-route group. The small
  randomized conjunctival-allergen-challenge study measured tear histamine in
  10 people with seasonal allergic conjunctivitis; it is local ocular evidence,
  not a systemic MCAS result. The current representative product is an OTC eye
  drop, and the page explicitly preserves the study-versus-label concentration
  boundary.
- Added azelastine nasal spray to the local-route group. Its randomized
  perennial-allergic-rhinitis evidence is kept separate from a historical oral
  mastocytosis crossover, so neither route is presented as a systemic MCAS
  result. The current representative product is an OTC nasal spray.
- The low-dose-naltrexone audit found stronger direct exposure data than the
  earlier queue recorded: PMID 40686928 surveyed 553 MCAS participants, 347 of
  whom reported prior exposure. It remains anonymous, retrospective,
  cross-sectional, self-reported, and confounded by concurrent care. A new
  `cross-sectional` design prevents calling it a cohort.
- Hydroxyurea's full text resolves its abstract's inconsistent counts: 26 of
  310 practice records were exposed, 20 entered the later symptom analysis, and
  six stopped early. Its two papers support sourced specialist-use tags for
  Leonard B. Weinstock and Lawrence B. Afrin. The bundled naltrexone case
  supports Leonard B. Weinstock's tag but not attribution to naltrexone alone.
- Tofacitinib and sunitinib were first-authored by Lawrence B. Afrin, but the
  accessible primary records do not state the treating clinician precisely
  enough for the current tag. Do not infer `specialistUse` from author order;
  add it later only if the full report or another durable first-party source
  resolves the attribution.
- Added `mast-cell-mediated-condition` so human mast-cell pharmacodynamics in
  an adjacent condition are not mislabelled as either MCAS or laboratory-only
  evidence. Barzolvolimab is the first entry using it.
- Added `related-condition` for an adjacent human condition without a measured
  drug effect on mast cells. TLL-018 is the first entry using it: its published
  randomized CSU pilot earns an adjacent-condition statement but deliberately
  displays no mast-cell-evidence grade.
- Added `non-human-in-vitro` so isolated rat-cell work is not labelled as human
  mast-cell evidence. Doxepin uses that design, and tranilast was corrected to
  it; the visible grade is **Non-human mast-cell evidence**.
- Added source-audited `specialistUse` tags to imatinib and GLP-1-based
  medicines. The GLP-1 source explicitly draws the cases from the six authors'
  patient panels, including Tania T. Dempsey and Lawrence B. Afrin. Imatinib
  names Leonard B. Weinstock only because the paper identifies him—not Afrin—as
  the treating author.
- `specialistUse` is the patient-facing answer to the owner's request to tag
  under-researched treatments used by named MCAS specialists. Keep it separate
  from study design, regulatory status, and off-label use; the visible label is
  **Documented specialist use**, and reputation alone never qualifies.
- Zileuton's adjacent basis comes from human nasal-challenge tryptase data;
  tranilast remains laboratory-only and does not mislabel its older controlled
  trial as randomized; dupilumab uses adjacent human nasal mast-cell-count data
  while keeping its one idiopathic-anaphylaxis case separate from MCAS.
- Doxepin separates the oral-capsule label, a 16-person historical urticaria
  crossover, AAAAI guidance, and a rat-cell experiment. Cyclosporine now has a
  mast-cell-disease basis from two combination-therapy mastocytosis cases plus
  isolated-human-mast-cell work, while its CSU RCTs and systemic-
  immunosuppression burden remain separate.
- The Perilla page preserves the formulation boundary among enriched leaf
  extract, seed preparations, oils, isolated rosmarinic acid, and
  multicomponent products.
- Repaired cetirizine and montelukast prose and added the missing montelukast
  chronic-urticaria trial source.
- The final absence audit found a newly indexed five-person cromolyn case
  series (PMID 41728426). The full text uses consensus-2 criteria in a selected,
  nonconsecutive ME/CFS population and mixes oral and local routes, so the page
  now records direct MCAS exposure as a case series while keeping the randomized
  systemic-mastocytosis trial separate under `establishedFor`. The audit also
  removed the false exclusivity claim that cromolyn was the only oral product
  with a US mast-cell-disease label.
- Removed the categorical implication that MCAS cannot be clonal from the
  shared basis definition and the avapritinib/cromolyn wording.
- Updated `RESEARCH_HANDOFF.md` and `TREATMENT_CANDIDATE_CATALOG.md` so the
  implemented items are no longer in the add-next queue.
- `npm run validate` passes: editorial lint, Astro check, 89 tests, and a
  48-page production build. `npm run verify:sources` resolves 123 PubMed
  citations and 16 ClinicalTrials.gov records without an identity or registry-
  drift failure. Browser checks confirmed the medication
  index; its separate **Emerging / refractory evidence** group; the low-dose-
  naltrexone, hydroxyurea, tofacitinib, sunitinib, benzodiazepine, and
  hydroxychloroquine pages; the compound boundary and sourced first-party tag
  on the benzodiazepine page; the absence of inferred tags on tofacitinib,
  sunitinib, and hydroxychloroquine; the earlier TLL-018 related-condition
  treatment; the emergency group and step-7 corticosteroid placement; the
  epinephrine, trigger-specific, and local-route methodology anchors; and the
  remaining published methodology; the venom-immunotherapy, olopatadine, and
  azelastine routes; the Xolair approval and MCAS-evidence separation; and the
  food table's potential-trigger detail at desktop and mobile widths. Expanded
  mobile food details are anchored inside the horizontally scrolling table and
  no checked page produced a console error.
- A bounded 2026-08-24 falsification pass searched PubMed and
  ClinicalTrials.gov for direct MCAS records involving barzolvolimab, TLL-018,
  doxepin, hydroxyzine, naltrexone, tofacitinib, sunitinib, semaglutide, and
  tirzepatide. It surfaced the already represented hydroxyzine review/case
  material, naltrexone survey/cases, the single tofacitinib and sunitinib case
  records, and the GLP-1 case series, but no contradictory controlled or
  interventional MCAS record for the scoped entry claims. This bounded search
  is a release audit, not proof that future or differently indexed evidence
  cannot exist.

## Process

**Never `git add -A` here.** Four of your in-progress entries were swept into a
commit and deployed before anyone verified them. They turned out sound, which
was luck. Stage explicit paths and account for every line of
`git status --porcelain`.

Run `npm run validate` before considering anything done. `npm run dev:clean` if
an island goes blank in dev — `astro.config.mjs` pins the React runtimes in
`optimizeDeps` to prevent it, and that block should not be removed.
