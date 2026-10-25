# Selective Jiangshan intake and UI refinement — 0.12.0

25 October 2026. Content baseline remains V12; this is an additive application/evidence update.

## Upstream comparison and selection

The fork's `main` remains at frozen `fcd6484d06d3c581241fc24adbab288cf3a4a2ea`. The original project advanced to [10fdcaeeb3361525e2f34bd7ca767714341565f0](https://github.com/DeanChensj/jiangshan-map/tree/10fdcaeeb3361525e2f34bd7ca767714341565f0). Git comparison covers 74 files, 19,338 insertions and 3,226 deletions. Static JSON extraction was used; donor scripts were not executed.

| Source inventory | Frozen | Updated upstream |
| --- | ---: | ---: |
| Landmark anchors | 536 | 571 |
| Person profiles | 104 | 113 |
| Chronicle stops, seven chronicles | 68 | 70 |
| Dynasty milestones | 442 | 471 |
| Settlement references | 1,387 | 1,753 |
| Phase rules | 165 | 181 |
| Regional era tracks | 0 | 13 |

Selected additions:

- **232 search aliases for 76 existing gazetteer rows**, matched by stable ID, Chinese name, exact coordinates and frozen source pointer. The names improve discovery without becoming independently reviewed historic identities. Their original-repository commit, author, GPL3 data and complete license remain separately accessible. Place source disclosures expose both old directory provenance and new alias provenance.
- **Bao Zheng, stable event `china-landmark-498`**: independently written correction distinguishes the 1061 appointment as shumi fushi from earlier Kaifeng service. Inspected [History of Song, juan 12, Jiayou 6](https://zh.wikisource.org/wiki/宋史/卷012#嘉祐六年), and [juan 316, biography](https://zh.wikisource.org/wiki/宋史/卷316#包拯), in a browser. The annals date the appointment to the fourth lunar month; no Gregorian day or exact office building is inferred. The retrospective biography's reputation stories remain attributed accounts.
- **Xuanzang source readings**: added contextual notes and inspected links to [T2053 juan 3](https://cbetaonline.dila.edu.tw/zh/T2053_003), Nalanda, Silabhadra and study; and [juan 5](https://cbetaonline.dila.edu.tw/zh/T2053_005), Harsa's Kannauj assembly. These are religious-biographical accounts, not neutral confirmation of every triumph or vision. The donor's new 631/642 markers are not adopted as settled dates. Existing biography dates, milestones and chronicle stop IDs remain unchanged.

The separate `jiangshan-reviewed-update.json` applies after the six original event reviews and 24 chronicle annotations. The runtime now shows **seven** independently annotated event revisions. All 975 frozen event IDs, the original import manifest, held Zheng He location, earlier framing amendments and historical geometry remain intact. There is no claim of a complete upstream reimport or specialist historical acceptance.

[Candidate ledger](JIANGSHAN_UPDATE_CANDIDATES.json) records the 35 new landmark and nine profile leads with source pointers and review limits. Priorities include the upstream Di Renjie Chinese “persons” versus English “cases” discrepancy, literary attribution for Zhang Liang, independent Xuanzang chronology, and period/era comparisons. New donor narratives contain bibliographic titles but no independent primary-source URLs. Source titles alone were not promoted to verified citations.

## Rights and geographic limits

The updated upstream root license is GPL3. Its README retains CHGIS/Hartwell academic/non-commercial exceptions for some geometry. The new GeoJSON export excludes 1949 onward and modern provinces; it cannot replace worldwide modern subdivision coverage. No new donor code or geometry was copied. Discovery aliases and extracted candidate descriptions retain separate GPL3 provenance; original application code stays under its existing MIT notice. See [content notices](CONTENT_LICENSE.md).

## UI audit and implemented remedies

Used the updated frontend skill in the second-brain repository, its shared UI delivery guide, Impeccable task/type/layout/resilience methods, the evidence-QA contract and the Product Design screenshot audit. An isolated image reviewer assessed current screenshots before receiving implementation explanations, then reviewed the revised pixels. Existing parchment identity, bilingual content, main routes and boundary qualifications were retained.

| Step | Observed health and change | Verification |
| --- | --- | --- |
| 1. Map exploration | Crowded → improved. Removed the desktop's forced 680px workspace minimum; compact timeline; turning points disclose on demand. | Before 1265×714 and after 1280×720 screenshots. Map-stage DOM height 482→522px; viewport differences are stated, not a controlled performance experiment. |
| 2. Search/filter results | Only one full entry visible → two full entries. Secondary region/theme controls disclose under Filters, with active values visible. | Story-list DOM height 130→242px at the above viewports. Search and filter controls remain reachable. |
| 3. Boundary meaning | Scattered warnings → one source-date disclosure beside the map; modern2022 reference remains explicit. Province labels yield to marker areas; narrow label budget and clustering reduce collisions. | Dates and China inherited-boundary warning checked in expanded disclosure; source2022 label remains visible while collapsed. Pure layout regression check plus current desktop/Chinese narrow pixels. |
| 4. Regional discovery | Working, retained. Canada, US and all other source groups stay in the region browser; modal uses one scrolling surface and larger unit captions. | Canada→Saskatchewan→Tommy Douglas desktop and390px Chinese iframe; source menu also confirmed China32/US51/Canada13 source units. These are source counts, not present sovereign-state assertions. |
| 5. Biography/source reading | Improved focus. Wider desktop drawer; taller narrow drawer; short current milestone replaces duplicate full title; evidence shortcut near the date. | Previous/Next remain visible. Evidence shortcut scrolls inside the drawer and focuses its heading in English and Chinese. Xuanzang's seven sources and Bao correction render. |
| 6. Timeline/reference navigation | Improved. Active era automatically scrolls into narrow horizontal strip. Regional preview stays accessible on demand. Fixed the regional handler swallowing unrelated `reference-*` actions. | ArrowRight1061→1062; Escape collapses disclosures without clearing selection first; Sources & method→Source provenance reaches seven reviews and the new intake/license links. |

