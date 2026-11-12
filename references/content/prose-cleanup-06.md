# Reader-summary cleanup 06

## Result

40 additional English/Chinese summary edits, reviewed against the full 2,087 records assembled by `scripts/lib/atlas-records.mjs`. The batch excludes all 111 current summary-overlay entries and all 39 China visual-review entries. Eight selected records already have visual assets, including Kokoda, Hiroshima, the Marshall Islands, Singapore and Guadalcanal.

This is editorial cleanup, not renewed historical verification. The owner reviewed both languages and integrated the batch into the production summary overlay, bringing it to 151 edits. The site has not been published. All 82 source entries, source URLs, review metadata, related IDs and non-summary record fields remain unchanged. No summary URLs occur in this batch, so it removes no links.

## Files

Under `research/v18/prose-cleanup-06/`:

- `summary-edits-proposed.json`: runtime-compatible, exact bilingual before/after summaries with individual rationales.
- `records-before.json`: all 40 full assembled original records, including sources and qualifications.
- `evidence.json`: each proposal and rationale beside its full original record, plus the excluded IDs.
- `audit.json`: counts, preserved-field hashes, validation results, selected IDs and existing visual-file matches.
- `build-proposal.mjs`: reproducible builder. It refuses changed original records or overlap with either current overlay, and writes only proposal/audit/evidence files in this research directory.

## Editorial choices

The proposals remove map-display commentary, repeated entry-purpose explanations, cross-entry reading instructions and generic concluding lessons. Concrete relationships replace framing where needed. Generic modal lessons are deleted rather than converted into stronger factual claims; Maji Maji retains “can” for what an acquisition history can connect, and all other surviving modal qualifications remain scoped to their original claims.

Retained distinctions include:

- Research dates versus occupation estimates at Madjedbebe; heritage listing versus construction at Brewarrina; museum dating versus living malagan tradition.
- The two-atoll/Bikini nuclear-test counts; prospective radiological assessment versus historical exposure and individual causation.
- Disputed casualty estimates, partial diplomatic observation and allegations versus established evidence.
- Papuan coercion and unresolved compensation; plantation debt and non-uniform contracts; forced migration, dispossession, Indigenous authority and continuing cultures.
- Constitutional promulgation, effectiveness and later occupation ending; requested assistance under Niue’s free association; citizenship and voting rights separate from Australia’s referendum.
- Institutional-source limits on schooling, agricultural outcomes, craft attribution and printmaking credits.

All numeric tokens remain in the same order in each language. The combined summaries decrease from 52,278 to 46,209 characters, removing 6,069 characters (11.6%). The owner revised Wairau wording to preserve the distinction between research accompanying repatriation and any claim that repatriation created the research-community relationship.

## Validation

- `node research/v18/prose-cleanup-06/build-proposal.mjs`: passed. All 40 exact-before comparisons and bilingual changes passed. Applying the proposal in memory changes only selected summaries and their normal editorial-revision metadata; all 2,047 unselected records remain identical.
- `node --check research/v18/prose-cleanup-06/build-proposal.mjs`: passed.
- `node --test tests/summary-edits-v18.test.mjs`: 5/5 passed against the unchanged production overlay. This is a baseline regression check, not a claim that the proposal has been installed.
- Final English and Chinese summaries were read after generation, with punctuation, scope and modal-strength corrections made before the final build.

The original research builder is retained as preparation evidence, not a post-integration build step: it deliberately rejects entries already in the production overlay. The durable integration evidence is `docs/v18-summary-edit-06-evidence.json`, with complete original records and exact approved before/after text. Full application tests and representative EN/ZH browser checks are recorded below after execution. No source refresh or historical expert review is claimed.

## Integration verification

- `npm run build:visuals`: passed, preserving 442 historical images, 831 illustrated entries and the separate two original teaching graphics.
- `npm run check`: 474/474 passed, no skipped or cancelled tests. Two historical test counts were updated from 111 to 151; their content-preservation assertions remain intact.
- Chrome local preview: Wairau, Japan’s constitution and Kokoda reviewed in both English and Chinese. Revised wording, authority and coercion context, promulgation/effectiveness dates and source sections all render. Chinese Kokoda prose visually inspected at the current narrow viewport without horizontal overflow.
- Not deployed; release still requires the requested coverage target and final acceptance.
