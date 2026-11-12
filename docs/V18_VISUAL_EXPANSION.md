# V18 visual expansion: scope and recovery

Started 10 November 2026, America/Vancouver. This conversation remains the implementation owner. Support agents have non-overlapping file assignments; no other active Atlas writer was visible in the accessible checkout, branches or open pull requests before editing.

## Verified starting point

- Main and the preceding recovery branch both point to `cc687364abd22595fba05c0d28a9c6b6f9531c85`. The working tree was clean. Its application, content and homepage backlinks are retained.
- The existing Firebase site now serves the V17 manifest and active content module; the live browser displays 2,084 entries and 103 readings. This supersedes the previous turn's publication status.
- The actual inventory contains 2,084 unique entries, 278 biographies and 29 image assets covering 29 entry IDs (1.39%). The starting 50% threshold is 1,042; every later receipt must recalculate against the final unique entry count.
- No direct Firebase CLI, login file, application-default credential or configured Google/Firebase identity is present in this executor at the start of this pass. Recheck available access before final publication; do not use Actions or change access to overcome that absence.

## Delivery scope

1. Expand authentic, locally shipped visual material across people, named events, objects, documents, places and regions. A source/rights record and a specific entry association are required for admission. Count unique covered entry IDs separately from distinct assets and image types. Do not use generic ornaments or the common atlas map as coverage.
2. Add a visual collection, useful image inspection and illustrated comparison. Put objects as well as portraits into discovery cards. Preserve keyboard focus, mobile reading, reduced motion and lazy loading.
3. Distinguish what an image depicts from the event to which it is linked. A later portrait of a named participant is a person image, not a depiction of the event. Modern site photographs retain their image date and restored/remaining-site context.
4. Streamline visible credit and source presentation, duplicate imported headlines and generic process commentary. Retain claim-specific uncertainty and useful authoritative evidence.
5. Add a small, source-checked bilingual knowledge cluster responding to measured thematic gaps, connected to existing records and readings. Update the coverage denominator.
6. Run complete local checks and inspect representative real image pixels and bilingual desktop/phone interactions. Save recovery checkpoints and deploy directly to the existing Firebase site only through already authorized access.

## Source and association contract

New media shards hold `items` using the existing asset metadata and `associations` with `assetId`, `recordId`, role, bilingual context, evidence URL and review date. Associations are reviewed independently of asset rights. Exact name matching may generate candidates; broad related-ID or summary mentions cannot automatically admit them. Old media objects remain intact.

The final coverage receipt will enumerate covered and uncovered IDs, report image types, verify local file bytes/dimensions/checksums, identify actual render paths and record loading results. Historical claims and source rights are not certified by structural tests alone.

## Checkpoint and workflow discipline

Implementation uses `review/atlas-visual-expansion-20261110`, based on `cc68736`. The sole workflow currently runs on pushes to `main` or `feature/atlas-*`, pull requests and manual dispatch. This review branch is outside the push patterns. Inspect triggers before each push, use `[skip ci]`, open no pull request and do not dispatch, retry or trigger Actions before December 2026. Main promotion and production publication are distinct from saving this branch.

Progress, source ledgers, measured coverage and final checks will be recorded here and in the accompanying release evidence. No percentage target is claimed until the shipped assets and entry associations pass their checks.

## Takeover and recovery, 10 November 2026

The previous Pro owner stopped without a recoverable image checkpoint. The only verified remote state was `92813961701ce02936e02b71299693c4dde7a1b8`; its 62-image / 424-entry progress claim is not treated as committed content. Tony approved continuing from the saved checkpoint and rebuilding missing work with frequent commits. The replacement implementation owner recovered that exact branch, checked the old conversation was not running, and preserved main at `cc68736`.

The source acquisition cache is local under `research/v18/` and excluded from Git. `node scripts/inventory-visuals.mjs` reconstructs its actual denominator. Candidate downloads are not admitted media: the catalogue requires source identity, reusable rights, visual review and a separate explicit entry association. Batch API reads avoid one request per biography. Provider rate limits stop or defer retrieval rather than being bypassed.

The visual direction preserves the existing atlas and introduces an image-led collection: large uncropped images, visible type/date, source-linked inspection, magnification, linked stories and two-image comparison. Existing detail cards will use objects as well as portraits. Counts distinguish distinct assets from covered records.

## Reconstruction checkpoint, 11 November 2026

The prior executor's later image batches and unpushed commit were unavailable after restoration. Searches of the current workspace, accessible remote Git objects and Space backups did not recover those files. This is new reconstruction from verified review commit `d28a466ce1df55b6642bdccdb17f416180480164`, not recovery of the former 897-entry claim. Main was independently observed at `fe11da29637e97d4d23c23c982fc0547bdb8e93e` and is not changed by this checkpoint.

The V18 image builder now assembles independently reviewed source shards and checks every asset's SHA-256, byte count and encoded dimensions. Its receipt counts unique assembled entry IDs and reports regional coverage, image types, missing IDs and the half-entry target. `npm run check:visual-target` fails until that target is reached. V17 narrative files, source records, image credits and geographic associations remain unchanged; derived geographic index versions follow the active manifest.

First reconstructed batch: six public-domain Met objects, including Mimbres pottery and Merovingian, Carolingian, Ottonian, Byzantine and Nasrid material. Each has its own object record, CC0 evidence and pixel inspection. Current total: **35 images covering 35 of 2,084 unique entries (1.68%)**, target **1,042**. This is a foundation checkpoint, not completion. Source ledger: `references/media/atlantic-rebuild-01.md`.

Validation: `npm run check` passed all **336 tests** with zero failures or skips. This includes actual encoded image dimensions, unique-entry coverage, preservation of frozen narrative inputs and keyboard focus after “Show more”. The under-half target command correctly fails. Reconstructed UI has not yet been browser accepted. No GitHub Actions, main promotion or production deployment occurred.

### Reconstruction checkpoint 2

Added 18 NARA documents in three six-image shards. These include founding documents, emancipation and civil rights, treaties and Indigenous protest, immigration restrictions, war diplomacy, railways and the New Deal. The introduced Lend-Lease bill is not presented as the enacted law; the Louisiana image shows binding and seal; the Navajo image is a signature page; the Cherokee petition is the 1836 protest against New Echota. All original source bytes were inspected and checked; ledgers `references/media/atlantic-rebuild-02.md` through `-04.md` retain exact identity, rights and hashes.

**53 images / 53 of 2,084 entries (2.54%)**. `npm run check`: all **336 checks pass**, no failures or skips. No UI changes in this checkpoint. The earlier six-image checkpoint is verified remotely at `86623a51d5298953eb3700fcfa11551a52729468`; main remains `fe11da2`. No Actions or deployment.

### Reconstruction checkpoint 3

Added five Chinese depictions with 43 individually reviewed associations, five Met objects for Egypt, Persepolis, Herat and the Mamluks, and ten world-history associations using already admitted images. The unique-entry result is **63 images covering 104 of 2,084 entries (4.99%)**. The target remains 1,042, with 938 entries still needed. Every association has its own bilingual explanation and evidence URL; duplicate images or multiple images on one entry do not increase the denominator or covered count. Source ledgers are `china-rebuild-01.md`, `atlantic-rebuild-05.md` and `atlantic-rebuild-06.md` under `references/media/`.

