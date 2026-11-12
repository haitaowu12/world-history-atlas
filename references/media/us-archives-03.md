# NARA exact-source visual batch 03

Five newly curated images match five uncovered records. This is a research-only handoff: no production files, Git operations, or publication were changed.

## Deliverables

- `research/v18/us-archives-03/proposed-shard.json`: complete bilingual proposed catalog, including empty associations array.
- `research/v18/us-archives-03/evidence.json`: item-specific source, rights reasoning, image receipt and visual inspection record.
- `research/v18/us-archives-03/audit.json`: structural validation, duplicate checks, bytes and dimensions.
- `research/v18/us-archives-03/candidates.json`: full assembled target records.
- Source HTML/text and unmodified image bytes are retained in the same directory.

## Images and exact relationships

1. Truman Doctrine, printed congressional opening page, 12 March 1947. 500 × 778, 91,033 bytes. The Cold War overview receives a specific early U.S. intervention-policy document, not a generic symbol. The caption identifies the partial governmental viewpoint.
2. Tonkin Gulf Resolution. 500 × 751, 61,984 bytes. The Vietnam War overview receives the actual authorization for expanded intervention. The caption distinguishes congressional passage on 7 August from the visible approval on 10 August 1964, and does not endorse the document’s attack allegations as independently proven facts.
3. Guadalcanal: Marine SBD aircraft at Henderson Field on 10 December 1942, item 127-GR-14-88-108572. 454 × 363, 29,716 bytes. Directly matches the battle’s airfield operations. The caption acknowledges the absence of Solomon Islanders’ experiences. This is the exact rendition embedded on NARA’s official blog, delivered through its WordPress image CDN, not a separately sourced image.
4. Paris agreement: released American POWs aboard an aircraft leaving Hanoi on 12 February 1973, catalog 532510. 1090 × 742, 131,576 bytes. A concrete implementation consequence rather than a signing photograph. The caption explicitly says the return of prisoners did not end fighting in Vietnam.
5. Tết offensive: Corpsman D. R. Howe treating PFC D. A. Crum at Huế on 6 February 1968, catalog 532484. 1090 × 739, 165,699 bytes. Specific documented episode of treatment during the offensive, not generic military imagery. Contains a bandaged torso, not graphic wounds.

Every actual image was inspected with `view_image`. All files are below 750,000 bytes and 1,800 pixels maximum side; none were locally cropped, resized or re-encoded. SHA-256 values are included in the shard. Sources and images returned HTTP 200.

## Rights

The two documents are official federal works identified by NARA as presidential/congressional records (RG 233 and RG 11). The three photographs are individually identified official Marine Corps service images, with dated subjects and military-series/catalog identifiers. Rights reasoning relies on federal creation, not the assumption that all archival holdings are public domain. The institutional rights policy was copied from the already-fetched prior batch as `rights.html`; it was not freshly fetched. It states that federal and NARA works are public domain while warning that archival custody alone does not establish reuse rights.

## Limits and dropped research

The requested upper bound was twelve, not a quota. This batch stops at five verified matches rather than adding weak associations. A Martin Luther King exhibit URL (`https://www.archives.gov/exhibits/picturing_the_century/century/century_img87.html`) redirected to HTTP 404 and was dropped. No challenge, rate-limit response, or access denial was encountered; no restricted source was retried or bypassed. Catalog URLs are NARA-linked identifiers, not separately inspected catalog records. The older World War II list and milestone index are retained as research context, not selected assets.

For integration, copy the original image bytes to each shard item's proposed `file` path and preserve the captions’ scope limits. The build helper produces the bilingual metadata; encoded dimensions were added and checked using the repository’s `imageDimensions` function, and `auditHistoryMedia` returned no errors.

## Owner review, 2026-11-12

All selected images individually inspected and admitted with exact file hashes, bilingual metadata and concise interpretation. Final catalogue: dist/data/visual-assets-us-archives-03-v18.json. Durable evidence: docs/v18-us-archives-03-evidence.json.
