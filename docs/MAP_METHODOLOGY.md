# Regional gap review addendum, 26 October 2026

[South Asia, Africa and Southeast Asia](REGIONAL_GAPS_REVIEW.md) adds60 selected source instances across24 identities. Source files remain frozen; the Chola whole-island and Ghana/Soso corrections apply to runtime copies. A valid explicit context interval constrains exact source-year selection as well as reuse, so a later derived phase cannot appear under its future label at an earlier geometry source date. Missing/malformed windows retain exact-only source behavior. The source chronology, component reassignment, rejected donor shapes and remaining gaps are documented in the review.

# Historical map methodology — version 4

26 October correction: [regional map continuity](REGIONAL_MAP_CONTINUITY.md) adds 23 dated South American/African instances and supplements four early CShapes coverage gaps. Current historical total: 539 instances. The original V4 counts and validation report below remain the frozen checkpoint, not current regional-completeness claims.

Current 0.13.0 addendum: [dated Americas and map-view method](AMERICAS_HISTORY_013.md) governs the separate Newberry/NRCan references, source-window replacement, palette and History / Modern geography view behavior. Earlier source-specific details below remain historical documentation; US/Canada are no longer universally represented by modern reference outlines.

Reviewed 23 October 2026. This is a selective educational atlas with **dated reference outlines**, not an exhaustive historical GIS or an annual reconstruction of every world border.

## Coverage and the continuity change

The historical collection contains **516 source-year feature instances, 180 society/state identifiers, and 43 actual source checkpoints**. This expands the preceding release's 245 instances, 99 identifiers, and 18 checkpoints. There are 271 newly selected source-year instances. Two identities, the Indus civilization and Minoan Crete, are explicitly cultural regions rather than sovereign states.

The oldest actual geometry checkpoint is **2000 BCE**. Reviewed cultural context begins at **2600 BCE**, and the earliest selected kingdom context, Kerma, begins at **2500 BCE**. At least one reviewed society/state reference is eligible in every civil year from 2600 BCE through 2010 CE. This is a statement about temporal availability, **not complete geographic coverage**. The separate contemporary reference supports 2011–2026.

The previous exact-source-year rule made much of the map disappear between checkpoints. Version 4 retains original source dates and adds explicit, finite eligibility intervals for each named society or state. An outline can remain visible as **dated context** between checkpoints, without treating it as an exact border survey for the selected year. Expired names cannot be retained indefinitely. A feature without reviewed interval metadata remains eligible only in its original source year.

Full phase rules, transition evidence and exclusions are in [MAP_CONTEXT_V4.md](MAP_CONTEXT_V4.md). The reproducible registry is [map-context-curation.cjs](../scripts/map-context-curation.cjs). The machine-readable  lists each source year, context interval, shard, source-file checksum and output checksum.

### Actual checkpoints

The counts below describe polygons supplied by that original source year. A rendered year can also contain eligible context from other source years. Such a view is labelled context and exposes its source dates; it is not represented as an exact snapshot.

| Source year | Selected instances |
| --- | ---: |
| 2000 BCE | 3 |
| 1500 BCE | 2 |
| 1000 BCE | 3 |
| 700 BCE | 3 |
| 500 BCE | 3 |
| 400 BCE | 1 |
| 323 BCE | 3 |
| 300 BCE | 6 |
| 200 BCE | 7 |
| 100 BCE | 5 |
| 1 BCE | 4 |
| 100 | 3 |
| 200 | 4 |
| 400 | 3 |
| 500 | 4 |
| 600 | 4 |
| 700 | 2 |
| 800 | 5 |
| 900 | 8 |
| 1000 | 10 |
| 1100 | 8 |
| 1200 | 7 |
| 1300 | 9 |
| 1400 | 8 |
| 1500 | 7 |
| 1600 | 6 |
| 1650 | 16 |
| 1700 | 13 |
| 1715 | 17 |
| 1783 | 14 |
| 1800 | 4 |
| 1815 | 10 |
| 1878 | 14 |
| 1900 | 11 |
| 1914 | 15 |
| 1920 | 15 |
| 1930 | 16 |
| 1938 | 13 |
| 1945 | 15 |
| 1960 | 73 |
| 1994 | 47 |
| 2000 | 47 |
| 2010 | 48 |

The civil year `-1` means **1 BCE**. There is no year zero. Uncolored land means that no reviewed outline has been selected for that place and date; it does not mean uninhabited land, no political organization, or no history.

## Temporal rendering contract

Every historical feature retains `year` and adds `sourceYear` with the same original date. Its optional context metadata is:

```json
{
  "start": 1949,
  "end": 1989,
  "backwardReviewed": true,
  "reviewedAt": "2026-10-23",
  "evidence": ["https://example.org/primary-source"],
  "note": {"en": "…", "zh": "…"}
}
```

