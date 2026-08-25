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

**Seven candidates are blocked on a formulation decision, not on research.**
The evidence for each is already audited in `TREATMENT_CANDIDATE_CATALOG.md`.
What is missing is a choice about what the page would be *about*, and that is an
editorial call rather than an implementation task:

| Candidate | The decision needed |
| --- | --- |
| Curcumin | Which compound and formulation the page covers; bioavailability varies enormously between them |
| Butyrate | Sodium butyrate, another salt or prodrug, or endogenous microbial exposure — different exposures, not one object |
| Vitamin D | Nutritional D3, correcting a measured deficiency, calcidiol and prescription calcitriol are four different things; the mast-cell mechanism belongs to the active metabolite |
| Cinnamon | Intranasal standardised extract and isolated cinnamaldehyde do not make a generic oral-cinnamon page |
| Omega-3 | EPA/DHA split from ALA and from generic fish oil; the cited experiment did not move every endpoint in the same direction |
| Cannabidiol | Whether pharmaceutical-grade CBD is a medication page or a supplement page, and never generalised to retail CBD |
| Nedocromil, lodoxamide, pemirolast, epinastine | Whether the site gains a local ocular/airway section; these are route-specific products, not a systemic stabiliser class |

Each is deferred for the same reason: a generic consumer page would imply an
equivalence the evidence does not support. Implementing one without the decision
would be worse than leaving it out.

**Beans remains the one generic food entry.** The 2023 review reports 13.9 to
547.9 mg oxalate per 100 g across bean type, form and boiling. Splitting it needs
per-form values from that paper's full text. The entry's note states the range
and does not pretend the denominators explain it, and no further bean values have
been imported — which is what the research asked for.

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
