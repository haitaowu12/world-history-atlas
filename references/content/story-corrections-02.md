# Story corrections 02: eight narrative reviews

Checked 2026-11-11. Draft only. No production content, image catalog, frozen source dataset, Git state, or deployment was changed.

## Deliverables

- `research/v18/story-corrections-02/event-reviews.draft.json`: eight complete `eventReviews` for the existing schema-1 China review layer.
- `research/v18/story-corrections-02/evidence.json`: exact short passages, source URLs, locations within the texts, and what each passage supports.
- `research/v18/story-corrections-02/baseline-records.json` and `preview-records.json`: assembled before/after review records.
- `research/v18/story-corrections-02/sources.json`, `snippet-checks.json`, and `validation.json`: source metadata, local excerpt checks, and schema validation.
- `research/v18/story-corrections-02/changed-fields.json`: exact per-record before/after field changes, including map labels and provenance.

## Exact recommended field changes

For each of the eight reviews, the authored patch changes `title.en`, `title.zh`, `summary.en`, `summary.zh`, `dateNote.en`, `dateNote.zh`, `location.label`, `location.labelI18n.en`, `location.labelI18n.zh`, and `location.labelProvenance`. These are map-label/provenance changes as well as prose changes. `changed-fields.json` supplies the literal before/after values.

Each patch explicitly supplies `locationPrecision: representative`, but every baseline already had that value, so no precision enum changes. Every numeric year and coordinate is retained for the specific focal-event reasons below. `location.lon` and `location.lat` are supplied unchanged because the review layer replaces the complete location object.

Review-level `note` and `sources` are also supplied. Applying the normal review layer adds the source URLs without replacing prior source identity, marks provenance as reviewed, and stores the review date, note, sources and original values. These are not merely prose edits.

## Result

All eight flagged discrepancies warrant correction. The important qualifications are that Humen involves differently stated totals and units, not a false destruction event, and that the cited sources do not settle Nurhaci’s cause of death or the sole cause of Yuan Chonghuan’s execution. No new precise death mechanism is supplied.

The draft keeps numeric dates and coordinates unchanged only by defining a narrower focal event and labeling every point as a reference. Subsequent events carry their own dates in the text. No point is promoted to an attested exact site. No casualty counts or new precise calendar dates are introduced.

## Integration

Merge the eight reviews by ID into `dist/data/china-visual-reviews-v18.json` after owner review, preserving every unrelated review and the frozen donor records. Do not replace that production file with this standalone draft. Compare the saved baseline against current assembled records before merging, in case parallel work has changed an entry. The patches do not replace record identity, provenance, or existing source arrays; reviewed reading links are added through the review layer.

`applyChinaReviews` accepts the draft. All eight review IDs are unique, both languages are present, and the before/after numeric anchor check passes. This is a schema/application check, not a deployment check.

## Corrections

### china-landmark-119

**English title:** Laoshang Chanyu raids through Xiaoguan

**中文标题：** 老上单于率军入萧关

In 166 BCE, Laoshang Chanyu led a Xiongnu incursion through Chaona and Xiaoguan. The Shiji reports 140,000 cavalry, raids reaching Pengyang, and advance riders reaching Yong and Ganquan. Emperor Wen mobilized forces near Chang’an and along the frontier; the Xiongnu withdrew after more than a month.

前166年，老上单于率匈奴军入朝那、萧关。《史记》记其骑兵十四万，进至彭阳，前哨抵雍、甘泉。汉文帝调兵驻守长安附近及边郡；匈奴军在塞内停留月余后撤走。

**Date note:** 166 BCE is Emperor Wen’s year 14. Zhou Yafu’s Xiliu deployment belongs to a separate incursion in 158 BCE.

**时间说明：** 前166年为汉文帝十四年；周亚夫驻细柳属于前158年的另一次边患。

**Anchor decision:** Retain −166 and 106.32, 35.85. The story now focuses on the 166 BCE Xiaoguan incursion. The point is a Guyuan-area regional reference, not an attested excavated Han pass. Xiliu belongs to 158 BCE and is not plotted at this point.

