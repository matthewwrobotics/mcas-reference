# MCAS Reference research handoff

Living evidence-research file for Claude. This file is research input, not
published medical content and not medical advice.

Last research update: 2026-08-21

## Research remit

The research has three lanes:

1. Audit every medication and supplement already published in
   `src/content/medications/` and `src/content/supplements/`.
2. Systematically discover and screen credible medications and supplements that
   are not yet listed.
3. Review durable first-party material from clinician-researchers who regularly
   treat and publish about MCAS—including Tania T. Dempsey and Lawrence B.
   Afrin—for documented specialist-use options that database-only searches may
   miss.

For every existing entry and candidate, distinguish:

- direct MCAS evidence;
- evidence in an adjacent mast-cell-mediated or allergic condition;
- mechanistic-only evidence;
- study design and risk of over-interpreting it;
- regulatory status, kept separate from evidence strength;
- exact, verified citation metadata;
- whether the candidate clears the site's inclusion bar.

Claude should not treat a candidate as approved for publication merely because
it appears in the discovery queue.

## Governing inclusion directive — project-owner decision, 2026-08-21

Claude: treat this site as a comprehensive evidence map, not a shortlist of
therapies that have already completed randomized trials. MCAS is a young,
understudied disease and formal studies can lag clinical practice by years.
Lack of an RCT therefore lowers certainty; it does not, by itself, justify
omitting a medication or supplement.

Include candidates supported by a traceable direct case report or series,
documented specialist use, adjacent mast-cell-disease evidence, or a distinct
preclinical mast-cell mechanism. In particular, durable first-party sources
showing use or discussion by clinician-researchers who regularly treat and
publish about MCAS—including Tania T. Dempsey and Lawrence B. Afrin—are within
scope and should be captured.

Create a separate `specialist-practice` evidence concept rather than treating
expert use as either an RCT or an anecdote. For each such entry:

- cite the clinician's authored paper, guidance, recorded presentation, or
  another durable first-party source;
- identify exactly what is documented: use, discussion, recommendation, or a
  reported patient series;
- do not imply that one clinician's practice proves efficacy or represents
  professional consensus;
- keep off-label status, study design, safety, and regulatory approval separate;
- show case-level, uncontrolled, adjacent-condition, laboratory-only, and
  preclinical limitations in plain language rather than hiding the entry.

**Implemented field and visible tag:** use `specialistUse` in treatment
frontmatter. Each item requires `basis`, one or more named `clinicians`, and a
`sourceUrl` that exactly matches a citation on the entry. The supported bases
are `treating-author-report`, `authored-clinical-guidance`, and
`recorded-first-party-discussion`. The UI renders these as **Documented
specialist use** and links the tag to `/methodology#specialist-use`. Do not add
the field from reputation or a second-hand claim.

Hold an item only when its identity, formulation, source, or attribution cannot
yet be described accurately—not merely because the evidence is early. This
directive supersedes older verdicts below that defer an otherwise sourced item
solely until a randomized or larger study appears. Preserve the older evidence
analysis, but route those items to an emerging, specialist-practice,
experimental/refractory, or laboratory-only section as appropriate.

## Current decision snapshot

This is the short routing layer; the detailed evidence and URLs appear below.

**Implementation checkpoint (2026-08-24):** aspirin, rupatadine, remibrutinib,
barzolvolimab, hydroxyzine, midostaurin, imatinib, GLP-1-based medicines,
zileuton, tranilast, dupilumab, doxepin, cyclosporine, TLL-018, low-dose
naltrexone, hydroxyurea, tofacitinib, sunitinib, a benzodiazepine-class page
with lorazepam as its regulatory representative, hydroxychloroquine, epinephrine,
Hymenoptera venom immunotherapy, olopatadine ophthalmic solution, azelastine
nasal spray, a systemic-
corticosteroid class page with prednisone as its representative, resveratrol,
epigallocatechin gallate (EGCG), and rosmarinic-acid-enriched Perilla extract
now have live entries. Cetirizine and montelukast also received their missing
primary trial sources and narrower prose. Source metadata, label boundaries,
and trial statuses were re-verified, and the current validation checkpoint is
recorded in `CLAUDE_HANDOFF.md`. Emergency, trigger-specific, emerging/
refractory, and local-route structures are now implemented. Venom
immunotherapy is the first trigger-specific entry; olopatadine ophthalmic
solution and azelastine nasal spray establish the local-route group. Remaining local products still require
route- and formulation-matched pages. The supplement queue still requires
formulation decisions.

### Existing entries needing correction or stronger sourcing

- **Omalizumab:** the live entry now separates its MCAS-patient basis from the
  conditions with US approvals or randomized trials. The structural issue that
  prompted this audit is resolved; the newer direct cohort and primary
  mechanism paper remain optional source-strengthening additions.
- **Ketotifen:** the live `mastCellBasis: mcas-patients` claim is not supported
  by a direct primary MCAS outcome paper in its citations or in this audit.
  Use `mast-cell-disease` unless Claude verifies such a paper; add the two small
  randomized mastocytosis studies to `establishedFor`.
- **Cromolyn, masitinib, famotidine, DAO, luteolin, quercetin, and PEA:** add
  the primary studies identified below instead of asking reviews to carry
  design-specific claims. Cetirizine and montelukast were repaired in the
  current worktree.
- **Masitinib:** track the direct MCAS trial `NCT05449444` separately from the
  mastocytosis trial; both registry records are currently `UNKNOWN`.
- **Avapritinib, cromolyn, ketotifen, famotidine, luteolin, and quercetin:**
  correct the overbroad or contradicted prose documented below. Do not say
  quercetin lacks human outcome data in every condition. Cetirizine's
  treatment-directed and overbroad sedation language was repaired.
- **PEA:** keep `mastCellBasis: laboratory` and no `establishedFor` claim; the
  only direct randomized idiopathic-MCAS study terminated after two
  participants and cannot estimate an effect.

### Highest-priority medication candidates and recent additions

- **Aspirin (added 2026-08-21):** direct observational MCAS evidence plus a
  mediator-synthesis mechanism; the live entry keeps the reaction, bleeding,
  and divergent leukotriene-metabolite context prominent.
- **Rupatadine (added 2026-08-21):** mastocytosis RCT, human mast-cell PAF
  studies, and a distinct H1-plus-PAF mechanism; approved in Canada, not the US.
- **Remibrutinib (added 2026-08-21):** phase 3 CSU evidence, BTK mechanism, and
  US CSU approval in 2025; no direct MCAS outcomes located.
- **Barzolvolimab (added 2026-08-21):** anti-KIT mast-cell-depleting biologic
  with phase 1b/2 CSU randomized evidence and active-not-recruiting phase 3
  trials; the new `mast-cell-mediated-condition` basis prevents it from being
  mislabelled as either MCAS or laboratory-only evidence.
- **Hydroxyzine (added 2026-08-21):** first-generation H1 representative with
  randomized pediatric-mastocytosis evidence and explicit drowsiness, CNS,
  anticholinergic, and QT boundaries.
- **Midostaurin (added 2026-08-21):** clonal systemic-mastocytosis comparator,
  visibly outside the stepwise MCAS sequence.
- **Imatinib (added 2026-08-21):** direct case/report cohort plus a narrow
  mutation-defined mastocytosis indication. The treating-author source supports
  `specialistUse` for Leonard B. Weinstock; Lawrence B. Afrin is not tagged as
  the treating clinician merely because he co-authored the paper.
- **GLP-1-based medicines (added 2026-08-21):** 47-person retrospective MCAS
  case series plus two adjacent CSU cases. The source says the MCAS patients
  came from the six authors' panels and presents one representative case per
  author, supporting `specialistUse` for Tania T. Dempsey, Lawrence B. Afrin,
  Leonard B. Weinstock, Katja Aschenbrenner, Svetlana Blitshteyn, and Jill R.
  Schofield. The live page keeps the class, consensus-2, selection,
  co-intervention, formulation, regulatory, and conflicting human-mast-cell
  mechanism limits explicit.
- **Zileuton (added 2026-08-21):** distinct leukotriene-synthesis inhibitor;
  the live adjacent human-mast-cell basis comes from aspirin-sensitive asthma
  nasal-challenge work that measured tryptase rather than from an MCAS outcome.
- **Tranilast (added 2026-08-21):** non-US oral antiallergic entry with
  laboratory mast-cell evidence and Japanese regulatory boundaries. PMID
  6205614 is a controlled clinical trial, not a verified randomized trial, so
  the page does not award a randomized badge.
- **Dupilumab (added 2026-08-21):** IL-4R-alpha biologic with adjacent CSU and
  CRSwNP evidence plus measured human nasal mast-cell changes; the page keeps
  the single idiopathic-anaphylaxis case and absence of direct MCAS evidence
  distinct from its current US indications.
- **Doxepin (added 2026-08-21):** the oral-capsule page separates a small
  historical urticaria RCT and AAAAI MCAS guidance from a non-human mast-cell
  experiment. The mast-cell grade is therefore non-human rather than a claim
  that doxepin stabilizes human mast cells.
- **Cyclosporine (added 2026-08-21):** two combination-therapy mastocytosis case
  reports and isolated-human-mast-cell work supply the mast-cell-disease basis;
  CSU RCTs and its broad-immunosuppression safety burden remain separate.
- **TLL-018 (added 2026-08-21):** the 41-person randomized CSU pilot is now
  peer-reviewed, but it measured neither mast cells nor MCAS. The new
  `related-condition` basis makes that inclusion bridge visible without
  converting an adjacent inflammatory-condition trial into mast-cell evidence;
  the phase 3 CSU study is active-not-recruiting with no published results.
- **Low-dose naltrexone (added 2026-08-21):** direct evidence now includes a
  553-person MCAS survey in which 347 participants reported prior exposure, not
  only the seven-person subgroup in a pain cohort. The live page keeps both
  retrospective and self-reported, adds the bundled POTS/MCAS case, and tags
  Leonard B. Weinstock only because that case explicitly identifies him as a
  treating author.
- **Hydroxyurea (added 2026-08-21):** two uncontrolled MCAS series are live in
  the separate emerging/refractory group. The larger full text clarifies that
  26 of 310 records were exposed and 20 entered the later symptom analysis;
  `specialistUse` separately documents Leonard B. Weinstock and Lawrence B.
  Afrin from their own treating-author reports.
- **Tofacitinib and sunitinib (added 2026-08-21):** direct two-patient and
  one-patient MCAS reports now sit in the emerging/refractory group with broad
  immunosuppression or oncology-level boxed-warning context. Both papers were
  first-authored by Lawrence B. Afrin, but the accessible primary records did
  not identify the treating clinician precisely enough for the sourced
  specialist-use field; author order alone was not converted into the tag.
- **Epinephrine:** belongs in a separate emergency-intervention structure, not
  the chronic-treatment evidence schema.

### Highest-priority supplement candidates and recent additions

- **Resveratrol (added 2026-08-21):** primary mature human intestinal and skin
  mast-cell studies; the live entry retains laboratory-only framing because
  effects vary by mediator and model.
- **EGCG (added 2026-08-21):** primary human-mast-cell-line FcεRI work; the live
  entry keeps EGCG, methylated derivatives, green-tea extract, and tea as
  separate evidence objects.
- **Rosmarinic-acid-enriched Perilla extract (added 2026-08-21):** the live
  page represents the defined leaf extract used in the seasonal-allergy and
  mast-cell papers. It explicitly separates leaf powder, seed products, oil,
  isolated rosmarinic acid, and multicomponent supplements.
- **Curcumin, butyrate, cinnamon/cinnamaldehyde, vitamin D metabolites, and
  omega-3 fatty acids:** credible but currently deferred because formulation,
  route, exposure, or evidence-field semantics would make a generic consumer
  entry misleading.
- **Vitamin C, Boswellia, kaempferol, and the long-tail polyphenol list:** do not
  prioritize under the stricter human-bridge rule.

### Implementation-ready priority matrix

This is the routing summary for candidates most likely to reach Claude's next
content pass, plus the five newly implemented entries for audit continuity.
“No current trial located” means the searches found no relevant active or
result-bearing MCAS record; it is not a claim that the molecule has never
appeared in any registry.

