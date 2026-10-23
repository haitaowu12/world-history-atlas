# V4 temporal rendering review

## Scope and acceptance standard

This review addresses the loss of political colors and names between the dated maps in V3. V3 correctly stopped an old map from becoming the map of an unrelated later year, but its exact-year-only rendering removed all political context between checkpoints. The new behavior must preserve useful regional context while keeping the selected year, the geometry's source year, and the limits of the editorial review separate.

This is a bounded review of temporal selection and rendering behavior. It is not a reconstruction of every historical border. The earlier actual-year geometry exclusions remain in force; their evidence and limits are recorded in [the V3 temporal audit](TEMPORAL_AUDIT_V3.md).

## Temporal selection contract

The implementation is in [the atlas model](../dist/atlas-model.mjs). Historical features retain their original `year` and also carry `sourceYear`. An optional `contextValidity` object contains inclusive `start` and `end` civil years, an explicit `backwardReviewed` boolean, a bilingual editorial note, and evidence URLs.

| Situation | Required result |
| --- | --- |
| Selected year equals a feature's source year | The feature is eligible at that date, including when no context interval is supplied. |
| Selected year falls after the source year | The feature is eligible only inside its explicit reviewed interval. A state's lifetime alone does not establish geometry validity. |
| Selected year falls before the source year | The feature also requires `backwardReviewed: true`. An interval alone does not authorize future geometry. |
| Several phases of one polity are eligible | Select the most recent eligible prior phase. Only if no prior phase is eligible, select the earliest explicitly reviewed future phase. Return at most one feature per polity. |
| A context interval is missing, malformed, or exhausted | Do not extend that outline outside its exact source year. |
| A dated map checkpoint also has eligible outlines from other source years | Retain those outlines for continuity, but classify the displayed map as `context`. Preserve the exact checkpoint in `snapshot` as provenance. |
| All selected outlines belong to an exact checkpoint year | Classify the map as `historical`. |
| The contemporary reference applies to a reviewed year or bounded reviewed range | Use its separately checked features, period names, and historical fallbacks. Do not add the old historical context bundle indiscriminately. |
| No reviewed political outline applies | Keep geographic labels and dated stories available. Do not invent political boundaries. |

`exactSnapshot` remains an exact lookup. In a mixed map, a non-null `snapshot` is a source checkpoint, not proof that every displayed outline was drawn for that date. `mapCoverage` exposes the selected features and distinct source years so the renderer can state the difference.

Civil years are signed integers, with no year zero. Inclusive intervals crossing from 1 BCE to 1 CE must neither manufacture a year-zero view nor create an extra year in the chronology.

## Transition regressions

The data review uses political phases rather than treating a single named state's entire existence as a safe display interval. The following are conservative display cutoffs agreed with the data review; they do not claim that every political transition happened on 1 January.

| Polity identifier | Latest permitted context year | Regression purpose |
| --- | ---: | --- |
| `ussr` | 1991 | No Soviet Union in 1992 or later, including 2026. |
| `westgermany`, `eastgermany` | 1989 | The 1990 transition uses a separately reviewed unified German outline. |
| `ming` | 1644 | The imported Ming outline cannot survive into the later Qing context. |
| `qing` | 1911 | The imperial outline cannot persist after the Republican transition. |
| `russian` | 1916 | The imported Russian Empire outline cannot silently span revolution and civil war. |
| `yugoslavia-kingdom` | 1940 | Kingdom and socialist phases must be distinct. |
| `yugoslavia-sfr` | 1990 | The socialist federation cannot persist through the breakup as an unchanged state. |

The Kingdom of Yugoslavia, socialist federation, and later Federal Republic must not share an unqualified lifespan. A later phase requires its own reviewed geometry. The [phase registry](../scripts/map-context-curation.cjs), feature-level evidence, records the applicable sources, phase bounds, and exclusions.

## Modern backward-context checks

The contemporary layer's [documented source conventions](CONTEMPORARY_MAP_METHODOLOGY.md) include a 2022 source vintage and a separate review year. Those dates must remain visible when the layer is used as context for other years.

In particular, the source convention for Russia and Ukraine cannot be applied indiscriminately to 2011–2013. The agreed design uses eligible 2010 historical outlines as explicitly identified fallbacks for modern country codes `RUS` and `UKR` in those years. Their original geometry source year, license, sources, and notes must survive the identity mapping. The country code must occur only once in the rendered result.

The contemporary reference also needs period names. Turkey/Türkiye, Czech Republic/Czechia, Swaziland/Eswatini, and Macedonia (FYROM)/North Macedonia are checked at their reviewed annual cutovers. Naming changes do not authorize an unreviewed boundary change. Palestine's dated category is checked separately at 2011, 2012, and 2026; its Natural Earth code `PSX` is kept distinct from ISO code `PSE`. The Crimea reference hatch must not apply before its reviewed 2014 start. The main map preserves its selected year when a country is opened; the dedicated current-country directory explicitly opens the reviewed contemporary year.

