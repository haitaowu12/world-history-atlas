# World History Atlas · 寰宇时序

A bilingual, source-backed atlas for exploring histories that existed at the same time across the world. Inspired by [Jiangshan Map / 江山时序](https://github.com/haitaowu12/jiangshan-map), this world-scale implementation combines a time slider, selected historical territories, places, people, routes and guided study.

## Source and research handoff

Use , the linked research ledgers and  for current continuation. Earlier release and verification records remain historical checkpoints.

## Current map update: worldwide subdivisions (0.11.1)

States and provinces now appear automatically as you zoom, with an always-visible **Regions** button. The modern reference contains **4,596 units in 251 source country/area groups**, including all 50 US states/DC and Canada's 13 provinces/territories. It extends beyond North America, retains source-date/sovereignty limits and loads country shards on demand. Direct regional views use `#year=1867&lang=en&mode=all&regions=CAN` or `regions=USA`; the country code identifies a modern reference view, not historical jurisdiction.

## Current narrative release: US/Canada lives and regional geography (V12 / 0.11.0)

V12 adds **26 bilingual entries, 12 biographies, 56 life milestones and 36 distinct narrative-source URLs**. North America now contains **106 entries**. The shared atlas has **1,863 entries, 170 narrative biographies, 534 life milestones and 271 People identities**. Three regional paths gain entries and fifteen source-comparison questions; all previous reading paths, stops and questions survive.

The optional modern geographic browser covers **50 states, DC and Canada's 13 provinces/territories**, with search, clickable outlines, bilingual labels and links to regional histories. Its **2022 Natural Earth source** is clearly separated from historical borders. Source-backed named-place associations retain coastal records omitted by generalized outlines, without moving their points. The layer loads on first use and requires no external service. [Method and limits](docs/V12_US_CANADA_GEOGRAPHY.md) explain the source pin, rights, transformations, 22 named-place associations and remaining coverage gaps.

See lives, contexts and research ledgers. Counts describe a selected collection, not complete or even regional representation.

## Historical local V11: connected lives and institutions (0.10.0)

V11 adds **28 bilingual entries: 14 developed biographies and 14 connected histories**, with **60 dated life milestones**. The selection deepens publishing, education, manuscript learning, civic participation and cultural transmission in all nine editorial regions outside the China collection. It connects people with the institutions and communities around them rather than treating their lives as isolated lists of achievements.

The shared collection now contains **1,837 entries, 158 narrative biographies and 478 life milestones**. The People directory contains **259 identities**, including the preserved source profiles. **12 of the 32 regional reading paths** gain records, and **15 bilingual source-comparison questions** connect the new biography/context pairs. Existing reading-path IDs and stops survive; there are still 55 reading paths overall. These counts describe a selected addition and do not establish regional parity or historical completeness.

The new records cite **42 distinct inspected source URLs**, with claim/date mappings and limitations in four . A separate source-only follow-up adds the inspected OCR text of the 1919 Samoa commission report to the current Samoa entry, preserving its original V10 narrative, dates and location and recording the earlier access limit. Colonial framing, mortality estimates and the OCR review boundary remain explicit.

V9 and V10 regional inputs, manifests and reading paths remain unchanged. The current shared manifest is `content-expansion-v11.json`; original and reviewed source scopes remain available in the atlas data export. No new territorial shapes or route legs were added.  list the new people and the remaining gaps.

## Historical V10 release: lives and community histories (0.9.0)

V10 adds **96 bilingual entries**, including **39 developed biographies with 159 dated life milestones**, across Africa, West and Central Asia, Europe, South Asia, East Asia outside China, Southeast Asia, the Americas and Oceania. The new records cite **168 distinct source URLs**. Lives are connected to histories of households, education, work, language, migration, political participation and cultural production. The  list the regional additions, all new biographies and remaining research gaps.

At V10, the shared collection contained **1,809 entries, 144 biographies and 418 life milestones**. The People directory contains **245 identities**, combining biographies and inherited profiles only where explicit identity links support the merge. **26 expanded regional paths within the retained 32** gain V10 entries; all 32 keep their earlier reading stops. Together with **16 study guides and 7 guided readings**, the atlas offers **55 reading paths**. Inventory counts describe the selected material. Regional depth remains uneven, and this release does not establish parity with the China collection or exhaustive world coverage.

People pages now expose curated related-reading links alongside textual mentions. Unaccented search aliases help readers find names such as Āpirana Ngata, José Martí and Émilie du Châtelet while preserving their displayed spelling. New detail panels show bilingual evidence-scope notes; source records distinguish inspected text, catalogues, abstracts and limited indexed access. Updated application and module URLs load the V10 code. The historical V10 manifest is [`content-expansion-v10.json`](dist/data/content-expansion-v10.json); final acceptance and delivery evidence belongs in .

V10 adds no polity records, mapped routes or territorial geometry. Existing China imports, review overlays, maps, waterways and navigation remain available. The timeline continues to reserve its bars for political overviews; biographies and social histories remain accessible through shared search, map markers, People and reading paths.

## Historical V9 release: connected regional history (0.8.0)

At the V9 checkpoint, all three editorial releases from the [expansion roadmap](docs/CONTENT_EXPANSION_PLAN.md) had selected batches: **344 added bilingual entries**, including **81 biographies** and **70 political overviews**, plus **32 regional reading paths**. The shared collection then contained **1,713 entries** and **105 biographies**. These are historical V9 counts; the V10 inventory appears above. The  preserves the regional and workstream scope.

V9 added **187 inherited river paths, 62 lake edges and 41 water labels** alongside **16 dated schematic corridors** on local zoom. Source display windows remain distinct from independently established engineering dates. Lake edges are rendered as lines to avoid globe-complement fills. V9 also resolved a held Galle/Melaka conflation through two separately sourced records while retaining the original held row in the immutable audit. Its six targeted event reviews and 24 chronicle annotations remain limited corrections, not complete corroboration of the inherited collection. See  and [cross-region review](docs/V9_CROSS_REGION_REVIEW.md).

## Historical V8 patch: geometry and display colours (0.7.1)

## Historical V7 release: map depth and political timelines

V7 added dated map depth and separated political timeline overviews from other entries:

- The shared China map gained **166 source stage selections across 18 periods**, including **377 stored political shapes**, with historical place labels and **3,211 optional administrative shapes** on local zoom. The inherited source stages remain explicitly schematic and unverified as annual borders. The modern source stage is empty and uses the shared world layer.
- **CShapes 2.0** supplies **710 exact-date country periods** for annual year-end views **1886–2019**. These are source-coded de jure states and dependencies, not wartime fronts. Later years retain the dated Natural Earth reference. CShapes geometry is **CC BY-NC-SA 4.0**, separately from the code and narrative licenses.
- The main timeline began defaulting to **major states and dynasties**. Events, places and biographies remain in the shared atlas. Controls select region, time window and key/all state overviews. Dense regions have explicit expansion.
- **52 new bilingual polity overviews** brought the V7 collection to **1,369 entries**. This included 11 Chinese dynastic gaps, 37 regional political histories and modern continuity entries, plus four further modern political focus periods. Relationships connect the additions to inherited events without making source display windows into dynasty lifespans.
- Nearby turning points are balanced across regions rather than selected only from the densest import. Their own dates remain visible.

Earlier global map coverage remains selective. The later V9 release restored inherited water paths and dated corridor schematics; some original transport interactions remain outside the shared app. Source-specific schematics and chronology uncertainties remain visible. Test counts do not certify historical claims.

## Historical V6 release: shared discovery and navigation

V6 brought the existing material into **one Atlas, Timeline, Journeys, People and Places experience**. Chinese events already shared the map and timeline; V6 integrated their people, historical names and references into shared discovery and navigation. Source origin remains evidence metadata. V6 changed integration and navigation without adding historical entries. The counts in this section describe that historical checkpoint.

The V6 People directory contained **126 identified people**: 24 researched biographies and 104 source profiles, with the two confirmed Xuanzang and Zheng He overlaps combined for discovery. Their source IDs, aliases, biography focus periods and source profile spans remain distinct. The V6 Places directory contained **1,384 representative point/name groups** from the whole atlas and its historical-name references. These groups are not a verified count of distinct settlements.

Related reading works in both directions: the Northern Song essay, for example, exposes its 74 linked source-derived events. Shared search finds people, places, periods, calendars and connections; old source-collection URL filters are normalized away. Evidence notes still distinguish inherited text, targeted corrections, schematic connections and independently cited essays.

| Material | Included |
| --- | --- |
| Combined selectable entry corpus | **1,317** entries: **318** historical essays, **24** biographies and **975** source-derived events |
| Shared People directory | **126** identified people; the underlying **104** profile indexes retain their source identity |
| Shared Places directory | **1,384** representative point/name groups; includes **185** gazetteer records, **87** city notes and **20** passes |
| Historical place-name context | **1,387** period-place rows; a place can recur across source windows |
| Period guides | **86** references: **8** editorial windows, **60** polity article focus periods and **18** source display windows |
| Calendars and reign names | **342** ruler/reign-name change points; coverage at this checkpoint was Chinese chronology |
| Roads and waterways reference | **31** connections: **15** mapped journeys/networks/chronicles and **16** description-only corridors |
| Mapped journeys, networks and chronicles | **126** stops and **112** explicit connections; source sequences retain their evidence limitations |
| Reading paths | **23** paths: **7** guided readings and **16** study guides |
| Territorial maps | **43** source checkpoints, **516** territory instances, **180** polity/cultural-region identities |
| Contemporary map | **242** countries and territories, **25** hatched claim areas and **29** claim/dispute lines |
| Evidence links | **715** distinct cited pages across narrative and map collections; this is not a count of independently verified claims |

Narrative coverage spans selected periods from **13,000 BCE to 2026 CE**. Historical source checkpoints span **2000 BCE to 2010 CE**, with feature-specific reviewed display periods. The contemporary reference is reviewed in 2026 and uses explicitly dated source geometry. Existing shading, label selection, year-transition safeguards, list pagination and cached search remain in place.

The V5 content expansion and its source accounting were retained: **978** original event rows produced **975** mapped events, two exact duplicate merges and one held location mismatch. At the V6 checkpoint, two event reviews and 24 chronicle annotations formed a separate correction layer over the frozen source; later V9 work expanded the targeted event reviews. V5's 78 new essays and four study guides became accessible through the shared interface. V6 did not claim new research or equal depth across regions.

At the V6 checkpoint the GitHub mirror still held V2. That source-status note is historical. The canonical branch and current verification record are linked above; the original China application outside `world/` remains a separate upstream project.

## Explore

**Follow time and compare places.** Move the slider, enter a BCE/CE year, choose an era, step between nearby events or play through time. Switch between entries active in the selected year and the full collection. Search in English or Chinese, filter by region, theme or entry type, and compare two entries. Source origin does not exclude entries from these views. “Meanwhile, elsewhere” and parallel regional timelines help connect simultaneous histories.

**Find people and places across the atlas.** Open People or Places, search in English or Chinese, choose a region and switch between regional, chronological and alphabetical browsing. A person page combines existing biographies, source indexes, journeys, curated related reading and textual mentions. Curated links can connect a life to its social or institutional context even when a related entry does not repeat the person's name. Added unaccented aliases support searches for names with diacritics. A place page brings together records at its representative point, nearby histories from every source, and available historical names. Proximity and shared names do not establish one continuous settlement.

**Read periods, calendars and connections.** Timeline opens shared period guides and the calendar reference. A source display window can reveal histories from all regions in the same interval; it is not relabelled as a dynasty lifespan. Journeys includes the shared Roads & waterways view, which distinguishes mapped routes and networks from description-only corridors. Source chapter dates, later literary works and disputed chronology remain explicit.

**Follow maps through time.** Move the year slider to see the eligible states and societies at that moment. **About these outlines** lists the displayed shapes, their source dates and reviewed display periods. **Map dates** opens the source checkpoints directly. The contemporary country directory is searchable in English and Chinese and explicitly opens its 2026 reference; selecting a country directly on the map preserves the current year.

**Read the world map.** Pan and zoom the Equal Earth map, expand nearby marker groups and select a place or colored territory. Historical territories have a source-date label, a legend, an evidence panel and approximate-geometry notes. Cultural regions have a distinct translucent, dashed-border style. Map controls include major rivers, labels, optional modern country outlines and outlines from the previous available snapshot.

**Explore lives and connections.** Browse people and step through their dated milestones. Follow a documented journey or inspect a network's selected branches. Double-click a place on the map to find entries whose representative points lie within 400 km; proximity helps discovery without asserting continuous settlement or political succession.

**Study and remember.** Follow **55 reading paths: 32 regional expansion paths, 16 study guides and 7 guided readings**. The regional paths include V9, V10 and V11 entries; study guides retain their discussion questions and activities. Try the five-place location challenge, which gives distance feedback. Save entries and personal notes, then export or import a notebook. Sources & method also provides a combined atlas JSON export containing all entries, routes and reference inventories with their source metadata; this export is separate from the private notebook.

**Share a view.** A URL can preserve the year, language, filters, entry, person or place directory page, comparison, selected route stop, reading step or contemporary country. Notes stay in the browser and are excluded from shared links.

The main experience is available in English and Chinese. Keyboard controls include `/` for search, Escape to dismiss the active map selection or overlay, and arrow keys plus `+`/`−` to pan and zoom the focused map. Reading cards, map markers and territory shapes can receive keyboard focus.

## Run locally

The application is buildless. It needs no dependency installation, API keys, map tiles or remote database. Scripts, data and map geometry are included in `dist/`.

Run from the application directory: the repository's `world/` folder, which contains `package.json`, or the corresponding folder in a release archive:

```sh
npm run serve
```

Open **http://127.0.0.1:8080** in a browser. The local server binds only to loopback and uses a larger request queue for concurrent atlas data loads. Use `npm run serve -- --port 8081` if the default port is busy. Serve the files over HTTP rather than opening `index.html` through a file URL, because the app loads JavaScript modules and JSON.

The core atlas can run from this local server without internet access. Opening an external source requires access to that source. The app does not install a service worker, so a hosted copy is not guaranteed to remain available after its server goes offline.

The `dist/` directory can also be served by a static web host. No build service or GitHub Actions workflow is required. This document describes the application and its delivery layout; it does not certify that a deployment or a separate repository has been created.

## Check changes

Use **Node.js 22 or newer**, as declared in [package.json](package.json). No `npm install` step is needed.

After editing a V12 regional content file, regenerate the cumulative manifest and reading paths before running the checks. V9, V10 and V11 inputs remain frozen. Run these commands from the same application directory:

```sh
npm run build:content
npm test
npm run validate
npm run check
```

| Command | Purpose |
| --- | --- |
| `npm run build:content` | Regenerate the V12 manifest, 32 regional paths and geographic history index while checking the frozen V9–V11 expansion files |
| `npm test` | Run core, discovery/integration, shared-reference, import/review, learning-data, temporal-map and geography regressions |
| `npm run validate` | Check record structure, references, dates, route connections, snapshot membership, licenses and vendored-file checksums |
| `npm run check` | Run the validator and test suite |

## Read the map and dates correctly

Narrative dates are inclusive **focus intervals**. An interval can describe an archaeological phase, a reign, a period of construction, a political process or a single-year event. It need not be a complete lifespan or the entire history of a culture. Read each date note. There is no year zero: **1 BCE is followed by 1 CE**. The slider uses an uneven scale to leave room for later centuries.

Points locate representative sites; they do not define a culture's extent or a polity's borders. The base land, rivers and optional country outlines are present-day geographic references at small scale. They do not reconstruct ancient coastlines, waterways or modern sovereignty at an earlier date.

The historical layer chooses **one eligible outline per polity**. An exact source year is always explicit. Outside that year, a feature needs a reviewed display interval; a later source can be shown in an earlier year only when that direction was separately reviewed. A polity’s entire lifespan is not an automatic permission to reuse its shape. The most recent eligible prior source takes priority. Mixed source years are labeled as approximate historical context, even at a checkpoint. The USSR ends by 1991; East and West Germany end by 1989; Ming ends by 1644 and Qing by 1911. No border morphing or annual reconstruction is claimed. Where no reviewed outline is eligible, the map keeps physical geography and the dated stories.

Contemporary context is reviewed for 2011–2026 at annual resolution, with feature-specific periods and dated country names. Russia and Ukraine use 2010 source geometry for 2011–2013 and the explicitly dated Natural Earth reference from 2014. This preserves the earlier geographic source instead of backdating a later Crimea convention. Country selection and share links preserve the selected year. The 2026 directory remains a deliberately current reference.

Historical geometry is stored in source-specific, checksum-verified chunks. It combines curated Historical Basemaps outlines, an Ancient World Mapping Center outline for Rome in 200 CE, and three attributed Jiangshan schematics. Review supports chronology and broad location; it does **not** independently validate every boundary vertex. Known wrong-period or geographically faulty shapes remain excluded. The [context review](docs/MAP_CONTEXT_V4.md), [temporal regressions](docs/V4_TEMPORAL_REVIEW.md) and [map methodology](docs/MAP_METHODOLOGY.md) document the selection and limits.

The 2026 contemporary reference has 242 mapped countries and territories, including dependencies and disputed areas. This is **not a sovereign-state count**. Natural Earth's 2022 geometry vintage is shown separately from the 2026 review date. Selected disputed areas use neutral hatching and dashed lines, with source-specific notes. Obsolete breakaway/control outlines are excluded. Read [contemporary map methodology](docs/CONTEMPORARY_MAP_METHODOLOGY.md) for provenance, naming, dispute conventions and limits.

Uncolored land and an empty search result mean this collection has no depiction or matching entry. They do not mean that nobody lived there or that no history occurred. A reading path is an editorial sequence. A route line is a schematic connection supported by that route's evidence, not a surveyed path; network nodes need not have been equally active at the same time.

## Data and project structure

| Path | Role |
| --- | --- |
| `dist/index.html`, `dist/styles.css` | Page structure and responsive presentation |
| `dist/app.mjs` | Map, panels, people, routes, readings, challenge and notebook |
| `dist/core.mjs` | Civil-year chronology, filters, URL state and notebook validation |
| `dist/atlas-model.mjs` | Snapshot selection, timelines, location search helpers and map-state validation |
| `dist/i18n.mjs`, `dist/journeys.mjs` | Interface translations and seven guided reading paths |
| `dist/data/history.json` | Original historical essays and per-entry sources |
| `dist/content-expansion.mjs` | Current manifest selection, biography/history partitioning, workstream coverage and expansion audits |
| `dist/data/content-expansion-v12.json` | Current cumulative manifest, hashes and inventory; references preserved V9–V11 files and four V12 inputs |
| `dist/data/expansion-*-v12.json` | Current US/Canada biographies and connected histories; earlier edition files remain frozen |
| `dist/data/evidence-followups-v11.json` | Source-only review additions and bilingual current scope; earlier scope preserved in exported review history |
| `dist/data/expansion-courses-v12.json` | Current 32 regional reading paths, retaining prior stops/questions |
| `dist/data/content-expansion-v10.json` | Frozen historical V10 manifest |
| `dist/data/expansion-*-v10.json` | Historical V10 biographies and connected histories; generated reading paths are stored separately in `expansion-courses-v10.json` |
| `dist/data/expansion-courses-v10.json` | Historical V10 regional reading paths, retaining their existing IDs and V9 entries |
| `dist/data/content-expansion-v9.json`, `dist/data/expansion-*-v9.json` | Frozen V9 expansion baseline and historical manifest |
| `dist/regional-explorer.mjs`, `regional-reference.mjs` | Current worldwide administrative reference browser, automatic zoom display, labels and geographic history links |
| `dist/data/regional-reference.json`, `regional-*.geojson` | Current source-dated country/area directory and lazy geographic shards |
| `dist/us-canada-explorer.mjs`, `us-canada-reference.mjs` | Historical V12 US/Canada-only reference integration |
| `dist/data/us-canada-reference*`, `us-canada-area-links-v12.json`, `us-canada-history-index-v12.json` | Pinned modern outlines, separate license, named-place evidence and generated index |
| `dist/discovery.mjs` | Shared People/Places indexes, exact identity links, alias search and regional browsing |
| `dist/history-reference.mjs` | Shared period, calendar, road/waterway and source-provenance views |
| `dist/china-library.mjs`, `dist/china-review.mjs` | Source adaptation, location helpers and immutable review overlays; source filenames do not define separate navigation |
| `dist/data/china-events-*.json`, `china-import-manifest.json` | Pinned imported events, full source accounting, checksums, merges and held record |
| `dist/data/china-library*.json` | People, places, periods, chronicles, era names and corridor references |
| `dist/data/china-reviews.json` | Targeted independently sourced corrections and internal chronology annotations |
| `dist/data/people.json` | Original biographies; expansion biographies live in the manifest-listed regional content files |
| `dist/data/routes.json` | Journey/network metadata, stops, explicit legs and sources |
| `dist/data/courses.json` | Sixteen study guides linked to entries and routes |
| `dist/data/territories*.geojson` | Source-specific historical geometry chunks |
| `dist/data/map-snapshots.json` | Dated membership, source commits, checksums, exclusions and layer notices |
| `dist/data/contemporary-world*`, `dist/data/disputed-*` | Contemporary units, selected claim areas/lines, source vintage and notices |
| `dist/map-language.mjs` | Bilingual map-date and contemporary-reference interface text |
| `dist/assets/` | Local D3 and Natural Earth references, with licenses and provenance |
| `scripts/validate.mjs`, `tests/` | Structural checks and regression tests |
| `scripts/build-content-expansion-v12.mjs` | Current manifest, regional-path and geographic-index generator |
| `scripts/serve.py` | Loopback preview server with a larger connection queue |
| `docs/` | Data policy, current map methodology, editorial and verification records |

Entries use stable IDs, English/Chinese text, an inclusive focus interval, a representative location, region/theme metadata and a source list. People add milestones. Routes distinguish a journey from a network and list explicit connections. Study guides reference those records rather than duplicating their evidence. Geometry has its own snapshot dates, feature IDs, sources and licenses; a narrative citation does not validate a nearby polygon. See [DATA_POLICY.md](docs/DATA_POLICY.md).

### Shareable URLs

The hash records state without a server:

```text
#year=1200&lang=en&mode=year&entry=angkor
#year=1325&lang=en&mode=year&route=route-ibn-battuta-hajj&stop=0
#year=1200&lang=zh&mode=year&reading=world-1200&step=0
#year=2026&lang=en&mode=year&country=RUS
#year=1080&lang=en&mode=year&person=china-person-sushi
#year=1200&lang=zh&mode=year&place=location-china-landmark-027
```

Supported fields include `year`, `lang`, `mode`, `region`, `theme`, `q`, `entry`, `person`, `place`, `compare`, `kind`, `route`, `stop`, `reading`, `step` and `country`. Legacy `collection=jiangshan` or `collection=atlas` values are ignored and omitted when the URL is rewritten, so older shares cannot silently restrict the source corpus. Stops and reading steps are zero-based. A fixed-year reading can set its own year. Invalid IDs or values are normalized or ignored. Map camera position, layer preferences, bookmarks and notes are not encoded in the URL.

When no hash is present, query parameters can also open a place or person, for example `?year=1200&lang=en&place=Angkor`. These names and historical aliases resolve through the shared directory and entry indexes; they are not a worldwide geocoding service.

After initialization, `window.atlasAPI` exposes the manifest version, currently `0.11.0`:

```js
atlasAPI.contentCoverage();
atlasAPI.collections();
atlasAPI.search('Su Shi', { kind: 'person' });
atlasAPI.resolveHistoricalPlace('成周');
atlasAPI.resolvePlace('Angkor', 1200);
atlasAPI.inspect({ year: 1200, place: 'Angkor' });
atlasAPI.locate({ year: 1325, person: 'person-ibn-battuta' });
```

| Method | Behavior |
| --- | --- |
| `contentCoverage()` | Report the current shared entry and biography counts, cumulative expansion inventory and workstream coverage; counts do not establish historical completeness |
| `collections()` | Report source-accounting counts and the frozen reference commit; these are provenance counts, not navigation filters |
| `search(text, options?)` | Search shared people, places, periods, calendars and connections; supports region, semantic kind and year filters |
| `resolveHistoricalPlace(text)` | Search worldwide representative-place groups and historical aliases; returns IDs, names, aliases, locations and regions |
| `resolvePlace(text, year?)` | Return matching entry IDs, bilingual titles, focus dates, locations and kinds; active matches rank first |
| `inspect({year?, place?})` | Return the normalized year, exact source checkpoint or null, coverage mode, actual outline source years, mapped-feature count, contemporary metadata when applicable, and matching entries with sources and active status |
| `locate({year?, place?, person?})` | Open a shared person/place page when resolved, otherwise select a matching entry; returns its ID, resulting year and URL, or `ok: false` |

The inspection and search methods do not change the view. `locate` does: opening a directory page preserves the requested year, while selecting an entry can move the year into its focus interval or a nearby biographical milestone. Use its returned year as the resulting state. Matching searches entry IDs, titles, personal names, place labels and aliases; it does not infer historical control from point-in-polygon queries.

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
| Imported Jiangshan events, directories, chronicles and inherited quotations/translations | [Preserved content notices](dist/data/china-upstream.LICENSE.md); excluded from the original CC BY narrative grant |
| Three Jiangshan schematic outlines | [Preserved upstream notices](dist/data/territories-jiangshan.LICENSE.md): README GPL-3.0 and root MIT; unresolved per-outline derivation is documented |
| Contemporary country and dispute geometry | [Public-domain source notice](dist/data/contemporary-world.LICENSE.md) |
| Natural Earth US/Canada state/province reference | [Separate public-domain source notice](dist/data/us-canada-reference.LICENSE.md) |
| Natural Earth land, countries and rivers | [Public domain terms](dist/assets/land.LICENSE.md) |
| D3 | [ISC](dist/assets/d3.LICENSE) |

The root MIT license does not relicense imported geometry or linked sources. Geometry remains in separate files with its attribution and notices. Asset commits and hashes are recorded in [PROVENANCE.json](dist/assets/PROVENANCE.json) and [map-snapshots.json](dist/data/map-snapshots.json).
