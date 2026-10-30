# Worldwide regional reference — Natural Earth

The Natural Earth Admin 1 states/provinces data is in the public domain. It may be used, modified and redistributed for commercial or noncommercial purposes without permission. Attribution is retained voluntarily. Original atlas narratives and linked source pages retain their own licenses.

Source: Natural Earth **5.1.1 (2022)**, 1:10 million Admin 1 states/provinces; Git tag `v5.1.1`, commit `9380cca83db5f9aef52d5e762765100745f84b27`.

- [Official dataset and limitations](https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-admin-1-states-provinces/)
- [Public-domain terms](https://www.naturalearthdata.com/about/terms-of-use/)
- [Pinned source file](https://github.com/nvkelso/natural-earth-vector/blob/9380cca83db5f9aef52d5e762765100745f84b27/geojson/ne_10m_admin_1_states_provinces.geojson)

Input SHA-256: `22d0e3ad85eb3e27f17cabf8ba2d50e554fbc27a87796ff891d958185da62fb5`.

The derivative preserves all 4,596 source units and 251 source country/area groups. These are not 251 sovereign countries. Administrative levels vary and may be outdated: France uses departments; dependencies, islands and disputed areas appear in the source groupings. Natural Earth's default de facto viewpoint does not adjudicate sovereignty. ISO prefixes are retained as source attributes, not used to infer jurisdiction or to rewrite group membership.

Display transformations: shared topology quantization and weighted spherical simplification with small units, tiny polygon components and hole boundaries protected; coordinate rounding; D3 ring closure/winding; original geometry fallbacks when needed. Original source anchors are retained separately; derived interior label anchors move labels only, never historical story pins. No source unit is silently dropped. Input/output counts, tool versions, fallback IDs, label corrections, chunk hashes and byte budgets are recorded in `regional-reference.json`. These are modern orientation shapes, separate from historical snapshot membership.

Build-time tools (not shipped or loaded at runtime): TopoJSON server/client/simplify, ISC licenses; Mapbox polylabel, ISC license. The runtime uses the atlas's existing local D3.