The Chinese review explicitly held weak image attributions and questionable event claims, including compressed Guandu chronology, Qingzhou troop counts, conflicting Changban narratives and literary anecdotes. Those issues are listed for targeted content review rather than treated as established facts by image matching.

Three bilingual image studies now compare later Three Kingdoms depictions, a Cherokee petition with a Navajo treaty page, and the Declaration with the Constitution. Each offers a specific question and two user-revealed observations. Entry details show a lead image, preserve additional figures in a native disclosure, and offer a direct side-by-side comparison when there are two images. Credits, source links and date distinctions remain attached.

Validation: **339 checks passed**, zero failures or skips. Actual pixels of the Chinese pair and Indigenous document pair were also inspected during study writing. Browser acceptance remains pending: the cloud localhost preview could not be reached from a separate health request or the cloud browser despite its server session reporting running. No network configuration changes or denied resize retry were attempted. This checkpoint is not represented as published or browser-accepted. Prior remote checkpoint is `f9c028125dd770b0fc2a516cabcd36b3fe63f993`; main remains `fe11da2`.

### Reconstruction checkpoint 4

Added five Met Open Access objects for Benin, Moche, Olmec, Chola and Kushan history, with object-specific source/rights evidence and inspected source bytes. Current image coverage: **68 images / 109 of 2,084 entries (5.23%)**. The additional ledger is `references/media/atlantic-rebuild-07.md`.

Reading cleanup is presentation-only: 966 repeated generic dating notes become one concise sentence; 979 entries group dataset/topic repository links separately from historical reading; six exactly matched bilingual review-scope templates are shortened across 166 entries. Source evidence moves into labelled native disclosures. Successful retrieval narration is omitted, while indexed-excerpt limits, disputed dates, retrospective speeches/army counts and shared evidence remain. Frozen source text and citations are unchanged. A duplicate-fact guard is tested, but no current-entry removal count is claimed. The gallery now interleaves image kinds so objects and documents appear alongside portraits.

Validation: all **345 tests pass**, zero failures or skips; `git diff --check` is clean. Browser acceptance remains pending under the checkpoint 3 connection limitation. Previous durable review checkpoint: `3a88d93269723950d9dab7a4acdb0193a27952f2`. Main and Actions are unchanged; no release or deployment.


### Reconstruction checkpoint 5

Integrated the four reviewed China shard-02 images (Taizong, Sun Quan, Sima Yi and Yue Fei) and 29 explicit new entry associations. The ledgers preserve later-image dates and avoid treating those portraits as contemporary event scenes. Total: **72 assets / 138 of 2,084 unique entries (6.62%)**. The target remains 1,042 entries and is not met.

Reconciled main through the isolated interface hotfix `5e610c8dd7b4f21b41a5d699a9b6399dc28ca6cb`, preserving both refreshed README files, live preview image, loading-state accessibility and directory-return improvements. Kept the V18 Images navigation while resolving the single HTML merge conflict. The fixed war-map control positioning and removal of the portrait-only filter are now also present in this review work.

`npm run check` passed **347 tests**, no failures or skips. The real shared Chrome preview now works via the desktop's ordinary terminal server. At 500 CSS-pixel width, the 72-image collection, Cao Cao/Zhuge Liang guided comparison, observation reveal, loaded images and source credits were inspected without horizontal overflow. The new Taizong image loads in the collection and its linked biography, retains Ming image dating and the 1748 remounting distinction, and switches to Chinese title/alt text. Keyboard magnification increased from 100% to 125% with image width changing from 385 to 481.25 pixels. The isolated production hotfix had separate 1168/700/500-width and bilingual directory browser checks; these checks are not a claim that all V18 content is release-ready.

The prior checkpoint is durably saved at `1ec53faba0c43237530c307ab28c621003d2dd78`. Main promotion and Firebase publication remain separate from this V18 review save. No Actions are used.

### Reconstruction checkpoint 6

Added 21 individually reviewed links from six existing images to previously uncovered entries: Su Shi, Qin Shi Huang, Kangxi, Qianlong, Li Bai and Yan Zhenqing’s manuscript. Reuse of an image does not add to the asset count. Total: **72 assets / 159 of 2,084 unique entries (7.63%)**; the half-entry target is still unmet. The source ledger records all 39 considered candidates, 18 exclusions or holds, and the evidence behind every admitted link. Repeated scene disclaimers were shortened while image dates and specific uncertainties remain.

Full validation: **347 checks passed**, zero failures or skips. The new Chinese manuscript link loads from its entry into the image inspector; its 600 × 449 source image, NPM record, CC0 credit and five linked stories are visible at 500 CSS-pixel width without horizontal overflow. The underlying donor entry's attribution of recovering the remains and the Li Bai–Du Fu meeting place are being corrected in a separate evidence layer, not silently certified by the new image links.

Checkpoint 5 is remotely verified at `fa9ec406a8621be28ab083019b6c1eef05b9168e`, tree `2a07a6e74c9a348a19fa587085760afe38cb1906`. This checkpoint changes review content only, with no production deployment or Actions.

### Reconstruction checkpoint 7

Added a separate, manifest-receipted V18 story-review layer for two image-linked Tang entries. The Li Bai–Du Fu story now distinguishes the uncertain Luoyang/Chenliu meeting location from their documented Liang–Song and Shandong travels. The manuscript story credits Quanming with recovering family remains, retains the manuscript's lunar date in 758, and explains visible revisions. Both have concise bilingual narratives and evidence notes, authoritative reading links, and direct links to the related biographies. Frozen donor files, identities, dates and coordinates remain intact; inherited map anchors are explicitly labelled as references rather than verified meeting or writing sites.

All **350 checks pass**, zero failures or skips. New regression checks verify the review receipt, unchanged unrelated entries and geography, preserved source provenance and the two substantive corrections. Actual browser checks verified both entries in English and Chinese, the corrected source-note disclosure and three connected-reading links on the poets' entry. Image coverage remains **72 assets / 159 of 2,084 entries**.

Checkpoint 6 is saved remotely at `a8445a7e0cdcb476944672ed012e0208eec74681`. This remains review work; no Actions or production publication.

### Reconstruction checkpoint 8

Added nine Chinese cultural images and ten Met Open Access objects, with individually reviewed links to 38 additional entries. Total: **91 assets / 197 of 2,084 unique entries (9.45%)**. The target remains 1,042 entries and is not met. The collection includes later depictions of poets and scholars, Mughal and Safavid paintings, a Kongo crucifix, a Maya column, a Chuquibamba tunic and a Majapahit architectural sculpture. Dates, named collections, source links and rights accompany each image. Two modern memorial candidates were held for incomplete underlying-work rights; Li Qingzhao instead uses a documented historical painting.

People cards now prefer an available portrait and otherwise show a related artwork without excluding anyone. The English gallery count handles a single image correctly. All **351 checks pass**, zero failures or skips. Real Chrome checks at 500 CSS pixels verified the Li Bai–Du Fu comparison, bilingual Ban Zhao People results including an unillustrated person, the 91-image collection, and the Kongo crucifix inspector with source, rights and linked stories. No horizontal overflow was observed in those flows. Cache versions were updated and the revised People behavior rechecked after detecting an earlier cached module.

Checkpoint 7 is saved remotely at `55ba185947643e69d2d798e939cd16513650d038`. This is a review-branch checkpoint, not a production release; no Actions are used.

### Reconstruction checkpoint 9

