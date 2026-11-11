# Reader-summary cleanup 02: proposal only

## Result

35 proposed summary edits, with both English and Chinese changed in every record. The 35 proposals do not overlap the 25 existing V18 edits or any ID in `china-visual-reviews-v18.json`. Night Revels (`china-landmark-526`) is excluded. Ten additional cases are explicitly retained because their apparent defensive phrasing carries material evidence limits or chronology distinctions.

The proposals shorten the selected bilingual summaries from 23,438 to 21,085 characters (2,353 fewer, approximately 10%). This is a bounded editorial pass, not fresh historical verification. No production files, sources, dates, coordinates, titles, identities or evidence-review statuses were changed.

## Deliverables

- `research/v18/prose-cleanup-02/summary-edits-proposed.json`: full runtime-compatible proposed shard, using `recordId`, exact `before.en/zh`, `after.en/zh`, and individual `rationale` fields.
- `research/v18/prose-cleanup-02/records-before.json`: complete current assembled target records, including their existing sources and qualifications.
- `research/v18/prose-cleanup-02/retained-material-uncertainty.json`: ten rejected edit candidates and the specific reason each remains unchanged.
- `research/v18/prose-cleanup-02/audit.json`: counts and preservation checks.
- `research/v18/prose-cleanup-02/build-proposal.mjs`: reproducible proposal builder and assertions. Writes only this research directory, never production.

## Assembly and admission

Inspected the current `applySummaryEdits` implementation and earlier evidence in `references/content/prose-cleanup-01.md`. Current text was assembled through `scripts/lib/atlas-records.mjs`, including evidence reviews, China reviews, place-label translations and the existing summary overlay, rather than copied from an earlier baseline.

The proposed shard passes `applySummaryEdits` against all 2,087 currently assembled records. Every before-value matches exactly. Dates represented by numeric tokens are unchanged in each language. Full record comparison confirms no changes outside summary and the overlay's expected editorialRevision provenance. The proposed metadata does not promote any source or review status.

The production owner can append these 35 items to the existing 25-item overlay, preserving its metadata and checking the combined overlay against the appropriate pre-overlay assembly. Do not replace the existing 25 edits or append after-values as if they were source text. The proposed shard alone applies to the already assembled current atlas; merged production validation must still use the owner's normal build and test process.

## Editorial choices

Edits mainly replace directions such as “helps understand,” “shows how,” “reading these together,” and “this entry” with the particular relationship already described. Redundant final sentences are removed when the preceding account already expresses their entire content. General counterarguments such as “history stopping at a single date” and “rather than appearing as a single invention” are removed while the concrete continuity or gradual development stays.

Substantive contrasts are retained: Jōmon is a changing archaeological tradition rather than one kingdom; Mauryan inscriptions express policy rather than proving benevolent lived experience; Kushan chronology remains debated; Gupta “golden age” language can obscure social differences; Wari abandonment remains disputed; Timurid artistic patronage remains connected to imperial violence. Dates, attribution, Indigenous identity, religious tradition and unequal power are not treated as clutter.

## Retained material uncertainties

- Memphis: burial-context bias limits the surviving picture of everyday life.
- Mohenjo-daro: archaeological remains do not identify a named ruler or all institutions.
- Teouma: probabilistic isotope interpretation and marine-food effects on radiocarbon dates matter.
- Olmec centres: circulating imagery does not establish one empire; rulers and beliefs remain uncertain.
- Achaemenid empire: court ideology must remain distinguished from conquest and resistance.
- Srivijaya: inscriptions and outside accounts do not establish fixed imperial borders.
- Chichén Itzá: political mechanisms behind architectural interaction remain debated.
- Majapahit: court literature and archaeological remains do not directly establish uniform territorial control.
- Wang Jing works (`china-event-donghan-006`): the 69–70 CE versus 11 CE map-display distinction needs a separate evidence-focused rewrite, not a stylistic deletion.
- Bao Zheng (`china-landmark-498`): the 1061 appointment must stay separate from earlier Kaifeng service.

These ten unchanged decisions are not a certification that every other sentence is ideal. They identify places where brevity must not replace substantive evidence discipline.
