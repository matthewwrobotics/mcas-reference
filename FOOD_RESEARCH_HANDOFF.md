# Food-section research handoff

Prepared for Claude on 2026-08-21. This is a research artifact, not published
site content. Codex read the cited full texts and verified the PubMed metadata,
but the site's policy says `lastVerified` records a **human** source check. Do
not copy this date into food entries unless a human has opened the supporting
source and confirmed the proposed wording.

## Bottom line

There is enough reusable, open-access food-composition evidence to expand the
directory materially without copying proprietary lists. The best immediate
additions are:

1. avocado;
2. strawberry;
3. chickpeas;
4. mushrooms;
5. sweet potato;
6. kiwi;
7. apple;
8. Swiss chard;
9. beer; and
10. soy sauce or canned tuna as a processing-sensitive example.

The first five are especially useful because they put two or three independent
axes or sources beside one another. They make the directory more informative
without pretending that measured content predicts an individual patient's
tolerance.

Three open sources can support this expansion:

- a 2018 review of measured histamine and other biogenic amines in
  non-fermented plant foods (PMID 30558197);
- a 2023 review compiling total, soluble, and insoluble oxalate per 100 g fresh
  weight (PMID 37685134); and
- a 2025 systematic review of histamine measurements in Brazilian-market foods
  (PMID 41256231).

All three full texts are available under CC BY 4.0. Registering them as `open`
is supportable. The source-specific mapping rules still need to be stated
plainly in `src/content/sources.json`; the papers do not all use the site's
four labels.

Do **not** add a salicylate or lectin rating merely to fill an empty axis. The
available evidence does not yet fit the site's ordinal rating model cleanly.
Do **not** create a “histamine liberator” axis: the latest review says the
mechanism has not been elucidated and the evidence is inconclusive.

## Current-state audit

Authoritative files inspected:

- `src/content/foods.json`
- `src/content/sources.json`
- `src/content.config.ts`
- `src/lib/vocab.ts`
- `src/pages/foods/index.astro`
- `src/pages/methodology.astro`

The current directory has 34 foods and six sources.

| Category | Foods |
|---|---:|
| Beverage | 2 |
| Dairy | 1 |
| Fermented | 3 |
| Fish | 2 |
| Fruit | 3 |
| Grains and pseudocereals | 5 |
| Legumes | 5 |
| Nuts and seeds | 4 |
| Other | 1 |
| Vegetable | 8 |

Ratings currently present, including link-only references:

| Axis | Rating records |
|---|---:|
| Histamine | 48 |
| Oxalate | 34 |
| FODMAP | 4 |
| Tyramine | 3 |
| Other amines | 0 |
| Salicylate | 0 |
| Lectin | 0 |

The existing 2020 kidney review's 20-food oxalate table is already exhausted:
all 20 foods from that table are present. Additional oxalate coverage therefore
requires a new source rather than more extraction from PMID 32887293.

## Sources ready to register

### `plant-amines-2018`

**Citation:** Sánchez-Pérez S, et al. “Biogenic Amines in Plant-Origin Foods:
Are They Frequently Underestimated in Low-Histamine Diets?” *Foods*. 2018.

- PubMed: https://pubmed.ncbi.nlm.nih.gov/30558197/
- Full text: https://pmc.ncbi.nlm.nih.gov/articles/PMC6306728/
- DOI: https://doi.org/10.3390/foods7120205
- PMCID: PMC6306728
- License: CC BY 4.0
- Evidence type: selective food-composition review plus the authors' database
  of Spanish-market products.
- Search scope: PubMed and Web of Science; original analytical studies, reviews,
  and food-content compilations published from 1990 onward.
- Main reusable table: Table 4, measured ranges in mg/kg fresh weight.

Important interpretation:

- The table's superscript `a` means histamine was reported in the food.
- Superscript `b` means no histamine was reported but the authors classify the
  food as having high amounts of other amines.
- Superscript `c` means the authors classify all measured amines as low.
- A dash means the value was **not reported**. It must not be converted into a
  low rating.
- `nd` means not detected. Detection limits vary by underlying study.
- “Other amines” here includes putrescine, cadaverine, spermidine, and spermine;
  keep tyramine on its existing separate axis.
- The authors propose DAO competition as one possible explanation for the
  relevance of putrescine/cadaverine/polyamines. That is a hypothesis, not a
  demonstrated MCAS trigger mechanism. Notes should describe content first and
  label the clinical inference as uncertain.

