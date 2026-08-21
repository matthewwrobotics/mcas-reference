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
- FDA food-allergy approval announcement:
  https://www.fda.gov/news-events/press-announcements/fda-approves-first-medication-help-reduce-allergic-reactions-multiple-foods-after-accidental

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

The entry's current `NCT04333108` status must still be verified separately
through the ClinicalTrials.gov v2 API before any implementation.

### Cetirizine — tier correct, primary source missing

Current and recommended tier: `rct-adjacent`

The current sources are reviews. A clean primary citation is:

- Multicenter randomized double-blind placebo-controlled chronic-urticaria
  trial, PMID 8893110:
  https://pubmed.ncbi.nlm.nih.gov/8893110/

Other verified RCTs exist (PMIDs 7622644, 1827614, and 1681778), but one strong
representative primary trial is probably sufficient alongside the management
review.

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

### Luteolin, quercetin, and PEA — no tier change established yet

The cited PMIDs and titles resolve correctly through E-utilities. Their current
`mechanistic` tier is plausible, but the audit is incomplete. Remaining work:

- trace review claims to the strongest primary human-mast-cell experiments;
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

For each, require a traceable primary mast-cell mechanism and investigate human
exposure, formulation equivalence, adjacent clinical evidence, and safety or
interaction issues. Reject candidates whose only support is supplement
marketing or implausibly high in-vitro concentrations.

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

## Next research steps

1. Complete the direct-source audit for luteolin, quercetin, and PEA.
2. Verify current FDA and non-US regulatory facts for every medication.
3. Verify ClinicalTrials.gov v2 status for masitinib and other investigational
   agents.
4. Research Priority A unlisted medications through primary sources.
5. Build a screened supplement table with include/defer/reject verdicts.
6. Propose a finite class-representation rule so discovery remains coherent.
