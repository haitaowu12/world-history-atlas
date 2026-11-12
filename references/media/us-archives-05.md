# US archival image batch 05: reviewed research proposal

Research only. No production files, Git state, publishing, uploads or workflows were changed. Seven images support eight exact atlas entries, adding **five newly illustrated entries** against the 466-image / 855-covered-entry baseline. The requested 12–20 was not reached: duplicate portraits and uncertain rights were excluded rather than padding the batch.

## Artifacts

- `research/v18/us-archives-05/catalog-shard.json`: complete proposed bilingual atlas metadata.
- `research/v18/us-archives-05/copy-manifest.json`: exact local files, proposed destinations, byte counts and SHA-256 hashes.
- `research/v18/us-archives-05/target-records.json`: all eight full assembled target records.
- `research/v18/us-archives-05/evidence.json`: individual source, rights and interpretation evidence.
- `research/v18/us-archives-05/audit.json`, `pixel-audit.json`, `germany-conversion-proof.json`: schema, coverage, hash, decoded pixels and limits.
- `research/v18/us-archives-05/admission-rejection-ledger.json`: exclusions and source corrections.
- Source HTML/TXT, public viewer JSON, request receipts and original downloaded images are retained in that research directory. The copy manifest is the only admission list; other retained downloads are not proposed assets.

## Selected images and exact relationships

1. **Abraham Lincoln, ca. 1860–1865.** NAID 530413. A lifetime photographic portrait from the Mathew Brady collection; the item does not identify its individual photographer. Adds a face to `person-abraham-lincoln`, already covered by a proclamation association. 960×1199; 192,888 bytes. The reproduced signature is visible; this is not a signing scene.
2. **Ho Chi Minh to Harry Truman, 18 January 1946.** NAID 28469393, U.S. Foreign Service records. First page of the three-page letter, not a complete document. Directly illustrates the entry’s early diplomatic appeal. The interpretation distinguishes Ho’s argument from U.S. recognition. `person-ho-chi-minh` newly covered. 917×1200; 155,353 bytes.
3. **Liliʻuokalani’s Crown-lands memorial, 19 December 1898.** NAID 306653, House of Representatives records. Signed petition with visible handwritten corrections. Adds a primary document to an existing portrait, showing continued resistance after overthrow and annexation. `person-liliuokalani` gains depth, not new coverage. 760×1200; 193,271 bytes.
4. **Ida B. Wells’s appeal for the Baker family, 1898.** NAID 24746870, Department of Justice records. First page of a two-page handwritten letter seeking assistance for survivors of racist violence. Adds practical political advocacy to an already illustrated biography; not a generic portrait or graphic violence image. `person-ida-b-wells`. 928×1200; 239,230 bytes.
5. **Dolores Huerta in César Chávez’s office, 8 October 2012.** Pete Souza official White House photograph, preserved in the Obama White House archive. The exact page names all five people, including Huerta. The red-jacketed Huerta is visible beside Obama. Caption explicitly describes later recognition, not a 1960s strike; no strike entry added. `person-dolores-huerta` newly covered. 654×436; 251,182 bytes.
6. **Presidential Proclamation 6194, 3 October 1990, page one.** George H. W. Bush’s German-American Day proclamation discusses German unity on reunification day. It gives a specific U.S. diplomatic perspective for `german-reunification` and `germany-reunified-period`, both newly covered. It is not the German Unification Treaty and does not show the page-two signature. NARA GIF is single-frame. Format-only PNG conversion preserves identical decoded RGB pixels and 600×932 dimensions; PNG 736,921 bytes, within the 750,000-byte cap. Original retained.
7. **Montgomery bus seating diagram in Browder v. Gayle.** NAID 596069, district court records. Shows Parks’s marked seat and visible exhibit annotation. Catalog date is 5 June 1956; visible exhibit annotation is 22 February 1956. Both dates are distinguished. Explains litigation and spatial segregation alongside the collective boycott, without presenting a reconstruction as an arrest photograph. `montgomery-bus-boycott` newly covered. 1032×1199; 278,691 bytes.

## Provenance and rights

The five selected DocsTeach documents each explicitly carry the item-level statement “Public Domain, Free of Known Copyright Restrictions.” DocsTeach is hosted by the National Archives Foundation. Its teaching-site license is not substituted for those individual archival-source statements. Item archive identifiers and collections were checked on source pages. Public viewer JSON supplies full image identity and dimensions: some page thumbnails show only a crop, and Tubman’s thumbnail depicts a different portrait from the full viewer. The proposed images use the actual full viewer files, not thumbnail guesses.

Huerta’s source specifically credits an official White House photo by Pete Souza. The archived White House copyright policy says government-produced material on the site is not copyright protected. Bush’s proclamation is itself a federal official work, reproduced in the NARA exhibit and credited to the George Bush Presidential Library. NARA’s federal-work policy receipt is copied from previously verified batch04 and identified as such; public-domain status is not inferred from mere archival custody.

Every admitted file was individually viewed at actual pixels. No local cropping, retouching, compositing or reconstruction occurred. Only the single-frame GIF received a documented lossless file-format conversion. All seven files pass byte/dimension/hash validation, no production hash or asset-ID duplicates were found, and `auditHistoryMedia` reports no errors.

## Limits, exclusions and corrections

Tubman and Douglass photographs were excluded after the combined production audit revealed existing lifetime portraits. Wells and Liliʻuokalani are retained because documents add distinct substantive evidence; Lincoln adds a portrait to a document-covered entry. The preliminary `all-uncovered.json` snapshot must not be used for final coverage accounting; `audit.json` uses the assembled v18 production catalog.

Nyerere’s JFK Library collection lacked an individually verified image/rights pair; Curie’s historical image lacked sufficient individual rights evidence. Both held. No rights denial or CAPTCHA occurred. Twenty-three bounded page requests included public viewer endpoints and two obsolete caption URLs returning 404. All source/image requests were paced over one second apart. NASA, NPS, LOC and Commons were not requested or retried.

The NARA exhibit introduction incorrectly associates the Berlin Wall’s fall with 3 October 1990. The atlas already separates November 1989 from reunification; no record rewrite is proposed. The Wells source uses a Senate title for Dawes in 1898; the proposed caption uses the document’s “Mr. Dawes” instead. The bus catalog date and exhibit annotation are kept distinct. These issues are recorded separately, not used to rewrite history around an image.

## Independent review and owner acceptance

All seven actual images, item-specific rights and eight full records passed independent review. Owner review corrected Wells’s infant daughter wording to young daughter, identified Huerta on the viewer’s right of Obama, aligned Chinese names with the entries and replaced generic cautionary prose with specific visual readings. Lincoln, Wells and Liliʻuokalani add complementary source types but do not increase entry coverage. Exactly five additional records gain their first image.
