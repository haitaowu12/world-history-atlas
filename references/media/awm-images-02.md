# Australian War Memorial photographs 02

Research-only proposal, 12 November 2026. Eight unchanged institutional JPEGs support seven previously uncovered assembled records. The initial coverage was 442 images, 831 of 2,087 entries. Concurrent integration raised it to 450 images and 839 covered entries before final validation. All seven targets remain uncovered; this batch projects 846/2,087 (40.537%). Two complementary Banaba images count as one newly covered entry. No production, Git, upload or deployment actions were taken.

## Deliverables

- `research/v18/awm-images-02/proposed-shard.json`: version-2 production-shaped bilingual titles, alt text, captions and interpretations, with dates, creators, credits, rights and direct catalogue URLs.
- `original-records.json`: seven complete assembled target records read through `scripts/lib/atlas-records.mjs`. No record was selected from its title alone.
- `copy-manifest.json`: proposed byte-preserving copies into `dist/assets/history-media/` for the integration owner to review.
- `page-receipts.json`, `catalogue-metadata.json`, `download-receipts.json`, `dimensions.json`, `rights-receipts.json` and `coverage.json`: HTTP receipts, original media URLs, file sizes, SHA-256 hashes, pixel dimensions, item-level rights and coverage/deduplication checks.
- `images/`: eight proposed JPEGs, plus one explicitly held Korean alternative. All nine downloaded photographs were individually displayed and inspected.
- `holds.json`: rejected or held leads, distinguishing full local inspection from search-indexed catalogue excerpts.
- Individual item HTML/text receipts; the AWM copyright-policy receipt copied unchanged from the previous approved Oceania research batch.

## Rights and retrieval

