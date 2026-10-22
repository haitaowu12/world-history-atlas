# Upstream inspection — Jiangshan Map

> **Historical status — v1 review.** This document records the initial upstream inspection. V2 later inspected the snapshot file and reused three explicitly attributed Jiangshan schematic outlines in a separate data file. Current selection, provenance, license notices and limitations are documented in [MAP_METHODOLOGY.md](MAP_METHODOLOGY.md); the inspection scope below describes the earlier review.

Inspected fork: https://github.com/haitaowu12/jiangshan-map
Pinned commit: fcd6484d06d3c581241fc24adbab288cf3a4a2ea
Upstream parent: DeanChensj/jiangshan-map

## Inspected material

README.md, LICENSE, CONTRIBUTING.md, js/app.js, js/atlas_boot.js, js/map_data.js, scripts/validate_atlas.js. Files fetched through the GitHub connector and copied into jiangshan-upstream for read-only inspection. The 1,576,007-byte atlas_snapshots.js response contained no content; it was not inspected or executed. No browser execution or complete upstream validation was performed.

## Reuse decision

Use the interaction model as inspiration, build a new world-scale engine. The fork is a specialized Chinese historical atlas, not a data-independent global timeline engine.

- app.js lines 218–251 sets window.DYNASTY_DATA, PROVINCE_OUTLINES, CORRIDOR_DATA, one active dynasty index, and hard-coded Mercator bounds 66–142° E / 14–55° N.
- app.js lines 4486–4514 maps all time to one dynasty and its weighted band; concurrent global histories need independent records and separate regional bands.
- app.js lines 1334–1361 resolves phase snapshots using exclusive until years and falls back to an empty snapshot object if data cannot load. A new engine should expose missing data instead of suggesting a blank map is the historical world.
- app.js lines 4692 onward skips year zero and updates the active dynasty. Preserve the no-year-zero invariant in a centralized temporal utility rather than spreading year conversion around the UI.
- map_data.js lines 1–95 shows period metadata, phases and source-free narrative summaries. Citation, date precision and representative-location status need explicit fields.
- app.js lines 40–155 provides simple Mercator polygon drawing/smoothing with no antimeridian splitting visible in this path. Global maps need tested ±180° handling; avoid smoothing disputed or approximate border data into unwarranted precision.
- app.js lines 8430 onward and 9770 onward expose parse/locate/inspect/resolvePlace API methods. Keep shareable year/place/selection links and read-only structured queries as concepts.

## Useful features to preserve conceptually

Timeline scrubbing and playback; simultaneous map and story selection; bilingual labels; place-based exploration; guided journeys; keyboard actions; durable links; inspectable sources. For a world atlas, compare concurrent histories and label historical map snapshots by their actual year, rather than invent continuous borders between sparse snapshots.

## License finding

Root LICENSE is MIT, copyright 2026 DeanChensj. README ends with “License: GPL-3.0” and identifies aourednik/historical-basemaps as GPL-3.0. This is a repository-level inconsistency, not grounds to treat all embedded third-party data as MIT. Fresh code can use a chosen license; if redistributing GPL historical-basemaps layers, include their GPL license and attribution and retain pinned-source provenance. If copying upstream source, also preserve its MIT copyright notice. Do not claim the full upstream archive is uniformly licensed based on GitHub metadata.

## Recommended small architecture

- Pure temporal/state modules: civil year conversion, interval matching, snapshot lookup, URL round-trip.
- Immutable, sourced content JSON: stable ID; localized title, summary and date note; start/end; interval semantics; representative location; region/theme; sources.
- Geographic renderer: neutral physical basemap; point events/cultural records; optional exact-year sourced historical territory layer; source legend and missing-data messaging.
- UI modules: timeline, region/theme filters, search, selected detail, same-time comparisons, guided journeys.
- Validate source presence, coordinates, interval direction, IDs, localizations, no zero dates, legal snapshot year matching and missing records. Do not use entry counts as evidence of historical accuracy.

## GitHub operations

Available connector supports repository reads, create/update files, branches, blobs, trees, commits and PRs, but exposes no create-repository operation. A repository must exist before those mutation tools can write it. The fetch tool is GET-only and rejects unlisted endpoints; it cannot create a repository. No remote mutations were attempted.

