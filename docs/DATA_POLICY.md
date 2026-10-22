# Historical data policy

This atlas is an educational index of selected histories. It is not an exhaustive account of the world, and a missing record never means a region was uninhabited or lacked history.

## 1. Time means a selected historical interval

- Use signed civil years: -1 is 1 BCE; 1 is 1 CE. There is no year zero.
- Every record must declare a start and end. Start must not be after end. The application's public dates and links use the same convention.
- A record's interval is the period discussed in that record. It must not be presented as the full lifetime of a culture, people, language, practice, or institution unless the cited evidence supports that claim.
- A single-year event has equal start and end. A long process or selected archaeological phase may span many years.
- State whether the interval is approximate, conventional, debated, or precise. Do not silently convert an archaeological date range into an exact foundation or collapse year.
- Distinguish an event date from a date of construction, occupation, discovery, inscription, publication, or modern heritage designation.
- The corpus's minimum and maximum years describe editorial coverage, not the beginning or end of world history.
- The UI must identify whether a filter means “active in this year,” “overlaps this selected period,” or “all records.” These are different questions.

## 2. A point is a representative location

Coordinates locate the selected place or an illustrative centre relevant to a narrative. A point does not specify territorial extent, origin of an entire culture, an exclusive claim to invention, or modern political ownership.

Represent broad networks and dispersed traditions with a named representative site and a visible location note. Coordinates should have a precision appropriate to their source. Do not invent an exact coordinate for a vague historical location. Route lines, if added, must distinguish documented paths from schematic connections between known stops.

The base land geometry represents modern physical coastlines at small scale. It does not reconstruct ancient coastlines, sea levels, rivers or lake extents.

## 3. Separate events, places, cultures, polities and map snapshots

A historic site can illustrate political, artistic, scientific, economic, religious or social history, but UNESCO inscription is not a proxy for a complete civilization.

Records should explain the historical process, the role of the mapped place, and why the selected date matters. Prefer summaries that connect an observable practice or material trace to a larger question. Avoid reducing every society to a ruler, monument or conquest.

Living cultures and Indigenous peoples continue beyond an archaeological phase or selected interval. Describe cultural continuity where applicable; avoid an interface that implies disappearance when a period ends. Avoid a single hierarchy of “advanced” and “backward” civilizations.

Two contemporaneous records need not be causally connected. Similar dates or artifacts alone do not establish influence or diffusion.

## 4. Sources are part of each record

Every published record needs one or more inspectable source URLs and a publisher/title. Prefer specialist museums, archives, heritage authorities, universities and original institutional reports. A bibliography in the repository does not replace per-record evidence.

For each entry:

1. Open the cited source and verify that it supports the particular date and narrative.
2. Write a short original summary; do not copy a source's descriptive paragraph.
3. Record the date interpretation and any uncertainty that materially changes the claim.
4. Use a second source for a disputed date, broad causal claim, contested attribution, or source conflict.
5. Distinguish source-supported facts from editorial questions, framing and selection choices.

A general institution homepage, search-result snippet, or adjacent topic page cannot support a specific claim merely because the institution is authoritative. A failed or blocked source must be recorded as unverified until inspected. Link reachability is not evidence of historical correctness.

Chinese and English versions must preserve the same scope and uncertainty. A translation must not become more certain or introduce an additional claim.

## 5. Coverage is inspectable

Describe the release as a curated starting corpus. Report counts by region and theme, and expose empty filter states. Do not claim a representative sample or complete coverage without a defined sampling method.

Editorial priorities include Africa, the Americas and Oceania alongside Asia and Europe; Indigenous histories; trade and migration; agriculture and food; cities and institutions; science and technology; art and belief; and political change. Avoid interpreting global history through a sequence of European period names alone.

Contributions should extend underrepresented subjects instead of adding only more entries to already dense places. Different periods may require different levels of geographic detail.

## 6. Historical boundaries are a separate review lane

The first release must not present hand-drawn shapes, modern borders, or point-centred circles as historical territories. If historical snapshots are later introduced, each layer requires:

- an immutable source reference, its actual snapshot year and original license;
- a check of the dataset's BCE/CE convention;
- explicit handling of sparse chronology, disputed borders and unknown areas;
- the source's precision and uncertainty fields where available;
- a visible distinction between the selected story year and the available map year;
- antimeridian, polygon-hole and geometry validation.

Do not interpolate sovereignty between two snapshot years or silently carry a later snapshot backward. A blank area means the dataset has no depiction, not that nobody lived there. Claim, administration, influence, cultural range and tributary relationships are different kinds of geography and must not be merged.

The upstream Jiangshan repository has inconsistent top-level license signals (MIT LICENSE, GPL-3.0 README) and cites GPL-3.0 historical-basemaps data. Its embedded polygons are not assumed to be uniformly MIT. Historical boundary imports remain outside the initial corpus until their chronology, attribution and license handling are reviewed.

## 7. Validation and correction

Automated checks verify structure: stable unique IDs; valid coordinates; localized strings; source presence; nonzero ordered dates; supported region/theme values; and valid journey references. These checks cannot establish historical truth.

Acceptance also requires a human-readable sample review of dates, summaries and source fit across regions. Corrections should preserve record IDs where possible, explain the changed claim, cite the evidence and identify whether the map, narrative, date or translation changed. A changed fact should not be hidden as an unexplained formatting update.