Added 15 documented Chinese ruler images and 19 photographs of historical sites, then 37 individually reviewed associations covering 36 further entries. Total: **125 assets / 284 of 2,084 unique entries (13.63%)**. Two views of Indus cities enrich one entry and count once. All 181 candidate association pairs were reviewed; 144 were excluded or held, and prior exclusions remain excluded. The half-entry target remains unmet.

Museum evidence corrects the Sima Guang portrait to a later addition to the 1086 appointment document, leaves Kublai's exact portrait date unestablished, and distinguishes later replacement sections of the Thirteen Emperors scroll. Site photographs retain photographer credits and separate reuse licenses. The Borobudur upload date is not presented as its photograph date. Rejected modern sculpture and uncertain historical reproduction candidates remain outside the deliverable.

All **351 checks pass**, zero failures or skips, after the final association build. Real Chrome at 500 CSS pixels verified the new 125-image catalogue and its 19-image site filter, Sanchi's loaded 960-pixel image with photographer, CC BY-SA and UNESCO reading, and Sima Guang's loaded portrait with corrected museum dating in English and Chinese. The inspected dialogs had no horizontal overflow. Those UI checks preceded the final 37-link data-only addition. Browser automation could not scroll some offscreen Chinese controls reliably; ordinary scrolling and accessibility activation completed the inspection. The image metadata's date and collection strings still have some English-only text in Chinese mode, an identified localization follow-up rather than a claim of fully translated metadata.

The source ledgers record specific historical discrepancies held for later correction, including the Xiliu date, Tongji/Yongji canal chronology, Humen quantity units and an unsupported fatal-wound account. Image relationships do not certify those uncorrected donor claims. Checkpoint 8 is remotely verified at `b735bf61b129f9effa69925edf0bffc466bd85a3`. No Actions or publication are part of this checkpoint.

### Reconstruction checkpoint 10

Added 22 Chinese historical images and 28 Met Open Access images. The combined catalogue now has **175 assets / 360 of 2,084 unique entries (17.27%)**. These batches add 76 newly covered entries after accounting for existing Bagan, Pala and Yongle links. The half-entry target remains 1,042, with 682 entries still needed. Images include Ouyang Xiu’s authentic 1072 letter, a Tang Shiji manuscript, a later Yongle Encyclopedia copy, Chinese engineering sites, Galileo and Luther prints, textile work, early writing, and named makers’ objects. Full album openings and later historical retellings retain their identities rather than being presented as single contemporary portraits.

Added a source-matched Chinese metadata layer for all 175 images (525 date, creator and collection translations). English source strings and image bytes remain unchanged. Admission rejects stale source strings, unknown IDs, missing translations and duplicates; rendering safely falls back to the source if a translation is stale. Chinese creator and collection names are searchable. The downloadable credit notice is now generated for every delivered image, including rights evidence and transformations.

Final validation: **356 checks passed**, zero failures or skips. An initial frozen-object comparison rejected the additive translation field; the test now compares every original field unchanged and separately verifies the new field’s English source matches. Browser testing also caught a cached media module; import versions were corrected, then the final full checks passed. At 500 CSS pixels, real Chrome verified the 175-image gallery with Chinese dates, the loaded Ouyang Xiu letter with Chinese maker/date/collection credits and linked biography, and Galileo’s loaded print with English credits and CC0. Inspected dialogs had no horizontal overflow.

Checkpoint 9 is saved remotely at `098945fc0fd2333e89ba517f38ab08702effe1d6`. This remains an unfinished review branch: no Actions, main promotion or publication.

### Reconstruction checkpoint 11

Added three bilingual, object-centered stories: Cao Zhenxiu’s 1799 commission of the Famous Women album, a Chuquibamba star-patterned tunic, and Majapahit domestic terracotta. All connect to existing histories and their specific admitted images. The denominator is now **2,087 entries**, with **363 illustrated by 175 assets (17.39%)**. The recalculated half-entry target is **1,044**, with 681 still needed. Broad or contextual map points are labelled and excluded from inferred modern-area associations; two older linked entries gained Chinese place captions. Frozen V17 data and all prior image bytes remain unchanged.

The collection now offers six guided, two-image studies. New pairs compare imperial and local weaving choices, Harappan water spaces, and manuscript / print encyclopedias. Questions lead to keyboard-operable observation disclosures, with source and rights links retained. The study menu is now a collapsed disclosure after the search controls, so six exercises no longer push mobile image search offscreen.

Final `npm run check`: **360 tests passed**, no failures or skips. The first full run identified the new connected readings’ missing Chinese place captions and an older test’s assumption that V18 could not add records. The captions were supplied in a separate layer; the preservation test still compares all pre-existing records and geography, allowing only the documented source corrections and additive place translations. New tests verify story receipts, cumulative counts, exact object links, date/place limits and accessible gallery ordering.

Real Chrome at 500 CSS pixels verified the Chinese Cao story and loaded album leaf, the Chinese weaving comparison and revealed observation, the image-to-Chuquibamba-story navigation, English Harappan and encyclopedia comparisons, and the Majapahit story / loaded sculpture inspector. Inspected images loaded, source and rights links were present, dialogs had no horizontal overflow, and Escape returned focus to the Images navigation button. These UI checks preceded only the final additive place-caption data update. No claim of exhaustive desktop or production release testing is made.

Checkpoint 10 is remotely verified at `047d3959f4a3b087854c048e30eccc1e9fb98599`, tree `362d3801d595c2572f214a8a5417d2827ac3a5fa`. Main remains `1b9156caf402d039057b9c1310da0e1a86318d89`. The review save uses no Actions and does not publish the unfinished pass.

### Reconstruction checkpoint 12

Added **31 site photographs** across Africa, the Pacific, the Americas and South / Southeast Asia. Total: **206 assets / 394 of 2,087 unique entries (18.88%)**. The half-entry target remains **1,044**, with 650 still needed. Seven mismatched or weak candidates were excluded. Every admitted file has verified encoded dimensions, bytes and SHA-256, exact source-page and license evidence, and a reviewed connection to the named site. Source-side edits and watermarks remain intact.

The caption now separates the photograph date from bilingual historical context, including twentieth-century re-erection at Ahu Tongariki, uncertain construction dates for Baiame’s Ngunnhu, and revised Ifugao terrace chronology. All 206 date / creator / collection fields have source-matched Chinese translations. Repeated relationship / observation sentences are shown once, and rights notices retain attribution, license and share-alike requirements without internal screening boilerplate. Search now includes image captions, historical context and named places, so “Brewarrina” and “布雷瓦里纳” find the fish-trap image even though its title uses the Indigenous name.

Final `npm run check`: **366 tests passed**, no failures or skips. New regressions cover date precision, restoration and dating limits, rejected site identities, escaped bilingual context, duplicate-prose suppression and place-name search. Real Chrome at 500 CSS pixels verified the 206-image / 394-entry count, Rapa Nui’s loaded image and separate restoration / photography dates, and the fish-trap image in English and Chinese with photographer, CC BY-SA, official context and reuse disclosure. The inspected image loaded at 960 pixels, dialogs had no horizontal overflow, and both search spellings returned one result. Browser testing initially found that caption-only place names were not searchable; the search expansion was then tested and rechecked in the browser.

Checkpoint 11 is remotely verified at `46733916a8ed0f71d29e39c15b37f0a84efd5554`, tree `d7651f937c9b98e0d284d3dc1f8b02ff5367a5d3`. This remains an unfinished review checkpoint, with no Actions, main promotion or publication.

