# Visual and content delivery review — 11 November 2026

## Scope and ownership

Reviewed application main `1b9156caf402d039057b9c1310da0e1a86318d89` and the deployed atlas. Applied the current frontend, interaction, visual-explanation and motion guidance from Second Brain integration `c0dea84f1c3dd8135d6f6c50bc894299d09371c5`.

The combined review branch brings the timeline changes into the visual expansion at `047d395`, including its map-control and portrait fixes.

## Finding and implementation

Playback exposed glyph-only controls and a fixed interval. The atlas visits selected map dates and major events, so successive moments can have different gaps. A reader could not tell the next date or elapsed historical interval before stepping, or choose a reading pace.

The timeline now provides named Play/Pause controls, 3/6/10-second reading paces (6 seconds by default), date-specific previous/next labels, disabled endpoints and a visible next-date/elapsed-year cue. The uneven-time-step explanation remains visible and is connected to the slider and stepping buttons with `aria-describedby`. All new copy is available in English and Chinese. The chronology helper respects the civil calendar: 1 BCE to 1 CE is one year, with no year zero.

Playback continues to visit the original historical moments; it does not interpolate dates or territorial boundaries. Manual date changes retain their existing stop behavior. A change to the system reduced-motion preference stops a running timeline; the existing reduced-motion map behavior remains in place. The final moment now clears the timer immediately and returns the button to Play. The narrow layout wraps the additional context without imposing a fixed timeline height.

## Review corrections

Independent source review identified two issues in the initial change: a terminal state that stayed in Pause until an extra timer tick, and time-gap explanation available only on hover. Both are corrected. A production-handler regression checks immediate timer cleanup, the endpoint label, disabled Next and `aria-pressed=false`; another checks the visible bilingual gap and described-by connections.

## Verification and release status

- Content/schema validator: passed.
- Combined Node suite: **362 tests passed**.
- Six focused chronology/playback checks cover nonuniform moments, BCE/CE chronology, bilingual terminal guidance, allowed reading paces, actual handler endpoint cleanup and accessible visible time context.
- JavaScript syntax and diff whitespace checks: passed.

The combined build reconciles the HTML asset references. Playback stops when the tab is hidden.

Chrome rendered the combined Atlas and the Chinese controls at 390 px. The cue showed the 15-year gap from 1200 to 1215, People displayed available images by default, and the desktop timeline accepted a pace change while playing. A manual step stopped playback. At the final year the button returned to Play immediately and Next was disabled. Tab hiding and the operating-system reduced-motion override were not exercised in the browser.

Prepared as a review branch. No merge, deployment, content-image publication or GitHub Actions run is part of this slice. Commits use `[skip ci]` under the existing Actions pause.
