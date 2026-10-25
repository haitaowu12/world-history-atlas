# Historical data policy

Current 0.13.0 addendum: [dated Americas and map-view method](AMERICAS_HISTORY_013.md) governs the separate Newberry/NRCan references, source-window replacement, palette and History / Modern geography view behavior. Earlier source-specific details below remain historical documentation; US/Canada are no longer universally represented by modern reference outlines.

World History Atlas is an educational collection of selected histories. Its records, people, routes and maps answer different questions and have different evidence requirements. A missing entry or uncolored area never means that a region was uninhabited, ungoverned or lacked history.

## 1. Time means a selected focus interval

Use signed civil years: `-1` is 1 BCE and `1` is 1 CE. There is no year zero. Every narrative record declares ordered, inclusive `start` and `end` values. Public URLs, APIs and milestones use the same convention.

A record's interval is the period discussed in that record. It must not be presented as the full lifetime of a person, culture, people, language, practice or institution unless its evidence supports that interpretation. A biography can focus on a reign or period of activity. A single-year event has equal start and end; a long process or selected archaeological phase can span many years.

Each `dateNote` explains what the interval means and whether it is approximate, conventional, debated or precise. Do not turn an archaeological range into an exact foundation or collapse year. Distinguish construction, occupation, discovery, inscription, publication and modern heritage designation dates. Do not imply that a living culture disappears when its editorial interval ends.

The supported narrative range, 13,000 BCE–2026 CE, describes this release's editorial coverage and interface bounds. It is not the beginning or end of world history. The uneven slider scale changes screen space, not historical durations. “Active in this year,” “overlaps this interval” and “all records” are different filters and must remain clearly identified.

## 2. Keep the data models distinct

| Collection | Meaning and evidence |
| --- | --- |
| `history.json` | Places, polities, events, ideas, cultures and selected processes, each with a focus interval and representative point |
| `people.json` | Authored biographies with the common record fields plus separately dated and located milestones |
| `routes.json` | Journeys or networks with explicit stops, connections, uncertainty notes and route-specific sources |
| `china-events-*.json` | Frozen imported Jiangshan milestone and landmark records, with source pointers and inherited evidence status |
| `china-library.json` and its place and settlement chunks | Original profile directory, seven chronicles, city notes, gazetteer, passes, era-place rows, reign names and schematic corridors |
| `china-reviews.json` | Separate claim-specific corrections and annotations applied to selected imported events and chronicle stops |
| `courses.json` and `journeys.mjs` | Editorial reading sequences and study prompts linked to existing records |
| `territories*.geojson` and `map-snapshots.json` | Source-specific approximate geometry with actual source years and reviewed display periods |
| `contemporary-world-*.geojson` and its manifest | Dated reference country and territory geography, with source vintage and a reviewed display interval |
| Natural Earth assets | Present-day reference geography for orientation |

Narrative records share a stable `id`, bilingual `title`, `summary` and `dateNote`, `start`/`end`, `region`, `theme`, `location`, `locationPrecision` and `sources`. Explicit `kind` values distinguish polities, events, places, ideas, cultures and people. Declare the kind explicitly for new records; the app retains inference only as a fallback for older compatible data. Importance values are editorial display choices, not measures of a society's worth.

A historic site can illuminate political, artistic, scientific, economic, religious or social history, but a heritage listing is not a proxy for an entire civilization. Explain how the mapped place relates to the broader process. Avoid reducing every society to a ruler, monument or conquest.

## 3. Locations are representative

Coordinates identify a selected place or an illustrative centre relevant to a narrative. A point does not specify territorial extent, the origin of an entire culture, an exclusive claim to invention or modern political ownership.

For broad traditions and dispersed activity, name the actual representative place and explain its role. Use precision appropriate to the evidence. An exact-looking coordinate must not conceal a poorly located historical event. The same principle applies to person milestones: their pins represent the places described, not a continuously reconstructed trajectory.

The “history near this place” view compares representative points within a geographic radius. It does not establish continuity of settlement, institutional succession, influence or shared sovereignty. Similarly, contemporary records are not necessarily causally connected. Similar dates or artifacts alone do not establish diffusion.

