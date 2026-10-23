# Globe-fill repair and shared display shade

23 October 2026. Source version 0.7.1; update to the existing Site.

## Reproduced failure

The 300 BCE view filled the visible globe with one dark colour. This was a geometry interpretation error. Some inherited China rings used the orientation opposite to D3's spherical convention. A region's complement was then filled. The prior test suite checked winding in CShapes but did not include the new China political and administrative geometry.

The pre-fix scan found 938 features with a spherical area greater than a hemisphere, plus a further ring-orientation issue that did not make its entire feature exceed that limit. The repaired derivative changes ring traversal/closure in 75 stored political features and 864 administrative features. Source dates, historical names, geographic vertices and source identities remain attached to their original records. Unclosed source rings are closed by repeating the first point before area calculation.

## Repair

- `dist/map-geometry.mjs` normalizes every exterior and hole separately, including each island in a MultiPolygon. It preserves input data and returns unchanged geometry when no repair is needed.
- The China extraction builder now emits normalized geometry, so rebuilding from pinned source does not reintroduce the error.
- Historical, contemporary, disputed-area, CShapes and lazy China map data also pass through normalization when loaded. This keeps projected paths, hit-testing and area-based labels on the same geometry.
- `dist/map-palette.mjs` assigns Taiwan the mainland China's display fill in dated and contemporary map layers. Map paths, legend swatches and evidence swatches use the same palette. This is a display choice; original unit records, source colours, dates and links are retained.

