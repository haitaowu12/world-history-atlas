# CH3: waterways, walls and corridors — source comparison

Reviewed 9 November 2026 (Vancouver). This closes the implementation inventory and pinned-source comparison for the roadmap's CH3 workstream. It does not establish historical accuracy or individual reuse rights for every inherited line.

## Material already present

The V16 application already contained these layers. V17 does not reimport their coordinates or count them as new historical entries.

| Material | Existing inventory | Application behavior |
| --- | ---: | --- |
| River records | 187 | Line geometry; 11 records have source appearance/disappearance windows |
| Lake records | 62 | Shorelines drawn as lines, not filled historical areas; 5 have source windows |
| Water labels | 41 | English/Chinese labels; 12 have source windows |
| Wall schematics | 6 | Warring States, Qin, Han, Han Hexi, Ming and Ming Liaodong |
| Overland corridors | 4 | Qin Straight Road and three Silk Road corridor schematics |
| Canal schematics | 4 | Tongji, Han Gou, Yongji and Jing–Hang |
| Sea corridors | 2 | Maritime Silk Road and Zheng He schematic networks |

The map exposes separate waterway and corridor toggles when zoomed in. Modern-reference view disables these historical-context layers. Corridor selection opens its source, source-defined interval and schematic-precision explanation. Water visibility uses `[appear, vanish)`; corridor spans include their displayed end year. The existing `tests/expansion-v9.test.mjs` checks these distinct boundaries and ensures lake edges cannot become filled polygons.

## Source correspondence observed

Both original JavaScript blobs were retrieved through the GitHub connection from the already-pinned Jiangshan fork, commit `fcd6484d06d3c581241fc24adbab288cf3a4a2ea`. Their Git blob hashes were verified before extracting the data:

- [`js/china_geo_data.js`](https://github.com/haitaowu12/jiangshan-map/blob/fcd6484d06d3c581241fc24adbab288cf3a4a2ea/js/china_geo_data.js): `ea79fbdf09f9e841852e8eccec2f78ca33d332ba`.
- [`js/map_data.js`](https://github.com/haitaowu12/jiangshan-map/blob/fcd6484d06d3c581241fc24adbab288cf3a4a2ea/js/map_data.js): `70e049066702919ac3fbcb791fc0371ce5513475`.

All 187 river, 62 lake and 41 label objects equal the pinned source after removal of the atlas's added IDs. All 16 corridor keys, kinds, Chinese titles and summaries, coordinate segments, source spans and start years correspond to the source. Two displayed end years are capped at the atlas maximum of 2026: Ming walls and the Jing–Hang canal have source end `9999`. Their original spans remain preserved. No other difference was found in the compared fields. See the [machine-readable receipt](CH3_SOURCE_COMPARISON_V17.json).

## Evidence and rights that remain open

Source correspondence explains where a line came from; it cannot verify an engineering date, a surveyed alignment, a river's course in every year, or continuous operation. For example, the inherited Yellow River display window beginning in 11 CE must not be read as the date of Wang Jing's later work. Undated water lines remain geographic reference. The atlas already states these limits in English and Chinese.

The [earlier boundary-rights review](JIANGSHAN_BOUNDARY_RIGHTS_REVIEW_2026_10_28.md) removed restricted political and administrative polygons but did not establish per-feature provenance for the surviving non-polygon lines. That limitation remains. The pinned license notices and the newer donor review must be read separately; current upstream GPL status is not a new blanket clearance for the inherited data. V17 introduces no additional donor geometry.

Further work should select a particular river, canal or wall, locate a reusable scholarly reconstruction and its source dates, then review both evidence and rights before replacing the inherited schematic. The CH3 inventory is now explicit; historical and rights review of every inherited line remains a separate, unfinished research task.
