# U.S. archives and government-image batch 04

Research completed 2026-11-12. Eight images illustrate eight previously uncovered entries. The research worker did not change production. The owner subsequently reviewed and integrated the eight images; publication remains pending the overall coverage target and final verification.

## Handoff

- Proposed v2 catalog: `research/v18/us-archives-04/visual-assets-us-archives-04-v18.json`
- Full assembled targets: `research/v18/us-archives-04/target-records.json`
- Item-specific source/rights/relationship evidence: `research/v18/us-archives-04/evidence.json`
- Page and image HTTP receipts: `http-receipts.json` and `download-receipts.json` in that directory.
- Pixel inspection and hash/dimension validation: `evidence.json` and `audit.json`.
- Embedded photographer metadata: `item-image-metadata.json`.
- Original unmodified downloaded images: `research/v18/us-archives-04/images/`.
- Candidate decisions and limits: `admission-rejection-ledger.json`.
- Source HTML and cleaned text are retained alongside those files. `nara-rights-prior-copy.html` was copied from batch 03, not freshly fetched.

All eight files were individually opened with `view_image`. Every title, alt text, caption, interpretation, creator, date and institution has English and Chinese text. All image bytes are original institutional renditions: no local crop, resizing, re-encoding or upscaling. All catalog files are JPEG, under 750,000 bytes and 3,000 pixels per side. The complete batch totals 620,139 bytes.

## Accepted subjects

1. **U.S. recognition of Israel**, 14 May 1948, 500×659, 26,036 bytes. Target: `palestine-partition-war-1947-1949`. This is Truman’s official recognition statement, not Israel’s declaration or a settlement of borders. Caption and interpretation explicitly preserve the limited U.S. perspective and the absence of Palestinian displacement and dispossession. The page’s sweeping historical background is not adopted.
2. **Nelson Mandela’s state-visit arrival**, 4 October 1994, 684×454, 41,909 bytes. Target: `person-nelson-mandela`. Exact military image 6493889 / DF-SC-97-00957, credited in embedded metadata to Linwood Moore, identified within the federal military-camera-original series. It illustrates his presidency, not the election or the whole anti-apartheid movement.
3. **Buzz Aldrin on Apollo 11**, 20 July 1969 as dated by NARA, 1200×1200, 222,497 bytes. Target: `apollo-11`. NARA explicitly names Neil Armstrong and NASA item 255-AMP-AS11-40-5903_alt. Download is from archives.gov, not a previously denied NASA endpoint. Caption distinguishes the Moon from the atlas’s Earth launch-site point and preserves NARA’s U.S. date convention.
4. **Václav Havel and Bill Clinton at the state arrival**, 16 September 1998, 500×420, 56,129 bytes. Target: `person-vaclav-havel`. Exact image P66443-34; Sharon Farmer, White House Photograph Office. The Library explicitly clears White House photographs as public domain and requests credit. Its published wide rendition exceeded the size limit. The final URL uses the Library’s evidenced `card` rendition style with the exact gallery filename and parameter; the server-created crop is disclosed and its downloaded bytes are unchanged. This is a later presidential photograph, not the 1989 transition.
5. **A family in the 1944 Mexican agricultural-labour photograph**, 298×196, 10,147 bytes. Target: `bracero-contracts-oral-histories`. DocsTeach identifies USDA Central Photographic Office image 16-N-6166 / NAID 596405 and explicitly labels it public domain. The small supplied JPEG is retained without enlargement. The caption does not identify the family as the entry’s named oral-history witnesses or assign individual contract status.
6. **Rachel Carson**, circa 1944, 1200×1523, 187,075 bytes. Target: `person-rachel-carson`. Exact FWS media record credits USFWS and explicitly says Public Domain. Its circa date is preserved, and the caption places the portrait before her later books.
7. **Berlin Wall opening at Potsdamer Platz**, 14 November 1989, 685×457, 68,861 bytes. Target: `berlin-wall-opens`. Exact federal image 330-CFD-DF-ST-91-01380; embedded metadata names Staff Sgt. F. Lee Corkran. The caption distinguishes this scene from the initial 9 November opening and from 1990 reunification.
8. **Martin Luther King Jr. speaking at the March on Washington**, 28 August 1963, 250×250, 7,485 bytes. Target: `person-martin-luther-king-jr`. DocsTeach’s exact NAID 542069 item explicitly labels the USIA photograph public domain; the Nixon Library independently identifies the same image and date. The item record does not name the photographer, so no individual name is invented. This is the supplied small JPEG, not a locally generated crop or enlargement. No speech text is reproduced.

DocsTeach is now a National Archives Foundation-hosted educational source. The two selected items identify their exact federal photographic collections and explicitly label the primary-source images public domain. Its separate licence for educational website content is not applied to these source photographs.

## Audit and limits

`auditHistoryMedia` reports no errors. SHA-256, byte counts and encoded dimensions match all eight files. No source-URL or record collision was found against the current 442-image/831-entry catalog or the Getty 05 research shard. All eight target entries remain uncovered at this check; the projected combined count after admitting this batch alone is 450 images and 839 covered entries out of 2,087.

There were 24 page requests representing 23 unique URLs, below the 25-page limit. One removed Century exhibit URL was inadvertently requested twice when an earlier shell call’s completion was not yet inspected; both results were 404. No 401/403, CAPTCHA, rate limit or denied-source retry occurred. Previously denied NASA/NPS downloads and blocked Library of Congress/Commons sources were not revisited. Search results were discovery aids; only inspected institutional pages support admissions. Catalog identifier links were not independently opened and are not represented as catalog-page inspections.

Rejected candidates include the possibly restricted Senghor museum photograph, private Memphis court exhibits, a chronologically weaker Great Migration scene, and Jefferson’s planning document, which would have been indirect padding for the Mandan/Hidatsa entry. The documented rejection ledger preserves these decisions. Two oversized Havel wide renditions were stopped at the byte cap and not saved.

For integration, copy each evidence item’s `imageReceipt.localFile` to the matching shard `file` path. Preserve item captions, bilingual metadata, the small-rendition limitations and Havel’s institutional-crop disclosure.

## Owner integration verification

All eight pixels and exact target records were reviewed. Captions and interpretation were tightened to remove generic defensive prose while preserving specific date and source limits. The Apollo asset is the separately identified NARA item AS11-40-5903_alt, not the held NASA AS11-40-5874 download. Carson is classified as a photographic portrait for People cards.

- `npm run build:visuals`: 450 images, 839/2,087 entries (40.20%); 205 additional entries needed to half.
- `npm run check`: 478/478 pass, no skipped or cancelled tests.
- Chrome local preview: all eight images decode at exact encoded dimensions; their English and Chinese captions, interpretation and credit metadata render correctly. Apollo visually checked; MLK keyboard zoom reached 125%, and its Chinese small-rendition/rights disclosure opened. Carson appeared automatically in Chinese People search with the new portrait.
- Complete durable evidence: `docs/v18-us-archives-04-evidence.json`. No main update or deployment; no Actions.
