# MCAS Reference research handoff

Living evidence-research file for Claude. This file is research input, not
published medical content and not medical advice.

Last research update: 2026-08-20

## Research remit

The research has two lanes:

1. Audit every medication and supplement already published in
   `src/content/medications/` and `src/content/supplements/`.
2. Systematically discover and screen credible medications and supplements that
   are not yet listed.

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

### Omalizumab (Xolair) — tier correction required

Current site tier: `observational`

Recommended tier: `rct-adjacent`

Reason: the published definition of `rct-adjacent` explicitly includes chronic
spontaneous urticaria and related allergic conditions. Omalizumab has randomized
controlled evidence in CSU, IgE-mediated food allergy, idiopathic anaphylaxis,
and mastocytosis. Direct MCAS evidence remains observational, but that does not
erase the stronger adjacent evidence under the site's current tier rule.

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
- Primary human mechanistic study of reduced basophil FcεRI expression after
  lowering free IgE, PMID 15356552:
  https://pubmed.ncbi.nlm.nih.gov/15356552/
- FDA food-allergy approval announcement:
  https://www.fda.gov/news-events/press-announcements/fda-approves-first-medication-help-reduce-allergic-reactions-multiple-foods-after-accidental

Current 2026 FDA label, including food allergy and CSU randomized studies:
https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/103976s5253lbl.pdf

Keep `regulatory: approved-us-other`; Xolair is not FDA-approved for MCAS.

### Ketotifen — tier correction required

Current site tier: `observational`

Recommended tier: `rct-adjacent`

The entry currently cites reviews but omits randomized mastocytosis studies:

- Double-blind crossover study in urticaria pigmentosa, PMID 6341102:
  https://pubmed.ncbi.nlm.nih.gov/6341102/
- Double-blind, placebo-controlled crossover comparison in pediatric
  mastocytosis, PMID 2654254:
  https://pubmed.ncbi.nlm.nih.gov/2654254/

These qualify under the site's explicit inclusion of systemic mastocytosis as
an adjacent condition. Interpret the small, old studies narrowly; randomized
design does not make them MCAS trials.

### Cromolyn sodium — tier correct, pivotal source missing

Current and recommended tier: `rct-adjacent`

The current entry cites two reviews but not the trial that supports its tier:

- Multicenter double-blind placebo-controlled systemic-mastocytosis trial,
  PMID 2110198:
  https://pubmed.ncbi.nlm.nih.gov/2110198/

Add the primary study or the tier is not auditable from the entry's citations.

### Masitinib — tier correct, pivotal source missing

Current and recommended tier: `rct-adjacent`

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

### Cetirizine — tier correct, primary source missing

Current and recommended tier: `rct-adjacent`

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

### Montelukast — likely tier correction required

Current site tier: `observational`

Recommended tier under the current published definition: `rct-adjacent`

Verified adjacent evidence:

- Systematic review and meta-analysis of randomized trials of leukotriene
  receptor antagonists added to antihistamines in urticaria, PMID 38852861:
  https://pubmed.ncbi.nlm.nih.gov/38852861/
- Randomized double-blind placebo-controlled montelukast/cetirizine study in
  chronic urticaria, PMID 11678862:
  https://pubmed.ncbi.nlm.nih.gov/11678862/

Direct MCAS evidence remains limited. The entry should say that plainly without
discarding the adjacent RCT evidence.

### Famotidine — likely tier correction required

Current site tier: `observational`

Recommended tier under the current published definition: `rct-adjacent`

Verified primary source:

- Prospective randomized double-blind controlled trial in acute urticaria,
  PMID 10844490:
  https://pubmed.ncbi.nlm.nih.gov/10844490/

This was a very small active-comparator study, not an MCAS trial. If the site
does not intend such a study to qualify as `rct-adjacent`, the tier definition
needs tightening rather than classifying this entry inconsistently.

`regulatory: otc` is correct for famotidine as a nonprescription US drug. The
current OTC indication is acid reduction/heartburn, not MCAS:
https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=381db08e-5756-4255-8202-1d8e6a1cf038

### Diamine oxidase (DAO) — tier correction or tier-rule decision required