### Reconstruction checkpoint 13

Added 32 source-identified images, including museum portraits, a numbered page from the 1810 *Orbis Pictus*, Ngata's annotated map, Sheppard's suffrage report and historical photographs. Each delivered file has inspected pixels and a verified checksum, byte count and dimensions. The final *Orbis Pictus* file is printed page 22, scan 0030; an earlier preliminary-leaf candidate is excluded. Three oversized sources remain held, not silently resized or admitted. Source and delivery receipts are preserved in `docs/v18-world-batch-06-evidence.json` and the media ledger.

Eight source-backed bilingual corrections separate Xiaoguan from Xiliu, surrendered soldiers from the selected Qingzhou force, Liu Xiu's accession from his capital move, the Tongji and Yongji canals, Yanmen from the later granary seizure, and Humen's separate chest/bag counts. The Ningyuan and Yuan Chonghuan entries no longer turn uncertain death mechanisms or attributed Qing accounts into established causal claims. Seven specific named-person image links accompany corrected entries. Original identities, numeric dates, coordinates and unrelated narratives remain unchanged. Evidence excerpts are retained in `docs/v18-story-corrections-02-evidence.json`.

Current total: **238 images covering 433 of 2,087 entries (20.75%)**. The half-entry target remains **1,044**, with **611** still needed. Chinese credit translations cover all 238 images and preserve their original English source strings. Two new guided comparisons bring the total to eight: numbered words and pictures in Comenius's teaching method, and political portraits at different material scales. Caesar's gemstone is labelled an ancient portrait rather than a royal image.

`npm run check`: **371 checks passed**, zero failures or skips. Real Chrome at 500 CSS pixels verified the 238/433 collection counts, both new comparison paths, Chinese observation reveals, loaded image dimensions, Escape focus restoration, the ancient-portrait filter and all eight corrected entry narratives across English/Chinese paths. No horizontal overflow was observed. Prior durable checkpoint: `a9dbbf444477caffd73e4879009831649909f8b1`. No main promotion, Actions or production deployment.

### Reconstruction checkpoint 14

Added 50 individually reviewed image-to-story connections using already shipped, source-identified images. Each connection names the relevant sitter and preserves the later portrayal's date and context. Paired albums distinguish Xiao He from Han Xin and identify Guo Ziyi on the correct side. Two proposed links were held because a deceased predecessor or contributing source was less direct than the story's focal person or book. The complete review dossier and remaining historical flags are preserved in `docs/v18-existing-links-03-evidence.json`.

**238 images / 483 of 2,087 unique entries (23.14%)**. Asset count is unchanged; coverage increases only for 50 distinct previously uncovered IDs. Target 1,044 remains unmet, with 561 entries still needed. `npm run check`: **374 checks passed**, no failures or skips. Real Chrome at 500 CSS pixels verified the Xiao He/Weiyang image and inspector connections in English, Guo Ziyi's right-hand identification in Chinese, successful image loading, the 483-entry count and Chinese gallery search. No horizontal overflow was observed. Prior durable checkpoint: `4051f8aac727bc9ebd514370cd2bf08fcca8ea5d`. Main, Actions and production remain unchanged.


### Reconstruction checkpoint 15

Added 57 authentic images: 39 Chinese portraits, manuscripts, printed pages, sculpture and historical photographs, plus 18 museum objects linked to wider world histories. Total: **295 assets / 566 of 2,087 unique entries (27.12%)**. The half-entry target is **1,044**, with **478** still needed. No generated likenesses or reconstructed historical scenes are counted. Thirteen oversized source originals were replaced by unchanged source-served derivatives before admission; the preserved paired albums identify the correct person and side. The Huo Qubing photograph is the recto with the stone horse, not the handwritten reverse, and the Qi Jiguang image is the opening text of the documented 1798 edition. Held and rejected files remain excluded.

Chinese source-matched credits now cover all 295 images. Source identity fields and prior translations remain unchanged. World-object captions distinguish 1436 art from the depicted 1403 episode, later Parthian rulers from the founder, uncertain findspots, an earlier Pekalongan cloth from the named 1910 garment, and Tipu's Mauludi calendar from Hijri dating. Captions and interpretive observations have separate purposes. Repeated collection/rights destinations and duplicate caption-to-story connection prose are suppressed in the presentation; distinct reading links and original evidence remain intact.

`npm run check`: **383 checks passed**, zero failures or skips. Real Chrome at 500 CSS pixels verified the 295-image / 566-entry count; Liu Bang's complete paired album and right-hand identification; Wang Yangming's manuscript in the default People card and detailed view, with no image toggle; distinct collection, license and Stanford reading links; Tipu's loaded object image, calendar distinction and nonduplicated story context in English; and both Yan Zhenqing's later portrait and dated manuscript in Chinese. Images loaded at their documented dimensions, Escape restored focus to Images, and inspected dialogs had no horizontal overflow.

Durable evidence is in `docs/v18-china-batch-06-evidence.json` and `docs/v18-world-batch-07-evidence.json`. Historical flags are retained for a separate correction pass rather than silently validated by image links. Prior durable checkpoint: `73f257c235c03c67253fd62a7cd2a908323fe2b8`. Remote main was independently observed at `b212fcc4293c72f8ff08f4b0fcd8109bd5caa94b`, containing the hotfix plus a newer timeline-reading-pace slice; those later main changes are preserved remotely and still require review-branch reconciliation before release. This save changes only the review branch, with no Actions or production deployment.


### Reconstruction checkpoint 16

Added **82 individually reviewed connections** using existing images, plus **seven links to newly corrected stories**. Coverage is now **295 assets / 655 of 2,087 unique entries (31.38%)**, with **389** still needed for the 1,044-entry target. The Lin Zexu image remains excluded from Wei Yuan's book entry: a contributing source is not the focal subject. Five Bai Juyi stories use the verified left-hand figure beside Liu Zongyuan; the shared image title now names both men and positions. Dujiangyan's modern photograph connects only to the irrigation clause, and Carver's teaching photograph is identified separately from the later demonstration wagon. Source identity checks do not certify every inherited event assertion.

Eleven bilingual corrections address Xie An's age versus length of retreat, Liu Bang's white-snake legend and accession, Huo Qubing's campaigns and tomb, transmitted Changping and Yique casualty totals, the stages of Zheng rule in Taiwan, the separation of Pingcheng's capital move from Yungang, and later stories about Li Yu's death. Longmen's start changes explicitly from 495 to approximately 493 following ICOMOS and Henan's account; its original year remains in provenance and its regional coordinates are unchanged. The later Binyang relief is dated about 522–523. Three unresolved chronologies remain held. Evidence and all original proposals are retained in the two checkpoint-16 evidence dossiers.

Full validation: **387 checks passed**, zero failures or skips. The first run correctly caught missing Chinese source descriptions; all new descriptions gained reviewed Chinese counterparts before the successful final run. Browser review at 500 CSS pixels checked all eleven corrected entry paths across English and Chinese, the source disclosure translation, Longmen's loaded relief and dates, Bai Juyi's left-hand identification, Dujiangyan's concise relationship and separate photography date, and the 655-entry gallery count. Inspected images loaded and the page had no horizontal overflow.

Prior durable checkpoint: `9f4cec355319ecfb3d40dd401a375044b5c49c87`. No image bytes changed. Main's separate timeline slice remains to be reconciled before release; no Actions, main promotion or deployment are part of this save.

