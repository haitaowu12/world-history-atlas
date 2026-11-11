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