| Candidate | Direct MCAS | Other evidence | Proposed live basis | Regulatory fact | Relevant trial status | Research disposition |
| --- | --- | --- | --- | --- | --- | --- |
| Aspirin | Observational | Observational systemic-mastocytosis mediator study; randomized mastocytosis challenge is a safety study, not an outcome trial | `mcas-patients` | US `otc`, not MCAS-specific | No current MCAS interventional trial located | Implemented 2026-08-21 with explicit attribution, reaction, bleeding, and leukotriene context |
| Rupatadine | None | Randomized in mastocytosis; human mast-cell PAF experiments | `mast-cell-disease` | `approved-non-us` (Canada); no FDA approval located | No current MCAS interventional trial located | Implemented 2026-08-21 as a distinct H1/PAF entry |
| Remibrutinib | None | Human mast-cell laboratory study plus randomized phase 3 CSU | `laboratory` | `approved-us-other` (CSU), not MCAS | Published CSU program; no direct MCAS trial located | Implemented 2026-08-21 as an adjacent entry |
| Barzolvolimab | None | Direct human mast-cell depletion plus randomized CSU | `mast-cell-mediated-condition` | `investigational` | Phase 3 CSU trials `NCT06445023` and `NCT06455202` are `ACTIVE_NOT_RECRUITING` | Implemented 2026-08-21 with a new adjacent human mast-cell basis and no MCAS claim |
| Hydroxyzine | None | Randomized in pediatric mastocytosis | `downstream` | `approved-us-other` | No current MCAS interventional trial located | Implemented 2026-08-21 as the first-generation H1 representative |
| Midostaurin | None | Observational in advanced systemic mastocytosis | `mast-cell-disease` | `approved-us-other` (advanced systemic mastocytosis), not MCAS | No current direct-MCAS trial located | Implemented 2026-08-21 as a clonal-disease comparator outside the stepwise sequence |
| Imatinib | Case report plus embedded medical-record cohort | Observational in mutation-defined systemic mastocytosis | `mcas-patients`; `specialistUse` identifies Leonard B. Weinstock from the treating-author report | `approved-us-other` with a narrow mastocytosis mutation boundary | No current direct-MCAS trial located | Implemented 2026-08-21 with uncontrolled-design, trigger-avoidance, diagnostic, mutation, and toxicity boundaries |
| Zileuton | None | Aspirin-sensitive-asthma nasal challenge measured tryptase and leukotrienes; mouse oral-anaphylaxis mechanism | `mast-cell-mediated-condition` | `approved-us-other` (asthma), not MCAS | No current direct-MCAS trial located | Implemented 2026-08-21 as leukotriene-synthesis inhibition, separate from receptor blockade |
| Tranilast | None | Controlled perennial-allergic-rhinitis comparison plus rat mast-cell experiments | `laboratory` | `approved-non-us` (Japan) | No current direct-MCAS trial located | Implemented 2026-08-21 without mislabelling the older controlled study as randomized |
| Dupilumab | None | Randomized CSU and CRSwNP evidence; CRSwNP analysis measured human nasal mast cells; one idiopathic-anaphylaxis case | `mast-cell-mediated-condition` | `approved-us-other`, not MCAS | No current direct-MCAS trial located | Implemented 2026-08-21 with current label boundaries and indirect-mechanism limits |
| Doxepin (oral capsules) | None | Small randomized chronic-idiopathic-urticaria crossover; rat peritoneal-mast-cell experiment; AAAAI MCAS guidance | `laboratory` with `non-human-in-vitro` design | `approved-us-other` for adult major depressive disorder | No direct MCAS trial located | Implemented 2026-08-21 with oral-formulation, non-human, sedation, anticholinergic, serotonergic, and boxed-warning boundaries |
| Cyclosporine | None | Two combination-therapy systemic-mastocytosis cases; isolated human mast cells; randomized CSU studies | `mast-cell-disease` | `approved-us-other`, not MCAS or CSU | No direct MCAS trial located | Implemented 2026-08-21 as broad immunosuppression, with combination-attribution and non-interchangeable-formulation limits |
| TLL-018 | None | Peer-reviewed 41-person randomized CSU pilot; no measured mast-cell effect | `related-condition` | `investigational` | `NCT05373355` completed; phase 3 `NCT06396026` active-not-recruiting with no published results | Implemented 2026-08-21 with a related-condition tag and no mast-cell-evidence grade |
| Low-dose naltrexone | Cross-sectional survey, retrospective pain subgroup, bundled case | No measured mast-cell pharmacodynamic effect | `mcas-patients`; `emerging-refractory`; `specialistUse` for Leonard B. Weinstock from the explicitly attributed bundled case | `approved-us-other`; low-dose use and MCAS are off-label | No direct MCAS interventional trial located | Implemented 2026-08-21 with formulation, self-report, concurrent-care, opioid-withdrawal, analgesia, and attribution limits |
| Hydroxyurea | Two uncontrolled case series | No measured selective mast-cell effect | `mcas-patients`; `emerging-refractory`; separate treating-author signals for Leonard B. Weinstock and Lawrence B. Afrin | `approved-us-other`, not MCAS | No direct MCAS interventional trial located | Implemented 2026-08-21 with diagnostic, selection, concurrent-treatment, cytotoxicity, and monitoring boundaries |
| Tofacitinib | Two-patient report | Broad JAK pathway rationale; no measured mast-cell effect | `mcas-patients`; `emerging-refractory` | `approved-us-other`, not MCAS | No direct MCAS interventional trial located | Implemented 2026-08-21 without a specialist tag because treating-author attribution could not be verified from the accessible primary record |
| Sunitinib | Single MCAS case | Separate aggressive-systemic-mastocytosis case with treatment-limiting toxicity | `mcas-patients`; `emerging-refractory` | `approved-us-other` for cancers, not MCAS or mastocytosis | No direct MCAS interventional trial located | Implemented 2026-08-21 as historical case-level evidence with boxed hepatotoxicity and oncology safety boundaries |
| Epinephrine | Current maintenance schema not appropriate | Regulator-backed emergency/anaphylaxis use | Separate emergency structure | `approved-us-other` relative to MCAS | No maintenance-trial field proposed | Create only in a separate emergency-intervention structure |
| Resveratrol | None | Laboratory in mature human intestinal/skin mast cells | `laboratory` | Marketed as a dietary supplement; not FDA-approved as a drug | No qualifying MCAS trial located | Implemented 2026-08-21 with mixed-model and exposure limits |
| EGCG | None | Laboratory in a human mast-cell line | `laboratory` | Marketed as a dietary supplement; not FDA-approved as a drug | No qualifying MCAS trial located | Implemented 2026-08-21 with derivative, extract, and tea distinctions preserved |
| Rosmarinic-acid-enriched Perilla extract | None | Small randomized seasonal-rhinoconjunctivitis trial; activated-human-mast-cell and mouse work | `laboratory` | Marketed as a dietary-supplement ingredient; not FDA-approved as a drug | No qualifying MCAS trial located | Implemented 2026-08-21 as a formulation-specific leaf-extract page with non-equivalence warnings |
| Curcumin | None | Randomized in allergic rhinitis, but only indirect mast-cell models | `laboratory` | Marketed as a dietary supplement; not FDA-approved as a drug | No qualifying MCAS trial located | Defer because formulation and exposure make a generic entry misleading |
| Butyrate | None | Laboratory in primary human mast cells | `laboratory` | Product and regulatory object depend on salt/prodrug/formulation | No qualifying MCAS trial located | Defer until the represented intervention is defined |
| Cinnamon/cinnamaldehyde | None | Human-mast-cell laboratory study plus randomized intranasal adjacent study | `laboratory` | Product/formulation-specific; not an FDA-approved MCAS drug | No qualifying MCAS trial located | Defer; do not bridge intranasal extract or isolated compound to generic oral cinnamon |
| Vitamin D/calcitriol | None | Human-mast-cell laboratory work and randomized allergic-rhinitis supplementation studies | `laboratory` | Dietary supplement and prescription active metabolite are different regulatory objects | No qualifying MCAS trial located | Defer until the compound and indication are separated |
| Omega-3 fatty acids | None | Laboratory with mixed mast-cell endpoints | `laboratory` | Marketed supplement products; not FDA-approved as MCAS drugs | No qualifying MCAS trial located | Defer; keep ALA, EPA, DHA, and generic fish oil distinct |

### Structural decisions already implemented in the live worktree

The 2026-08-21 reconciliation found that Claude has already implemented the
patient-facing decisions that motivated this research:

- `confoundRisk` has been removed and replaced by plain-language
  `evidenceLimits`;
- `mastCellBasis` now distinguishes MCAS-patient, other mast-cell-disease,
  an adjacent condition with measured human mast-cell effects, a related
  inflammatory condition without measured mast-cell effects, laboratory, and
  downstream-mediator rationales;
- `studyDesigns` separates human `in-vitro` work from
  `non-human-in-vitro` work, so a rat-cell experiment cannot receive the human
  mast-cell grade;
- `studyDesigns: cross-sectional` now represents one-time surveys without
  falsely calling them longitudinal cohorts;
- `treatmentContext: emerging-refractory` creates a patient-facing catalog
  group and detail-page tag separate from study design, regulatory status, and
  specialist use; the schema forbids combining it with a numbered treatment
  step;
- `establishedFor` separately lists current US/non-US approvals and conditions
  with published evaluable randomized trials;
- a randomized-trials claim requires a peer-reviewed primary report rather than
  a protocol or an unevaluable stopped trial;
- dietary supplements now display a dedicated `dietary-supplement` regulatory
  status rather than `otc`.

This is the authoritative live model as of the final 2026-08-21 reconciliation;
an earlier direct/other evidence schema existed briefly during the audit and is
not the implementation target. The remaining structural choice is the class-
representation rule for near-duplicate H1, H2, leukotriene, and local-route
products. Direct-MCAS design is still recorded as a research fact below even
when the current UI represents it through `mastCellBasis` plus prose.

## Source and verification rules

- Prefer primary trials, regulator labels, and trial registries over reviews.
- Use reviews and consensus papers to discover candidates and understand the
  evidence landscape, then trace claims to primary sources.
- Verify every PMID through NCBI E-utilities before adding it to content.
- Verify US regulatory claims against FDA sources and current labels.
- Verify trial status through ClinicalTrials.gov v2 or the sponsor, as required
  by `AGENTS.md`.
- Never copy dosing into site content.
- Do not convert trial outcomes into treatment recommendations or broad efficacy
  claims.
- Do not change `lastVerified` unless a person implementing the entry has
  actually opened and reviewed the cited sources.

## Reproducible discovery method

### Candidate-universe searches

The following exact PubMed queries were run on 2026-08-21. Counts are snapshots
and will change as PubMed is updated.

1. Direct-MCAS medication/intervention query — 229 records; every title was
   screened, and treatment-bearing records were taken to abstract or full-source
   review:

   `("mast cell activation syndrome"[Title/Abstract] OR "mast cell activation syndromes"[Title/Abstract]) AND (treat*[Title/Abstract] OR therap*[Title/Abstract] OR intervention*[Title/Abstract] OR drug*[Title/Abstract] OR pharmac*[Title/Abstract])`

2. Direct-MCAS supplement/nutraceutical query — 14 records; all titles were
   screened and relevant source papers were reviewed:

   `("mast cell activation syndrome"[Title/Abstract] OR "mast cell activation syndromes"[Title/Abstract]) AND (supplement*[Title/Abstract] OR nutraceutical*[Title/Abstract] OR vitamin*[Title/Abstract] OR flavonoid*[Title/Abstract] OR quercetin[Title/Abstract] OR luteolin[Title/Abstract] OR palmitoylethanolamide[Title/Abstract])`

3. Adjacent-condition randomized-evidence retrieval pool — 732 records. This
   deliberately broad query was used for named-candidate tracing and recent-
   literature screening, not represented as 732 fully reviewed articles:

   `(mastocytosis[Title/Abstract] OR "chronic spontaneous urticaria"[Title/Abstract] OR "idiopathic anaphylaxis"[Title/Abstract] OR "food allergy"[Title/Abstract]) AND ("mast cell"[Title/Abstract] OR IgE[Title/Abstract]) AND (randomized[Title/Abstract] OR placebo[Title/Abstract] OR trial[Title/Abstract])`

The broad query was supplemented by forward/backward citation tracing from the
landscape anchors below, candidate-name searches, and current regulator and
trial-registry searches. This matters because many older trials do not name
MCAS in their title or abstract, while a direct-MCAS query alone over-retrieves
reviews, case reports, and papers about comorbid conditions.

Search PubMed for combinations of:

- `mast cell activation syndrome` with `treatment`, `management`, `drug`,
  `pharmacotherapy`, `supplement`, and individual mediator pathways;
- `mastocytosis`, `idiopathic anaphylaxis`, `chronic spontaneous urticaria`,
  `food allergy`, and `allergic asthma` with `randomized`, `placebo`, and the
  candidate name;
- mast-cell mechanisms with candidate names, prioritizing human mast cells and
  clinically reachable exposures over isolated cell-line findings.

Current landscape anchors:

- Castells et al., MCAS and mastocytosis management review, PMID 30961835:
  https://pubmed.ncbi.nlm.nih.gov/30961835/
- AAAAI work-group report, PMID 31476322:
  https://pubmed.ncbi.nlm.nih.gov/31476322/
- Castells et al., 2024 research-needs review, PMID 38851398:
  https://pubmed.ncbi.nlm.nih.gov/38851398/
- Lee and Picard, 2025 practical approach, PMID 41272881:
  https://pubmed.ncbi.nlm.nih.gov/41272881/
- Pharmacotherapy of mast-cell disorders review, PMID 28570344:
  https://pubmed.ncbi.nlm.nih.gov/28570344/

### Candidate-screening rule

Prioritize a candidate when at least one of these is true:

- it is named in a major MCAS or mast-cell-disorder management review;
- it has direct human MCAS evidence;
- it has randomized evidence in an adjacent mast-cell-mediated or allergic
  condition and a clearly relevant mechanism;
- it has a replicated, citable mechanism in human mast cells plus a plausible
  route from that experiment to the marketed compound or formulation.

Deprioritize or reject candidates supported only by marketing pages, anecdotes,
forum consensus, animal work with no human bridge, a proprietary formulation
that is not equivalent to the named compound, or in-vitro concentrations with
no plausible human exposure.

## Existing-entry audit: confirmed findings

### Implementation matrix for the original 12 published entries

This matrix is the completion check against the live catalog. “Direct” means
the study population was labelled MCAS; it does not imply that the diagnostic
criteria or attribution were strong. Citations and limitations are expanded in
the entry-specific sections below.