Draft registry object:

```json
{
  "id": "plant-amines-2018",
  "name": "Biogenic Amines in Plant-Origin Foods (Foods, 2018)",
  "url": "https://pubmed.ncbi.nlm.nih.gov/30558197/",
  "kind": "Peer-reviewed food-composition review, open access",
  "redistribution": "open",
  "terms": "CC BY 4.0 and read in full text. Table 4 reports measured ranges of histamine, tyramine, putrescine, cadaverine, spermidine and spermine in non-fermented plant foods. A dash means not reported, not low; nd means not detected under the cited study's method. Other-amine ratings here follow the paper's own high-versus-low qualitative groupings rather than a clinical symptom threshold."
}
```

### `oxalate-foods-2023`

**Citation:** Salgado N, et al. “Oxalate in Foods: Extraction Conditions,
Analytical Methods, Occurrence, and Health Implications.” *Foods*. 2023.

- PubMed: https://pubmed.ncbi.nlm.nih.gov/37685134/
- Full text: https://pmc.ncbi.nlm.nih.gov/articles/PMC10486698/
- DOI: https://doi.org/10.3390/foods12173201
- PMCID: PMC10486698
- License: CC BY 4.0
- Main reusable table: Table 5, values standardized to mg/100 g fresh weight.

Important interpretation:

- Use total oxalate when it is reported. Do not silently substitute soluble
  oxalate for total oxalate.
- Keep preparation in the note. Raw, boiled, dried, canned, and pickled values
  are not interchangeable.
- The review explicitly warns that cultivar, maturity, soil, climate, harvest,
  extraction, and analytical method can move the result.
- It also warns that per-100-g rankings do not reflect normal portion sizes.
- A defensible site mapping is the mapping already published for the older
  per-100-g source: `<20` low, `20 to <50` moderate, and `>=50` high. State that
  these are site bands, not thresholds asserted by the paper. Use `variable`
  when the review reports results that cross those bands for the same entry.

Draft registry object:

```json
{
  "id": "oxalate-foods-2023",
  "name": "Oxalate in Foods: Extraction, Methods, Occurrence, and Health Implications (Foods, 2023)",
  "url": "https://pubmed.ncbi.nlm.nih.gov/37685134/",
  "kind": "Peer-reviewed food-composition review, open access",
  "redistribution": "open",
  "terms": "CC BY 4.0 and read in full text. Table 5 compiles total, soluble and insoluble oxalate per 100 g fresh weight across multiple analytical studies. Ratings use this site's existing per-100-g mapping: at least 50 mg is high, 20 to under 50 mg is moderate, and under 20 mg is low. Preparation and the reported total are retained in each note; a missing total is not inferred from soluble oxalate."
}
```

### `histamine-brazil-2025`

**Citation:** “Histamine in Brazilian Foods: A Comprehensive Review of
Occurrence and Risk Assessment for Intoxication and Intolerance.” *Food Science
& Nutrition*. 2025.

- PubMed: https://pubmed.ncbi.nlm.nih.gov/41256231/
- Full text: https://pmc.ncbi.nlm.nih.gov/articles/PMC12620675/
- DOI: https://doi.org/10.1002/fsn3.71151
- PMCID: PMC12620675
- License: CC BY 4.0
- Evidence type: PRISMA systematic review of Brazilian food measurements from
  1980 through 2024.
- Main reusable tables: Table 3 (animal foods) and Table 4 (plant foods).

Important interpretation:

- This is a regional composition dataset, not a universal property of the food.
- The included evidence contains journal articles, theses, and other full
  documents. Sample sizes and food forms vary widely.
- The paper uses four composition bands: below detection, low, high, and very
  high. To fit the site's three ordinal content labels without making the source
  look more precise than it is, merge the paper's two lowest bands:
  - site `low`: below detection through under 10 mg/kg or mg/L;
  - site `moderate`: 10 through 50;
  - site `high`: above 50;
  - site `variable`: reported studies or a reported range cross a site band.
- This mapping is for composition only. Do not copy the paper's “safe,” “avoid,”
  or individual intolerance language into the directory.
- “Not detected” depends on the assay. The review reports limits of
  quantification that vary by matrix.

Draft registry object:

