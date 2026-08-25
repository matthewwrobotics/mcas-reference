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

*(None currently open.)*

### Settled — do not reopen

**`studyDesigns` is not loose, and the grade is not accidental.** Raised on
2026-08-25 after hydroxyzine and ketotifen graded differently on the same trial,
then investigated and withdrawn.

The two fields are independent axes and both are needed. `studyDesigns` says
what *design* supports the entry; `mastCellBasis` says how close that study came
to mast cells. Cetirizine reads "study design: randomised controlled trial",
"studied in: downstream of the mast cell", "randomised trials in: chronic
spontaneous urticaria" — which is exactly true and tells a reader more than
either field alone. The `downstream → none` branch in `relevanceGrade` is
construction, not a short-circuit hiding bad data.

The hydroxyzine discrepancy was a single misclassified `mastCellBasis`, since
that trial *was* run in mastocytosis patients. Fixed at the entry.

Emptying `studyDesigns` for downstream entries — the "fix" originally proposed
here — would destroy information: cetirizine would stop showing that randomised
trials exist at all. Recorded so nobody spends a day on it.

## Archived detail

Long-form research history lives in `RESEARCH_HANDOFF.md`,
`FOOD_RESEARCH_HANDOFF.md` and `TREATMENT_CANDIDATE_CATALOG.md`. Those are
reference, not orientation — do not read them end to end to start work.
