# Gupta, Borno and Ayutthaya: later map-gap review

26 October 2026. Seven source instances extend the previous 643-instance historical collection to 650. They are dated, limited regional references, not a claim that all map gaps have been filled or that the shapes describe annual frontiers. The prior layer bytes and instances are preserved in `LATER_MAP_GAPS_BASELINE.json`. The chosen display intervals are inclusive editorial windows and are separate from the dates of the actual source illustrations.

| Region and source shape | Display interval | Interpretation and limits |
| --- | --- | --- |
| Gupta, source 375 | 350–374 | A later, blurred core illustration is used as partial regional context for Samudragupta's period. |
| Gupta, source 375 | 480–500 | The same earlier, blurred illustration is used as partial context for a later period of Gupta rule. It does not represent a measured contraction or expansion. |
| Borno, source 1890 | 1886–1892 | Approximate mapped Borno core during the al-Kanemi court period. |
| Borno, source 1893 | 1893–1894 | Approximate core reference during the invasion and court transition. |
| Borno, source 1898 | 1895–1899 | Approximate core reference during Rabih's period; not his military frontier. |
| Borno, source 1898 | 1900–1901 | Earlier core reference during warfare and disputed succession; the source does not trace those events' changing boundaries. |
| Pegu, source 1500 | 1569–1598 | Earlier lower-Burma court-region reference for the Toungoo period; not the extent of occupation in Siam. |

## Gupta: source evidence and remaining coverage

The original [375 illustration by Woudloper](https://commons.wikimedia.org/wiki/File:South_Asia_historical_AD375_EN.svg) supplies the existing, approximately georegistered and diffuse Gupta core. The two added periods reuse it without moving vertices. [Joppen's 1907 map of India in 350](https://commons.wikimedia.org/wiki/File:India_in_350_CE_Joppen.jpg), retained as a public-domain comparison, depicts a broader northern Gupta area and separately identifies protected tribes and a southern campaign. [TimeMaps' 500 CE South Asia map and account](https://timemaps.com/history/south-asia-500ad/) presents Gupta and Vakataka regions separately amid Gupta decline; its all-rights-reserved map was inspected but not copied. Neither comparison validates the 375 core's vertices for either later or earlier years. The original 375 map's Vidisha marker is displaced by approximately 180 km in the atlas's registration.

The [Siddham edition of the Damodarpur charter](https://siddham.network/inscription/in00044/?section=metadata) dates it to 482–484 and names Budhagupta and an administrator of Pundravardhana. That location is outside the reused core: the inscription attests to an administrative action, not the extent of a frontier. The [Harvard Gupta–Vākāṭaka chronology](https://timelinesouthasianhistory.hsites.harvard.edu/gupta-v%C4%81k%C4%81%E1%B9%ADaka-age-c-300-%E2%80%93-550-ce) supplies wider dynastic context, not polygon verification.

Gupta before 350 and after 500 remains without a newly reviewed outline. The reused core is incomplete and its continued appearance must not be read as unchanged control. Vakataka continues under its previously reviewed windows only. The separate old 400 and 500 Historical Basemaps Gupta polygons remain excluded for the problems described in [the previous review](THREE_REGIONS_REVIEW.md).

## Borno: source extraction, overlap and chronology

Historian Vincent Hiribarren's [Borno: Territorial Evolution](https://vincenthiribarren.com/borno/maps/index.html) series is based on archival research and published under CC BY 4.0. The author describes the maps as approximate reconstructions of **European geographical views**, not geographically accurate borders. We retained the original 1890, 1893 and 1898 PNGs in `references/borno-hiribarren/`, and retained their hashes in the builder and manifest. This qualification applies to the derived shapes and is displayed in both languages.

The reproducible builder selects the dark grey Borno core (RGB 176, 176, 183); applies a one-pixel, four-neighbor morphological close; fills enclosed interruptions from map labels or lines; keeps the largest component; and traces its pixel edges. Light grey surrounding districts and red European treaty lines are not copied. The map's approximate graticule aligns longitudes 12° and 16° to image x positions 262/512, 266/516 and 254/504 for 1890, 1893 and 1898 respectively, and latitude 12° to image y 266, 260 and 266. A small horizontal shear and approximately 63 pixels per latitude degree are applied. Raster quantization, approximate registration and the historic author's own caveat all limit accuracy; the process is not a surveyed georeference. Approximate Kukawa and Dikwa vicinity witnesses check that the selected cores contain relevant places, not that the rest of their boundaries are correct.

[Dewière and Hiribarren's Bornoan history](https://books.openedition.org/cfee/1252?lang=en) discusses Rabih's 1893–1894 conquest, competing claims, European interventions and the eventual British/German division. European treaty claims and effective local control were not the same. The article gives conflicting 1900/1901 dates for the Kousséri battle, so the 1900–1901 feature does not state an exact death year or imply that the entire first year was after Rabih's death. From 1902 the atlas returns to its annual sources without claiming that Bornoan society or identity ended.

The annual CShapes layer can overlap this source, including before effective occupation. The Borno reference is deliberately drawn above annual units with a translucent fill and dashed outline; its note describes the distinction. Both references remain individually available through the result list. This is an overlap of differently sourced representations, not a reconciliation of their boundaries.

## Ayutthaya and Toungoo: court locations, not occupation lines

The [Smithsonian mainland Southeast Asia chronology](https://publications.asia.si.edu/publications/seaceramics/time/chronologies.php) dates the Toungoo move to Pegu to 1539, the occupation of Siam to 1569, and the Arakanese occupation of Pegu to 1599. It does not supply boundary vertices. The source-1500 Pegu shape from Historical Basemaps is reused only as orientation to the lower-Burma court region, with its source year visible and its GPL-3.0 notice preserved. It is not a reconstruction of the entire Toungoo state.

The existing source-1400 Ayutthaya core remains a separate, dashed reference for the subordinate court and subsequent restoration. The previous review explains the divergent 1581/1584 restoration dates and the 1569 siege. Different colors distinguish the two courts. The exact 1569–1599 military or administrative occupation boundaries remain unresolved: the earlier references cannot establish them, nor do they imply uniform direct rule. A 1540 Southeast Asia map was inspected as a possible lead, but predates the Siamese conquest and was not used as later occupation geometry.

## Reproduction and validation

After the earlier builders, run `node scripts/build-later-map-gaps.mjs /path/to/pinned/historical-basemaps/geojson` from `world/`. The builder verifies the source image hashes, the existing Gupta layer hash, and the pinned `world_1500.geojson` hash before writing separate licensed shards and manifest entries. Running it twice produces identical files. The PNGs and Joppen comparison have their own retained attribution information; the Joppen image is not input to a generated boundary.

`tests/later-map-gaps.test.mjs` exercises every year in the selected intervals, source years, sampled place witnesses, map ordering, distinct court colors, refusal of unreviewed supplements and preservation of all prior instances. `scripts/audit-map-palette.mjs --later-map-gaps docs/LATER_MAP_GAPS_PALETTE.json` audits selected transition-year compositions and proximity-based neighboring display colors. These checks validate software behavior and selected witnesses, not historical accuracy of every point or completeness of the wider atlas. The live map should also be inspected in both languages and on a narrow screen.
