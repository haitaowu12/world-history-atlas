# Neighboring political colors · 0.15 display patch

26 October 2026. Requested behavior: nearby countries and political regions should have distinguishable fills unless a shared shade has a specific display meaning.

## Correction

The earlier eight-color identity palette had no spatial constraint. Different identities could hash to the same shade, including neighboring Albania/Serbia and Armenia/Azerbaijan in the shipped modern data. Adding individual country overrides would leave the same failure available elsewhere and at other dates.

`dist/map-palette.mjs` now builds a proximity graph from the currently selected political/cultural source geometries, then assigns deterministic mineral colors. Borders are sampled on the sphere at intervals of at most 100 km and compacted into approximately 25 km geocentric cells. Samples within 250 km connect display groups. This captures shared borders and nearby islands; it also handles the antimeridian, polar areas and long borders whose centroids are far apart. The distance is a cartographic display heuristic, not a border or sovereignty test. It is intentionally approximate near the distance cutoff.

A saturation/degree ordering separates connected groups. Among available shades, perceptual distance favors clearer contrast while retaining an identity's preferred color when practical. Extra muted shades, followed by deterministic overflow colors, handle dense overlapping/colonial networks without silently reusing a neighboring shade. Source order and UI language do not determine the result. Distant regions may reuse a shade; a new date/source composition can change the assignment. Zooming, panning and story filters do not recolor an unchanged composition.

## Deliberate shared or neutral styling

- Taiwan/mainland China retain the user's requested shared display shade. Source identities, dates, dispute qualifiers and geometry remain distinct.
- Multiple pieces of the same political identity retain one shade. Dated US/Canada source divisions retain their national/parent grouping with internal boundaries; statehood does not substitute for an acquisition date. Independent parent groups such as Newfoundland remain separate graph nodes.
- Recorded competing claims retain their existing hatch treatment. Gray 2022 administrative reference outlines remain geographic reference; they do not become political fills or acquire historical meaning.

No historical geometry, narrative, source color, date or source ID changes. Color assignment is a display operation. The map, legend and evidence list use the same palette. The North American parent-group key now reads the actual composed palette rather than independently calculating a preferred color from an isolated label feature.