```json
{
  "id": "histamine-brazil-2025",
  "name": "Histamine in Brazilian Foods: Occurrence and Risk Assessment (Food Science & Nutrition, 2025)",
  "url": "https://pubmed.ncbi.nlm.nih.gov/41256231/",
  "kind": "Peer-reviewed systematic food-composition review, open access",
  "redistribution": "open",
  "terms": "CC BY 4.0 and read in full text. Tables 3 and 4 compile histamine measurements in Brazilian-market foods from 1980 through 2024. This site maps under 10 mg/kg or mg/L to low, 10 to 50 to moderate, and above 50 to high; variable means the reported range or studies cross a band. These are composition labels, not predictions of individual tolerance."
}
```

## Recommended first implementation batch

The notes below are source-faithful drafts, not final patient-facing prose.
Avoid “safe,” “unsafe,” “good,” “bad,” “causes symptoms,” and “should avoid.”

### 1. Avocado — highest-priority new entry

Suggested category: `Fruit`.

| Axis | Source | Proposed rating | Evidence to preserve in the note |
|---|---|---|---|
| Histamine | `plant-amines-2018` | `variable` | Five Spanish-market samples were not detected, while one cited report measured 23 mg/kg. The review names avocado as one of only four plant foods with reported histamine. |
| Histamine | `histamine-brazil-2025` | `low` | Histamine was not detected in five Brazilian samples. |
| Oxalate | `oxalate-foods-2023` | `low` | 1.3 mg total oxalate per 100 g fresh weight in two raw samples. |

Why add it: it demonstrates genuine source variability while separating
histamine from oxalate. Do not call either source “wrong”; geography, cultivar,
storage, and assay differ.

### 2. Strawberry

Suggested category: `Fruit`.

| Axis | Source | Proposed rating | Evidence to preserve in the note |
|---|---|---|---|
| Histamine | `plant-amines-2018` | `low` | Histamine was not detected; Table 4 groups strawberry among foods with low levels of all measured amines. |
| Other amines | `plant-amines-2018` | `low` | Putrescine 2–6, cadaverine not detected to 4, spermidine 5–10, and the remaining measured amines low or not detected. Use the paper's qualitative low grouping, not a new threshold. |
| Histamine | `histamine-brazil-2025` | `low` | Histamine was not detected in seven samples. |
| Oxalate | `oxalate-foods-2023` | `low` | 2.9 mg total oxalate per 100 g fresh weight in eight raw samples. |

Why add it: three open sources agree on low measured content while common
elimination lists often group strawberry differently for reasons other than
preformed histamine.

### 3. Chickpeas

Suggested category: `Legumes`.

| Axis | Source | Proposed rating | Evidence to preserve in the note |
|---|---|---|---|
| Histamine | `plant-amines-2018` | `low` | Histamine was not detected. |
| Other amines | `plant-amines-2018` | `high` | Table 4 explicitly groups chickpeas with foods high in other amines; spermidine was 15–85 and spermine 4–32 mg/kg fresh weight. The proposed DAO-competition relevance remains uncertain. |
| Oxalate | `oxalate-foods-2023` | `low` | 14.3 mg total oxalate per 100 g for dry chickpea seeds (two samples). Keep “dry” in the note. |

Why add it: it is the clearest illustration that “low histamine” and “low in
all amines” are not synonyms.

### 4. Mushrooms

Suggested category: `Mushrooms` or `Other`; do not misclassify fungi as a
vegetable if the category list is being cleaned up.

| Axis | Source | Proposed rating | Evidence to preserve in the note |
|---|---|---|---|
| Histamine | `plant-amines-2018` | `low` | Histamine was not detected in the reviewed mushroom data. |
| Other amines | `plant-amines-2018` | `high` | Putrescine ranged from not detected to 156 and spermidine from 9 to 155 mg/kg; the paper places mushrooms in its high-other-amines group. |
| Histamine | `histamine-brazil-2025` | `low` | Histamine was not detected across the listed Pleurotus, Agaricus, shiitake, portobello, cooked, and canned mushroom samples; individual groups were small. |

Why add it: another clean separation between preformed histamine and other
amines, with evidence across multiple mushroom types.

### 5. Sweet potato

Suggested category: `Vegetable`.

| Axis | Source | Proposed rating | Evidence to preserve in the note |
|---|---|---|---|
| Histamine | `histamine-brazil-2025` | `low` | Mean 0.60 mg/kg in three samples. |
| Oxalate | `oxalate-foods-2023` | `high` | 495.6 mg total oxalate per 100 g fresh weight in two raw samples. |

