# Contemporary reference and modern historical maps

Reviewed: 23 October 2026. Version 4 adds explicitly reviewed 2011–2026 reference intervals, period names/status, source-specific Russia/Ukraine fallback and smaller data files.

This work addresses the underlying error that allowed a 1960 political map to remain visible at 2026. A source snapshot is evidence for its stated year; it is not permission to keep the same countries or borders indefinitely. Historical context now has finite, per-feature eligibility. The contemporary reference has a separate reviewed interval and retains its actual 2022 geometry vintage. These are distinct data products even when the reader scrolls seamlessly between them.

## What this data pass adds

| Layer | Coverage | Source |
| --- | ---: | --- |
| Contemporary country/map-unit reference | 242 features | Natural Earth 1:50m, country dataset 5.1.1 within release 5.1.2 |
| Contemporary claim/dispute lines | 29 selected lines | Natural Earth 1:50m; five obsolete control lines excluded |
| Contemporary neutral claim-area overlay | 25 selected areas | Natural Earth 1:50m; three obsolete control polygons excluded |
| 1994 historical states | 47 selected states | Actual `world_1994.geojson` |
| 2000 historical states | 47 selected states | Actual `world_2000.geojson` |
| 2010 historical states | 48 selected states | Actual `world_2010.geojson` |

The 242 features include countries, dependencies, self-governing territories, disputed map units and Antarctica. This number is **not a count of sovereign states or UN members**. Small territories are generalized at this scale. Compared with the earlier 177-feature reference, the 1:50m input includes substantially more small states and territories.

The 2026 directory's editorial categories are 193 country, 37 dependency, 1 UN observer State, 8 disputed map units and 3 other entities. These categories are navigation aids, not a legal-status census. In a selected 2011 map, Palestine uses its explicit earlier category and note rather than the 2026 directory classification.

The modern historical snapshots include all 15 former Soviet republics as separate states, reunited Germany, separate Czech and Slovak states, Eritrea and Ethiopia, and Sudan before South Sudan’s independence, alongside selected states on other continents. They are selected coverage, not exhaustive reconstructions of every authority or wartime front line.

## Three dates that must remain separate

1. **Selected story year:** the year the reader asks to study.
2. **Historical snapshot year:** the year explicitly supplied by a historical geometry source.
3. **Contemporary geometry vintage and review date:** the Natural Earth source was published in 2022; this atlas reviewed and qualified its use on 23 October 2026.

The contemporary layer's `reviewedYear: 2026` does not claim that its vertices were surveyed in 2026. Its `geometryVintage: 2022` remains visible in the application. Natural Earth’s latest published repository release checked during this work was v5.1.2; the 50m countries file itself was last changed on 13 May 2022. This is generalized reference geography, not a feed of current military control.

Primary source descriptions:

