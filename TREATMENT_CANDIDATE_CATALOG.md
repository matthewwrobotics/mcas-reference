# MCAS Reference treatment candidate catalog

Screened: 2026-08-21
Audience: Claude or any editor expanding the medication and supplement index
Companion file: `RESEARCH_HANDOFF.md`

This is a research backlog, not a treatment list or a recommendation. A name in
this file means that it was screened; it does not mean that the intervention is
appropriate for MCAS. This research pass did not identify an FDA indication specifically for MCAS.

## Governing editorial decision from the project owner

This reference is intended to map the treatment landscape, including emerging
and specialist-practice options. It is not limited to interventions supported
by randomized trials. MCAS research is young and slow-moving, so the absence of
a controlled trial must change the evidence label, not automatically erase a
treatment from the index.

Claude should include a medication or supplement when a traceable source shows
at least one of the following:

- direct use in a person or cohort diagnosed with MCAS, including a case report
  or uncontrolled series;
- documented use or discussion by a clinician-researcher who regularly treats
  and publishes about MCAS, such as Tania T. Dempsey or Lawrence B. Afrin;
- human evidence in a closely adjacent mast-cell-mediated condition; or
- a distinct mast-cell mechanism worth presenting as laboratory or preclinical
  evidence.

The page must say which of those bridges supports inclusion. Practitioner use
is its own **specialist-practice** evidence category: it is clinically relevant
but is not proof of efficacy, a regulatory approval, or professional consensus.
Name a practitioner only when an authored paper, clinical guidance, recorded
presentation, or other durable first-party source documents the use; do not
convert reputation or second-hand anecdotes into evidence.

Very-low-certainty entries remain useful when they are labelled plainly as
case-level, uncontrolled, off-label, adjacent-condition, laboratory-only, or
preclinical. Risks, contraindications, regulatory status, and uncertainty must
remain separate from the reason the treatment is included.

Implementation note for Claude: the site field is `specialistUse`. Each item
requires a controlled `basis`, named `clinicians`, and a `sourceUrl` matching a
citation on the entry. It renders as **Documented specialist use**. Use
`treating-author-report`, `authored-clinical-guidance`, or
`recorded-first-party-discussion`; never apply it from reputation or a
second-hand account.

## How to use this catalog

The catalog separates five editorial decisions:

- **Add next:** a distinct entry can clear the current schema with primary or
  regulator sources already identified.
- **Add after structure:** the evidence object is real, but the current flat
  medication/supplement index would misclassify an emergency intervention, a
  local product, a clonal-disease treatment, or a formulation-specific product.
- **Class alias:** the name is not missing; it belongs under an existing or
  proposed representative class page unless it has a material mechanistic,
  route, regulatory, or evidence distinction.
- **Watch / emerging:** a targeted program or early evidence object that should
  be discoverable with its developmental or low-certainty status visible.
- **Hold:** the treatment identity, formulation, source, or attribution is not
  yet defined well enough to describe accurately. A case report, uncontrolled
  series, or preclinical experiment is not, by itself, a reason to hold.

“All” is bounded here to interventions meeting at least one of these discovery
criteria:

1. named in a mainstream MCAS or mastocytosis management paper;
2. exposed to people diagnosed with MCAS or another mast-cell disease;
3. reported in a randomized mastocytosis, idiopathic-anaphylaxis, or chronic-
   spontaneous-urticaria comparison with a coherent mast-cell bridge;
4. studied in primary, tissue-derived, or cultured human mast cells;
5. directed at IgE/FcεRI, BTK, KIT, MRGPRX2, Siglec, JAK/TYK, or another
   defined mast-cell pathway in a registered human program; or
6. named as a natural mast-cell-stabilizer candidate in the two structured
   source reviews cited below; or
7. documented in a durable first-party source as part of specialist MCAS
   practice, with the practitioner-use basis kept distinct from study evidence.

The boundary intentionally excludes every generic drug that could palliate one
symptom, unsupported patient anecdotes, brands/biosimilars that do not change
the evidence object, and unnamed medicinal-chemistry research compounds. Those
universes have no stable endpoint.

## Already live — do not duplicate

### Medications

Aspirin; avapritinib; azelastine nasal spray; barzolvolimab; benzodiazepines (lorazepam representative);
cetirizine; cromolyn sodium; cyclosporine;
doxepin; dupilumab; epinephrine; GLP-1-based medicines; hydroxyurea; hydroxyzine;
Hymenoptera venom immunotherapy; imatinib; hydroxychloroquine; ketotifen;
low-dose naltrexone; masitinib; midostaurin; montelukast; olopatadine ophthalmic
solution; omalizumab;
remibrutinib; rupatadine; sunitinib; systemic corticosteroids (prednisone
representative); TLL-018; tofacitinib; tranilast; zileuton.