**Evidence:** Chronology conflation confirmed.
- [Laoshang Chanyu; Emperor Wen, year 14](https://zh.wikisource.org/wiki/史記/卷110#老上單于_稽粥): “漢孝文皇帝十四年，匈奴單于十四萬騎入朝那、蕭關” / “軍長安旁以備胡寇”. Supports the 166 BCE incursion, the source-attributed cavalry total, Xiaoguan, and the response near Chang’an.
- [Zhou Yafu; Wen, later-era year 6](https://zh.wikisource.org/wiki/史記/卷057#條侯亞夫): “文帝之後六年，匈奴大入邊。” / “軍霸上” / “軍棘門” / “軍細柳”. The later deployments are three separate camps in 158 BCE, not all at Xiliu in 166 BCE.

**Prior image association for owner reconsideration:** `china-batch-04-hanwendi`. Emperor Wen portrait, as a later ruler portrayal connected to the Han response; not an eyewitness view of Laoshang or a depiction of the 166 BCE raid.

### china-landmark-314

**English title:** Cao Cao selects surrendered troops for the Qingzhou army

**中文标题：** 曹操从黄巾降卒中选编青州兵

In 192, after Liu Dai’s death, Cao Cao took charge of Yan province and pursued the Qingzhou Yellow Turbans to Jibei. The Sanguozhi records the surrender of more than 300,000 soldiers that winter. Cao Cao selected their elite troops to form the force known as the Qingzhou army; the text gives no number for that selected force.

192年，刘岱死后，曹操领兖州牧，追击青州黄巾至济北。《三国志》记当年冬季受降士卒三十余万；曹操从中选取精锐，号为“青州兵”，并未记载所选部队的人数。

**Date note:** 192 is Chuping 3; the surrender is recorded in winter.

**时间说明：** 192年为初平三年，受降记于当年冬季。

**Anchor decision:** Retain 192 and 116.82, 35.55. Label modern Yanzhou as a regional reference; the existing Chinese label “兖州昌邑” does not identify these coordinates reliably. The chronicle locates pursuit at Jibei, not recruitment at this modern city point.

**Evidence:** The surrender total is not the elite selection total.
- [Chuping 3, winter](https://zh.wikisource.org/wiki/三國志/卷01): “追黃巾至濟北。乞降。” / “冬，受降卒三十餘萬，男女百餘萬口，收其精銳者，號爲青州兵。”. The text distinguishes surrendered soldiers, the larger accompanying population, and an unnumbered selected elite.

**Prior image association for owner reconsideration:** `china-rebuild-cao-cao`. Cao Cao portrait, as a portrayal of the commander; it must not imply an image or census of 300,000 elite recruits.

### china-event-donghan-001

**English title:** Liu Xiu becomes emperor, then establishes his capital at Luoyang

**中文标题：** 刘秀称帝后定都洛阳

In 25 CE, Liu Xiu took the imperial title at an altar south of Hao, at Qianqiuting Wuchengmo, inaugurating the Jianwu era. Later that year he entered Luoyang and established his capital there. The Hou Hanshu places the accession in the sixth lunar month and the move to Luoyang in the tenth.

25年，刘秀在鄗南千秋亭五成陌设坛即皇帝位，建元建武。同年稍后，他进入洛阳并定都于此。《后汉书》将即位记于农历六月，将入洛阳定都记于十月。

**Date note:** Both events fall in 25 CE. Luoyang anchors the establishment of the capital, not the accession ceremony.

**时间说明：** 两事均在25年；洛阳锚点对应定都，不是即位仪式地点。

**Anchor decision:** Retain 25 and 112.451, 34.621 because the focal story includes establishment of the capital at Luoyang. The point does not locate the accession altar south of Hao or a specific Han palace. A separate accession-only entry would require a researched Hao-area anchor.

**Evidence:** Accession south of Hao preceded the establishment of the capital at Luoyang.
- [Jianwu 1, lunar months 6 and 10](https://zh.wikisource.org/wiki/後漢書/卷1上): “設壇場於鄗南千秋亭五成陌。” / “六月己未，即皇帝位。” / “冬十月癸丑，車駕入洛陽，幸南宮却非殿，遂定都焉。”. Supports two locations and their order within 25 CE. It does not put the accession at Luoyang.

**Prior image association for owner reconsideration:** `china-batch-04-liuxiu`. Liu Xiu portrait, as a later portrayal; not a coronation scene at Luoyang.

### china-landmark-036

**English title:** Emperor Yang begins the Eastern Capital and Tongji Canal

**中文标题：** 隋炀帝营建东京，开通济渠

In 605, Emperor Yang ordered construction of an eastern capital at Luoyang and the opening of the Tongji Canal. The Sui shu describes waterways linking the Luoyang area to the Yellow River and onward toward the Huai. It records the capital’s completion in 606 and orders for the separate Yongji Canal, extending north toward Zhuo commandery, in 608.

605年，隋炀帝诏建东京洛阳，并开通济渠。《隋书》记水道自洛阳一带达黄河，再向淮河连通；东京于606年建成，另向北通往涿郡的永济渠则在608年奉诏开凿。

**Date note:** 605 dates the orders for the Eastern Capital and Tongji Canal. The capital was completed in 606; Yongji was ordered in 608.

**时间说明：** 605年对应营建东京与开通济渠的诏令；东京606年建成，永济渠608年奉诏开凿。

**Anchor decision:** Retain 605 and 112.45, 34.62 for the orders beginning the capital and Tongji projects. The narrative now dates capital completion to 606 and Yongji to 608. If the owner instead makes both canals the main event, a 605–608 span and a network representation would be appropriate; the draft avoids that change by retaining the narrower focal event.

**Evidence:** Separate orders in 605 and 608; capital completion in 606.
- [Daye 1, month 3; Daye 2, month 1; Daye 4, month 1](https://zh.wikisource.org/wiki/隋書/卷03): “營建東京” / “開通濟渠，自西苑引穀、洛水達于河，自板渚引河通于淮。” / “二年春正月辛酉，東京成” / “四年春正月乙巳，詔發河北諸郡男女百餘萬開永濟渠”. The 605 focal event is the order/beginning, not the completion of both canals or of the capital.

**Prior image association for owner reconsideration:** `china-batch-04-yangguang`. Emperor Yang portrait, as a later ruler portrayal; not a record that both canals were completed in 605.

### china-event-sui-010

**English title:** Emperor Yang is besieged at Yanmen

**中文标题：** 隋炀帝被围雁门

In 615, Shibi Khan’s Turkic forces besieged Emperor Yang at Yanmen. The emperor called on the commanderies for reinforcements; the besiegers withdrew the following lunar month. In a later stage of the rebellions, Li Mi and Zhai Rang seized Xingluo granary at Luokou in 617 and opened its grain stores to the people.

615年，始毕可汗的突厥军将隋炀帝围于雁门。炀帝诏令诸郡发兵救援，围军于次月撤去。此后叛乱继续发展，李密、翟让于617年攻取洛口的兴洛仓，开仓让民众取粮。

**Date note:** 615 anchors the Yanmen siege (Daye 11). The granary seizure was in 617 (Daye 13), two years later.

**时间说明：** 615年锚定雁门之围（大业十一年）；夺仓在两年后的617年（大业十三年）。

**Anchor decision:** Retain 615 and 112.88, 39.19 for the Yanmen siege. The point is a Yanmen regional reference, not a verified siege-wall site and not Luokou. The 617 granary episode is dated follow-on context. A separate granary story would need its own 617 anchor and source-checked location near Luokou; do not reuse the Yanmen coordinate.

**Evidence:** Yanmen 615 and granary seizure 617 are two years apart.
- [Daye 11, months 8–9; Daye 13, month 2](https://zh.wikisource.org/wiki/隋書/卷04): “壬申，車駕馳幸雁門。癸酉，突厥圍城” / “九月甲辰，突厥解圍而去。” / “庚寅，賊帥李密、翟讓等陷興洛倉。”. The 617 seizure appears under Daye 13, not Daye 12 (616).
- [Li Mi biography, Daye 13 spring](https://zh.wikisource.org/wiki/隋書/卷70#李密): “以大業十三年春” / “自羅口襲興洛倉，破之。開倉恣民所取” / “密城洛口周廻四十里以居之。” / “時遣邴元真守興洛倉。” / “密將入洛口倉城”. Confirms 617 independently within the same history, opening the grain stores to the people, and the Xingluo/Luokou nomenclature. No new Luokou coordinate is asserted.

**Prior image association for owner reconsideration:** `china-batch-04-yangguang`. Emperor Yang portrait, tied to the 615 Yanmen focal event; not a picture of Li Mi’s 617 granary seizure.

### china-landmark-424

**English title:** Lin Zexu supervises the destruction of opium at Humen

**中文标题：** 林则徐主持虎门销烟

In 1839, imperial commissioner Lin Zexu supervised the destruction of confiscated opium at Humen. The drug was mixed with salt water and lime and released into the sea. His reported tally, quoted in Hummel’s biographical dictionary, was 19,179 chests and 2,119 bags.

1839年，钦差大臣林则徐在虎门主持销毁收缴的鸦片，将其拌入盐水、石灰后排入海中。恒慕义主编的人物传记辞典引述林则徐所报销毁数，为19,179箱、2,119袋。

**Date note:** 1839 dates the destruction at Humen; the tally distinguishes chests from bags.

**时间说明：** 1839年为虎门销烟之年；数量分别以箱、袋计。

**Anchor decision:** Retain 1839 and 113.61, 22.81 as a Humen coastal reference. This does not certify the precise destruction-pit site. The two-language geography is aligned to Humen, Guangdong rather than mixing modern Dongguan with a Guangzhou place label.

**Evidence:** The preliminary flag is a units and transaction-stage conflation, not a denial of the Humen destruction.
- [1839, surrender pledge and final destruction account](https://en.wikisource.org/wiki/Eminent_Chinese_of_the_Ch%27ing_Period/Lin_Ts%C3%AA-hs%C3%BC): “20,283 chests” / “19,179 chests and 2,119 bags of opium” / “2,376,254 chin or catties”. The initial surrender pledge and the final reported destruction tally use different presentations. Do not add bags to chests as if they were the same unit. The Chinese inherited 2.37-million-jin wording is a rough truncation of the stated mass, not a different incident.

**Prior image association for owner reconsideration:** `china-batch-04-linzexu`. Lin Zexu portrait, connected to Humen; no caption should equate bags with chests or restate “over 20,000 chests destroyed” without a unit basis.

### china-landmark-466

**English title:** Nurhaci is defeated at Ningyuan

**中文标题：** 努尔哈赤攻宁远受挫

In early 1626, Yuan Chonghuan’s Ming defenders repelled Nurhaci’s assault on Ningyuan with the help of newly mounted foreign cannon. Nurhaci died later that year, and Hong Taiji succeeded him as khan.

1626年初，袁崇焕率明军守宁远，借助新置西洋火炮击退努尔哈赤的进攻。努尔哈赤于同年稍后去世，皇太极继汗位。

**Date note:** The Ningyuan battle, Nurhaci’s death and Hong Taiji’s succession all fall in 1626.

**时间说明：** 宁远之战、努尔哈赤去世与皇太极继位均在1626年。

**Anchor decision:** Retain 1626 and 120.73, 40.62 for the Ningyuan/Xingcheng battle. Remove the joint Ningyuan–Mukden map label. Death and succession remain same-year context, without implying the point locates either.

**Evidence:** The cited biographies do not establish a fatal cannon wound.
- [Final campaign and death](https://en.wikisource.org/wiki/Eminent_Chinese_of_the_Ch%27ing_Period/Nurhaci): “He was probably only slightly wounded” / “He died seven months later.”. A possible minor wound and later death are not proof of death from that wound.
- [1626 Ningyuan defense](https://en.wikisource.org/wiki/Eminent_Chinese_of_the_Ch%27ing_Period/Y%C3%BCan_Ch%27ung-huan): “newly mounted "foreign guns"”. Supports artillery in the defense without transferring that fact into a fatal injury claim.
- [Succession after Nurhaci](https://en.wikisource.org/wiki/Eminent_Chinese_of_the_Ch%27ing_Period/Abahai): “on October 20, 1626, Abahai became”. Supports the succession in 1626. The draft deliberately retains year precision only.

**Prior image association for owner reconsideration:** `china-batch-04-nurhaci`. Nurhaci portrait, connected to the commander at Ningyuan; no caption should claim a verified fatal cannon injury.

### china-landmark-505

**English title:** The Chongzhen Emperor has Yuan Chonghuan executed

**中文标题：** 崇祯帝处死袁崇焕

Yuan Chonghuan returned to defend Beijing during Hong Taiji’s invasion, but was arrested and executed in 1630. Hummel’s dictionary records charges of collusion with the enemy and the killing of Mao Wenlong. Its Hong Taiji biography attributes the claim that spies supplied evidence against Yuan to Qing official accounts.

皇太极入侵时，袁崇焕回援北京，却被捕并于1630年遭处死。恒慕义主编的人物传记辞典记其所受指控包括通敌及杀毛文龙；其中皇太极传将间谍提供袁崇焕罪证的说法明确归于清方官方记载。

**Date note:** 1630 anchors the execution; the invasion that prompted Yuan’s return to Beijing began in 1629.

**时间说明：** 1630年锚定处决；促使袁崇焕回援北京的入侵始于1629年。

**Anchor decision:** Retain 1630 and 116.37, 39.90 as a Beijing city reference. The biography says marketplace, not a coordinate-resolved “Western Market.” The draft removes that unsourced precision rather than claiming a surveyed execution location.

**Evidence:** The spy explanation needs attribution; it is not an established sole cause.
- [Final campaign, arrest and execution](https://en.wikisource.org/wiki/Eminent_Chinese_of_the_Ch%27ing_Period/Y%C3%BCan_Ch%27ung-huan): “he was condemned to death and was cut to pieces in the marketplace”. Supports execution after the accusations. It does not establish a surveyed Beijing Western Market location.
- [1629 invasion, Yuan’s imprisonment](https://en.wikisource.org/wiki/Eminent_Chinese_of_the_Ch%27ing_Period/Abahai): “According to Ch'ing official accounts the evidence against Yüan was furnished by spies of Abahai”. This wording explicitly attributes the spy account to Qing official sources; it does not warrant presenting the ruse as the unqualified cause of execution.

**Prior image association for owner reconsideration:** `china-batch-04-huangtaiji`. Hong Taiji portrait only as contextual material for the invasion and attributed Qing account. A suitable Yuan Chonghuan portrayal would be a closer fit for the execution-focused story, but none is admitted here.

## Remaining scope boundaries

- The cause of Nurhaci’s death remains unresolved by these biographies. The patch neither asserts a fatal cannon wound nor rules one out.
- Qing official accounts are the explicitly named source of the Hong Taiji spy story in the inspected biography. No independent determination of the plot or single-cause explanation of the execution is made.
- Precise locations of the Xiaoguan pass site, Qingzhou recruitment, Hao accession altar, Yanmen siege walls, Humen pits, and Beijing execution market were not established in this pass. The displayed references say so through their map labels and review notes rather than adding generic cautions to each story.
- Hummel’s dictionary provides an attributed historical destruction tally, not a modern measurement reconciliation. The original 20,283-chest pledge is not numerically added to, or substituted for, 19,179 chests plus 2,119 bags.
- The eight image matches may be reconsidered only after the narrative patch is accepted and each existing asset’s caption/identity remains sound. No association was admitted or modified by this review.

## Retrieval record

The relevant primary/scholarly pages were reopened online, including the passages for Shiji 110 and 57; Sanguozhi 1; Hou Hanshu 1 upper; Sui shu 3, 4 and 70; and the Lin Zexu, Nurhaci, Yuan Chonghuan and Hong Taiji entries in Hummel’s dictionary. Shiji 10 was also inspected as corroborating chronology. Earlier local snapshots were used only for exact-text comparisons and prior-association context.

The checks use the relevant source passages themselves, not just the preliminary image-curation ledger.
