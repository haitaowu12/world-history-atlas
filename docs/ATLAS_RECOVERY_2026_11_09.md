# Atlas recovery and completion record

## Ownership and recovered baseline

This continuation starts from `3849fb809e9340e0a06ffa9329c0cdcdb3f733a0`,
including the personal-homepage backlink change. The remote feature branch
`feature/atlas-stories-portraits-20261109` remains at
`784b1d991cb92ac7945407fde99fe587eb7d5947`. No open pull request was returned
by the repository inventory on 9 November 2026 (Vancouver time).

The previous conversation's source notes report an isolated local draft with
133 biographies, 47 stories and 30 readings. These are reports of work, not a
verified saved release. The conversation link returned an access error in the
available browser. No Atlas checkout, draft, handoff archive or saved recovery
file was found in the accessible workspace or file search. The original
workspaces have not been changed. Their live execution state cannot be read
from this environment; no competing writer was visible in the accessible
repository state.

Implementation uses the isolated branch `review/atlas-completion-20261109`.
The existing feature branch is preserved. Before updating any remote ref,
refresh its head and reject an unexpected change rather than overwrite it.

## Inspected inventory and bounded scope

The committed application has 1,936 historical records, 177 full biographies,
and 278 distinct People-directory entries. Of those, 101 are inherited person
profiles without a full biography. The reported draft's 310-person count is
not the count of the recovered committed application.

The completion increment is defined against this inspected inventory:

1. Research the 101 existing profile-only people, retaining their directory
   identifiers. Use supported focus periods and dated milestones; a source's
   uncertain lifespan must not become an exact new assertion. Record an
   explicit exception when the evidence cannot support a biography contract.
2. Develop 47 connected regional stories and 30 thematic readings across the
   roadmap's regional workstreams. Inspect existing articles before choosing
   each topic, and use original English/Chinese synthesis with specific source
   notes. These are a bounded completion scope, not a claim to finish world
   history or reconstruct unverified borders.
3. Review Jiangshan from the already-reviewed `5be0dd1` through current
   `cfdd892`, adopting useful methods with credit and without importing its
   restricted geometry or unverified battle claims.
4. Add useful, attributable historical images where source identity and reuse
   rights can be established. Preserve later-depiction distinctions.
5. Repair bilingual place/source presentation and exercise the expanded People,
   stories, readings, shared links, keyboard and narrow-screen journeys.

## Checkpoint and verification policy

The repository has one workflow, `.github/workflows/firebase-hosting.yml`.
It triggers on pushes to `main` and `feature/atlas-*`, on pull requests, and
on manual dispatch. The recovery branch is outside those push patterns.
Every checkpoint commit also uses `[skip ci]`. No workflow is dispatched,
retried or otherwise intentionally triggered before December 2026. All
validation and browser acceptance run locally. A pull request or main update
requires another trigger review first.

The runtime supplies Node 24, Python, Chromium and Playwright. Application
content is static and has no package-install/build dependency. Retain input
hashes, check results and scope progress with coherent commits. An incomplete
source batch remains identified as draft and is not added to the runtime
manifest until it passes its checks.

Firebase publication is conditional on existing authorized deployment access.
No Firebase CLI session, Google application-default credential or configured
deployment identity was present in the accessible runtime at recovery. The
repository's existing deploy job uses GitHub Actions workload identity, which
is unavailable under the user's November prohibition. Do not alter access or
security configuration to replace it.

## Progress

- Recovery: committed baseline and directory inventory inspected; prior draft
  not recovered.
- Donor comparison: four newer commits and 25 changed paths inspected; no new
  person profiles or narrative records in that delta.
- Content, media, application checks and publication: pending; later entries
  in this record will report observed results separately.

### Biography and navigation checkpoint

- Nine later Chinese biographies (Zheng Chenggong through Deng Xiaoping) are
  saved as a researched draft shard, with 31 dated milestones and bilingual
  source notes. The active manifest remains V16 until the full V17 admission
  checks pass; this checkpoint does not inflate the published entry count.
- Same-ID profile upgrades now merge through an explicit `sourceProfileId`
  identity link and preserve the inherited reference interval and aliases.
  The Places directory respects the record's bilingual location labels.
- Chronologies with fewer than three supported dates require an explicit,
  bilingual, dated review linked to actual sources. No zero-point exception
  is allowed. The V17 generator requires the entire 101/47/30 scope before
  producing a release manifest.
- Baseline `npm run check`: 313/313 tests passed. The 16 focused biography,
  directory and image tests pass after these application changes.
