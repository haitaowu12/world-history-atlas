# V5 research, import and corrections

Checked and integrated on **23 October 2026 UTC**. This record distinguishes source-preserving import, new historical synthesis, and bounded independent review.

## What changed

The atlas adds **78 original bilingual historical essays**: 76 across the nine editorial regions and two additional China essays. It also incorporates **975 mapped events** from the pinned Jiangshan reference project. These are different evidence classes. Imported source links establish provenance; they do not certify the historical claims. The combined collection contains **318 original history essays, 24 researched biographies and 975 imported events: 1,317 entries**.

| New original coverage | Added entries | Selected examples |
| --- | ---: | --- |
| Africa | 9 | Nok, Djenné-Djeno, Aksum’s conversion, Mapungubwe, Ife, Lalibela, Mbanza Kongo, Gondar, Abu Simbel relocation |
| Europe | 9 | Roman citizenship, Justinian’s compilation, Hagia Sophia, Aachen, Domesday, Norman Sicily, Lübeck, Royal Society, British emancipation |
| North America | 9 | Norse woodworking in 1021, Mesa Verde, Québec, Niagara diplomacy, Declaration of Independence, Cherokee removal, Seneca Falls, Canadian Pacific Railway, Montgomery boycott |
| Latin America | 9 | Monte Albán, Nasca/Palpa, Palenque under Pakal, Dresden Maya Codex, Tenochtitlan, Potosí, Cartagena, Mexico’s 1917 Constitution, Brasília |
| South Asia | 8 | Taxila/Sirkap, Ajanta, Sigiriya, Polonnaruwa, Thanjavur, Fatehpur Sikri, Jaipur observatory, Bengali language movement |
| Southeast Asia | 8 | Đông Sơn objects, Pyu cities, Sukhothai, Melaka, Batavia, Singapore’s 1819 agreement, Philippine declaration, Siam’s 1932 transition |
| West and Central Asia | 8 | Nineveh, Sardis, Cyrus Cylinder, Bisotun, Damascus, Samarkand, Isfahan, Gülhane edict |
| Oceania | 8 | Wairau Bar, Lapaha, He Whakaputanga, Australian gold rushes, Marshall Islands tests, Cook Islands, Vanuatu, Mabo |
| Japan and Korea | 8 | Hōryūji, Nara, Tripitaka Koreana, Jikji, Imjin War, Tokugawa government, Japan’s postwar constitution, Korea’s June movement |
| Additional China essays | 2 | The dated 868 Diamond Sutra and the Grand Canal network |

The 76 regional records each contain an original English summary of 96–109 words, a substantive Chinese summary, two bilingual key facts, date/location qualifications and related reading. They cite **153 specific source pages** between them; two documents per entry, with three for Japan’s constitution. “Two documents” does not imply two independent research teams. Institutional summaries are distinguished from object records, original documents and primary research.

Full claim-specific source lists and editorial decisions appear in [Asia/Pacific research](V5_ASIA_PACIFIC_RESEARCH.md), [Africa/Europe/Americas research](V5_AFRICA_EUROPE_AMERICAS_RESEARCH.md), and the entries in [history.json](../dist/data/history.json). The generated [v5 source index](V5_SOURCE_INDEX.json) maps the additions and review sources to the records that use them.

## Complete accounting for the China event source

