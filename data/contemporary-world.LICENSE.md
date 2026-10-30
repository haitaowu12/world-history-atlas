# Contemporary world reference data

Made with Natural Earth. All versions of Natural Earth map data are in the public domain.

Source: https://github.com/nvkelso/natural-earth-vector

Pinned commit: `ca96624a56bd078437bca8184e78163e5039ad19` (2022-06-02), release `v5.1.2`.

Input countries geometry was last changed 2022-05-13. Retrieval and bounded atlas review: 2026-10-22. The review date is not the geometry date.

Terms: https://www.naturalearthdata.com/about/terms-of-use/

Boundary policy: https://www.naturalearthdata.com/about/disputed-boundaries-policy/

## Changes

Selected the 1:50m country/map-unit collection, selected 1:50m disputed boundary lines and claim-area polygons; reduced properties; normalized Polygon to MultiPolygon and spherical winding for D3; removed degenerate rings. Localized source names are retained with documented display aliases. Türkiye and Czechia display labels use UN short names. Source classifications are preserved separately from the application's broad display categories.

Five obsolete breakaway/control lines for Nagorno-Karabakh and eastern Ukraine, and three old control-area polygons for Artsakh, Donetsk and Luhansk, are excluded. The remaining 25 claim areas are intended for a neutral hatch overlay, including Crimea. No current military control geometry is inferred or fabricated. Original polygon coordinates are otherwise retained.

`contemporary-world.json` contains the exact input and output hashes, source URLs, review notes and exclusions. `scripts/build-contemporary-world.cjs` reproduces these files from the pinned inputs.

Natural Earth’s source boundary convention does not establish international recognition, sovereignty, or current military control. The app's 2026 contemporary view explicitly identifies the 2022 geometry vintage.