- [Natural Earth 1:50m countries](https://www.naturalearthdata.com/downloads/50m-cultural-vectors/50m-admin-0-countries-2/)
- [Natural Earth release v5.1.2](https://github.com/nvkelso/natural-earth-vector/releases/tag/v5.1.2)
- [Natural Earth boundary policy](https://www.naturalearthdata.com/about/disputed-boundaries-policy/)
- [Natural Earth public-domain terms](https://www.naturalearthdata.com/about/terms-of-use/)

## Reviewed reference years and source-specific exceptions

`contemporary-world.json.contextValidity` allows reference context from **2011 through 2026**, inclusive. Every country feature also carries `sourceYear: 2022` and its own `contextValidity`, including `backwardReviewed`, review date, evidence URLs and a bilingual note. Earlier eligibility is an explicit curatorial judgment about use as a dated reference; it does not assert that every 2022 vertex was correct in 2011.

South Sudan is separately eligible from 2011, following independence on 9 July. The historical Sudan outline ends in 2010. Because the slider operates in whole years, a transition-year view does not imply that the later arrangement existed on January 1.

### Russia and Ukraine, 2011–2013

The Natural Earth Russia/Ukraine pair uses a de facto treatment of Crimea. That pair is **not eligible before 2014**. For 2011–2013, the metadata declares two historical fallbacks:

```json
[
  {"code": "RUS", "polityId": "russia-modern", "start": 2011, "end": 2013},
  {"code": "UKR", "polityId": "ukraine", "start": 2011, "end": 2013}
]
```

The runtime borrows the eligible actual **2010 Historical Basemaps outlines**, attaches the appropriate country identity for selection, and preserves the original source year, geometry URL, sources, qualification and **GPL-3.0-only license**. Those historical coordinates are not copied into the public-domain Natural Earth files. The view exposes mixed source vintages and country details show the selected feature's own provenance.

The Crimea hatch is eligible only from 2014. It identifies a disputed source claim area, not a current front line. The fallback and hatch rules prevent the 2022 source convention from being silently backdated to 2011–2013.

### Period names and Palestine's UN category

Names are resolved from per-feature `namePeriods` while the raw source names remain attached. The directory remains explicitly a 2026 reference.

| Map identity | Earlier selected-year label | Later label and evidence |
| --- | --- | --- |
| TUR | Turkey, 2011–2021 | Türkiye from 2022; [United Nations notice](https://turkiye.un.org/en/184798-turkeys-name-changed-t%C3%BCrkiye) |
| CZE | Czech Republic, 2011–2015 | Czechia from 2016; [UN short-name FAQ](https://ask.un.org/faq/75046). The formal name Czech Republic remains valid. |
| SWZ | Swaziland, 2011–2017 | Eswatini from 2018; [UN name authority record](https://digitallibrary.un.org/record/874164) dates the change to 19 April. |
| MKD | Macedonia (FYROM), 2011–2018 | North Macedonia from 2019; [UN membership and name chronology](https://research.un.org/en/unmembers/currentmembers). |

Palestine retains the source map code `PSX` and ISO identity `PSE`. Its editorial `categoryPeriods` show a geographic/reference entity in 2011 with a note that the later UN observer-State status had not yet been granted. From 2012 it is labelled **UN observer State / 联合国观察员国**, supported by [General Assembly resolution 67/19](https://digitallibrary.un.org/record/739031?ln=en), adopted on 29 November 2012. The period-specific note is displayed before the directory's current note. Its older source dependency classification is retained as provenance, not adopted as the editorial label.

## Boundaries, claims and recognition

Natural Earth uses a de facto cartographic convention. Its polygon arrangement cannot by itself establish international recognition, legal sovereignty, or current ground control. Imported source classifications such as `TYPE`, `SOVEREIGNT` and `FCLASS_ISO` are preserved as source fields. The app's broad categories are display aids.

Several known cases receive specific bilingual notes:

- **Russia and Ukraine:** the source’s treatment of Crimea differs from Ukraine’s internationally recognized borders. The Crimea claim area is given a neutral hatch, and the notes refer to UN General Assembly resolutions [68/262](https://digitallibrary.un.org/record/767565) and [ES-11/4](https://digitallibrary.un.org/record/3990400). The outline does not describe current fighting fronts.
- **Palestine and Israel:** source map-unit classifications are not used to deny State status or assert current control. The period rules above distinguish the 2011 map from Palestine's current directory category, supported by the [UN's observer State resources](https://research.un.org/en/unmembers/observers). Neither category decides boundaries or current control.
- **Taiwan, Northern Cyprus, Kosovo, Somaliland and Western Sahara:** separate map units are not presented as determinations of international recognition. Claim/dispute notes remain available.
- **Cook Islands and Niue:** the input's “Dependency” classification is not adopted as a description of their constitutions. Both are self-governing in free association with New Zealand; see [Cook Islands](https://www.mfat.govt.nz/en/countries-and-regions/australia-and-pacific/cook-islands) and [Niue](https://www.mfat.govt.nz/en/countries-and-regions/australia-and-pacific/niue).
- **Antarctica:** the map does not classify the continent as a sovereign state. [Article IV of the Antarctic Treaty](https://documents.ats.aq/atcm43/ww/atcm43_ww005_e.pdf) preserves the parties' positions on territorial claims.
- **Chagos:** signing a treaty is not treated as a completed transfer. The [8 October 2026 House of Commons Library review](https://commonslibrary.parliament.uk/research-briefings/cbp-10512/) states that the 2025 UK–Mauritius treaty had not entered into force. The atlas records that qualification.

### Obsolete control features excluded

The source’s old Nagorno-Karabakh/Artsakh breakaway outlines are unsuitable for contemporary display after the 2023 change in control. Its old Donetsk and Luhansk control outlines are also unsuitable as current front lines. This pass excludes five line features and three area features, rather than displaying them under a 2026 label. The remaining neutral hatches identify selected source claim areas, not live control. The [House of Commons briefing on Nagorno-Karabakh](https://commonslibrary.parliament.uk/research-briefings/cbp-9862/) supplies independent historical context.

Each retained line/area also has its own source year and interval. Enduring named source claim areas can appear from 2011 after review; Crimea begins in 2014. Anonymous source lines that could not be confidently tied to an earlier enduring claim begin in 2022. Removed obsolete control features are not restored for earlier slider years because their precise historical control phases were not reviewed here.

## Modern chronology checked against dated evidence

| Transition | Relevant date | Evidence used | Map consequence |
| --- | --- | --- | --- |
| Soviet dissolution | 1991 | [U.S. Office of the Historian](https://history.state.gov/milestones/1989-1992/collapse-soviet-union); [UN member history](https://research.un.org/en/unmembers/currentmembers) | USSR context ends 1991; successor identities are separate from 1992 onward |
| German reunification | 3 October 1990 | [German Federal Government](https://www.bundesregierung.de/breg-en/service/archive/archive/the-chancellor-who-reunited-germany-413888) | Divided-state context ends 1989; reunited reference is eligible from 1990 |
| Czechoslovakia ends | 31 December 1992 | [UN successor-state note](https://www.un.org/en/about-us/member-states/czechoslovakia) | Czechoslovakia context ends 1992; separate Czech and Slovak references start 1993 |
| Eritrean independence | 24 May 1993 | [UN Secretary-General message](https://digitallibrary.un.org/record/218378?ln=en) | Eritrea distinct from Ethiopia in 1994 onward |
| Timor-Leste independence | 20 May 2002 | [UN Security Council](https://press.un.org/en/2002/sc7403.doc.htm) | Contemporary reference includes Timor-Leste; no unsourced historical polygon is fabricated |
| Serbia–Montenegro separation | 2006 | [UN Yugoslavia and successor states](https://www.un.org/en/about-us/member-states/yugoslavia) | Premature separate authority labels excluded from 1994/2000; Montenegro included in 2010 |
| South Sudan independence | 9 July 2011 | [UN independence ceremony](https://press.un.org/en/2011/sgsm13696.doc.htm) | Historical Sudan context ends 2010; contemporary reference shows separate map units from 2011 |

The source files offer no 1970 or 1980 checkpoint. Their 1994, 2000 and 2010 filenames do not make all contained features correct. This pass found and excluded premature separate Serbian/Montenegrin authorities, the 2000 Hong Kong authority still labelled United Kingdom, and the 2000/2010 name Zaire. Timor-Leste lacks a named, separately reviewed polygon in these inputs. Serbia/Kosovo in 2010 requires a more explicit distinction between claims and administration. These are recorded gaps, not silently repaired with present-day geometry.

## Geometry and provenance

Contemporary input commit:

`nvkelso/natural-earth-vector@ca96624a56bd078437bca8184e78163e5039ad19`

Historical input commit:

`aourednik/historical-basemaps@da7a4b735ecef70aebdc9c73e409d8a2500d50f3`

The contemporary data retain original polygon coordinates. Historical coordinates are rounded to four decimal places; country pieces are collected into MultiPolygons; ring winding is normalized for D3. No borders are hand-drawn. A dated shape used for an adjacent selected year retains its original source year and explicit context qualification.

Natural Earth is public domain. The historical-basemaps derivatives retain GPL-3.0 notices. Original app text and code licenses do not override those independent data licenses.

### Manifest-driven chunks

The former large `contemporary-world.geojson` is replaced by **seven** country collections, `contemporary-world-01.geojson` through `contemporary-world-07.geojson`. Each is below 450,000 bytes. The manifest's `layers` contains `file`, `role`, `featureCount`, `bytes`, `outputSha256`, `sourceFile`, `sourceURL` and `sourceSha256`.

Country chunks use `role: "countries"`; the two overlay files use `role: "disputed-lines"` and `role: "disputed-areas"`. The app and validators discover the files from this metadata. The historical 142-instance collection is likewise split into four `territories-modern-history-*` chunks and discovered through `map-snapshots.json.layers`. Chunking changes packaging, not geometry, identity or licensing.

## Reproduction

Use the pinned `sourceURL` entries in `dist/data/contemporary-world.json` to download the three Natural Earth inputs into a temporary input directory. To rebuild the later historical snapshots as well, download `world_1994.geojson`, `world_2000.geojson`, and `world_2010.geojson` from the pinned historical commit. The temporal builder additionally requires the pinned files listed in `map-snapshots.json.contextSourceFiles`. Then run:

```sh
node scripts/build-contemporary-world.cjs /absolute/path/to/map-inputs
node scripts/build-modern-history.cjs /absolute/path/to/map-inputs
node scripts/build-temporal-context.cjs /absolute/path/to/historical-basemaps-inputs
node scripts/validate.mjs
npm test
```

The scripts use Node and the repository’s pinned D3 bundle. They emit checksums, geometry, metadata and validation records. Run the temporal builder after rebuilding modern historical geometry so it reattaches reviewed intervals, replaces obsolete large artifacts and updates all shard hashes. The optional independent CShapes check runs only when the separately obtained research input is available; the source data are not bundled. The shipped atlas loads local static data and makes no external geometry request at runtime.

Machine-readable records:

- [Contemporary provenance and exclusions](../dist/data/contemporary-world.json)
- [Historical snapshot manifest](../dist/data/map-snapshots.json)
-
-