The fixed source is [haitaowu12/jiangshan-map at fcd6484d06d3c581241fc24adbab288cf3a4a2ea](https://github.com/haitaowu12/jiangshan-map/tree/fcd6484d06d3c581241fc24adbab288cf3a4a2ea). The import reads the actual chronology, lore and translation files, not a feature list in the README.

All **442 milestones and 536 landmark rows** have an outcome: **975 mapped records + 2 exact duplicate rows + 1 held record = 978 inputs**. The held record mixes Malacca and Galle in its narrative with a Champa-coast location. It remains inspectable in the manifest rather than acquiring a guessed replacement point. Similar events at different points or with different wording remain separate.

The library also preserves 104 person indexes, seven chronicles with 68 stops, 185 gazetteer entries, 87 city notes, 20 passes, 1,387 period-place rows, 342 reign-name change points and 16 corridor descriptions. The person indexes are not invented full biographies; place rows repeat across periods and are not a count of distinct cities. Period bounds are source display windows, not political lifespans. See [the import audit](V5_CHINA_IMPORT.md), [manifest](../dist/data/china-import-manifest.json), and [preserved notices](../dist/data/china-upstream.LICENSE.md).

## Targeted China corrections

The immutable import remains separate from [china-reviews.json](../dist/data/china-reviews.json). `applyChinaReviews` adds display corrections while retaining original titles, text, dates, locations and source pointers. Its scope is **two reviewed events and 24 annotated chronicle stops**, not full corroboration of all imported material.

### Event reviews

- **Bi Sheng:** the displayed interval is 1041–1048, replacing the inherited exact year 1047. The rewritten entry describes reusable clay type and explicitly identifies Kaifeng as a regional reference, not a verified workshop. Evidence: [Asian Art Museum, printing in the Tang and Song](https://education.asianart.org/resources/the-invention-of-woodblock-printing-in-the-tang-and-song-dynasties/).
- **Dujiangyan:** the display uses an approximate origin around 256 BCE, explains the engineering functions and subsequent alterations, and removes the source’s immediate “Land of Plenty” formulation. The representative point follows the listed waterworks. [UNESCO’s synthesis](https://whc.unesco.org/en/list/1001/) supports the third-century/c. 256 BCE convention; a contradictory second-century phrase in one criterion is disclosed in the evidence note, not silently treated as agreement.

### Chronicle annotations

The chronology review distinguishes an arrival or chapter anchor from every event and quotation discussed inside it. It does not mechanically move whole compound chapters to the year of one poem.

- **Su Shi:** notes separate the 1071 Hangzhou anchor from a 1073 poem, the 1075 Mizhou chapter from the 1076 *Shuidiao Getou*, the 1077 Xuzhou chapter from the 1079 arrest, the 1080 Huangzhou arrival from 1082 compositions and later manuscripts, and the 1097 Danzhou arrival from a 1100 return-voyage poem. Evidence comes from Hong Kong Education Bureau teaching materials, National Palace Museum descriptions, and a named scholar’s authored teaching resource. Exact URLs and read scopes are stored at the relevant stops.
- **Wang Yangming:** the source’s statement that his father placed first in the examination the year after his 1472 birth is corrected to 1481, following Guizhou University’s specialist article. Internal source notes also separate later examination and teaching episodes from earlier chapter anchors.
- **Li Bai:** the Suyab birthplace attribution is visibly qualified as disputed. The review does not choose a new verified birthplace.
- **Xuanzang:** the eight early route dates remain inherited and explicitly disputed. Étienne de la Vaissière’s 2010 article abstract argues for 629 rather than 627; the full paper was not read, and no blanket two-year shift is applied to the intermediate stops.
- **Qin Shi Huang, Zhuge Liang and Zhang Qian:** notes identify compound years, later literary remembrance, retrospective quotations or a later honor. Several of these annotations are internal consistency checks on the source text, not independent historical corroboration.

Ten external sources and the frozen upstream chronicle support this bounded annotation pass. Original quotations and inherited translations remain attributed. No new complete external poem or translation was copied for these corrections. A commander’s campaign locations and an author’s later literary association do not establish a precise personal itinerary.

## Two new China essays

`diamond-sutra-868` uses the [International Dunhuang Programme’s object explanation](https://idp.bl.uk/discover/learning/buddhism-on-the-silk-roads/articles/buddhism-on-the-ground/buddhist-texts-the-diamond-sutra/) and [catalogue record](https://idp.bl.uk/collection/51FDAEAFB4A24E2E9981692A98130BC8/). It distinguishes the dated surviving edition from the origin of printing, and the Mogao discovery context from an unverified printing location.

`grand-canal-network` follows [UNESCO’s synthesis](https://whc.unesco.org/en/list/1443/) for seventh-century integration of earlier waterways and later changes. Its 601–700 window is a teaching interval, not a claim that the Sui dynasty lasted to 700 or that every canal section was built during one continuous project. No exact canal line is inferred from its representative Yangzhou point.

## Independent checks on the new regional material

A second reviewer checked all 76 staged records for schema, identity conflicts, related links, numerical bilingual consistency and obvious date/location problems. Six consequential claims received additional source consultation: the regional versus single-atoll nuclear-test totals; Cook Islands free association; the conditional nature of the Mabo decision; He Whakaputanga’s initial signing; the stages of British emancipation; and 1021 as dated Norse woodworking rather than a settlement-foundation date. No material correction was requested from that bounded audit.

This is not independent verification of every sentence or of all 153 URLs. Institutional sources can contain errors, outdated statements, rounded dates and political framing. The research logs explain observed conflicts, including the Bikini count, Hōryūji phases, Tripitaka production versus later storage, and source chronology for several monuments.

## Learning design and remaining coverage

Four new guides connect the material: **Printing: invention, editions and surviving evidence**; **Water, cities and the work of maintenance**; **African histories through cities, courts and craft**; and **Reading documents: claims, authority and rights**. Questions ask readers to compare evidence and identify uncertainty. They are teaching prompts, not additional historical assertions or scored answers.

The atlas now has substantially denser China coverage and more connected sequences elsewhere. It does not have equally detailed histories of every country. The next editorial pass should corroborate inherited China claims, resolve the held mixed-location episode, and continue regional depth using specific sources rather than adding unsourced names or generating territorial shapes from points.
