# Historical boundary data: first-release decision

Reviewed on 2026-10-22 (UTC). This is a bounded source/data inspection, not a validation of the full world-history dataset.

## Decision

Do not ship the `aourednik/historical-basemaps` polygons in the first release. Use Natural Earth's physical land geometry and sourced representative place markers. The inspected snapshots contain chronological problems that a general “approximate borders” label would not resolve. A future research layer should remain separate from reviewed learning content until its individual snapshots pass a documented audit.

## What was inspected

Repository: https://github.com/aourednik/historical-basemaps

Pinned commit: `da7a4b735ecef70aebdc9c73e409d8a2500d50f3`

Read the README, current `index.json`, and actual feature properties from `geojson/world_bc1500.geojson` and `geojson/world_1960.geojson`. The second file exceeds the contents endpoint's useful response size; its full text was read through the Git blob endpoint, not inferred from the year index.

| File | Inspected Git blob | Size |
| --- | --- | ---: |
| `geojson/world_bc1500.geojson` | `89bd098b3c5fd48c70031e97c05a8ea82824d476` | 874,767 bytes |
| `geojson/world_1960.geojson` | `ee10df0ad424fdaab567ee768279d0c10b6c1c7b` | 1,502,004 bytes |

The inspected index has 54 snapshot entries, from a prehistoric layer labelled 123,000 BCE to 2010 CE. That is sparse, irregular sampling, not continuous annual coverage. GeoJSON uses geographic coordinates; application code must treat GeoJSON positions as longitude then latitude. The README's prose says “LatLon,” so callers should follow the actual format, not that ambiguous shorthand.

## Two concrete chronological defects

### 1. A 1500 BCE layer includes the kingdom of David and Solomon

In the actual `world_bc1500.geojson`, one feature's `NAME`, `SUBJECTO` and `PARTOF` all identify the “Kingdom of David and Solomon”; `BORDERPRECISION` is 1. Its placement is several centuries earlier than the traditional tenth-century chronology. This finding does not depend on accepting a particular reconstruction of the kingdom's extent or resolving disputes over its historicity. An approximate geometry flag cannot fix a wrong chronological placement.

Source file: https://github.com/aourednik/historical-basemaps/blob/da7a4b735ecef70aebdc9c73e409d8a2500d50f3/geojson/world_bc1500.geojson

Chronology cross-check: The Metropolitan Museum of Art discusses Solomon within Jewish tradition and gives circa 990–931 BCE. That page is used here only to check the traditional period, not to establish the historical truth of a biblical territorial claim: https://www.metmuseum.org/perspectives/solomons-temple-model-judaica

### 2. The 1960 layer presents Zambia as its own authority

In the actual `world_1960.geojson`, `NAME`, `SUBJECTO` and `PARTOF` are all “Zambia,” and `BORDERPRECISION` is 3. This is more than a modern display label retained for geographical recognition: the subject-authority field also names Zambia. Zambia became independent on 24 October 1964; before independence the territory was Northern Rhodesia under British sovereignty. A 1960 map that colors by `SUBJECTO` would therefore teach the wrong political relationship.

The same inspected file also gives Tanzania, Malawi and Zimbabwe self-identifying `SUBJECTO` values and precision 3. Those were observed sibling risks, but their complete chronologies and geometry were not separately audited in this review.

Source file: https://github.com/aourednik/historical-basemaps/blob/da7a4b735ecef70aebdc9c73e409d8a2500d50f3/geojson/world_1960.geojson

Primary chronology cross-check: U.S. Department of State, Office of the Historian, recognition and diplomatic history of Zambia: https://history.state.gov/countries/zambia

## License, scale and conceptual limits

The repository declares GPL-3.0. Any later distribution should preserve that data license and its provenance rather than relabelling the imported data as MIT. Pin the exact source commit and retain modifications separately. No historical-basemaps polygon data is required for the current release.

The upstream describes the geometry as suitable for global or continental display, marks the project as work in progress, and advises source comparison. Its fields distinguish name, authority, cultural grouping and ordinal boundary precision. Those ordinal values are upstream classifications, not probabilities or independently verified legal findings. Cultural areas can overlap; old shorelines and rivers may differ from today's physical base.

Repository documentation and license: https://github.com/aourednik/historical-basemaps and https://github.com/aourednik/historical-basemaps/blob/da7a4b735ecef70aebdc9c73e409d8a2500d50f3/LICENSE

Natural Earth's published raster and vector map data are public domain. Use its land/coastline layer for orientation, label it as a present-day physical base, and omit modern sovereign boundaries from the historical view unless separately selected. Terms: https://www.naturalearthdata.com/about/terms-of-use/

## Gate for any later experimental boundary layer

1. Preserve a manifest containing snapshot year, source commit, license, reviewed features, known issues and reviewer evidence.
2. Show the exact available snapshot date. Do not relabel the nearest layer as the selected year, and do not interpolate sovereignty between polygons.
3. Review each feature's political name, authority and existence against dated sources before enabling that snapshot as learning content. Inspect subordinate territories as well as headline empires.
4. Keep date uncertainty separate from geometry uncertainty and disputed interpretation. A geography may be approximate even when the date is known, and vice versa.
5. Provide a visible empty/unknown state. Lack of a mapped polity must not imply an uninhabited place or absence of history.
6. Keep educational entries and historical geometry independently sourced. A bibliography for a city does not validate a surrounding empire polygon.

Only two snapshot files were sampled. These examples justify withholding unreviewed boundaries; they do not quantify an error rate or establish that every upstream layer is unusable.
