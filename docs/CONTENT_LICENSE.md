# Content and third-party notices

## Original narrative and teaching content

Copyright © 2026 Tony Wu.

The original English and Chinese historical summaries, date notes, entry titles, person-profile and milestone text, route explanations, guided-reading text, study questions and activities created for **World History Atlas · 寰宇时序** are licensed under **Creative Commons Attribution 4.0 International (CC BY 4.0)**.

- [License overview](https://creativecommons.org/licenses/by/4.0/)
- [Legal terms](https://creativecommons.org/licenses/by/4.0/legalcode)

When reusing covered original content, credit **Tony Wu, World History Atlas · 寰宇时序**, provide the license link, retain a source link when supplied and identify changes. Do not imply endorsement.

This notice covers original expression and teaching material. It does not claim exclusive rights over underlying historical facts or relicense cited pages, source quotations, third-party images, imported map geometry, software dependencies or other third-party material. Their own rights and notices remain applicable. A source link is an evidence reference, not permission to reproduce the source's contents.

Original application code and project documentation are covered by the root [MIT LICENSE](../LICENSE). The package's MIT metadata describes that original code; it is not a blanket license for the complete data bundle.

## Distributed third-party material

| Material and local file | Source and retained notice |
| --- | --- |
| `dist/data/territories.geojson` — 102 selected dated features | André Ourednik and contributors, [Historical Basemaps](https://github.com/aourednik/historical-basemaps); [GPL-3.0 text](../dist/data/territories.LICENSE) |
| `dist/data/territories-awmc.geojson` — Roman Empire, 200 CE | [Ancient World Mapping Center](https://awmc.unc.edu/gis-data/); credit **Ancient World Mapping Center, Barrington Atlas and OpenStreetMap contributors**; [ODbL 1.0 text](../dist/data/territories-awmc.LICENSE) |
| `dist/data/territories-jiangshan.geojson` — Southern Song and Jurchen Jin in 1200, Ming in 1600 | DeanChensj's [Jiangshan Map](https://github.com/haitaowu12/jiangshan-map) schematics, pinned from the user's fork; [preserved upstream notices](../dist/data/territories-jiangshan.LICENSE.md), including its README GPL-3.0 declaration and root MIT notice |
| `dist/assets/land.geojson`, `countries.geojson`, `rivers.geojson` | [Natural Earth](https://www.naturalearthdata.com/about/terms-of-use/), public domain; [bundled terms](../dist/assets/land.LICENSE.md) |
| `dist/assets/d3.v7.9.0.min.js` | D3, Mike Bostock and contributors; [ISC notice](../dist/assets/d3.LICENSE) |

The three historical geometry sources are distributed as separate files. Their source commits, paths, source and output hashes, transformations and layer notices are recorded in [map-snapshots.json](../dist/data/map-snapshots.json) and explained in [MAP_METHODOLOGY.md](MAP_METHODOLOGY.md). Reference assets and D3 are recorded in [PROVENANCE.json](../dist/assets/PROVENANCE.json).

The Jiangshan repository's per-outline derivation is unresolved. Its references include CHGIS, Hartwell, Tan Qixiang and Historical Basemaps, but those references do not establish the origin or license of each individual shape. Both published repository notices are preserved; this document does not assert a uniform MIT license for upstream third-party data. No CHGIS dataset was downloaded or redistributed in this supplement.

CShapes was consulted for a limited local comparison of modern-period geography. No CShapes geometry is distributed. Its terms do not become the license of the shipped source layers.

## Reuse and contributions

Retain the appropriate source notice and attribution when reusing a particular data file; do not substitute this project's MIT or CC BY notice for the imported file's own terms. Keep source-specific geometry notices with copies or modifications and identify transformations. The files above and their license texts are the authoritative local notices.

Contributors should submit original code and documentation under the project's MIT license and original narrative or teaching text under CC BY 4.0. Identify third-party material explicitly, provide its source and applicable notice, and document any limits or unresolved provenance before incorporating it.