| Published entry | Mechanism object | Direct MCAS evidence | Strongest related evidence | Recommended live `mastCellBasis` / `establishedFor` | Regulatory fact | Trial/status action | Implementation verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Omalizumab | Anti-IgE; reduces free IgE and downstream FcεRI expression | Systematic review of uncontrolled reports plus a newer retrospective iMCAS cohort | Randomized CSU, food-allergy, idiopathic-anaphylaxis, and mastocytosis studies | `mcas-patients`; retain US approvals and randomized-trial rows for CSU/food allergy | FDA-approved for other indications, including CSU and food allergy; not MCAS | No current direct trial field needed | Live fields are correct; optional source additions only |
| Ketotifen | H1 antagonism plus mast-cell-stabilizing activity | No qualifying direct outcome study located | Small older randomized crossover mastocytosis studies | `mast-cell-disease`; add `randomised-trials` in mastocytosis unless a direct primary MCAS report is supplied | Authorized oral product verified in Canada; US systemic approval not found | No trial field | Correct unsupported `mcas-patients` basis, add trial row and sources, and narrow country wording |
| Cromolyn sodium | Mast-cell stabilizer with incompletely defined molecular mechanism | Five-person retrospective MCAS/ME-CFS case series | Randomized systemic/cutaneous mastocytosis studies | Keep `mast-cell-disease`, or use `mcas-patients` only if the five-person report clears the editorial bar; add `randomised-trials` in mastocytosis | US oral label is for mastocytosis, not MCAS | No active trial field | Add primary trial; decide whether the mixed-diagnosis series changes the basis; correct “only” and GI-only wording |
| Masitinib | KIT/LYN/FYN tyrosine-kinase inhibition | Randomized direct-MCAS protocol without reported results | Published randomized mastocytosis study | `mast-cell-disease`; add `randomised-trials` in indolent systemic mastocytosis | Investigational; EMA has refused human marketing applications, including mastocytosis | Track `NCT05449444` and `NCT04333108` separately; both `UNKNOWN` | Add the missing trial row and primary study; do not call either registry trial ongoing |
| Cetirizine | H1 receptor antagonism | No direct outcome study located | Randomized chronic-urticaria studies | `downstream`; retain approval row and `randomised-trials` in CSU | US nonprescription drug; indication is not MCAS | No trial field | Live fields are correct but the primary trial and drug label are missing; soften no-sedation and treatment-directed prose |
| Montelukast | Cysteinyl-leukotriene receptor antagonism | No direct controlled study located | Randomized urticaria studies/meta-analysis | `downstream`; retain approval rows and add `randomised-trials` in chronic urticaria | FDA-approved for other indications; boxed warning applies | No trial field | Add primary trial and current label; retain separate safety fact |
| Famotidine | H2 receptor antagonism | No direct controlled study located | Very small randomized active-comparator acute-urticaria study | `downstream`; retain approval rows and add `randomised-trials` in acute urticaria | US nonprescription drug for acid-related indications, not MCAS | No trial field | Current claim of no related evidence is false; add the primary trial and current label |
| Diamine oxidase | Intended luminal degradation of dietary histamine | No direct MCAS study located | Randomized CSU and histamine-provocation studies; histamine-intolerance pilot | `downstream`; add `randomised-trials` in CSU and, if retained, label the histamine-provocation context precisely | Dietary-supplement products are not FDA-approved drugs | No result-bearing direct trial | Live regulatory field is correct; add primary trials and retain gut/tissue boundary |
| Avapritinib | Selective KIT D816V inhibition | No direct MCAS outcome study located | Randomized indolent systemic-mastocytosis study | `mast-cell-disease`; retain approval rows and `randomised-trials` in indolent systemic mastocytosis | FDA-approved for systemic mastocytosis, not MCAS | `NCT03731260` remains `ACTIVE_NOT_RECRUITING`; registry status date 2025-09 | Live fields are correct; replace the false “first agent” and categorical disease wording |
| Luteolin | Flavonoid effects in human mast-cell models across several pathways | None | No controlled human outcome study of an equivalent plain formulation located | `laboratory`; keep `establishedFor: []` | Dietary supplement, not FDA-approved as a drug | No qualifying trial | Live fields are correct; cite primary models and correct the “not even mast cells” claim |
| Quercetin | Flavonoid effects in human mast-cell models, including FcεRI/MRGPRX2-related endpoints | None | Small open-label non-MCAS pilots, not controlled MCAS outcomes | `laboratory`; keep `establishedFor: []` | Dietary supplement, not FDA-approved as a drug | No qualifying trial | Live fields are correct; add primary sources and correct “no human data in any condition” |
| Palmitoylethanolamide | Fatty-acid amide with proposed indirect mast-cell pathways, mostly preclinical | A direct randomized study terminated after two participants with no interpretable comparison | Combination-product IBS RCT is not evidence for plain PEA | `laboratory`; keep `establishedFor: []` | Dietary supplement; not FDA-approved as an MCAS drug | `NCT05652907` `TERMINATED`, results posted but non-evaluable; proposed Australian successor withdrawn | Live fields are correct; add a primary mechanistic source and trial-status context |

### Schema-gate reconciliation completed 2026-08-21

The shared-worktree migration added a valid rule that every approval row needs
a drug-label citation and every randomized-trials row needs a peer-reviewed
primary report. During that migration, `npm run validate` initially stopped at
avapritinib. The table below records the implementation queue found at that
point; it is an audit trail, not a list of current failures. The current full
validation gate passes.

| Entry | Gap identified during migration | Implementation-ready authoritative source |
| --- | --- | --- |
| Avapritinib | Three US approval rows, no `drug-label` citation | Current DailyMed AYVAKIT label below |
| Cetirizine | US approval row without a label; CSU randomized-trials row has reviews but no primary report | Current DailyMed OTC label; PMID 8893110 |
| Cromolyn | US mastocytosis approval row without a label; randomized mastocytosis row still needs to be added | Current DailyMed label; PMID 2110198 |
| Famotidine | US approval rows without a label; acute-urticaria randomized row and primary report still need to be added | Current DailyMed OTC label; PMID 10844490 |
| Ketotifen | US ophthalmic and non-US oral approval rows without label/regulator citations; mastocytosis randomized row and primary reports still need to be added | Current DailyMed ophthalmic label; Health Canada oral product record; PMIDs 6341102 and 2654254 |
| Masitinib | Randomized mastocytosis row and primary report are absent | PMID 28069279; keep regulatory status investigational and registry records separate |
| Montelukast | Three US approval rows without a label; chronic-urticaria randomized row and primary report still need to be added | Current DailyMed label; PMID 11678862; FDA boxed-warning communication |
| Omalizumab | No schema-source gap identified | Current FDA label plus the three primary trials already present |
| DAO | Randomized CSU/provocation rows and primary reports are absent | PMIDs 29698966 and 21165702 |
| Luteolin, quercetin, PEA | No current `establishedFor` gate gap; primary mechanism citations are still editorially needed | Primary sources in their sections below |

The current validator checks only that an entry has *some* drug label or
peer-reviewed citation; it does not bind a citation to the specific condition
row it supports. Claude should still make each row source-auditable, and a
future schema could add citation IDs to `establishedFor` to enforce that
relationship.

### Omalizumab (Xolair) — patient/established-condition split now correct

The live entry now implements the intended model: `mastCellBasis:
mcas-patients`, with separate approval and randomized-trial rows for CSU and
IgE-mediated food allergy. This resolves the confusing high-confound
presentation without overstating the direct MCAS literature. The broader source
set below remains useful if Claude wants to strengthen or expand the citations.

Primary sources verified through PubMed/E-utilities:

- Multiple-food-allergy RCT, PMID 38407394:
  https://pubmed.ncbi.nlm.nih.gov/38407394/
- CSU phase 3 RCT, PMID 23432142:
  https://pubmed.ncbi.nlm.nih.gov/23432142/
- ASTERIA I CSU RCT, PMID 25046337:
  https://pubmed.ncbi.nlm.nih.gov/25046337/
- Idiopathic-anaphylaxis RCT, PMID 33220353:
  https://pubmed.ncbi.nlm.nih.gov/33220353/
- XOLMA mastocytosis study, PMID 31958790:
  https://pubmed.ncbi.nlm.nih.gov/31958790/
- ROAM mastocytosis RCT, PMID 37088371:
  https://pubmed.ncbi.nlm.nih.gov/37088371/
- Direct-MCAS systematic review already cited, PMID 39741373:
  https://pubmed.ncbi.nlm.nih.gov/39741373/
- Retrospective 21-person idiopathic-MCAS management cohort, PMID 40624779:
  https://pubmed.ncbi.nlm.nih.gov/40624779/
- Primary human mechanistic study of reduced basophil FcεRI expression after
  lowering free IgE, PMID 15356552:
  https://pubmed.ncbi.nlm.nih.gov/15356552/
- FDA food-allergy approval announcement:
  https://www.fda.gov/news-events/press-announcements/fda-approves-first-medication-help-reduce-allergic-reactions-multiple-foods-after-accidental

Current 2026 FDA label, including food allergy and CSU randomized studies:
https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/103976s5253lbl.pdf

Keep `regulatory: approved-us-other`; Xolair is not FDA-approved for MCAS.

### Ketotifen — direct claim unsupported; related randomized evidence missing

The entry currently cites reviews but omits randomized mastocytosis studies:

- Double-blind crossover study in urticaria pigmentosa, PMID 6341102:
  https://pubmed.ncbi.nlm.nih.gov/6341102/
- Double-blind, placebo-controlled crossover comparison in pediatric
  mastocytosis, PMID 2654254:
  https://pubmed.ncbi.nlm.nih.gov/2654254/

These support an `establishedFor` row with `basis: randomised-trials` in
mastocytosis. Interpret the small, old studies narrowly; randomized design does
not make them MCAS trials. The live `mastCellBasis: mcas-patients` should be
changed to `mast-cell-disease` unless Claude can supply and verify a primary
direct-MCAS outcome report.

### Cromolyn sodium — mast-cell basis correct, pivotal source and trial row missing

The live `mastCellBasis: mast-cell-disease` is appropriate, but the current
entry cites two reviews rather than the trial that supports it and omits the
corresponding `establishedFor` randomized-trials row:

- Multicenter double-blind placebo-controlled systemic-mastocytosis trial,
  PMID 2110198:
  https://pubmed.ncbi.nlm.nih.gov/2110198/

A 2026 five-person retrospective case series in patients labelled with both
MCAS and ME/CFS used a nonstandard continuous oral regimen, PMID 41728426:
https://pubmed.ncbi.nlm.nih.gov/41728426/

This is direct-MCAS case-series evidence, but it is uncontrolled, extremely
small, comorbidity-specific, and does not justify publishing administration
instructions. Claude must decide whether five jointly diagnosed cases clear the
site's bar for `mastCellBasis: mcas-patients`; otherwise retain
`mast-cell-disease`. The older randomized mastocytosis study remains the cleaner
support for an `establishedFor` randomized-trials row.

Add the primary mastocytosis study or the randomized field is not auditable
from the entry's citations.

### Masitinib — mast-cell basis correct, pivotal source and trial row missing

The current entry cites reviews and a later registry record but omits the
published phase 3 randomized trial in indolent systemic mastocytosis:

- PMID 28069279:
  https://pubmed.ncbi.nlm.nih.gov/28069279/

ClinicalTrials.gov v2 verification on 2026-08-20 found two distinct records:

- `NCT05449444` is the directly relevant phase 2 randomized,
  double-blind, placebo-controlled MCAS study:
  https://clinicaltrials.gov/study/NCT05449444
- `NCT04333108`, which the current entry tracks, is a separate phase 3 study in
  severe indolent or smouldering systemic mastocytosis:
  https://clinicaltrials.gov/study/NCT04333108

Both API records currently return overall status `UNKNOWN`; their last registry
verification dates are 2023-02 and 2023-05 respectively, and neither record
posts results. Do not describe either as ongoing. If the schema allows only one
trial, the direct MCAS record is more relevant; a better long-term design would
allow multiple explicitly labelled trials. The completed published phase 3
mastocytosis trial is `NCT00814073`:
https://clinicaltrials.gov/study/NCT00814073

### Cetirizine — related field correct, primary source and prose need repair

The current sources are reviews. A clean primary citation is:

- Multicenter randomized double-blind placebo-controlled chronic-urticaria
  trial, PMID 8893110:
  https://pubmed.ncbi.nlm.nih.gov/8893110/

Other verified RCTs exist (PMIDs 7622644, 1827614, and 1681778), but one strong
representative primary trial is probably sufficient alongside the management
review.

The summary phrase “without the sedation profile of first-generation agents”
is too categorical. Current US OTC labeling explicitly warns that drowsiness
may occur:
https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=b92d959d-dd35-b2a3-e053-2995a90af3ff&version=4

Describe cetirizine as second-generation, or say it is generally less sedating
than many first-generation agents, without implying absence of sedation.

The live `evidenceLimits` sentence that H1 blockade “helps” and is “an argument
for trying it” is also treatment-directed efficacy language. Replace it with a
design boundary: the randomized results concern chronic urticaria/allergic
rhinitis and do not establish an outcome in MCAS.

### Montelukast — related context and primary source should be strengthened

Verified adjacent evidence:

- Systematic review and meta-analysis of randomized trials of leukotriene
  receptor antagonists added to antihistamines in urticaria, PMID 38852861:
  https://pubmed.ncbi.nlm.nih.gov/38852861/
- Randomized double-blind placebo-controlled montelukast/cetirizine study in
  chronic urticaria, PMID 11678862:
  https://pubmed.ncbi.nlm.nih.gov/11678862/

Direct MCAS evidence remains limited. The entry should say that plainly without
discarding the adjacent RCT evidence. Keep `mastCellBasis: downstream` and add
an `establishedFor` row with `basis: randomised-trials` and condition `chronic
urticaria`; this is closer to the site's mast-cell remit than the currently
listed approval indications but remains separate from MCAS.

### Famotidine — current “no related evidence” statement is false

Verified primary source:

- Prospective randomized double-blind controlled trial in acute urticaria,
  PMID 10844490:
  https://pubmed.ncbi.nlm.nih.gov/10844490/

This was a very small active-comparator study, not an MCAS trial. It supports an
`establishedFor` row with `basis: randomised-trials` and condition `acute
urticaria`; it does not change `mastCellBasis: downstream`. At minimum, the
live sentence saying there is no controlled evidence in a closely related
condition must be removed.

`regulatory: otc` is correct for famotidine as a nonprescription US drug. The
current OTC indication is acid reduction/heartburn, not MCAS:
https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=381db08e-5756-4255-8202-1d8e6a1cf038

### Diamine oxidase (DAO) — related field and citations are incomplete

Verified evidence outside MCAS:

- Randomized double-blind placebo-controlled crossover study in CSU,
  PMID 29698966:
  https://pubmed.ncbi.nlm.nih.gov/29698966/
- Randomized double-blind placebo-controlled crossover histamine-provocation
  study, PMID 21165702:
  https://pubmed.ncbi.nlm.nih.gov/21165702/
- Open-label interventional pilot in histamine intolerance, PMID 31807350:
  https://pubmed.ncbi.nlm.nih.gov/31807350/
- A larger randomized study is currently represented by a protocol rather than
  results, PMID 39796463:
  https://pubmed.ncbi.nlm.nih.gov/39796463/

The biological boundary in the existing entry remains important: oral DAO is
intended to act on dietary histamine in the gut, not on histamine released into
tissues by mast cells. Keep `mastCellBasis: downstream`; add an
`establishedFor` randomized-trials row for CSU and, if the provocation study is
displayed, name its suspected-histamine-intolerance/provocation context
precisely. This must not imply equivalence between histamine intolerance, CSU,
and MCAS.

### Avapritinib — wording issue to correct

The pivotal PATHFINDER/PIONEER source already appears valid, including PMID
38320129. However, the summary calls avapritinib “the first agent in mast cell
disease supported by a placebo-controlled randomised trial.” That statement is
too broad: placebo-controlled mastocytosis studies of cromolyn and ketotifen
predate it by decades. Research a narrower, supportable description before
Claude edits the summary, such as distinguishing a selective KIT D816V-targeted
agent or a disease-modifying trial in indolent systemic mastocytosis.

Current FDA-submitted label verification:

- The current DailyMed record covers advanced and indolent systemic
  mastocytosis:
  https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=645c887c-8cd4-4623-8da9-ac223d71a8b9

Therefore `approved-us-other` is correct relative to MCAS. “Other” must remain
visible: FDA approval for systemic mastocytosis is not approval for MCAS.

