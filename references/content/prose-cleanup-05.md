# Reader-summary cleanup 05: proposal only

## Result

25 additional bilingual proposals, selected individually from the 2,087 full records assembled by `loadAtlasRecords()`. They exclude all 86 current summary edits and all 39 focused China review records. No production, Git, upload or Actions writes were performed. This is an editorial review, not fresh verification of historical claims or sources.

## Artifacts

- `research/v18/prose-cleanup-05/summary-edits-proposed.json`: runtime-compatible proposals with exact English and Chinese before/after summaries and individual rationales.
- `research/v18/prose-cleanup-05/records-before.json`: full assembled originals, including source links and every other record field.
- `research/v18/prose-cleanup-05/evidence.json`: before/after, rationale and full original record together for each proposal.
- `research/v18/prose-cleanup-05/audit.json`: counts, record IDs and validation outcomes.
- `research/v18/prose-cleanup-05/build-proposal.mjs`: reproducible builder with individually selected exact phrase replacements; writes only this research directory.

## Editorial choices

The proposals remove study invitations, instructions about atlas display and repeated topic recaps. Where the framing contains substantive distinctions, those distinctions remain in direct prose. Nunavut retains the distinction among international borders, internal administrative boundaries and Indigenous rights, as well as public government versus Inuit treaty rights. Rapa Nui retains the restricted time span, disputed settlement date and continued living culture. Nalanda preserves the possibility that remains predate the educational phase. The Korean armistice retains its military line versus the 38th parallel and its distinction from a peace treaty.

First Fleet colonization retains Eora identity, existing Aboriginal governance, land competition and resistance. Adwa retains later Italian aggression and remaining regional inequality. New Zealand suffrage retains the unfinished wider equality struggle. Ilkhanid Iran retains conquest, violence, recovery and patronage, rather than reducing artistic production to peaceful exchange. The United Nations entry retains signing location, global reach and later activity. The Paris Agreement retains the distinction between promises, implementation and measured outcomes. The Indian constitution retains the distinction between legal guarantees and actual equality. Named source institutions and differing emphases remain in the Siam entry.

There is no mass deletion rule and no source-link removal. Generic illustrative modal claims are removed only as whole pedagogical statements; no retained `can` or `may` is strengthened into an established historical fact.

## Validation and integration

The builder checks exact before-text matches against currently assembled records and applies the proposal with the application's `applySummaryEdits`. All 25 change both languages, exclude existing overlays and China review IDs, and preserve numeric date tokens. All non-summary fields, including sources, remain identical except the overlay's expected `editorialRevision` metadata.

These checks establish technical preservation, not renewed historical verification. For integration, append approved items to the existing overlay rather than replacing it, then run normal assembly and tests. A fully accepted batch would bring the overlay from 86 to 111 items. Rerun the builder immediately before integration to detect concurrent changes or overlap.

## Owner admission

All 25 bilingual proposals were reviewed and admitted, bringing the overlay to 111 summaries. The UN Charter's redundant closing location/global-reach sentence was removed, while its signing and commencement dates remain. Sarajevo retains qualified causal language in Chinese. Final before/after texts and complete originals are in `docs/v18-summary-edit-05-evidence.json`; no historical fields or source lists changed.
