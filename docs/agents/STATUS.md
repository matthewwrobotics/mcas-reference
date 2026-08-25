# Status

One page, so no agent needs to read 3,249 lines of handoff to orient. Update it
when landing work; keep it short enough that nobody skips it.

## Live

<!-- Update on deploy. -->
- Site: https://matthewwrobotics.github.io/mcas-reference/
- CI, Pages deploy, weekly link check and freshness sweep: green.

## In flight

<!-- What is uncommitted, and who owns it. -->

## Next

<!-- Three items at most. Everything else belongs in an issue or the catalog. -->

## Open decisions

**`studyDesigns` semantics are loose, and the grade is correct by accident.**
The field is documented as what was studied *in mast cells*, but cetirizine,
famotidine and montelukast all list `randomised-controlled` for trials in
urticaria, asthma and acid-related disease — none of which are mast cell
populations. Those entries still grade `none` only because
`mastCellBasis: downstream` suppresses the grade before the designs are read.

That worked until hydroxyzine, whose randomised trial *was* in mastocytosis
patients. The same trial — a ketotifen-versus-hydroxyzine crossover, PMID
2654254 — was graded `randomised` on ketotifen and `none` on hydroxyzine.
Corrected by moving hydroxyzine to `mast-cell-disease`, which matches the
published definition, but the underlying looseness remains.

Two ways to resolve it, and it needs a decision rather than a patch:

1. Tighten the field so only designs run in mast cells or mast-cell-disease
   populations count. Cetirizine, famotidine and montelukast lose
   `randomised-controlled`, which is arguably what the definition already says.
2. Rename it to mean any design anywhere, and rely on `mastCellBasis` alone to
   gate the grade — which is what the code effectively does today.

Option 1 is more honest and makes the grade robust rather than incidentally
right. Option 2 is less work and changes no output.

## Archived detail

Long-form research history lives in `RESEARCH_HANDOFF.md`,
`FOOD_RESEARCH_HANDOFF.md` and `TREATMENT_CANDIDATE_CATALOG.md`. Those are
reference, not orientation — do not read them end to end to start work.
