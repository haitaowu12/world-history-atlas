# Atlas 0.22.0 — stories, portraits and source context

Prepared 9 November 2026 against atlas revision
`bae33f3bcbefc8294bfd76805d121d2a16d24020`.

## Delivered scope

This increment adds **14 original bilingual stories**, corrects and documents
the evidence behind **four existing China stories**, adds **three guided
readings**, and supplies **16 locally hosted historical images**. The runtime
collection now contains **1,936 records**, including 177 biographies, and **73
guided readings** (66 study guides plus seven original journeys).

The historical review covers the new stories, the four corrected stories and
the selected images. It does not certify every inherited record or historical
boundary in the atlas.

## Donor review and selective adoption

The [Jiangshan review](JIANGSHAN_REVIEW_2026_11_09.md) compares donor revisions
`9799f0f61cff80922970d2a0b304e18527db7e1e` and
`5be0dd1ae8550ea7376dde6aa95dd9c4eabe827e`: 105 commits and 449 changed paths.
It records useful ideas, source coverage, dated content decisions, and rights
limitations. The complete tree comparison avoids treating GitHub's truncated
300-file compare response as a complete inventory.

The An–Shi storyline, Su Shi additions and institutional history prompted new
atlas stories written from separately inspected sources. No donor code,
narrative paragraphs, screenshots, audio or new polygon layer is copied in
this increment. Existing donor attribution and frozen source identities remain
intact. Chronology problems, unconverted Chinese-calendar month labels,
unqualified counts and a malformed actor ID are documented rather than
transferred into the atlas.

## New stories

| Region | Story | Focus interval and evidence distinction |
| --- | --- | --- |
| China | An–Shi: a war that changed the Tang | 755–763; population-register changes are not treated as a measured death toll |
| China | Du Fu's *Spring View* | 757; poetic testimony is distinguished from a military report |
| China | Yan Zhenqing's mourning draft | 758 manuscript; the remembered family's location is not asserted as the writing site |
| China | Su Shi's *Cold Food* poems | Poems dated 1082; the surviving calligraphy was written afterward |
| China | Su Shi and West Lake | 1089 appointment and 1090 dredging/causeway work are distinguished |
| China | *Yongle Encyclopedia* | 1403–1408 compilation; surviving sixteenth-century copies have separate dates |
| West Asia | A copper deal goes wrong | Approximately 1750 BCE; Nanni's complaint is one party's testimony, not a finding of fraud |
| West Asia | A recipe written in clay | 1900–1600 BCE object interval; findspot attribution and missing cooking instructions remain qualified |
| Africa | Meketre's bakery and brewery model | Approximately 1981–1975 BCE; a funerary model is not a census of ancient labor |
| Africa | Akan goldweights | 1500–1700; selected brass weights are identified as Akan without assuming an Asante workshop |
| Americas | A Maya cacao cup | 600–900; inscription, proposed provenance and curatorial interpretation remain separate |
| Americas | An Inka tunic | 1400–1535; evidence about a garment type does not identify this object's wearer |
| Oceania | Marshallese navigation charts | Surviving 1920s charts do not date the origin of the living navigation tradition |
| Oceania | Tongan ngatu for a child's celebration | Named makers and a 1983 family occasion; no rights-reserved photograph is redistributed |