Current site tier: `observational`

Recommended tier under the current broad definition: `rct-adjacent`

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
tissues by mast cells. Reclassification must not imply equivalence between
histamine intolerance, CSU, and MCAS.

### Avapritinib — wording issue to correct

Current and recommended tier: `rct-adjacent`

The pivotal PATHFINDER/PIONEER source already appears valid, including PMID
38320129. However, the summary calls avapritinib “the first agent in mast cell
disease supported by a placebo-controlled randomised trial.” That statement is
too broad: placebo-controlled mastocytosis studies of cromolyn and ketotifen
predate it by decades. Research a narrower, supportable description before
Claude edits the summary, such as distinguishing a selective KIT D816V-targeted
agent or a disease-modifying trial in indolent systemic mastocytosis.

Current FDA label verification:

- The 2024 FDA label covers advanced and indolent systemic mastocytosis:
  https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/212608s020lbl.pdf

Therefore `approved-us-other` is correct relative to MCAS. “Other” must remain
visible: FDA approval for systemic mastocytosis is not approval for MCAS.

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

### Ketotifen — non-US regulatory claim needs narrowing

Health Canada's current Drug Product Database lists authorized oral ZADITEN
tablets:
https://health-products.canada.ca/dpd-bdpp/info?code=10832&lang=eng&wbdisable=true

This supports `approved-non-us`. A current official source for the existing UK
oral-approval claim has not yet been verified; current UK searches primarily
surface ophthalmic products. Prefer the verified Canada claim unless a current
UK regulator record is opened.

### Montelukast — regulatory and safety status verified

`approved-us-other` is correct: its US approvals are for asthma and allergic
rhinitis-related indications, not MCAS. The current boxed-warning note is
supported by FDA:
https://www.fda.gov/drugs/drug-safety-communications/fda-requires-boxed-warning-about-serious-mental-health-side-effects-asthma-and-allergy-drug

### Luteolin — mechanistic tier retained, stronger primary sources needed

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

Recommended tier remains `mechanistic`.

### Quercetin — mechanistic tier retained with model/exposure caveats

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

Recommended tier remains `mechanistic`; explicitly distinguish cell models,
open-label pilot observations, formulation, and achievable exposure.

### Palmitoylethanolamide (PEA) — mechanistic tier retained, evidence is indirect

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

Recommended tier remains `mechanistic`, but the entry should make clear that
the primary mast-cell bridge is mostly preclinical and model-dependent.

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

A proposed successor, FSD202, appears in the Australian registry as
`ACTRN12625000665437`; the current Australian government search result labels
it `Withdrawn`, despite earlier sponsor announcements describing planned
recruitment. Use the registry status, not the older announcement:
https://www.australianclinicaltrials.gov.au/anzctr-search-results

### Supplement tier audit — current conclusion

The cited PMIDs and titles resolve correctly through E-utilities. Their current
`mechanistic` tier remains appropriate. Remaining work:

- check whether any human trials studied the same compound and formulation;
- assess whether reported experimental concentrations are plausibly reachable;
- keep proprietary formulations separate from the plain compound.

## Existing citation-integrity check

All PMIDs currently present in medication and supplement frontmatter resolved
through NCBI E-utilities on 2026-08-20, and the returned titles matched the
stored titles. This confirms identifier/title integrity only; it is not a full
human source review and does not authorize changing `lastVerified`.

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

#### Aspirin — high-priority candidate, direct evidence is observational

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

Verdict: candidate clears the evidence bar, probably `observational` if the
badge is MCAS-specific. It needs unusually prominent safety context: the OTC
label warns about severe allergic reactions and bleeding, and aspirin can shift
arachidonic-acid metabolism toward leukotrienes. Do not turn the entry into a
selection rule or instructions.

#### Hydroxyzine — include only if first-generation H1 drugs get a class slot

- Pediatric mastocytosis double-blind placebo-controlled crossover comparison,
  PMID 2654254:
  https://pubmed.ncbi.nlm.nih.gov/2654254/
- Current US label includes histamine-mediated pruritus and chronic urticaria:
  https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=6a1a48ac-8ad5-4363-b298-d9825ae2a448

