# Visual and content delivery review — 11 November 2026

## Scope and ownership

Reviewed application main `1b9156caf402d039057b9c1310da0e1a86318d89` and the deployed atlas. Applied the current frontend, interaction, visual-explanation and motion guidance from Second Brain integration `c0dea84f1c3dd8135d6f6c50bc894299d09371c5`.

The existing paper/green map identity and content organization remain appropriate. The visual-expansion work already has an active owner on `review/atlas-visual-expansion-20261110` (observed head `b735bf61b129f9effa69925edf0bffc466bd85a3`). The separate map/portrait fix branch `fix/atlas-map-controls-portraits-20261111` was also observed. This change does not replace either branch or claim its work. Integrate this timeline slice alongside those changes after reviewing any shared-file conflicts.

## Finding and implementation

Playback exposed glyph-only controls and a fixed interval. The atlas visits selected map dates and major events, so successive moments can have different gaps. A reader could not tell the next date or elapsed historical interval before stepping, or choose a reading pace.

The timeline now provides named Play/Pause controls, 3/6/10-second reading paces (6 seconds by default), date-specific previous/next labels, disabled endpoints and a visible next-date/elapsed-year cue. The uneven-time-step explanation remains visible and is connected to the slider and stepping buttons with `aria-describedby`. All new copy is available in English and Chinese. The chronology helper respects the civil calendar: 1 BCE to 1 CE is one year, with no year zero.

Playback continues to visit the original historical moments; it does not interpolate dates or territorial boundaries. Manual date changes retain their existing stop behavior. A change to the system reduced-motion preference stops a running timeline; the existing reduced-motion map behavior remains in place. The final moment now clears the timer immediately and returns the button to Play. The narrow layout wraps the additional context without imposing a fixed timeline height.

## Review corrections

Independent source review identified two issues in the initial change: a terminal state that stayed in Pause until an extra timer tick, and time-gap explanation available only on hover. Both are corrected. A production-handler regression checks immediate timer cleanup, the endpoint label, disabled Next and `aria-pressed=false`; another checks the visible bilingual gap and described-by connections.

## Verification and release status

- Content/schema validator: passed.
- Full Node suite: **331 tests passed**.
- Six focused chronology/playback checks cover nonuniform moments, BCE/CE chronology, bilingual terminal guidance, allowed reading paces, actual handler endpoint cleanup and accessible visible time context.
- JavaScript syntax and diff whitespace checks: passed.

The deployed baseline was inspected. The modified UI could not be rendered because local Chromium could not create its process-singleton socket and the cloud browser could not reach the isolated preview. No desktop/narrow pixel or browser-journey pass is claimed. Before integration, verify timeline wrapping at 390 px, both languages, keyboard/assistive descriptions, pace changes during playback, manual interruption, tab hiding and the final endpoint in a working browser.

Prepared as a review branch. No merge, deployment, content-image publication or GitHub Actions run is part of this slice. Commits use `[skip ci]` under the existing Actions pause.