The [China research trail](JIANGSHAN_REVIEW_2026_11_09.md#new-original-stories-and-evidence-trail)
and [world story research notes](V16_WORLD_STORIES_RESEARCH.md) record the
inspected sources and their limits. Sources include historical texts,
university scholarship, museum object records and a Marshallese community
organization. The 14 records cite 30 distinct source URLs, with English and
Chinese evidence notes and truthful retrieval disclosures.

Independent second-pass reviews checked the source-to-claim matches, dates,
representative locations and bilingual qualifications. The reviews retained
uncertain findspots, proposed stylistic provenance and the distinction between
an artifact's date and a tradition's history. One correction changed
“promised” to “expected” in the Jingyuan story: the cited evidence establishes
an expectation of a reward, not a promise.

## Four existing stories corrected

The stable IDs in [china-donor-stories.json](../dist/data/china-donor-stories.json)
are retained so existing links and notebooks continue to resolve.

| Existing story | Change |
| --- | --- |
| Jingyuan Mutiny and Fengtian, 783 | Added Graff and *Zizhi Tongjian* evidence, qualified the reward expectation, and avoided unsupported conversion of a traditional-calendar month |
| Chu and Jingnan | Changed the focus interval to 927–928; distinguished Ma Yin's earlier 907 title, the 927 King of Chu investiture and the 928 naval conflict |
| Nine Classics printing | Changed the interval to 932–953, separating authorization from completed printing blocks; no claim that printing was invented in 932 |
| Salt and Iron debate | Preserved 81 BCE while distinguishing attributed arguments in the received text from a neutral transcript or a general account of the Xiongnu |

Donor PR #229 remains credited for topic selection. Its link is no longer the
only support for those historical claims.

## Reading and image experience

The three new readings appear among the recommended choices:

- **History in your hands: eight objects, many lives** — eight stops comparing
  what objects, inscriptions and museum interpretations can establish.
- **The Tang crisis through surviving words** — five stops connecting political
  context, a poem, a mourning manuscript and the later Jingyuan mutiny.
- **Books, poems and public work** — four stops separating printing,
  composition, copying, appointment and construction dates.

The [image catalogue](../dist/data/history-media.json) and
[image notice](../dist/assets/history-media/NOTICE.md) document ten portraits
or historical depictions, four object photographs and two manuscript details.
The people are Darwin, Harriet Tubman, Hatshepsut, Kartini, Liliʻuokalani,
Mansa Musa, Marie Curie, Murasaki Shikibu, Sor Juana and Xuanzang.

The People directory offers a keyboard-operable portrait filter. Images also
appear with their linked stories and biographies. The visible captions retain
creator, image date, institution, collection link, reuse terms and a bilingual
interpretation note. Later depictions are identified as later depictions;
there are no generated likenesses or reconstructed historical scenes.

All files are local and lazy loaded, preserve their full aspect ratios, and
total 2,811,969 bytes. Each file is below 750 KB. A missing image reveals an
accessible fallback linked to its collection record, while its caption and
narrative remain readable. A missing image catalogue leaves the atlas usable
and explains why the portrait filter is unavailable.

Image rights are separate from the atlas narrative license. The catalogue
preserves each source's public-domain, CC0 or CC BY-SA designation and any
required named attribution. See the [media review](HISTORICAL_MEDIA_2026_11_09.md)
for source-page access limits and individual image decisions.

## Verification and publication

Structural validation passes for the 1,936-record corpus, related IDs,
reading references, source URLs, media metadata and local file checksums.
Historical source review and visual inspection remain separate from schema
validation.

The release gate includes the existing regression suite, V16 preservation and
content-contract tests, image provenance tests, and a Chrome acceptance run.
The browser run checks actual image decoding, desktop and 375-pixel layouts,
language changes, portrait filtering, all 17 new reading stops, notebook
preservation, shared-link reloads, and both image failure states. Its result
JSON, screenshots and trace are retained in the workflow's `browser-evidence`
artifact. Deployment is conditional on both the structural/test job and the
browser job succeeding.

Final test and publication results are recorded with the release commit and
its GitHub Actions run. Branch verification can run before publication even
when the connected integration cannot create a pull request.

## Remaining editorial work

This is an additive content slice. The
[expansion plan](CONTENT_EXPANSION_PLAN.md) remains the backlog for regional
depth and additional lives. Future portraits require the same identity,
source and rights checks. New donor geometry requires its own feature-level
evidence and permission review; narrative citations do not validate polygons.
