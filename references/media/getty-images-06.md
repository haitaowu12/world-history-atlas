# Getty Open Content batch 06

Research-only proposal, reviewed 2026-11-12. **Eight images support nine previously unillustrated entries.** No production, Git, upload or publishing changes. External retrieval has finished.

## Deliverables

- `research/v18/getty-images-06/visual-assets-getty-images-06-v18.json`: production-shaped v2 proposal with bilingual captions, interpretation, alt text and source metadata.
- `target-records.json`: nine full assembled target records, loaded through `scripts/lib/atlas-records.mjs`. `reviewed-records.json` adds two held-out subjects.
- `rights-receipts.json`: item-specific CC0 declarations, accession identities and exact source image identifiers. The original official HTML and JSON-LD are retained beside it.
- `http-receipts.json` and `download-receipts.json`: retrieval status, image bytes, dimensions and SHA-256. `audit.json` summarizes the checks; `build.py` regenerates the proposal and validates source/asset duplication and uncovered target status.
- Eight admitted JPEGs: `cordoba`, `damascus`, `monreale`, `garibaldi`, `alexander`, `dejima`, `franz`, `pedro`. All were individually opened and visually inspected. No local image changes. The largest admitted file is 465,611 bytes; maximum side is 1,400 pixels. Garibaldi is 539 × 658 pixels.

## Proposed matches

