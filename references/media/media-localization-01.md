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
