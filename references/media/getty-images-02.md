# Getty images 02: four focused additions and one size repair

Reviewed 2026-11-11. Getty-only curation against full `loadAtlasRecords()` records and `dist/data/visual-coverage-v18.json` coveredIds. No production files, Git operations, uploads, deployments, or Actions changed.

## Integration-ready files

- `research/v18/getty-images-02/visual-assets-getty-images-02-v18.json`: four new bilingual records with explicit associations, rights, localized metadata, hashes and dimensions.
- JPEGs in the same folder: `charlemagne.jpg`, `plague.jpg`, `augustus.jpg`, `berenike.jpg`. The proposed catalog filenames include the `getty-images-02-` prefix; rename on integration.
- `christine-replacement-v18.json`: replace the previous Christine item rather than adding a duplicate. Its original asset ID and proposed production filename remain unchanged. Copy `christine.jpg` to that production filename. Corrected kind to `manuscript` with `manuscript-detail` representation.
- `download-receipts.json`: source URLs, HTTP 200 receipts, dimensions, bytes, SHA-256 and actual-pixel inspection records.
- `audit.json`: both catalogs passed `auditHistoryMedia` with zero errors against the current full records.

## Focal matches and limits

1. `charlemagne-coronation`: [The Coronation of Charlemagne](https://www.getty.edu/art/collection/object/109DCT), Julius Schnorr von Carolsfeld, 1840, Getty 2009.5. 1024 × 568; 250724 bytes. Direct depiction of the 800 coronation, explicitly a nineteenth-century Bavarian royal commission, not eyewitness evidence or a lifetime portrait. Its central crowning gesture and surrounding ranks are visible.
2. `black-death`: [Blessed Bernard Tolomei Interceding for the Cessation of the Plague in Siena](https://www.getty.edu/art/collection/object/103RHC), Giuseppe Maria Crespi, about 1735, Getty 86.PC.463. 1400 × 905; 247497 bytes. Explicit later devotional treatment of the 1348 Black Death in Siena, not evidence for the record’s Cambridge skeletal study. Painting includes sick and deceased people, including children; non-graphic historical depiction. Getty’s date field says about 1735 while its descriptive text mentions a 1736 commission; retain the catalogue’s approximate date, not an asserted exact production year.
3. `roman-principate`: [Portrait Head of Augustus](https://www.getty.edu/art/collection/object/103THA), unknown maker, 25–1 BCE, Getty 78.AA.261. 1157 × 1400; 162947 bytes. This lifetime-period marble portrait directly supports the record’s discussion of imperial portraits and legitimacy. The text makes clear that the idealized face is political imagery, not literal age or appearance.
4. `hellenistic-kingdoms`: [Oval intaglio](https://www.getty.edu/art/collection/object/103V11), unknown maker, 3rd–2nd century BCE, Getty 81.AN.76.207. 1050 × 1400; 147635 bytes. Getty specifically identifies Berenike II of Ptolemaic Egypt. It is a particular royal-image object connected to the record’s Ptolemaic court and luxury-production discussion, not generic period padding. The broad date spans after her lifetime; no securely dated lifetime likeness claimed.
5. Existing Christine repair: 961 × 1400; 530443 bytes. Same verified official source image and content as world-batch-16; source-served smaller derivative solves the 750000-byte ceiling without changing policy or local image pixels.

Each object page returned HTTP 200 and includes image-specific CC0 evidence plus the exact IIIF identity in JSON-LD `thumbnailUrl`. Saved HTML and schema files preserve that evidence for the four new records. Christine’s original rights evidence remains in `research/v18/world-batch-16`. All five files were opened with `view_image`; focal subjects, intact framing, absence of watermark/error pages and unchanged pixels were checked. Every accepted image is within the unchanged 3000px and 750000-byte limits.

## Source behavior and exclusions

Requests were sequential with pauses. No 403 or challenge occurred. Charlemagne’s `!1400,1400` and then `!1024,1024` requests returned HTTP 400. The public IIIF info document identifies a native 1024 × 568 source; the standard `/full/max/0/default.jpg` endpoint returned 200, preserving native dimensions. This was a size-syntax correction, not an access-denial workaround.

No other image providers were probed or downloaded. Other search leads such as generic Constantinople photographs, a later Bastille square photograph, and an uncertain Jerusalem destruction manuscript were not admitted: they did not yet establish sufficiently specific focal relevance. Four strong additions were preferred over filling the twelve-item ceiling with weak matches.

## Owner admission

All four new objects and the source-served Christine derivative were independently viewed and admitted. Interpretations were tightened while preserving the artwork/event date distinctions. Unneeded comparisons to Cambridge mortality or all successor kingdoms were removed. Source rights and complete original target records are preserved in `docs/v18-getty-images-02-evidence.json`. All five images decoded successfully in both-language Chrome inspection, with credits and exact dates visible.
