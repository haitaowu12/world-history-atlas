# Acknowledgements & sources · 致谢与来源

## Jiangshan Map / 江山时序

My warm thanks to **DeanChensj and the Jiangshan Map contributors**. Their work made Chinese history explorable through a map, events, places and people's stories, and inspired me to build a worldwide, bilingual atlas for learning with my daughter.

- [Original repository — DeanChensj/jiangshan-map](https://github.com/DeanChensj/jiangshan-map)
- [Original live atlas](https://deanchen.me/jiangshan-map/)
- [Earlier fork containing World History Atlas's original development and pinned source history](https://github.com/haitaowu12/jiangshan-map)

The contribution is substantive: this atlas adapts attributed Jiangshan event narratives, supplied English translations, profiles, chronicles, quotations, place notes, historical names and other reference records. The [import audit](docs/V5_CHINA_IMPORT.md), [source manifest](dist/data/china-import-manifest.json) and [preserved upstream notices](dist/data/china-upstream.LICENSE.md) identify the pinned sources, transformations and limits. Later corrections are retained separately from the frozen import. Additional search aliases have their [own attribution](docs/CONTENT_LICENSE.md#october-25-2026-additive-upstream-intake).

The pinned source's MIT license text and README's GPL-3.0 statement are both preserved. The atlas does not resolve that discrepancy by declaring all inherited material MIT or CC BY. The older inherited political and administrative polygons were removed from the current distribution; the [boundary review](docs/JIANGSHAN_BOUNDARY_RIGHTS_REVIEW_2026_10_28.md) records that decision and remaining non-polygon provenance questions. Historical notices and older commits are retained as history.

For **0.22.0**, the [9 November 2026 review](docs/JIANGSHAN_REVIEW_2026_11_09.md) compares the intervening Jiangshan changes through upstream commit [`5be0dd1`](https://github.com/DeanChensj/jiangshan-map/tree/5be0dd1ae8550ea7376dde6aa95dd9c4eabe827e). Selected An–Shi, Su Shi and institutional topics informed six new China stories, researched from independent historical texts, scholarship and institutional records. Four earlier Jiangshan-inspired stories also received independent source corrections. This update imports no new donor code, prose or geometry; earlier inherited material keeps its existing attribution and notices.

World History Atlas is maintained independently by Tony Wu. These credits do not imply endorsement by Jiangshan's authors or any source provider.

For **0.23.0**, the [V17 review](docs/JIANGSHAN_REVIEW_V17.md) follows the next four commits through [`cfdd892`](https://github.com/DeanChensj/jiangshan-map/tree/cfdd892b3f69d0d1abce975ea887fc4a1ec1dab0). The donor's connected-story organization and search-parity work informed original atlas implementation and teaching methods. No new donor code, prose, translation, screenshot or geometry is copied. The [CH3 source comparison](docs/CH3_SOURCE_COMPARISON_V17.md) documents the correspondence and limits of the waterways and corridors already present.

特别感谢 DeanChensj 和江山时序的贡献者们。你们把地点、人物和事件放回地图中的方式，为这个项目提供了重要启发。普天之下也继承并改编了有明确归属的江山资料；这些贡献及其原始声明会继续保留。

## Maps, data and software

The table is an entry point to source-specific attribution, transformations and terms. The detailed notices govern the corresponding files, rather than a single license for the whole bundle.

| Contribution | Credit and retained notice |
| --- | --- |
| Historical Basemaps | André Ourednik and contributors — [project](https://github.com/aourednik/historical-basemaps), [GPL text](dist/data/territories.LICENSE), [transformation notice](dist/data/territories-modern-history.LICENSE.md) |
| CShapes 2.0 | Guy Schvitz, Seraina Rüegger, Luc Girardin, Lars-Erik Cederman, Nils Weidmann and Kristian Skrede Gleditsch; ETH Zürich — [citation, CC BY-NC-SA 4.0 and modifications](dist/data/cshapes-v7.LICENSE.md) |
| Roman Empire reference, 200 CE | Ancient World Mapping Center, Barrington Atlas and OpenStreetMap contributors — [source and ODbL notice](dist/data/territories-awmc.LICENSE) |
| Historical United States states and territories | Newberry Library and contributors — [source, transformations and retained terms](dist/data/americas-history.LICENSE.md) |
| Canadian territorial evolution | Natural Resources Canada — [source and Open Government Licence – Canada notice](dist/data/americas-history.LICENSE.md) |
| Physical geography, contemporary countries and regional reference | Natural Earth and contributors — [physical assets](dist/assets/land.LICENSE.md), [contemporary reference](dist/data/contemporary-world.LICENSE.md), [regional reference](dist/data/regional-reference.LICENSE.md) |
| c. 250 BCE Warring States illustration | Ian Remsen — [source, CC0 dedication and modifications](dist/data/china-open-warring-v17.LICENSE.md) |
| 1141 Song, Jin and Western Xia illustration | Ian Kiu, based on Albert Herrmann's atlas — [source, CC BY 3.0 and modifications](dist/data/china-open-song-jin-1141.LICENSE.md) |
| 1415 Ming illustration | Albert Herrmann and Georg Westermann, with the scan supplied through Wikimedia Commons — [source status, adaptation and limits](dist/data/china-open-ming-1415.LICENSE.md) |
| Other selected historical schematic references | Their named authors and sources remain credited in [the content notices](docs/CONTENT_LICENSE.md) and the `dist/data/*.LICENSE*` files |
| D3 | Mike Bostock and contributors — [ISC notice](dist/assets/d3.LICENSE) |

## Historical evidence and teaching content

Thank you to the museums, libraries, archives, universities, heritage institutions, researchers and community organizations whose work helps put these histories in context. Individual entries and source notes link the evidence used for particular claims. The [source registry](docs/history-source-registry.json), [data policy](docs/DATA_POLICY.md) and [map methodology](docs/MAP_METHODOLOGY.md) explain the different roles of narrative sources, dates, representative locations and map geometry.

A citation does not imply endorsement or transfer the rights in a source page. Source inspection, historical interpretation and translation remain open to correction. The collection is selective and does not claim complete or evenly distributed coverage.

The 0.22.0 additions comprise **14 original bilingual stories**: six about China and eight about objects, work and knowledge across other regions. The [China review](docs/JIANGSHAN_REVIEW_2026_11_09.md) and [world-story research notes](docs/V16_WORLD_STORIES_RESEARCH.md) identify the selected evidence and its limits. Three new guided readings connect these additions, bringing the atlas to **73 guided readings**.

V17 adds **101 original bilingual biographies, 47 stories and 30 readings**. The [early-China and Africa/West Asia/Europe ledger](docs/V17_EARLY_CHINA_AND_AF_WA_EU_RESEARCH.md), [medieval-China and Asia ledger](docs/V17_MEDIEVAL_CHINA_AND_ASIA_RESEARCH.md), and [later-China and Americas/Pacific ledger](docs/V17_LATER_CHINA_AND_AMERICAS_PACIFIC_RESEARCH.md) identify the inspected texts, scholarship, museums, archives and community sources. Individual source notes explain what each passage supports and where interpretation remains qualified.

## Historical portraits and object images

The current [V17 media catalogue](dist/data/history-media-v17.json) contains **29 images**, preserving the original sixteen and adding thirteen. The [V17 image review](docs/HISTORICAL_MEDIA_V17.md) records eleven public-domain portraits/depictions and two Met CC0 object photographs. Named artists, photographers, collections and prior digital edits remain credited. No AI-generated reconstruction or uncertain new portrait identification is included.

The 0.22.0 image collection adds **16 locally held images**, including **ten portraits or depictions of historical people** and **six object or manuscript images**. Thank you to the named photographers, artists, collections and digitization contributors credited in the [image notice](dist/assets/history-media/NOTICE.md), including The Metropolitan Museum of Art, the National Palace Museum in Taipei, and Wikimedia Commons contributors and their source institutions.

The [media manifest](dist/data/history-media.json) records each creator, collection, source, date, representation limit and applicable rights statement. It distinguishes a photograph or surviving object from a later depiction; a portrait is not automatically an eyewitness likeness. Image-specific public-domain, CC0 and CC BY-SA terms remain separate from the atlas's original-text license. The [media research notes](docs/HISTORICAL_MEDIA_2026_11_09.md) document this selection.

## Development and reuse

Tony Wu developed and maintains World History Atlas with help from **OpenAI Codex** for coding, research assistance, drafting and verification. The project owner is responsible for the selection and review of what is published; AI assistance does not establish historical accuracy.

Original application code and documentation use [MIT](LICENSE). Original narrative and teaching material use [CC BY 4.0](docs/CONTENT_LICENSE.md). Imported and adapted third-party material retains its own notices. Please keep the relevant credits and identify modifications when reusing it.

## Interface typography

IBM Plex Sans and Source Serif 4 are bundled locally under the SIL Open Font License 1.1. Their notices are included in `dist/assets/fonts/`. Chinese text uses the device’s available Chinese fonts.