Why add it: it shows why each axis must remain independent. Do not turn the
oxalate result into a general MCAS warning; the source addresses kidney-stone
risk and food composition, not mast-cell reactivity.

### 6. Kiwi

Suggested category: `Fruit`.

| Axis | Source | Proposed rating | Evidence to preserve in the note |
|---|---|---|---|
| Histamine | `plant-amines-2018` | `low` | Histamine ranged from not detected to 2 mg/kg. |
| Other amines | `plant-amines-2018` | `low` | The review places kiwi in the low-all-amines group. |

Do not label kiwi a histamine “liberator.” The review says that proposed
histamine-releasing mechanisms remain poorly understood.

### 7. Apple

Suggested category: `Fruit`.

| Axis | Source | Proposed rating | Evidence to preserve in the note |
|---|---|---|---|
| Histamine | `histamine-brazil-2025` | `low` | Histamine was not detected in seven apple samples. |
| Oxalate | `oxalate-foods-2023` | `low` | A single raw Granny Smith sample contained 3.5 mg total oxalate per 100 g. The cultivar and `n=1` limitation belong in the note. |

### 8. Swiss chard

Suggested category: `Vegetable`.

| Axis | Source | Proposed rating | Evidence to preserve in the note |
|---|---|---|---|
| Oxalate | `oxalate-foods-2023` | `high` | 874 mg total oxalate per 100 g raw in one dataset; the review also reports 1458.1 in another and substantially different leaf/stem and raw/boiled results. |

Use `high`, not `variable`, because all reported total values remain above the
site's high boundary even though the magnitude changes substantially.

## Good second-wave additions

| Food/form | Proposed source rating(s) | Why it is useful / caveat |
|---|---|---|
| Pineapple, fresh | `plant-amines-2018`: histamine low, other amines low; `histamine-brazil-2025`: histamine low | Keep fresh fruit separate from juice; processed juice had detectable histamine in a cited study. |
| Papaya | `plant-amines-2018`: other amines low only; `histamine-brazil-2025`: histamine low; `oxalate-foods-2023`: oxalate low | The 2018 paper did not report papaya histamine, so do not infer a low histamine rating from it. |
| Pear | `plant-amines-2018`: other amines high only | Histamine was not reported. This is a valuable test of whether the UI can display one axis without filling the others. |
| Ketchup | `plant-amines-2018`: histamine variable | Reported histamine was not detected to 22 and putrescine not detected to 165 mg/kg. Keep it separate from raw tomato. |
| Beer | `histamine-brazil-2025`: histamine low | Multiple beer styles were not detected or below 1.5 mg/L. This says nothing about alcohol's effect on histamine metabolism. |
| Brewed coffee | `histamine-brazil-2025`: histamine low | Regular, decaffeinated, and organic coffee beverages were not detected; defective green beans had different results, so rate the beverage, not generic “coffee.” |
| Soy sauce | `histamine-brazil-2025`: histamine variable | Forty-two samples had a mean of 123 mg/L and a range from not detected to 307. Product-to-product variability is central. |
| Canned tuna | `histamine-brazil-2025`: histamine variable | Results across products/studies ranged from not detected to above 80 mg/kg; form, packing medium, and study should remain visible. Do not merge canned and fresh/frozen tuna. |
| Fresh chicken breast | `histamine-brazil-2025`: histamine low | Across the fresh-breast series, reported values remained below 10 mg/kg; several other chicken products were also not detected or low. |
| Star fruit | `oxalate-foods-2023`: oxalate high | The review reports 160 and 295.4 mg total oxalate per 100 g. This is much stronger than adding it from a nephropathy case report alone. |
| Watermelon | `histamine-brazil-2025`: histamine low; `oxalate-foods-2023`: oxalate low | The reported values are 0.7 mg/kg histamine and 0.3 mg total oxalate per 100 g, but each composition dataset is small. |
| Asparagus, boiled | `oxalate-foods-2023`: oxalate low | 2.6 mg total oxalate per 100 g in three boiled samples. Keep preparation in the display name or note. |

## Existing entries that can be enriched

These additions are higher-value than adding another bare Mast Cell 360 or
Monash link because they introduce measured, restatable evidence.

### Other-amine ratings from `plant-amines-2018`