The live `evidenceLimits` statement that MCAS is “by definition not” systemic
mastocytosis is also too categorical. Consensus classifications include
primary/clonal MCAS and recognize mastocytosis accompanied by mast-cell
activation; the randomized ISM result still must not be generalized to
idiopathic or non-clonal MCAS. Use that narrower transferability boundary:

- Consensus classification, PMID 22041891:
  https://pubmed.ncbi.nlm.nih.gov/22041891/
- ECNM-AIM global classification, PMID 35623575:
  https://pubmed.ncbi.nlm.nih.gov/35623575/

### Cromolyn sodium — regulatory wording also needs correction

The current US oral label is for mastocytosis, and the FDA-label display says
the evidence included four randomized controlled trials in cutaneous or
systemic mastocytosis:

- Current DailyMed drug record:
  https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d208df15-c823-6e0d-e053-2a95a90ad1be
- FDA-label display with trial description:
  https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=61c9cb85-129e-4490-b5f7-357307fcecbf&type=display

The existing phrase “only oral formulation carrying a US mast cell disease
label” is ambiguous and appears false if read literally, because oral
avapritinib is FDA-approved for systemic mastocytosis. Narrow the statement to
the intended distinction, if supportable, rather than preserving “only.”

The body also says minimal absorption is why the labelled use is directed at
gastrointestinal rather than systemic mast-cell involvement. The label does not
make that narrow claim: it is indicated for management of mastocytosis and
lists both gastrointestinal and non-gastrointestinal manifestations. Replace
the causal interpretation with the simpler verified facts—minimal oral
absorption and a mastocytosis indication—unless a source explicitly supports a
more specific inference.

An inhaled high-concentration cromolyn formulation, PA101, should remain a
formulation-specific research note rather than evidence for every cromolyn
product:

- `NCT02478957` was a randomized crossover study in indolent systemic
  mastocytosis. It is `COMPLETED`, enrolled 41 participants, and has no posted
  registry results:
  https://clinicaltrials.gov/study/NCT02478957
- The published PA101 paper is a phase 1 pharmacokinetic/bioavailability study,
  not the missing randomized outcome report, PMID 32944204:
  https://pubmed.ncbi.nlm.nih.gov/32944204/

Do not infer the randomized study's result from completion status, and do not
merge inhaled PA101 evidence with the US oral mastocytosis product.

### Ketotifen — non-US regulatory claim needs narrowing

Health Canada's current Drug Product Database lists authorized oral ZADITEN
tablets:
https://health-products.canada.ca/dpd-bdpp/info?code=10832&lang=eng&wbdisable=true

The US approval row concerns the ophthalmic product only; a current DailyMed
label supports that route and indication:
https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f4dd2b53-c2f2-4c5a-8eb0-c96d79cf419c

This supports `approved-non-us`. A current official source for the existing UK
oral-approval claim has not yet been verified; current UK searches primarily
surface ophthalmic products. Prefer the verified Canada claim unless a current
UK regulator record is opened.

### Montelukast — regulatory and safety status verified

`approved-us-other` is correct: its US approvals are for asthma and allergic
rhinitis-related indications, not MCAS. Add the current DailyMed label as the
`drug-label` citation required by the approval rows:
https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=d7870c45-5a8b-8369-e053-2a95a90ae1f3&version=4

The current boxed-warning note is supported separately by FDA:
https://www.fda.gov/drugs/drug-safety-communications/fda-requires-boxed-warning-about-serious-mental-health-side-effects-asthma-and-allergy-drug

### Luteolin — laboratory field retained, stronger primary sources needed

The strongest directly relevant sources located so far are experiments in
human mast-cell models, not MCAS clinical trials:

- LADR human mast-cell line comparison with cromolyn, PMID 38588651:
  https://pubmed.ncbi.nlm.nih.gov/38588651/
- Human umbilical-cord-blood-derived mast cells, PMID 18806808:
  https://pubmed.ncbi.nlm.nih.gov/18806808/
- LAD2 and primary human cord-derived mast cells, PMID 25498791:
  https://pubmed.ncbi.nlm.nih.gov/25498791/

The last paper studies both luteolin and methoxyluteolin; it must not be used to
imply that tetramethoxyluteolin is interchangeable with plain luteolin. The
experiments also use micromolar concentrations and include animal work, so they
do not establish clinical exposure or MCAS effects. The current entry's
TNF-stimulated keratinocyte passage is less direct than these mast-cell sources
and should not carry the mechanistic rationale by itself.

One small human publication used a proprietary topical
tetramethoxyluteolin/olive-extract lotion, not plain oral luteolin, PMID
28480804:
https://pubmed.ncbi.nlm.nih.gov/28480804/

It reports a tolerability questionnaire in 25 people labelled with mastocytosis
or MCAS and a separate uncontrolled use series in eight people with atopic
dermatitis or psoriasis. It is not a controlled MCAS outcome study, combines
ingredients, uses a distinct derivative and route, and carries inventor/patent
conflicts. Keep it as a formulation-specific boundary rather than a clinical
bridge for generic luteolin.

Keep `mastCellBasis: laboratory` and `establishedFor: []`. The live claim that
the most specific data are “not even in mast cells” is contradicted by the
three primary mast-cell papers above.

### Quercetin — laboratory field retained with model/exposure caveats

Verified primary sources:

- Cultured human mast cells plus two small open-label human pilots, PMID
  22470478:
  https://pubmed.ncbi.nlm.nih.gov/22470478/
- Human umbilical-cord-derived mast cells, PMID 15912140:
  https://pubmed.ncbi.nlm.nih.gov/15912140/
- HMC-1 mast-cell line, PMID 17191106:
  https://pubmed.ncbi.nlm.nih.gov/17191106/
- Human mast-cell IL-6 signalling experiments, PMID 16532021:
  https://pubmed.ncbi.nlm.nih.gov/16532021/
- Newer LAD2/MRGPRX2 mechanism, PMID 39398230:
  https://pubmed.ncbi.nlm.nih.gov/39398230/

PMID 22470478 does not justify the headline conclusion that quercetin is
clinically “more effective than cromolyn”: much of the comparison is in vitro,
while the human portions are small open-label pilots. PMID 36235240 is an
important counterweight because quercetin and resveratrol effects varied across
mast-cell models, with some mouse-cell findings associated with reduced cell
viability:
https://pubmed.ncbi.nlm.nih.gov/36235240/

Keep `mastCellBasis: laboratory` and `establishedFor: []`; explicitly
distinguish cell models, open-label pilot observations, formulation, and
achievable exposure. Because PMID 22470478 contains small
open-label human pilots outside MCAS, the live claim “No human outcome data ...
in any condition” is false. It can accurately say there are no controlled human
MCAS outcomes and that the non-MCAS pilots cannot establish causation.

The live entry also states a numerical laboratory concentration. Even though it
is an experimental exposure rather than a clinical regimen, it may conflict
with the site's categorical no-dosing policy and is unnecessary for the reader;
describe the exposure/translation gap without publishing a number.

### Palmitoylethanolamide (PEA) — laboratory field retained, evidence is indirect

The current citations are reviews. Relevant primary studies found so far have
substantial boundaries:

- PEA reduced substance-P-induced activation in RBL-2H3 rat basophilic
  leukemia cells through a proposed DAGL/2-AG/CB2 pathway, PMID 31878942:
  https://pubmed.ncbi.nlm.nih.gov/31878942/
- A randomized IBS trial used a combination of PEA plus polydatin, not plain
  PEA, and assessed mucosal mast-cell counts and symptoms, PMID 28164346:
  https://pubmed.ncbi.nlm.nih.gov/28164346/

Do not treat a proprietary or combination PEA/polydatin result as evidence for
plain PEA, and do not describe the RBL-2H3 result as a human mast-cell study.
PMID 28336953 involves microglia and human macrophages rather than primary mast
cells:
https://pubmed.ncbi.nlm.nih.gov/28336953/

Keep `mastCellBasis: laboratory` and `establishedFor: []`, but make clear that
the primary mast-cell bridge is preclinical and model-dependent.

A direct idiopathic-MCAS trial exists but produced no interpretable treatment
comparison:

- `NCT05652907` was designed as a phase 2 randomized, quadruple-masked,
  placebo-controlled study of the proprietary ultramicronized-PEA product
  FSD201 for chronic nociplastic pain associated with idiopathic MCAS:
  https://clinicaltrials.gov/study/NCT05652907
- ClinicalTrials.gov now posts results. The trial was terminated after only two
  participants enrolled; one received FSD201 and did not complete, and one
  received placebo. The registry explicitly says the intervention effect cannot
  be determined. Termination was reported as a business decision.
- The treatment participant's events cannot be interpreted as rates or causal
  effects with a denominator of one, but they also must not be hidden if the
  registry is summarized.

This does **not** justify an RCT evidence badge. It is an RCT design that failed
to generate evaluable evidence, and it studied an ultramicronized proprietary
formulation rather than every product sold as plain PEA.

Implementation action: keep `establishedFor: []` and add a `trial` block for
`NCT05652907` with status `terminated` only if Claude also adds the registry
citation and independently opens the live record when setting the verification
date. The trial block communicates the failed direct study without converting
it into an established-condition claim.

A proposed successor, FSD202, appears in the Australian registry as
`ACTRN12625000665437`; the current Australian government search result labels
it `Withdrawn`, despite earlier sponsor announcements describing planned
recruitment. Use the registry status, not the older announcement:
https://www.australianclinicaltrials.gov.au/anzctr-search-results

### Supplement evidence-field audit — current conclusion

The cited PMIDs and titles resolve correctly through E-utilities. The direct
supplement query and candidate-specific human-study searches did not identify a
controlled MCAS outcome study for luteolin, quercetin, DAO, or plain PEA. The
live `mastCellBasis: laboratory` is appropriate for luteolin, quercetin, and
PEA; DAO is correctly `downstream`, but its controlled human evidence outside
MCAS should appear as tightly named `establishedFor` randomized-trials rows.
The implementation must preserve the documented formulation, route, cell-model,
and exposure boundaries; proprietary derivatives and combination products are
not interchangeable with the plain compounds.

## Existing citation-integrity check

Re-run on 2026-08-21 against the current worktree:

- all 149 unique PubMed IDs appearing in this handoff or the live treatment
  frontmatter resolved through NCBI ESummary;
- all 26 live frontmatter citation records carrying a PMID had a publication
  year consistent with NCBI metadata;
- one live title is descriptive rather than exact: omalizumab PMID 25046337 is
  stored as “Efficacy and safety of omalizumab in patients with chronic
  idiopathic/spontaneous urticaria who remain symptomatic on H1 antihistamines
  (ASTERIA I).” NCBI's exact article title ends “: a randomized,
  placebo-controlled study.” Use the exact title and put `ASTERIA I` elsewhere
  if study-name display is desired;
- all 32 unique ClinicalTrials.gov identifiers in this handoff or the live
  catalog resolved through the v2 API, and the status, enrollment, and posted-
  results facts recorded below matched the live records;
- all 36 non-PubMed/non-ClinicalTrials official URLs in the handoff resolved
  during source review, and the new ketotifen/montelukast labels were opened
  separately from the later bulk recheck.

Identifier, metadata, status, and link checks do not by themselves authorize a
`lastVerified` change. This research pass did not modify any published content
or any `lastVerified`/`accessed` date.

## Unlisted medication discovery queue

### Priority A: named in mainstream mast-cell-disorder management literature

Research these first:

- **Epinephrine** — acute mediator-response treatment named in major MCAS
  management sources. Decide whether an emergency intervention belongs in this
  reference index without turning the entry into treatment instructions.
- **Aspirin** — mediator-synthesis inhibition through cyclooxygenase blockade;
  specifically discussed for prostaglandin-driven mast-cell symptoms. Requires
  exceptionally careful safety framing because NSAIDs can themselves provoke
  reactions in some patients.
- **Zileuton** — 5-lipoxygenase inhibitor that blocks leukotriene synthesis;
  named in mast-cell-disorder management reviews and FDA-approved for another
  indication. Direct MCAS evidence needs verification.
- **Systemic corticosteroids** — mentioned for prolonged or refractory acute
  episodes. Decide whether the site's scope should include broad rescue drugs
  with substantial nonspecific effects.
- **Hydroxyzine** — first-generation H1 antihistamine with a randomized
  pediatric-mastocytosis comparison (PMID 2654254). Decide whether the site
  lists representative drugs or every clinically distinct H1 agent.

### Priority A screening results

#### Aspirin — live entry added 2026-08-21; direct evidence is observational

Mechanism: cyclooxygenase inhibition reduces prostaglandin synthesis. This is a
mediator-synthesis intervention, not a mast-cell stabilizer.

Verified direct and adjacent sources:

- Retrospective MCAS cohort in which a subgroup with an elevated urinary PGD2
  metabolite received aspirin, PMID 25439370:
  https://pubmed.ncbi.nlm.nih.gov/25439370/
- Retrospective ten-patient systemic-mastocytosis analysis showing reduced PGD2
  metabolite alongside a large rise in leukotriene metabolite in most patients,
  PMID 34029712:
  https://pubmed.ncbi.nlm.nih.gov/34029712/
- Double-blind placebo-controlled aspirin challenge in mastocytosis assessed
  hypersensitivity rather than treatment effects, PMID 29569284:
  https://pubmed.ncbi.nlm.nih.gov/29569284/
- Major management review naming aspirin for mediator-synthesis inhibition,
  PMID 30961835:
  https://pubmed.ncbi.nlm.nih.gov/30961835/

Verdict: the live entry uses `mastCellBasis: mcas-patients` because the candidate
clears the evidence bar through direct observational MCAS exposure. Its
limitations keep the small selected subgroup, absence of a comparator,
leukotriene-metabolite rise, and OTC reaction and bleeding warnings together.
It is not presented as a selection rule or instruction.

- Current DailyMed OTC monograph label supporting the regulatory and warning
  facts:
  https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c550b92e-de54-4599-9534-bd3022b0a86d

#### Hydroxyzine — include only if first-generation H1 drugs get a class slot

- Pediatric mastocytosis double-blind placebo-controlled crossover comparison,
  PMID 2654254:
  https://pubmed.ncbi.nlm.nih.gov/2654254/
- Current US label includes histamine-mediated pruritus and chronic urticaria:
  https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=6a1a48ac-8ad5-4363-b298-d9825ae2a448

Verdict: direct MCAS evidence `none`, other evidence `randomized` in pediatric
mastocytosis, and `regulatory: approved-us-other`. It is pharmacologically
distinct enough from cetirizine to represent first-generation H1 agents, but do
not create separate pages for every H1 drug without a class-representation
policy.

