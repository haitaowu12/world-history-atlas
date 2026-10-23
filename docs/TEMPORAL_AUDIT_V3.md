# Temporal coverage and dated-map audit

Reviewed 22 October 2026, following the report that the Soviet Union appeared when the atlas year was 2026. This document records the defect, the regression checks, and a bounded review of the 15 historical snapshots originally delivered in v2. It does not certify every historical boundary.

## The root defect

The former `nearestSnapshot()` rule selected the latest historical map whose year was less than or equal to the selected year. `renderTerritories()` then drew all polygons from that source year. The last available historical map was dated 1960, so its Soviet Union and separate German states remained visible in 2026. The small source-year label did not make that behavior suitable for a learning map.

The same rule caused errors throughout the chronology. For example, the 200 CE Han and Parthian outlines remained visible in 250; the 600 Sui outline in 700; the 800 Tang outline in 950; the 1600 Ming outline in 1750; and the 1900 Qing, Russian and Austro-Hungarian imperial outlines in 1949. These were selection errors, independent of whether a polygon was reasonable at its own source date.

The existing test that deliberately selected a 1200 map for a 2026 query described the old behavior; it was not an accuracy test.

## Required selection behavior

Historical geometry is now selected only at its exact documented snapshot year. Unsupported years return a coverage gap, with navigation to actual earlier and later maps. They do not inherit the previous polity, infer its survival, or interpolate its borders. Narrative entries remain available according to their own stated focus periods.

A contemporary reference layer is a separate mode. It requires an explicit `reviewedYear` matching the selected year. Its original dataset vintage and its scope must stay visible: the date of an atlas review is not proof that the geometry tracks every current territorial dispute, administrative change, or military front line.

Polity existence and geometry validity are different questions. An empire can continue to exist while its borders change. Future expansion to date ranges must therefore provide reviewed validity for the shape itself; attaching a dynasty's lifespan to one polygon is insufficient.

### Regression scenarios

| Selected year | Former inherited map | Error exposed |
|---|---:|---|
| 329 BCE | 500 BCE | Achaemenid imperial footprint after the conventional imperial endpoint |
| 300 BCE | 323 BCE | Alexander's conquest footprint treated as a continuing unified empire |
| 250 CE | 200 CE | Han and Parthia after their conventional endpoints |
| 700 | 600 | Sui and Sasanian states after their endpoints |
| 950 | 800 | Tang after 907; Carolingian unity also unsuitable |
| 1150 | 1000 | Northern Song footprint after the north–south division |
| 1290 | 1200 | Southern Song and Jurchen Jin after their endpoints |
| 1390 | 1300 | Yuan rule in China and the Ilkhanate carried forward |
| 1550 | 1500 | Preconquest Mexica and Inca footprints; Mamluk rule after 1517 |
| 1750 | 1600 | Ming main-dynasty footprint carried forward |
| 1949 | 1900 | Qing, Russian Empire, German Empire, Austria-Hungary and British India |
| 1972 | 1960 | Pakistan's eastern and western wings after Bangladesh's independence |
| 1992 and 2026 | 1960 | USSR and separate East/West German states |

`tests/temporal-coverage.test.mjs` checks the exact-year rule, the 1960/2026 distinction, these transition cases, every unsupported civil year across the atlas's supported range, actual-date navigation, contemporary review matching, malformed dates, and the absence of year zero. It also prevents the three newly rejected polygons below from silently returning.

