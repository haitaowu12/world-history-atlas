# World History Atlas · 寰宇时序

A bilingual, source-backed atlas for exploring histories that existed at the same time across the world. Inspired by [Jiangshan Map / 江山时序](https://github.com/haitaowu12/jiangshan-map), this world-scale implementation combines a time slider, selected historical territories, places, people, routes and guided study.

!

## What is in v2

| Collection | Included |
| --- | --- |
| Historical entries | **168** source-backed entries across nine regions |
| People | **24** profiles with **75** dated, located milestones |
| Combined entry collection | **192** historical entries and people |
| Territorial maps | **15** dated snapshots, **106** territory instances, **67** polity IDs |
| Routes and networks | **8** collections with **58** stops and **51** explicit connections |
| Reading paths | **6** original guided readings and **8** study guides with questions and activities |

Narrative coverage spans selected periods from **13,000 BCE to 2026 CE**. The territory snapshots cover **500 BCE to 1960 CE**. These are different collections with different dates and evidence. Coverage is selective; neither the entry counts nor the presence of a colored territory imply a complete account of a region's history.

The extension is self-contained. Its delivery layout is the **`world-history-atlas` branch, under `world/`**, alongside the original Jiangshan project. The original China application on `main` is not replaced. The same application directory can later become the root of a separate repository.

## Explore

**Follow time and compare places.** Move the slider, enter a BCE/CE year, choose an era, step between nearby events or play through time. Switch between entries active in the selected year and the full collection. Search in English or Chinese, filter by region, theme or entry type, and compare two entries. “Meanwhile, elsewhere” and parallel regional timelines help connect simultaneous histories.

**Read the world map.** Pan and zoom the Equal Earth map, expand nearby marker groups and select a place or colored territory. Historical territories have a dated snapshot label, a legend, a source panel and approximate-geometry notes. Map controls include major rivers, labels, optional modern country outlines and outlines from the previous available snapshot.

**Explore lives and connections.** Browse people and step through their dated milestones. Follow a documented journey or inspect a network's selected branches. Double-click a place on the map to find entries whose representative points lie within 400 km; proximity helps discovery without asserting continuous settlement or political succession.

**Study and remember.** Follow fourteen reading paths, including eight study guides with discussion questions and activities. Try the five-place location challenge, which gives distance feedback. Save entries and personal notes, then export or import a notebook.

**Share a view.** A URL can preserve the year, language, filters, entry, comparison, selected route stop or reading step. Notes stay in the browser and are excluded from shared links.

The main experience is available in English and Chinese. Keyboard controls include `/` for search, Escape to dismiss the active map selection or overlay, and arrow keys plus `+`/`−` to pan and zoom the focused map. Reading cards, map markers and territory shapes can receive keyboard focus.

## Run locally

The application is buildless. It needs no dependency installation, API keys, map tiles or remote database. Scripts, data and map geometry are included in `dist/`.

From the application root — `world/` in the delivery branch, or the root of a standalone copy:

```sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory dist
```

Open **http://127.0.0.1:8080**. Serve the files over HTTP rather than opening `index.html` through a file URL, because the app loads JavaScript modules and JSON.

The core atlas can run from this local server without internet access. Opening an external source requires access to that source. The app does not install a service worker, so a hosted copy is not guaranteed to remain available after its server goes offline.

The `dist/` directory can also be served by a static web host. No build service or GitHub Actions workflow is required. This document describes the application and its delivery layout; it does not certify that a deployment or a separate repository has been created.

## Check changes

Use **Node.js 22 or newer**, as declared in [package.json](package.json). No `npm install` step is needed.

```sh
npm test
npm run validate
npm run check
```

| Command | Purpose |
| --- | --- |
| `npm test` | Run the core, atlas-model and learning-data regression tests |
| `npm run validate` | Check record structure, references, dates, route connections, snapshot membership, licenses and vendored-file checksums |
| `npm run check` | Run the validator and test suite |

These checks verify structure and application mechanics. Historical source fit, map interpretation, translation quality and browser behavior also require review. The content research record is in [HISTORY_RESEARCH.md](docs/HISTORY_RESEARCH.md) and [early Americas/Pacific supplement](docs/EARLY_AMERICAS_PACIFIC_RESEARCH.md). The commands above are instructions, not a claim that a particular checkout or deployment has passed acceptance. See  and the [map methodology](docs/MAP_METHODOLOGY.md).

## Read the map and dates correctly

Narrative dates are inclusive **focus intervals**. An interval can describe an archaeological phase, a reign, a period of construction, a political process or a single-year event. It need not be a complete lifespan or the entire history of a culture. Read each date note. There is no year zero: **1 BCE is followed by 1 CE**. The slider uses an uneven scale to leave room for later centuries.

Points locate representative sites; they do not define a culture's extent or a polity's borders. The base land, rivers and optional country outlines are present-day geographic references at small scale. They do not reconstruct ancient coastlines, waterways or modern sovereignty at an earlier date.

The historical layer uses the **latest available snapshot at or before the selected year**. Its actual map year and the age of a held snapshot remain visible. For example, a story viewed in a year between two snapshots can be accompanied by an older territorial map. The geometry is not interpolated, and the app never pulls a future snapshot backward. Before 500 BCE there is no reviewed territorial snapshot; after 1960 the 1960 snapshot remains explicitly dated.

The 106 territory instances come from three separately attributed files: selected Historical Basemaps features, an Ancient World Mapping Center outline for Rome in 200 CE, and three Jiangshan schematic outlines. Review supports the included polities' chronology and broad locations; it does **not** independently validate every boundary vertex. Several source shapes with known chronological or geographic problems were excluded. The exact years, sources, exclusions and limits are in [MAP_METHODOLOGY.md](docs/MAP_METHODOLOGY.md).

Uncolored land and an empty search result mean this collection has no depiction or matching entry. They do not mean that nobody lived there or that no history occurred. A reading path is an editorial sequence. A route line is a schematic connection supported by that route's evidence, not a surveyed path; network nodes need not have been equally active at the same time.

## Data and project structure

| Path | Role |
| --- | --- |
| `dist/index.html`, `dist/styles.css` | Page structure and responsive presentation |
| `dist/app.mjs` | Map, panels, people, routes, readings, challenge and notebook |
| `dist/core.mjs` | Civil-year chronology, filters, URL state and notebook validation |
| `dist/atlas-model.mjs` | Snapshot selection, timelines, location search helpers and map-state validation |
| `dist/i18n.mjs`, `dist/journeys.mjs` | Interface translations and six original reading paths |
| `dist/data/history.json` | Historical entries and per-entry sources |
| `dist/data/people.json` | People, focus intervals and located milestones |
| `dist/data/routes.json` | Journey/network metadata, stops, explicit legs and sources |
| `dist/data/courses.json` | Eight study guides linked to entries and routes |
| `dist/data/territories*.geojson` | Three source-specific historical geometry files |
| `dist/data/map-snapshots.json` | Dated membership, source commits, checksums, exclusions and layer notices |
| `dist/assets/` | Local D3 and Natural Earth references, with licenses and provenance |
| `scripts/validate.mjs`, `tests/` | Structural checks and regression tests |
| `docs/` | Data policy, current map methodology, editorial and verification records |

Entries use stable IDs, English/Chinese text, an inclusive focus interval, a representative location, region/theme metadata and a source list. People add milestones. Routes distinguish a journey from a network and list explicit connections. Study guides reference those records rather than duplicating their evidence. Geometry has its own snapshot dates, feature IDs, sources and licenses; a narrative citation does not validate a nearby polygon. See [DATA_POLICY.md](docs/DATA_POLICY.md).

### Shareable URLs

The hash records state without a server:

```text
#year=1200&lang=en&mode=year&entry=angkor
#year=1325&lang=en&mode=year&route=route-ibn-battuta-hajj&stop=0
#year=1200&lang=zh&mode=year&reading=world-1200&step=0
```

Supported fields include `year`, `lang`, `mode`, `region`, `theme`, `q`, `entry`, `compare`, `kind`, `route`, `stop`, `reading` and `step`. Stops and reading steps are zero-based. A fixed-year reading can set its own year. Invalid IDs or values are normalized or ignored. Map camera position, layer preferences, bookmarks and notes are not encoded in the URL.

When no hash is present, query parameters can also open a place or person, for example `?year=1200&lang=en&place=Angkor`. These names resolve against this collection; they are not a worldwide geocoding service.

After initialization, `window.atlasAPI` exposes version `0.2.0`:

```js
atlasAPI.resolvePlace('Angkor', 1200);
atlasAPI.inspect({ year: 1200, place: 'Angkor' });
atlasAPI.locate({ year: 1325, person: 'person-ibn-battuta' });
```

| Method | Behavior |
| --- | --- |
| `resolvePlace(text, year?)` | Return matching entry IDs, bilingual titles, focus dates, locations and kinds; active matches rank first |
| `inspect({year?, place?})` | Return the normalized year, available territory-snapshot year, and matching entries with sources and active status |
| `locate({year?, place?, person?})` | Select an entry, move the view and return its ID, resulting year and URL, or an `ok: false` result |

The first two methods do not change the view. `locate` does: selecting an entry can move the year into its focus interval, and selecting a person can move to a nearby milestone. Use its returned year as the resulting state. Matching searches curated IDs, titles, personal names and place labels; it does not infer historical control from point-in-polygon queries.

## Notebook and privacy

Bookmarks and notes use `world-history-atlas-notebook-v1` in browser local storage. Layer preferences use `world-history-atlas-layers-v2`. Both are browser/site specific. Export the notebook before clearing site data or moving to another browser.

Notebook import accepts a JSON file up to 1 MiB, validates known entry IDs and note lengths, unions bookmarks, and replaces notes for matching entries. Other notes remain. Notes are treated as text, not HTML. The app has no account, analytics or remote notebook database; a host may maintain its own access logs.

## Contribute and licenses

Read [CONTRIBUTING.md](CONTRIBUTING.md), [DATA_POLICY.md](docs/DATA_POLICY.md) and .

The package contains materials with **separate licenses**:

| Material | Notice |
| --- | --- |
| Original application code and project documentation | [MIT](LICENSE), © 2026 Tony Wu |
| Original narrative, milestone, route and teaching text | [CC BY 4.0 content notice](docs/CONTENT_LICENSE.md) |
| Selected Historical Basemaps geometry | [GPL-3.0](dist/data/territories.LICENSE) |
| AWMC Roman Empire 200 CE geometry | [ODbL 1.0](dist/data/territories-awmc.LICENSE); Ancient World Mapping Center, Barrington Atlas and OpenStreetMap contributors |
| Three Jiangshan schematic outlines | [Preserved upstream notices](dist/data/territories-jiangshan.LICENSE.md): README GPL-3.0 and root MIT; unresolved per-outline derivation is documented |
| Natural Earth land, countries and rivers | [Public domain terms](dist/assets/land.LICENSE.md) |
| D3 | [ISC](dist/assets/d3.LICENSE) |

The root MIT license does not relicense imported geometry or linked sources. Geometry remains in separate files with its attribution and notices. Asset commits and hashes are recorded in [PROVENANCE.json](dist/assets/PROVENANCE.json) and [map-snapshots.json](dist/data/map-snapshots.json).
