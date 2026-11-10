# Jiangshan delta review — V17

## Review boundary

This is the continuation after the [9 November review](JIANGSHAN_REVIEW_2026_11_09.md). The inspected original donor is **DeanChensj/jiangshan-map**, not a presumed later atlas feature-branch checkpoint.

- Previous reviewed donor revision: [`5be0dd1ae8550ea7376dde6aa95dd9c4eabe827e`](https://github.com/DeanChensj/jiangshan-map/tree/5be0dd1ae8550ea7376dde6aa95dd9c4eabe827e).
- Reviewed donor head: [`cfdd892b3f69d0d1abce975ea887fc4a1ec1dab0`](https://github.com/DeanChensj/jiangshan-map/tree/cfdd892b3f69d0d1abce975ea887fc4a1ec1dab0).
- [Pinned comparison](https://github.com/DeanChensj/jiangshan-map/compare/5be0dd1ae8550ea7376dde6aa95dd9c4eabe827e...cfdd892b3f69d0d1abce975ea887fc4a1ec1dab0): **four commits, 25 changed paths** (three additions and 22 modifications).

The delta changes presentation, storyline organization, search and Chinese-script handling. It does **not** add a new batch of person biographies or story records. Its file count must not be counted as missing atlas content. The comparison, relevant changed files, license and provenance statements were read through the GitHub connection. No donor script, deployment or GitHub Actions workflow was executed. This review belongs to the 9 November 2026 release cycle; writing and validation continued on 10 November UTC.

## Changes and selected treatment

| Pinned donor change | Evidence and useful method | Atlas treatment |
|---|---|---|
| [`288f30446d173422ec881dc059989c659cfdd21f`](https://github.com/DeanChensj/jiangshan-map/commit/288f30446d173422ec881dc059989c659cfdd21f), PR #332 | Reorganizes the An–Shi storyline into two camps and three acts, with predecessor relationships made explicit. | Retain the idea of readable thematic/chapter groupings. The atlas already has the V16 war-through-words reading and a chapter-capable reading catalogue. Do not duplicate its completed An–Shi stories or turn military lines into verified routes. |
| [`ec6daf80b45e49341b278193fea9a92987e8c959`](https://github.com/DeanChensj/jiangshan-map/commit/ec6daf80b45e49341b278193fea9a92987e8c959), PR #336 | Revises the homepage hero and README screenshots. | A presentation reference, with no source-content intake. Preserve the atlas's existing homepage backlinks and Firebase identity. No donor screenshots are copied. |
| [`466cbe8700e566caf48c102b1d733cdfe04d1442`](https://github.com/DeanChensj/jiangshan-map/commit/466cbe8700e566caf48c102b1d733cdfe04d1442), PR #334 | Loads event pinyin in the offline MCP path and checks plain/spaced/marked queries such as `nanjingtiaoyue`, `nán jīng tiáo yuē` and `nibuchutiaoyue`. | Adopt the search-parity method in independently written atlas normalization and tests. Existing reviewed aliases remain the evidence base; query normalization must not change stable identities or invent aliases. |
| [`cfdd892b3f69d0d1abce975ea887fc4a1ec1dab0`](https://github.com/DeanChensj/jiangshan-map/commit/cfdd892b3f69d0d1abce975ea887fc4a1ec1dab0), PR #335 | Revises context-sensitive Traditional Chinese conversion and route-trip search. Its worklog reports 177 phrases and 178 ambiguous-character rules. These are donor-reported implementation counts, not an independent language-quality score. | Review names in context, preserving the atlas's bilingual editorial layer. The donor's 曲嘉/曲氏高昌 → 麴嘉/麴氏高昌 correction is useful to check; the atlas already uses **麴氏高昌** in its place and settlement files, and no incorrect 曲嘉/曲氏高昌 string was found. No replacement was needed. |

The V17 biographies and world stories are original English and Chinese syntheses from the sources cited in their records. The new connected readings apply the donor-inspired principle of making relationships discoverable, without copying donor wording, code, translations or geometry.

## Historical issues that still require independent evidence

The changed An–Shi grouping does not resolve the issues found in the previous review:

- A traditional Chinese month number is not a Gregorian month conversion. The donor's `冬十一月` and an English November label cannot be treated as equivalent without calendar work.
- A spring–summer 756 Changshan episode appears after a July-labelled Mawei episode in the donor sequence. Array order is not evidence for within-year chronology.
- The malformed Xuanzong key `lix隆基` must not create another atlas identity.
- Troop totals, population-register changes and casualties require separate evidence. The rearrangement does not validate those figures.

The atlas's existing six V16 China stories already provide independently researched An–Shi, Du Fu, Yan Zhenqing, Su Shi and encyclopedia treatments. V17 deepens existing stable person IDs instead of rebuilding that batch.

## Provenance and rights

The current donor [LICENSE](https://github.com/DeanChensj/jiangshan-map/blob/cfdd892b3f69d0d1abce975ea887fc4a1ec1dab0/LICENSE), [README](https://github.com/DeanChensj/jiangshan-map/blob/cfdd892b3f69d0d1abce975ea887fc4a1ec1dab0/README.md) and [atlas-data note](https://github.com/DeanChensj/jiangshan-map/blob/cfdd892b3f69d0d1abce975ea887fc4a1ec1dab0/data/atlas/README.md) continue the distinctions recorded in the earlier review:

- GPL-3.0 applies to the donor's declared code/content layer.
- CHGIS/Hartwell prefecture material has separate academic/noncommercial terms and a no-redistribution statement. It is not cleared by the repository's general license.
- Early first-level geometry lacks recorded original provenance; individual-feature provenance is not supplied.
- Schematic outlines do not become surveyed boundaries because they pass geometry validation.

These declarations do not resolve the older atlas import's MIT-file/README discrepancy or retroactively relicense legacy material. The atlas's removed restricted polygons remain removed. This increment imports no new donor coordinates, screenshots, audio or image assets. Modern museum text is used as evidence for original prose; image reuse is handled separately in the V17 media catalogue.

Credit is due to **DeanChensj and the Jiangshan Map contributors** for the donor project, research leads, connected-story presentation and search-parity example. The implementation and historical writing selected for V17 are independently authored.

## What was already present, and what remains

Three earlier items should not be described as missing functionality:

1. The atlas already carries the reviewed search update with **232 aliases and 76 gazetteer entries**. This delta motivates testing alternate query forms, not importing that same data again.
2. The waterways and corridors are already implemented. The new [CH3 source comparison](CH3_SOURCE_COMPARISON_V17.md) verifies correspondence with the pinned source and distinguishes it from historical and rights review of each line. There is no new waterway geometry intake in V17.
3. The compound inherited `china-landmark-412` remains held for provenance review; its separately supported Galle inscription and Melaka voyage-depot topics already have reviewed records. A second pair of duplicates is unnecessary.

Outstanding donor-related research is therefore specific: resolve inherited geometry's feature-level evidence and rights where a reusable replacement can be found; independently review any further An–Shi episode before intake; and review context-sensitive Chinese names and aliases as bounded claims. None of the four inspected commits provides blanket clearance for those tasks. The broad expansion roadmap remains a continuing programme, while this V17 batch closes its explicitly assigned biography, story and reading scope.