- Standalone Playwright launch was blocked by the runtime's local-socket
  restriction; automatic approval review rejected a sandbox escalation. The
  supported Sites preview successfully loaded the existing atlas and its
  278-person directory in the shared browser. Expanded-content and responsive
  checks follow once the release inputs are complete.

### Regional research and image checkpoint

- The next saved draft snapshot contains 63 biographies and 205 milestones
  across the early, medieval and later China shards. All saved main and
  milestone places have English and Chinese labels. Two pending related-ID
  corrections were reported to the content author; runtime admission still
  requires every actual target record.
- Shared search normalization handles tone marks/diacritics, compatibility
  width and repeated spaces across map, People, references and readings.
  Historical identity matching remains strict. The 32 focused search,
  directory, core and reading tests passed.
- Eleven reviewed images are saved in a versioned candidate media catalogue,
  preserving all sixteen V16 item objects. The new catalogue contains 27
  images and remains inactive until V17. See `HISTORICAL_MEDIA_V17.md` and
  the image-specific NOTICE for source identity, date, rights and reuse.
- The image renderer supports lifetime painted/engraved portraits separately
  from photographs and later depictions, and can show an additional archive
  link for identification/date evidence. Existing media regression tests pass.

### Complete profile-backlog checkpoint

- All 101 planned biography upgrades are saved, with 330 dated milestones.
  Six biographies have a source-linked limited-chronology review. Combined
  record validation and expansion auditing passed with no errors after a
  vocabulary correction; bilingual locations, identities and related targets
  were also checked. The three regional research ledgers preserve the actual
  claim-to-source decisions. Stories and readings remain in progress, and the
  active release is still V16.
- Two Met CC0 object photographs bring the candidate catalogue to 29 images.
  All 29 local byte counts and SHA-256 receipts match. Candidate record links
  were checked against current biographies and the three named V17 story IDs;
  final activation must resolve those IDs in the completed release.
- The 24 focused biography, directory, media, search and V9 regression tests
  passed. This reuses the previously passing baseline for unchanged inputs;
  a complete release check follows activation.
- CH3 source correspondence was checked against fetched, hash-verified donor
  blobs: 187 river records, 62 lake edges, 41 labels and 16 corridors. The only
  corridor date transformations are the existing 2026 caps on two source
  `9999` end years. See `CH3_SOURCE_COMPARISON_V17.md` for the implementation
  inventory and the historical/per-feature-rights questions that remain.

### Completed V17 integration and release evidence

- The agreed content increment is complete: 101 biography upgrades with 330
  dated milestones, 47 regional stories and 30 new guided readings. The
  prepared application has 2,084 unique historical entries, 278 biographies,
  278 directory people, 103 readings and 29 historical images. The 148 new
  records cite 236 distinct source URLs. All new stories occur in readings;
  prior reading objects and the original sixteen media objects are preserved.
- `npm run build:content` and `npm run check` both exited 0 against the final
  inputs. The complete check reported 325/325 passing tests, with zero failures,
  skips or cancellations. Workspace receipts are
  `../recovery/v17-build-final.log` and `../recovery/v17-check-final.log`.
- The place-caption overlay supplies 149 reviewed Chinese translations for
  older linked records. Independent review retained the English inputs and
  location qualifications, corrected subsequent-capital wording, and aligned
  the established Kültepe name. The display module also supplies the 975
  imported captions through 970 exact source pairs and five guarded amended
  labels, preserving the existing geography and source review status.
- Source cross-review corrections, media reuse evidence, CH3 limits and
  completed counts are recorded in [V17 release evidence](V17_RELEASE_EVIDENCE.md)
  and its linked research ledgers. The completed increment does not close all
  32 continuing regional workstreams or certify inherited linked material.
- The last pushed pre-integration checkpoint is
  `300c2708a1e0d46337c8f0918d3005a863b5300e`. The completed tested release is
  pushed at `07890359d4850611fd6e4aafe8d41d4b665c30a5`, tree
  `451c765e70184517d02e5009d3ab334e892de650`, matching the tested local tree.
  Supported CUA review is
  complete: desktop, 768/390/320-pixel layouts, English/Chinese, portrait and
  object credits, keyboard focus, one-point chronology and a shared reading
  restored at step 2/5. Screenshots and command output are saved under
  `docs/v17-evidence/`. Standalone Playwright's socket escalation was
  automatically rejected and was not retried; no access or security setting
  was changed.
- The recovery branch remains outside workflow push patterns, no pull request
  was opened, and no Actions workflow was run. Main's `3849fb8` baseline and
  homepage backlinks remain preserved. Firebase publication is blocked on an
  existing authorized direct deployment session. A live read-only browser check
  on 10 November UTC still showed 1,936 entries and the preserved homepage
  backlink; the live site has not received V17 from this continuation.
