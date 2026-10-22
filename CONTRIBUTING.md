# Contributing

Contributions should improve either the learning experience or the evidence behind it. Keep changes focused and identify whether they alter a historical claim, date, location, translation or application behavior.

## Start with the evidence

Read [DATA_POLICY.md](docs/DATA_POLICY.md). Every historical record needs inspected sources that support its particular claims and date interpretation. Prefer specialist institutions, museums, archives, heritage authorities and universities. A source URL passing validation does not mean its contents support the entry.

Write original English and Chinese summaries. Keep the same uncertainty and scope in both languages. Avoid copying source descriptions or converting a heritage inscription date into a historical event date.

Treat source selection and coverage as editorial choices. A named civilization, state, people, archaeological phase and historic site are different subjects. Explain how the mapped place illustrates the broader history.

## Add or correct a historical entry

Edit `dist/data/history.json`. Preserve an existing ID when correcting a record so notebooks and links continue to resolve.

Each record contains:

| Field | Requirement |
| --- | --- |
| `id` | Unique lowercase ASCII letters/digits separated by hyphens |
| `title.en`, `title.zh` | Localized title describing the historical subject |
| `start`, `end` | Ordered integer civil years; negative is BCE; never zero |
| `region` | A token from `REGIONS` in `dist/core.mjs` |
| `theme` | A token from `THEMES` |
| `summary.en`, `summary.zh` | Original, source-supported explanation |
| `dateNote.en`, `dateNote.zh` | What the interval means and any material uncertainty |
| `location.lat`, `location.lon` | Representative geographic coordinates |
| `location.label` | Name of the actual represented place |
| `locationPrecision` | `representative` for narrative location markers |
| `kind` | Explicit `polity`, `event`, `place`, `idea`, `culture` or `person` |
| `sources` | Nonempty list of `title`, `publisher`, and credential-free HTTPS `url` |

The supported date range is currently 13,000 BCE–2026 CE. Extending it requires updating the core time bounds, slider anchors and UI wording together. The end of an editorial interval must not imply the extinction of a living people or culture.

Avoid duplicate URLs within one entry. A source may support more than one entry if its actual contents support each claim.

In the change description, include:

1. The original claim, when correcting existing material.
2. The revised claim and exact supporting source passage/section.
3. Whether dates or coordinates are approximate.
4. The reason for the selected interval.
5. Any conflicting evidence or translation decision.

## People and milestones

People live in `dist/data/people.json` and use the shared historical-record fields, a personal name and `kind: "person"`. Their `start` and `end` describe the stated focus period, which need not be a complete lifespan. Each milestone has a supported civil year, bilingual title and description, and a representative location.

Explain approximate dates and locations. A sequence of milestone places does not establish a documented travel path. Preserve profile IDs when adding milestones so notebooks and linked teaching materials keep working.

## Routes and networks

Edit `dist/data/routes.json`. Distinguish a documented `journey` from a `network` whose nodes and branches can span a broad period. Include source-specific explanations, a date note, a geometry caveat, representative stop locations and explicit `legs` with `from`/`to` references and evidence notes.

Every leg must connect existing stops and have a basis in the cited evidence. Do not turn the stop array into a fictional linear itinerary. Leave a stop's year as `null` when no single date is claimed. Displayed connections are schematic, not surveyed roads or sea tracks. Network nodes need not have been equally active at once.

Validate `personIds` and `relatedIds` against the combined history and people collection. Be explicit about coercion, displacement and resistance when those processes explain a connection.

## Guided readings and study guides

The six original reading definitions are in `dist/journeys.mjs`; the validator imports them directly. Eight study guides are in `dist/data/courses.json`, with `recordIds`, `routeIds`, bilingual questions, an activity and an evidence policy.

All referenced records and routes must exist. The `world-1200` reading holds the exact year at 1200 CE, so every stop must include 1200 and the sequence must support its stated regional coverage. Check both the description and source evidence when changing a sequence.

Readings are editorial sequences. They are not physical journeys or evidence of direct historical contact. Course questions and activities should help interpret the linked records; they must not quietly introduce unsupported factual assertions.

## Historical map layers

Read [MAP_METHODOLOGY.md](docs/MAP_METHODOLOGY.md) before changing historical geometry. Narrative sources do not validate nearby territorial polygons.

Preserve source-specific files and notices. A new feature needs a supported snapshot date, an immutable geometry source, appropriate attribution, a clear geographic meaning and a documented review scope. When updating `dist/data/map-snapshots.json`, keep layer hashes, counts and feature membership consistent with the actual data. Record transformations and exclusions.

Never fill a gap with a capital-centered circle, a modern border or an unsupported sketch. Do not interpolate sovereignty between snapshot dates. Check spherical winding, antimeridian behavior, holes and degenerate geometry, as well as whether the named polity and depicted area belong in that year.

## Run and verify

No package installation or build step is required.

```sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory dist
npm test
npm run validate
npm run check
```

The first command serves the app at http://127.0.0.1:8080. Run checks in another terminal.

For UI changes, inspect the affected behavior in a browser at desktop and narrow widths. Follow the relevant path: selected year, map snapshot, filters, detail panel, comparison, person milestone, route stop, reading step, challenge, notebook or shared link. Check keyboard focus and any error state the change affects. Report what was actually exercised; do not infer browser behavior from pure function tests.

For content changes, manually review source fit. Automated checks verify structure and temporal consistency, not historical truth. Avoid broad test expansion unrelated to the changed risk.

## Assets and dependencies

Runtime scripts and map geometry are local. Preserve that property. Do not add a CDN, tile service, font service or analytics dependency without a concrete reason and an explicit product decision.

When replacing a vendored reference asset or D3, review its source/license, pin the version or commit, preserve notices, and update `dist/assets/PROVENANCE.json`. Historical geometry uses the separate source records and hashes in `dist/data/map-snapshots.json`. Run the checksum validator after a replacement. Do not merely change a checksum to silence an unexplained difference.

The old [history-geodata-review.md](docs/history-geodata-review.md) is retained as a v1 decision record. Current historical geometry follows [MAP_METHODOLOGY.md](docs/MAP_METHODOLOGY.md) and the source-specific requirements in [DATA_POLICY.md](docs/DATA_POLICY.md).

## Licensing

Submit original code under this project's MIT license and original narrative contributions under the CC BY 4.0 terms in [CONTENT_LICENSE.md](docs/CONTENT_LICENSE.md). Identify any third-party material and preserve its separate license. Linking to a source does not relicense its text, images or data.