Verdict: `rct-adjacent` under the current definition. It is pharmacologically
distinct enough from cetirizine to represent first-generation H1 agents, but do
not create separate pages for every H1 drug without a class-representation
policy.

#### Zileuton — pathway-relevant, direct evidence not located

Zileuton inhibits 5-lipoxygenase and therefore leukotriene synthesis, whereas
montelukast blocks one leukotriene receptor. It is named in the MCAS management
review (PMID 30961835), but targeted PubMed searches located no direct MCAS or
mastocytosis trial.

- Current label identifies zileuton as a 5-lipoxygenase inhibitor approved for
  asthma, not MCAS:
  https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=aee65202-fddb-497f-9f11-17cc727cb157

Verdict: credible mechanistic/management candidate, but lower priority than
aspirin. Its liver monitoring, contraindication, and interaction burden are
material label facts; the site should not imply that pathway plausibility is
clinical evidence.

#### Epinephrine — include in an emergency-intervention structure

Major consensus/practical sources name epinephrine for acute anaphylaxis or
acute mast-cell-activation episodes (PMIDs 30961835 and 41272881). The current
FDA label is for allergic emergencies/anaphylaxis:
https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/020800s054lbl.pdf

Verdict: clearly in scope clinically, but the current chronic-treatment evidence
schema is the wrong presentation. Prefer a distinct emergency-intervention
category with regulator-backed language and no dosing over forcing epinephrine
into an “evidence tier” designed for maintenance therapies.

#### Systemic corticosteroids — defer from the core index

The management review names corticosteroids for prolonged acute episodes but
not as a mast-cell-specific intervention. Their broad immunologic action,
heterogeneous agents, and acute/rescue context make a single supplement-like
entry misleading. Reconsider only if an acute/interventional class is added.

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
`observational` for study design and keep advanced clonal disease clearly
separate from nonclonal MCAS.

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

- Phase 1b double-blind placebo-controlled CSU study, PMID 40415544:
  https://pubmed.ncbi.nlm.nih.gov/40415544/
- Phase 2 randomized dose-finding CSU study, PMID 41747871:
  https://pubmed.ncbi.nlm.nih.gov/41747871/
- Phase 3 `NCT06445023` and `NCT06455202` are both
  `ACTIVE_NOT_RECRUITING`, registry verified 2026-03:
  https://clinicaltrials.gov/study/NCT06445023
  https://clinicaltrials.gov/study/NCT06455202

Verdict: `rct-adjacent`, `investigational`, and biologically closer to mast-cell
depletion than most CSU drugs. Keep hair-pigmentation changes and other safety
findings in the sourced limitations rather than marketing it as a future MCAS
therapy.

#### Remibrutinib — high-priority newly approved adjacent candidate

Remibrutinib inhibits BTK, a signalling node downstream of FcεRI and other
immune receptors. It now has both phase 3 CSU evidence and US approval for CSU:

- REMIX-1/2 phase 3 trials, PMID 40043237:
  https://pubmed.ncbi.nlm.nih.gov/40043237/
- FDA approval and trial summary:
  https://www.fda.gov/drugs/drug-approvals-and-databases/drug-trials-snapshot-rhapsido

Verdict: `rct-adjacent`, `approved-us-other`; no direct MCAS outcome evidence
located. This is a stronger missing candidate than several older speculative
items.

#### Dupilumab — adjacent RCT candidate, indirect mast-cell connection

Dupilumab blocks IL-4/IL-13 signalling rather than directly stabilizing or
depleting mast cells.

- Two phase 3 CSU trials, with one population yielding a smaller/incomplete
  result, PMID 38431226:
  https://pubmed.ncbi.nlm.nih.gov/38431226/
- Current FDA label includes CSU:
  https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/761055s075lbl.pdf
- Recurrent idiopathic-anaphylaxis evidence located is a case report, PMID
  37689672:
  https://pubmed.ncbi.nlm.nih.gov/37689672/

Verdict: `rct-adjacent`, `approved-us-other`, but biologically more indirect
than omalizumab, remibrutinib, or barzolvolimab. Include after those higher-
priority gaps.

