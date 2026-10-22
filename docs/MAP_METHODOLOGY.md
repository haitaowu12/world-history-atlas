# Historical territorial layers — v2 research and provenance

Reviewed 22 October 2026. This is a selective educational map layer, not an exhaustive historical GIS or an annual reconstruction of world borders.

## Delivered coverage

The runtime collection contains **106 dated territory instances, 67 polity IDs, and 15 snapshots**, from **500 BCE to 1960 CE**. Three source datasets remain separate files with separate notices. Natural Earth supplies optional present-day reference outlines and major rivers.

| Snapshot | Selected territories |
|---|---:|
| 500 BCE | 3 |
| 323 BCE | 3 |
| 1 BCE | 4 |
| 200 CE | 4 |
| 600 | 4 |
| 800 | 5 |
| 1000 | 10 |
| 1200 | 7 |
| 1300 | 9 |
| 1400 | 8 |
| 1500 | 7 |
| 1600 | 6 |
| 1800 | 6 |
| 1900 | 12 |
| 1960 | 18 |

The exact list of features for each year is in `dist/data/map-snapshots.json`. The year `-1` means **1 BCE**, not astronomical year zero. No year zero occurs in the layer. Uncolored land means **not included in this selected layer**; it never means uninhabited, politically empty, or lacking history.

## Sources and distribution

### 1. Selected historical-basemaps features

