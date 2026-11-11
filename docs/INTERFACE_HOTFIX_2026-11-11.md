# Map controls and default portraits

Base: main `1b9156caf402d039057b9c1310da0e1a86318d89`. The V18 expansion is deliberately excluded. Both refreshed README files and their image remain unchanged.

## Cause and changes
- In WWII mode with a history entry open, the later `.detail-open .map-controls` theme rule restored `left` and `bottom`, while the war rule still set `top` and `right`. With automatic dimensions the controls stretched across the map. The war selector now outranks detail/responsive selectors and sets the complete inset, clearing the opposite edges.
- The People checkbox filtered people with portraits; it did not enable images. Removed its UI, filter state and unused CSS. Available thumbnails remain automatic, and people without portraits remain searchable and visible. Image alt text, source credits and missing-image behavior are unchanged.

## Verification
- `npm run check`: 327 tests passed, no failures or skips. Added a CSS regression guard and bilingual directory tests, including missing media and unillustrated-person search.
- Real cloud Chrome, local preview of these files: 1168, 700 and 500 CSS-pixel viewport widths. Reproduced the live failure (791 by 228 pixels), then verified the fixed WWII controls with an entry open measure 38 by 110 pixels on desktop and 42 by 122 on narrow layouts. Regular-map controls also remain compact.
- Keyboard Enter activates zoom and retains button focus. Zoom-out and reset respond.
- English and Chinese directories show all 278 people. Initial pages retain 48 cards with available portraits. No portrait checkbox remains. Search, a loaded Harriet Tubman portrait and source credits, return state, and expanding to 96 cards were checked. Narrow directories have no horizontal overflow.
- Updated the standalone browser-acceptance script for future regression runs. It was syntax-checked, not executed in this turn; actual browser acceptance used the supported shared Chrome controls.
- No GitHub Actions were started. No V18 assets or content are included.
