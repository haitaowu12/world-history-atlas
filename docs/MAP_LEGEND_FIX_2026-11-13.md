# Expanded wartime legend: navigation clearance

The open occupation legend shared the normal map controls’ bottom-left space. At 390 × 844, the legend intercepted zoom-out and reset. In the active WWII view it could also intercept Exit WWII map.

The expanded legend now reserves the bottom action bar, constrains its height with scrolling, and moves zoom controls into the existing upper-right rail. All opposing inset edges stay explicit, preventing the earlier stretched-controls regression. Closed legends and non-war maps retain their normal layout.

## Browser verification

Connected Chrome, local implementation preview based on c4a66f10:

- Chinese, normal and active war maps: 320 × 740, 390 × 844, 768 × 900 and 1200 × 900.
- English, normal and active war maps: 390 × 844.
- Left, centre and right hit tests reach all three zoom controls and the war-map toggle. Actual pointer activation enters and exits the active war map.
- Regular 1000 CE map: zoom in, zoom out and reset activate normally; no horizontal document overflow.
- Temporary viewport override reset afterward.

This is layout verification, not a claim that OS reduced-motion or background-tab behavior was tested. Existing People-default QA remains recorded separately.
