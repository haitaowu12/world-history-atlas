# V7: dated modern map coverage and the remaining premodern gaps

Reviewed 23 October 2026. This is the map-data workstream; browser integration and whole-product acceptance are recorded by the Site owner.

## Finding

The earlier annual continuity test established that some reviewed feature existed somewhere. It did not establish regional coverage. The legacy historical-context selector returns only 15 named outlines for 1886, 20 for 1925 and 74 for 1972. Those counts explain why a country can vanish even while the global check passes. Counts are calculated from the shipped source files, not a claim of complete national coverage.

The raw historical-basemaps snapshots also cannot safely be used as an unrestricted nearest-map fallback. Inspection found a Fatimid Caliphate in its 1200 file, even though the dynasty ended in 1171; a Mongol Empire label in the same pre-1206 file; and Kamakura-labelled Japan in its 1400 file. These are source chronology defects. They are not corrected by keeping a polygon visible for longer.

## Modern source adopted

[CShapes 2.0](https://icr.ethz.ch/data/cshapes/) provides dated state and dependent-territory country-period geometry. The publisher describes a global 1886–2019 dataset. Its own [codebook](https://icr.ethz.ch/data/cshapes/CShapes-2.0_Codebook.pdf) explains the coding conventions and excluded changes. The [research publication](https://icr.ethz.ch/publications/cshapes-2/) is the bibliographic source. These source conventions remain visible in the implementation: this is a de jure reference, not a war-front animation.

A fresh official GeoJSON download on 23 October matched the previously cached GeoJSON byte for byte:

- URL: `https://icr.ethz.ch/data/cshapes/CShapes-2.0.geojson`
- SHA-256: `384b1ea90b9419f30a858d7ec237c85a22c60d1b35b5f85f215a1204f9989d42`
- Source size: 26,344,671 bytes
- Country-period features: 710
- Exact numeric source date components retained. The timezone-shifted date strings are not used.
- The official CSV was separately fetched and its 710 period metadata rows inspected. This release's GeoJSON does not contain the political-status/ruled-by fields described in the codebook. Accordingly, the adapter calls its features historical units and does not infer that every polygon is an independent country.

## Implementation contract

New files:

- `dist/cshapes-history.mjs`
- `dist/data/cshapes-periods-v7.geojson`
- `dist/data/cshapes-v7.LICENSE.md`
- `scripts/build-cshapes-v7.cjs`
- `tests/cshapes-v7.test.mjs`

`selectCshapesAt(data, year)` returns a cached feature array only for integer years 1886–2019. The chosen date is **31 December**, stated by `cshapesReadout(year,lang)`. Inclusion requires that date to fall inside the source's exact inclusive validity bounds. State identifiers are unique within every annual selection. No geometry is extrapolated past the dataset's endpoint. The Site owner should retain the separately dated contemporary layer for 2020 onward.

Features retain source names, source geometry phase dates and source URLs; selected names are separate. Labels correct the reused Russia/Soviet alias, German occupation-zone/West/East/reunified phases and selected colonial and postcolonial name changes. A map year of 1991 means 31 December, so Russia and the other available successor units appear; the USSR does not. The 1990 view retains the USSR and already shows reunified Germany.

### Calculated comparison

These are feature counts, not completeness percentages. Source definitions and geographic granularity differ.

| Selected year | Earlier historical context | New CShapes annual selection |
| --- | ---: | ---: |
| 1886 | 15 | 128 |
| 1905 | 16 | 153 |
| 1925 | 20 | 169 |
| 1947 | 58 | 172 |
| 1965 | 73 | 163 |
| 1972 | 74 | 162 |
| 1985 | 76 | 159 |
| 1990 | 76 | 157 |
| 1991 | 78 | 172 |
| 1992 | 93 | 175 |
| 2005 | 95 | 178 |

For 2011–2019 the earlier app generally uses a retrospective Natural Earth layer; the new adapter instead supplies source-coded periods. Those are different cartographic conventions. The 181 active CShapes units at 2019 are not the same granularity as Natural Earth's 242 contemporary countries and territories. Missing microstates, units and island representations remain source limitations.

## Display generalization

The builder rounds coordinates to three decimals and simplifies closed rings by splitting at a distant vertex and applying Ramer–Douglas–Peucker to each arc with a 0.04-degree tolerance. It retains small polygon components and normalizes exterior/interior winding for D3.

Calculated derivative size is 6,350,890 bytes, with 269,258 vertices compared with 1,172,429 source vertices. This is a display derivative, not topology-preserving survey geometry; narrow slivers or gaps at shared boundaries can result. The source hash and algorithm settings are in the GeoJSON metadata. Attribution and the separate CC BY-NC-SA-4.0 dataset license ship beside it.

## Label and chronology evidence

- [UK Permanent Committee on Geographical Names: timeline](https://www.gov.uk/government/publications/country-names/timeline-of-country-name-changes-in-hmg-use-1919-to-present): selected colonial transitions and name changes. This records British usage, which can differ in timing from local usage; the adapter uses short geographical labels rather than copying all formal state titles.
- [UN Treaty Collection historical information](https://treaties.un.org/pages/historicalinfo.aspx): selected renaming and succession notes, including Congo/Zaire, Benin, Sri Lanka, Germany, Malaysia, Tanzania and Yugoslavia.
- [US Office of the Historian: collapse of the Soviet Union](https://history.state.gov/milestones/1989-1992/collapse-soviet-union): Soviet dissolution in December 1991.
- [German Federal Government: reunification](https://www.bundesregierung.de/breg-en/service/archive/archive/the-chancellor-who-reunited-germany-413888): reunification in October 1990.
- [National Museum of Australia: Indonesian Confrontation](https://www.nma.gov.au/defining-moments/resources/indonesian-confrontation): formation of Malaysia in September 1963.
- [UN Namibia mission background](https://www.unmissions.org/sites/default/files/past/untagS.htm): South West Africa/Namibia naming context.
- [The Met: Fatimid period](https://www.metmuseum.org/essays/the-art-of-the-fatimid-period-909-1171): dynasty chronology. This establishes why the inherited 1200 label is invalid, not the precise shape of any Fatimid frontier.

## Premodern decision

No unrestricted lifespan-based outline extension was added. For example, the existing Fatimid 1000 outline is cut off in 1047 because later North African control differs. The dynasty's survival in Egypt until 1171 cannot authorize carrying the same empire-wide geometry forward. Byzantine Anatolia after 1071, post-1204 successor states, early Ottoman expansion and late Mughal fragmentation require their own shapes or clearly marked regional context.

China's missing visual depth is being addressed separately with the original source's phased schematic layers and period place labels. The global premodern layer still needs comparable regional phase datasets. A populated map and an annually accurate geopolitical reconstruction are different claims; this release should claim only the evidence actually shipped.
