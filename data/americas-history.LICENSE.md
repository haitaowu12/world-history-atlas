# Dated Americas geometry: separate source rights

These generated assets are not covered by the application code's MIT license.

## United States

Atlas of Historical County Boundaries, Newberry Library: U.S. Historical States and Territories, generalized .01-degree distribution. Source: https://publications.newberry.org/ahcb/pages/United_States.html . Archive SHA256: `db6f124d913bdda718fbf4153d5b1abe569cb9b60cb2a4d73b25afb5a258c457`.

Retain the archive's Creative Commons Attribution–NonCommercial–ShareAlike 2.5 notice for `americas-units-usa-*.geojson` and its derived metadata. License: https://creativecommons.org/licenses/by-nc-sa/2.5/ ; legal code: https://creativecommons.org/licenses/by-nc-sa/2.5/legalcode . Attribution: Atlas of Historical County Boundaries Project, The Newberry Library. Adaptations: source-unit extraction, dated selection, classification, topology-preserving simplification, coordinate rounding and D3 ring normalization. No endorsement implied. The present Newberry reuse page also permits lawful public reuse; that broader statement is not used to remove the packaged notice. Commercial reuse of these derived assets is not represented as cleared.

## Canada

Natural Resources Canada, Canada Centre for Mapping and Earth Observation: Territorial Evolution of Canada, 1867 to 2003 (2017 catalog release). Source: https://app.geo.ca/en-ca/map-browser/record/e88ce995-b69a-4595-a752-bb06b061b5a3 . Archive SHA256: `99eb89f444af9dd4dcd36227ad1413eae28d274cc23493f452b4d64dc25dc926`.

**Contains information licensed under the Open Government Licence – Canada.** Version 2.0: https://open.canada.ca/en/open-government-licence-canada . Applies to `americas-history-can-*.geojson` and corresponding derived metadata. Adaptations: source-stage selection, EPSG3978 to EPSG4326 reprojection, topology-preserving simplification, rounding, D3 ring normalization and removal of one identical Manitoba duplicate in the 2003 stage. No government endorsement implied.

Both input archives were downloaded and their metadata/rights inspected in the Codex in-app browser on 25 October 2026. The University of Toronto/Borealis dataset was not imported. Raw archives remain build inputs, not bundled application code. Reproduction and limitations: `docs/AMERICAS_HISTORY_013.md` and `scripts/build-americas-history.py`.