#### Zileuton — implemented with adjacent human pharmacodynamic evidence

Zileuton inhibits 5-lipoxygenase and therefore leukotriene synthesis, whereas
montelukast blocks one leukotriene receptor. It is named in the MCAS management
review (PMID 30961835). Targeted searches located no direct MCAS outcome study,
but did locate an eight-person randomized, double-blind crossover study in
aspirin-sensitive asthma that measured nasal tryptase, histamine, and
leukotrienes after aspirin challenge (PMID 7798537), plus a 2025 mouse oral-
anaphylaxis mechanism paper (PMID 40773543).

- Current label identifies zileuton as a 5-lipoxygenase inhibitor approved for
  asthma, not MCAS:
  https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fd382540-b390-4e86-a94a-988ea89c93a8

Verdict: implemented with `mastCellBasis: mast-cell-mediated-condition`, an
adjacent randomized-trials row for the aspirin-sensitive-asthma nasal
challenge, and `regulatory: approved-us-other`. This basis reflects the measured
human tryptase change, not direct MCAS evidence. The page keeps hepatic
monitoring, neuropsychiatric warnings, and interaction boundaries visible.

#### Epinephrine — include in an emergency-intervention structure

Major consensus/practical sources name epinephrine for acute anaphylaxis or
acute mast-cell-activation episodes (PMIDs 30961835 and 41272881). The current
FDA label is for allergic emergencies/anaphylaxis:
https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/020800s054lbl.pdf

Verdict: clearly in scope clinically, but the current chronic-treatment evidence
schema is the wrong presentation. Prefer a distinct emergency-intervention
category with regulator-backed language and no dosing over forcing epinephrine
into evidence fields designed for maintenance therapies.

#### Systemic corticosteroids — defer from the core index

The management review names corticosteroids for prolonged acute episodes but
not as a mast-cell-specific intervention. Their broad immunologic action,
heterogeneous agents, and acute/rescue context make a single supplement-like
entry misleading. Reconsider only if an acute/interventional class is added.

#### Hydroxychloroquine — direct evidence exists but is a four-person mixed
case series

Hydroxychloroquine has broad lysosomal and immunomodulatory actions. A small
paper combined mechanistic experiments in primary human mast cells with four
clinical cases: two people labelled with MCAS and two with cutaneous
mastocytosis.

- Mixed four-person clinical/mechanistic report, PMID 30004016:
  https://pubmed.ncbi.nlm.nih.gov/30004016/
- Current US label; approved indications are malaria, rheumatoid arthritis, and
  lupus, not MCAS or mastocytosis:
  https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=34496b43-05a2-45fb-a769-52b12e099341&type=display

No direct randomized study or current MCAS trial was located. Verdict:
direct MCAS evidence `case-report` (four cases, only two labelled MCAS) and
`regulatory: approved-us-other`. Keep below aspirin and the established
antimediator classes. If added, the limitations need to identify the mixed
population, absence of a comparator, and current label warnings rather than
presenting the in-vitro lysosomal mechanism as clinical proof.

#### Tranilast — implemented oral non-US mast-cell-stabilizer entry

Tranilast is an oral antiallergic drug with several proposed actions, including
effects on mast-cell mediator release and calcium handling. The precise
mechanism should not be reduced to a single established molecular target.

- Large older double-blind controlled perennial-allergic-rhinitis comparison,
  PMID 6205614:
  https://pubmed.ncbi.nlm.nih.gov/6205614/
- Rat mast-cell mediator-release mechanism study, PMID 2452912:
  https://pubmed.ncbi.nlm.nih.gov/2452912/
- Rat-mast-cell patch-clamp/exocytosis study, PMID 26741745:
  https://pubmed.ncbi.nlm.nih.gov/26741745/
- Current Japanese PMDA prescribing information for RIZABEN:
  https://www.pmda.go.jp/PmdaSearch/iyakuDetail/230034_4490002C1123_1_09

No direct MCAS outcome study was located. PubMed classifies PMID 6205614 as a
controlled clinical trial, not a randomized controlled trial; the live entry
therefore does not convert its double-blind design into a randomized badge.
Verdict: implemented with `mastCellBasis: laboratory` and `regulatory:
approved-non-us`. The regulatory and safety discussion is tied to the current
Japanese product rather than extrapolated from supplement or compounding
claims.

#### Suplatast tosilate — authorized oral Japanese antiallergic, but not a
direct MCAS stabilizer trial

Suplatast tosilate is described in the Japanese product information as an oral
antiallergic drug and in clinical papers as a Th2-cytokine inhibitor. Animal
mast-cell work also reports reduced degranulation and histamine release, but the
clinical mechanism should not be simplified to proven direct mast-cell
stabilization.

- Double-blind randomized asthma study, PMID 11071181:
  https://pubmed.ncbi.nlm.nih.gov/11071181/
- Smaller double-blind randomized cough-variant-asthma study, PMID 12107601:
  https://pubmed.ncbi.nlm.nih.gov/12107601/
- Randomized allergic-rhinitis active-comparator study, PMID 18070163:
  https://pubmed.ncbi.nlm.nih.gov/18070163/
- Rat type-I-allergy/mast-cell study, PMID 1282894:
  https://pubmed.ncbi.nlm.nih.gov/1282894/
- Current PMDA patient guide confirming an authorized oral Japanese product:
  https://www.info.pmda.go.jp/downfiles/guide/ph/400107_4490016R1020_1_00G.pdf

No direct MCAS or mastocytosis outcome study was located. Verdict:
direct MCAS evidence `none`, other evidence `randomized` in asthma/rhinitis, and
`regulatory: approved-non-us`, but lower priority than tranilast because its
best clinical evidence is in asthma/rhinitis and the proposed mast-cell link is
less direct. Keep as a documented candidate unless the index intentionally
includes non-US oral antiallergics with distant adjacent evidence.

#### Nedocromil — real stabilizer, wrong route and availability for the core
index

Nedocromil is a mast-cell stabilizer with randomized evidence in allergic
asthma, including:

- Double-blind randomized allergic-asthma comparison, PMID 8111606:
  https://pubmed.ncbi.nlm.nih.gov/8111606/
- Double-blind randomized placebo-controlled pediatric atopic-asthma study,
  PMID 11421896:
  https://pubmed.ncbi.nlm.nih.gov/11421896/

The US approval record and label located are for an ophthalmic product used in
allergic conjunctivitis, not a systemic or oral MCAS intervention:
https://www.accessdata.fda.gov/drugsatfda_docs/nda/99/021009_ALOCRIL%202%25_APPROV.PDF
https://dailymed.nlm.nih.gov/dailymed/search.cfm?adv=1&labeltype=human&query=NEDOCROMIL

Verdict: direct MCAS evidence `none`, other evidence `randomized` in allergic
asthma, and historically `regulatory: approved-us-other`, but defer a core entry
because the cited clinical evidence and available formulations are local
airway/ocular interventions rather than a coherent systemic MCAS product. An
FDA approval record does not itself establish present commercial availability.

#### Other local-route stabilizers/dual antihistamines — class-level defer

Olopatadine, azelastine, lodoxamide, pemirolast, epinastine, and related local
products recur in mast-cell-stabilizer reviews. They have real randomized
allergic-conjunctivitis or allergic-rhinitis evidence, but the evidence object
is an ophthalmic or intranasal formulation rather than a systemic MCAS drug.
Representative primary sources are:

- Olopatadine randomized human conjunctival-allergen-challenge mechanism study,
  PMID 14667955:
  https://pubmed.ncbi.nlm.nih.gov/14667955/
- Azelastine randomized perennial-allergic-rhinitis study, PMID 37920410:
  https://pubmed.ncbi.nlm.nih.gov/37920410/
- Lodoxamide randomized conjunctival-allergen-challenge study, PMID 9160033:
  https://pubmed.ncbi.nlm.nih.gov/9160033/
- FDA pemirolast ophthalmic label, which explicitly identifies a topical mast-
  cell stabilizer:
  https://www.accessdata.fda.gov/drugsatfda_docs/label/pediatric/Pemirolast.pdf

Verdict: direct MCAS evidence `none` and other evidence `randomized` in the named
local allergic condition; regulatory status must be checked product by product.
Do not create systemic MCAS pages. Olopatadine ophthalmic solution and
azelastine nasal spray are now implemented as formulation-specific local-route
objects. This also explains why azelastine should not be added as another
systemic H1 page under the current class rule.

#### Doxepin — oral H1/H2 antagonist with a non-human mast-cell experiment

Doxepin is a tricyclic antidepressant with strong H1 and H2 receptor-antagonist
activity. The represented object is the oral capsule; topical cream and
insomnia-specific tablets have different labels and exposure.

- Small randomized double-blind placebo-controlled crossover study in 16
  adults with chronic idiopathic urticaria, PMID 3782654:
  https://pubmed.ncbi.nlm.nih.gov/3782654/
- Isolated-rat-peritoneal-mast-cell serotonin experiment, PMID 23710115:
  https://pubmed.ncbi.nlm.nih.gov/23710115/
- AAAAI MCAS work-group guidance listing doxepin among management options,
  PMID 31476322:
  https://pubmed.ncbi.nlm.nih.gov/31476322/
- Current oral-capsule US label:
  https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2b1f0144-65d8-451f-8054-6be1675f102c

Direct PubMed and ClinicalTrials.gov searches located no doxepin MCAS outcome
study. Verdict: implemented with `mastCellBasis: laboratory` and
`studyDesigns: [non-human-in-vitro]`. The urticaria RCT is separately recorded
under `establishedFor`; neither receptor blockade nor the rat-cell experiment
supports calling oral doxepin a demonstrated human mast-cell stabilizer. The
current adult-MDD label's suicidality, sedation, anticholinergic, serotonergic,
interaction, and formulation limits remain prominent.

#### Cyclosporine — mastocytosis case evidence plus broad immunosuppression

Cyclosporine inhibits calcineurin-dependent T-cell signalling and has broader
immunosuppressive effects; it is not a selective mast-cell stabilizer.

- Double-blind randomized placebo-controlled chronic-urticaria study, PMID
  17010756:
  https://pubmed.ncbi.nlm.nih.gov/17010756/
- Earlier randomized double-blind chronic-urticaria study, PMID 10951147:
  https://pubmed.ncbi.nlm.nih.gov/10951147/
- Aggressive-systemic-mastocytosis combination-therapy case plus cultured
  human-umbilical-cord-mast-cell experiment, PMID 10329843:
  https://pubmed.ncbi.nlm.nih.gov/10329843/
- Systemic-mastocytosis/mast-cell-leukemia combination-therapy case, PMID
  21209730:
  https://pubmed.ncbi.nlm.nih.gov/21209730/
- Isolated-human-lung-mast-cell and basophil calcineurin experiment, PMID
  17200674:
  https://pubmed.ncbi.nlm.nih.gov/17200674/
- Current US labelling carries boxed warnings and describes infection,
  malignancy, hypertension, nephrotoxicity, monitoring, and formulation-
  switching concerns:
  https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1952d4c7-a40e-4924-b669-c41400774cb9

No direct MCAS study was located. Verdict: implemented with `mastCellBasis:
mast-cell-disease`, `case-report` plus human `in-vitro` designs, randomized CSU
evidence, and `regulatory: approved-us-other`. The mastocytosis patients had
advanced clonal disease and received cyclosporine with corticosteroids and
other care, so those reports establish exposure in mast-cell disease but cannot
isolate cyclosporine's contribution. The page presents it as broad systemic
immunosuppression rather than a selective mast-cell treatment.

### Priority B: mast-cell-targeted or adjacent-condition pipeline

Not yet approved for inclusion; verify current status and published evidence:

- midostaurin;
- bezuclastinib;
- elenestinib/BLU-263;
- barzolvolimab;
- remibrutinib;
- dupilumab in recurrent idiopathic anaphylaxis or related phenotypes.

For this group, do not infer MCAS relevance merely from activity in clonal
mastocytosis or CSU. Record the precise biological and diagnostic distance.

### Priority B screening results

#### Midostaurin — missing established systemic-mastocytosis comparator

Midostaurin is FDA-approved for advanced systemic mastocytosis subtypes, not
MCAS:
https://www.accessdata.fda.gov/scripts/opdlisting/oopd/detailedIndex.cfm?cfgridkey=306410

Its pivotal evidence was an open-label single-arm study, PMID 27355533:
https://pubmed.ncbi.nlm.nih.gov/27355533/

Verdict: if the site retains avapritinib and other clonal-disease KIT
inhibitors, omitting midostaurin makes that adjacent section incomplete. Use
direct MCAS evidence `none`, other evidence `observational` in advanced systemic
mastocytosis, and `regulatory: approved-us-other`; keep advanced clonal disease
clearly separate from nonclonal MCAS.

#### Bezuclastinib — investigational, randomized mastocytosis program active

- `NCT05186753` (SUMMIT), randomized placebo-controlled phase 2 in indolent or
  smouldering systemic mastocytosis, `ACTIVE_NOT_RECRUITING`, registry verified
  2026-05:
  https://clinicaltrials.gov/study/NCT05186753
- `NCT04996875` (APEX), phase 2 in advanced systemic mastocytosis,
  `RECRUITING`, verified 2026-07:
  https://clinicaltrials.gov/study/NCT04996875

No peer-reviewed primary outcome paper located in the PubMed search. Verdict:
watchlist/investigational entry only; registry design does not equal published
results.

#### Elenestinib (BLU-263) — investigational, mixed registry status

- `NCT04910685` (HARBOR), randomized placebo-controlled phase 2 in indolent
  systemic mastocytosis, `RECRUITING`, verified 2026-07:
  https://clinicaltrials.gov/study/NCT04910685
- `NCT05609942`, advanced systemic-mastocytosis phase 1, `TERMINATED`, verified
  2025-03:
  https://clinicaltrials.gov/study/NCT05609942

No peer-reviewed primary outcome paper located. Verdict: watchlist, with the
two trial statuses shown separately.

#### Barzolvolimab — high-priority investigational adjacent candidate

Barzolvolimab is an anti-KIT monoclonal antibody intended to inhibit stem-cell-
factor signalling and reduce mast-cell numbers. Evidence is in CSU, not MCAS:

- Open-label chronic-inducible-urticaria study with human skin mast-cell
  depletion measurements, PMID 36385701:
  https://pubmed.ncbi.nlm.nih.gov/36385701/