Each of the nine downloaded photographs has a successfully retrieved official catalogue page explicitly marked **Copyright expired - public domain**. The [AWM copyright policy](https://www.awm.gov.au/about/organisation/corporate/copyright) permits reproducing these website images without permission. This assessment uses the image-specific public-domain category, not the website text licence, orphan-work assumptions or inferred photographer death dates. No paid high-resolution reproduction was ordered.

Nine distinct candidate item pages and one public collection-search page were retrieved, below the 25-page cap. All direct page/image requests were sequential, with at least 1.2 seconds between starts after the preceding response completed. All completed HTTP requests returned 200. No denial, rate limit, challenge or CAPTCHA occurred; no alternate access route was used. The initially missing BeautifulSoup import failed before any network request and was replaced with standard-library parsing.

The eight proposed files total 1,700,762 bytes. Individual files range from 138,200 to 287,157 bytes; their longest side is at most 654 pixels. Official credit strips, source borders, tonal characteristics and any age-related marks remain unchanged. No cropping, retouching, resizing, recolouring, recompression or image generation was performed.

## Pixel and exact-subject review

1. **Banaba phosphate works, 2 October 1945**: [AWM C75584 / 097625](https://www.awm.gov.au/collection/C75584). Photographer not identified. Industrial sheds, chimneys, waterfront loading structures, a small harbour and beached boats are visible. These are the actual British Phosphate works on Banaba, the extraction site in `banaba-phosphate-displacement`. The photograph is post-surrender; it does not depict the relocation to Rabi. The caption makes no unsupported claim about the precise order of the October photograph and relocation within 1945. The yellowish paper border and institutional strip are preserved.

2. **Banaba phosphate shipping, c. 1940**: [AWM C256662 / 305235/01](https://www.awm.gov.au/collection/C256662). Photographer not identified. The cargo ship Vito and HMAS Manoora are catalogued offshore at Home Bay; loading infrastructure is visible at left. This second view adds the export connection to the mining-site view, not an additional coverage count. No mine workers or relocation passengers are identified in the photograph.

3. **Kampong Landak patrol, 25 May 1956**: [AWM C1097575 / HOB/56/0482/MC](https://www.awm.gov.au/collection/C1097575). Phillip Oliver Hobson. Soldiers walk toward village houses under a wooded slope. The date, named Perak village and Emergency operation directly fit `malayan-emergency-social-war`. The village is not called a resettlement camp, and the photograph is not presented as evidence that any visible resident was forcibly relocated. The colonial catalogue's insurgent labels are not imported into the public prose. Non-graphic armed scene.

4. **Sarawak border patrol, c. 1965**: [AWM C398839 / CUN/65/0727/MC](https://www.awm.gov.au/collection/C398839). William James Cunneen. Ian Ronald Ramsay holds a rifle while crossing a log bridge in dense vegetation. The actual Konfrontasi border patrol directly supports the 1963–1966 conflict component of `malaysia-federation-1963`, which explicitly covers Konfrontasi. It is not labelled as the 1963 proclamation, 1957 independence or proof of Bornean communities' political views. Non-graphic armed portrait.

5. **38th-parallel survey sign, 2 February 1953**: [AWM C1214833 / P06251.006](https://www.awm.gov.au/collection/C1214833). Cyril Charles Mitchell. Bruce Grattan Horgan leans on the actual latitude sign. The image is somewhat washed out, but the 38-degree label and survey wording remain visible. The caption states the five-year difference from the 1948 state establishments. The interpretation explains the precise geographical relationship to `korean-division` and explicitly distinguishes the latitude from the July 1953 military demarcation line. This is an illustrative later view of the exact dividing latitude, not a photograph of the 1945 agreement. C43448, a softer group portrait from a 1950 boundary tour, was pixel-checked and retained only as a held alternative.

6. **Women address a Cairo crowd, March 1919**: [AWM C1006113 / G01867](https://www.awm.gov.au/collection/C1006113). The catalogue lists W. H. James and W. H. Swanston, preserved as attributions rather than resolved to one invented author. Horse-drawn vehicles and women addressing a dense street crowd are visible in the photograph. This is contemporary evidence for the street politics in `egypt-women-nationalism-1919`. The catalogue calls the women “Turkish” without individual names; their nationality and names are not independently established. No person is labelled Huda Shaarawi, so the image is not attached to her biography. No visible violence or injury.

7. **Parliament House, Canberra, winter 1941**: [AWM C40435 / P00041.001](https://www.awm.gov.au/collection/C40435). Photographer not identified. An oblique aerial view clearly records the parliamentary building and formal gardens. The exact federal institution fits `australia-federal-polity`'s 1901–2026 constitutional story. It is not portrayed as the 1901 federation event, nor is Canberra backdated as the capital for the entire period. The source's bright exposure is unchanged.

8. **St Francis Xavier Church, Melaka, c. 1941–1942**: [AWM C340230 / P02569.083](https://www.awm.gov.au/collection/C340230). The individual record does not credit a photographer; it identifies the George Aspinall collection. The weathered twin-towered church and street foreground are clearly visible. `melaka` explicitly concerns historic buildings, religious/cultural exchange and townscape, so the named building is an exact place-based connection. The caption states that the photograph follows the entry's 1401–1900 learning window. It is not attached to Portuguese conquest, the early sultanate or George Town. No unsupported construction date was added.

## Exclusions and integration cautions

Huế palace images marked orphaned work or AWM Licensed copyright, a restricted Timor referendum photograph, and externally copyrighted Ho Chi Minh art were not downloaded. No photograph was repurposed merely because it came from the same country. A generic Damascus mosque and a Lion of Babylon excursion were left out because their exact monument/period relationships were not established. Searches did not yield an adequate public-domain photograph for several Pacific independence milestones; wartime photographs were not used as substitutes.

The proposed eight files have no SHA, source-URL, media-URL or asset-ID collision with the current production visual JSON files. The owner should recheck coverage after concurrent batches, retain the official bytes and credit strips, and inspect bilingual rendering before admission. No external action remains pending or uncertain.

## Owner integration review

The owner separately viewed every admitted image and read the full target records. The two batches together add 16 historical images to 16 previously uncovered entries; 466 images now cover 855 of 2,087 unique entries (40.97%). Main and the live site are unchanged.

Getty album dating is explicitly attached to the album, without claiming a precise exposure date. Monreale stonework is described without assigning an individual maker. AWM creator, date and institution fields have Chinese translations. Duplicate image-level reading links were removed while all entry sources remain. Cairo speakers stay unnamed; the Korean latitude sign is distinguished from the later armistice line. Source-served image bytes and credit strips remain unchanged.