Historical checks for the recent examples include the [UN's Russian Federation membership record](https://www.un.org/en/about-us/member-states/russian-federation), the [U.S. Office of the Historian's account of the USSR's collapse](https://history.state.gov/milestones/1989-1992/collapse-soviet-union), the [German Federal Government's 3 October 1990 chronology](https://www.bundesregierung.de/breg-de/schwerpunkte/deutsche-einheit/die-einheit-ist-wirklichkeit-432814), the [UN's account of its work during Bangladesh's 1971 independence war](https://bangladesh.un.org/en/about/about-the-un), the [National Army Museum's 1947 independence and partition history](https://www.nam.ac.uk/explore/independence-and-partition-1947), and the [Habsburg museum project on the monarchy's 1918 collapse](https://ww1.habsburger.net/en/chapters/end-monarchy-birth-new-states). These sources establish chronology, not polygon accuracy.

## Actual-year snapshot review

All 15 shipped snapshot membership lists were inspected against the existing chronology and source catalogue. The main political names are plausible at their stated dates; the review found no new whole-polity name that must be removed solely because the polity did not yet exist or had already ended in that exact snapshot year. The geographic review did reveal three substantial failures, described below. Counts in this table describe the **106 v2 feature instances before those three exclusions**.

| Snapshot | Original count | Membership finding and remaining qualification |
|---|---:|---|
| 500 BCE | 3 | Achaemenids, Carthage and Kush are chronologically plausible. Their peripheral control is not independently reconstructed. |
| 323 BCE | 3 | Alexander's conquests, Carthage and Kush are plausible for the year. Alexander died during the year; this is a dated conquest-era illustration, not a claim that a unified administration lasted through every subsequent month. |
| 1 BCE | 4 | Rome, Parthia, Han and Kush are plausible. This date precedes the 9–25 CE interruption in Han rule. |
| 200 CE | 4 | Rome, Parthia, Han and Kush are plausible. Rome is the separately licensed, explicitly dated AWMC replacement. The map is not valid indefinitely after 200. |
| 600 | 4 | Sasanian, Byzantine, Frankish and Sui names are plausible. “Frankish kingdoms” avoids implying one centralized realm. |
| 800 | 5 | Abbasid, Carolingian, Tang, Byzantine and Ghana/Wagadu names are plausible. “Carolingian realm” avoids imposing an imperial title on the whole of a year in which coronation occurred late. Early Ghana's extent remains especially approximate. |
| 1000 | 10 | Listed polities are plausible. Northern Song is distinguished from the later Southern Song. Lyon near the France outline is a source-scale frontier concern, below. |
| 1200 | 7 | Southern Song/Jurchen Jin replace the erroneous repeated Northern Song footprint. Known premature Mongol/Delhi and expired Fatimid/Ghaznavid labels remain excluded. Angevin possessions should be read as a composite set of holdings. |
| 1300 | 9 | Yuan, Ilkhanate, Mamluk and other listed states are plausible. Mongol successor realms are separate. Tributary relationships and frontier control remain simplified. |
| 1400 | 8 | Listed names are plausible. The stale Yuan/Great Khanate and Kamakura labels remain excluded. Timurid conquests cannot be assumed to represent equally administered territory. |
| 1500 | 7 | Listed names are plausible, including preconquest Mexica and Inca states. Belgrade is close to the drawn Ottoman edge and needs a better frontier source, below. |
| 1600 | 6 | Listed names are plausible. The more restricted Ming schematic remains a phase illustration, and the incorrect preconquest Inca/Songhai shapes remain excluded. |
| 1800 | 6 | All six names existed, but the Peru/Río de la Plata pair assigns Upper Peru incorrectly. Both are rejected pending a dated replacement; the remaining four are selective. |
| 1900 | 12 | Listed names existed. The Ethiopian shape substantially omits territory incorporated before 1900 and is rejected. Dependent and disputed areas are not exhaustively represented by the remaining eleven. |
| 1960 | 18 | Listed names existed at the reference date. Pakistan included its eastern wing; the separate German states and USSR are appropriate to this snapshot. These facts do not make the geometry valid for later decades. Dependencies and sovereignty nuances remain selective. |

The table is an existence/membership review, not a new independently surveyed map of 106 territories. Prior map research and citations are in [MAP_METHODOLOGY.md](MAP_METHODOLOGY.md), and source commit/file provenance remains in `dist/data/map-snapshots.json`.

## Three actual-year polygons to exclude

### 1. `1800-peru-colonial`

The imported 1800 Peru shape contains Sucre/Charcas at approximately 65.26° W, 19.03° S, and La Paz at approximately 68.15° W, 16.50° S. D3's own `geoContains` confirms inclusion. Sucre lies about 333 km from the nearest source edge under a local planar distance estimate, so this is materially larger than a small-scale coastline or frontier approximation.

The creation of Río de la Plata in 1776 transferred Upper Peru/Charcas to the new jurisdiction. The [Spanish Ministry of Culture's archival historical introduction](https://www.cultura.gob.es/en/cultura/archivos/difusion/mc-difusion/bicentenarios/contexto-historico/imperio-espanol/organizacion/virreinatos.html) identifies the 1776 foundation, Buenos Aires as capital, and present-day Bolivia within its scope. Its indexed text was available; a full-page fetch returned HTTP 429 during this audit. The [Met's South America chronology](https://www.metmuseum.org/zh/toah/ht/09/sa.html) independently identifies the 1776 viceroyalty split, and [Ananda Cohen-Aponte's scholarly introduction to the Viceroyalty of Peru](https://smarthistory.org/viceroyalty-peru/) explains the contraction after the new viceroyalties were established.

**Decision:** exclude the imported Peru outline for 1800. Do not redraw it from contemporary national borders or fix it only by changing its label.

### 2. `1800-rioplata`

The paired Río de la Plata shape omits Sucre and La Paz. Its northern extent stops around 21.92° S, south of both cities. The omission is the counterpart of Peru's incorrect inclusion and conflicts with the same 1776 jurisdiction evidence.

Buenos Aires itself falls roughly 9 km outside the coarse imported coastline. That coastal discrepancy alone would not justify removing a global-scale outline; the substantial omission of Upper Peru is the decisive issue.

**Decision:** exclude this outline together with the Peru outline until both can be replaced from a mutually consistent, dated source. Do not present the two mismatched polygons as a complete division of Spanish South America.

### 3. `1900-ethiopia`

The outline omits Harar, approximately 42.12° E, 9.31° N. D3 `geoContains` confirms exclusion; the point is about 369 km from the nearest imported boundary under a local planar estimate. The [UNESCO Harar Jugol statement of Outstanding Universal Value](https://whc.unesco.org/en/list/1189/) explicitly dates incorporation into Ethiopia to 1887. The UNESCO page also supplies an authoritative site coordinate, approximately 42.138° E, 9.309° N; the small coordinate difference does not change the finding.

**Decision:** exclude the imported 1900 outline pending a source that incorporates nineteenth-century territorial changes. The 1960 Ethiopian feature is a different geometry and is not rejected by this finding.

These exclusions remove three defective feature instances from the original historical layer, leaving **103**. They reduce 1800 from six to four selected territories and 1900 from twelve to eleven. The rejected polygons' original source identity, evidence and reason belong in the exclusion log; their IDs must disappear from both runtime geometry and active snapshot membership.

## Source-scale concerns that are not whole-polygon exclusions

The 1500 Ottoman polygon places a representative Belgrade point about 12 km inside its edge, while the [Historical Archives of Belgrade](https://www.stalnapostavka.arhiv-beograda.org/en/chapters/between-a-crescent-and-a-cross/the-war-times.html) dates Ottoman conquest to 1521. The 1000 France polygon places a Lyon point approximately 42 km inside its edge, while the [Lyon Municipal Archives](https://www.archives-lyon.fr/expos/lyon-au-fil-du-temps) dates incorporation into the French Crown to 1312. Those discrepancies need attention when better frontier geometry is found. The point distances are small relative to these schematic world-map outlines, so they are recorded as source-scale uncertainties, not treated as sufficient evidence to discard each entire polity.

Bounding boxes alone are not proof of a historical error. Likewise, a single coastal point just outside a generalized outline is not a reliable completeness test. Spatial probes must be interpreted together with source scale, chronology, disputed jurisdiction and distance from the boundary.

## Other temporal layers

- Historical records use an inclusive **focus interval**, which may describe a selected period of a city's history or a long cultural sequence rather than a continuously existing state. The end of such an entry must not be turned into a polity extinction date.
- The Han record explicitly acknowledges the 9–25 CE interruption. The Eastern Roman record explicitly acknowledges Latin rule in Constantinople from 1204–1261. Their broad narrative intervals should not be used to infer uninterrupted control of the representative city. Multi-interval political-control metadata remains future work.
- Biography milestones are ordered and constrained to the stated lifespan or career/reign focus. Some biography intervals are deliberately not lifespans; their date notes disclose the distinction.
- Journey nodes have explicit civil years, while broad network nodes are intentionally undated. The route library and evidence notes distinguish a network from one person's exact itinerary. A full-route overview is not proof that every segment was traveled in the selected year.
- Before v3 content expansion, the latest non-biographical event ended in 1994, and the only non-biographical records active in 2026 were Kuk and Budj Bim. That was a significant modern learning-content gap, independent of the territorial rendering defect. Increasing current coverage should add sourced historical transitions and contemporary context rather than stretching old event spans to the present.

## Limits and future data gates

The former coarse CShapes comparison sampled points **inside** imported polygons. That can expose obvious overreach but cannot reveal substantial territory missing outside the polygon. Harar demonstrates why a containment share was never a completeness score. Future map acceptance should combine expected-inside and expected-outside historical landmarks, source-date checks, a two-way spatial comparison where licenses allow it, and visual inspection at the source's intended scale.

Tests validate selection and known exclusions. They cannot establish the historical truth of unreviewed geometry. The app should continue to expose its actual supported years and source vintage, and avoid describing these layers as complete annual world borders.

## Integrated outcome
