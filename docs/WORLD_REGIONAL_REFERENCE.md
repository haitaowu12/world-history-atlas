# Worldwide regional boundaries · 25 October 2026

## Demonstrated problem and correction

The published V12 map initialized with the US/Canada layer off. Its browser shortcut was hidden unless North America was selected, and it contained no units elsewhere. Native deployment success established publication, but did not establish that a reader could discover the feature. The live in-app-browser inspection reproduced all three issues.

Application **0.11.1** replaces that limited integration with a worldwide modern reference. A persistent **Regions** map button and **States & provinces worldwide** sidebar button open country/area browsing. The new `regions` preference defaults on, including for visitors with the old `usCanada: false` preference; an explicit new `regions: false` choice is retained. Boundaries load automatically for visible country/area groups at zoom 1.8 and above; full names appear at zoom 2.8 and above with collision filtering. Regional focus removes the unrelated global polity legend and competing map text labels while retaining story pins, hover/selection, and historical source/date controls. The source-year footer remains visible and gives a zoom hint at world scale. Selecting a country or unit focuses the map and enables the reference. Historical dates remain independent.

Direct reference views use `regions=CAN`, `regions=USA`, `regions=CHN`, etc. in the URL hash. The source group is validated against the directory; the historical year and language remain separate fields. Camera presets for large countries improve visibility without changing source coordinates. World reset clears the regional focus.

## Source, scope and rights

[The official Natural Earth Admin 1 page](https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-admin-1-states-provinces/) was inspected in a browser. The actual GeoJSON was acquired through Git at tag `v5.1.1`, commit `9380cca83db5f9aef52d5e762765100745f84b27`. Input: `geojson/ne_10m_admin_1_states_provinces.geojson`; SHA-256 `22d0e3ad85eb3e27f17cabf8ba2d50e554fbc27a87796ff891d958185da62fb5`. The [public-domain terms](https://www.naturalearthdata.com/about/terms-of-use/) apply; a separate source notice is retained in `dist/data/regional-reference.LICENSE.md`.

All **4,596 source units / 251 source country-area groups** survive. These are not 251 sovereign countries, and the units are not a uniform current administrative register. The source release is **2022**, inspected in 2026. Natural Earth's default de facto groupings are preserved rather than converted into legal or historical sovereignty assertions. ISO prefixes do not determine grouping. Disputed areas remain source references; existing mainland/Taiwan display-colour conventions and historical geometry are unchanged.

Examples of source granularity: USA has 50 states and DC; Canada has 10 provinces and three territories; France has 101 departments including overseas departments rather than current regions; Australia includes island/territory units; the UK uses mixed local units. China has 31 mainland units plus a source island unit, while Hong Kong, Macao and Taiwan are separate source groups. India/Nigeria types are retained as source metadata rather than promoted to authoritative present classifications. The UI exposes the source scope and differing levels.

Source `adm1_code` is unique, while ISO codes repeat in some countries. Output uses ISO codes only when globally unique, otherwise the immutable source administrative ID. It retains both fields. DC is displayed as District of Columbia. Seven unnamed source features get explicit bilingual placeholder labels. Missing Chinese names fall back to the source name rather than fabricated translations.

## Reproducible display derivative

The build uses TopoJSON server 3.0.1, client 3.1.0, simplify 3.0.3 and Mapbox polylabel 2.0.1 as external build-time tools, with no new browser dependency. The process builds shared topology at quantization 10,000,000, protects small units and hole arcs, applies spherical-area weighted simplification, rounds coordinates to four decimals and normalizes ring winding for D3. Three otherwise degenerate units retain source geometry. All 111 holes remain. Generalized island polygon components reduce from **8,535 to 7,006**; no source administrative unit is dropped. This is a display reference, not a reconstruction of every source coastline. Original-geometry fallbacks may differ in detail from simplified neighbours.

The source has label anchors outside some shapes. Eighty-eight displayed labels receive derived interior anchors; original source anchors and correction IDs are retained. This moves labels only. Historical entry/milestone coordinates remain unchanged. Membership links use representative points, actual dated milestones and reviewed named-place associations, with year filtering that does not interpolate personal residence. Earlier V12 coastal reviews remain available; the new derivative uses its own containment checks.

`npm run build:regions -- /absolute/path/to/pinned.geojson /absolute/path/to/build-tools-directory` rebuilds the assets. Runtime use needs neither those tools nor a network service. The manifest retains tool versions, transformations, source hash, country groupings, geometry fallbacks, label corrections, counts, per-shard hashes and byte sizes.

## Resource budget and checks

The complete derivative geometry is **6,119,516 uncompressed bytes**, compared with the 40,726,851-byte input. The largest shard is **345,441 bytes**, below the existing 450,000-byte budget. The directory is about 81 KB. Country shards are fetched on demand with a four-country concurrency limit, cached, and culled to the viewport; they are not all fetched before the first map. US/Canada geometry together is under 400 KB. No external tiles, fonts, database, API or runtime library is introduced. No universal frame-rate or latency guarantee is claimed.

Automated coverage checks the exact source inventory, unique IDs, manifest hashes/budgets, positive spherical geometry, all displayed label anchors, holes and finite paths, 31 independent location points across ten countries, search, history/year semantics, viewport selection and antimeridian behaviour. The main validator includes the worldwide assets and history references. Earlier source narrative, imported China and historical map contracts remain in the suite.
