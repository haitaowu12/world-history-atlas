# Reader-summary cleanup 04: proposal only

## Result

25 additional bilingual summary edits, assembled from the current 2,087 records through `scripts/lib/atlas-records.mjs`. They exclude all 61 existing summary edits and all 39 focused China review IDs. Both languages change in every proposal. The selected summaries fall from 22,105 to 18,534 characters, a reduction of 3,571 (16.2%).

This is an editorial proposal, not fresh historical verification. No production files or Git state were written. Dates, locations, identities, sources and review status remain unchanged. Existing source links are preserved in the full original records; this shard does not propose link removals.

## Deliverables

- `research/v18/prose-cleanup-04/summary-edits-proposed.json`: runtime-compatible shard with exact bilingual before/after text and individual rationales.
- `research/v18/prose-cleanup-04/records-before.json`: complete assembled originals, including sources and all non-summary fields.
- `research/v18/prose-cleanup-04/retained-material-uncertainty.json`: ten rejected deletion cases with complete original records and reasons.
- `research/v18/prose-cleanup-04/audit.json`: counts, IDs and validation outcomes.
- `research/v18/prose-cleanup-04/build-proposal.mjs`: reproducible builder, writing only the research directory.

## Editorial decisions

Most deletions remove a concluding invitation to study, compare or look at material after the account already supplies the substance. The Singapore treaty keeps all three signatories and the distinction between the 1819 trading post agreement and the unequal 1824 sovereignty treaty. Samarkand keeps its named collaborators, construction and publication dates. German reunification keeps the explicit difference between the wall opening and completed unification. Damascus retains the warning that surviving fabric is not all early-eighth-century evidence.

The Indonesian independence example is not a wholesale deletion: its closing statement retains Jakarta as the proclamation’s political centre and explicitly retains varied experiences across the archipelago. The anti-reduction instruction is replaced by those direct statements. Likewise, the Soviet formation entry retains institutional and territorial distinctions, and Hōryūji retains the difference between founding, rebuilding and the age of surviving fabric, without announcing a lesson in historical method.

Teouma was retained intact in an earlier pass for good reasons. This proposal removes only its final description of how the entry complements another story. Probabilistic isotope conclusions, individual variation and marine-food effects on radiocarbon dating remain verbatim. No assumption is made that an earlier rejected deletion makes every sentence untouchable, or that it licenses removal of the actual limitation.

The later object stories keep makers, cultural affiliation, colonial impacts, community collaboration and return discussions. Hội An keeps the probable attribution, differing object dates and uncertain itinerary/sinking year. Onfim keeps the museum interpretation and its limits. Majapahit keeps uncertainty about the depicted narrative.

## Rejected deletions

Ten full cases are retained in the audit: Srivijaya (uncertain borders); Memphis (burial-context bias); Wairau Bar (descendant authority and ancestral remains); Nineveh (fragments versus complete books); Cyrus Cylinder (royal statement versus human-rights charter); Fort Mandan (knowledge is not consent); Thunderbird Park (distinct viewing, use and hereditary performance rights); Chola (cultural reach versus control, plus substantive agricultural context); Brazil (monarchy, slavery and different independence outcomes); Neo-Assyria (royal propaganda, violence and continuity).

## Validation and integration

The builder applies the shard using `applySummaryEdits` to the current assembled records. Exact before values, changed English and Chinese, no overlap, unchanged numeric date tokens and unchanged non-summary fields are asserted. Only the overlay’s normal `editorialRevision` metadata is permitted to differ outside summary. These are technical preservation checks, not renewed verification of the underlying historical claims.

For production integration, append these items to the existing overlay; do not replace the current 61 items. Reassemble and run the normal build/test workflow against the appropriate pre-overlay inputs. The isolated proposal is tested against the currently assembled, already-edited atlas. The combined overlay would contain 86 items if no intervening edits have landed. Rerun the builder before integration to catch overlap or changed source text.

## Owner admission

All 25 proposals were reviewed and admitted with one refinement: Hangul’s concluding generic sentence was removed rather than changing “can widen” into a stronger causal assertion. Original summaries, full records and admitted text are saved in `docs/v18-summary-edit-04-evidence.json`. Existing 61 overlays remain intact, for 86 total. No chronology, sources, identity or review status changed.