- File: `dist/data/territories.geojson`, 102 features, approximately 988 KB.
- Repository: [André Ourednik and contributors, historical-basemaps](https://github.com/aourednik/historical-basemaps).
- Pinned commit: `da7a4b735ecef70aebdc9c73e409d8a2500d50f3`.
- License: GPL-3.0, preserved in `dist/data/territories.LICENSE`.
- Source file SHA256 values, sizes and years: `dist/data/map-snapshots.json` → `sourceFiles`.
- Every retained feature has its original name/authority fields and a pinned GitHub geometry link.

The upstream describes the collection as work in progress and intended for world or continental display. The explicit feature list in the delivered GeoJSON and snapshot metadata selects particular names and years; it does not copy the world dataset and remove only the known errors. Institutional sources check the polity's existence and broad location. **Those sources do not independently verify each boundary vertex.** Feature metadata distinguishes `review: chronology-and-broad-location` from `geometryReview: source-sketch-not-independently-reconstructed`.

We retain the selected geometry, round coordinates to four decimal places, remove exact adjacent duplicates where possible, and normalize spherical ring winding for D3. We did not interpolate frontiers, snap ancient borders to current countries, or invent replacement polygons.

### 2. Roman Empire in 200 CE — institutional replacement

- File: `dist/data/territories-awmc.geojson`, one multipolygon, approximately 237 KB.
- Source: [Ancient World Mapping Center, University of North Carolina at Chapel Hill](https://awmc.unc.edu/gis-data/).
- Repository: [AWMC/geodata](https://github.com/AWMC/geodata).
- Pinned commit: `7ecf8bccea2efe1e1e9df2daf6001942de73fb87`.
- Source file: `Cultural-Data/political_shading/roman_empire_ce_200_extent/roman_empire_ce_200_extent.geojson`.
- Original SHA256: `b1517aa96d43547925985069f8beefa761c361cad5986d35c7d607e86821527d`.
- License: **ODbL 1.0**, preserved in `dist/data/territories-awmc.LICENSE`.
- Attribution: **Ancient World Mapping Center; Barrington Atlas; OpenStreetMap contributors**.

The source is explicitly dated to 200 CE. Its 112 polygon components were grouped into one selectable Roman Empire feature; coordinates were rounded to four decimals. The source outline is not clipped against another historical polity or modern coastline. The official repository's current ODbL declaration is the basis for distribution; older mirrors with different licenses were not copied. Keep this file separate from the GPL dataset and preserve its attribution and downloadable adapted database. The source research/reference files remain available at their pinned URLs.

This replaces the unsuitable Rome 200 geometry in the global source, which reaches southern Mesopotamia in a way that does not distinguish temporary conquests. [Shepherd's historical atlas, Territorial Expansion of Rome](https://maps.lib.utexas.edu/maps/historical/shepherd_1911/shepherd-c-034-035.jpg), was visually inspected for broad geographic and chronological context. A 1911 atlas is a comparison source, not a modern claim of frontier certainty.

### 3. Selected Jiangshan schematics

- File: `dist/data/territories-jiangshan.geojson`, three features, approximately 38 KB.
- Source: [the user's Jiangshan Map fork](https://github.com/haitaowu12/jiangshan-map).
- Pinned commit: `fcd6484d06d3c581241fc24adbab288cf3a4a2ea`.
- Source file: `js/atlas_snapshots.js`; SHA256 `a0834b2e77a88b55e3327f51146af05d6d5392823f413eade542cd7306a1ed71`.
- Retained notices and provenance explanation: `dist/data/territories-jiangshan.LICENSE.md`, together with the full GPL text.

| Display year | Feature | Original phase | Phase interval |
|---|---|---|---|
| 1200 | Southern Song | `s_nansong_a` | 1141 ≤ year < 1206 |
| 1200 | Jurchen Jin | `s_nansong_a` | 1141 ≤ year < 1206 |
| 1600 | Ming dynasty | `s_ming_b` | 1449 ≤ year < 1616 |

These were decoded from the original lossless ring representation and selected without frontier redrawing. Each feature says **“Jiangshan schematic outline”**, includes its original phase interval and caption, and distinguishes a phase illustration from a newly reconstructed annual border. [Columbia University's Northern/Southern Song maps](https://afe.easia.columbia.edu/songdynasty-module/cities-new.html) support the broad Song–Jin division. [The Metropolitan Museum's Ming essay](https://www.metmuseum.org/essays/ming-dynasty-1368-1644) supports chronology and historical context.

The source README declares GPL-3.0, while its root LICENSE is MIT. Both published notices are retained. The source cites CHGIS, Hartwell, Tan Qixiang and historical-basemaps but does not identify a derivation source for each outline. **Per-outline derivation remains unresolved**; we do not assert that these particular shapes were copied from CHGIS, nor that every third-party reference is MIT. No CHGIS data was downloaded or redistributed. The [official CHGIS V6 page](https://chgis.fas.harvard.edu/data/chgis/v6/) expressly restricts redistribution, so its downloadable dataset was not used as a substitute.

The inspected `s_ming_a0` phase was **not retained for 1400**. Its caption says 1388–1407, but its outline reaches 141.26° E / 56.87° N and retains the source's later Yongle expansion envelope. A correct phase label does not establish a correct polygon. The 1600 schematic has a much more restricted northeast extent (125.79° E / 43.49° N). This omission is documented rather than silently filling the gap with a future shape.

### 4. Natural Earth reference layers

Files: `dist/assets/countries.geojson` (**177** modern reference features) and `dist/assets/rivers.geojson` (**13** major river features).

Source repository: [nvkelso/natural-earth-vector](https://github.com/nvkelso/natural-earth-vector), pinned commit `ca96624a56bd078437bca8184e78163e5039ad19`, files `geojson/ne_110m_admin_0_countries.geojson` and `geojson/ne_110m_rivers_lake_centerlines.geojson`. Source and output SHA256 values are in `dist/assets/PROVENANCE.json`.

Natural Earth states that its vector and raster data are [public domain](https://www.naturalearthdata.com/about/terms-of-use/). Properties were reduced to names and scale rank. One zero-area country component was removed and polygon geometry normalized for D3. Rivers were not historically reconstructed. **Modern country outlines should be an explicit optional reference toggle, off by default.** Today's river courses and coastlines are orientation aids, not evidence of an ancient shoreline or river channel.

## Selection review and excluded errors

The machine-readable exclusion log contains observed names, dates and reasons. Major examples include:

- The prior review's 1500 BCE David/Solomon kingdom and premature independent Zambia in 1960.
- Fatimids and Ghaznavids still present in 1200 after their dynasties ended; unified Mongol Empire and Delhi Sultanate named before their conventional 1206 foundations.
- Northern Song geometry repeated in 1200 instead of separating Southern Song from Jin; replaced with the separate Jiangshan schematic layer.
- Byzantine 1200 geometry retaining extensive eastern/central Anatolia and southern Italian territory after twelfth-century losses; omitted.
- Yuan's “Great Khanate” footprint still present in 1400 after the Ming foundation; no cosmetic relabeling as Ming.
- Inca preconquest footprint in 1600; Songhai after 1591 without an adequate reconstruction; oversized northeast Ming silhouettes in 1530/1600.
- A United States outline apparently including Florida in 1800, and an “Austrian Empire” label before 1804.
- Spain still assigned Cuba/Puerto Rico in 1900, a stale Kingdom of Hawaii, and Kingdom of Brazil after the 1889 republic.
- Several premature African sovereign authorities and other unmodeled control/dispute cases in 1960.

These are bounded findings. They are not an estimated error rate for the entire upstream collection. Retaining a feature is not an assertion that all its dependencies or frontier nuances have been verified.

## Integration requirements

- Fetch the three historical FeatureCollections separately; combine their features only in memory. Keep the source files and legal notices separately available.
- Choose the nearest **earlier or equal** snapshot; display its actual year next to the selected timeline year. Do not interpolate control, interpolate borders, or change a feature's year to match the slider.
- Before the first snapshot, show no historical territorial layer. If displaying an older snapshot far from the slider year, make the age explicit and require deliberate visibility rather than implying current control.
- Label these as **selected approximate territories**, with a visible source/uncertainty detail. Support feature selection to inspect source names, original phase interval where relevant, geometry link and contextual sources.
- Keep source evidence for narrative records separate from geometry evidence. A cited city or dynasty article cannot validate an entire surrounding polygon.
- Do not describe the result as “all world borders,” “fully verified boundaries,” “annual world history” or “complete coverage.” The record-based atlas provides many histories in places without a selected territorial polygon.

## Updating the data

All distributed files retain exact source commits, original source filenames, source-file checksums, selected source names, and output checksums. Use these immutable references when rechecking or replacing a feature. The runtime files contain only the selected geometry, while the full source datasets remain available from their original repositories.

To reconstruct a selection, fetch the pinned inputs, resolve each feature's `sourceNames` (or Jiangshan `sourcePhase.key`), group the selected polygons by polity and year, round historical-basemaps and AWMC coordinates to four decimals, and apply the documented D3 ring checks. Preserve original boundary vertices apart from the declared rounding and degenerate-component cleanup. Validate snapshot membership and output hashes before replacing the shipped files. The separate scholarly CShapes check is optional research evidence and contributes no distributed polygon coordinates.

Keep source files separate under their stated licenses. Review a candidate replacement's actual geometry and chronology; changing only a display name or phase caption is not sufficient.

## Context bibliography

Each feature carries the relevant source title, URL, publisher and evidence limit. The metadata's `sources` array is the full catalogue. Principal institutions include the Metropolitan Museum of Art (dynasty chronology and regional context), UNESCO World Heritage Centre (Meroe, Angkor and Chola context), Library of Congress (Ghana/Mali/Songhai chronology), Smithsonian National Museum of Asian Art (Kongo context), Columbia University (Song–Jin geography), University of Texas Libraries (historical atlas scans), UNC AWMC (dated Roman GIS), and ETH Zürich (modern comparative GIS).

These sources support different levels of evidence. They are not interchangeable, and a museum chronology page should never be presented as the origin of the imported polygon coordinates.