### Reconstruction checkpoint 17

Added **13 Wellcome Collection images for 12 newly illustrated entries**, bringing coverage to **308 assets / 667 of 2,087 unique entries (31.96%)**. The half-entry target is still unmet: **377** more entries need meaningful images. The Bologna anatomy-theatre photograph was held because the target story explicitly concerns the medieval university before 1300. Every admitted official derivative retains item-specific Public Domain Mark evidence, exact file checksums, translated credits and complete pixels. Unknown print dates, later reconstructions and political interpretations remain identified without generic warning prose.

Two bilingual looking exercises bring the total to **10**: Singapore's harbour and rain-filled coast, and the contrasting political imagery of the Bastille and Paris Commune. Their prompts focus on visible composition; keyboard-operable observation disclosures let readers look before revealing interpretations. Chinese credit localization now covers 308 images / 924 fields, preserving all prior 295 rows.

Full validation: **389 checks passed**, zero failures or skips. The first run caught a previous test's hard-coded eight-study count, which was updated alongside the existing study-count test before the successful final run. Real Chrome at 500 CSS pixels verified the 308-image / 667-entry count, both new studies, English and Chinese credits/captions, loaded image dimensions, keyboard disclosure, Escape focus restoration and the direct paired-image link from the Straits Settlements story. Inspected dialogs had no horizontal overflow.

Evidence is retained in `docs/v18-world-batch-09-evidence.json`. Prior durable checkpoint: `a4a2bea768da586579bd49d01aef90656443e5f3`. Main remains `b212fcc4293c72f8ff08f4b0fcd8109bd5caa94b`; its separate timeline slice is deliberately not edited pending writer coordination. No Actions, main promotion or deployment are part of this save.

### Reconstruction checkpoint 18

Added **31 NPM images**, including complete historical portrait openings, Zhu Xi’s government letter, Huang Gongwang’s actual Fuchun scroll section, and later narrative paintings. Five additional connections reuse Lumbini’s Ashokan pillar, Sanchi’s architecture and Sheppard’s franchise report. Coverage is **339 assets / 718 of 2,087 unique entries (34.40%)**; **326** more entries are needed for the half-entry target.

Owner review kept nine chronology-flagged stories out of the new image connections and excluded four resulting orphaned assets. The full research proposal remains in the evidence dossier, with the owner’s admission decision taking precedence. Undated portraits now have a precise **Historical portrait** category: their date is not silently classified as either lifetime or later. Paired figures remain intact and the relevant person’s side is identified. Page-control text was removed from copied rights credits.

Huang’s own 1350 inscription says the Fuchun scroll remained unfinished. The story now describes that inscription and its 1347 beginning, preserves the original year and coordinates, and identifies the map point as a landscape reference. This follows the primary inscription and explicit Chinese catalogue explanation rather than an older conflicting English completion claim. Zhu Xi’s date is the **eighth lunar month of 1194**, not an unqualified Gregorian August. Chinese credit localization covers 339 images / 1,017 fields, with all previous 308 rows preserved.

An eleventh bilingual looking exercise pairs Ningzong’s portrait with Zhu Xi’s letter. Chrome checks at 500 CSS pixels verified this direct story comparison in both languages, manuscript loading and lunar date, keyboard observation disclosure, the new 26-image Historical portrait filter, the Fuchun correction and section image, Guangwu’s left-hand identification, the suffrage-report connection, and the 339-image / 718-entry count. Inspected views had no horizontal overflow. One transient preview click timed out during loading; a fresh state inspection showed the loaded page and the subsequent action succeeded without configuration changes.

Final validation: **395 checks passed**, zero failures or skips. Evidence: `docs/v18-china-batch-08-evidence.json`, `docs/v18-existing-links-05-evidence.json`, and `docs/v18-fuchun-inscription-evidence.json`. Prior durable checkpoint: `e711265077e1f9ec3f8f57a90b8c7ca19d5e67c0`. The separate main timeline implementation remains untouched pending coordination. No Actions, main promotion or deployment are part of this save.

### Reconstruction checkpoint 19

Eight bilingual corrections separate the fall of Ying from Qu Yuan's undated death account, Yue Fei's attributed campaign narrative, Song succession from the candle-and-axe anecdote, Tao Yuanming's 405 departure from the undated composition of Drinking V, Sun Quan's accession from his capital move, the 1224 accession from the 1225 Baoqing era, Wang Zhi's 1479 inspection from the following campaign narrative, and the 1427 Ming withdrawal from Le Loi's 1428 accession. Tao's inherited 393 date is preserved in provenance. Dong Zhongshu's disputed academy chronology remains held.

Six corrected stories receive focal-subject images. Bai Qi, rather than the peripheral Qu Yuan portrait, illustrates the fall of Ying. Chenghua and Xuande images remain excluded from the corrected campaign stories. Four further connections identify Dezong at Fengtian, Xie Lingyun at Yongjia, and Gaozong at Wenzhou and Lin'an. The Xuanzong/Dezong opening title now identifies both rulers and their positions. No image bytes, rights or credit translations changed.

Coverage is **339 assets / 728 of 2,087 unique entries (34.88%)**. The target remains **1,044**, with **316** more entries needed. Evidence is preserved in `docs/v18-story-corrections-04-evidence.json` and `docs/v18-existing-links-06-evidence.json`, including full reviewed records, exact excerpts and held alternatives. This is an unfinished checkpoint, not a release claim.

Final validation: **398 checks passed**, zero failures or skips. Chrome at 500 CSS pixels verified all eight corrected story paths across English and Chinese, the translated source disclosure, the four new album associations, the loaded 1,400-pixel Dezong opening and its left/right identities, and the 728-entry gallery count. Page width was 485 pixels with no horizontal overflow.

Prior durable checkpoint: `bedf469c211215a2770ab94d9f78d272891581ba`. Main remains `b212fcc4293c72f8ff08f4b0fcd8109bd5caa94b`. The separate timeline implementation remains untouched pending ownership coordination. No Actions, main promotion or deployment are part of this save.

### Reconstruction checkpoint 20

Twenty-four newly verified images illustrate primary manuscripts, textiles, political gifts, Caribbean sugar labour, Panama Canal households, Tonga, Petra, Zulu political imagery, Kamakura and Bangkok. Fifteen National Palace Museum items retain their item-specific CC BY 4.0 credit. Eight Wellcome images retain Public Domain Mark and the sugar engraving retains CC BY 4.0. Source-served image derivatives are unchanged. Creation, copying and later photographic printing remain distinct: Bangkok's negative is dated 1865 and the displayed print 1981; the imperial documents retain their lunar calendar dates.

Three existing-image connections add the Roman Republic, Heian writing and Hull-House. The Hull-House caption identifies Alva Belmont beside Jane Addams, rather than misidentifying her as co-founder Ellen Gates Starr. Existing image rights and bytes are unchanged. All previous 339 asset records and all 588 previous association records remain exactly preserved. The generated catalogue adds 24 image records and 28 associations; no existing record is removed.

A thirty-first bilingual story correction distinguishes Fuk'anggan's 1787 arrival in Taiwan and Zhuluo's renaming as Jiayi from fighting that continued into 1788. National Palace Museum exhibition evidence and Academia Sinica's historical-map commentary support the distinction. The original chronology remains in provenance. Unresolved Qing campaign dates and doubtful object attributions stay excluded rather than increasing the count.

