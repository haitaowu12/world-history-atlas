# Historical data policy

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
| `people.json` | Profiles with the common record fields plus separately dated and located milestones |
| `routes.json` | Journeys or networks with explicit stops, connections, uncertainty notes and route-specific sources |
| `courses.json` and `journeys.mjs` | Editorial reading sequences and study prompts linked to existing records |
| `territories*.geojson` and `map-snapshots.json` | Source-specific approximate territorial geometry at exact snapshot years |
| Natural Earth assets | Present-day reference geography for orientation |

Narrative records share a stable `id`, bilingual `title`, `summary` and `dateNote`, `start`/`end`, `region`, `theme`, `location`, `locationPrecision` and `sources`. Explicit `kind` values distinguish polities, events, places, ideas, cultures and people. Declare the kind explicitly for new records; the app retains inference only as a fallback for older compatible data. Importance values are editorial display choices, not measures of a society's worth.

A historic site can illuminate political, artistic, scientific, economic, religious or social history, but a heritage listing is not a proxy for an entire civilization. Explain how the mapped place relates to the broader process. Avoid reducing every society to a ruler, monument or conquest.

## 3. Locations are representative

Coordinates identify a selected place or an illustrative centre relevant to a narrative. A point does not specify territorial extent, the origin of an entire culture, an exclusive claim to invention or modern political ownership.

For broad traditions and dispersed activity, name the actual representative place and explain its role. Use precision appropriate to the evidence. An exact-looking coordinate must not conceal a poorly located historical event. The same principle applies to person milestones: their pins represent the places described, not a continuously reconstructed trajectory.

The “history near this place” view compares representative points within a geographic radius. It does not establish continuity of settlement, institutional succession, influence or shared sovereignty. Similarly, contemporary records are not necessarily causally connected. Similar dates or artifacts alone do not establish diffusion.

Natural Earth's land, rivers and optional modern country outlines are geographic references. They do not reconstruct ancient shorelines, sea levels, river courses or historical political borders. Modern country outlines remain optional and are off by default.

## 4. Sources belong to the claim

Every published historical record needs inspectable source URLs, titles and publishers. Prefer specialist museums, archives, heritage authorities, universities and institutional research. Use the record's source list to support its particular dates, location interpretation and narrative. A repository bibliography alone is insufficient.

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

The six original readings and eight study guides are editorial teaching sequences, not physical routes. Course `recordIds` and `routeIds` point to the evidence-bearing collections. Questions and activities are prompts for interpretation, not new historical claims or graded factual answers.

Keep prompts connected to the cited records. Avoid presenting uncertain dates as exact quiz answers. The map challenge measures distance to representative atlas points; its score is feedback for geographic orientation, not an assessment of historical understanding.

## 6. Historical territories have a separate review process

The v2 collection includes 15 selected dated snapshots from 500 BCE to 1960 CE. It is not a complete historical GIS or an annual reconstruction. The current source selection, transformations, exclusions and review limits are in [MAP_METHODOLOGY.md](MAP_METHODOLOGY.md).

Every layer must preserve:

- Its source repository, immutable commit, source path, original license and relevant notices.
- The actual source snapshot year and the source's BCE/CE convention.
- Feature IDs, names, the intended geographic meaning and source evidence.
- Per-feature uncertainty and review scope, including whether geometry is independently reconstructed.
- Checksums for source and distributed files, with documented transformations.
- Validation for spherical winding, antimeridian behavior, holes, invalid coordinates and degenerate components.

Institutional sources can confirm a polity's existence and broad geographic setting without validating each imported boundary vertex. The current selected Historical Basemaps outlines are reviewed on that limited basis. Known chronology or geographic problems justify exclusion; an “approximate” label does not excuse a wrong-period polity.

The map selects the nearest earlier or equal snapshot and displays its real year. If the narrative year is later, the age of the held map remains visible. Never interpolate sovereignty between dates, carry a later snapshot backward, or imply that a held outline describes every intervening year. Previous-snapshot outlines remain separately dated.

Claim, administration, influence, tributary relations, cultural range and trade connections are different geographic concepts. Do not merge them into a single undifferentiated territorial claim. Empty space means no selected geometry.

### Source-specific notices

Historical Basemaps geometry, AWMC geometry and Jiangshan schematics remain in separate files with separate license notices. The application code's MIT license does not relicense them.

The three Jiangshan shapes are explicitly labeled **“Jiangshan schematic outline”** and retain their original focus intervals. The upstream README declares GPL-3.0 while its root LICENSE is MIT; both notices are preserved. The source references several historical resources without identifying each outline's derivation. Document that unresolved provenance rather than asserting that the outlines were copied from CHGIS or that all upstream material is MIT. No CHGIS download is included in this release. See [the preserved notice](../dist/data/territories-jiangshan.LICENSE.md).

Do not generate a missing territory from a capital point, a circle, modern country borders or an unsupported freehand shape. A new schematic needs explicit historical map evidence, permissible reuse, a date and an honest statement of its precision.

## 7. Coverage and corrections stay inspectable

The v2 corpus spans nine editorial regions but is selective and uneven. Counts describe material included; they are not a sampling measure of historical importance or completeness. Expose empty filter states and keep regional counts inspectable.

Expansion should include underrepresented periods, women's histories, Indigenous and living-community perspectives, daily life, environment, labour and institutions alongside political history. Africa, the Americas and Oceania deserve depth as well as wider geographic distribution. Do not organize all global history solely through European period names or a hierarchy of “advanced” and “backward” societies.

Automated checks verify stable IDs, dates, coordinates, bilingual fields, references, route connections, snapshot membership and file integrity. They cannot establish historical truth, validate every map frontier or certify a source-to-claim match. Acceptance also needs editorial review and relevant browser checks.

When correcting content, retain IDs where possible so notebooks, courses and links keep working. Explain the changed claim, cite the evidence and identify whether the narrative, date, location, geometry or translation changed. Update source notes, hashes or notices when their underlying material changes; never alter a checksum merely to hide an unexplained difference.