- Phase 1b double-blind placebo-controlled CSU study, PMID 40415544:
  https://pubmed.ncbi.nlm.nih.gov/40415544/
- Phase 2 randomized dose-finding CSU study, PMID 41747871:
  https://pubmed.ncbi.nlm.nih.gov/41747871/
- The phase 1b record `NCT04538794` is `COMPLETED`, enrolled 45 participants,
  and has no registry-posted results; the peer-reviewed paper, not registry
  completion, is the outcome source:
  https://clinicaltrials.gov/study/NCT04538794
- Phase 3 `NCT06445023` and `NCT06455202` are both
  `ACTIVE_NOT_RECRUITING`, registry verified 2026-03:
  https://clinicaltrials.gov/study/NCT06445023
  https://clinicaltrials.gov/study/NCT06455202

Verdict: direct MCAS evidence `none`, other evidence `randomized` in CSU, and
`regulatory: investigational`; biologically closer to mast-cell depletion than
most CSU drugs. Keep safety findings in sourced limitations rather than
marketing it as a future MCAS therapy.

#### Remibrutinib — live adjacent entry added 2026-08-21

Remibrutinib inhibits BTK, a signalling node downstream of FcεRI and other
immune receptors. It now has both phase 3 CSU evidence and US approval for CSU:

- Primary human CD34-derived mast-cell/basophil study, PMID 36973953:
  https://pubmed.ncbi.nlm.nih.gov/36973953/
- REMIX-1/2 phase 3 trials, PMID 40043237:
  https://pubmed.ncbi.nlm.nih.gov/40043237/
- FDA approval and trial summary:
  https://www.fda.gov/drugs/drug-approvals-and-databases/drug-trials-snapshot-rhapsido

Verdict: direct MCAS evidence `none`, other evidence `randomized` in CSU, and
`regulatory: approved-us-other`; no direct MCAS outcome evidence located. The
live entry uses `mastCellBasis: laboratory` and keeps CSU approval and trials
separate from the absence of MCAS outcomes.

#### Dupilumab — implemented adjacent human-mast-cell entry

Dupilumab blocks IL-4/IL-13 signalling rather than directly stabilizing or
depleting mast cells.

- Two phase 3 CSU trials, with one population yielding a smaller/incomplete
  result, PMID 38431226:
  https://pubmed.ncbi.nlm.nih.gov/38431226/
- 2026 CUPID A/C report, PMID 41706458:
  https://pubmed.ncbi.nlm.nih.gov/41706458/
- SINUS-52 biomarker analysis measured human nasal mucosal mast-cell counts,
  PMID 37322842:
  https://pubmed.ncbi.nlm.nih.gov/37322842/
- Current US label includes CSU and its other current indications:
  https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=595f437d-2729-40bb-9c62-c8ece1f82780
- Recurrent idiopathic-anaphylaxis evidence located is a case report, PMID
  37689672:
  https://pubmed.ncbi.nlm.nih.gov/37689672/

Verdict: implemented with `mastCellBasis: mast-cell-mediated-condition` because
the randomized CRSwNP biomarker work measured human mast-cell counts, and with
`regulatory: approved-us-other`. The page separately labels the randomized CSU
program, the one idiopathic-anaphylaxis case, Study B's missed primary endpoint,
and the absence of a direct MCAS outcome study.

#### Ligelizumab, lirentelimab, and rilzabrutinib — second-pass candidates

- Ligelizumab has randomized CSU evidence, including PMID 31577874 and phase 3
  PMID 38008109, but no MCAS-specific evidence located.
- Lirentelimab targets Siglec-8 on mast cells and eosinophils; randomized
  evidence found is in eosinophilic gastritis/duodenitis (PMID 33085861), a
  biologically mixed condition.
- Rilzabrutinib has a phase 2 CSU RCT, PMID 40266575, and US approval for a
  different non-allergic condition; it is not approved for CSU or MCAS.

Verdict: keep on the watchlist below remibrutinib/barzolvolimab. If added, all
would have direct MCAS evidence `none`; their distinct other-condition designs and
biological distance from MCAS must remain visible rather than being flattened
into one strength label.

#### Rupatadine — live distinct H1/PAF entry added 2026-08-21

Rupatadine is not merely another second-generation H1 drug: it also antagonizes
platelet-activating factor (PAF).

- Randomized double-blind placebo-controlled mastocytosis trial, PMID 23734572:
  https://pubmed.ncbi.nlm.nih.gov/23734572/
- Human mast-cell PAF experiments, PMIDs 27758758, 24267366, and 19672095:
  https://pubmed.ncbi.nlm.nih.gov/27758758/
  https://pubmed.ncbi.nlm.nih.gov/24267366/
  https://pubmed.ncbi.nlm.nih.gov/19672095/
- Health Canada lists marketed prescription rupatadine and an indication for
  chronic spontaneous urticaria:
  https://health-products.canada.ca/dpd-bdpp/info.do?code=94335&lang=en

Verdict: direct MCAS evidence `none`, other evidence `randomized` in mastocytosis,
and `regulatory: approved-non-us`; the live entry uses
`mastCellBasis: mast-cell-disease`. PAF antagonism distinguishes it from
cetirizine. No FDA approval and no direct MCAS outcome trial were located.

#### Imatinib — missing mutation-limited FDA-approved mastocytosis comparator

FDA approval is narrow: aggressive systemic mastocytosis without KIT D816V or
with unknown KIT mutation status:
https://www.accessdata.fda.gov/scripts/opdlisting/oopd/detailedIndex.cfm?cfgridkey=209205

- Open-label phase 2 basket study, PMID 18451237:
  https://pubmed.ncbi.nlm.nih.gov/18451237/
- Open-label systemic-mastocytosis phase 2 study, PMID 19193436:
  https://pubmed.ncbi.nlm.nih.gov/19193436/
- A newer direct-MCAS single case combined imatinib with environmental trigger
  avoidance and other care, PMID 38883580:
  https://pubmed.ncbi.nlm.nih.gov/38883580/

Verdict: if the clonal-disease comparator section remains, use
direct MCAS evidence `case-report`, other evidence `observational` in systemic
mastocytosis, and `regulatory: approved-us-other`, with the mutation boundary
prominent. It should not be generalized to common KIT D816V-positive disease or
nonclonal MCAS.

#### Briquilimab — watchlist anti-KIT candidate, results not yet public

`NCT06162728`, an 87-participant early-phase CSU study, is `COMPLETED` and was
registry-verified 2026-08, but no results are posted:
https://clinicaltrials.gov/study/NCT06162728

Related inducible-urticaria, asthma, and extension studies were terminated for
company-priority reasons; the registry does not attribute those terminations to
safety. Verdict: watchlist only until the completed CSU comparison is publicly
reported. Do not infer success or failure from completion status.

#### Additional 2026 CSU pipeline screen — current registry disposition

These candidates were extracted from the 2026 peer-reviewed CSU pipeline review
(PMID 41654334) and then checked individually against ClinicalTrials.gov v2.
None has direct MCAS outcome evidence. “No outcome evidence yet” means a
protocol or an unreported completed trial must not be converted into a
randomized-evidence badge.

| Candidate | Mechanism | Strongest public adjacent evidence | Regulatory status | Current trial fact (verified 2026-08-21) | Evidence-field verdict |
| --- | --- | --- | --- | --- | --- |
| TAS5315 | BTK inhibitor | Published randomized phase 2a CSU study, PMID 42448553 | Investigational | `NCT05335499` `COMPLETED`; registry has no posted results, but the peer-reviewed paper reports the comparison | `none` direct / `randomized` in CSU; watchlist below approved remibrutinib |
| HWH486 | BTK inhibitor | Protocol only | Investigational | `NCT06295302` `UNKNOWN`, last registry verification 2024-02; no results | `none` direct; no outcome-based other-evidence field yet; stale-program watch item |
| HS-10561 | BTK inhibitor | Protocol only | Investigational | `NCT06864507` `NOT_YET_RECRUITING`, last verified 2025-03; no results | `none` direct; no outcome-based other-evidence field yet |
| BGB-16673 | BTK-targeted degrader | Early healthy-volunteer/CSU protocol only | Investigational | `NCT07005713` `COMPLETED`, no posted results | `none` direct; no outcome-based other-evidence field yet |
| BLU-808 | Wild-type KIT inhibitor | Phase 2 CSU/CIndU protocol only | Investigational | `NCT06931405` `ACTIVE_NOT_RECRUITING`, no results | `none` direct; no outcome-based other-evidence field yet; biologically relevant watchlist |
| EVO756 | MRGPRX2 antagonist | Completed nonrandomized CIndU study with registry results; randomized CSU study unreported | Investigational | `NCT06603220` `COMPLETED` with results; `NCT06873516` `COMPLETED` without results | At most `observational` other evidence in CIndU until the randomized comparison reports |
| TLL-018 | JAK1/TYK2 inhibitor | Peer-reviewed 41-person randomized phase Ib CSU pilot, PMID 41834239; no measured mast-cell effect | Investigational | `NCT05373355` `COMPLETED`; phase 3 `NCT06396026` `ACTIVE_NOT_RECRUITING`, no published results | Implemented with `related-condition`; the randomized CSU design does not produce a mast-cell-evidence grade |
| Povorcitinib | Selective JAK1 inhibitor | Randomized CSU phase 2 registry comparison and conference report | Investigational | `NCT05936567` `COMPLETED` with posted results | Potential `randomized` other evidence in CSU, but require a full source review before publication |
| Ritlecitinib | JAK3/TEC-family inhibitor | No completed CSU comparison in this program | FDA-approved for another indication, not CSU/MCAS | `NCT06795373` `WITHDRAWN`, no results | Stop/deprioritize unless a new CSU program appears |

The same review mentions `HWH486`, `HS-10561`, and `BGB-16673` as though they
are simply “in development”; the current registry states above are more precise.
Similarly, it describes the ritlecitinib study as recruiting, whereas the live
record is withdrawn. Use registry state over narrative-review timing.

Primary/registry links:

- TAS5315 randomized phase 2a paper, PMID 42448553:
  https://pubmed.ncbi.nlm.nih.gov/42448553/
- https://clinicaltrials.gov/study/NCT05335499
- https://clinicaltrials.gov/study/NCT06295302
- https://clinicaltrials.gov/study/NCT06864507
- https://clinicaltrials.gov/study/NCT07005713
- https://clinicaltrials.gov/study/NCT06931405
- https://clinicaltrials.gov/study/NCT06603220
- https://clinicaltrials.gov/study/NCT06873516
- https://clinicaltrials.gov/study/NCT06396026
- https://clinicaltrials.gov/study/NCT05936567
- https://clinicaltrials.gov/study/NCT06795373

### Direct-MCAS publications requiring an emerging-evidence presentation

A direct-MCAS search found several additional drugs that would be missed by a
review limited to established management pathways. They should be discoverable
under the governing inclusion directive above. “Direct” describes the
population named by the authors; it does not make the evidence controlled,
attributable, diagnostically representative, or a treatment recommendation.

#### GLP-1 receptor agonists — uncontrolled class-level case series

- A 47-person case series reports experience with several GLP-1 receptor
  agonists in patients labelled as having MCAS, PMID 40675372:
  https://pubmed.ncbi.nlm.nih.gov/40675372/

The report is uncontrolled, combines multiple agents into one class-level
observation, and calls for randomized study. The published response proportion
cannot distinguish drug effects from selection, expectation, time, concurrent
care, or regression to the mean. The agents also have different labelled
indications and formulations, so “GLP-1 agonists” is not one regulatory object.

Implemented 2026-08-21 as a GLP-1-based-medicines class entry labelled
direct-human, uncontrolled, and off-label for MCAS. Semaglutide and tirzepatide
are searchable aliases without pretending the class-level series establishes
an agent-specific effect. The page also cites the two-case CSU report that says
human mast-cell GLP-1-receptor data are conflicting, rather than converting a
proposed metabolic or anti-inflammatory explanation into a demonstrated
mast-cell mechanism.

#### Low-dose naltrexone — direct self-report survey plus smaller clinical reports

- A 2025 multicenter cross-sectional questionnaire included 553 participants
  with investigator-reviewed MCAS diagnoses; 347 reported prior low-dose-
  naltrexone exposure, PMID 40686928:
  https://pubmed.ncbi.nlm.nih.gov/40686928/
- A 2025 retrospective single-physician chronic-pain cohort included seven
  patients labelled with MCAS, PMID 41399763:
  https://pubmed.ncbi.nlm.nih.gov/41399763/

The survey is the largest direct exposure source but was anonymous,
cross-sectional, retrospective, self-selected, allowed either consensus-1 or
consensus-2 diagnoses, and could not verify medication histories, outcomes, or
concurrent care. The pain cohort was not a prospective syndrome-treatment
study, had no comparator, used subjective pain reports, and allowed other
medications and treatments to continue. Neither source can establish an
MCAS-specific effect or a mast-cell mechanism. Together they supersede the
earlier position that the only direct evidence was a bundled single case.

Naltrexone is a US prescription opioid antagonist approved for other
indications, not MCAS; the low-dose regimen is itself off-label. The current
label also makes opioid use/dependence and precipitated withdrawal essential
safety context:
https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=adb7c4dc-221a-4d91-9687-0d78913a92ad&version=5

Verdict: implemented with `mastCellBasis: mcas-patients`, study designs
`cross-sectional`, `cohort`, and `case-report`, plus the patient-facing
`emerging-refractory` context. The bundled POTS/MCAS case (PMID 29326369)
explicitly identifies Leonard B. Weinstock as a treating author and therefore
supports `specialistUse`; because naltrexone, immunoglobulin, and antibiotic
treatment changed in the same report, that tag does not resolve attribution.

#### Hydroxyurea — direct retrospective reports with major diagnostic and
attribution limitations

- Retrospective case series, PMID 35982335:
  https://pubmed.ncbi.nlm.nih.gov/35982335/
- Earlier five-case report, PMID 24192267:
  https://pubmed.ncbi.nlm.nih.gov/24192267/

The larger paper's abstract contains an internal count inconsistency; the full
text and table clarify that 26 of 310 reviewed patients received hydroxyurea,
20 remained exposed long enough for the symptom analysis, and six stopped
early because of adverse events. Patients had used an average of 10.6 prior
medications and used an average of six concomitant medications. The report's
diagnostic rule included symptoms across at least five systems plus either
abnormal mediators or an elevated duodenal mast-cell count. That should not be
silently treated as equivalent to consensus MCAS criteria requiring episodic
multisystem symptoms, an objective event-related mediator rise, and response to
targeted therapy.