Natural Earth's land, rivers and optional modern country outlines are geographic references. They do not reconstruct ancient shorelines, sea levels, river courses or historical political borders. Modern country outlines remain optional and are off by default. The separate worldwide regional reference defaults on and appears on zoom, with a persistent 2022-source label; it is modern orientation, never selected as historical snapshot membership. Its source administrative levels and country/area groupings vary. See WORLD_REGIONAL_REFERENCE.md.

## 4. Sources belong to the claim

Every published historical record needs inspectable source URLs, titles and publishers. Newly researched narratives need sources for their particular dates, location interpretation and claims. Prefer specialist museums, archives, heritage authorities, universities and institutional research. A repository bibliography alone is insufficient for independent historical verification.

Imported reference records also identify their provenance, but their evidence label must describe what has actually been checked. The Jiangshan import is marked **inherited**: its frozen source and import accounting have been checked, while each historical assertion has not been independently corroborated. Selected event corrections carry a review scope and supporting sources; selected chronicle stops are **annotated**. Neither label certifies the rest of a compound entry, an entire journey or the source collection. Section 8 explains how the original and reviewed layers remain inspectable.

For each contribution:

1. Open the source and check the date and claim against its actual contents.
2. Write a short original summary rather than copying a descriptive paragraph.
3. Explain the chosen interval and uncertainty that materially affects interpretation.
4. Consult an additional source for a disputed date, broad causal claim, contested attribution or source conflict.
5. Distinguish factual assertions from editorial framing and questions.
6. Record an `evidenceNote` and `checkedAt` when documenting source review, without implying broader review than was performed.

An institution's general homepage, a search snippet or an adjacent topic page cannot support a precise claim merely because the publisher is authoritative. A failed or blocked source remains unverified until inspected. Link reachability does not establish correctness.

English and Chinese must preserve the same scope, attribution and uncertainty. Translation must not introduce an additional assertion or turn an approximate statement into a precise one. Historical names should be intelligible without silently equating a historical polity with a modern nation-state.

## 5. People, routes and study guides need their own interpretation

### People and milestones

A profile's focus interval and its milestones must be internally consistent and source-supported. Describe what each milestone dates: a reign, journey, publication, political action or other event. A milestone does not require a known birth date, and a profile must not invent one to fill a timeline.

Milestones have bilingual titles and descriptions, a civil year and a representative location. A selected milestone can change the year and map focus. Present approximate locations or dates as approximate. A sequence of milestone places is not evidence for a travel route between them.

### Routes and networks

A `journey` follows selected stages of a documented journey. A `network` describes connected sites over an interval and can branch. Each route declares a `dateNote`, `caveat`, `geometryPrecision`, sources, stops and explicit `legs`. Each leg names its `from` and `to` stops and carries an evidence note.

Do not connect a network's entire stop array into a fictional itinerary. Do not assign a shared arrival year to undated network nodes: `null` means no single stop year is claimed. A network's overall interval does not imply every node and connection was continuously or equally active.

The displayed connections are schematic. They do not claim the exact road, sea track, migration corridor, route width or traffic volume. Source evidence for a stop alone does not establish every possible connection to another stop. Explanatory notes should identify missing stages and the limits of a selected route.

Coercion, enslavement, displacement and resistance must remain explicit where relevant. A forced-migration network must not be framed as an optional adventure or an ordinary commercial itinerary.

### Reading paths and activities

Guided readings and study guides are editorial teaching sequences, not physical routes. Course `recordIds` and `routeIds` point to the evidence-bearing collections. Questions and activities are prompts for interpretation, not new historical claims or graded factual answers.

Keep prompts connected to the cited records. Avoid presenting uncertain dates as exact quiz answers. The map challenge measures distance to representative atlas points; its score is feedback for geographic orientation, not an assessment of historical understanding.

## 6. Historical territories have a separate review process

The territory collection combines dated source checkpoints, reviewed historical display periods and a separately dated contemporary reference. It is not a complete historical GIS or an annual reconstruction. The current source selection, transformations, exclusions and review limits are in [MAP_METHODOLOGY.md](MAP_METHODOLOGY.md).

Every layer must preserve:

- Its source repository, immutable commit, source path, original license and relevant notices.
- The actual source snapshot year and the source's BCE/CE convention.
- Feature IDs, names, the intended geographic meaning and source evidence.
- Per-feature uncertainty and review scope, including whether geometry is independently reconstructed.
- Checksums for source and distributed files, with documented transformations.
- Validation for spherical winding, antimeridian behavior, holes, invalid coordinates and degenerate components.