1. **Córdoba caliphate**: [Interior of the mosque of Córdoba](https://www.getty.edu/art/collection/object/106QTG), Charles Clifford, 15–17 September 1862, Getty 84.XP.219.39. The actual image shows repeated columns and two tiers of arches, with no invented people or reconstructed scene. The dated photograph presents the named surviving monument after its Christian conversion. It does not claim an unchanged tenth-century interior. Target: `cordoba-caliphate`.
2. **Damascus mosque and Umayyad government**: [Colonnade of the Great Mosque at Damascus](https://www.getty.edu/art/collection/object/104JEH), Félix Bonfils, 1877, Getty 84.XO.1167.33. The album mount, long courtyard arcade, patterned masonry, towers and seated people are visible. The mosque is a direct named monument of the capital discussed in both records. Alterations and the photograph’s much later date stay explicit. Targets: `damascus-umayyad-mosque`, `umayyad-caliphate`.
3. **Norman Sicily**: [Monreale cloister](https://www.getty.edu/art/collection/object/107JCN), Giorgio Sommer, 1870–1890, Getty 91.XM.84.23. The image resolves paired columns, differently patterned shafts, carved capitals and pointed arches. The original atlas record explicitly includes Monreale in its multi-site Norman architectural group. This is a later view of surviving craftsmanship, not an eyewitness image of twelfth-century construction. Target: `palermo-norman-cultural-exchange`.
4. **Italian unification**: [Giuseppe Garibaldi](https://www.getty.edu/art/collection/object/1099Q0), Getty 84.XB.824.1.229, in an album dated 1866. The small photograph depicts the named general with a hand on his hip, inside its original decorative lettering. The full atlas record names his southern campaign among unification’s competing movements. Catalogue date refers to the album portrait, not the 1861 proclamation or the date of the campaign. Target: `italian-unification`.
5. **Russian serf emancipation**: [Alexander II Nikolaevich](https://www.getty.edu/art/collection/object/1099GF), Getty 84.XB.824.1.19, in an album dated 1866. A military portrait is framed by colored branches and imperial arms. Alexander II is explicitly named in the 1861 reform record. The interpretation discusses this ruler-centered image without making it evidence of peasant experiences or successful land reform. Target: `russian-serf-emancipation`.
6. **Dejima**: [Decima at Nagasaki](https://www.getty.edu/art/collection/object/109BCB), Felice Beato, 1863–1868, Getty 2007.26.70. Waterfront buildings, ships and hills show Dejima’s physical scale within Nagasaki harbor. Both caption and interpretation say that the photograph follows the Dutch factory’s 1859 closure. Target: `dejima-dutch-trading-post`.
7. **Austria-Hungary**: [Franz Joseph I](https://www.getty.edu/art/collection/object/1099FZ), Getty 84.XB.824.1.3, in an album dated 1866. The portrait with Austrian imperial arms precedes the 1867 Compromise. The separately inspected [Schönbrunn Group account](https://www.habsburger.net/en/chapter/empire-two-halves-compromise-hungary) explicitly identifies Franz Joseph as the emperor and king linking the two governments. The caption does not backdate the dual monarchy or identify these earlier arms as its later joint arms. Target: `austria-hungary-dual-monarchy`.
8. **Brazil’s imperial phase**: [Pedro II](https://www.getty.edu/art/collection/object/1099G4), Getty 84.XB.824.1.7, in an album dated 1866. The named emperor appears below the crowned green shield of imperial Brazil. Its precise fit is the imperial phase within the continuous country record, not the 1822 independence event or the 1888 abolition law, neither of which is assigned this image. Target: `brazil-independent-polity`.

The four album portraits credit **Franck as photographer** and **Justin Lallier for album text**, following the role-specific public collection API. JSON-LD’s unqualified creator array alone would blur these roles. The [complete album record](https://www.getty.edu/art/collection/object/104GSD) is saved as contextual evidence. The visible colored heraldic surrounds are retained, not added by the atlas.

## Held out

- **Ellora**, [Getty 1091FJ](https://www.getty.edu/art/collection/object/1091FJ): official catalogue identifies a rock-cut hall but no specific cave or patron. It does not establish Rashtrakuta sponsorship of the pictured structure. No image downloaded, no assignment proposed.
- **Lübeck**, [Getty 107H4Z](https://www.getty.edu/art/collection/object/107H4Z): downloaded and inspected; source-supplied title calls it cathedral arches, but the visible paved, vaulted arcade does not independently establish the specific building. Held out rather than turning a weak architectural identification into historical certainty. Its JPEG and receipt remain for review, outside the proposed shard.
- Search-only leads for Aachen, Isfahan, Samarkand, Himeji, Ceylon tea, Qutb and other phrasing did not produce another sufficiently exact candidate in the bounded search. There was no broad scraping or follow-on pagination.

## Discovery method and safe reuse

The web index was poor at finding individual Getty collection items. Getty’s **public collection app** exposed its own read-only endpoint in the application JavaScript. This endpoint yielded precise item identities and explicit image licensing:

`https://www.getty.edu/art/collection/api/search?q=Cordova&open_content=true&size=6`

Subsequent searches used `size=3`, URL-encoded terms, and no pagination. For conjunctions use individually quoted words, such as q=`"Mosque" "Damascus"`; unquoted `Damascus mosque` ranked album-level hits first. Examples that worked: `Monreale`, `Garibaldi`, `Alexander II`, `Dejima`, `Franz Joseph`, `Pedro II`.

The response’s `data` entries supply `primary_name`, `id_manager_slug`, `date_created`, `accession_number`, role-specific `producers`, and `manifest.thumb`, `manifest.license`, `manifest.attribution`. The exact collection permalink is `https://www.getty.edu/art/collection/object/{id_manager_slug}`. **Search filtering is discovery, not sufficient licensing evidence:** open and save the selected item page, inspect its JSON-LD `license`, `creditText`, `thumbnailUrl`, catalogue description and chronology, then inspect the actual pixels.

For an adequately large source, the official derivative pattern is `https://media.getty.edu/iiif/image/{image-id}/full/!1400,1400/0/default.jpg`. Check its source `.../info.json` when dimensions are small. Garibaldi’s 1,400 and 1,317 bounding-box requests returned HTTP 400; neither produced image bytes. The official image-info record advertised a 539 × 658 rendition, and `/full/539,658/0/default.jpg` then succeeded. No claim is made about an unreturned server error explanation. The rejected requests and successful exact-size URL are retained in receipts.

All requests were sequential with pauses of at least 1.3 seconds. Ten individual candidate item pages were opened, plus the parent album and one contextual Habsburg article. Searches were bounded to three results after the initial six-result query. No 403, 429, access denial or challenge occurred, and no previously blocked source family was revisited. Stop any future denied/challenged source rather than trying another route.

## Local checks

Baseline: 442 assets, 831 of 2,087 records covered. All nine proposed record IDs were absent from `visual-coverage-v18.json`’s covered IDs. All current visual shards and the current media catalogue were read for duplicate checking. No proposed collection URL, source image UUID or downloaded SHA-256 matches an existing asset. Proposed production paths do not yet contain these files; the parent owns integration and any final wording changes.

## Owner integration review

The owner separately viewed every admitted image and read the full target records. The two batches together add 16 historical images to 16 previously uncovered entries; 466 images now cover 855 of 2,087 unique entries (40.97%). Main and the live site are unchanged.

Getty album dating is explicitly attached to the album, without claiming a precise exposure date. Monreale stonework is described without assigning an individual maker. AWM creator, date and institution fields have Chinese translations. Duplicate image-level reading links were removed while all entry sources remain. Cairo speakers stay unnamed; the Korean latitude sign is distinguished from the later armistice line. Source-served image bytes and credit strips remain unchanged.
