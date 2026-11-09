# Jiangshan review — 9 November 2026

## Compared revisions and coverage

This review compares the last reviewed original-project revision,
[`9799f0f61cff80922970d2a0b304e18527db7e1e`](https://github.com/DeanChensj/jiangshan-map/tree/9799f0f61cff80922970d2a0b304e18527db7e1e),
with
[`5be0dd1ae8550ea7376dde6aa95dd9c4eabe827e`](https://github.com/DeanChensj/jiangshan-map/tree/5be0dd1ae8550ea7376dde6aa95dd9c4eabe827e).
The atlas baseline was `bae33f3bcbefc8294bfd76805d121d2a16d24020`.

The donor is **105 commits ahead**. Both complete recursive Git trees were
compared because GitHub's compare response returned only 300 file entries.
The tree comparison found **449 changed paths: 394 additions, 54 modifications
and one removal**. The removed `js/lore_data.js` was replaced by core/detail
files, so a large file count does not represent the same number of new stories.
All 105 commit subjects and the complete changed-path inventory were inspected;
the narrative, source, rights and relevant interface changes received focused
file/PR inspection. This is not a claim that every altered polygon or every
historical statement was independently verified. No donor script was executed.

The atlas also already contained four later stories in
`china-donor-stories.json` linked to donor PR #229. Those additions partially
overlap this comparison window; the 105-commit difference must not be read as
105 wholly missing changes. The new batch was checked against the current
atlas corpus, including those stories, before selecting its subjects.

Parsing the data literals at both revisions gave these inventories:

| Collection | Previous reviewed revision | Reviewed revision |
| --- | ---: | ---: |
| Timeline milestones | 473 | 525 |
| Place landmark events | 612 | 726 |
| Settlement records | 1,760 | 1,761 |
| Profiles in the donor's person collection | 123 | 125 |

The two new profiles are Gao Shi and the An–Shi Rebellion storyline. The latter
is an event, despite being stored in the donor's person-profile machinery.

## Useful additions selected for this atlas

### An–Shi Rebellion as a connected reading

[PR #317](https://github.com/DeanChensj/jiangshan-map/pull/317), merged at
`94fa440149269576777b11ef76404086462e4558`, introduced a ten-stop event storyline.
At the reviewed head its data are in
[`js/lore_core.js`](https://github.com/DeanChensj/jiangshan-map/blob/5be0dd1ae8550ea7376dde6aa95dd9c4eabe827e/js/lore_core.js)
(`PERSON_PROFILES`, key `anshi`) and
[`js/lore_detail.js`](https://github.com/DeanChensj/jiangshan-map/blob/5be0dd1ae8550ea7376dde6aa95dd9c4eabe827e/js/lore_detail.js)
(`PERSON_DETAILS.anshi`).

The transferable idea is a readable sequence linking the political crisis,
affected people and surviving evidence. The atlas's addition uses original
English and Chinese writing about the war, Du Fu's *Spring View* and Yan
Zhenqing's 758 mourning manuscript. The sources are Columbia University's
teaching materials, a specialist Oxford bibliography's accessible introduction,
and the National Palace Museum's object record and transcription. This gives
readers evidence they can inspect rather than treating donor prose as an
independent historical authority.

Several donor details were not carried over:

- The displayed sequence puts its spring–summer 756 Changshan episode after
  the Mawei episode labelled July 756. A year-sorted array alone cannot verify
  ordering within a year.
- Some English month labels directly reuse the numeral of the traditional
  Chinese month (`冬十一月` becomes `Nov 755`, for example). Calendar conversion
  must be checked separately. The new atlas records use supported civil years.
- Troop totals and casualty claims need source-specific qualification. They
  are not adopted as measured counts. Population-register losses are not a
  direct death toll.
- The Xuanzong actor key is literally `lix隆基` in two storyline stops. It must
  not become a new atlas identity or a presumed working biography link.
- The new event record remains an event. No artificial person biography is
  created to accommodate an event-reading interface.

### Su Shi: writing, exile and public work

[PR #305](https://github.com/DeanChensj/jiangshan-map/pull/305), merged at
`ed14dd88e472a6a2ffe4195360b146ed0828ccf2`, revises Su Shi's chronicle and adds
1085 Dengzhou and 1089 Hangzhou. The existing atlas has a frozen Su Shi profile
and journey; those IDs are preserved. New source-depth stories connect his
Huangzhou poems with his later Hangzhou administration.

The distinction between dates matters: the National Palace Museum dates the
*Cold Food Observance* poems to **1082**, but states that the surviving
calligraphy was written sometime afterward. The *History of Song* dates Su
Shi's second Hangzhou appointment to **1089**; the West Lake Museum dates the
dredging and causeway work to **1090**. An appointment date is not silently
reused as the completion date of the public works.

### Institutions and the survival of knowledge

[PR #278](https://github.com/DeanChensj/jiangshan-map/pull/278), merged at
`02d816b80722e7ff48abe7ce34f4f64685855585`, adds institutional and cultural
milestones, including the *Yongle Encyclopedia*. This prompted an original
atlas story about compilation in 1403–1408 and later manuscript survival,
supported by the Library of Congress's collection scholarship. The displayed
interval means compilation; surviving sixteenth-century copies must not be
captioned as manuscripts physically made in 1408.

Other additions in this change group—legal codification, the White Tiger Hall
conference, the Nine-Rank System, suppression of religious institutions and
regional book production—remain worthwhile research leads. They are not
silently accepted merely because their dates pass the donor's schema checks.

## Interface and maintenance concepts

These are concepts for independent implementation, not imported GPL code:

| Donor change | Useful principle | Atlas treatment |
| --- | --- | --- |
| [#327](https://github.com/DeanChensj/jiangshan-map/pull/327), storylines in search | Readers should find a connected story by its subject | Ensure new reading/story titles participate in the existing atlas discovery interface |
| [#300](https://github.com/DeanChensj/jiangshan-map/pull/300), event pinyin | Chinese history should be discoverable through alternate names | Candidate for a separately reviewed alias batch; do not overwrite stable imported IDs |
| [#302](https://github.com/DeanChensj/jiangshan-map/pull/302), hover/active distinction and scroll stability | Selecting a map stop should preserve the reader's place | Preserve the atlas's existing reading-position behavior during new content/media work |
| [#319](https://github.com/DeanChensj/jiangshan-map/pull/319) and [#324](https://github.com/DeanChensj/jiangshan-map/pull/324), focused chronicle arcs | Highlight the active relationship without a web of competing lines | Useful for future multi-person comparison; geographic links must retain evidence caveats |
| [#325](https://github.com/DeanChensj/jiangshan-map/pull/325), edge-trim timeline zoom | Make crowded periods easier to examine | Defer a gesture redesign until keyboard and narrow-screen behavior are specified |
| [#301](https://github.com/DeanChensj/jiangshan-map/pull/301), [#312](https://github.com/DeanChensj/jiangshan-map/pull/312), [#323](https://github.com/DeanChensj/jiangshan-map/pull/323), lazy detail loading | Do not make richer stories delay initial interaction | Preserve local assets and lazy-load new images; measure broader data loading separately |
| [#330](https://github.com/DeanChensj/jiangshan-map/pull/330), responsive geometry checks | Verify populated panels and controls at actual viewport sizes | Exercise the changed story/image paths at desktop and narrow widths |
| [#331](https://github.com/DeanChensj/jiangshan-map/pull/331), domain-specific tests | Keep evidence checks understandable by domain | Add checks for the new media/provenance contract rather than transplanting the donor harness |

## Source audit: an improvement with a large legacy exemption

[PR #294](https://github.com/DeanChensj/jiangshan-map/pull/294), merged at
`6a781e180c5c67e95e5da3af4c96fee963ef19f6`, introduced
[`data/sources/`](https://github.com/DeanChensj/jiangshan-map/tree/5be0dd1ae8550ea7376dde6aa95dd9c4eabe827e/data/sources)
and a source audit. Stable event IDs, work/chapter references and an audit that
prevents new unsourced records are useful practices. The donor's instructions
also require checking references against the cited work.

At the reviewed head, `tang.json` and `journeys.json` contain **12 keyed
references**, while `baseline.json` contains **3,202 unsourced exemptions**.
These are literal file inventories, not a claim about the percentage of
historically verified current records. Some references cover broad spans or
multiple claims. The audit checks references and identities; it cannot
establish that each proposition follows from its cited work. The current atlas
therefore continues to require record-specific evidence notes and a truthful
retrieval disclosure for each addition.

## Rights and geometry decisions

[PR #289](https://github.com/DeanChensj/jiangshan-map/pull/289), merged at
`d036aed694f2518f4ce390b49169d5b4130bb78c`, makes the donor's layer distinctions
more explicit. Its current
[README](https://github.com/DeanChensj/jiangshan-map/blob/5be0dd1ae8550ea7376dde6aa95dd9c4eabe827e/README.md)
and
[polygon provenance note](https://github.com/DeanChensj/jiangshan-map/blob/5be0dd1ae8550ea7376dde6aa95dd9c4eabe827e/data/atlas/README.md)
state:

- Code, compiled narratives and polity outlines use GPL-3.0.
- CHGIS/Hartwell-derived prefectures remain subject to their separate terms;
  the donor explicitly says academic/noncommercial use and no redistribution.
- Early source provenance for first-level divisions was not recorded, and
  individual feature provenance is not recorded.
- Schematic historical boundaries are not surveyed borders.

The root `LICENSE` file is unchanged between the two compared revisions. These
new statements are preserved as the donor's declarations; they do not settle
the older atlas import's MIT/README discrepancy or retroactively relicense it.
The previous removed-polygon decision remains in force. New coastlines,
estuary masks, reconstructed frontiers, prefectures, and donor screenshots
containing those layers are not imported in this increment. Geometry accuracy
and permission would need feature-level review before a later intake.

Guqin audio, terrain tiles, Docker deployment, MCP/CLI changes, SEO pages and
the donor's implementation refactors were inventoried but are outside this
content-and-media increment. Existing atlas hosting identities remain the
project's publication targets.

## New original stories and evidence trail

The additive file `dist/data/expansion-china-stories-v16.json` contains six
stories. It does not rewrite the frozen Jiangshan import or label its inherited
records as independently reviewed.

| New record | Evidence inspected | Date/location interpretation |
| --- | --- | --- |
| `china-anshi-war-and-recovery-755` | [Columbia, war context](https://afe.easia.columbia.edu/main_pop/ps/ps_china-dufu-songofwar.htm); [Oxford, accessible introduction](https://academic.oup.com/reference/62399/reference-article-abstract/573026203); [Met, Tang essay](https://www.metmuseum.org/essays/tang-dynasty-618-906) | 755–763 war interval; Chang'an represents an affected capital, not all fighting |
| `china-du-fu-spring-view-757` | [Columbia, selected poems and context](https://afe.easia.columbia.edu/main_pop/ps/ps_china-dufu-selected.htm); [Chinese poem](https://zh.wikisource.org/wiki/春望); [You Molin's literary study](https://clajc.ouc.edu.cn/ctwhyjzx/2021/0225/c16713a313815/pagem.htm) | Literary study explicitly dates the poem to spring 757; representative Chang'an point, no exact writing spot |
| `china-yan-zhenqing-nephew-758` | [NPM object/transcription](https://digitalarchive.npm.gov.tw/opendata/Pub/DetailEng/3?dep=P&mode=full); [NPM interpretation](https://theme.npm.edu.tw/selection/Article.aspx?lang=2&sNo=04001003) | 758 manuscript; Changshan represents the mourned episode, not the place where the scroll was written |
| `china-su-shi-cold-food-1082` | [NPM object record](https://digitalarchive.npm.gov.tw/opendata/Pub/DetailEng/14714?dep=P&mode=full); [NPM interpretation](https://theme.npm.edu.tw/selection/Article.aspx?lang=2&sNo=04001005) | 1082 poems; later calligraphy, with later colophon; representative Huangzhou setting |
| `china-su-causeway-1089` | [History of Song, volume 338](https://zh.wikisource.org/wiki/宋史/卷338); [West Lake Museum](https://www.westlakemuseum.com/index.php/bwggk/bwgjj-en.html); [UNESCO landscape record](https://whc.unesco.org/en/list/1334/) | 1089 appointment to 1090 work; present-day causeway point is a reference, not a surveyed Song geometry |
| `china-yongle-encyclopedia-1403` | [Library of Congress collection essay](https://blogs.loc.gov/international-collections/2023/04/yongle-encyclopedia-volumes-fully-digitized/) | 1403–1408 compilation at Nanjing; distinguishes later copies from original compilation |

Source access was checked on 9 November 2026. Oxford's accessible introduction
was read; the paywalled bibliography was not. The Library of Congress collection
landing page returned 403 to an open request, so the inspected collection essay
is used instead. No modern poem translation is reproduced. Image licensing,
creator credit, date and image source belong in the separate media manifest.

## Suggested short readings

- **War through surviving words:** Tang context → An–Shi crisis → Du Fu's poem
  → Yan Zhenqing's draft. Ask what a poem and a mourning manuscript reveal,
  and what neither can establish about total casualties or every participant.
- **A poet beyond the poem:** Su Shi's exile → *Cold Food Observance* → West
  Lake public works. Distinguish poem composition, copying, appointment and
  construction dates.
- **Books survive unevenly:** the dated Diamond Sutra → the Nine Classics
  project → the *Yongle Encyclopedia*. Distinguish printing from manuscript
  copying, the first production date from a surviving copy's date, and court
  collection from public access.

This selection credits **DeanChensj and the Jiangshan Map contributors** for
the research leads and connected-story approach. The new summaries were
written independently from the cited historical and institutional evidence;
no new donor code, narrative wording, translations or geometry is copied.
