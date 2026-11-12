# Pacific archives 01

Research-only proposal, reviewed 2026-11-12. Six Australian War Memorial photographs cover seven currently uncovered assembled records. Baseline visual-coverage-v18.json was 809/2087; this batch alone projects 816/2087 (39.099%). Recheck concurrent work before integrating. No production files, Git, deployment or uploads changed.

## Deliverables

- research/v18/pacific-archives-01/proposed-shard.json: version-2 image shard with bilingual titles, alt text, captions, interpretations and source links.
- original-records.json: complete assembled records for seven targets, via scripts/lib/atlas-records.mjs.
- copy-manifest.json, download-receipts.json, rights-receipts.json and dimensions.json: byte-identical transfer plan, HTTP 200 receipts, hashes, sizes and dimensions.
- images/: six unchanged official screen JPEGs, 160254–226858 bytes. No local editing, cropping, recompression or recolouring. Institutional credit strips remain intact.
- Source HTML files: internal research receipts only, not publication text.

## Rights

Every individual official item page was retrieved with HTTP 200 and explicitly labels its image “Copyright expired - public domain”. This is item-specific evidence, not inference from age or the website text licence. The AWM copyright policy https://www.awm.gov.au/about/organisation/corporate/copyright permits copying and reproducing its public-domain images without permission; existing full policy receipt is research/v18/oceania-images-01/awm-copyright.html. Official low-resolution images are not purchased reproductions. Public documentation paraphrases the catalogue rather than copying full descriptions.

## Pixel and relevance review

1. Kokoda labour: https://www.awm.gov.au/collection/C319068, accession P02423.025, Arthur Francis Hobson, November 1942. 640 × 494. Visible supply boxes, shoulder poles, narrow bridge and forest stream directly support the labour record. The portrait-oriented source occupies a wider official derivative with black side bars; keep unchanged. No inference about these workers’ consent, names or feelings. Colonial catalogue wording is paraphrased respectfully. No graphic injuries.
2. Hiroshima: https://www.awm.gov.au/collection/C277270, P01205.049, 1946, photographer unspecified. 640 × 451. Two clothed children on a seesaw, rubble and rebuilt storefronts. The photograph documents aftermath, not 6 August 1945. Names, medical histories and personal experiences are unknown; do not infer recovery or use smiling faces to minimize destruction. No visible injury or nudity. Public archival child image; no private information inferred.
3. Marshall Islands nuclear tests: https://www.awm.gov.au/collection/C14107, 042812, 25 July 1946, photographer unspecified. 639 × 529. Aerial Baker-test explosion with ships, water and clouds. Direct evidence of one identified test, not displaced communities or full contamination extent. Caption and interpretation explicitly connect the limits of a military aerial view to the record’s human consequences. No visible casualties. Avoid decorative spectacle.
4. Singapore occupation: https://www.awm.gov.au/collection/C22299, 117129, 20 September 1945, photographer unspecified. 640 × 490. Women and servicemen outside thatched building. Catalogue identifies Chinese women workers who helped Australian prisoners, but not their names. This supports civilian assistance and occupation aftermath, not Sook Ching screening or executions. Derogatory historical labour label omitted from public caption; military collection viewpoint disclosed. Shirtless adult men, no graphic wounds or intimate nudity.
5. Guadalcanal: https://www.awm.gov.au/collection/043648, 043648, October 1942 as catalogued; Defence Department / Marine Corps attribution. 640 × 525. Six local policemen with Martin Clemens, some carrying rifles. The identified group makes local participation visible; no individual names assigned beyond Clemens, no claim of universal willingness or civilian representativeness. Non-graphic armed group portrait. Several adult men are bare-chested. Search result C364821 supplies an August date for a related Clemens portrait, so this proposal consistently attributes October to this specific catalogue record rather than silently reconciling variants.
6. Japanese constitution: https://www.awm.gov.au/collection/C250563, 133387, William Harry Freeman, 1946. 640 × 499. Fireworks over silhouetted people and trees on the Imperial Plaza. Directly identified as promulgation celebration, suitable for both constitutional event and subsequent polity records as a founding-era image. It does not depict implementation in May 1947 or prove political unanimity. No exact day inferred.

## Holds and exclusions

- Japanese constitution C1131715, C1131716 and C1131717 describe a new constitution but carry 1945 dates inconsistent with the known promulgation/implementation sequence. Not selected; precise 1946 celebration C250563 used instead.
- Manila WWII images were not stretched to illustrate 1946 independence or the earlier galleon exchange. No uncovered standalone Tarakan WWII record was found in current assembled coverage.
- Broad Malayan resettlement searches returned Vietnam scenes; these were not repurposed as Malayan Emergency evidence.
- No rights-restricted artwork, modern speculative scene, generic soldier picture or undated war image was substituted.

All six official item and image requests succeeded. No denied source, CAPTCHA or rate limit occurred; no alternate-route bypass was used. A missing Python requests dependency was resolved by using the standard-library HTTP client before any network request had run. Nothing remains pending or uncertain. Integrator should recheck unique coverage and validate bilingual rendering after copying bytes unchanged.

## Integration review

Owner individually viewed all six source photographs and read item-specific public-domain labels and full target entries. Concise final captions replace draft boilerplate while retaining exact catalogue dates. Guadalcanal overlaps the new NARA airfield photo, so this batch adds six unique covered entries, not seven. Six unchanged files and bilingual metadata admitted; final evidence is in docs/v18-pacific-archives-01-evidence.json.
