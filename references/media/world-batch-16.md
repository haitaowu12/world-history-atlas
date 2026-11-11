# World batch 16: Getty manuscript

Reviewed 2026-11-11. Research-only proposal: **one image, one previously uncovered entry** (`person-christine-pizan`). No production files, Git operations, uploads, deployments or Actions changed.

## Accepted

- Getty Ms. 129 (2024.156), *Des cleres et nobles femmes; Le livre de la Cité des Dames*. Primary page: https://www.getty.edu/art/collection/object/1CQWPZ
- Official collection-page structured data explicitly identifies image `5061d7a6-6c39-4b68-85ac-edf26af85ca7` and says the images provided on this page are available under CC0 through Getty Open Content. This is image authorization, not reliance on the CC BY licence of catalogue prose.
- Full record `person-christine-pizan` inspected. Its discussion of manuscript copying, collaborative book production and circulation directly matches this later manuscript. Single `related-work` association only. No broad period or regional reuse.
- Dating follows the current catalogue: text, frames and initials c.1470; frames and miniatures c.1515–1520. Do not call this Christine’s lifetime portrait or her original autograph.
- Actual downloaded pixels inspected through `view_image`: complete illuminated manuscript page with French text, floral borders, seated reader and three visitors. JPEG 1099 × 1600; 809091 bytes; SHA-256 `1aed80ee9eaedd7febda1c17a88fe52bea845e9e0b3e0873abd74ca71f1920b8`.
- Unmodified official IIIF derivative: https://media.getty.edu/iiif/image/5061d7a6-6c39-4b68-85ac-edf26af85ca7/full/!1600,1600/0/default.jpg

## Integration handoff

Everything is staged under `research/v18/world-batch-16/`:

- `visual-assets-world-batch-16-v18.json`: bilingual runtime-format shard, one asset and one association.
- `world-batch-16-christine.jpg`: inspected source derivative; proposed production destination is the shard’s `file` field.
- `download-receipts.json`: dimensions, bytes, hash, exact source and download URL.
- `christine.html`, `christine-schema.json`: archived rights, image ID and catalogue evidence.
- `build.py`: reproducible shard/receipt generator; does not download or modify production files.

## Excluded and stopped leads

1. NYPL Toussaint portrait (`https://old-digitalcollections.nypl.org/items/510d47de-18a7-a3d9-e040-e00a18064a99`) returned HTTP 200 but only a 212-byte Incapsula challenge, archived as `toussaint.html`. Stopped, no retry, alternate route or challenge solving. No image accepted.
2. Rijksmuseum *Castle of Batavia*, Andries Beeckman, c.1662, directly fits `batavia-company-capital` as a later painting of the VOC headquarters, not the 1619 destruction itself. Its primary page and rights policy were accessible and saved (`batavia.html`, `rijks-rights.html`, `rijks-images.html`). However `https://iiif.micr.io/gbnGP/full/1600,/0/default.jpg` returned HTTP 403. Stopped this image server; no retry or alternate download path. No image accepted.
3. Rijksmuseum *Ratification of the Treaty of Münster* primary page was readable (`munster.html`), but this depicts the May Dutch-Spanish treaty, whereas the atlas record emphasizes the October imperial treaties. Not substituted as an exact event depiction. No image download attempted.
4. Getty’s news page has a detail of *Christine Writing with Rectitude*, explicitly credited © Les Enluminures. That separately copyrighted news photograph was excluded. The accepted asset is the independently identified CC0 image from the collection page, not a workaround for the news photo.

No metadata-only record, uninspected image, blocked download, dynastic portrait padding or broad regional association has been counted.
