# Timeline integration with the current visual edition

## Sources and preservation

Integrated the playback delta from immutable review commit `fb0c69ae9e7a1bd18a4a66aa4408226eabb737fc`, based on `047d3959f4a3b087854c048e30eccc1e9fb98599`. The source delta affects only app/index, two new playback assets and one test. It does not restore the older visual catalogue. The current 403 images, 789 covered records, 60 prose edits, 38 story reviews, 17 studies and 7 image-date sequences are unchanged.

The main branch at `b212fcc4293c72f8ff08f4b0fcd8109bd5caa94b` was compared separately. Current README files, map-control fix, portrait toggle removal, reading browser and acceptance runner already contain main's changes. Newer discovery/image CSS and canonical metadata were retained. All 25 source text files used for comparison were verified against their Git blob hashes. The preview JPEG was preserved, not re-fetched as text.

Only the playback slice was applied. The app cache version advanced from 80 to 81. A duplicate visibility-change listener introduced by the merge was removed, leaving one guarded listener. Two tests exercise the actual production visibility and reduced-motion callbacks, not a separately reimplemented callback.

## Verification

- Full `npm run check`: **440 passed**, zero failures or skips.
- Eight focused playback tests pass, covering nonuniform steps, BCE/CE with no year zero, bilingual labels, 3/6/10-second pace validation, automatic endpoint cleanup, hidden-document cancellation and reduced-motion preference changes.
- Real Chrome at 500 CSS pixels: Play/Pause, all three pace options, changing pace during playback, manual Next stopping playback, keyboard End, disabled Next at the endpoint, restart from the endpoint, and automatic final-step cleanup verified.
- English and Chinese next-date/elapsed-year labels verified. The Chinese endpoint reads 已到最后时点. Page width was 485 CSS pixels with no horizontal overflow; screenshot inspection showed readable controls and compact map controls.
- Browser hidden-tab acceptance remains inconclusive: opening another tab through both the browser API and native Ctrl+T did not yield a hidden document or stop playback in this cloud browser. The callback unit test passes, but this is not recorded as a successful real hidden-tab test. The OS reduced-motion change was not exercised in the browser; no system or security setting was changed. The actual preference callback is covered by a unit test.
- No new resize operation was attempted. Additional viewport/OS acceptance should use an authorized browser environment before final release.

## Durable state

The prior image checkpoint is remotely saved as `eba4bcac139da59031c8c654e4259942d2b8cdd6`, tree `5a6fe70aa7bb63696115be1a40f47dcf4ce10490`, exactly matching local `d4da4b9`. Ref/tree readback and zero Actions runs were verified. Main and the separate timeline branch were reread unchanged during this integration. Their refs have not been moved. This integration is review work, not a production release.
