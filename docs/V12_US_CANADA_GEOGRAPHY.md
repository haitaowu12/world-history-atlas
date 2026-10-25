# V12 US/Canada geographic reference

The optional layer is a modern navigation aid: 50 US states, the District of Columbia, ten Canadian provinces and three territories. Its source release is **Natural Earth 5.1.1 (2022)**; inspection occurred on **24 October 2026**. It is never selected as historical snapshot membership, interpolated to a historical year or used to define Indigenous territories, treaty areas, legal property boundaries or continuous personal residence. US overseas territories are outside this layer.

## Source, rights and reproduction

The [official dataset page](https://www.naturalearthdata.com/downloads/50m-cultural-vectors/50m-admin-1-states-provinces/) and [public-domain terms](https://www.naturalearthdata.com/about/terms-of-use/) were inspected through the root Codex in-app browser. The actual GeoJSON was acquired with Git from the Natural Earth repository, tag `v5.1.1`, commit `9380cca83db5f9aef52d5e762765100745f84b27`. Input file: `geojson/ne_50m_admin_1_states_provinces.geojson`; SHA-256: `69a0e06e640b2d505858ae1cb63034e4677f3000b35a98e16312932b98c426b9`. Its 294 global features are explicitly filtered to the 64 USA/CAN units; the website's older geographic description is not used to infer the source inventory.

`node scripts/build-us-canada-reference.mjs /path/to/ne_50m_admin_1_states_provinces.geojson` rejects a different input hash. It selects the units, retains source bilingual names and label anchors, rounds coordinates to four decimal places, and closes/reverses ring traversal for D3 spherical rendering. It does not add geographic vertices. The two output shards are 232,327 and 274,555 bytes, each below the 450 KB limit. The metadata records output hashes and transformations; `us-canada-reference.LICENSE.md` retains the separate notice.

A source-to-output comparison found all 64 geometries preserved modulo declared rounding, closure and traversal direction. Tests exercise 334 polygons/rings, all label anchors, finite projected paths and known inland/island points. The selected source has no hole rings; this is not a demonstration of future hole-bearing datasets. Natural Earth's English DC label is Washington, also used for the state; stable IDs distinguish `US-DC` from `US-WA`, and the interface displays District of Columbia and supports that search alias.

## Linking geography and history

`build-content-expansion-v12.mjs` derives the area index from the combined atlas. A record can link through its representative point, a dated life milestone, or an explicitly reviewed named place. Every area page initially shows all recorded dates. The selected-year filter includes representative/named-place records whose focus interval contains the year, plus milestones dated to that exact year. It does not interpolate residence between life steps or limit the separate modern outlines to the historical year.

The generalized coastlines omit some valid shoreline/island points. Moving those points to force polygon containment would change their meaning. Twenty-two named-place associations in `us-canada-area-links-v12.json` instead link the original named settings to modern areas. The generated index retains role `editorial`, bilingual notes, source links and review dates. The area method disclosure exposes these associations. They concern the representative place, not the historical extent of the record's subject.

| Named settings | Modern area | Geographic source inspected |
| --- | --- | --- |
| Fort Sumter | South Carolina | [National Park Service](https://www.nps.gov/fosu/index.htm) heading identifies the state |
| Mount Vernon, Washington biography | Virginia | [Mount Vernon](https://www.mountvernon.org/george-washington/biography) institutional address |
| Kennedy Space Center | Florida | [NASA](https://www.nasa.gov/kennedy/) location field |
| UN Headquarters | New York | [United Nations](https://www.un.org/en/visit) address |
| Sitka: transfer and resistance records | Alaska | [National Park Service](https://www.nps.gov/sitk/index.htm) heading identifies the state |
| L’Anse aux Meadows | Newfoundland and Labrador | [Parks Canada](https://parks.canada.ca/lhn-nhs/nl/meadows) identifies Newfoundland's northern peninsula |
| Québec: settlement, fur-trade gateway and provincial institutions | Quebec | [UNESCO](https://whc.unesco.org/en/list/300/) identifies city/provincial management |
| Alert Bay / U’mista | British Columbia | [U’mista Cultural Society](https://www.umista.ca/) explicitly identifies Alert Bay, BC |
| Jamestown | Virginia | [National Park Service](https://www.nps.gov/jame/index.htm) heading identifies the state |
| Stonewall | New York | [National Park Service](https://www.nps.gov/ston/index.htm) heading identifies the state |
| Alcatraz | California | [National Park Service](https://www.nps.gov/alca/index.htm) heading identifies the state |
| Burrard Inlet / Vancouver | British Columbia | [Parks Canada backgrounder](https://www.canada.ca/en/parks-canada/news/2016/08/the-komagata-maru-incident-of-1914.html) identifies the harbour; the provincial association is a reviewed geographic inference |
| Gulf of Georgia Cannery / Steveston | British Columbia | [Parks Canada](https://parks.canada.ca/lhn-nhs/bc/georgia) explicitly identifies the province |
| Juneau, antidiscrimination law setting | Alaska | [Alaska State Archives](https://archives.alaska.gov/education/peratrovich.html) identifies Alaska's legislature and Juneau addresses |
| Kinngait | Nunavut | [Inuit Art Foundation](https://www.inuitartfoundation.org/profiles/artist/Kenojuak-Ashevak) Artistic Community field; modern Nunavut does not imply the territory existed before 1999 |
| Halifax, archival port context | Nova Scotia | [Nova Scotia Archives](https://archives.novascotia.ca/africanns/) connects Halifax and the provincial collection; current provincial association is a reviewed geographic inference |

The 22 associations account for multiple records at Sitka, Québec, Juneau and Kinngait, including biographies whose other life milestones already linked them to an area. They add no narrative claims or geometry to frozen releases. The Mount Hope representative point remains unlinked: the state preservation page encountered a security-verification block, which was not bypassed. A search result was not counted as inspected evidence. A guessed U’mista contact route returned 404; the inspected homepage supplies the actual location instead.

The resulting index has entries in **39 of 64 areas** (30 US units and nine Canadian units). Empty areas show collection gaps explicitly. Point links and source-backed place associations do not provide comprehensive regional coverage. Even a nonempty area may have very little local history. The 50m administrative coastlines may not align exactly with the existing 110m land base; nearshore mismatches remain a source-generalization limit.

## Application and resource use

The browser is available from North America's regional button and Map layers. Map paths support click, Enter and Space, with accessible names; zoom reveals abbreviated labels. Modern scope and source year stay visible while the layer is on. Source/method detail and empty-state guidance are available in area pages.

The layer defaults off. Metadata, the generated history index and the two shards total **562,729 uncompressed bytes**, loaded only on first use; the editable association input is not a separate runtime request because its notes are already in the generated index. All runtime assets remain local. No tile service, remote API, database or new library is introduced. This records payload size and loading design, not a measured frame-rate or latency guarantee.
