# Chinese image reconstruction, shard 02

Reviewed: 2026-11-11. New reconstruction from current public source records. The first shard is unchanged.

## Admission and measured coverage

- 4 source images; 29 explicit reviewed associations; 29 unique entry IDs.
- 29 newly covered IDs against the active history-media-v18.json plus every other current visual shard (109 covered IDs at this check).
- Total image bytes: 1,583,378. Every admitted file is below 750,000 bytes.
- Original oversized Taizong image was not fetched; the source-published thumbnail was used. No local image transformations.
- All association titles were compared with the current assembled record titles. Name matches were candidate discovery only; final admission uses explicit reviewed subject/action lists.
- Focused schema, exact title, source byte identity, dimension and SHA-256 checks passed. Full combined build/tests remain the integration owner’s step.

## Files and rights

### Taizong in a Ming standing portrait
- File: `dist/assets/history-media/china-rebuild-taizong.jpg`
- 468,837 bytes; 960 × 1989; SHA-256 `3b8f0e6f4c86af3cf47d09180e333cb132b7dbfe60209c17232ec4cdb957b4d2`
- Source and image-specific rights: https://commons.wikimedia.org/wiki/File:TangTaizong.jpg
- Exact acquired URL: https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/TangTaizong.jpg/960px-TangTaizong.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail
- Creator: Anonymous Ming painter.
- Date: Ming dynasty, 1368–1644; remounted 1748.
- Collection/source: National Palace Museum, Taipei, 中畫000263.
- Corroborating record: NPM: portrait and remounting inscription: https://digitalarchive.npm.gov.tw/Collection/Detail/1825?dep=P

### Sun Quan and attendants in The Thirteen Emperors
- File: `dist/assets/history-media/china-rebuild-sun-quan.jpg`
- 545,145 bytes; 936 × 1270; SHA-256 `3260c6b233b5c547c36a6361898016527370aa6f43b17232b4e9fb60c02924e5`
- Source and image-specific rights: https://commons.wikimedia.org/wiki/File:Sun_Quan_Tang.jpg
- Exact acquired URL: https://upload.wikimedia.org/wikipedia/commons/2/2e/Sun_Quan_Tang.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
- Creator: Traditionally attributed to Yan Liben (died 673); later replacement sections by unknown hands.
- Date: Second half of the 7th century, with later replacement; precise date of this section not established.
- Collection/source: Museum of Fine Arts, Boston, Denman Waldo Ross Collection, 31.643.
- Corroborating record: MFA-contributed catalog: later replacement: https://amica.davidrumsey.com/amico1033128-17069.html
- Corroborating record: University of Chicago scroll record: https://scrolls.uchicago.edu/view-scroll/61

### Sima Yi in a Ming book of historical portraits
- File: `dist/assets/history-media/china-rebuild-sima-yi.jpg`
- 369,133 bytes; 988 × 1229; SHA-256 `678544c6cb8cbef4e7c83f34638601d74d4fdbf2072cab918c8d56a58bf75887`
- Source and image-specific rights: https://commons.wikimedia.org/wiki/File:%E9%AD%8F%C2%B7%E5%A4%AA%E5%82%85_%E5%8F%B8%E9%A6%AC%E6%87%BF.jpg
- Exact acquired URL: https://upload.wikimedia.org/wikipedia/commons/8/80/%E9%AD%8F%C2%B7%E5%A4%AA%E5%82%85_%E5%8F%B8%E9%A6%AC%E6%87%BF.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
- Creator: Anonymous illustrator; encomia and preface by Zhu Tianran.
- Date: Book published 1498; precise impression date not established.
- Collection/source: Lidai guren xiangzan; reproduction via Wikimedia Commons.
- Corroborating record: 1498 edition and unnamed illustrator: https://www.shuge.org/meet/topic/43456/
- Corroborating record: Digitized historical portrait book: https://www.shidianguji.com/zh/book/NGJ892411999028085148107/chapter/1lq125w174i7n

### Yue Fei in a Ming seated portrait
- File: `dist/assets/history-media/china-rebuild-yue-fei.jpg`
- 200,263 bytes; 1000 × 1752; SHA-256 `61da39950ade297fb6b16864cab3a30de4402d4aa141317bf3176c12d4359b62`
- Source and image-specific rights: https://commons.wikimedia.org/wiki/File:%E6%98%8E%E4%BA%BA%E3%80%8A%E5%B2%B3%E9%A3%9E%E5%83%8F%E3%80%8B%E8%BD%B4.jpg
- Exact acquired URL: https://upload.wikimedia.org/wikipedia/commons/7/70/%E6%98%8E%E4%BA%BA%E3%80%8A%E5%B2%B3%E9%A3%9E%E5%83%8F%E3%80%8B%E8%BD%B4.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
- Creator: Anonymous Ming painter.
- Date: Ming dynasty, 1368–1644.
- Collection/source: Palace Museum, Beijing.
- Corroborating record: Palace Museum: portrait and Ming clothing: https://www.dpm.org.cn/show/255511.html
- Corroborating record: Palace Museum exhibition object: https://gugongzhanlan.dpm.org.cn/artListShare/135

## Pixel and provenance review