Three new bilingual paired-image studies compare Song textile production and poetic imagery, Hongwu ritual gifts and military grain demands, and Panama dining facilities and family housing. There are now **14** guided comparisons with keyboard-accessible observation disclosures. New image captions and interpretations have been edited to avoid repeating one another.

Coverage is **363 assets / 747 of 2,087 unique entries (35.79%)**. The 50% target remains **1,044**, with **297** more entries required. Chinese credit metadata covers all 363 images / 1,089 fields. Evidence is preserved in `docs/v18-china-batch-09-evidence.json`, `docs/v18-world-batch-10-evidence.json` and `docs/v18-existing-world-links-07-evidence.json`, including full target narratives, rights receipts, hashes and held decisions.

Final validation: **404 checks passed**, zero failures or skips. Chrome at 500 CSS pixels verified the new Taiwan chronology, both language paths for the paired studies, keyboard observation disclosure, the 1388 lunar date, Liu Yuxi's default People-card portrait, Bangkok's negative/print dates, sugar attribution and local image loading, Hull-House sitter identities and image inspection, and the 363-image / 747-entry gallery count. Inspected page width was 485 pixels, without horizontal overflow. A collapsed study disclosure was expanded before selection; image inspection was verified after closing a previously open People directory.

This local checkpoint follows local `74c8a2752c2f84224bf7102b5db739b2f0f9aa2f`. The last verified remote checkpoint remains `bedf469c211215a2770ab94d9f78d272891581ba`; checkpoint 19's GitHub tree creation was denied and has not been retried. No remote save, main promotion, Actions run or deployment is claimed here. Separate timeline work remains untouched pending ownership coordination.

### Reconstruction checkpoint 21

Twenty-three new images add Song landscapes, Qin measurement inscriptions, Torghut court records, Ethiopian Christian objects, Pacific political documents, and Atlantic labour and abolition imagery. Twelve National Palace Museum items retain CC BY 4.0; five Wellcome images retain Public Domain Mark; four Te Papa images retain No Known Copyright Restrictions; two Smithsonian images have explicit object- and image-level CC0 evidence. Every image is an unchanged source-served derivative. The original 363 asset records and 616 associations are preserved exactly; this checkpoint adds 23 assets and 24 associations, illustrating 19 additional unique entries.

The captions distinguish a 1890 Waitangi account from the 1840 treaty, a 1930 colonial leaflet's accusations from the Mau movement's own position, a manuscript's biblical David from an Ethiopian king, an undated rubbing from its 221 BCE inscription, and later inscriptions from Song paintings. The date of Henry Heath's slavery satire remains explicitly unresolved because the catalogue's tentative 1832 date conflicts with the compensation legislation of 1833. The Smithsonian rights dossier records the specific CC0 fields alongside the conflicting generic search metadata.

A thirty-second bilingual chronology correction separates the 1759 conclusion of the Altishahr campaign from the Ili generalship established in the tenth lunar month of 1762. The Palace Museum's chronology supplies the evidence, while the original date anchor and coordinates remain preserved. The undated Guanbao manuscript illustrates court commemoration without being assigned an invented 1759 copying date.

Twenty-five bilingual summaries have been tightened without changing their other fields, source links or historical review status. A shared browser and build-time application layer rejects stale source text, unknown or duplicate targets, and edits outside the summary field. It preserves original wording and the editorial rationale. A fifteenth guided image study compares Guo Xi and Fan Kuan through scale, paths, people and later additions, with keyboard-operable observation disclosures.

Coverage is **386 assets / 766 of 2,087 unique entries (36.70%)**. The half-entry target is **1,044**, with **278** entries still requiring meaningful images. Chinese credit metadata covers all 386 assets / 1,158 fields. Evidence is retained in the checkpoint-21 image, summary-edit and Ili chronology dossiers.

Final validation: **414 checks passed**, zero failures or skips. Real Chrome at 500 CSS pixels verified the new Song study in English and Chinese, both loaded landscape images and keyboard observation disclosure, the Qing chronology and undated manuscript, the slavery satire's attribution and date qualification, Waitangi's 1890 cover, the Samoan leaflet in Chinese, both Ethiopian images and their CC0 credits, the Qin rubbing's separate creation and inscription dates, and the 386-image / 766-entry gallery with 15 studies. The inspected page width was 485 pixels, with no horizontal overflow. Chakri's streamlined bilingual summary retained its chronology and three sources. A previous test's fixed study count was updated from 14 to 15 before the successful complete rerun.

This local checkpoint follows `70892c724bb4202aedbfc2b874537d2331aefee0`. It is not a production release, and the half-entry target is not yet met. The separate timeline implementation is unchanged. Main promotion, Actions and deployment are not part of this checkpoint.

### Reconstruction checkpoint 22

Seven image inspectors now offer bilingual **Dates behind this image** sequences. They distinguish Guo Xi's painting from Qianlong's later poem; Ouyang Xiu's essay from Wen Zhengming's lunar-dated copy; Waitangi's signing from Colenso's later publication; Thomson's Bangkok negative from its later print; Darwin's approximate photographic sitting from the surviving print; a Qin edict from an undated rubbing; and Tonga's constitution from a later royal portrait. These are source-specific reading aids, not additional images or entry-coverage credits. Their dates come from the already reviewed object records.

Readers can open each stage with the keyboard to reveal a concise explanation. The ordered date markers are accompanied by text, visible focus and wrapping labels; no animation or proportional time scale is used. A changed source date disables its curated sequence rather than showing stale information. Existing image files, credits, source links and historical records remain unchanged.

Coverage remains **386 assets / 766 of 2,087 unique entries (36.70%)**, with **278** further entries needed. Full validation: **420 checks passed**, zero failures or skips. Browser review at 500 CSS pixels opened all seven sequences across English and Chinese, tested keyboard disclosure, confirmed the approximate, unknown and lunar-date distinctions, and visually inspected the expanded Song example. Page width was 485 pixels, with no horizontal overflow. The date layers are confined to image inspection and do not alter the atlas's year slider or playback.

This local checkpoint follows `062d9ad28c9e2cb0d4d34e161afc7daaa9fc12eb`. It is not a production release. Main promotion, Actions and deployment are not part of this checkpoint.

### Reconstruction checkpoint 23

Eight new images add a Ming depiction of Lü Bu, a damaged road inscription with Song commentary, a Qing transcription of the Tang Restoration Ode, Liu Yong's commentary on Caishi, a photograph of Ptolemy III's gateway, an 1830 Magna Carta portrait, Clive's titled portrait, and the Royal Society's 1667 allegory. Four National Palace Museum items retain CC BY 4.0; three Wellcome items retain Public Domain Mark and the Hollar engraving retains its item-specific CC BY 4.0. The actual selected manuscript openings and all eight images were inspected. All source-served derivatives remain unchanged.

Creation, copying and commemoration remain distinct. The road record separates the 1194 discovery, the commentary signed 1195, and the undated paper rubbing. The Tang text separates composition in 761, carving in 771 and copying in 1859. The William IV portrait shows the charter's later symbolic use, not the 1215 negotiations. The Royal Society scene is an allegory containing Bacon, who died before the institution's foundation. Held Carthage and copyrighted alternatives were excluded.