#### Ligelizumab, lirentelimab, and rilzabrutinib — second-pass candidates

- Ligelizumab has randomized CSU evidence, including PMID 31577874 and phase 3
  PMID 38008109, but no MCAS-specific evidence located.
- Lirentelimab targets Siglec-8 on mast cells and eosinophils; randomized
  evidence found is in eosinophilic gastritis/duodenitis (PMID 33085861), a
  biologically mixed condition.
- Rilzabrutinib has a phase 2 CSU RCT, PMID 40266575, and US approval for a
  different non-allergic condition; it is not approved for CSU or MCAS.

Verdict: keep on the watchlist below remibrutinib/barzolvolimab. Do not let the
broad `rct-adjacent` definition flatten their very different biological distance
from MCAS.

#### Rupatadine — high-priority distinct H1/PAF candidate

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

Verdict: `rct-adjacent`, `approved-non-us`, and a justified separate class entry
because PAF antagonism distinguishes it from cetirizine. No FDA approval and no
direct MCAS outcome trial were located.

#### Imatinib — missing mutation-limited FDA-approved mastocytosis comparator

FDA approval is narrow: aggressive systemic mastocytosis without KIT D816V or
with unknown KIT mutation status:
https://www.accessdata.fda.gov/scripts/opdlisting/oopd/detailedIndex.cfm?cfgridkey=209205

- Open-label phase 2 basket study, PMID 18451237:
  https://pubmed.ncbi.nlm.nih.gov/18451237/
- Open-label systemic-mastocytosis phase 2 study, PMID 19193436:
  https://pubmed.ncbi.nlm.nih.gov/19193436/

Verdict: if the clonal-disease comparator section remains, add as
`observational`, `approved-us-other`, with the mutation boundary prominent.
It should not be generalized to common KIT D816V-positive disease or nonclonal
MCAS.

### Scope decision: multiple drugs from the same class

The current index lists cetirizine as a representative second-generation H1
antihistamine but does not state whether loratadine, fexofenadine,
levocetirizine, desloratadine, bilastine, rupatadine, or first-generation agents
should receive separate entries. Claude needs an editorial rule before the
research expands into repetitive class entries. Until then, research class
representatives and clinically meaningful mechanistic differences rather than
creating a long list of near-duplicates.

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

#### Resveratrol — strongest new mechanistic candidate so far

- Primary mature human intestinal mast-cell study, PMID 34299258:
  https://pubmed.ncbi.nlm.nih.gov/34299258/
- Human skin mast-cell study found selective effects, including inhibition of
  one lipid-mediator pathway but increased TNF production, PMID 26777630:
  https://pubmed.ncbi.nlm.nih.gov/26777630/
- Cross-model comparison showing nonuniform quercetin/resveratrol effects, PMID
  36235240:
  https://pubmed.ncbi.nlm.nih.gov/36235240/

Verdict: include candidate at `mechanistic`, not as a clinical MCAS therapy.
Primary human mast cells make it stronger than a generic cell-line candidate,
but mixed mediator effects and uncertain achievable exposure must be explicit.

#### EGCG — credible mechanistic candidate, formulation-specific

- EGCG reduced FcεRI expression in human mast cells, PMID 20202836:
  https://pubmed.ncbi.nlm.nih.gov/20202836/
- An older paper studied an O-methylated EGCG derivative in a human basophilic
  cell line, PMID 12236706:
  https://pubmed.ncbi.nlm.nih.gov/12236706/

Verdict: mechanistic candidate. Do not merge EGCG, methylated EGCG derivatives,
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

Verdict: defer pending the tier-model decision. It would be `rct-adjacent` under
the current broad definition but only mechanistic/indirect for mast cells, and
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

#### Perilla/rosmarinic acid — only as a formulation-specific candidate

- Small randomized placebo-controlled seasonal-allergic-rhinoconjunctivitis
  study of Perilla extract enriched for rosmarinic acid, PMID 14988517:
  https://pubmed.ncbi.nlm.nih.gov/14988517/