- **Banana:** `amine: high`. Histamine was not detected, but putrescine was
  15–50 mg/kg and the paper places banana in its high-other-amines group.
- **Orange/citrus:** `amine: high`. Citrus putrescine was 7–200 mg/kg.
- **Soybeans:** `amine: high`. The table reports high putrescine/polyamines,
  including spermidine up to 389 mg/kg.
- **Lentils:** `amine: high`. Histamine was not detected, while spermidine was
  15–107 mg/kg.
- **Peanuts:** `histamine: low` and `amine: low`. Peanuts are in the paper's
  low-all-amines group, unlike the generic “nuts” grouping.

These five changes would activate the site's existing `amine` axis without
inventing a new vocabulary or threshold.

### Histamine cross-checks from `histamine-brazil-2025`

- **Banana:** low (12 samples, not detected).
- **Orange:** low (14 samples, mean 0.1 mg/kg).
- **Cornmeal:** low (10 samples, not detected).
- **Wine:** low by measured content across the listed wines; keep the existing
  alcohol-metabolism explanation separate.
- **Tomato:** low in the Brazilian datasets (not detected to 9.5 mg/kg) while
  the current 2021 review is `variable`. Showing both is informative.
- **Eggplant:** variable; whole, peel, pulp, and core measurements span the
  site's bands. Do not collapse the result to a single high label.
- **Dry-fermented sausage:** variable across product types and studies, from not
  detected to well above 50 mg/kg. This would legitimately disagree with the
  current category-level `high` rating.
- **Canned sardines:** variable across Brazilian canned preparations, mostly
  low but reaching the moderate band in some preparations. This usefully
  contrasts with the current source's 657 mg/kg outlier.

### Oxalate additions from `oxalate-foods-2023`

- **Banana:** low, 6.8 mg/100 g raw.
- **Orange:** low, 1.8 mg/100 g raw.
- **Sauerkraut:** low, 7.1 mg/100 g in the reported raw product.
- **Eggplant:** variable across raw/boiled datasets, roughly 12.8–55 mg total
  oxalate per 100 g.
- **Amaranth, spinach, rhubarb, soybean, and existing high-oxalate foods:** the
  new review can corroborate the direction but often reports very wide ranges.
  Adding every duplicate rating is lower priority than filling genuine gaps.

## A data-model warning exposed by the new sources

The current generic `Beans` entry should not absorb more measurements without
being split by form. The 2023 oxalate review reports values from 13.9 to 547.9
mg/100 g across bean type, dry/raw/preserved form, and boiling. A single ordinal
rating for “beans” makes preparation disappear.

The same problem affects generic fish, mushrooms, cheese, fermented sausage,
and soy products. Prefer separate entries when the evidence itself distinguishes
the product:

- soybean vs tofu vs miso vs soy sauce;
- fresh/frozen tuna vs canned tuna;
- fresh tomato vs ketchup;
- raw/dry beans vs boiled or canned beans;
- fresh pineapple vs pineapple juice;
- fresh cheese vs aged or grated cheese.

Aliases should represent true synonyms, not materially different preparations.

## Sources reviewed but not ready for ratings

### Lectin — useful study, wrong current display model

**Source:** “Lectin Activity in Commonly Consumed Plant-Based Foods: Calling
for Method Harmonization and Risk Assessment.” PMID 34829077, PMCID PMC8618113,
CC BY 4.0.

- PubMed: https://pubmed.ncbi.nlm.nih.gov/34829077/
- Full text: https://pmc.ncbi.nlm.nih.gov/articles/PMC8618113/

Why not register it yet:

- most food samples were analyzed once;
- hemagglutination assays are not standardized across laboratories;
- the paper's title and conclusion explicitly call for harmonization and risk
  assessment;
- raw white beans, lentils, soybeans, peas, quinoa, potato, and tomato had
  measurable activity, while preparation reduced most to not detected;
- chickpeas and tomatoes retained activity under the study's preparation;
- there is no validated low/moderate/high threshold that predicts MCAS or even
  general clinical reactions.

If the project later supports **raw versus prepared variants** and shows the
numeric assay rather than a clinical-looking ordinal badge, this source becomes
useful. It does not justify a generic “beans: high lectin” patient label.

A newer single-food paper, PMID 41464957, quantifies active
phytohemagglutinin in raw dark-red kidney beans and reports more than 99%
reduction in commercially canned beans. It reinforces the preparation problem;
it does not solve the cross-food threshold problem.