## Additional backward-context defect: Russia in 1750

A targeted geometry check found that the `1783-russian` source polygon contains the point at Simferopol, approximately 34.1° E, 44.95° N. Its original reviewed interval began in 1721, which allowed that later Crimean footprint to appear in the 1750 map. The [Library of Congress chronology](https://blogs.loc.gov/law/2014/03/crimean-history-status-and-referendum/) distinguishes earlier Russian intervention from Crimea's annexation and provincial incorporation in 1783.

The corrected 1783 outline's display interval starts in 1783. A separately dated `1715-russian` predecessor supplies context for 1715–1782, with period names for the Tsardom and Empire. The added regression verifies that the later outline cannot be used before 1783 and that any Russian outline selected at 1750 excludes the Simferopol point. It failed against the original interval and passed after the data correction. This demonstrates why a state's continued existence is insufficient evidence for reusing a later territorial footprint.

## Additional actual-year defect: United Kingdom in 1930

Independent point checks found that the upstream 1930 polygon named `United Kingdom of Great Britain and Ireland` contains Athlone, at approximately 7.94° W, 53.42° N, well inside the Irish Free State. The 1920 source also contains this point, appropriately for that source date. The 1938 United Kingdom source excludes Athlone while retaining Belfast and London.

The [House of Commons Library's treaty briefing](https://commonslibrary.parliament.uk/research-briefings/cbp-9260/) dates the treaty's entry into effect and the creation of the Irish Free State to 6 December 1922. Its [border briefing](https://commonslibrary.parliament.uk/research-briefings/cbp-9105/) distinguishes the existing administrative border, its position as a UK–Free State border by the end of 1922, and its confirmation in December 1925. A 1930 UK outline that includes central Ireland is therefore an actual-year source error, not an issue that can be repaired by changing its display name.

The agreed correction excludes that 1930 outline, ends the 1920 outline's context at 1922, and uses a separately dated, explicitly reviewed later UK outline for subsequent context. The geometric regression checks Athlone, Belfast, and London at 1923, 1930, 1938, and 1945. These are targeted checks of the identified defect, not a proof of every point along the border.

## Rendering and interaction findings

The V3 behavior is directly explained by [the app's map selection and rendering functions](../dist/app.mjs): an intermediate year produced an empty feature array, removed the political paths and labels, and hid the legend. The V4 map must use the context-aware result consistently for paths, labels, legend, feature panels, and the inspection API.

The following integration checks are required in addition to model tests:

- A map at a checkpoint must not lose regions simply because that checkpoint contains a small curated subset. Mixed-source context must be identified in the status text and each feature's detail panel.
- Opening a context outline must preserve the selected year. Related-story filtering must use that year where appropriate; a link to the source map must be an explicit dated action. Using `feature.properties.year` indiscriminately would move the reader back to the geometry's date.
- Colors should be stable for a polity across source changes. The source year must not accidentally become the palette key.
- Territory labels must remain readable when zoomed, when the viewport changes, and at mobile overview scale. A fixed area cutoff can remove every small-state label even while its outline is present. Selected labels need priority, and geographic orientation labels should remain legible in unshaded early years.
- Label collision decisions should use screen coordinates and account for the visible viewport. Independent label layers can still collide with one another and with controls; this needs visual review rather than a model-only assertion.
- D3 zoom previously recomputed `geoArea` and, when needed, `geoCentroid` for every visible feature on every zoom event. Those geometry metrics are stable and can be cached. Projection and zoom transforms still need updating after a resize.
- Slider input must be coalesced to the latest value per animation frame. A direct action, such as a year-form submission, map-date jump, country selection, URL navigation, or playback action, must cancel an older queued slider update before it can overwrite the chosen view.
- Mobile detail opening can change map dimensions and trigger `ResizeObserver`. Preserve or deliberately refocus the selected location after projection changes; do not attribute a changed zoom to a changed year.

The V4 code review confirms that context-aware feature selection is shared by the map and its labels, feature panels separate viewing year from outline source, and the geometry metrics and projected paths are cached. The frame queue is covered by a pure scheduler test rather than a test that duplicates DOM implementation details. Visual and mobile acceptance are handled in the main application review.

## Limits that remain material

Temporal metadata can prevent a known ended or not-yet-founded polity from being displayed, but it cannot prove that an imported polygon accurately represents every part of a territory throughout an interval. Source scale, contested control, federations, and overlapping claims require source-specific review. Combining reviewed regional context does not produce a synchronized global border survey.

For earlier years and unsupported regions, geographic context and sourced place-based histories remain useful without political shading. Missing political coverage must be described plainly. The atlas must not imply that neutral land was uninhabited or had no political organization.
