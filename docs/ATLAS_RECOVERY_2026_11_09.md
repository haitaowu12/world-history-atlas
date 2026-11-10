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