The example describes a schema, not a source URL used in the dataset. Bounds are inclusive civil years. The interval is a curatorial eligibility window, **not a claim that all vertices were valid throughout it**, and not necessarily the complete lifespan of the society.

The runtime selects one feature per `polityId`: the newest eligible source at or before the selected year; if none exists, the earliest explicitly backward-reviewed later source. Later geometry requires both an enclosing interval and `backwardReviewed: true`. Missing or malformed interval metadata grants no carry-forward permission. Source years, selected years, licenses and uncertainty notes remain separate.

A view with only same-year polygons is an exact dated-source view. Mixed source years are a context view. The modern reference has a separate reviewed interval and country-specific qualifications. No annual frontier interpolation occurs.

Year-level controls do not resolve changes within a particular calendar year. Transition-year choices are editorially bounded and accompanied by dated evidence. They must not be interpreted as a military-control map on January 1 or December 31.

## Geometry sources and independent licenses

### Historical Basemaps

Repository: [André Ourednik and contributors, historical-basemaps](https://github.com/aourednik/historical-basemaps), pinned at `da7a4b735ecef70aebdc9c73e409d8a2500d50f3`.

The GPL-derived files are now split into inspectable collections below **450,000 bytes**:

- `territories-legacy-01.geojson` through `territories-legacy-03.geojson`: 99 previously reviewed instances after the v3 exclusions.
- `territories-modern-history-01.geojson` through `territories-modern-history-04.geojson`: the 142 reviewed 1994, 2000 and 2010 instances.
- `territories-context-01.geojson` through `territories-context-08.geojson`: 271 newly selected dated instances.

The original large `territories.geojson` and `territories-modern-history.geojson` are replaced by these shards. The application discovers them through `map-snapshots.json.layers`; filenames must not be hard-coded. GPL-3.0-only notices remain in `territories.LICENSE` and `territories-modern-history.LICENSE.md`. Original source names, authorities, filenames, source commits and per-feature geometry links remain attached to the features. Source input checksums are in `sourceFiles` and `contextSourceFiles`; current output hashes are in `layers`.

The upstream is a work in progress designed for broad world/continental display. This atlas uses an explicit positive selection of named features, never an assumption that every item in a year-labelled file is valid. Source geometry, chronology evidence and editorial eligibility are separate fields. Museum, archive and UN evidence does not verify every polygon vertex.

### AWMC: Roman Empire in 200 CE

`territories-awmc.geojson` remains separate under **ODbL 1.0**, with `territories-awmc.LICENSE` and the attribution **Ancient World Mapping Center; Barrington Atlas; OpenStreetMap contributors**.

Source: [Ancient World Mapping Center](https://awmc.unc.edu/gis-data/), [AWMC/geodata](https://github.com/AWMC/geodata), commit `7ecf8bccea2efe1e1e9df2daf6001942de73fb87`.

The original file is `Cultural-Data/political_shading/roman_empire_ce_200_extent/roman_empire_ce_200_extent.geojson`, SHA256 `b1517aa96d43547925985069f8beefa761c361cad5986d35c7d607e86821527d`. Its 112 components are grouped into one selectable feature. It replaces an unsuitable global-source outline that extended into southern Mesopotamia without distinguishing temporary conquests. A dated context interval does not change this geometry's source year or license.

### Jiangshan published schematics

`territories-jiangshan.geojson` retains three selected schematics from [the user's Jiangshan Map fork](https://github.com/haitaowu12/jiangshan-map), commit `fcd6484d06d3c581241fc24adbab288cf3a4a2ea`. The source file is `js/atlas_snapshots.js`, SHA256 `a0834b2e77a88b55e3327f51146af05d6d5392823f413eade542cd7306a1ed71`.

The Southern Song and Jurchen Jin source phase is 1141–1205 inclusive (`s_nansong_a`); the selected Ming schematic has a published phase 1449–1615 inclusive (`s_ming_b`). Their `sourcePhase` objects remain intact. The context registry respects the phase endpoints. A source phase is provenance for a published schematic, not an independent historical GIS survey. Retain both upstream license notices as explained in `territories-jiangshan.LICENSE.md`; no restricted CHGIS geometry was copied.

### Contemporary and physical reference layers

The contemporary countries, disputed lines and hatched claim areas come from public-domain Natural Earth. They have their own manifest, country-specific ranges, original 2022 vintage and 2026 review date. Their 2011–2013 Russia/Ukraine fallback borrows the separately licensed 2010 historical features **in memory**, preserving those features' GPL license and source date. See [the contemporary methodology](CONTEMPORARY_MAP_METHODOLOGY.md).

The physical map's coastlines, rivers and optional modern borders are orientation aids. Present-day river courses and shorelines do not establish historical geography. Modern borders remain an explicit reference layer rather than proof of historical political boundaries.

## Transformations

Historical input vertices are rounded to four decimal places; polygon components are grouped by selected polity and source year. Rings are closed and normalized for D3 spherical winding; degenerate zero-area components are omitted. The v4 additions remove eight degenerate outer components and one degenerate hole and reverse one outer ring and one hole. Natural Earth country coordinates are retained.

No modern polygon is assigned an ancient source year. No frontier is fabricated by interpolation, no old name is cosmetically attached to a modern country silhouette, and no restricted CShapes polygon is redistributed. Geometry referenced at an adjacent selected year retains its original date and context qualification.

## Review and exclusions

The existing v2/v3 exclusions remain in the manifest. They include early David/Solomon, premature Mali and Mongol/Delhi names, stale Fatimid/Ghaznavid/Song/Yuan outlines, Inca after conquest, Songhai after 1591, excessive Ming silhouettes, USA before the Florida transfer, and several colonial or African independence errors. The [v3 audit](TEMPORAL_AUDIT_V3.md) documents removal of the erroneous 1800 Peru/Río de la Plata pair and 1900 Ethiopia's omitted Harar.

The v4 exclusions add premature Hittite and later lingering Hittite labels, anachronistic Sui/Sasanian labels in 700, an early Iberian Umayyad outline, repeated 1650 Qing/Dutch colonial outlines in 1700, Qing in 1914, USSR in 1920, obsolete Russian civil-war authorities in 1930, and premature states in 1945. The 1930 UK polygon still includes the Irish Free State and is excluded. Source names and exclusion reasons are recorded without silently rewriting their geometry.

A targeted visual review also found that the 1783 Russian outline included Crimea and could not be used for 1750. Its eligibility now starts in 1783. The actual 1715 outline supplies earlier context without Crimea, and period names distinguish the tsardom from the imperial title adopted in 1721. See the [dated correction](MAP_CONTEXT_V4.md#russia-and-crimea-before-1783).

Some small or partial source outlines are explicitly labelled as core regions. In particular, the 1960 PRC source core omits a separately drawn Tibet polygon. That uncolored area is disclosed as a source-coverage gap, not a sovereignty assertion. Colonial outlines describe administration or claims, not uniform control over Indigenous societies.

## Validation and practical limits

Structural validation checks schema, IDs, source URLs, interval shape, snapshot membership, licenses and output hashes. The builders check positive spherical areas and finite paths in Equal Earth, Natural Earth I and equirectangular projections. These tests establish renderability, not historical truth.

The temporal regression suite checks continuous availability and concrete transition failures, including USSR after 1991, divided Germany after 1989, Qing after 1911, Ming after 1644, pre/post-1971 Pakistan, Czech/Slovak separation, and the contemporary Russia/Ukraine fallback. A point-in-polygon regression checks that interior Ireland is outside the UK context at 1923, 1930, 1938 and 1945 while Belfast and London remain inside.

The old contact sheets and v2/v3 JSON reports remain historical records. `map-snapshots.json`, `contemporary-world.json` and `MAP_CONTEXT_V4_VALIDATION.json` describe the current artifacts. The modern validation report now points to the current shards while retaining its original validation result.

## Reproduction

The current checked-in historical base shards are inputs to the context builder. Download each file listed in `contextSourceFiles` from its pinned URL into one directory. Keep the original raw files unchanged, then run:

```sh
node scripts/build-temporal-context.cjs /absolute/path/to/historical-basemaps-inputs
node scripts/build-contemporary-world.cjs /absolute/path/to/natural-earth-inputs
node scripts/validate.mjs
npm test
```

To rebuild the three later historical snapshots too, first run `build-modern-history.cjs` with the pinned 1994/2000/2010 and Natural Earth raw inputs, then run the temporal builder. It reattaches reviewed intervals and shards the output. The optional CShapes comparison requires a separately obtained research input and is not a runtime dependency.

The scripts require Node and the repository's pinned D3 bundle. They preserve source years and separate data licenses, regenerate output checksums, and keep each geographic data shard below 450 KB. Repeated execution is deterministic for unchanged inputs and editorial registry. Review a candidate's chronology and actual geography before expanding its interval; a newer filename is not evidence of correctness.

The 0.15 [early regional correction](EARLY_REGIONAL_MAP_REVIEW.md) adds 28 finite dated references and documents rejected misdated donor geometry. Earlier Chinese traditions do not acquire frontiers from narrative dates.

Political fills use the [neighbor-aware display palette](MAP_COLOR_NEIGHBORS.md). Nearby independent display groups receive different shades; explicit shared identities and neutral reference styling retain their stated meanings. Color is not a sovereignty or boundary assertion.