Institutional sources can confirm a polity's existence and broad geographic setting without validating each imported boundary vertex. The current selected Historical Basemaps outlines are reviewed on that limited basis. Known chronology or geographic problems justify exclusion; an “approximate” label does not excuse a wrong-period polity.

The historical map selects one eligible outline per polity. Exact source dates remain explicit. Use outside that year requires a feature-specific `contextValidity` interval, evidence URLs, bilingual interpretation and an explicit backward-review decision. Prefer the latest eligible prior outline; use a later outline only after backward review. Never infer a stable frontier from a polity lifespan or interpolate sovereignty. End intervals at reviewed transitions. Mixed-source displays are approximate context, even if the selected year is also a source checkpoint. Unmapped years retain physical geography and dated narratives. An optional previous-snapshot outline is an explicitly dated comparison on an unmixed historical map.

Contemporary geography has a separate `reviewedYear`, `geometryVintage`, source license, checksum manifest and scope notes. Use outside its explicit review year requires a documented collection-level period plus per-feature review, including earlier names, administrative changes, excluded features and any dated historical fallback geometry. A new year requires a deliberate content review. The current reference context is 2011–2026, with 2022 source geometry; this does not claim annually reconstructed borders. Map-unit counts include dependencies and disputed areas and must not be presented as sovereign-state counts. Source-specific dispute conventions must remain visible.

A cultural range must be marked as `kind: "culture"`, visually distinguished and described as a cultural region with unknown political borders. Claim, administration, influence, tributary relations, cultural range and trade connections are different geographic concepts. Do not merge them into a single undifferentiated territorial claim. Empty space means no selected geometry.

### Source-specific notices

Historical Basemaps geometry, AWMC geometry and Jiangshan schematics remain in separate files with separate license notices. The application code's MIT license does not relicense them.

The three Jiangshan shapes are explicitly labeled **“Jiangshan schematic outline”** and retain their original focus intervals. The upstream README declares GPL-3.0 while its root LICENSE is MIT; both notices are preserved. The source references several historical resources without identifying each outline's derivation. Document that unresolved provenance rather than asserting that the outlines were copied from CHGIS or that all upstream material is MIT. No CHGIS download is included in this release. See [the preserved notice](../dist/data/territories-jiangshan.LICENSE.md).

Do not generate a missing territory from a capital point, a circle, modern country borders or an unsupported freehand shape. A new schematic needs explicit historical map evidence, permissible reuse, a date and an honest statement of its precision.

## 7. Coverage and corrections stay inspectable

The current corpus spans nine editorial regions but is selective and uneven. Counts describe material included; they are not a sampling measure of historical importance or completeness. Expose empty filter states and keep regional counts inspectable.

Expansion should include underrepresented periods, women's histories, Indigenous and living-community perspectives, daily life, environment, labour and institutions alongside political history. Africa, the Americas and Oceania deserve depth as well as wider geographic distribution. Do not organize all global history solely through European period names or a hierarchy of “advanced” and “backward” societies.

Automated checks verify stable IDs, dates, coordinates, bilingual fields, references, route connections, snapshot membership and file integrity. They cannot establish historical truth, validate every map frontier or certify a source-to-claim match. Acceptance also needs editorial review and relevant browser checks.

When correcting content, retain IDs where possible so notebooks, courses and links keep working. Explain the changed claim, cite the evidence and identify whether the narrative, date, location, geometry or translation changed. Update source notes, hashes or notices when their underlying material changes; never alter a checksum merely to hide an unexplained difference.

## 8. Preserve the reference import and make review visible

The shared atlas preserves suitable historical material from the pinned Jiangshan source without turning every source row into a newly researched biography or essay. People, places, periods and connections are browsed with the rest of the atlas; source identity and review status remain in evidence metadata. The [import manifest](../dist/data/china-import-manifest.json) and [import audit](V5_CHINA_IMPORT.md) provide the accounting. The 442 milestones and 536 landmark rows produce **975 mapped events, two exact duplicate merges and one held record**. The held record remains available in the ledger with its original text and a reason; a point that conflicts with its narrative is not silently placed on the map.

