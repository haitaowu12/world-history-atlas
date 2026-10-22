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
| `locationPrecision` | `representative` for the current point-based atlas |
| `sources` | Nonempty list of `title`, `publisher`, and credential-free HTTPS `url` |

The supported date range is currently 13,000 BCE–2026 CE. Extending it requires updating the core time bounds, slider anchors and UI wording together. The end of an editorial interval must not imply the extinction of a living people or culture.

Avoid duplicate URLs within one entry. A source may support more than one entry if its actual contents support each claim.

In the change description, include:

1. The original claim, when correcting existing material.
2. The revised claim and exact supporting source passage/section.
3. Whether dates or coordinates are approximate.
4. The reason for the selected interval.
5. Any conflicting evidence or translation decision.

## Guided journeys

Journey definitions are in `dist/app.mjs`. The validator reads their literal IDs, fixed year (if any) and stop IDs without evaluating JavaScript.

Keep the existing single-line literal declaration format, or move journeys to a separate JSON file and update both the app and validator. Every stop must exist. The `world-1200` journey holds the year at 1200 CE; every stop must include 1200 and the sequence must preserve its stated six-region coverage.

Journeys are reading sequences. Do not draw a line implying contact, transmission or a real travel path without evidence for that additional claim.

## Run and verify

No package installation or build step is required.

```sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory dist
npm test
npm run validate
npm run check
```

The first command serves the app at http://127.0.0.1:8080. Run checks in another terminal.

For UI changes, inspect the affected behavior in a browser at desktop and narrow widths. Follow the relevant path: selected year, filters, detail panel, comparison, journey, notebook or shared link. Check keyboard focus and any error state the change affects. Report what was actually exercised; do not infer browser behavior from pure function tests.

For content changes, manually review source fit. Automated checks verify structure and temporal consistency, not historical truth. Avoid broad test expansion unrelated to the changed risk.

## Assets and dependencies

Runtime scripts and map geometry are local. Preserve that property. Do not add a CDN, tile service, font service or analytics dependency without a concrete reason and an explicit product decision.

When replacing a vendored asset, review its source/license, pin the version or commit, preserve notices, and update `dist/assets/PROVENANCE.json`. Run the checksum validator after the replacement. Do not merely change a checksum to silence an unexplained difference.

A historical political boundary layer requires the separate evidence gate in [history-geodata-review.md](docs/history-geodata-review.md). A story's sources do not validate a surrounding polygon.

## Licensing

Submit original code under this project's MIT license and original narrative contributions under the CC BY 4.0 terms in [CONTENT_LICENSE.md](docs/CONTENT_LICENSE.md). Identify any third-party material and preserve its separate license. Linking to a source does not relicense its text, images or data.