Five source-backed bilingual corrections separate Liu Yuxi's appointments from later literary traditions, Fan Zhongyan's 1040 Yan posting from the 1042 construction of Dashun, Yu Qian's interrupted tenure from a continuous elapsed term, and the reported 220,000 troops across Beijing's nine gates from the force at Desheng alone. Their dates and coordinates remain unchanged. Relevant portraits connect only after those corrections. Five repeated connection paragraphs are suppressed by retaining the existing image interpretation. Lu You's exact encounter chronology and the Lü Bu episode's 196 date remain held.

Coverage is **394 assets / 782 of 2,087 unique entries (37.47%)**. The half-entry target is **1,044**, with **262** entries still needing meaningful images. All previous 386 image records and 640 association records are preserved exactly; eight images and sixteen associations are added. There are **37** focused story corrections, **25** summary-only edits, **15** paired studies and **7** image-date sequences. Evidence is preserved in the China batch 11, world batch 13 and story-corrections 05 dossiers.

Final validation: **424 checks passed**, zero failures or skips. Real Chrome at 500 CSS pixels verified all eight new images loaded at their expected dimensions, all five corrected entry paths across English and Chinese, distinct manuscript dates, later portrait/allegory labels, usable reading and credit links, and the 394-image / 782-entry gallery. Page width was 485 pixels, with no horizontal overflow. The existing portrait caption remains visible without a redundant connection paragraph.

This local checkpoint follows `2f298a0999fa62c9287baffd5462640178c71871`. Main and the separate integration branch were read again and remain unchanged. This is not a production release; no main promotion, Actions or deployment is part of this checkpoint.

### Reconstruction checkpoint 24

Aligned discovery metadata with the existing Firebase primary site, `https://world-history-atlas-guide.web.app/`. The canonical URL, Open Graph URL and preview-image URL now agree. Added a permissive `robots.txt` pointing to a valid sitemap with the single real root document. Hash-based story states are not listed as separate indexable pages, and no speculative last-modified dates or ranking promises were added.

The optional legacy Pages exporter retains this canonical and sharing identity instead of expecting the retired host. It was syntax-checked but not executed for publication. This does not activate GitHub Actions, submit a sitemap to a search service, or change production hosting.

Validation: **427 checks passed**, zero failures or skips. The sitemap also parsed with an independent XML parser. Chrome verified the local canonical/social fields, visible robots content and rendered XML sitemap. Coverage is unchanged at **394 assets / 782 of 2,087 entries**, with **262** more needed for the half-entry target. This local checkpoint follows `231bea069c47856c533db981640c631ea4251278` and is not a production release.

### Reconstruction checkpoint 25

Nine new images add two later versions of the Night Revels story, four political coins, a Goryeo Buddhist painting, and two Ayyubid ceramics. Item-level CC BY 4.0, CC BY 3.0 TW and CC0 permissions, unmodified image receipts and full target records are preserved in the three batch-12/culture-12/world-14 evidence dossiers. All 394 previous image records and all 656 previous associations remain exactly unchanged.

The Night Revels entry now uses the Southern Tang contextual span 937–975 instead of asserting an exact 960 commission. The inherited date remains in provenance. Taipei's old copy is not presented as Gu Hongzhong's original, and its Ming garden adaptation is not authenticated as Tang Yin. The Yongli coin clearly separates Zhu Youlang's 1646 accession from the 1647 start of his reign era. Unresolved chronologies and restricted images remain excluded.

Two new bilingual guided studies compare later Night Revels compositions and political reign names on coins, bringing the total to 17. Thirty-five additional bilingual summary edits remove repetition while preserving archaeological uncertainty, regional differences, and the violence of imperial expansion. There are now 38 focused story reviews, 60 summary-only edits and 7 image-date sequences.

Coverage is **403 images / 789 of 2,087 unique entries (37.81%)**, with **255** additional entries needed for 50%. Final validation: **432 checks passed**, zero failures or skips. Chrome verified all nine new image loads, both study language paths and keyboard observation disclosures, the corrected Night Revels chronology, the Yongli accession/era distinction, Jōmon in both languages and shortened Timbuktu prose. The rendered page width was 485 CSS pixels with no horizontal overflow. A mistaken Jōmon test URL was corrected to the actual assembled record ID; no result was claimed for the invalid URL.

The previously approved checkpoints 19–24 were successfully saved to remote review commit `eef5a10ff6f7d2d0e88752cf2d7e8dd6292365f7`, tree `78628813b4b6858dcf33705005225a0515119f43`, exactly matching local `f2eb68c`. Ref readback and zero Actions runs were verified. Main remained `b212fcc4293c72f8ff08f4b0fcd8109bd5caa94b`; separate timeline `fb0c69a` was read without alteration. This checkpoint is not a production release.

### Reconstruction checkpoint 26

Integrated the immutable timeline playback slice without restoring its older image/prose tree. The controls now show the next historical date and elapsed years, offer 3/6/10-second reading pauses, and reconcile Play/Pause and endpoint state. Current main's README and map/People fixes, and newer visual discovery/canonical changes are preserved. The separate timeline branch remains untouched.

Full validation: **440 checks passed**, zero failures or skips. Real-browser playback and bilingual/keyboard/end-state checks passed at the existing 500-pixel viewport. Real hidden-tab and OS reduced-motion acceptance are explicitly not claimed; actual production callbacks have focused tests. See `TIMELINE_INTEGRATION_V18.md` for exact evidence and remaining browser limits. Image coverage remains **403 / 789 of 2,087 entries**, with **255** more entries needed. No Actions, main promotion or deployment is part of this checkpoint.

### Reconstruction checkpoint 27

Four new images add Castiglione’s 1755 Ayusi scroll, Hiroshige’s fish printing block, a 1901 Australian Federation procession, and a 1967 referendum campaign badge. NPM CC BY 4.0, Smithsonian CC0, AWM public-domain and Museums Victoria image-specific CC BY 4.0 evidence are preserved separately. The Ayusi whole-scroll derivative was requested from the source at 3000 pixels to satisfy the unchanged image-dimension limit; no local image editing was applied. All 403 prior image records and 659 prior associations remain exactly unchanged.

A thirty-ninth story review corrects the misleading English claim that Dawachi was destroyed, describing defeat, flight and capture in 1755. It identifies Ayusi’s portrait as court commemoration, preserves the original narrative, retains the coordinates, and makes the Ili point a regional reference rather than an exact raid/capture location. The museum’s older English 1775 typo is recorded against its Chinese 1755 chronology and inscription. The printing-block caption credits Hiroshige’s design without inventing the carver or printer. Australian object and photographic dates remain distinct, and the referendum account avoids the common citizenship/voting-rights misconception.

The eighteenth guided comparison contrasts public Federation celebration with the referendum badge’s call to action. Current totals: **407 images / 793 of 2,087 unique entries (38.00%)**, **251** more needed for the half-entry target; 39 focused reviews, 60 summary-only edits, 18 studies and 7 image-date sequences.

Final validation: **444 checks passed**, zero failures or skips. Chrome verified all four new images at their expected dimensions, the revised Ili and printing-block stories in both languages, Australian study English/Chinese credits and keyboard observations, and no horizontal overflow at a 485-pixel content width. The existing timeline integration remains intact. The initial build correctly rejected an oversized source derivative; a conforming source-served image and the missing source checkedAt field were supplied before the successful build. No check threshold was weakened.

