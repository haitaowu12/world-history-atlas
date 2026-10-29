# Content and third-party notices

## Original narrative and teaching content

Copyright © 2026 Tony Wu.

The original English and Chinese historical summaries, date notes, entry titles, authored biographies and milestone text, route explanations, guided-reading text, study questions and activities created for **World History Atlas · 寰宇时序** are licensed under **Creative Commons Attribution 4.0 International (CC BY 4.0)**. This covers newly written atlas material; the Jiangshan import described below is excluded.

- [License overview](https://creativecommons.org/licenses/by/4.0/)
- [Legal terms](https://creativecommons.org/licenses/by/4.0/legalcode)

When reusing covered original content, credit **Tony Wu, World History Atlas · 寰宇时序**, provide the license link, retain a source link when supplied and identify changes. Do not imply endorsement.

This notice covers original expression and teaching material. It does not claim exclusive rights over underlying historical facts or relicense cited pages, source quotations, third-party images, imported map geometry, software dependencies or other third-party material. Their own rights and notices remain applicable. A source link is an evidence reference, not permission to reproduce the source's contents.

Original application code and project documentation are covered by the root [MIT LICENSE](../LICENSE). The package's MIT metadata describes that original code; it is not a blanket license for the complete data bundle.

The imported Jiangshan event prose, profiles, chronicles, quotations, existing English translations, city notes, place-name records and related source text are **not licensed by this project's CC BY notice**. Converting them to JSON, adding a citation, retaining them in an `originalText` field or displaying them beside a newly written essay does not change their source attribution or terms.

## Distributed third-party material

| Material and local file | Source and retained notice |
| --- | --- |
| `dist/data/americas-units-usa-*.geojson`, `americas-history-can-*.geojson` and corresponding index | Newberry historical states/territories (packaged CC BY-NC-SA 2.5 retained) and NRCan territorial evolution (Open Government Licence – Canada 2.0); [separate attribution and transformation notice](../dist/data/americas-history.LICENSE.md) |
| `dist/data/territories-legacy-*.geojson` — 3 files, 99 dated features | André Ourednik and contributors, [Historical Basemaps](https://github.com/aourednik/historical-basemaps); [GPL-3.0 text](../dist/data/territories.LICENSE) |
| `dist/data/territories-modern-history-*.geojson` — 4 files, 142 dated features | Historical Basemaps; [modern-history source and transformation notice](../dist/data/territories-modern-history.LICENSE.md) and [GPL-3.0 text](../dist/data/territories.LICENSE) |
| `dist/data/territories-context-*.geojson` — 8 files, 271 dated features | Historical Basemaps; [GPL-3.0 text](../dist/data/territories.LICENSE); source years and permitted display periods are recorded separately |
| `dist/data/territories-awmc.geojson` — Roman Empire, 200 CE | [Ancient World Mapping Center](https://awmc.unc.edu/gis-data/); credit **Ancient World Mapping Center, Barrington Atlas and OpenStreetMap contributors**; [ODbL 1.0 text](../dist/data/territories-awmc.LICENSE) |
| `dist/data/territories-jiangshan.geojson` — Southern Song and Jurchen Jin in 1200, Ming in 1600 | DeanChensj's [Jiangshan Map](https://github.com/haitaowu12/jiangshan-map) schematics, pinned from the user's fork; [preserved upstream notices](../dist/data/territories-jiangshan.LICENSE.md), including its README GPL-3.0 declaration and root MIT notice |
| `dist/data/china-events-*.json`, `china-library.json`, `china-library-places.json`, `china-library-settlements-*.json` | DeanChensj and Jiangshan Map contributors; narrative, directory and chronicle import from the pinned fork; [content-import notice](../dist/data/china-upstream.LICENSE.md) and [import manifest](../dist/data/china-import-manifest.json) |
| `dist/data/contemporary-world-*.geojson` — 7 files, 242 map units; `disputed-lines.geojson` — 29 lines; `disputed-areas.geojson` — 25 areas | [Natural Earth](https://www.naturalearthdata.com/about/terms-of-use/), public domain; [contemporary layer notice](../dist/data/contemporary-world.LICENSE.md) |
| `dist/assets/land.geojson`, `countries.geojson`, `rivers.geojson` | [Natural Earth](https://www.naturalearthdata.com/about/terms-of-use/), public domain; [bundled terms](../dist/assets/land.LICENSE.md) |
| `dist/assets/d3.v7.9.0.min.js` | D3, Mike Bostock and contributors; [ISC notice](../dist/assets/d3.LICENSE) |

The historical layer inventory above totals **516 dated features in 17 files, organized into 43 source checkpoints**. A polity can appear at more than one checkpoint; this is not a count of distinct states. These names and counts come from [map-snapshots.json](../dist/data/map-snapshots.json), which records the source commits, paths, hashes, transformations and layer notices. The three geometry sources remain separate within those files. See [MAP_METHODOLOGY.md](MAP_METHODOLOGY.md) for their interpretation.

The contemporary map units include dependencies, disputed areas and other geographic entities. They are not a sovereign-state count. Their source vintage, review interval, names and exclusions are in [contemporary-world.json](../dist/data/contemporary-world.json). Reference assets and D3 are recorded in [PROVENANCE.json](../dist/assets/PROVENANCE.json).

## Jiangshan content and its review layer

The narrative and directory import is pinned to fork commit [`fcd6484d06d3c581241fc24adbab288cf3a4a2ea`](https://github.com/haitaowu12/jiangshan-map/tree/fcd6484d06d3c581241fc24adbab288cf3a4a2ea). It adapts `js/map_data.js`, `js/lore_data.js` and `js/i18n_dict.js`. The [content-import notice](../dist/data/china-upstream.LICENSE.md) preserves the author's MIT license text and the README's GPL-3.0 declaration, with links to both at that exact commit. The notice discrepancy is recorded; this project does not declare that one statement supersedes the other or grant a uniform MIT or CC BY license to the imported material.

The [import manifest](../dist/data/china-import-manifest.json) identifies every input and output file, duplicate merge, held record and initial display amendment. It retains 975 mapped events from 978 input rows, with two exact duplicate rows merged and one location mismatch held outside the map. The source texts remain identifiable even when the display wording is neutralized or later corrected. Background audio and additional raw boundary geometry were not copied by this content import.

Later historical corrections are stored separately in [`china-reviews.json`](../dist/data/china-reviews.json). They add evidence, notes and selected display changes while leaving the frozen import files intact. Original explanatory wording newly written for this review layer is covered by the atlas's CC BY notice. Inherited or adapted passages and the originals retained for comparison keep their source notices. A reviewed record can therefore contain material with different provenance; its review label does not change the license of every field.

The Jiangshan repository's per-outline derivation is unresolved. Its references include CHGIS, Hartwell, Tan Qixiang and Historical Basemaps, but those references do not establish the origin or license of each individual shape or independently substantiate every imported narrative. Both published repository notices are preserved. No CHGIS dataset was directly downloaded in this release. That fact alone does not establish the absence of CHGIS-derived material in the distributed Jiangshan schematics; their individual lineage and permission remain unresolved.

CShapes was consulted for a limited local comparison of modern-period geography. No CShapes geometry is distributed. Its terms do not become the license of the shipped source layers.

## Reuse and contributions

Retain the appropriate source notice and attribution when reusing a particular data file; do not substitute this project's MIT or CC BY notice for the imported file's own terms. Keep source-specific geometry and content notices with copies or modifications and identify transformations. The linked manifests and license files record the distributed material and its notices.

Contributors should submit original code and documentation under the project's MIT license and original narrative or teaching text under CC BY 4.0. Identify third-party material explicitly, provide its source and applicable notice, and document any limits or unresolved provenance before incorporating it.

## V7 additional map derivatives

CShapes 2.0 geometry and its display derivative retain **CC BY-NC-SA 4.0**, attribution to Schvitz, Rüegger, Girardin, Cederman, Weidmann and Gleditsch (2022), ETH Zürich. See `dist/data/cshapes-v7.LICENSE.md`. The license applies to the derivative geometry, not to unrelated original code or narrative text.

The fuller Jiangshan phase extraction preserves the upstream notice discrepancy and source attribution in `dist/data/china-context-v7.LICENSE.md`. It does not claim that all geometry is covered by the root MIT notice. Political phase shapes and optional administrative shapes remain inherited schematics.

The 52 new bilingual narratives use the atlas's original-narrative CC BY 4.0 terms; their cited sources retain their own rights. They paraphrase evidence and do not republish source articles.

## October 25, 2026 additive upstream intake

`dist/data/jiangshan-search-update.json` retains 232 discovery aliases from DeanChensj and contributors at upstream commit `10fdcaeeb3361525e2f34bd7ca767714341565f0`. It is separately attributed GPL-3.0 data; the complete GPL text is `dist/data/jiangshan-update.GPL-3.0.txt`. The extracted donor descriptions in `docs/JIANGSHAN_UPDATE_CANDIDATES.json` retain the same source terms and are excluded from the original-documentation MIT notice. The pinned source repository/file/pointers are supplied with the data. No new upstream code or boundary geometry is copied.

`dist/data/jiangshan-reviewed-update.json` contains independently written atlas wording and inspection notes: a Bao Zheng correction and two Xuanzang primary-text readings. Its original expression follows the atlas CC BY 4.0 notice; cited editions and inherited source records retain their rights. This additive layer does not change frozen import notices or certify the remaining candidate queue.

## 28 October geometry follow-up

The [boundary review](JIANGSHAN_BOUNDARY_WARTIME_NAVIGATION_REVIEW_2026_10_28.md) records the upstream CHGIS/Hartwell exception and the CHGIS provider’s prohibition on redistribution. The provenance of existing V7 Warring States and administrative exports needs further feature-level review. No newer Jiangshan boundary, Stanford wartime geometry or Rauchway teaching-map geometry was imported in this follow-up. Existing CShapes country-reference geometry retains its CC BY-NC-SA 4.0 terms; original follow-up narratives use the atlas contribution terms.
