# Research packet template

One packet per candidate treatment. A packet is **research, not content**: it
carries what an implementer needs to write an entry and verify it, without them
re-doing the search.

Copy this into `research/<collection>/<slug>.md`. Do not edit production content
from a research task.

---

## <Treatment name>

**Exact formulation and route** — the specific preparation studied, not the drug
class. Oral cromolyn and cromolyn eye drops are different evidence objects, as
are EGCG, green-tea extract and brewed tea.

**Population and diagnosis** — who was studied, and under which diagnostic
criteria. Consensus-1 and consensus-2 admit different patients; say which.

**Study design and enrolment** — design, number of participants, and whether
that number is actual or planned.

**Outcomes measured** — what the study actually reported, not what it implies.

**Identifiers**
- PMID:
- Registry record (NCT, with phase and status as read today):
- Current regulatory label:

**Evidence limitations** — what this cannot establish. Be specific: confounding,
selection, absence of a comparator, exposure gaps between a laboratory
concentration and an oral dose.

**Proposed site classification**
- `mastCellBasis`:
- `studyDesigns`:
- `establishedFor`:
- `treatmentStep` or `treatmentContext`:

**Verification status** — which sources were opened in full, which were read at
abstract level, and which could not be retrieved. Say so plainly; an
unverifiable source is a finding, not a gap to paper over.

**Files the implementing agent may edit** — list them explicitly.

---

## Rules

- No dosing, anywhere, at any stage.
- No efficacy claims. Report designs, populations and regulatory facts.
- Never invent an identifier. Verify PMIDs through E-utilities and trial status
  through ClinicalTrials.gov before writing them down.
- If claiming that evidence does not exist, record the searches run. An absence
  is the one claim no check on this site can catch.
