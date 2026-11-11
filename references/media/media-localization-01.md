# Chinese metadata localization 01

Research handoff prepared 11 November 2026 for the Atlas visual expansion. Not yet integrated or published by this worker.

## Coverage and artifact

- 175 image credits: the 125-image `dist/data/history-media-v18.json` snapshot, all 28 reviewed images in `research/v18/world-batch-04/visual-assets-world-batch-04-v18.json`, and all 22 reviewed images in `research/v18/china-batch-05/visual-assets-china-batch-05-v18.json`.
- The previous 153 translations are preserved exactly and in order, checked against the frozen prior artifact SHA256.
- Main artifact: `research/v18/media-localization-01/history-media-localization-zh-v18.json`.
- Each item preserves its source `id` as `assetId` and supplies `date`, `creator`, and `institution` as exact-source English plus Chinese pairs. No rights, associations, factual dating or ownership changes.
- `source-inventory.json` in that directory binds all 175 assets to their source file IDs, exact source URL, rights-source URL, record IDs, image hash and original-metadata hash. It is the complete source-ID/checksum index, not a new source catalogue.

## Source snapshots

1. Current catalogue, 125 items: SHA256 `71e09d0b9d233b0082e31af4ade2a54345166fdc61322a1d60dce71c79dbd45f`.
2. Reviewed World batch 04 shard, 28 items: SHA256 `d2e402924583b46c1170d5df09069f804e20db8172dc8b04262a85118b8ad8ab`.
3. Reviewed China batch 05 shard, 22 items: SHA256 `f78acfd967222b441d64cf854be10dd84a68d277803b54ccea4cc9bfe1a4ccc2`.
4. Preserved prior 153-item localization: SHA256 `03b5bf2c4530976ed826331d4331201ab68a739ae41beba8f18a0cd8c0305def`.
5. China batch 05 copy manifest: SHA256 `b6af1975633572bd40c8db1facad6a123b5583d2cbbc78aa09350a7f6285df79`.

The source pages and local receipts referenced by those catalogues remain the historical and image-credit evidence. This pass translates their existing metadata; it does not fetch or replace the images or re-audit rights.

## QA and integration

175 unique asset IDs, 525 translated fields, exact English preservation, 175 local image hash matches and 43 focused role/date regressions pass. The local validator executes 5,516 assertions. The 153 previous translations remain unchanged. China 05 retains the full album-opening distinctions for Han Xin and Guo Ziyi, the Tang mural date for Zhang Qian and the authentic 1072 letter attribution for Ouyang Xiu. See `research/v18/media-localization-01/QA.md` for source ambiguities retained, and `validation.json` for machine results.

Join the optional layer by asset ID and require each `en` value to match the current source field before using its `zh` counterpart. Do not overwrite production source fields with the snapshots. The production integration owner owns the optional display path, application testing and publication. The worker edited only the research localization directory and this reference note.

## World batch 05 extension

The final research package now covers **206 assets / 618 translated fields**, with all prior 175 translations unchanged. The 31 new site-photo records were reconciled after display dates dropped EXIF clock times; source evidence retains the full timestamps. The two year-only dates and one month-only date retain their original precision. Named photographers, image editors and source-host credits remain distinct from monument makers or collection ownership.

The research validator passed 206 image hashes, 53 semantic regressions and 7,284 assertions. Delivered localization SHA-256: `144d1a78386f00c39f6f2acd2e38a27103541aac9210ed7cec6a32572b2258f8`. The owner independently checks exact English-field equality during the production build. Research package: `research/v18/media-localization-01/`.

## World biography batch extension

238 assets, 714 localized credit fields. The prior 206 rows are unchanged; all English date/creator/institution strings exactly match their source metadata. All 238 image hashes pass. Date precision distinguishes photograph exposure, publication, recto/verso, copies and uncertain attribution. Localization SHA256: `f656e083534dd365bbbe2fe25f39fa1cde7f587c1be0af9c3ccacf768bbcb0ca`.

## China 06 and World 07 extension

295 assets, 885 localized date/creator/collection fields. The prior 238 rows remain exactly unchanged. All English source strings and 295 file hashes match, with 103 semantic regressions and 10,479 assertions passing. Culture labels remain cultures rather than invented individual artists; Mauludi and Hijri dates are distinct; the uncertain Sun Yat-sen museum attribution remains qualified as a Commons credit. Localization SHA-256: `c894276befaf0472f9963a8c1e53386b3f0c9a1610c809880ae8c346b530d116`.