### Supplements

Diamine oxidase; epigallocatechin gallate; luteolin; palmitoylethanolamide;
quercetin; resveratrol; rosmarinic-acid-enriched Perilla extract.

## Medication queue

### Direct-human emerging entries implemented 2026-08-24

These were the next direct-human objects after the first four
emerging/refractory entries. They now have source-audited pages and should not
return to the implementation queue unless new evidence changes their boundary.

| Candidate | Why it is a separate evidence object | Strongest source bridge | Principal limit to state |
| --- | --- | --- | --- |
| **Benzodiazepine class / lorazepam representative** | Direct MCAS survey exposure plus a distinct downstream GABA-receptor and proposed mast-cell rationale | The 553-person multicenter MCAS survey reports 324 exposed participants and a first-party practice discussion, [PMID 40686928](https://pubmed.ncbi.nlm.nih.gov/40686928/) | Retrospective self-report, extensive concurrent care, class/agent boundary, sedation, dependence, withdrawal, and interaction risks |
| **Hydroxychloroquine** | Broad immunomodulator with a four-person mixed mast-cell-disease report | Two MCAS and two cutaneous-mastocytosis cases, [PMID 30004016](https://pubmed.ncbi.nlm.nih.gov/30004016/), plus primary randomised chronic-urticaria reports [PMID 28884989](https://pubmed.ncbi.nlm.nih.gov/28884989/) and [PMID 15086698](https://pubmed.ncbi.nlm.nih.gov/15086698/) | Very small mixed population, no comparator, nonselective mechanism, retinal/cardiac and interaction boundaries |

### Emergency and step-7 entries implemented 2026-08-24

| Candidate | Implemented structure | Evidence anchor | Principal limit preserved |
| --- | --- | --- | --- |
| **Epinephrine/adrenaline** | `emergency-intervention`, rendered before the maintenance sequence | 2025 practical MCAS approach, [PMID 41272881](https://pubmed.ncbi.nlm.nih.gov/41272881/), and 5,364-event anaphylaxis registry cohort [PMID 37689113](https://pubmed.ncbi.nlm.nih.gov/37689113/) | The cohort is not MCAS-specific or randomised; the page is not an individualized emergency plan |
| **Systemic corticosteroids** | Step 7, represented by prednisone rather than duplicated molecule pages | 2025 practical MCAS approach and 1996 idiopathic-anaphylaxis series [PMID 8885805](https://pubmed.ncbi.nlm.nih.gov/8885805/) | Bundled uncontrolled regimen, later confounded registry findings, and major class-wide adverse-effect burden |

### Trigger-specific and local-route entries implemented 2026-08-24

| Candidate | Implemented structure | Evidence anchor | Principal limit preserved |
| --- | --- | --- | --- |
| **Hymenoptera venom immunotherapy** | `trigger-specific`, outside the systemic maintenance sequence | Prospective systemic-mastocytosis plus venom-allergy cohort, [PMID 24565619](https://pubmed.ncbi.nlm.nih.gov/24565619/) | Defined sensitization only; uncontrolled field re-stings and no MCAS-wide outcome; the current biologic label requires supervised specialist administration |
| **Olopatadine ophthalmic solution** | `local-route`, represented as an eye product rather than a systemic H1 page | Ten-person randomized conjunctival-allergen-challenge study measuring tear histamine, [PMID 14667955](https://pubmed.ncbi.nlm.nih.gov/14667955/) | Local ocular exposure in allergic conjunctivitis, different study and current-label concentrations, and no systemic MCAS inference |
| **Azelastine nasal spray** | `local-route`, represented as an intranasal product rather than another systemic H1 page | Randomized perennial-allergic-rhinitis study, [PMID 37920410](https://pubmed.ncbi.nlm.nih.gov/37920410/), with the historical oral mastocytosis crossover retained as a route boundary, [PMID 8104966](https://pubmed.ncbi.nlm.nih.gov/8104966/) | The nasal trial measured symptom scores rather than mast-cell activation; the oral comparator study cannot establish a nasal-route or MCAS outcome |

### Remaining after a section or schema decision

| Candidate or group | Required structure | Evidence anchor | Editorial decision |
| --- | --- | --- | --- |
| **Nedocromil** | Local airway/ocular stabilizer section | Randomized asthma reports, [PMID 8111606](https://pubmed.ncbi.nlm.nih.gov/8111606/) and [PMID 11421896](https://pubmed.ncbi.nlm.nih.gov/11421896/) | Do not imply that an ocular or inhaled product is a systemic MCAS intervention |
| **Lodoxamide, pemirolast, and epinastine** | Eye symptom-product section | Class and product evidence is summarized in `RESEARCH_HANDOFF.md` | Add only with formulation and route in the page title; these are not one generic systemic “mast-cell stabilizer” object |
| **Topical miltefosine** | Cutaneous-mastocytosis/local-therapy section | Randomized cutaneous-mastocytosis study, [PMID 19785605](https://pubmed.ncbi.nlm.nih.gov/19785605/) | The studied formulation produced local irritation and did not support a systemic page |
| **Pharmaceutical-grade cannabidiol** | Formulation-specific pain/symptom section, or tightly defined supplement page | Uncontrolled mastocytosis-associated-pain pilot, [PMID 36831056](https://pubmed.ncbi.nlm.nih.gov/36831056/); IgE mast-cell mouse study, [PMID 38059783](https://pubmed.ncbi.nlm.nih.gov/38059783/) | Do not merge pharmaceutical CBD, retail CBD, cannabis extract, and MCAS disease control |
| **Calcitriol** | Medication page separate from nutritional vitamin D | Human/mouse mast-cell mechanism, [PMID 24461581](https://pubmed.ncbi.nlm.nih.gov/24461581/) | Active hormone pharmacology is not interchangeable with vitamin D supplements or correction of deficiency |
| **Suplatast tosilate** | Non-US oral antiallergic section | Randomized asthma/rhinitis reports [PMID 11071181](https://pubmed.ncbi.nlm.nih.gov/11071181/), [PMID 12107601](https://pubmed.ncbi.nlm.nih.gov/12107601/), and [PMID 18070163](https://pubmed.ncbi.nlm.nih.gov/18070163/); [PMDA guide](https://www.info.pmda.go.jp/downfiles/guide/ph/400107_4490016R1020_1_00G.pdf) | Lower priority than tranilast; the human trials are adjacent and the mast-cell bridge is primarily animal work |

### Class aliases — names that should not each become pages

| Representative page | Put these names under the class unless a later study creates a real distinction |
| --- | --- |
| **Cetirizine — second-generation H1** | loratadine, desloratadine, fexofenadine, levocetirizine, bilastine, bepotastine; rupatadine remains separate because of PAF antagonism and a mastocytosis trial |
| **Hydroxyzine — first-generation H1** | diphenhydramine, chlorpheniramine, cyproheptadine; ketotifen remains separate because the live page represents its additional stabilizer rationale |
| **Famotidine — H2** | cimetidine and nizatidine; do not revive ranitidine as a current representative |
| **Montelukast — leukotriene receptor antagonist** | zafirlukast and pranlukast; zileuton remains separate because it blocks synthesis rather than the receptor |
| **Omalizumab — approved anti-IgE** | biosimilars such as CT-P39/omlyclo and copy products; ligelizumab, UB-221, LP-003, and YH35324 stay watch items because they are distinct molecules but not current MCAS entries |
| **Remibrutinib — approved BTK inhibitor** | fenebrutinib, rilzabrutinib, TAS5315, HWH486, and other pipeline BTK agents should not all become pages merely because a trial exists |
| **Systemic corticosteroid class** | prednisone, prednisolone, methylprednisolone, dexamethasone; separate only if a specific mast-cell-disease study requires it |

### Lower-priority human evidence objects

These can technically clear the current inclusion bar, but should follow the
entries above.

| Candidate | Evidence object | Disposition |
| --- | --- | --- |
| **Ligelizumab** | Randomized CSU reports, [PMID 31577874](https://pubmed.ncbi.nlm.nih.gov/31577874/) and [PMID 38008109](https://pubmed.ncbi.nlm.nih.gov/38008109/) | Watch or historical anti-IgE page; no MCAS-specific outcome paper found |
| **Rilzabrutinib** | Randomized phase 2 CSU report, [PMID 40266575](https://pubmed.ncbi.nlm.nih.gov/40266575/) | Watch below approved remibrutinib; its US approval is for another condition |
| **TAS5315** | Randomized phase 2a CSU report, [PMID 42448553](https://pubmed.ncbi.nlm.nih.gov/42448553/) | Watch below remibrutinib unless the site deliberately profiles multiple BTK generations |
| **Lirentelimab** | Siglec-8 biology, randomized eosinophilic-gastritis/duodenitis report [PMID 33085861](https://pubmed.ncbi.nlm.nih.gov/33085861/), and open-label urticaria study [PMID 34954198](https://pubmed.ncbi.nlm.nih.gov/34954198/) | Hold: mixed eosinophil/mast-cell biology and terminated CSU development |
| **Methotrexate, azathioprine, dapsone, mycophenolate, sulfasalazine, and tripterygium glycosides** | Conventional chronic-urticaria immunomodulators summarized across randomized evidence in [PMID 40663028](https://pubmed.ncbi.nlm.nih.gov/40663028/) and [PMID 37567010](https://pubmed.ncbi.nlm.nih.gov/37567010/) | Add only if the site intentionally broadens to refractory-CSU immunomodulation; none is a selective mast-cell therapy |
| **Cannabidiol** | Formulation-specific mastocytosis pain pilot rather than a mast-cell-disease outcome | See the structure decision above; do not make a generic retail-supplement page |

### Clonal mast-cell disease comparators and legacy agents

These belong in a clearly labeled systemic-mastocytosis/oncology section, not
in a general MCAS treatment stream.

| Candidate | Evidence/status | Disposition |
| --- | --- | --- |
| **Bezuclastinib** | Selective KIT inhibitor; [NCT05186753](https://clinicaltrials.gov/study/NCT05186753) and [NCT04996875](https://clinicaltrials.gov/study/NCT04996875) | Watch until a peer-reviewed primary outcome is available for the intended page claim |
| **Elenestinib / BLU-263** | KIT inhibitor; [NCT04910685](https://clinicaltrials.gov/study/NCT04910685) and [NCT05609942](https://clinicaltrials.gov/study/NCT05609942) | Watch; registry history is mixed and no primary outcome paper was verified in this pass |
| **Cladribine** | Observational systemic-mastocytosis cytoreduction; [PMID 34729775](https://pubmed.ncbi.nlm.nih.gov/34729775/) | Legacy comparator only |
| **Interferon alfa** | Small systemic-mastocytosis clinical series, [PMID 9580806](https://pubmed.ncbi.nlm.nih.gov/9580806/) | Legacy comparator only; tolerability and modern disease selection are central limits |
| **Dasatinib and nilotinib** | Early phase systemic-mastocytosis programs, including [PMID 18559612](https://pubmed.ncbi.nlm.nih.gov/18559612/) and [PMID 26002753](https://pubmed.ncbi.nlm.nih.gov/26002753/) | Historical KIT/kinase-program pages only, below approved targeted agents |
| **Brentuximab vedotin** | Small phase 2 advanced systemic-mastocytosis study, [PMID 31350306](https://pubmed.ncbi.nlm.nih.gov/31350306/) | Historical clonal-disease page only |

### Direct-MCAS reports — implemented with very-low-certainty labels

- **Low-dose naltrexone:** now live. The page adds the later 553-person survey
  ([PMID 40686928](https://pubmed.ncbi.nlm.nih.gov/40686928/)) to the small
  pain-focused cohort and bundled case, while keeping all three uncontrolled
  and distinguishing specialist-use documentation from drug attribution.
- **Tofacitinib:** two-case MCAS report,
  [PMID 28382662](https://pubmed.ncbi.nlm.nih.gov/28382662/), plus a major
  broad-immunosuppressive safety burden. Now live in the emerging/refractory
  group with case-report evidence and boxed-warning context prominent.
- **Sunitinib:** single MCAS case,
  [PMID 26072665](https://pubmed.ncbi.nlm.nih.gov/26072665/), and oncology-level
  safety context. Now live as a historical, case-level emerging/refractory
  entry, separate from the routine sequence.
- **Ultramicronized PEA / FSD201:** the direct MCAS pain trial
  [NCT05652907](https://clinicaltrials.gov/study/NCT05652907) terminated after
  two participants for business reasons. This is a trial fact, not an outcome;
  keep it on the live PEA page only as a limitation if the page is revised.
- **Bundled case regimens:** do not create pages when a report changed several
  drugs, supplements, diet, or trigger exposure at the same time.

Bundled reports specifically screened here include continuous diphenhydramine
with imatinib ([PMID 28438191](https://pubmed.ncbi.nlm.nih.gov/28438191/));
naltrexone with intravenous immunoglobulin and an antibiotic
([PMID 29326369](https://pubmed.ncbi.nlm.nih.gov/29326369/)); cannabidiol with
orphenadrine ([PMID 41370840](https://pubmed.ncbi.nlm.nih.gov/41370840/)); and a
complex regimen containing montelukast, cromolyn, quercetin/bromelain, and
digestive enzymes ([PMID 40809669](https://pubmed.ncbi.nlm.nih.gov/40809669/)).
They document exposure and may be cited as such on relevant entries, but they
do not attribute the observation to each component.

### Mechanistic repurposing leads — preserve, but do not prioritize

- **Ibrutinib and acalabrutinib:** human allergy-challenge proof of BTK
  pharmacology, including [PMID 28389390](https://pubmed.ncbi.nlm.nih.gov/28389390/),
  [PMID 29360526](https://pubmed.ncbi.nlm.nih.gov/29360526/), and
  [PMID 37384412](https://pubmed.ncbi.nlm.nih.gov/37384412/). Their oncology
  regulatory and safety objects make them poor substitutes for the live,
  CSU-approved remibrutinib page.
- **Ruxolitinib:** selected LAD2/HMC-1 endpoints,
  [PMID 29939445](https://pubmed.ncbi.nlm.nih.gov/29939445/), but no direct
  clinical MCAS comparison in the completed search and a broad JAK-regulatory
  object.
- **WHI-P131 / WHI-131:** preclinical JAK3-labelled compound with an important
  later target-validity caveat; see [PMID 10480916](https://pubmed.ncbi.nlm.nih.gov/10480916/)
  and [PMID 15852029](https://pubmed.ncbi.nlm.nih.gov/15852029/).
- **Tacrolimus / FK506:** included in the human lung mast-cell calcineurin
  experiment [PMID 17200674](https://pubmed.ncbi.nlm.nih.gov/17200674/), but the
  experiment questioned a simple shared mechanism with cyclosporine and does
  not create an MCAS outcome page.
- **Statins:** older human/rodent mast-cell experiments are cataloged in
  [PMID 23441583](https://pubmed.ncbi.nlm.nih.gov/23441583/). Do not create a
  class page without a clinically coherent mast-cell-disease evidence object.
- **Engineered anti-IgE DARPins, inhibitory-receptor fusion molecules, and
  mast-cell-directed cell therapies:** preclinical platforms rather than
  medications with human outcome evidence. Keep as horizon scanning, not
  patient pages.

### Current targeted pipeline watchlist

Registry statuses below were read from ClinicalTrials.gov on 2026-08-21. A
registry protocol is not outcome evidence.

| Candidate | Target/class | Current public state | Page decision |
| --- | --- | --- | --- |
| **Briquilimab** | anti-KIT antibody | CSU study [NCT06162728](https://clinicaltrials.gov/study/NCT06162728) completed without posted results | Watch |
| **BLU-808** | wild-type KIT inhibitor | CSU/CIndU study [NCT06931405](https://clinicaltrials.gov/study/NCT06931405) active, not recruiting | Watch |
| **EVO756** | MRGPRX2 antagonist | CSU study [NCT06873516](https://clinicaltrials.gov/study/NCT06873516) completed without posted results | Watch; do not assign randomized evidence yet |
| **Povorcitinib** | JAK1 inhibitor | CSU study [NCT05936567](https://clinicaltrials.gov/study/NCT05936567) completed with registry results | Require full primary-source review before a page |
| **Ritlecitinib** | JAK3/TEC-family inhibitor | earlier study withdrawn, but a newer CSU study [NCT07219615](https://clinicaltrials.gov/study/NCT07219615) is recruiting | Restore to watchlist; the older handoff disposition is no longer the whole program state |
| **HWH486** | BTK inhibitor | [NCT06295302](https://clinicaltrials.gov/study/NCT06295302) has unknown/stale status | Watch |
| **HS-10561** | BTK inhibitor | [NCT06864507](https://clinicaltrials.gov/study/NCT06864507) not yet recruiting | Watch |
| **BGB-16673** | BTK degrader | [NCT07005713](https://clinicaltrials.gov/study/NCT07005713) completed without posted results | Watch |
| **LP-003, UB-221, YH35324, HRS-3095, ICP-332, lesigercept, JYB1904, THB335, Alpha-0261, BBT001, and MG-K10** | newer anti-IgE, kinase, biologic, or undisclosed programs | Registry records exist, but this pass did not verify both a peer-reviewed mechanism source and an evaluable primary outcome for a patient-facing claim | Discovery watchlist only; do not create pages from registry names |

### Stopped, negative, or historical adjacent programs

Do not add these as forward-looking options. They may belong in a future
“what has been tested” or negative-evidence section.

- **Fenebrutinib** — randomized CSU report,
  [PMID 34750553](https://pubmed.ncbi.nlm.nih.gov/34750553/); development did
  not progress and liver-enzyme abnormalities were reported.
- **Tezepelumab** — phase 2b CSU report,
  [PMID 39956278](https://pubmed.ncbi.nlm.nih.gov/39956278/).
- **Benralizumab** — randomized CSU report,
  [PMID 38367194](https://pubmed.ncbi.nlm.nih.gov/38367194/).
- **Mepolizumab** — very small CSU registry program
  [NCT03494881](https://clinicaltrials.gov/study/NCT03494881).
- **Sarilumab** — randomized indolent-systemic-mastocytosis report,
  [PMID 40529483](https://pubmed.ncbi.nlm.nih.gov/40529483/).
- **Izuforant / LEO 152020** — H4-antagonist crossover report,
  [PMID 38308655](https://pubmed.ncbi.nlm.nih.gov/38308655/).
- **Quilizumab** — historical randomized CSU anti-IgE program,
  [PMID 27567329](https://pubmed.ncbi.nlm.nih.gov/27567329/).
- **THB001, EP262, AK006, tirabrutinib, and INF904** — stopped or withdrawn
  adjacent programs. Preserve exact registry reasons; do not infer that every
  termination was caused by safety or lack of activity.

## Supplement queue

The site should not exclude supplements solely because trials are absent. It
should instead separate human, specialist-practice, adjacent-condition,
laboratory, animal, and formulation evidence so that a broad discovery map does
not look like a recommendation catalog. A chemically distinct laboratory-only
candidate may be included when that status and the exposure gap are explicit.

### Strongest missing supplement/formulation candidates

| Candidate | Strongest bridge | Page decision | Required limitation |
| --- | --- | --- | --- |
| **Curcumin** | Human pre-basophil/rat cell mechanism, [PMID 31773429](https://pubmed.ncbi.nlm.nih.gov/31773429/); randomized allergic-rhinitis report, [PMID 27789120](https://pubmed.ncbi.nlm.nih.gov/27789120/) | Add after the page defines the exact compound/formulation; otherwise watch | Bioavailability and formulation vary; cell-line and rhinitis evidence are not MCAS outcomes |
| **Butyrate** | Primary human-mast-cell epigenomic study, [PMID 40498295](https://pubmed.ncbi.nlm.nih.gov/40498295/) | Add after choosing sodium butyrate, another salt/prodrug, or endogenous microbial exposure as the evidence object | Those forms have different exposure and cannot share one generic supplement claim |
| **Vitamin D3** | Vitamin-D-metabolite human/mouse mast-cell mechanism, [PMID 24461581](https://pubmed.ncbi.nlm.nih.gov/24461581/); randomized adjacent rhinitis and CSU studies, including [PMID 33382385](https://pubmed.ncbi.nlm.nih.gov/33382385/) and [PMID 40506831](https://pubmed.ncbi.nlm.nih.gov/40506831/) | Add only after splitting nutritional vitamin D3, correction of measured deficiency, calcidiol, and prescription calcitriol | The active-metabolite mechanism cannot be assigned directly to every retail vitamin D product |
| **Cinnamon extract / cinnamaldehyde** | Primary human intestinal-mast-cell study, [PMID 25504111](https://pubmed.ncbi.nlm.nih.gov/25504111/); randomized intranasal standardized-extract rhinitis study, [PMID 31780001](https://pubmed.ncbi.nlm.nih.gov/31780001/) | Add only as a route- and formulation-specific entry | Intranasal extract and isolated cinnamaldehyde do not establish a generic oral-cinnamon supplement object |
| **Omega-3 fatty acids** | EPA/DHA human-mast-cell-line paper, [PMID 23021516](https://pubmed.ncbi.nlm.nih.gov/23021516/); ALA studies, [PMID 34929479](https://pubmed.ncbi.nlm.nih.gov/34929479/) and [PMID 33113502](https://pubmed.ncbi.nlm.nih.gov/33113502/) | Split EPA/DHA from ALA and generic fish oil; then add only if the page preserves mixed endpoints | The EPA/DHA experiment did not move every degranulation endpoint in the same direction |
| **Methoxyluteolin / tetramethoxyluteolin** | Cultured human LAD2 mast-cell studies, including [PMID 28404689](https://pubmed.ncbi.nlm.nih.gov/28404689/), [PMID 30232261](https://pubmed.ncbi.nlm.nih.gov/30232261/), and [PMID 31669588](https://pubmed.ncbi.nlm.nih.gov/31669588/) | Reasonable laboratory-only standalone candidate because it is chemically distinct from luteolin | LAD2 experiments do not establish oral exposure, product equivalence, or an MCAS outcome |
| **Pharmaceutical-grade cannabidiol** | Mastocytosis-associated-pain pilot, [PMID 36831056](https://pubmed.ncbi.nlm.nih.gov/36831056/); experimental IgE mast-cell paper, [PMID 38059783](https://pubmed.ncbi.nlm.nih.gov/38059783/) | Add only after deciding whether it is a medication/formulation page or a supplement page | Never generalize the pharmaceutical preparation to retail CBD or from pain to mast-cell-disease control |

### Human mast-cell laboratory candidates — second wave

Each item below can clear the current mechanism-only schema, but a page should
remain explicitly laboratory-only unless a same-compound human outcome source
is added.

| Candidate | Human mast-cell object | Disposition |
| --- | --- | --- |
| **Fisetin** | HMC-1 studies, including [PMID 29604269](https://pubmed.ncbi.nlm.nih.gov/29604269/); mouse chronic-urticaria model [PMID 37410860](https://pubmed.ncbi.nlm.nih.gov/37410860/) | Second-wave lab page; HMC-1 is a neoplastic line |
| **Apigenin** | HMC-1 work, [PMID 30987029](https://pubmed.ncbi.nlm.nih.gov/30987029/) and [PMID 21142820](https://pubmed.ncbi.nlm.nih.gov/21142820/) | Second-wave lab page; mediator-specific and tumor-line limits must be visible |
| **Genistein** | Human mast-cell signaling report, [PMID 25319548](https://pubmed.ncbi.nlm.nih.gov/25319548/) | Second-wave lab page; phytoestrogen and exposure context required |
| **Myricetin** | LAD2 human mast-cell-line work summarized in [PMID 37998337](https://pubmed.ncbi.nlm.nih.gov/37998337/) and animal urticaria work [PMID 36649930](https://pubmed.ncbi.nlm.nih.gov/36649930/) | Second-wave lab page |
| **Nobiletin and tangeretin** | Human intestinal mast-cell experiments summarized in [PMID 37998337](https://pubmed.ncbi.nlm.nih.gov/37998337/) | Keep together only if the primary paper tested them as parallel compounds; no MCAS outcome claim |
| **Naringenin** | HMC-1 cytokine experiment plus animal allergy models summarized in [PMID 37998337](https://pubmed.ncbi.nlm.nih.gov/37998337/) | Lower-priority lab page |
| **Silymarin / silibinin** | HMC-1 and rodent mast-cell work, including [PMID 24045679](https://pubmed.ncbi.nlm.nih.gov/24045679/) | Define mixture versus constituent before adding |
| **Theanine** | HMC-1 and rodent work summarized in [PMID 23441583](https://pubmed.ncbi.nlm.nih.gov/23441583/) | Lower-priority lab page; no adjacent controlled human mast-cell-disease outcome |
| **Scopoletin** | HMC-1 cytokine work summarized in [PMID 23441583](https://pubmed.ncbi.nlm.nih.gov/23441583/) | Lower-priority lab page; the experiment did not support every mediator endpoint |
| **Glutamine plus arginine** | Human intestinal-mast-cell combined exposure summarized in [PMID 37998337](https://pubmed.ncbi.nlm.nih.gov/37998337/) | Do not split into individual pages because the experiment combined them; animal findings were not uniform |
| **Melatonin** | Human/animal mast-cell letter, [PMID 38253124](https://pubmed.ncbi.nlm.nih.gov/38253124/), alongside a separate food-allergy mechanism paper with a different direction, [PMID 39040920](https://pubmed.ncbi.nlm.nih.gov/39040920/) | Hold for a dedicated mixed-evidence review rather than a simple “stabilizer” page |

### Formulation or evidence problems — research/watch records until resolved

| Candidate | Why it is not implementation-ready |
| --- | --- |
| **Vitamin C** | Intravenous uncontrolled histamine findings [PMID 23666445](https://pubmed.ncbi.nlm.nih.gov/23666445/) cannot be transferred to oral supplements; an oral randomized study [PMID 7076989](https://pubmed.ncbi.nlm.nih.gov/7076989/) did not support the same bridge |
| **Boswellia / boswellic acids** | An asthma extract trial exists [PMID 9810030](https://pubmed.ncbi.nlm.nih.gov/9810030/), but extract composition and direct human-mast-cell evidence remain too poorly aligned for one generic page |
| **Kaempferol** | LAD2/mouse report [PMID 33002828](https://pubmed.ncbi.nlm.nih.gov/33002828/); exposure bridge is weak and admitting it alone would make the list arbitrarily broad |
| **Berberine** | FcεRI/MAPK and MRGPRX2 animal/cell work, including [PMID 30861392](https://pubmed.ncbi.nlm.nih.gov/30861392/) and [PMID 39515562](https://pubmed.ncbi.nlm.nih.gov/39515562/) |
| **Alpha-lipoic acid** | Rodent anaphylaxis-like model [PMID 21267406](https://pubmed.ncbi.nlm.nih.gov/21267406/); no defined human mast-cell-disease bridge |
| **N-acetylcysteine** | Searches located allergic-rhinitis animal work rather than a defined human mast-cell/MCAS evidence object |
| **Bromelain** | Searches located animal wound/mast-cell-count work rather than a defined human mast-cell/MCAS evidence object |
| **Thymoquinone / Nigella sativa** | Animal mast-cell and adjacent asthma/rhinitis literature use different extracts and outcomes; no single formulation-equivalent page is ready |
| **Probiotics/postbiotics** | Effects are strain-, preparation-, and disease-specific. Human-mast-cell work exists for selected strains, such as [PMID 21390145](https://pubmed.ncbi.nlm.nih.gov/21390145/) and [PMID 27621812](https://pubmed.ncbi.nlm.nih.gov/27621812/), but a generic “probiotics” page would be false equivalence |
| **Specialized quercetin or luteolin blends** | Do not transfer the live pure-compound evidence to phytosomes, multicomponent blends, or methylated analogues without product-specific sources |

### Complete preclinical natural-product watchlist

The following names are documented so they are not rediscovered and mistaken
for omissions. They come from the structured natural-stabilizer table in
[PMID 23441583](https://pubmed.ncbi.nlm.nih.gov/23441583/) and the dietary
component tables in [PMID 37998337](https://pubmed.ncbi.nlm.nih.gov/37998337/).
Most were tested in rodent mast cells, leukemia-derived lines, or animal
allergy models. Keep them discoverable as preclinical research/watch records.
If any receives a standalone public page, label the lack of human exposure and
formulation evidence directly; prioritize it when a human or documented
specialist-practice bridge appears.

- **Flavonoids and related polyphenols:** diosmetin; morin; ginkgetin;
  hesperetin; eriodictyol; chrysin; baicalein/baicalin; licochalcone A;
  dihydromyricetin; ellagic acid; caffeic acid; chlorogenic acid; polydatin;
  bisdemethoxycurcumin; alpha-, beta-, and gamma-mangostin.
- **Coumarins and phenolics:** scopoletin; scoparone; artekeiskeanol
  A; selinidin; cinnamic acid; thunberginols; osthole; khellin; magnolol;
  honokiol.
- **Terpenoids/alkaloids:** parthenolide/feverfew; dehydroleucodine;
  xanthatin; sesquiterpene-lactone mixtures; borneol; camphene; linalool;
  nerolidol; sinomenine; indoline; xestospongin C.
- **Carotenoids:** astaxanthin; fucoxanthin; fucoxanthinol; zeaxanthin;
  beta-carotene; beta-cryptoxanthin; lycopene; 3-hydroxyechinenone;
  siphonaxanthin.
- **Amino acids and metabolites:** glycine; propionate; theanine. Glutamine
  and arginine remain one combined experimental object, not two supplement
  pages.
- **Plant/extract objects:** Aceriphyllum rossii extract; mangosteen rind;
  Magnolia bark constituents; Perilla products not composition-matched to the
  standardized trial; generic cinnamon products not matched to the intranasal
  study.

The 2025 PhAROS paper, [PMID 40950138](https://pubmed.ncbi.nlm.nih.gov/40950138/),
is useful for discovery but does not change these page decisions. It combines
phytomedical data, predicted targets, internal ranking, and selected in-vitro
work, and explicitly positions candidates for later validation.

## Recommended build order for Claude

1. Continue the local-route group after the implemented olopatadine and
   intranasal-azelastine pages with only formulation-matched candidates:
   **lodoxamide, pemirolast, epinastine, nedocromil**, and the cutaneous-mastocytosis-specific
   **topical miltefosine** object.
2. For supplements, resolve the formulation identity before adding
   **curcumin, butyrate, vitamin D, cinnamon/cinnamaldehyde, omega-3 species,
   methoxyluteolin, or cannabidiol**. Rosmarinic-acid-enriched Perilla leaf
   extract is already live as the specifically studied object; do not broaden
   it to other Perilla forms.
3. Add chemically distinct human-cell candidates as laboratory-only entries and
   keep registry-only pipeline compounds visible as investigational/watch
   records until an evaluable primary source exists.
4. Maintain a recurring specialist-practice audit using durable first-party
   sources from MCAS clinician-researchers; add `specialistUse` only when a
   named clinician's own durable source qualifies, and let the UI render the
   separate **Documented specialist use** tag.

Before publishing any entry, reopen every cited source, verify every PMID with
PubMed/E-utilities, read current regulator labeling, refresh trial status from
ClinicalTrials.gov v2, set `lastVerified` only after that human review, and run
`npm run validate`.