Hydroxyurea is a cytotoxic antimetabolite approved in the US for other serious
conditions, not MCAS. Current labelling warns of severe myelosuppression and
other material toxicities:
https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=b9514ae5-79ae-4cc2-9d7f-c8f7806d1694

Verdict: implemented with `mastCellBasis: mcas-patients`, `case-series`, and
`emerging-refractory`. The larger full text explicitly identifies Leonard B.
Weinstock as the investigator whose practice records were reviewed; the earlier
five-case paper is Lawrence B. Afrin's single-author first-party report. Those
sources support separate `specialistUse` signals while leaving diagnostic
generalizability, concurrent care, early discontinuation, and cytotoxic safety
as dominant limits.

#### Tofacitinib — two cases, high safety burden

- Two-patient report, PMID 28382662:
  https://pubmed.ncbi.nlm.nih.gov/28382662/

This is case-level evidence without a comparator. Tofacitinib is FDA-approved
for other inflammatory diseases, not MCAS, and its current label carries a
boxed warning for serious infections, mortality, malignancy, major adverse
cardiovascular events, and thrombosis:
https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/203214s041lbl.pdf

Verdict: implemented with `mastCellBasis: mcas-patients`, `case-report`, and
`emerging-refractory`; the boxed-warning context remains inseparable from the
entry. Lawrence B. Afrin is the first author, but the accessible primary record
does not identify the treating clinician precisely enough to meet the current
`specialistUse` attribution rule, so no practitioner tag was inferred.

#### Sunitinib — single case, oncology drug with boxed warning

- Single-patient report, PMID 26072665:
  https://pubmed.ncbi.nlm.nih.gov/26072665/

Sunitinib is approved for specified cancers, not MCAS. FDA labelling carries a
boxed warning for hepatotoxicity and lists additional cardiovascular,
hypertensive, bleeding, and other serious risks:
https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=43a4d7f8-48ae-4a63-9108-2fa8e3ea9d9c

Verdict: implemented as a historical, case-level `mcas-patients` entry in the
`emerging-refractory` group, with the separate aggressive-systemic-mastocytosis
case and current oncology boxed-warning context prominent. Lawrence B. Afrin is
the first author of the MCAS report, but author order alone does not satisfy the
site's treating-author attribution rule; no `specialistUse` tag was added.

#### Bundled single-case reports — cannot attribute the observation

- Continuous diphenhydramine infusion plus imatinib in one patient, PMID
  28438191:
  https://pubmed.ncbi.nlm.nih.gov/28438191/
- Low-dose naltrexone plus intravenous immunoglobulin and an antibiotic for
  presumed small-intestinal bacterial overgrowth in a single POTS/MCAS case,
  PMID 29326369:
  https://pubmed.ncbi.nlm.nih.gov/29326369/
- Cannabidiol oil plus orphenadrine for pain in a single MCAS case, PMID
  41370840:
  https://pubmed.ncbi.nlm.nih.gov/41370840/
- Montelukast, cromolyn, quercetin with bromelain, digestive enzymes, and other
  concurrent care in a single complex-regional-pain/hypermobile-EDS report,
  PMID 40809669:
  https://pubmed.ncbi.nlm.nih.gov/40809669/

Verdict: these reports cannot support an evidence claim for any one component.
The continuous-infusion report is also an intensive specialist-care context,
not evidence for ordinary oral diphenhydramine use. Do not add naltrexone,
IVIG, antibiotics, continuous diphenhydramine, cannabidiol, or orphenadrine as
standalone MCAS candidates from these publications. The complex-pain report is
also not a clean confirmed-MCAS treatment experiment and cannot support
bromelain, digestive enzymes, or a quercetin-combination entry.

### Legacy broad inhibitors and preclinical concepts

These agents recur in reviews or mechanistic diagrams but do not outrank the
current priority queue.

#### Cladribine — observational systemic-mastocytosis cytoreduction, not MCAS

Cladribine is a purine antimetabolite used as a cytoreductive therapy. No direct
MCAS outcome study was located. The adjacent evidence consists of uncontrolled
systemic-mastocytosis cohorts:

- Single-centre 42-person series across advanced and indolent/smouldering
  systemic mastocytosis, PMID 34729775:
  https://pubmed.ncbi.nlm.nih.gov/34729775/
- Registry-based 79-person advanced-systemic-mastocytosis analysis, PMID
  37012462:
  https://pubmed.ncbi.nlm.nih.gov/37012462/
- Current US oral cladribine label is for relapsing multiple sclerosis and
  carries boxed malignancy and teratogenicity warnings; it is not an MCAS or
  mastocytosis approval:
  https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=9c75e30a-a410-40f1-b653-04d532bd9144&type=display

Verdict: direct MCAS evidence `none`, other evidence `observational` in systemic
mastocytosis, and `regulatory: approved-us-other`. Defer from the core patient
index because the evidence is clonal disease, the mechanism is cytotoxic rather
than mediator-specific, and newer KIT-directed comparators are more informative.
No current relevant interventional trial was located.

#### Quilizumab — randomized CSU program did not establish a current option

Quilizumab is an investigational monoclonal antibody against membrane-expressed
IgE, mechanistically distinct from omalizumab's binding to free IgE.

- Small randomized refractory-CSU study, PMID 27567329:
  https://pubmed.ncbi.nlm.nih.gov/27567329/
- `NCT01987947` is `COMPLETED`, enrolled 32 participants, has no registry
  results posted, and was last updated in 2016:
  https://clinicaltrials.gov/study/NCT01987947

No direct MCAS study, approval, or later active CSU program was located.
Verdict: direct MCAS evidence `none`, other evidence `randomized` in CSU, and
`regulatory: investigational`; deprioritize below omalizumab and newer anti-IgE
programs. The publication is the outcome source; the registry record alone is
only a protocol/status source.

#### Early oncology BTK inhibitors — human allergy proof of mechanism, wrong
safety/regulatory object

Ibrutinib and acalabrutinib inhibit BTK downstream of FcεRI. Human studies show
allergy proof of mechanism, not MCAS trials:

- Ibrutinib aeroallergen skin-test/basophil report, PMID 28389390:
  https://pubmed.ncbi.nlm.nih.gov/28389390/
- Short-course ibrutinib peanut/tree-nut skin-test and basophil study, PMID
  29360526:
  https://pubmed.ncbi.nlm.nih.gov/29360526/
- Open-label acalabrutinib peanut-challenge phase 2 report, PMID 37384412:
  https://pubmed.ncbi.nlm.nih.gov/37384412/
- `NCT05038904` is `COMPLETED` with registry results posted:
  https://clinicaltrials.gov/study/NCT05038904
- Current US labels are for hematologic cancers, not allergy or MCAS:
  https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/205552s044%2C210563s020%2C217003s005lbl.pdf
  https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/216387s006lbl.pdf

Verdict: direct MCAS evidence `none`, other evidence `observational` in human
allergy challenge studies, and `regulatory: approved-us-other`. Do not add as
allergy/MCAS candidates when remibrutinib now supplies a more relevant, approved
CSU BTK object. The current oncology labels' infection, bleeding, cardiac,
cytopenia, and other warnings make class substitution especially misleading.

#### Ruxolitinib and WHI-P131 — mechanistic/preclinical only

- Ruxolitinib inhibited selected endpoints in LAD2 and HMC-1 human mast-cell
  lines, PMID 29939445:
  https://pubmed.ncbi.nlm.nih.gov/29939445/
- Its current oral US label covers myeloproliferative/graft-versus-host
  indications, not MCAS:
  https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f1c82580-87ae-11e0-bc84-0002a5d5c51b
- WHI-P131 has human-mast-cell and mouse-anaphylaxis laboratory evidence, PMID
  10480916, but later work found its mast-cell effects could be JAK3-independent,
  PMID 15852029:
  https://pubmed.ncbi.nlm.nih.gov/10480916/
  https://pubmed.ncbi.nlm.nih.gov/15852029/

No direct clinical MCAS trial was located for either. Verdict: ruxolitinib has
direct MCAS evidence `none`, other evidence `laboratory`, and `regulatory:
approved-us-other`; WHI-P131 is a preclinical research compound with no
approval. Defer both, and do not repeat the old “JAK3-specific” label without
the later target-validity caveat.

#### Anti-IgE DARPins and other engineered-cell concepts — preclinical reject

Engineered DARPins can disrupt IgE/FcεRI signalling or co-ligate an inhibitory
receptor in ex-vivo human basophil systems and animal models:

- DARPin-Fc fusion paper, PMID 21272035:
  https://pubmed.ncbi.nlm.nih.gov/21272035/
- Bispecific FcγRIIB/FcεRI-bound-IgE DARPin paper, PMID 27997998:
  https://pubmed.ncbi.nlm.nih.gov/27997998/

These are platform molecules, not marketed supplements or clinically studied
MCAS medications. The same exclusion applies to early anti-IgE single-domain
antibodies and mast-cell-directed CAR-T concepts without human outcome trials.
Verdict: retain only as preclinical horizon scanning; no patient-facing page.

### Deprioritized or stopped adjacent pipeline candidates

Keep these in the research log so discontinued programs are not repeatedly
rediscovered and presented as new hope:

- **THB001 (anti-KIT):** `NCT05510843` terminated after drug-induced liver
  injury was observed in two of the first five participants:
  https://clinicaltrials.gov/study/NCT05510843
- **EP262 (MRGPRX2 antagonist):** CSU phase 2 `NCT06077773` terminated after
  part 1 for a stated strategic business decision; results are posted. Do not
  call it an active program:
  https://clinicaltrials.gov/study/NCT06077773
- **AK006 (anti-Siglec-6):** early CSU study `NCT06072157` completed without
  posted registry results. A 2026 peer-reviewed pipeline review reports the CSU
  program was halted for lack of efficacy (PMID 41654334); retain as a stopped
  watch item unless the sponsor publishes contrary primary data:
  https://pubmed.ncbi.nlm.nih.gov/41654334/
- **Fenebrutinib (BTK inhibitor):** phase 2 CSU RCT, PMID 34750553, showed a
  pharmacologic signal but also liver-enzyme elevations; the extension registry
  was terminated and the program did not progress for CSU. Remibrutinib now has
  phase 3 evidence and FDA approval, so fenebrutinib is a historical comparator,
  not a priority entry:
  https://pubmed.ncbi.nlm.nih.gov/34750553/
- **Tezepelumab (anti-TSLP):** phase 2b CSU study did not meet its primary
  endpoint, PMID 39956278:
  https://pubmed.ncbi.nlm.nih.gov/39956278/
- **Benralizumab (anti-IL-5R):** randomized CSU trial did not separate from
  placebo on the prespecified clinical outcomes, PMID 38367194:
  https://pubmed.ncbi.nlm.nih.gov/38367194/
- **Mepolizumab (anti-IL-5):** direct CSU registry study `NCT03494881` completed
  with only ten participants and posted results; this is too small and indirect
  to prioritize over mast-cell-directed candidates:
  https://clinicaltrials.gov/study/NCT03494881
- **Sarilumab (anti-IL-6R):** a 16-person randomized indolent-systemic-
  mastocytosis comparison did not support the prespecified quality-of-life
  hypothesis, PMID 40529483. `NCT03770273` is `COMPLETED` with results posted.
  The drug is FDA-approved for other inflammatory conditions, not MCAS or
  mastocytosis; retain as an important negative adjacent trial rather than a
  candidate page:
  https://pubmed.ncbi.nlm.nih.gov/40529483/
  https://clinicaltrials.gov/study/NCT03770273
- **Izuforant/LEO 152020 (H4 antagonist):** a 19-person randomized crossover
  cholinergic-urticaria trial did not meet its primary endpoint, PMID 38308655.
  `NCT04853992` is `COMPLETED` with results posted. This investigational class
  should not be inferred to add systemic MCAS evidence merely because H4 is a
  histamine receptor:
  https://pubmed.ncbi.nlm.nih.gov/38308655/
  https://clinicaltrials.gov/study/NCT04853992

### Scope decision: multiple drugs from the same class

The current index lists cetirizine as a representative second-generation H1
antihistamine but does not state whether loratadine, fexofenadine,
levocetirizine, desloratadine, bilastine, rupatadine, or first-generation agents
should receive separate entries. Claude needs an editorial rule before the
research expands into repetitive class entries. Until then, research class
representatives and clinically meaningful mechanistic differences rather than
creating a long list of near-duplicates.

Recommended finite rule:

1. Keep one representative entry for a class when members share the same target,
   evidence population, route, and regulatory story.
2. Give a separate entry only when at least one material distinction is sourced:
   an additional mediator target, a different generation with a materially
   different labelled safety/central-nervous-system profile, direct mast-cell-
   disorder evidence absent for the representative, or a distinct regulatory or
   trial status patients need to understand.
3. List aliases and same-class examples inside the representative page only when
   the text does not imply interchangeability.
4. Do not create pages solely because a brand is popular.

Applied now:

- retain cetirizine as the second-generation H1 representative;
- consider hydroxyzine as a first-generation H1 representative;
- give rupatadine a separate page because PAF antagonism and a mastocytosis RCT
  make it materially distinct;
- retain famotidine as the H2 representative rather than adding cimetidine and
  other near-duplicates;
- retain montelukast as the leukotriene-receptor representative; consider
  zileuton separately because it inhibits leukotriene synthesis rather than the
  receptor;
- retain intranasal azelastine as a local-route page, not as another systemic H1
  representative;
- do not add zafirlukast, loratadine, fexofenadine, levocetirizine,
  desloratadine, bilastine, oral azelastine, or chlorpheniramine as separate
  pages without a new distinction that meets the rule.

## Unlisted supplement discovery queue

The supplement search is intentionally stricter because a mechanism-only
inclusion bar can otherwise generate an effectively unlimited list of
polyphenols tested in cell lines.

Candidates to screen, not recommendations to add:

- vitamin C;
- curcumin;
- resveratrol;
- epigallocatechin gallate (EGCG);
- boswellic acids/Boswellia;
- perilla-derived compounds;
- specialized luteolin or quercetin formulations that must not be conflated
  with the plain compounds.

A second-pass nutraceutical review (PMID 37998337) also identified butyrate,
vitamin D/calcitriol, kaempferol, cinnamon/cinnamaldehyde, and omega-3 fatty
acids as candidates requiring the same screen:
https://pubmed.ncbi.nlm.nih.gov/37998337/

For each, require a traceable primary mast-cell mechanism and investigate human
exposure, formulation equivalence, adjacent clinical evidence, and safety or
interaction issues. Reject candidates whose only support is supplement
marketing or implausibly high in-vitro concentrations.

