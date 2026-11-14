# Three North American landscapes: 1,029-entry checkpoint

Prepared 14 November 2026. **553 images illustrate 1,029/2,087 entries (49.3%)**, leaving 15 entries before half coverage. This adds three distinct photographs to three previously unillustrated entries; it does not change the denominator.

- **Hopewell:** Tom Engberg’s NPS photograph of Mound City Group. Caption and prose explicitly identify the reconstructed mounds and distinguish this complex from the representative map point at Hopewell Mound Group. The official 1,200 × 800 derivative is saved unchanged, rather than publishing the 7.4 MB original.
- **Cahokia:** the NPS-credited photograph on the official World Heritage article, not its separate third-party photograph. The scene is labelled as a modern view; no unsupported mound name, photographer or capture date is supplied.
- **Chaco:** the NPS photograph of preservation work at Pueblo Bonito, labelled 2007 by the source. The scene is not presented as ancient building activity. A short source-backed paragraph connects pottery-residue evidence to cacao exchange and distinguishes the chemical finding from interpretations about ritual and access.

All three final images were inspected individually. Item-level NPS credits and the NPS ownership policy support public-domain use in the United States. Credits state that no claim is made to original U.S. Government works. Third-party images on the same pages and NPS trademarks were not admitted. Exact URLs, dimensions, hashes and byte counts are retained in `v18-exact-assets-25-evidence.json` and the asset catalog.

The original historical intervals remain 1–400 (Hopewell), 800–1400 (Cahokia) and 850–1250 (Chaco). Modern photographs have separate dates. Frozen V17 data is unchanged. Original historical sources remain attached; four specific NPS source links were added across three follow-up records.

## Verification

- `npm run build:visuals`: 1,029 covered, 553 assets, target 1,044, target not yet met.
- `npm run check`: **614/614 pass**, no failures or skips.
- Chrome: Hopewell English and Chinese detail, image and reconstruction/map distinction; Cahokia and Chaco Chinese details, photo dates and source links. All three images loaded at their expected native dimensions.
- Responsive check at 390 × 844: Chaco image width 333 px, no horizontal overflow (document width 375 px), compact map controls 42 × 122 px. Viewport reset after inspection.
- A browser log recorded an unattributed `merchant` property error; that identifier is absent from Atlas JavaScript. All inspected Atlas detail and image flows completed successfully. This is not a claim of a clean browser-wide console.

This checkpoint is not yet published. The reviewed Samarkand increment `eff16889` was saved to the review branch after approval; main remains `a3b13e1` and the live site remains the verified 1,025-entry release. No GitHub Actions or deployment is part of this checkpoint.
