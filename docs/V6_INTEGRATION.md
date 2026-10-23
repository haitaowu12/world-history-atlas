# V6: one atlas for people, places and histories

Implementation record dated **23 October 2026 UTC**. V6 reorganizes the existing material into shared navigation and discovery. It does not add historical narratives or claim that every region now has the same depth.

## Why this changed

V5's 975 source-derived events already participated in the map, timeline, comparisons, notebook and contemporaneous histories. Its seven chronicles also appeared among the mapped journeys. The separate China library nevertheless put person indexes, historical names, period references and corridor descriptions behind a source-specific destination. Main search labelled those additional results as a China collection, and source-collection URL filters could hide one part of the corpus.

V6 organizes these features around **Atlas, Timeline, Journeys, People and Places**. Origin and review status remain available in evidence sections. Source chunks, stable identifiers, import accounting, original wording and license notices remain intact.

## What is shared

| Surface | Current behavior |
| --- | --- |
| Atlas and timeline | All 1,317 selectable entries use the same date, region, theme and entry-type controls |
| People | One directory contains 126 identified people, with search, region filters, date filtering and regional/chronological/alphabetical ordering |
| Places | One directory contains 1,384 representative point/name groups, with historical aliases and links to the shared map |
| Main search | Searches the common people/place indexes and shared period, calendar and connection references alongside matching entries |
| Timeline references | 86 period guides combine eight global editorial windows, 60 polity article focus periods and 18 regional source display windows |
| Calendars and reign names | 342 retained ruler/reign-name points; the current reference covers Chinese chronology and states that scope |
| Journeys and connections | The existing 15 mapped journeys, networks and chronicles remain together; Roads & waterways combines them with 16 description-only corridor references |
| Related reading | Forward and reciprocal links expose related entries without requiring a source-specific browsing mode |
| Sources & method | Shared source disclosure and a combined JSON export provide access to entries, routes and reference inventories |

The historical entry count remains **1,317 = 318 essays + 24 biographies + 975 source-derived events**. The underlying source inventory remains **978 event rows = 975 mapped + two duplicate rows merged + one held location mismatch**. V6 changes how those records are reached, not their underlying historical claims.

## Identity and association rules

### People

The directory contains **126 people = 24 biography records + 104 source profile records − two confirmed overlaps**. Xuanzang and Zheng He have explicit profile-to-biography identity links. Both original IDs resolve to the shared person page, and aliases and associated event links remain available.

This is a discovery merge, not a rewrite of the evidence. A biography focus period can describe a selected part of a life; an inherited profile span carries its own status. Those date assertions remain separate. No other people are merged solely because their names resemble one another. Source indexes are not relabelled as independently researched biographies.

Person pages link matching mentions across the entire atlas. Name matching helps readers find relevant text; it does not prove that a person visited every represented location, authored every associated work or participated in every event.

### Places

The directory's **1,384 groups** combine records with an exact representative coordinate and normalized point name. Different names, nearby sites and historical succession are not merged by inference. This count is therefore not a count of verified distinct cities or settlements.

Place pages show records at the reference point, available descriptions and historical-name rows, and nearby histories within 20 kilometres drawn from the whole corpus. They preserve the distinction between spatial proximity and historical identity. The 1,387 period-place rows retain source display windows; these are not verified foundation or abandonment dates. Undated geographic references remain available without invented occupancy dates.

### Periods and connections

Period cards distinguish editorial time windows, an article's focus period and a reference display window. Opening the Northern Song reference window can show intersecting histories from every region and source. The bounds of the reference project's period are never substituted for a dynasty's lifespan.

The 31 Roads & waterways references comprise **15 mapped collections plus 16 descriptions**. A description does not acquire route geometry. Mapped connections retain their existing schematic qualifications and explicit legs. Calendar entries retain their selected-sequence limitations, including the explanation that the Republic of China row's 1949 source-display cutoff is not a claim about the state's continued existence.

## Relationships, search and saved views

Related reading now considers incoming as well as outgoing `relatedIds`. For example, the Northern Song essay exposes **74** linked source-derived events. Explicit links retain priority, duplicate links are removed, and the helper does not infer additional transitive relationships. More linked entries can be revealed without rendering the entire list initially.

Source origin is no longer a main-interface filter. Legacy hashes containing `collection=jiangshan` or `collection=atlas` normalize to the complete corpus; rewritten shared URLs omit that parameter. Other supported filters and selections remain meaningful. A previously saved source-filtered URL cannot silently restore the old separation.

Shared URLs also preserve `person` and `place` directory selections. Historical aliases resolve through the shared place index, including names such as 成周. Existing event IDs, route IDs, notebook references and the two linked profile IDs remain usable. A directory page does not manufacture a new map record or a verified personal location.

## API and exports

- `search(text, options)` searches shared people, places, periods, calendars and connections, with region, semantic-kind and year options.
- `resolveHistoricalPlace(text)` uses the worldwide place index and historical aliases.
- `resolvePlace(text, year)` continues to return matching selectable records through the existing record-text lookup.
- `locate({year, place, person})` can open a shared directory page or fall back to selecting a matching historical entry.
- `collections()` retains provenance-accounting counts and the fixed source commit; it does not define separate browsing products.

Sources & method can export a combined JSON document containing all 1,317 selectable records, mapped routes, person source indexes, named-place references, period-place rows, period references, reign names, corridor descriptions and the source manifest. Original source identities, review information and notice references remain in that export. Personal notebook notes use their existing separate export. The complete source archive also includes application code, geometry, study guides, tests and documentation.

## Evidence and licensing retained

The frozen import and targeted review overlay remain separate at the data level. The existing **two event revisions and 24 chronicle annotations** retain their evidence scope and original wording. Moving provenance below the main narrative does not mark inherited material as independently corroborated.

The source ledger, held-record explanation, fixed commit, checksum manifest and upstream notices remain accessible through Sources & method. Original narrative, imported text, quotations and geometry retain their respective notices; integration does not relicense them. See [the import audit](V5_CHINA_IMPORT.md), [research and corrections](V5_RESEARCH_AND_REVIEW.md), [data policy](DATA_POLICY.md) and [content notices](CONTENT_LICENSE.md).

## Source authority and remaining limits

The authoritative implementation is the standalone source repository backing the public Site and its matching release archive. The GitHub mirror under `world/` on the `world-history-atlas` branch of the user's Jiangshan fork is still **V2**. It must not be described as current V6 until a synchronization and commit/file verification have completed.

China retains greater event density than most regions, and independent review of the inherited corpus remains incomplete. The calendar reference currently contains Chinese reign-name material. The shared discovery architecture allows further regional contributions to enter the existing views; it does not itself fill historical gaps. Continue with .