### Supplement candidate screening results

#### Resveratrol — live mechanistic entry added 2026-08-21

- Primary mature human intestinal mast-cell study, PMID 34299258:
  https://pubmed.ncbi.nlm.nih.gov/34299258/
- Human skin mast-cell study found selective effects, including inhibition of
  one lipid-mediator pathway but increased TNF production, PMID 26777630:
  https://pubmed.ncbi.nlm.nih.gov/26777630/
- Cross-model comparison showing nonuniform quercetin/resveratrol effects, PMID
  36235240:
  https://pubmed.ncbi.nlm.nih.gov/36235240/

Verdict: the live entry uses `mastCellBasis: laboratory` and
`establishedFor: []`, not a clinical MCAS claim. Primary human mast cells make
it stronger than a generic cell-line candidate, but mixed mediator effects and
the cell-culture-to-oral-exposure gap remain explicit.

#### EGCG — live formulation-specific entry added 2026-08-21

- EGCG reduced FcεRI expression in human mast cells, PMID 20202836:
  https://pubmed.ncbi.nlm.nih.gov/20202836/
- An older paper studied an O-methylated EGCG derivative in a human basophilic
  cell line, PMID 12236706:
  https://pubmed.ncbi.nlm.nih.gov/12236706/

Verdict: direct MCAS evidence `none`, other evidence `laboratory` in a human
mast-cell line. The live entry does not merge EGCG, methylated EGCG derivatives,
green-tea extract, and brewed tea into one evidentiary object. Adjacent human
trials of methylated products do not automatically support plain EGCG.

#### Curcumin — adjacent human trial plus indirect cell models

- Curcumin experiments used RBL-2H3 rat basophilic leukemia and KU812 human
  pre-basophil cell lines, not primary human mast cells, PMID 31773429:
  https://pubmed.ncbi.nlm.nih.gov/31773429/
- A randomized double-blind allergic-rhinitis study exists, PMID 27789120:
  https://pubmed.ncbi.nlm.nih.gov/27789120/
- A small randomized atopic-asthma study did not separate from placebo on its
  reported outcomes, PMID 22852117:
  https://pubmed.ncbi.nlm.nih.gov/22852117/

Verdict: defer despite a potential `establishedFor` randomized-trials row in
allergic rhinitis. Its proposed `mastCellBasis` is only `laboratory`, while
bioavailability/formulation differences are substantial.

#### Vitamin C — defer/reject as an oral MCAS supplement entry

- An uncontrolled intravenous study reported a short-term serum-histamine
  change in mixed allergic/infectious populations, PMID 23666445:
  https://pubmed.ncbi.nlm.nih.gov/23666445/
- A small randomized oral study found no difference in histamine skin response
  or nasal allergen response, PMID 7076989:
  https://pubmed.ncbi.nlm.nih.gov/7076989/

Verdict: do not bridge intravenous administration to oral supplements, and do
not equate serum histamine change with mast-cell stabilization. Current evidence
does not clear the proposed stricter inclusion rule.

#### Rosmarinic-acid-enriched Perilla extract — implemented formulation-specific entry

- Small randomized placebo-controlled seasonal-allergic-rhinoconjunctivitis
  study of Perilla extract enriched for rosmarinic acid, PMID 14988517:
  https://pubmed.ncbi.nlm.nih.gov/14988517/
- Mechanistic paper combining human mast-cell experiments with mouse work, PMID
  21239739:
  https://pubmed.ncbi.nlm.nih.gov/21239739/
- Human crossover pharmacokinetic study of Perilla extract, PMID 15309457:
  https://pubmed.ncbi.nlm.nih.gov/15309457/
- Larger pediatric trials located used multicomponent products containing
  Perilla, quercetin, and vitamin D rather than Perilla alone (for example PMID
  30968678):
  https://pubmed.ncbi.nlm.nih.gov/30968678/

Verdict: implemented as **rosmarinic-acid-enriched Perilla extract**, with
`mastCellBasis: laboratory`, a seasonal-allergic-rhinoconjunctivitis randomized-
trials row, and dietary-supplement status. The page treats the leaf extract as
the evidence object and explicitly refuses equivalence with leaf powder, seed
extract, seed oil, essential oil, isolated rosmarinic acid, or multicomponent
products. The current commercial-product source documents availability only;
it does not support a study-equivalence claim.

#### Boswellia/boswellic acids — defer

- An old double-blind placebo-controlled asthma study tested Boswellia serrata
  gum resin, PMID 9810030:
  https://pubmed.ncbi.nlm.nih.gov/9810030/
- Direct mast-cell searches primarily located murine or keratinocyte models,
  not primary human mast-cell evidence (for example PMIDs 37417726 and
  36077254).

Verdict: leukotriene-pathway plausibility and one heterogeneous extract trial do
not establish a stable evidence object for “Boswellia” or isolated boswellic
acids. Defer pending standardized-formulation and human-mast-cell evidence.

#### Butyrate — mechanistic candidate with a route/exposure problem

- Primary human mast-cell epigenomic study, PMID 40498295:
  https://pubmed.ncbi.nlm.nih.gov/40498295/

Verdict: biologically credible `mastCellBasis: laboratory` candidate with
`establishedFor: []`, but “butyrate” can mean microbiome-derived local
exposure, a salt supplement, or a prodrug. Do not make a consumer supplement
page until the intervention/formulation represented by the evidence is defined.

#### Vitamin D/calcitriol — defer pending compound and indication separation

- Human and mouse mast-cell mechanism for vitamin-D metabolites, PMID 24461581:
  https://pubmed.ncbi.nlm.nih.gov/24461581/
- Adjacent randomized allergic-rhinitis studies exist (for example PMID
  33382385), but they test supplementation/adjuvant strategies rather than an
  MCAS mechanism:
  https://pubmed.ncbi.nlm.nih.gov/33382385/

Verdict: separate nutritional vitamin D, measured deficiency correction, and
active calcitriol pharmacology. A single generic entry would conflate them.

#### Kaempferol — reject/defer under the stricter exposure rule

- LAD2 human mast-cell-line and mouse study, PMID 33002828:
  https://pubmed.ncbi.nlm.nih.gov/33002828/

Verdict: laboratory signal, but no human outcome study located and the cited
LAD2 work uses experimental exposure without a demonstrated clinical bridge.
This is the kind of candidate that would make the supplement list unlimited if
admitted on cell-line evidence alone.

#### Cinnamon/cinnamaldehyde — formulation-specific mechanistic candidate

- Primary human intestinal mast-cell study, PMID 25504111:
  https://pubmed.ncbi.nlm.nih.gov/25504111/
- Randomized intranasal standardized-cinnamon-extract allergic-rhinitis study,
  PMID 31780001:
  https://pubmed.ncbi.nlm.nih.gov/31780001/

Verdict: credible but formulation- and route-specific (`none` direct;
`laboratory` human-mast-cell evidence plus a randomized intranasal adjacent
study). Do not translate an
intranasal standardized extract or isolated cinnamaldehyde experiment into a
generic oral cinnamon-supplement claim.

#### Omega-3 fatty acids — mechanistic candidate with mixed endpoint effects

- EPA/DHA study in LAD2 and HMC-1 human mast-cell lines, PMID 23021516:
  https://pubmed.ncbi.nlm.nih.gov/23021516/
- Alpha-linolenic-acid studies in LAD2 cells plus mouse anaphylaxis models,
  PMIDs 34929479 and 33113502:
  https://pubmed.ncbi.nlm.nih.gov/34929479/
  https://pubmed.ncbi.nlm.nih.gov/33113502/

The EPA/DHA study did not reduce IgE-mediated LAD2 degranulation, although it
did alter selected cytokine/ROS endpoints. Verdict: defer or present only with
direct MCAS evidence `none` and a narrow other evidence `laboratory` context; do not
collapse ALA, EPA, DHA, and generic fish oil.

### Long-tail nutraceutical screen — do not admit on review-table presence alone

The structured candidate extraction from PMID 37998337 also produced
astaxanthin, fucoxanthin, glutamine, arginine, glycine, lycopene, myricetin,
naringenin, nobiletin, tangeretin, and other carotenoid/flavonoid derivatives.
Most entries in the review tables are based on a mast-cell line or animal model,
often at experimental concentrations, rather than a defined human supplement
with an adjacent controlled trial.

Verdict: hold this long tail outside the publication queue unless a later pass
finds either primary human mast-cell evidence with a plausible exposure bridge
or controlled human evidence for the same compound, formulation, and route.
This is a documented exclusion, not an assertion that the compounds have no
biological effects.

A newer PhAROS-platform paper, PMID 40950138, does not change this bar. It uses
large-scale phytomedical data, predicted target networks, an internally derived
candidate score, and selected in-vitro pharmacology to prioritize future
“next-generation” stabilizers:
https://pubmed.ncbi.nlm.nih.gov/40950138/

The PubMed record is a bioRxiv preprint record, although a later journal version
was accepted in 2026. The work explicitly positions its candidates for later
preclinical and clinical evaluation and identifies bioavailability,
pharmacokinetics, and in-vivo validation as unresolved. It is a discovery map,
not human evidence for adding each named phytochemical or a generic supplement
page.

## Cross-cutting methodology reconciliation

The former one-dimensional evidence tier and patient-facing `confoundRisk`
score created the Xolair confusion that started this audit. The live worktree
now resolves it across schema, methodology, UI components, appointment output,
and content:

- **Mast-cell basis:** whether the entry is grounded in MCAS patients, another
  mast-cell disease, another mast-cell-mediated condition with measured human
  mast-cell pharmacodynamics, laboratory mast cells, or action downstream of
  the cell.
- **Established for:** each condition with a current regulator approval or
  published evaluable randomized trials.
- **Documented specialist use:** a separate sourced practice signal that names
  the clinician and provenance without changing the study design or grade.
- **Regulatory status:** a separate fact, never a proxy for MCAS evidence.
- **Evidence limits:** plain prose about what the design cannot establish, not
  a medication-danger score.

For Xolair, the live result is therefore legible: it has an MCAS-patient basis;
CSU and food allergy appear separately as both US-approved and supported by
randomized trials; MCAS is not listed as an approval. Preserve this model while
correcting the remaining entry-level sources and prose.

The model remains an orientation system rather than a one-dimensional ranking:
population, disease context, experimental setting, and biological locus answer
different questions. The 2026-08-21 patch resolves two identified gaps by
adding `mast-cell-mediated-condition` for barzolvolimab-like human
pharmacodynamic evidence and by removing the categorical claim that MCAS cannot
be clonal. Results in a mutation-selected clonal disease still cannot be
generalized to idiopathic or non-clonal MCAS.

### Evaluable-result requirement — implemented

The terminated PEA/FSD201 study `NCT05652907` enrolled two participants and
cannot estimate an intervention effect. Under the former one-dimensional model,
the mere randomized design could have been mistaken for the site's strongest
evidence badge.

The live schema now requires a peer-reviewed primary report whenever an
`establishedFor` row claims `randomised-trials`. A registry protocol, an
unreported trial, or a terminated trial with no analysable comparison belongs
in trial status, not in `establishedFor`. Retain this check and, ideally, bind
each condition row to its supporting citation rather than accepting any primary
paper elsewhere in the entry.

### Supplement regulatory distinction — implemented

Before the migration, every supplement used `regulatory: otc`, placing simple
availability beside FDA-approval categories and making it easy to misread as an
OTC-drug status.

FDA states that dietary supplements generally do not receive premarket approval
for safety or effectiveness:
https://www.fda.gov/food/information-consumers-using-dietary-supplements/questions-and-answers-dietary-supplements

The live vocabulary now uses `dietary-supplement` for all four supplement
entries and reserves `otc` for nonprescription drugs. Retain this distinction;
availability and drug approval are different facts.

## Research-cycle completion and next refresh

Completed in this cycle:

1. Audited every currently published medication and supplement identifier and
   live evidence field, with detailed corrections above.
2. Re-ran direct-MCAS, adjacent-condition, mastocytosis, mechanism, and
   nutraceutical discovery searches and screened the credible missing
   candidates found.
3. Checked the named interventional studies against current trial registries
   and separated protocols/unreported trials from evaluable results.
4. Proposed a finite class-representation rule and recorded include, defer,
   watch, and reject decisions so weak candidates are not repeatedly
   rediscovered.

Verification completed on 2026-08-21:

- the live catalog contains 26 medication and seven supplement entries;
- the three exact PubMed searches reproduce counts of 229, 14, and 732 records;
- 149 unique PubMed IDs, 32 unique ClinicalTrials.gov records, and 36 official
  regulator/label URLs resolve as documented in the citation-integrity section;
- the editorial linter, Astro check, 87 tests, and 41-page production build all
  pass;
- `git diff --check` reports no whitespace errors.

Follow-up verification on 2026-08-24 added the benzodiazepine-class/lorazepam-
representative, hydroxychloroquine, epinephrine, and systemic-corticosteroid
pages. The catalog now contains 30
medication and seven supplement entries; editorial lint, Astro check, 89 tests,
and a 45-page production build pass, and all four pages were checked in the
local browser without console errors.

The remaining decisions are editorial implementation choices: which same-class
drugs deserve separate pages and how emergency, rescue, trigger-specific, and
local-route interventions should be separated from the maintenance index. The
emerging/refractory and specialist-practice display decisions are now
structural. Under the governing directive, a traceable early source does not
have to “clear” an RCT-like bar to be discoverable; placement and language carry
the uncertainty. Claude should not change `lastVerified` unless Claude opens
and reviews the sources during implementation.

At the next scheduled literature refresh:

1. Re-run the documented PubMed searches with a date window beginning after
   2026-08-21.
2. Recheck watchlist trial statuses and results, especially masitinib,
   barzolvolimab, bezuclastinib, elenestinib, and briquilimab.
3. Look for agent-specific follow-up to the GLP-1 receptor agonist case series
   and any consensus-criteria reanalysis of hydroxyurea; stronger follow-up
   changes confidence, not whether the existing reports are indexed.
4. Reassess supplements when new human, specialist-practice, formulation-
   specific, or mechanistic evidence appears; do not require a controlled trial
   merely to document an emerging option.
5. Audit new first-party publications, guidance, and recorded presentations
   from MCAS clinician-researchers for documented treatment use not yet in the
   index. Record the exact source and never infer practice from reputation.
6. Treat any regulatory-status refresh as source work in its own right; do not
   infer current approval from old papers.