- Mechanistic paper combining human mast-cell experiments with mouse work, PMID
  21239739:
  https://pubmed.ncbi.nlm.nih.gov/21239739/
- Larger pediatric trials located used multicomponent products containing
  Perilla, quercetin, and vitamin D rather than Perilla alone (for example PMID
  30968678):
  https://pubmed.ncbi.nlm.nih.gov/30968678/

Verdict: defer unless the entry names the standardized extract/compound
precisely. Multicomponent results cannot be attributed to Perilla.

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

Verdict: biologically credible `mechanistic` candidate, but “butyrate” can mean
microbiome-derived local exposure, a salt supplement, or a prodrug. Do not make
a consumer supplement page until the intervention/formulation represented by
the evidence is defined.

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

Verdict: mechanistic signal, but no human outcome study located and the cited
LAD2 work includes high micromolar experimental concentrations. This is the
kind of candidate that would make the supplement list unlimited if admitted on
cell-line evidence alone.

#### Cinnamon/cinnamaldehyde — formulation-specific mechanistic candidate

- Primary human intestinal mast-cell study, PMID 25504111:
  https://pubmed.ncbi.nlm.nih.gov/25504111/
- Randomized intranasal standardized-cinnamon-extract allergic-rhinitis study,
  PMID 31780001:
  https://pubmed.ncbi.nlm.nih.gov/31780001/

Verdict: credible but formulation- and route-specific. Do not translate an
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
did alter selected cytokine/ROS endpoints. Verdict: defer or present only as a
narrow mechanistic entry; do not collapse ALA, EPA, DHA, and generic fish oil.

## Cross-cutting methodology issue for Claude

The current `rct-adjacent` definition is broad enough that almost every listed
antimediator drug can qualify through an RCT in urticaria, allergy, asthma, or
mastocytosis. This makes `observational` a poor description of direct MCAS
evidence whenever stronger but indirect evidence exists.

Before bulk reclassification, decide what the badge is meant to answer:

1. **Strongest evidence anywhere in a related condition** — then omalizumab,
   ketotifen, montelukast, famotidine, and DAO should be reclassified as above.
2. **Strongest evidence specifically in MCAS** — then the current definition
   and several existing `rct-adjacent` entries are misleading and the tier model
   should be redesigned.

The user has also asked to remove the separate `confoundRisk` label because it
can be mistaken for medication danger. Do not implement piecemeal: methodology,
schema validation, lint rules, components, appointment output, and content must
change together.

### RCT tiers must require interpretable results, not merely an RCT design

The terminated PEA/FSD201 study `NCT05652907` enrolled two participants and
cannot estimate an intervention effect. Yet the current `rct-mcas` definition
only says “one or more randomized controlled trials enrolling patients.” Taken
literally, that failed study could earn the site's strongest badge.

Revise the definition/check so an RCT tier requires publicly available,
evaluable outcome results from a completed or sufficiently analysed randomized
comparison. A registry protocol, an unreported trial, or a terminated trial
with no analysable comparison belongs in trial status, not in evidence strength.

### “OTC” is not an adequate regulatory label for supplements

Every current supplement uses `regulatory: otc`. The displayed definition says
only “available without a prescription,” but it appears under “Regulatory
status” beside FDA-approval categories. Patients can reasonably read that as an
OTC-drug status.

FDA states that dietary supplements generally do not receive premarket approval
for safety or effectiveness:
https://www.fda.gov/food/information-consumers-using-dietary-supplements/questions-and-answers-dietary-supplements

Recommended design: add a supplement-specific value/label such as “US dietary
supplement — not FDA-approved as a drug,” while reserving `otc` for
nonprescription drugs regulated under OTC monographs or approved applications.
Availability and approval are different axes and should not be collapsed.

## Next research steps

1. Complete the direct-source audit for luteolin, quercetin, and PEA.
2. Verify current FDA and non-US regulatory facts for every medication.
3. Verify ClinicalTrials.gov v2 status for masitinib and other investigational
   agents.
4. Research Priority A unlisted medications through primary sources.
5. Build a screened supplement table with include/defer/reject verdicts.
6. Propose a finite class-representation rule so discovery remains coherent.
