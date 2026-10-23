# V5: China reference collection — import and evidence audit

## Result

The import accounts for **all 978 chronology and landmark rows** in the frozen reference project. It produces **975 mapped event records**, retains **two exact duplicate rows as merge-ledger references**, and holds **one record with a location/narrative mismatch** outside the map. It also preserves the reference project's person, place, chronicle, era-name and schematic-corridor directories.

This is a **provenance-preserving import**, not a declaration that 975 historical claims have been independently researched. The UI must distinguish inherited reference material from independently sourced atlas essays. Each imported event has `provenance.dataset: "jiangshan"`, `status: "inherited"`, a frozen source link, and an exact source-array pointer. Sources establish where the text came from; they do not independently corroborate its historical assertions.

## Frozen source and reproducibility

- Original project: [DeanChensj/jiangshan-map](https://github.com/DeanChensj/jiangshan-map).
- User fork and frozen source: [haitaowu12/jiangshan-map, commit fcd6484d06d3c581241fc24adbab288cf3a4a2ea](https://github.com/haitaowu12/jiangshan-map/tree/fcd6484d06d3c581241fc24adbab288cf3a4a2ea).
- Input files: `js/map_data.js`, `js/lore_data.js`, `js/i18n_dict.js`, `LICENSE`, `README.md`.
- Exact Git blob SHA-1, SHA-256, byte length and frozen URL for each input are in `dist/data/china-import-manifest.json`.
- Retrieval and structural audit date: 2026-10-23 UTC (2026-10-22 in Vancouver).

The initial local reference directory lacked `lore_data.js` and `i18n_dict.js`. Those files contain most of the reference project's person profiles, place events, city notes, chronicles and translations. They were retrieved at the same frozen commit rather than inferred from the README's feature descriptions.

To reproduce, obtain the five pinned files without newline normalization, place them in a directory using their basenames, then run:

```sh
node scripts/import-jiangshan.mjs --source-dir /absolute/path/to/pinned-files
```

The importer checks both source hashes before parsing. It extracts JSON literals with `JSON.parse`; it does not run the upstream JavaScript. Output chunks remain below 450,000 bytes. The manifest records output hashes, source row counts, duplicate outcomes, held records and display amendments.

## Inventory and accounting

| Source collection | Source count | Imported representation |
|---|---:|---|
| Dynasty chronology milestones | 442 | Dated event records; two exact duplicate rows merge with their identical counterpart |
| Place-specific landmark events | 536 | Dated event records; one held location mismatch |
| Person profiles | 104 | Searchable profiles with source names, aliases, dates and links to related text |
| Rich chronicles | 7 | All seven source sequences, with 68 dated stops |
| Chronicle quotations | 68 | Original Chinese excerpts and the source's English translations, with inherited status |
| City lore | 87 | Bilingual city notes and representative coordinates |
| Gazetteer entries | 185 | Historical names, aliases, modern names and representative coordinates |
| Strategic passes | 20 | Names, dates, geographical descriptions and coordinates |
| Era-specific settlement rows | 1,387 | Period-place rows preserving names, remarks and display constraints |
| Reference periods | 18 | Source display windows, separately described from dynasty lifespans |
| Phase rules | 165 | Original phase metadata; no additional boundary polygons imported |
| Era-name change points | 342 | Selected source chronological sequence, not all concurrent rulers |
| Schematic corridors | 16 | Source titles, descriptions, spans and schematic segments |
| Guqin tracks | 5 | Omitted as background media; no historical record lost |

The 1,387 settlement rows are **not 1,387 distinct cities**. They repeat and rename places across periods. Likewise, 536 is the number of place-event rows, not the number of unique urban sites. The import avoids treating these different grains as interchangeable totals.

### Exact duplicate ledger

Only equality of **civil year + Chinese event wording + coordinate pair** causes a merge. The ledger preserves both source pointers.

1. `西晋灭吴，三国归晋`, 280 CE, `[118.801,32.061]`, appears in both the Three Kingdoms and Western Jin source periods.
2. `陈桥兵变，赵匡胤建宋`, 960 CE, `[114.501,34.951]`, appears in both the Five Dynasties and Northern Song source periods.

The 690 CE Wu Zetian records with identical wording but slightly different coordinate pairs remain separate. Similar events at distinct places, differently phrased episodes, and broad atlas essays are also retained. They are not silently removed based on a guessed semantic equivalence. The directory distinguishes overlapping source records from distinct historical events.

### Held location mismatch

`china-landmark-412`, source landmark index 411, is dated 1411 and describes a Malacca depot and the Galle inscription in Sri Lanka. Its supplied coordinate `[109.23,15.35]` and place label identify the Champa coast of Vietnam. The original record and reason are preserved in `manifest.held`; it is not included among mapped events. Resolving this requires distinguishing the combined episodes and reviewing their places and dates rather than replacing the point by guesswork.

## Explicit editorial handling

Four inherited display titles and summaries have been neutralized, with original text preserved in `provenance.originalText` and an amendment ledger:

| Record | Display treatment | Unresolved claim |
|---|---|---|
| `china-event-sanguo-008` | Expedition to Yizhou; identification disputed | The source directly identifies Yizhou with Taiwan. The map does not adopt that identification; the inherited point is only one interpretation. |
| `china-event-tang-030` | Battle of Talas, 751 | The source's direct battle-to-papermaking-transmission claim is omitted pending a separate review. |
| `china-event-roc-016` | Taiwan's wartime administrative transition, 1945 | The source's recovery/retrocession framing is not presented as a conclusion about sovereignty or legal status. |
| `china-event-prc-002` | Seventeen Point Agreement, 1951 | The source's political characterization as “peaceful liberation” is omitted. |

**48 mapped records** carry one or more explicit review issues. These include the neutral amendments, the use of a Central Asian point for the starting year of Zhang Qian's mission, an inherited envoy/first-contact attribution, and source political or first/earliest claims. This is a targeted screening list, not an assertion that all other rows are historically accurate. The inherited status remains on every imported event.

## Date, place and person semantics

### Periods are display windows

The source's period labels and bounds must not be reinterpreted as exact political lifespans. Examples include a Qin-labelled window through 202 BCE, a Western Han-labelled window through 25 CE, a Western Jin window starting in 280, and a Yuan window starting in 1279. The import keeps the source intervals and explicitly labels their function. It does not use them to rewrite the atlas's independently sourced dynasty entries.

Settlement `start` and `end` constrain the source display by period, appearance and disappearance metadata. They do not demonstrate that the settlement was founded at the first displayed year, continuously occupied the same site, or remained a capital throughout. For example, Xianyang is visible in the Warring States period beginning in 403 BCE while its inherited remark itself says the Qin capital moved there in 350 BCE. The `isCapital` flag therefore remains a period-level source attribute and must not silently become a year-specific capital assertion.

The imported event years run from **403 BCE through 2010 CE**. Period-place rows extend to the atlas cutoff of 2026. The absence of later imported events does not imply that history stopped in 2010; modern narrative coverage is supplied separately.

### Profiles are indexes, not invented biographies

All 104 source profiles retain the original names, aliases, source lifespan and subtitle. The importer supplies related event IDs only where a literal name or alias appears within that source lifespan. These are **related mentions**, not proof of direct participation or personal presence. Two profiles currently have no matching mapped event under this conservative rule: Chiang Kai-shek and Deng Xiaoping. They remain searchable rather than acquiring fabricated milestones.

Seven profiles have the source's richer chronicle sequences. Every stop retains its description, source place names, coordinates, quotation and source order. Qin Shi Huang and Zhuge Liang are labelled `campaign-chronicle`; all seven have schematic geometry and `personalPresenceVerified: false` for their stops. A commander being associated with a campaign at a place does not establish that they personally travelled each displayed leg. Literary images and traditional attributions also need a different evidentiary standard from a reconstructed itinerary.

### Place history avoids forced identity

Gazetteer entries, city notes, passes and era-place rows remain separate collections. Their names and coordinates support discovery. Proximity can suggest related reading, but it does not prove continuous settlement, one identical archaeological site, or political succession. The app should expose this distinction when displaying nearby records across eras.

## Language and source quality

All 442 chronology milestones have an original English dictionary entry. All 1,387 settlement names, modern names and historical remarks used in the import have source dictionary translations. The importer uses those supplied translations instead of manufacturing bilingual history from place names. Landmark events, city lore and rich chronicle stops already contain bilingual source text.

The upstream README acknowledges Tan Qixiang's *Historical Atlas of China*, CHGIS, Robert M. Hartwell datasets and Historical Basemaps. These are useful collection-level leads; the original event and profile arrays do not attach item-level institutional or primary-source citations to each assertion. The appropriate next step is claim-by-claim corroboration, retaining both the inherited record and the reviewed replacement or annotation. A generic source homepage is not a substitute for evidence supporting a date, identity or causal assertion.

Classical Chinese quotations and source English renderings are attributed upstream material. This import does not certify their editions, translations or precise site/date associations. No new external historical text was bulk copied to expand the source claims.

## Attribution and licensing notices

The pinned `LICENSE` contains an MIT notice naming DeanChensj and 2026. The pinned `README.md` states GPL-3.0 and credits third-party cartographic datasets. The import preserves both statements in `dist/data/china-upstream.LICENSE.md`, links both frozen originals, reproduces the MIT notice, and points to the GPL text already included in the atlas distribution. It does not claim that either notice or the rights of referenced third-party material have been superseded. Inherited text is excluded from blanket claims about the license for newly authored atlas narrative.

No extra source boundary polygons, modern administrative layers or media recordings are redistributed by this importer. Existing boundary layers continue under their separately recorded provenance and notices.

## Separate display review layer

The frozen import is preserved alongside a separate [display review overlay](../dist/data/china-reviews.json) covering **2 events and 24 chronicle stops**. The app applies these targeted corrections and annotations while retaining the inherited text and source pointers; they do not certify the rest of the imported collection. See [V5 research and review](V5_RESEARCH_AND_REVIEW.md) for the reviewed claims and their limits, and the [cited-page index](V5_SOURCE_INDEX.json) for links between sources, essay IDs and review targets.
