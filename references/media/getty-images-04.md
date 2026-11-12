# Getty images 04: Carthage, craft and later memory

Research-only proposal, checked 2026-11-12. Two images, three associations, two newly covered records. No production, Git, upload or deployment changes.

## Deliverables

- `research/v18/getty-images-04/visual-assets-getty-images-04-v18.json`: full bilingual proposed shard.
- `target-records.json`: complete assembled records for the two targets.
- `download-receipts.json`, `audit.json`, `*-image-info.json`: HTTP receipt, bytes, actual dimensions, SHA-256 and inspection record.
- `hannibal.jpg`, `pendant.jpg`: unmodified official source-served IIIF derivatives.
- `*-schema.json` and HTML: saved source identity, description and explicit CC0 statement; `pendant-context.html` preserves specialist dating and provenance context.
- `build.py`: reproduces and audits the proposal.

## Proposed images

1. [The Fleet of Hannibal Sailing to Spain](https://www.getty.edu/art/collection/object/103SBZ), about 1390–1400. Paris manuscript, First Master of the Bible historiale of Jean de Berry and an unknown scribe. Getty explicitly identifies Carthage, Hannibal, elephants and the fleet’s Spanish destination, and ties expansion in Spain to conflict with Rome. Supports `punic-wars-mediterranean` and `carthaginian-power` as later historical interpretation, never as eyewitness evidence. The caption explicitly rejects treating its medieval crown, ships and skyline as accurate ancient reconstructions. Actual pixels inspected: complete parchment page, two text columns, boats with soldiers, crowned commander, elephant and fortified backdrop. 1046 × 1400, 423006 bytes.
2. [Necklace with a Bearded Head Pendant](https://www.getty.edu/art/collection/object/103XZ0), Getty 83.AM.1.1. Supports `carthaginian-power` as craft-and-exchange context. Getty explicitly explains circulation of Punic glass pendants from Carthage and the Levant to Etruria. The [specialist glass catalogue](https://www.getty.edu/publications/ancient-glass/catalogue/cat-550/) identifies the pendant as Punic, probably Carthaginian, and dates it to the later fourth–third centuries BCE. The collection page dates the gold necklace 525–500 BCE and warns that the combination probably is modern. Both dates and recomposition are disclosed prominently, with no invented findspot or voyage. Actual pixels inspected: full gold-bead arrangement and white/blue bearded glass head, gray background, no crop or watermark. 1085 × 1400, 179127 bytes.

## Excluded and unresolved candidates

- Alabastron, Getty 10961H / 2004.16: saved object metadata but not downloaded. Specialist publication dates it seventh–sixth centuries BCE and discusses uncertain Phoenician/Assyrian production, while the collection record dates it 500–400 BCE and places it in the Achaemenid empire. Not a sufficiently secure Phoenician-city match for this batch.
- Portrait of Francisco de los Cobos y Molina, Getty 103RJA: saved source but no download. Charles V’s financial adviser does not directly illustrate the atlas entry’s Central European composite monarchy and Ferdinand’s 1526 acquisition. Rejected rather than substituted as generic Habsburg art.
- Samarkand, Angkor, Pnyx, Córdoba, Damascus, Hittites, Nineveh, Tang/Dunhuang and Aldus searches predominantly returned vocabulary entries, archival finding aids, exhibition loans or unrelated objects, not verified Museum CC0 images matching the named events. No generic architecture, Bible scenes, calligraphy or imperial art added.
- Dido suicide manuscript is legendary reception, not direct evidence for the maritime-power period; not downloaded.
- No CAPTCHA, denial, access restriction or rate limit encountered. Web renderer timed out on Alabastron; the normal official collection request succeeded. This was a transient retrieval failure, not an access denial.

## Method and limits

Loaded assembled records via `scripts/lib/atlas-records.mjs` and compared against `dist/data/visual-coverage-v18.json` (800/2087 baseline). Read both complete target entries. Checked source-object URLs against production catalogs, previous Getty directories and world-batch-16; no duplicate. Getty-images-01 directory was absent, so the broader production/catalog check was used as well. Search discovery remained Getty-only. Only official Getty HTML, JSON-LD and IIIF endpoints supplied evidence or pixels, paced with delays. Each downloaded image was opened individually and SHA-256/dimensions checked. Both are under the stricter 1800-pixel / 750000-byte limits. Caption writing distinguishes ancient objects, modern recomposition and medieval depictions. Only two strong targets were accepted rather than padding a requested maximum of twelve.

## Owner review, 2026-11-12

All selected images individually inspected and admitted with exact file hashes, bilingual metadata and concise interpretation. Final catalogue: dist/data/visual-assets-getty-images-04-v18.json. Durable evidence: docs/v18-getty-images-04-evidence.json.