- Taizong: yellow dragon robe, decorated belt held in both hands, black cap and shoes, complete standing figure. NPM identifies Standing Portrait (I), 中畫000263. The 1748 remounting is distinct from the Ming artwork date and the seventh-century reign. It is not Standing Portrait (II), 中畫000262.
- Sun Quan: upper-left inscription explicitly reads 吳主孫權. Central crowned ruler wears black and red, holds a feather fan and stands between two attendants. This is a separate identified section of the same composite scroll as first-shard Liu Bei, not reuse of the Liu Bei pixels. MFA-contributed metadata acknowledges later replacement; the early group of rulers should not be given an unqualified seventh-century autograph attribution.
- Sima Yi: black-and-white half-length figure, folded cap, beard and hands within sleeves; 司馬懿 at upper right. The actual pixels do not contain the longer Wei Grand Tutor heading used in the Commons filename, so that wording was removed from the alt/caption. The adjacent 16-character encomium matches the digitized Lidai guren xiangzan text under Sima Yi. The book’s 1498 publication was corroborated; the precise impression of this reproduction remains unestablished. Zhu Tianran’s literary authorship is not used as an illustrator attribution. The verse’s condemnation of ambition and monopolized power is treated as a Ming historical judgment, not an objective description of personality.
- Yue Fei: blue cloth cap, brown robe with colorful python motifs, open blue-covered book, red belt with pale jade plaques and black boots; seated on a fur-covered chair. The Palace Museum’s object description identifies a book, jade belt, four-tailed cloth cap and embroidered python robe; the museum explicitly explains the robe as Ming-period convention. The portrait is later commemoration rather than Southern Song military dress.

## Association review and holds

- Taizong: ten entries connect the named ruler to Taiyuan, Qianshuiyuan, Hulao, the Xuanwu coup, imperial accession/Zhenguan or the Goguryeo campaign. In the mixed Xuanzang entry, the image relates only to the Taizong clause.
- Sun Quan: six entries concern his succession, Hefei defeat, Wuchang seat and 229 accession/move. The source scroll does not identify either attendant as a named minister.
- Sima Yi: eight entries concern his biography, appointments, Meng Da campaign, Liaodong campaign, Fancheng relief and Gaoping coup. Jinshu is used as a retrospective dynastic narrative; its later imperial titles do not imply a lifetime reign.
- Yue Fei: five entries. The earlier candidate hold for china-landmark-394 was resolved from Songshi 365, Jianyan fourth year, which narrates Niutou-area fighting and recovery of Jiankang. The caption attributes this to the Song history. Other entries concern the biography, Qianzhou appeals, Ezhou base and the 1134 Xiangyang campaign.
- Han Xin and his six draft associations remain held. A Qing catalog lists the album subject, but object-level date/current holding and the precise reproduction have not been corroborated sufficiently. No Han Xin image downloaded.
- Du Fu and Wang Anshi candidates remain unadmitted because the cached candidates have missing dates and weak image-origin citations. No additional image requests were made for them.

## Content review gaps, not changed here

- china-landmark-503: held because the consulted Songshi 365 passage for 1136 names operations toward Guozhou and Changshui but does not corroborate the entry’s Shangzhou/Iyang wording. Its broad named-subject connection was not counted while the particular claim remains unresolved.
- china-landmark-039: the title places or combines Sun Quan’s accession with the move to Jianye. Sanguozhi 47 separates accession at Wuchang from the later move. No association admitted against this claim.
- china-landmark-330: Sun Quan boat-inspection anecdote requires its own narrative/source review; not admitted here.
- china-landmark-440: Lu Xun is the main actor; Sun Quan’s mention does not justify a generic portrait association.
- china-landmark-501: maternal encouragement framing is not established by the consulted Songshi passage; the early passage names paternal encouragement. No image admitted to settle that claim.
- china-event-nansong-005 and china-landmark-086: Zhuxianzhen and Fengbo Pavilion require history-versus-later-retelling qualification. No association admitted here.
- china-landmark-292, china-landmark-293, china-landmark-118, china-landmark-290: moonlight chase, plank-road stratagem, reported troop totals and ten-sided ambush need separate narrative qualification. Han Xin remains held in any event.

## Covered entry IDs

- `china-event-donghan-028`
- `china-event-sanguo-007`
- `china-event-sanguo-010`
- `china-event-sanguo-011`
- `china-event-tang-002`
- `china-event-tang-003`
- `china-event-tang-004`
- `china-event-tang-009`
- `china-landmark-016`
- `china-landmark-098`
- `china-landmark-099`
- `china-landmark-124`
- `china-landmark-327`
- `china-landmark-332`
- `china-landmark-333`
- `china-landmark-346`
- `china-landmark-347`
- `china-landmark-348`
- `china-landmark-394`
- `china-landmark-395`
- `china-landmark-486`
- `china-landmark-487`
- `china-landmark-488`
- `china-landmark-489`
- `china-landmark-502`
- `china-person-lishimin`
- `china-person-simayi`
- `china-person-sunquan`
- `china-person-yuefei`

Shard SHA-256: `edc3917271f6f7f7175f5095a217c68d9012ab3cc2fdc3d3fa7c1872e0a03efc`
