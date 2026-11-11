# Two source-backed Tang story corrections

Reviewed 2026-11-11. Integrated as dist/data/china-visual-reviews-v18.json, a V18-only correction layer; frozen donor records remain unchanged.

## Integration files and scope

- `research/v18/story-corrections-01/assembled-before.json`: complete current records from `loadAtlasRecords()` in `scripts/lib/atlas-records.mjs`, not raw donor records.
- `research/v18/story-corrections-01/proposed-china-reviews.json`: exact bilingual title, summary and dateNote patches in the existing schemaVersion 1 format, with review notes and source metadata. The V18 manifest identifies this separate layer, applied after earlier upstream reviews; no prior review file is replaced.
- Schema inspected: `dist/china-review.mjs`. Review patches may not replace id, provenance or sources. Sources are supplied separately and deduplicated by URL. Unpatched fields are retained.

## china-landmark-359: poets travelling together

The old English and Chinese title/summary insist on a first meeting at Luoyang; Chinese also adds hunting, drinking and composing poems. The replacement gives the story a wider, useful frame: meeting in 744, travelling with Gao Shi around Kaifeng and Shangqiu, and continuing together in Shandong in 745. It names the Luoyang/Chenliu alternative once, rather than turning the story into a warning.

Source: Daniel Hsieh, *The Late Wanderings of Du Fu*, The Chinese University of Hong Kong Press, ISBN 978-988-237-392-1. Publisher lists publication 2025/12; Columbia’s distribution listing uses February 2026. The chronology is partly based on Xiao Difei et al., *Du Fu quanji jiaozhu* (2013), vol. 12. Use the sample PDF’s page number rather than assuming the differing online contents pagination.

- Source URL: https://cup.cuhk.edu.hk/image/catalog/preview/9789882373921_SampleChapter.pdf
- Metadata URL: https://cup.cuhk.edu.hk/TheLateWanderingsofDuFu
- Locator: PDF page 1 (zero-index 0), Chronology, 744 and 745 entries.
- Exact short quote: “Meets Li Bai 李白 in Luoyang (or possibly Chenliu 陳留 [Kaifeng]).”
- Exact short quote: “They travel in the Liang-Song 梁宋 area (Kaifeng, Shangqiu, Henan) with Gao Shi 高適.”
- Exact short quote: “Goes with Li Bai to Lu 魯 (Yanzhou, Shandong) and parts by the end of year, returns to Luoyang.”

Not established here: exact meeting day, definitive first-meeting location, hunting/drinking episodes, specific poems composed on the journey, or exact route coordinates. These details are not inserted into the replacement.

Map decision: preserve start/end 744 and the existing coordinate 112.45, 34.62 for now. Its current Luoyang & Shangqiu / 洛阳→梁宋 labels represent a broad inherited travel anchor, not proof of a meeting site. If map UI implies exact presence, use a regional travel label or geometry rather than promoting Luoyang as certain. The JSON retains coordinates and locationPrecision but changes the location label to “Luoyang: reference point for Liang–Song travels” / “洛阳：梁宋之游的参考点”. The summary supplies the Luoyang/Chenliu caveat.

## china-landmark-368: a family loss preserved in calligraphy

The Chinese original assigns recovery of Jiming’s remains to Yan Zhenqing himself. NPM instead names Quanming, whom Yan sent. The proposed story restores that agency, retains 758, and explains the manuscript through its corrections and changing scripts rather than “immortal” praise.

Primary object source: National Palace Museum, Taipei, *Draft of a Requiem for My Nephew* / 唐顏真卿祭姪文稿 卷, Yan Zhenqing, object 故書000060N000000000 (work 故書00006000000), handscroll in ink on paper. The object record gives the main written panel as 28.2 × 77 cm. Do not copy the selection page’s 29.2 × 59.6 cm as the main panel: the detailed record assigns those dimensions to 引首 (frontispiece).

- Object/transcription URL: https://digitalarchive.npm.gov.tw/opendata/Pub/DetailEng/3?dep=P&mode=full
- Locator: Transcription, opening date: “維乾元元年。歲次戊戌。九月。庚午朔。三日壬申。”
- Locator: Transcription, Quanming passage: “泉明比者。再陷常山。” and “携爾首櫬。” (quoted as separate excerpts to omit the museum’s intervening editorial deletion notation).
- Locator: Description dated 20110913: “This work, done in 758, is personally written historical material providing a first-hand account of the An Lushan Rebellion.”
- Supporting museum introduction: https://theme.npm.edu.tw/selection/Article.aspx?lang=2&sNo=04001003
- Locator: Introduction, second narrative paragraph: “Yan Zhenqing sent his elder nephew Ch'uan-ming to the town to make funerary arrangements.”
- Locator: following paragraph: “he could only come up with a few remains of them.”
- Locator: final paragraph: “Yan Zhenqing went back and crossed out and changed characters in numerous places.”

Not established here: a Gregorian conversion of lunar ninth month/day 3, a composition building or town, the complete recovered remains, or Yan’s precise travel itinerary. The manuscript identifies his Puzhou office, but an official title alone does not establish where a document was physically written. Avoid reproducing the NPM selection page’s inconsistent age conventions (49 versus 50 in the collection record); neither is needed for the story.

Map decision requiring integration attention: preserve start/end 758 and coordinate 107.39, 34.52 pending evidence. Existing English label is Fengxiang while Chinese is 凤翔→蒲州. Neither reviewed source establishes that Fengxiang was the composition site. Do not silently move this point to Puzhou or claim that museum location Taipei is the historical setting. Preferred next step is a source establishing composition locality, or an explicit UI treatment for an unresolved inherited anchor. The JSON retains coordinates but explicitly relabels the point “Fengxiang: inherited reference point; writing site unresolved” / “凤翔：原资料参考点；书写地点未定”. This prevents the label asserting a composition site, but does not settle the geographic question.

## Validation

The proposed file contains exactly these two known IDs, carries no identity/provenance override, and leaves dates, coordinates, aliases and other unrelated fields intact. Only location labels/provenance change, explicitly marking reference anchors. Source links were read directly on 2026-11-11. The frozen donor source remains as provenance when reviews merge; the new authoritative sources should appear before it. No general claim that the entire record or imported corpus is independently verified is warranted.
