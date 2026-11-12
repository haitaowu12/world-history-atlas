# NARA exact-source visual batch 02

Reviewed 11 November 2026. Four new assets cover four previously uncovered records. Sources were fetched successfully (HTTP 200), images saved byte-for-byte, SHA-256 and dimensions measured, and every actual image inspected with `view_image`. No production assets or manifests changed.

## Deliverable

- Proposed catalog: `research/v18/us-archives-02/proposed-shard.json`
- Item evidence: `research/v18/us-archives-02/evidence.json`
- Validation: `research/v18/us-archives-02/audit.json` (zero schema errors, zero already-covered links)
- Original source bytes: `research/v18/us-archives-02/images/`
- Source pages and full record candidates are retained alongside the shard.

## Selected images

1. `treaty-guadalupe-hidalgo`: exchange-copy binding and seal, not a readable treaty page. 500 × 421, 46,678 bytes. https://www.archives.gov/milestone-documents/treaty-of-guadalupe-hidalgo
2. `japanese-american-incarceration`: opening page of EO 9066. 500 × 776, 42,531 bytes. https://www.archives.gov/milestone-documents/executive-order-9066
3. `korean-war-armistice`: printed first page and preamble. 500 × 898, 53,887 bytes. https://www.archives.gov/milestone-documents/armistice-agreement-restoration-south-korean-state
4. `cuban-missile-crisis-1962`: San Cristóbal No. 1 reconnaissance briefing photograph, 14 October 1962. 690 × 576, 330,407 bytes. https://www.archives.gov/milestone-documents/aerial-photograph-of-missiles-in-cuba

The last two concern U.S. military/diplomatic involvement abroad and match their exact atlas events. None are generic portraits or flags. The treaty image is classified as an object photograph because its binding and seal are visible, rather than its text. The armistice caption deliberately avoids the source introduction's loose claim that the document ended the war: the preamble actually distinguishes military cessation from a final peaceful settlement. Cuban labels are explicitly described as U.S. intelligence interpretation.

## Rights review

NARA's policy, saved as `rights.html`, says federal-agency and NARA-produced works are public domain while warning that not every archival holding is. Each selected item is identified on its official page as either a government/diplomatic instrument in Record Group 11 or a Department of Defense reconnaissance briefing item (PX1966-020-007, JFK-5047). No private third-party copyrighted photograph was selected. The treaty's 1848 underlying object is public domain and the official page supplies the NARA reproduction. Item-specific reasoning is recorded in the shard and evidence JSON, rather than asserting that archival custody alone proves rights.

## Scope and limits

This batch stops at four strong matches; it does not force twelve images by adding generic U.S. imagery. No blocked provider was used, no challenge or HTTP 403/429 occurred, and no alternate access route was attempted. Catalog URLs are recorded as source-linked identifiers, not claimed as separately inspected. Integration must copy the original images to the `file` paths specified in the shard, without edits. Shard paths are proposed only; production integration is left to the parent.

## Owner integration, 2026-11-12

Admitted after individual source-image inspection and full target review. Final captions and metadata are in dist/data/visual-assets-us-archives-02-v18.json; durable evidence is in docs/v18-us-archives-02-evidence.json. Generic contrast prose was shortened while preserving source dates, context and rights.