### Salicylate — still defer

The evidence search found several real sources, but none clears all of the
current site's requirements for a reusable ordinal food table:

- the foundational 333-food survey, PMID 4019987, is paywalled;
- the 2011 systematic food-composition review, PMID 21351247, is not an
  uncomplicated reusable open dataset;
- the 2017 112-food HPLC study, PMID 29182277, is paywalled;
- a 2008 free full-text clinical review, PMID 19633779, prints only eight
  examples and is not in the PMC open-access reuse subset;
- later reviews emphasize large variation by assay, variety, origin,
  processing, and storage.

Do not populate salicylate from a practitioner list or a search-result table.
The methodology page currently tells readers that this axis is absent because
the underlying tables could not be fully and cleanly verified; keep that
promise until the source/licensing and threshold problems are actually solved.

### FODMAP — keep Monash link-only for now

Open papers exist, including PMID 29706489 (a small US branded-food analysis)
and PMCID PMC7499970 (a Swedish database assembled from measured and estimated
values). They do not replace the portion-specific Monash database cleanly.
Generic low/high ratings are especially misleading for FODMAPs because serving
size changes the category. Continue linking Monash rather than restating it.

### “Histamine liberator” — reject as an axis

The 2025 review “Evidence for Dietary Management of Histamine Intolerance”
(PMID 41009760, PMCID PMC12470264) says the proposed histamine-releasing
mechanism has not been elucidated and the evidence is inconclusive.

- PubMed: https://pubmed.ncbi.nlm.nih.gov/41009760/
- Full text: https://pmc.ncbi.nlm.nih.gov/articles/PMC12470264/

It can support methodology/context prose, but its consensus food list is not a
measured composition table and should not become per-food ratings.

## Patient-facing guardrails for any implementation

1. A content rating is not a tolerance prediction. “Low histamine” means low
   measured preformed histamine in that source, not “safe for MCAS.”
2. Histamine intolerance, IgE-mediated food allergy, food poisoning, IBS/FODMAP
   sensitivity, kidney-stone risk, and MCAS are different contexts. Do not
   merge their clinical implications merely because they share a table.
3. Never infer `low` from a missing value. `-` and `not reported` are missing;
   `nd` means below that assay's detection or quantification limit.
4. Preserve units and denominator in every note: mg/kg, mg/L, or mg/100 g fresh
   weight.
5. Preserve food form and preparation. Heat does not remove already-formed
   histamine, while boiling can reduce soluble oxalate and often inactivates
   lectin activity.
6. Avoid “avoid,” “safe,” “trigger,” and efficacy language. The directory is a
   sourced composition index, not a treatment plan.
7. If two sources differ, show both. Do not average them.
8. Do not add a new source rating to a species or preparation that the table did
   not actually measure.
9. A human must open every source used and choose the `lastVerified` date.
10. Run `npm run validate` after any change under `src/content/`.

## Recommended implementation order

1. Human-open and verify the three proposed source articles.
2. Add the three source records with their explicit mapping rules.
3. Add avocado, strawberry, chickpeas, mushrooms, and sweet potato.
4. Add the five existing-entry other-amine ratings (banana, orange, soybeans,
   lentils, peanuts). Confirm that the newly visible Other amines column reads
   clearly on mobile and in the static fallback.
5. Add kiwi, apple, Swiss chard, pineapple, beer, and one processing-sensitive
   comparison such as tomato/ketchup or soybean/soy sauce.
6. Review generic `Beans` before importing any more bean values.
7. Validate, build, and visually inspect the food table and methodology source
   list.

## Verification log

PubMed E-utilities was used on 2026-08-21 to confirm the title, PMID, publication
date, and DOI for:

- PMID 30558197 — DOI 10.3390/foods7120205;
- PMID 37685134 — DOI 10.3390/foods12173201;
- PMID 41256231 — DOI 10.1002/fsn3.71151;
- PMID 34829077 — DOI 10.3390/foods10112796;
- PMID 41009760 — DOI 10.3390/ijms26189198;
- PMID 19633779 — DOI 10.3238/arztebl.2008.0137; and
- PMID 29706489 — DOI 10.1016/j.jpeds.2018.03.038.

Full text was read from PubMed Central/Europe PMC for the three recommended
sources, the lectin source, and the 2025 histamine-diet review. CC BY status was
confirmed from each recommended article's full-text license block.
