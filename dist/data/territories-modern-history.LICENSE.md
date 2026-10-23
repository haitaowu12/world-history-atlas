# Selected modern historical snapshots

Source: André Ourednik and contributors, https://github.com/aourednik/historical-basemaps

Pinned commit: `da7a4b735ecef70aebdc9c73e409d8a2500d50f3`.

Source files: `geojson/world_1994.geojson`, `geojson/world_2000.geojson`, `geojson/world_2010.geojson`.

License: GPL-3.0-only. The complete license text is preserved in `territories.LICENSE` in this directory. These imported data are not relicensed under the original application code's MIT license or the original narrative text's CC BY license.

Modifications: selected reviewed state features; retained their actual snapshot years; collected multipart country pieces; added English and Chinese display labels, evidence and scope notes; rounded coordinates to four decimal places; normalized D3 spherical ring winding and removed degenerate rings. No present-day shape was backdated and no border was manually redrawn.

Independent comparisons used UN state-succession evidence and read-only CShapes 2.0 chronology/interior-location checks. CShapes geometry and records are not included. The checks support broad location and chronology, not precise frontier or control claims.

`scripts/build-modern-history.cjs` reproduces the source selection. `docs/MODERN_MAP_VALIDATION.json` records the selected IDs, checks and exclusions. The exact source and output hashes are in `map-snapshots.json`.