The preceding timeline checkpoint was saved after fresh authorization at remote `668478a2d204bc1227a179ef7c37bd6d417f9c15`, tree `027ebcb6f4bc1aec0d08f38d8f0b6675fc36eacf`, matching local `54818ee`. Its ref/tree and zero Actions runs were verified. Main and the separate timeline branch remain unchanged. No publication is claimed.

### Reconstruction checkpoint 28

Two unchanged Australian War Memorial photographs add Indonesian independence slogans in Jakarta and survivors at Bergen-Belsen. Both have individual public-domain declarations and successful image receipts, separate from the website’s text licence. Captions distinguish the Jakarta catalogue date from an independently established exposure time and Belsen’s liberation date from the photograph’s unspecified day. The Belsen image is non-graphic; no names, ethnic identities or personal histories are inferred from visible faces. Original credit strips and complete frames remain intact.

A sixty-first summary-only edit removes Edo’s generic concluding lesson while retaining its artistic, social and foreign-contact details. All 407 previous image records and 660 previous associations remain exactly unchanged. Coverage is now **409 images / 795 of 2,087 unique entries (38.09%)**, with **249** more needed for the half-entry target.

Final validation: **446 checks passed**, zero failures or skips. Chrome verified both new photographs at their expected dimensions, the English and Chinese contextual captions, the revised Edo prose in both languages, the 409-image / 795-entry gallery count, and no horizontal overflow at the existing 485-pixel content width. The integrated timeline remains intact.

Checkpoint 27 is remotely saved as `3b0557cc4ea8953f24d6f3dcb5c1e59efcabdffc`, tree `5e95fe22011797f8d14327f37bf2989146109943`, matching local `6f1f97b`; ref/tree and zero Actions runs were verified. This is further review work, not a production release.

### Reconstruction checkpoint 29

Twenty-five more bilingual summaries remove repetitive reading instructions and closing recaps, bringing the separate summary-only overlay to **86 entries**. The selected prose is 3,709 characters shorter (16.8%). All historical fields and source lists remain unchanged. Hangul’s generic concluding sentence was deleted instead of strengthening “can widen” to a causal assertion; its design dates, twenty-eight letters and gradual adoption remain. Samarkand keeps named collaborators and separate construction/publication dates. Indonesian regional diversity, Teouma’s isotope/dating limits, Hội An’s uncertain itinerary and object dates, and community return discussions all remain.

Final validation: **447 checks passed**, zero failures or skips. A baseline-only comparison initially rejected the first edited V18-only object story; it now explicitly applies only baseline-targeted edits in that comparison, verifies every other target is a V18 addition, and leaves full-record overlay preservation testing intact. Chrome verified Hangul, Samarkand and Hội An in English and Chinese, the existing Hội An image’s decoded dimensions, and no horizontal overflow at the current 485-pixel content width. No test threshold was weakened.

Image coverage remains **409 images / 795 of 2,087 unique entries (38.09%)**; the half-entry target is not yet met. Checkpoint 28 is remotely saved as `f5f1d5dab7fc04bb2552d8f964f3c8402e4819c8`, tree `1ebbeb98a1215879c89e462c9c7e05396819b15a`, matching local `2e53d6e`. Ref/tree and zero Actions runs were verified. No publication is claimed.

### Reconstruction checkpoint 30

Five Getty CC0 images now illustrate Christine de Pizan's manuscript circulation, Charlemagne's coronation, the Black Death, the Roman Principate and Hellenistic royal representation. The illuminated manuscript and two historical paintings are explicitly dated later than their subjects. Augustus's marble head is idealized political imagery, while Berenike's bronze intaglio has a date range extending beyond her lifetime. Source-specific captions and rights are bilingual. The Christine image uses an unchanged source-served 1400-pixel derivative within the existing byte limit. All **409 prior images and 660 prior associations remain exactly unchanged**.

The image inspector now has accessible previous/next controls and a position count within the current search and filters. Buttons stop at the endpoints; a single-result set disables both. A story image outside a stale filter falls back to the full collection. Navigation resets image magnification and keeps collection filters when returning. Controls have 44-pixel minimum height and work by keyboard in both languages.

Twenty-five further summary-only edits bring the overlay to **111 entries**, with full originals preserved. The UN Charter now gives its purpose and distinct signing/entry-into-force dates without repetitive location commentary. Accounts retain slavery and exclusion, Indigenous governance and rights, surviving Rapa Nui culture, armistice versus peace, and unfinished constitutional processes.

Final validation: **452 checks passed**, zero failures or skips. Chrome verified all five new images at their encoded dimensions, English and Chinese captions/credits, a filtered five-image sequence, both endpoints, keyboard previous/next, keyboard zoom and reset on image change, single-image disabled navigation, retained search on return, the 414-image/800-entry gallery count, and revised UN prose in both languages. The inspector screenshot is legible at the existing 485-pixel content width with no horizontal overflow. All original image and association records were compared directly against the preceding checkpoint and retained byte-equivalent JSON values.

Coverage: **414 images / 800 of 2,087 unique entries (38.33%)**; **244** more entries remain for the half-entry target. Checkpoint 29 is remotely saved as `e0b8349ad97bc5de01c5425f6e08c703114d349f`, tree `5c6df39a8fa84f698816ced101ef9497763efab6`, matching local `19df338`. Ref/tree and zero Actions runs were verified. Main remains `b212fcc4` and the separate timeline branch remains `fb0c69ae`. This remains review work, not a production release.

### Reconstruction checkpoint 31

Nine source-verified images add four official U.S. archive documents/photographs, four Getty works and a later Shi Kefa portrait. Guadalupe Hidalgo’s signing and ratification exchange have separate dates. Executive Order 9066 retains the distinction between its broad wording and the targeting of Japanese Americans. The Korean agreement remains an armistice, not a peace treaty. Cuban missile-site annotations are identified as U.S. intelligence analysis.

European images show Florence’s artistic production, medieval reception of Paul’s letters, a French copy of Gratian’s canon-law textbook, and later paired commemoration of Isabella and Ferdinand. Paul’s image explicitly depicts Philippians rather than Corinthians. The Shi Kefa portrait is an undated Qing copy, separate from the 1645 defense and death. Source-specific rights, dates and credits are bilingual. All **414 prior images and 665 prior associations remain exactly unchanged**.

Three additional image-date sequences bring the total to **10**. Christine de Pizan’s work now separates composition, copying and illumination in three keyboard-operable stages. Charlemagne and the Black Death distinguish events from later painted interpretations.

Chrome verified all nine new images at their expected decoded dimensions and their English/Chinese captions and credits. Keyboard disclosure works in the new three-stage sequence and the two later-painting sequences; the gallery reports 423 images / 809 entries. The treaty inspector screenshot is legible with no horizontal page overflow at the current 500-pixel viewport. One ambiguous test locator was narrowed to each disclosure before successful keyboard checks; no application defect was involved.

Coverage: **423 images / 809 of 2,087 unique entries (38.76%)**; **235** more entries remain for the half-entry target. Initial validation caught a manuscript representation mismatch and a missing Chinese source note. Both source data issues were corrected without weakening checks. Checkpoint 30 is remotely saved as `36f25c33c1889370edd4f2cbbcb5a1d1fff95e3a`, tree `591ad2765c7a7bf57b0d1b4883b21caad2c648eb`, matching local `bd8b3e3`. The review ref and main were rechecked; main remains `b212fcc4`. No publication is claimed.

Final validation: **457 checks passed**, zero failures or skips, after rebuilding the complete visual catalogue. No GitHub Actions were run.
