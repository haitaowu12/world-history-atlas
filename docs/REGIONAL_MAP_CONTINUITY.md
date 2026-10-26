# Regional map continuity correction — 26 October 2026

This additive correction addresses the reported disappearance of colored regions in South America and Africa, including the 1867 view. It adds **23 dated source instances** for **17 identities**, taking the historical collection from 516 to **539 instances**. It does not establish complete worldwide coverage or annual frontier accuracy.

## Demonstrated causes

1. The existing selection had no Brazil successor after the 1783 outline's eligibility ended in 1814. Several South American republics and African kingdoms had narrative records but no selected territory geometry. A country or society marker never supplies a polygon.
2. At 1886, the app switched wholesale to CShapes. That annual dataset initially leaves the selected Asante, Sokoto, Buganda and Bunyoro locations uncovered. Even adding pre-1886 geometry alone would have reproduced the disappearance at that switch.
3. The earlier all-year test required at least one eligible feature somewhere in the world. It explicitly did not test regional continuity. The new tests retain that global check and add regional geographic witnesses, inclusive phase windows, expired-label refusals and the 1886 composition seam.

## Source and transformations

The new layer is selected from `world_1815.geojson` and `world_1878.geojson` at historical-basemaps commit `da7a4b735ecef70aebdc9c73e409d8a2500d50f3`. Both full-file SHA-256 values must match the existing pinned manifest before generation. GPL-3.0-only attribution and `territories.LICENSE` remain in force. All pre-existing layers remain byte-for-byte unchanged.

Run `node scripts/build-regional-continuity.mjs /path/to/pinned/geojson` after the older V4 map builder. The correction is additive and idempotent: it replaces only its own layers/membership. It retains source names and dates, all polygon components and holes, rounds coordinates to four decimal places like V4, and normalizes spherical ring traversal through the existing geometry helper. No modern borders, generated circles, interpolation or invented polygons are used. The new shard is about 101 KB, below the existing 450 KB transport budget.

Institutional sources were inspected for broad geography and chronology: the Met's South America 1800–1900 timeline, Asante essay, Luba/Lunda essay and Kuba essay; Brazil's 10 December 1822 decree; Banco de la República's Gran Colombia account; SOAS's Nana Asma’u/Jean Boyd collection article; UNESCO's Ambohimanga entry; and the accessible opening page of Steinhart's Great Lakes kingdoms paper on Persée. The Persée article was **not read in full**. None of these checks independently validates every imported boundary vertex.

## Reviewed display windows

These are finite **editorial eligibility windows for dated context**, not founding/dissolution dates or claims that the source frontiers were stable throughout. A later outline is used only with explicit backward review. Each clickable feature exposes the selected year, actual outline year, scope and sources in both languages.

| Reference | Source year(s) | Display window | Interpretation |
| --- | --- | --- | --- |
| Brazil under the Portuguese crown | 1815 | 1815–1821 | Continues the earlier source selection; stops before independence. Original “Viceroyalty” alias retained. |
| Empire of Brazil | 1878 | 1822–1885 | Corrects the source's “Kingdom” label using the 1822 imperial decree. The dated outline excludes Uruguay; it does not reconstruct Cisplatine occupation or Acre acquisition. |
| Chile | 1878 | 1831–1885 | Dated pre-Pacific-War reference; subsequent front lines/treaty changes are not asserted. |
| Peru and Bolivia | 1878 | 1839–1885 | Selected separate-republic context after the confederation period. Bolivia's Pacific access is retained as part of the 1878 reference, not a claim about its later frontier. |
| Paraguay | 1878 | 1871–1885 | Conservative postwar window; the later outline is not projected into the preceding war. |
| Uruguay | 1878 | 1830–1885 | Selected independent-republic context; no earlier Brazilian identity implied. |
| United States of Colombia | 1878 | 1863–1885 | Only the explicitly named federal phase; no backdating into Gran Colombia or earlier New Granada titles. |
| Ecuador | 1878 | 1832–1885 | Conservative successor-state window following the Gran Colombia dissolution. Disputed Amazonian claims remain source-specific. |
| Asante | 1815, 1878 | 1750–1873, 1874–1887 | Uses the earlier expansive reference and later smaller reference separately. No uniform administration or precise war-front reconstruction implied. |
| Sokoto | 1815, 1878 | 1815–1877, 1878–1898 | The source's 1815 “Fulani Empire” alias is displayed as Sokoto. Local emirates are not reduced to uniform territorial control. |
| Buganda and Bunyoro | 1815, 1878 | 1815–1877, 1878–1890 | Selected dated Great Lakes kingdom references, not a new survey of changing boundaries. |
| Lunda | 1815, 1878 | 1800–1877, 1878–1885 | Selected network portions in the source, not a complete unified empire or the full extent of clients and trade connections. |
| Luba heartland and Kuba | 1878 | 1800–1885 | Selected regional context; no claim to the full reach of influence or sovereignty. |
| Merina | 1815, 1878 | 1815–1877, 1878–1885 | Selects Merina/Imerina only. The separate whole-island “Madagascar” polygon is not used. |

For the four references continuing after 1885, `countryPeriodSupplement` opts in to composition beneath CShapes units. Annual units draw on top wherever they overlap; the interface identifies additional dated regional references. Every supplement has a finite eligibility end. Unrelated historical features cannot gain eligibility merely by setting the flag. The handoffs are **source coverage events**, not claims about conquest, independence or the disappearance of a people:

| Regional witness | Last supplement year | First CShapes-covered witness year |
| --- | ---: | ---: |
| Asante / Kumasi | 1887 | 1888 |
| Sokoto | 1898 | 1899 |
| Buganda / Kampala | 1890 | 1891 |
| Bunyoro, selected inland witness | 1890 | 1891 |

## Exclusions and remaining gaps

The 1878 Venezuela polygon reaches east to about 48°W, far beyond the named country. The 1880 source repeats it. Neither is imported. The existing excluded 1800 Peru/Río de la Plata and 1900 Ethiopia outlines remain excluded. The source's 1815 Zulu and 1878 Wassoulou labels are also not used. Filling every blank region would require further source-specific review, especially independence-war transitions, Venezuela, earlier Argentina and much earlier African chronology.

The source polygons are approximate and selected. Some heartlands and dependent networks remain incomplete. An omitted place can still have history, government and communities. These limitations are not repaired by carrying an expired imperial identity indefinitely.

