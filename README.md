# World History Atlas · 寰宇时序

A bilingual, source-backed atlas for exploring histories that existed at the same time across the world. Inspired by [Jiangshan Map / 江山时序](https://github.com/haitaowu12/jiangshan-map), this is an independent implementation designed around concurrent regional histories.

The first collection contains **62 historical entries, nine regions and six guided reading journeys**, spanning selected periods from **13,000 BCE to 2026 CE**. It is a starting collection, not an encyclopedic account or a representative sample of all world history.

## Explore

- Move the timeline, enter a year, step between historical moments, or play the timeline.
- Switch between entries whose focus intervals include the selected year and entries across all time.
- Filter by region or theme, and search English or Chinese titles, summaries and place labels.
- Select a representative place on the Equal Earth map. Nearby markers group together and can be expanded.
- Read the narrative, date interpretation and linked institutional sources.
- Explore “Meanwhile, elsewhere” to find other entries covering the same year.
- Compare two stories, including their dates, sources and whether their selected periods overlap.
- Follow six guided reading sequences: the world around 1200; city-making; knowledge; exchange; land and water; and political participation.
- Save stories and notes in the browser; export/import a notebook JSON file.
- Share a URL containing year, language, filters and story selection. Personal notes are excluded.

English and Chinese are available throughout the main reading experience. Keyboard users can browse the story list, use `/` to search, close a story with Escape, and pan/zoom the focused map with arrow keys and `+`/`−`.

## Run locally

The application is buildless. It needs no npm packages, API keys, map tiles or remote database. All application scripts, historical records and map geometry are included in `dist/`.

From the repository root:

```sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory dist
```

Open **http://127.0.0.1:8080**. Serve the files over HTTP instead of opening `index.html` through a file URL; the app loads JavaScript modules and JSON.

The core atlas can run from this local server without an internet connection. Opening an external source link requires access to that source. There is no service worker or promise that a hosted copy remains available after its server goes offline.

## Check changes

Use Node.js compatible with `package.json` (the authoring checks ran with Node 24.19.0). No dependency installation is needed.

```sh
npm test
npm run validate
npm run check
```

- `npm test`: 17 core tests covering chronology, filters, URL state and notebook behavior.
- `npm run validate`: schema, all nine regions, unique IDs/source references, journey references, fixed-year matching, and vendored file checksums.
- `npm run check`: both checks.

A direct test command is also available:

```sh
node tests/core.test.mjs
```

Passing checks establish mechanics and structural integrity. They do not establish historical accuracy, source-to-claim fit, browser usability or publication status. See .

## How to read the map and dates

The land layer is **present-day physical geography** for orientation. Markers locate representative sites; they are not territories, cultural boundaries or claims of political control.

Dates are inclusive selected historical intervals. An interval may describe an archaeological phase, a period of construction, a political phase or a single-year event. Read each date note. A culture or people does not disappear when an entry's focus interval ends. There is no year zero: 1 BCE is followed by 1 CE.

The timeline uses an uneven scale to leave room for later centuries. An empty result means this collection has no matching entry, not that a region had no history. Guided journeys are reading sequences, not reconstructed travel routes or evidence of direct contact.

**Historical political territories are not included in this release.** Inspection found chronological problems in samples from a reusable boundary dataset. The decision and evidence are documented in [the historical-geodata review](docs/history-geodata-review.md). A future boundary layer needs its own dated sources, review and uncertainty handling.

The current collection favors documented heritage sites and selected political/scientific milestones. Daily life, women's histories, Indigenous perspectives, migration and several periods need deeper coverage.

## Project structure

| Path | Role |
| --- | --- |
| `dist/index.html`, `dist/styles.css` | Page structure and responsive presentation |
| `dist/app.mjs` | Map, reading panels, journeys, controls and notebook |
| `dist/core.mjs` | Pure chronology, filtering, URL and validation functions |
| `dist/data/history.json` | Bilingual historical records and per-entry sources |
| `dist/assets/` | Local D3, physical land geometry, licenses and provenance |
| `scripts/validate.mjs` | Dependency-free structural and asset checks |
| `tests/core.test.mjs` | Independent core tests |
| `docs/` | Evidence, data policy, upstream review and verification notes |

The `dist/` directory can be served by a static web host. This README does not assert that a deployment or external repository has been created.

## Notebook and privacy

Bookmarks and notes are stored under `world-history-atlas-notebook-v1` in browser local storage. They are device/browser specific. Export before clearing site data or moving to another browser.

Import accepts a notebook up to 1 MiB, validates its known entry IDs and note lengths, unions bookmarks, and replaces notes for matching entries. Other notes remain. Notes are treated as text, not HTML. The app uses no account, analytics or remote notebook database; a host may maintain its own access logs.

## Contribute and license

Read [CONTRIBUTING.md](CONTRIBUTING.md) and the [historical data policy](docs/DATA_POLICY.md) before adding material.

- Application code and project documentation: [MIT](LICENSE), copyright 2026 Tony Wu.
- Original historical narratives and original journey text: [CC BY 4.0 notice](docs/CONTENT_LICENSE.md).
- Natural Earth physical land: public domain, with its bundled terms.
- D3: ISC, with its bundled license.
- Linked source pages and other third-party materials retain their own rights.

Source commits, paths and hashes for the vendored assets are recorded in [PROVENANCE.json](dist/assets/PROVENANCE.json). Jiangshan Map provided interaction inspiration; no historical-basemaps polygons are distributed here.