| Source material retained | What readers should understand |
| --- | --- |
| 104 profile-directory entries | Names, aliases, supplied lifespans and links to matching event text; a directory entry is not a newly researched biography |
| 7 chronicles, 68 stops and 68 quoted excerpts | Chapters from the reference, retaining their source sequence and inherited interpretation |
| 87 city notes, 185 gazetteer entries and 20 passes | Different ways to find places and historical names; these are not 292 distinct cities or new events |
| 1,387 era-place rows | A place can recur in several source periods; this is not a count of unique settlements |
| 18 display periods and 165 phase rules | The reference map's presentation structure; these boundaries are not necessarily dynasty lifespans |
| 342 ruler/era-name rows | The selected naming conventions supplied by the reference, not every simultaneous regime or an exhaustive chronology |
| 16 schematic corridors | Source illustrations of walls, canals or connections; they do not establish exact routes or borders |

### People and place associations

A directory profile links to events whose source text contains matching names or aliases within the supplied lifespan. This helps discovery; it does not prove personal presence, authorship, a complete life story or that similarly named people are identical. Two profiles currently have no matching imported event links. Keep their source entries visible rather than inventing episodes to fill the gap. Newly authored biographies in `people.json` retain their own evidence and focus intervals while appearing in the shared People directory. The two confirmed Xuanzang and Zheng He overlaps are linked for discovery with both source identities preserved; matching names alone do not authorize another identity merge.

The shared Places directory groups exact representative point/name references and exposes nearby histories from all source collections. Its group count is not a verified count of distinct settlements. Gazetteer aliases help readers connect historical names with the reference's modern place descriptions. Matching a name or nearby coordinate does not establish continuous occupation, unchanged boundaries or an uninterrupted institutional history. Era-place rows preserve their source display windows, including source appearance and disappearance constraints. Those dates are not foundation or abandonment dates. A capital flag does not establish continuous capital status for every year in the window.

### Chronicle dates, quotations and map connections

A chapter date organizes a story. It can mark an arrival, appointment or campaign while its paragraph describes several later events. Date the associated works separately when evidence permits. For example, a chapter beginning with Su Shi's Huangzhou exile in 1080 can include works composed in 1082; a poem's composition date can also differ from the date of a surviving manuscript. The [review layer](../dist/data/china-reviews.json) records the supporting evidence and the specific distinction for affected stops.

Keep later literary remembrance distinct from testimony about the dated event. A quotation by a later poet does not inherit the year of the campaign it describes. Classical excerpts and the reference's English translations remain inherited text unless a particular attribution or translation has been checked against an appropriate edition. A review of a poem's date does not validate every quotation in that chronicle.

Qin Shi Huang's and Zhuge Liang's sequences are campaign chronicles. Connecting their battle locations is not proof that either person travelled each leg. The other source chronicles also carry schematic-route notes; exact paths, intermediate stop years and personal presence are not established merely by an ordered list. Preserve specific disagreements, such as Xuanzang's departure chronology or Li Bai's birthplace, instead of forcing uncertain evidence into an exact point and year.

### Frozen originals and separate corrections

The importer records the pinned commit, source file hashes and source-array pointers, then writes bounded chunks with checksums. The frozen output retains original wording, the duplicate and held ledgers, and the four initial neutral display amendments. Do not rewrite that baseline in order to make a later correction look like source text.

Use `china-reviews.json` for subsequent changes. An event review identifies an existing record, the changed fields, a bilingual explanation, sources and review date. A chronicle review identifies both the journey and stop and retains the original year, text and quotation for comparison. The application applies this layer to copies; the source files and their hashes remain intact. New original essays can supply deeper context through related-reading links while the inherited record remains available.

Review scope matters: an event can have a checked date or a corrected display summary while other inherited details remain provisional. A chronicle annotation can flag a compound date using the source's own wording, or cite independent scholarship for a specific correction. Say which occurred. Keep source notes and original text inspectable, show local date caveats beside the relevant chapter, and preserve disputed interpretations as attributed claims rather than silently adopting them.

Import validation checks every source-row pointer, file hash, ledger reference, directory count, date interval, coordinate and application link. Passing these checks establishes accounting and structure. It does not certify historical completeness or independently verify all imported claims. Rights and attribution are documented separately in [CONTENT_LICENSE.md](CONTENT_LICENSE.md) and the [preserved Jiangshan content notice](../dist/data/china-upstream.LICENSE.md).
