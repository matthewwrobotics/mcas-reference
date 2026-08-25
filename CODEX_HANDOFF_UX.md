# Completion record: new-patient usability work

Claude paused mid-implementation; Codex completed and verified the batch. The
final change set covers **24 explicit paths**. `npm run validate`, `npm run a11y`
(51 pages, 0 violations), 99 tests, and `npm run verify:sources` (136 PubMed
citations and 16 trial records) are green.

Plan file: `~/.claude/plans/thoughts-here-s-the-full-shimmying-mist.md`.

## Why this work exists

Two audits found the site reads as though the reader already knows what MCAS is.
It never defined the condition — 250+ uses of six core terms with zero
definitional phrases sitewide. Underneath that sat a correctness bug: cards
rendered bare badges reading "Approved" and "None", qualified only by `sr-only`
text and a `title` tooltip, which is invisible on touch devices. Beside a
mast-cell evidence grade, "Approved" reads as *approved for MCAS* — which
nothing here is.

## Completion status

Complete. The published methodology now matches the visible badge wording,
including **"Approved for other conditions"** and the restored mast-cell evidence
grade. The lint also rejects both an approved MCAS condition and the reserved
`approved-us-mcas` regulatory status while that wording remains in use.

## Landed

- **`GradeBadge.astro`** — both badges carry visible context. Full labels on
  entry pages, prefixed short labels on cards.
- **`lint-content.mjs`** — new rule fails the build if any `establishedFor`
  condition under an approved basis names MCAS, so the badge wording cannot
  silently become false. Proven to fire by seeding a violation. `PAGE_PROSE`
  widened from 1 page to 6.
- **`stepOrder`** on the medication schema, with a `superRefine` requiring a
  `treatmentStep`. Sourced, not editorial: step 1's own review text says
  "second-generation agents prioritised over first". Cetirizine 1, hydroxyzine 2.
  Documented at `methodology.astro` in the sequence section.
- **`byClinicalSequence` / `sequenceRank`** in `derive.ts`, now shared by
  `TreatmentIndex.astro` and `appointment.astro`. The picker previously
  flat-sorted by evidence strength, floating benzodiazepines, hydroxyurea,
  sunitinib and tofacitinib above routine antihistamines in the one view a
  patient carries to an appointment. It now groups emergency → steps 1–8 →
  contexts → unsequenced. 9 new tests.
- **`EmergencyNotice.astro`** on `/`, `/advocacy`, `/appointment`. Cites only
  already-vetted material (`aaaai-work-group-2019`, the epinephrine entry) so a
  safety notice does not become the one unverified citation on the page.
- **`PrintButton.astro`** on `/advocacy`, which claimed to be "written to be
  printed" and had no control. Renders hidden, revealed by script, so a reader
  without JS never sees a dead button.
- **`glossary.astro` + `GLOSSARY` in `vocab.ts`** — 20 terms in 4 groups.
- **Home page rewritten** — plain-language definition → emergency notice → two
  paths ("I think I might have this" / "I have a diagnosis") → directories.
- **Nav**: `For your doctor` → `Tests & diagnosis` (the old label told patients
  the most useful page was not for them); `Glossary` added.
- **`/advocacy` anchors** — `#the-criteria`, `#the-core-panel`,
  `#finding-a-clinician`, `#drug-classes`, `#sources`, plus slugged lab-group
  headings. Previously only `#main` existed.
- **`/appointment` opening rewritten**, utility before disclaimers, and
  cross-linked to `#finding-a-clinician`.

## Completed after the handoff

1. Reconciled `/methodology` with the current grade and approval labels.
2. Put utility before caveats on `/medications` and `/foods` without removing
   any caveat.
3. Added a back-to-top control on `/advocacy`.
4. Added real glossary links from index-page first uses and evidence rows.
5. Reduced `/appointment` to 15.1 words per sentence on average and shortened
   every sentence on the rendered page to fewer than 25 words.
6. Fixed context-group ordering in the appointment picker and added a regression
   test; after-step contexts now retain their defined order.
7. Corrected two glossary descriptions whose wording overstated the evidence
   hierarchy and multi-system requirement for anaphylaxis.
8. Proved the dosing and MCAS-approval lint guards with temporary negative
   controls, then restored clean content.

## Two audit claims that did not survive verification

Recorded so they are not re-investigated:

- **The homepage never said `/appointment` finds clinicians** — zero occurrences
  of "clinician" in `index.astro`. There was nothing to correct; only the
  cross-link was missing, and that is now in place.
- **`/appointment` already had a print button** (`AppointmentBuilder.tsx:128`).
  The missing-print-control defect was `/advocacy` only.

Conversely, the bare **"None"** badge was real and Claude initially dismissed it:
a `>None<` grep cannot match `</span>None` because an `sr-only` span sits
between. Fixed.

## Deliberately excluded

- **Expanding `/appointment` into an intake tool** collecting episode history, ED
  visits and current medications. It would put health data in `localStorage` on a
  possibly shared device with no disclosure, and turns a reference sheet into a
  record. Owner decision: out.
- **No symptom checklist**, and the home page says so explicitly. Symptoms
  overlap commoner conditions, and a list would invite a conclusion the evidence
  cannot support. Do not add one.
- Out of scope entirely: per-treatment safety context across 42 entries, global
  search/filter, trust panel, food-page reframing, and the 108 `<h3>` headings on
  `/foods`.

## Non-negotiables

No dosing. No efficacy claims. Never invent a citation. `lastVerified` means a
human opened the sources — no `lastVerified` value changed in this work.
`npm run validate` stays offline; its networked companion, `verify:sources`, was
also run before landing this batch.
