# Claude handoff: evidence labels and omalizumab — IMPLEMENTED

Status: done. Recorded here so the next session does not redo it.
The living evidence record remains `RESEARCH_HANDOFF.md`.

## What was asked, and what shipped

**Remove the `confoundRisk` badge.** Done, and the reasoning was right: readers
took "Confound risk: high" to mean the drug was dangerous rather than that the
study design could not support a causal claim. On a patient-facing medical site
that fails in the worse direction.

The *label* is gone; the *discipline* is not. `confoundRisk {level, note}` was
replaced by `evidenceLimits`, an unscored prose field rendered under the heading
"What this evidence cannot establish", in a neutral card with no alert styling
and no ordinal score. The schema still requires it — now on any entry without
randomised results in MCAS, which is a wider net than the old rule cast.

Deleting the requirement outright was the other option on the table and was not
taken. Uncontrolled evidence shipping unmarked is the specific failure this site
exists to prevent; the problem was the presentation, not the obligation.

**Reclassify omalizumab.** Done, but not by relabelling it. See below.

## The structural change: evidence is two facts, not one grade

`RESEARCH_HANDOFF.md` identified the real problem — a one-dimensional tier
cannot describe omalizumab honestly. That is now implemented:

- `directEvidence` — `randomized` / `observational` / `case-report` / `none`,
  meaning evidence in MCAS itself.
- `otherEvidence` — optional `{design, context}`, e.g. randomised trials in
  chronic spontaneous urticaria and IgE-mediated food allergy.
- `regulatory` — unchanged, still an independent third fact.

Omalizumab now reads: observational in MCAS; randomised trials in CSU and food
allergy; FDA-approved for other indications. Index pages sort on *direct*
evidence, so a drug with trials only in another condition cannot outrank one
actually studied in MCAS.

## Also implemented from RESEARCH_HANDOFF.md

- **RCT badges now require evaluable results.** Claiming `directEvidence:
  randomized` requires citing a peer-reviewed primary report. A registered
  protocol or a trial terminated after two participants can no longer earn the
  strongest badge. Verified by probe.
- **Supplements are no longer `otc`.** New `dietary-supplement` status: "US
  dietary supplement — not FDA-approved as a drug". `otc` now means a
  non-prescription *drug*. All four supplements moved.
- **Masitinib now tracks `NCT05449444`**, the Phase 2 trial in MCAS itself,
  verified `UNKNOWN` with last update 2023-02-06. The mastocytosis record
  `NCT04333108` is cited alongside it. Two quiet registry records for one drug
  is the situation aggregators describe worst.
- **Omalizumab citations added** after independent verification of every PMID
  through E-utilities and every FDA URL: 23432142, 25046337, 38407394, plus the
  current Xolair prescribing information.
- **Supplement entries rewritten from full text** — the four supplement papers
  were all open access. Quercetin's entry now names the calcium-influx mechanism
  and the exposure gap (LAD2 line, above 100 micromolar) rather than gesturing at
  signalling pathways. DAO's notes that serum DAO is not established to reflect
  gut DAO activity.

## Still open from RESEARCH_HANDOFF.md

Not started, in rough priority order:

1. **Missing pivotal sources** for cromolyn, cetirizine and masitinib — their
   `otherEvidence` currently rests on review documentation rather than the
   primary trial reports. Each entry's `evidenceLimits` says so.
2. **Missing candidates**: aspirin, rupatadine, remibrutinib, barzolvolimab.
3. **Class-representation rule** before adding near-duplicate H1/H2 drugs.
4. **Epinephrine** needs a separate emergency-intervention structure, not the
   chronic-treatment schema.
5. Supplement candidates: resveratrol, EGCG.

## Constraints that held

No dosing. No efficacy claims. Every PMID verified through E-utilities before
use. `lastVerified` bumped only on entries whose sources were actually reopened
(omalizumab, masitinib, and the four supplements).
