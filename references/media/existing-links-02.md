# Existing image associations: batch 02

Review date: 11 November 2026. Research-only handoff; no production files or asset bytes changed, and no commits, remote writes, workflows or publication performed.

## Result

37 individually reviewed associations cover **36 previously uncovered entry IDs**. No images added or downloaded. The two Indus city views enrich one record and are counted only once. Of 181 candidate pairs, 144 are excluded or held. The existing-links-01 exclusions remain excluded.

The baseline combines the current 91-asset / 197-covered V18 catalogue with pending China04 and World03: **125 assets / 248 covered entries**. With this shard alone added to that combined baseline: **284 / 2,084 entries (13.63%)**. This is unique entry coverage, not a count of distinct historical events; some donor IDs concern overlapping episodes. This result remains far below the user’s half-entry goal.

- Standalone shard: `research/v18/existing-links-02/visual-assets-existing-links-02-v18.json` (`items: []`, `associations: [...]`).
- Full accepted and rejected decisions, including exact bilingual title and summary examined: `research/v18/existing-links-02/association-decisions.json`.
- Exact assembled record snapshot and frozen combined baseline: `assembled-records.json`, `catalog-baseline.json` in that folder.
- Counts and asset dependencies: `review-summary.json`.
- Read-only catalogue/schema and exact-title/summary validation: `validation.json`.

## Integration dependencies

Four associations use already admitted assets (Qin Shi Huang, Mencius, Cao Cao). Twenty-five use pending China04 assets. Eight use pending World03 images, covering seven entries. Promote the named pending assets first or together with this shard. No need to download or duplicate image files. No new permission or license claims are made here; original asset records retain rights, dates, collection identities and qualifications.

## Review method and evidence

The source records were assembled with `loadAtlasRecords` using the V18 China review layer. Candidate discovery used exact person/artifact/site aliases, then each title and summary was read for substance. Secondary mentions, comparison-only links, other works by the same author, nearby cities and generic dynastic associations were excluded. Previously covered IDs were removed before review. Substring false positives such as Baganda/Bagan were explicitly rejected.

Existing source and rights receipts were reused for all 22 image assets. China04’s two contact sheets, World03’s final contact sheet, and the admitted Cao Cao and Mencius files were visually inspected for the new relationships. No new crop, reconstruction, generative scene or visual edit was made. The original individual asset reviews remain the evidence for image identity, rights and full pixel QA.

Saved World03 UNESCO pages establish the exact sites. In addition, 19 contextual pages were retrieved sequentially, with 3–4 second pauses, and saved in the research folder. Fetch receipts record URL, final URL, date, bytes and SHA-256. The primary texts are transmitted retrospective accounts, not contemporary photographs or unqualified validation of army totals, quoted speeches, omens or all donor details.

Sources inspected:
- `qindi-context.txt`: https://zh.wikisource.org/wiki/史記/卷006 (retrieved).
- `caocao-context.txt`: https://zh.wikisource.org/wiki/三國志/卷01 (retrieved).
- `xiliu-context.txt`: https://zh.wikisource.org/wiki/史記/卷057 (retrieved).
- `liuxiu-context.txt`: https://zh.wikisource.org/wiki/後漢書/卷1上 (retrieved).
- `zhudi-context.txt`: https://www.dpm.org.cn/court/lineage/226257.html (retrieved).
- `linzexu-context.txt`: https://en.wikisource.org/wiki/Eminent_Chinese_of_the_Ch'ing_Period/Lin_Ts%C3%AA-hs%C3%BC (retrieved).
- `sui-context.txt`: https://depts.washington.edu/silkroad/exhibit/sui/essay.html (retrieved).
- `genghis-unity-context.txt`: https://afe.easia.columbia.edu/mongols/figures/figu_geng_unity.htm (retrieved).
- `genghis-conquests-context.txt`: https://afe.easia.columbia.edu/mongols/conquests/conquests_2c.htm (retrieved).
- `nurhaci-context.txt`: https://en.wikisource.org/wiki/Eminent_Chinese_of_the_Ch'ing_Period/Nurhaci (retrieved).
- `hongtaiji-context.txt`: https://en.wikisource.org/wiki/Eminent_Chinese_of_the_Ch'ing_Period/Abahai (retrieved).
- `zuozongtang-context.txt`: https://www.ebsco.com/research-starters/history/zuo-zongtang (retrieved).
- `pala-context.txt`: https://www.metmuseum.org/toah/ht/06/ssn (retrieved).
- `sui03-context.txt`: https://zh.wikisource.org/wiki/隋書/卷03 (retrieved).
- `sui04-context.txt`: https://zh.wikisource.org/wiki/隋書/卷04 (retrieved).
- `yuanshizu04-context.txt`: https://zh.wikisource.org/wiki/元史/卷004 (retrieved).
- `songtaizu01-context.txt`: https://zh.wikisource.org/wiki/宋史/卷001 (retrieved).
- `mengzi-context.txt`: https://zh.wikisource.org/wiki/史記/卷074 (retrieved).
- `liubei32-context.txt`: https://zh.wikisource.org/wiki/三國志/卷32 (retrieved).
- Saved `research/v18/world-batch-03/angkor-context.html`: https://whc.unesco.org/en/list/668/ .
- Saved `research/v18/world-batch-03/bagan-context.html`: https://whc.unesco.org/en/list/1588/ .
- Saved `research/v18/world-batch-03/dholavira-context.html`: https://whc.unesco.org/en/list/1645/ .
- Saved `research/v18/world-batch-03/hampi-context.html`: https://whc.unesco.org/en/list/241/ .
- Saved `research/v18/world-batch-03/nalanda-context.html`: https://whc.unesco.org/en/list/1502/ .
- Saved `research/v18/world-batch-03/nan-madol-context.html`: https://whc.unesco.org/en/list/1503/ .
- Saved `research/v18/world-batch-03/sanchi-context.html`: https://whc.unesco.org/en/list/524/ .
- Saved `research/v18/world-batch-03/mohenjo-daro-context.html`: https://whc.unesco.org/en/list/138/ .

## Historical review flags, not narrative edits

Confirmed discrepancies and narrower source readings:

- `china-landmark-119`: the donor combines a 166 BCE Xiaoguan incursion with the Xiliu deployments; Shiji 57 dates the camp visit/deployment to Wen’s later-era year 6, or 158 BCE. Held.
- `china-landmark-314`: Sanguozhi 1 says more than 300,000 surrendered; selected elites became the Qingzhou Army. The Chinese entry turns that total into elite recruits. Held.
- `china-event-donghan-001`: Hou Hanshu separates the accession near Hao from the later move to Luoyang. The narrower `china-landmark-028` is accepted with that distinction; the English coronation-at-Luoyang title remains held.
- `china-landmark-036`: Sui shu 3 separates the Tongji Canal in 605 from Yongji in 608. The 605 donor summary bundles both. Held.
- `china-event-sui-010`: Sui shu 4 records the 615 Yanmen siege and the Xingluo/Luokou granary seizure in Daye 13, or 617, not the next year. Held.
- `china-landmark-424`: the Hummel biography reports 19,179 chests plus 2,119 bags destroyed. The English claim “over 20,000 chests” needs unit reconciliation. Only the narrower Humen record is admitted.
- `china-landmark-466`: Nurhaci’s death is not established as the consequence of a cannon wound; the inspected biography describes a possible slight wound and death seven months later. Held.
- `china-landmark-505`: the Hong Taiji spy/ruse account is attributed to Qing official accounts by the inspected biography; the donor removes that attribution. Held.

Qualification retained for accepted narrow connections:

- `china-landmark-485`: Shiji 74 supports Mencius, Wan Zhang and the seven books, but not the exact donor year 312 BCE. The image identifies the teacher and textual tradition only.
- `china-landmark-309` and `china-event-sui-009`: troop totals are transmitted annal claims, not independently counted armies. Connections identify the named commanders and do not repeat numbers.
- `china-landmark-062`: palace completion in 1420 and formal capital move in 1421 are distinguished in the caption.
- `china-landmark-407`: Yuan shi 4 specifies skin floats and rafts, without establishing the animal species; the connection does not repeat “sheepskin.”
- `china-landmark-404`, `china-landmark-413` and `china-landmark-173`: the inspected sources support the named actor and central event, but not every precise location, expedition count or later promotion in the donor description. Connections use the narrower supported facts.
- Pending Kublai dating and the composite Thirteen Emperors scroll qualifications are inherited unchanged from China04. A ruler image is not treated as a recording of the linked event.

Source-quality cautions: the Washington Sui essay’s erroneous Yuezhi terminology, Columbia’s overextended Jin geography, EBSCO’s erroneous overview chronology and UNESCO’s dated Moenjodaro functional labels are not propagated.

## Accepted entry decisions

### china-event-qin-001
- Title: King Ying Zheng unifies the six states as the First Emperor / 秦王嬴政统一六国，称“始皇帝”
- Asset: `qin-shi-huang`; role: named-person.
- Connection: The nineteenth-century portrayal identifies Ying Zheng, the ruler who adopted the title First Emperor after the conquest of the six states.
- 中文联系：十九世纪画像标识嬴政：本条讲述的君主在吞并六国后采用“始皇帝”称号。
- Decision: Shiji 6, year 26, records the defeat of Qi and adoption of the imperial title; the image is an admitted later portrayal of that same named ruler.
- Evidence: https://zh.wikisource.org/wiki/史記/卷006

### china-landmark-485
- Title: Returning home to Zou, Mencius teaches disciples and compiles the seven-book classic Mencius / 孟子去齐返故里邹邑讲学终老，与万章诸弟子编撰《孟子》七篇
- Asset: `china-batch-03-mengzi`; role: named-person.
- Connection: The Yuan portrait presents Mencius as a revered teacher. The Shiji connects his work with Wan Zhang and the seven books named in this entry.
- 中文联系：元代画像将孟子呈现为受尊崇的师者。《史记》把他与万章等人的学术活动，同本条所述《孟子》七篇联系起来。
- Decision: Shiji 74 expressly names Meng Ke, Wan Zhang and seven books. It does not establish the donor entry’s exact 312 BCE date; association is with the author and teaching tradition, not a dated composition scene.
- Evidence: https://zh.wikisource.org/wiki/史記/卷074

### china-landmark-257
- Title: Cao Cao marches through Lulong Pass; Zhang Liao slays Tadun at White Wolf Mountain / 曹操出卢龙塞北征乌桓，张辽白狼山阵斩蹋顿，平定辽西
- Asset: `china-rebuild-cao-cao`; role: named-person.
- Connection: This Ming illustration identifies Cao Cao, who led the Wuhuan campaign through Lulong Pass to White Wolf Mountain in 207.
- 中文联系：这幅明代插图标识曹操，他在207年率军出卢龙塞，在白狼山与乌桓交战。
- Decision: Sanguozhi 1, Jian’an 12, records the Lulong route, White Wolf Mountain and Zhang Liao as vanguard. The book image identifies Cao Cao by his posthumous title.
- Evidence: https://zh.wikisource.org/wiki/三國志/卷01

### china-landmark-220
- Title: Cao Cao overtakes Liu Bei at Changban in Dangyang (Jingmen), where Zhao Yun rescues Liu Shan / 曹操精骑追刘备于当阳长坂，赵云单骑救主、张飞据水断桥
- Asset: `china-rebuild-cao-cao`; role: named-person.
- Connection: The later portrayal identifies Cao Cao, whose cavalry pursuit caught Liu Bei’s retreating force at Changban.
- 中文联系：后世画像标识曹操，本条长坂事件中由他率骑兵追及南撤的刘备部众。
- Decision: Sanguozhi 32 explicitly records Cao Cao’s mounted pursuit and its arrival at Changban. No claim is made that this portrait depicts Zhao Yun’s rescue or Zhang Fei’s bridge action.
- Evidence: https://zh.wikisource.org/wiki/三國志/卷32

### china-landmark-299
- Title: Emperor Wen inspects Xiliu Camp at a walk, praising strict commander Zhou Yafu as a true general / 匈奴寇边，汉文帝劳军细柳营按辔徐行，赞周亚夫真将军
- Asset: `china-batch-04-hanwendi`; role: named-person.
- Connection: The Song image recalls Emperor Wen of Han, the ruler whose visit to Zhou Yafu’s Xiliu camp tests the relationship between imperial rank and military discipline.
- 中文联系：宋代图像追摹汉文帝。本条中，他劳军周亚夫细柳营的经历，呈现皇帝身份与军营纪律之间的关系。
- Decision: Shiji 57, Wen’s later-era year 6, explicitly gives the camp visit, slow entry and praise for Zhou Yafu; this is the same named emperor depicted by the admitted Song artwork.
- Evidence: https://zh.wikisource.org/wiki/史記/卷057

### china-landmark-309
- Title: Battle of Kunyang: Liu Xiu leads 3,000 shock troops to rout Wang Mang's 420,000-man army / 昆阳之战：刘秀率敢死队冲阵大破王莽四十二万大军
- Asset: `china-batch-04-liuxiu`; role: named-person.
- Connection: The later imperial image identifies Liu Xiu, whose role in the Kunyang victory became central to accounts of his rise.
- 中文联系：后世帝王像标识刘秀，他在昆阳之战中的作用成为其崛起叙事的重要部分。
- Decision: Hou Hanshu 1上 narrates Kunyang and Liu Xiu’s assault. Its 420,000 and 3,000 figures are transmitted annal claims, not an independently established modern count; the association supplies identity only.
- Evidence: https://zh.wikisource.org/wiki/後漢書/卷1上

### china-landmark-310
- Title: Liu Xiu captures Handan and absorbs northern peasant armies, securing Hebei as his base / 刘秀巡行河北攻拔邯郸诛灭王郎，铜马诸部降附号“铜马帝”
- Asset: `china-batch-04-liuxiu`; role: named-person.
- Connection: The later image identifies Liu Xiu, whose capture of Handan and incorporation of the Tongma forces built his northern base.
- 中文联系：后世画像标识刘秀；攻取邯郸、吸收铜马部众，是本条所述其北方根据地形成的关键步骤。
- Decision: Hou Hanshu 1上, Gengshi 2, records the capture of Handan, death of Wang Lang and incorporation of Tongma forces, including the Tongma Emperor designation.
- Evidence: https://zh.wikisource.org/wiki/後漢書/卷1上

### china-landmark-028
- Title: Liu Xiu establishes the Eastern Han with Luoyang as imperial capital / 刘秀建立东汉定都洛阳，开启光武中兴
- Asset: `china-batch-04-liuxiu`; role: named-person.
- Connection: The portrait identifies Liu Xiu, founder of the Eastern Han. His accession and the later establishment of Luoyang as his capital were separate steps in 25 CE.
- 中文联系：画像标识东汉开国君主刘秀。称帝与随后定都洛阳，是公元25年先后发生的两个步骤。
- Decision: Hou Hanshu 1上 separates the June accession near Hao from the tenth-month entry into Luoyang. This donor title names the dynasty and capital without locating the coronation at Luoyang.
- Evidence: https://zh.wikisource.org/wiki/後漢書/卷1上

### china-yongle-encyclopedia-1403
- Title: An encyclopedia that preserved parts of lost books / 保存失传书籍片段的《永乐大典》
- Asset: `china-batch-04-zhudi`; role: named-person.
- Connection: The Ming portrait introduces the Yongle emperor who commissioned the encyclopedia, placing imperial patronage beside the scholars’ work of gathering and copying texts.
- 中文联系：明代御容介绍下令编纂《永乐大典》的永乐帝，让读者在学者搜集、抄录典籍的劳动之外，也看到宫廷资助的角色。
- Decision: The exact assembled encyclopedia story names the Yongle emperor; the Palace Museum biography records the project beginning in Yongle 1. The portrait is patron identity, not a manuscript specimen.
- Evidence: https://www.dpm.org.cn/court/lineage/226257.html

### china-event-ming-007
- Title: Zhu Di, Prince of Yan, launches the Jingnan Campaign from Beiping / 燕王朱棣于北平起兵发动“靖难之役”
- Asset: `china-batch-04-zhudi`; role: named-person.
- Connection: The Ming portrait identifies Zhu Di, the Prince of Yan whose challenge to his nephew’s government opened the Jingnan war.
- 中文联系：明代御容标识朱棣；身为燕王的他向侄子朝廷发起挑战，开启了靖难战争。
- Decision: The Palace Museum biography describes the reduction of princely power, the Prince of Yan’s rising and the ensuing three-year war before 1402.
- Evidence: https://www.dpm.org.cn/court/lineage/226257.html

### china-landmark-050
- Title: Jingnan Campaign: Zhu Di captures Nanjing and ascends as the Yongle Emperor / 靖难之役：燕王朱棣攻克南京，即位为明成祖
- Asset: `china-batch-04-zhudi`; role: named-person.
- Connection: This Ming portrait identifies Zhu Di, who took Nanjing in 1402 and claimed the throne as the Yongle emperor.
- 中文联系：这幅明代御容标识朱棣：他在1402年攻取南京，夺取帝位，次年改元永乐。
- Decision: The Palace Museum gives Nanjing’s capture and Zhu Di’s accession in June 1402, followed by the Yongle era from 1403. The image represents the named ruler, not the seizure of the city.
- Evidence: https://www.dpm.org.cn/court/lineage/226257.html

### china-landmark-062
- Title: Yongle Emperor completes the Forbidden City and moves the Ming capital to Beijing / 明成祖朱棣建北京紫禁城成，正式自南京迁都北京
- Asset: `china-batch-04-zhudi`; role: named-person.
- Connection: The portrait identifies the emperor behind the move to Beijing. Palace construction was completed in 1420, followed by the formal transfer of the capital in 1421.
- 中文联系：画像标识推动迁都北京的皇帝。宫殿于1420年建成，1421年正式迁都。
- Decision: The Palace Museum explicitly separates the late-1420 completion of the palaces from the following year’s formal move. This narrow distinction is retained in the connection.
- Evidence: https://www.dpm.org.cn/court/lineage/226257.html

### china-landmark-413
- Title: Returning from his fifth expedition across the Gobi Steppe, Yongle Emperor Zhu Di dies at Yumuchuan / 六十五岁的明成祖朱棣第五次亲征漠北阿鲁台班师途中，病逝于塞外榆木川
- Asset: `china-batch-04-zhudi`; role: named-person.
- Connection: The Ming image identifies the Yongle emperor, whose final northern expedition ended with his death at Yumuchuan in 1424.
- 中文联系：明代御容标识永乐帝，他最后一次北征以1424年在榆木川病逝告终。
- Decision: The Palace Museum records his northern campaigning and 1424 death at Yumuchuan. The image is imperial identity rather than a deathbed or campaign scene; exact expedition count is not independently established here.
- Evidence: https://www.dpm.org.cn/court/lineage/226257.html

### china-landmark-114
- Title: Imperial Commissioner Lin Zexu destroys opium stocks at Humen near Guangzhou / 林则徐抵广州查禁鸦片，于虎门海滩当众销烟
- Asset: `china-batch-04-linzexu`; role: named-person.
- Connection: Lam Qua’s portrait introduces Lin Zexu, the imperial commissioner who confiscated opium and oversaw its destruction at Humen in 1839.
- 中文联系：林呱的肖像介绍林则徐：这位钦差大臣在1839年收缴鸦片，并主持虎门销烟。
- Decision: Hummel’s Lin biography records the Canton arrival, confiscation and destruction at the Bogue/Humen using salt water and lime. The image’s author and nineteenth-century date remain in the parent asset.
- Evidence: https://en.wikisource.org/wiki/Eminent_Chinese_of_the_Ch'ing_Period/Lin_Ts%C3%AA-hs%C3%BC

### china-landmark-381
- Title: Battle of Gaoping: Guard commander Zhao Kuangyin rallies Later Zhou lines to crush Northern Han / 高平之战：赵匡胤身先士卒稳住后周阵脚，反击大破北汉军
- Asset: `china-batch-04-zhaokuangyin`; role: named-person.
- Connection: The imperial portrait identifies Zhao Kuangyin, whose earlier military career included the Later Zhou victory at Gaoping.
- 中文联系：御容标识赵匡胤；在成为宋朝皇帝之前，他的军旅生涯包括后周高平之战。
- Decision: Song shi 1 describes Zhao rallying the threatened Zhou force at Gaoping under Shizong. Later dynastic narration is distinguished from the image’s imperial presentation.
- Evidence: https://zh.wikisource.org/wiki/宋史/卷001

### china-landmark-079
- Title: Zhao Kuangyin founds the Northern Song Dynasty with Dongjing (Kaifeng) as capital / 赵匡胤陈桥兵变，于东京开封府建立北宋
- Asset: `china-batch-04-zhaokuangyin`; role: named-person.
- Connection: The Song portrait presents Zhao Kuangyin as Emperor Taizu, the founder who established the new dynasty in 960.
- 中文联系：宋代御容将赵匡胤呈现为宋太祖，即960年建立新王朝的开国皇帝。
- Decision: Song shi 1 records the Chenqiao accession narrative and the naming of Song in Jianlong 1. No claim is made that the portrait validates the chronicle’s speeches or omens.
- Evidence: https://zh.wikisource.org/wiki/宋史/卷001

### china-event-sui-007
- Title: Emperor Yang defeats Tuyuhun and establishes Xihai and three other western commanderies / 隋炀帝西巡张掖，破吐谷浑置西海、河源、鄯善、且末四郡
- Asset: `china-batch-04-yangguang`; role: named-person.
- Connection: The later image identifies Emperor Yang of Sui, whose western expedition led to the creation of the four commanderies named in this entry.
- 中文联系：后世画像标识隋炀帝。本条所述西巡之后，朝廷设置了西海等四郡。
- Decision: Sui shu 3, Daye 5, records the western tour and the four commanderies Xihai, Heyuan, Shanshan and Qiemo. The relation is to the named ruler, not a regional stock image.
- Evidence: https://zh.wikisource.org/wiki/隋書/卷03

### china-event-sui-009
- Title: Emperor Yang launches his first grand campaign against Goguryeo / 隋炀帝征调百万大军东征高句丽，萨水失利
- Asset: `china-batch-04-yangguang`; role: named-person.
- Connection: The imperial image identifies Yang Guang, the Sui emperor who ordered the 612 campaign against Goguryeo.
- 中文联系：帝王像标识杨广，即612年发动对高句丽战争的隋朝皇帝。
- Decision: Sui shu 4, Daye 8, records the mobilization, campaign and defeat at Salsu. Enormous troop totals remain annal claims; the portrait neither visualizes nor validates their scale.
- Evidence: https://zh.wikisource.org/wiki/隋書/卷04

### china-event-sui-012
- Title: Yuwen Huaji mutinies at Jiangdu and kills Emperor Yang, ending the Sui / 宇文化及江都兵变弑隋炀帝，隋亡
- Asset: `china-batch-04-yangguang`; role: named-person.
- Connection: The later portrayal identifies Emperor Yang, whose death in the Jiangdu mutiny became a turning point in the breakup of Sui rule.
- 中文联系：后世画像标识隋炀帝；他在江都兵变中被杀，是隋朝统治瓦解的重要节点。
- Decision: Sui shu 4 identifies Yuwen Huaji’s mutiny, the emperor’s death and subsequent burial at Jiangdu. It also records another Sui emperor already enthroned, so the connection does not imply all rival Sui claims ended in one moment.
- Evidence: https://zh.wikisource.org/wiki/隋書/卷04

### china-landmark-109
- Title: Yuwen Huaji assassinates Emperor Yang of Sui in Jiangdu (Yangzhou) / 宇文化及于江都发动兵变弑隋炀帝，隋朝覆亡
- Asset: `china-batch-04-yangguang`; role: named-person.
- Connection: This image identifies Yang Guang, the emperor killed during the mutiny at Jiangdu, in present-day Yangzhou.
- 中文联系：这幅画像标识在江都兵变中被杀的皇帝杨广；江都即今扬州一带。
- Decision: Sui shu 4 expressly records Yuwen Huaji and the named victim in the Jiangdu palace setting; later representation only.
- Evidence: https://zh.wikisource.org/wiki/隋書/卷04

### china-landmark-404
- Title: Temujin unites the Mongol tribes at an Onon River kurultai and takes the title Genghis Khan / 铁木真统一蒙古高原诸部，于斡难河源召开忽里勒台大会建大蒙古国
- Asset: `china-batch-04-genghiskhan`; role: named-person.
- Connection: The fourteenth-century portrait identifies Temujin, who received the title Genghis Khan at the assembly of 1206.
- 中文联系：十四世纪画像标识铁木真，他在1206年的大会上获得“成吉思汗”称号。
- Decision: Columbia’s account explicitly identifies Temujin, the 1206 assembly and the new title. The artwork is a later identity image; it does not establish the assembly’s exact location.
- Evidence: https://afe.easia.columbia.edu/mongols/figures/figu_geng_unity.htm

### china-landmark-060
- Title: Genghis Khan's Mongol forces capture Jin Zhongdu / 成吉思汗蒙古大军攻占金中都
- Asset: `china-batch-04-genghiskhan`; role: named-person.
- Connection: The later portrait identifies Genghis Khan, whose forces captured the Jin capital Zhongdu in 1215.
- 中文联系：后世画像标识成吉思汗，其军队于1215年攻取金朝都城中都。
- Decision: Columbia explicitly records the 1215 seizure of the Beijing area by Chinggis’s troops. Its separate overstatement of Jin territory and implied capital-transfer sequence are not used.
- Evidence: https://afe.easia.columbia.edu/mongols/conquests/conquests_2c.htm

### china-event-nansong-017
- Title: Kublai leads Mongol forces across the Jinsha River to conquer Dali / 忽必烈率蒙军渡金沙江平定大理国
- Asset: `china-batch-04-kublaikhan`; role: named-person.
- Connection: The imperial album image identifies Kublai, who led the 1253 campaign through the Jinsha River region against Dali.
- 中文联系：帝王册像标识忽必烈，他在1253年率军经金沙江一带进攻大理。
- Decision: Yuan shi 4 records the 1253 routes, river crossing and entry into Dali. The album’s exact image date and artist remain unestablished in its admitted record.
- Evidence: https://zh.wikisource.org/wiki/元史/卷004

### china-landmark-407
- Title: Kublai Khan crosses the Jinsha River on inflated sheepskin rafts to conquer Dali in Yunnan / 忽必烈率蒙古大军自临洮革囊渡金沙江，千里奇袭攻灭大理国
- Asset: `china-batch-04-kublaikhan`; role: named-person.
- Connection: The album image identifies Kublai, the commander in this Dali campaign. The Yuan history describes his troops crossing the Jinsha River with skin floats and rafts.
- 中文联系：册像标识这次大理战役的统帅忽必烈。《元史》记载其部队使用革囊与筏渡过金沙江。
- Decision: Yuan shi 4 explicitly says leather/skin floats and rafts, not a battle image. The specific animal used for the skins is not established by the inspected passage.
- Evidence: https://zh.wikisource.org/wiki/元史/卷004

### china-landmark-173
- Title: Kublai Khan is enthroned as Great Khan at Kaiping, soon elevated to summer capital Shangdu / 忽必烈于滦河上游开平即大汗位建元中统，旋升开平府为上都
- Asset: `china-batch-04-kublaikhan`; role: named-person.
- Connection: The imperial image identifies Kublai, whose accession at Kaiping in 1260 anchors this account of the future summer capital.
- 中文联系：帝王像标识忽必烈；他在1260年于开平即位，是本条叙述后来夏都的时间起点。
- Decision: Yuan shi 4 gives the assembly at Kaiping and accession in Zhongtong 1. Later promotion to Shangdu is not silently dated to the same day or validated by the portrait.
- Evidence: https://zh.wikisource.org/wiki/元史/卷004

### china-event-ming-035
- Title: Battle of Shen-Liao: Nurhaci captures Shenyang and Liaoyang, moving the Later Jin capital / 沈辽之战：努尔哈赤连克沈阳、辽阳，后金迁都辽阳
- Asset: `china-batch-04-nurhaci`; role: named-person.
- Connection: The Qing court portrait identifies Nurhaci, whose capture of Shenyang and Liaoyang in 1621 shifted the Later Jin capital into Liaodong.
- 中文联系：清代宫廷画像标识努尔哈赤；他在1621年攻取沈阳、辽阳，将后金都城迁入辽东。
- Decision: Hummel’s Nurhaci biography explicitly records both captures and the move to Liaoyang in 1621. The 1625 move to Shenyang is a later step and is not conflated here.
- Evidence: https://en.wikisource.org/wiki/Eminent_Chinese_of_the_Ch'ing_Period/Nurhaci

### china-event-ming-036
- Title: Victory at Ningyuan: Yuan Chonghuan repels Nurhaci's Later Jin siege with heavy cannon / 宁远大捷：袁崇焕凭孤城红夷大炮重创后金努尔哈赤
- Asset: `china-batch-04-nurhaci`; role: named-person.
- Connection: The court portrait identifies Nurhaci, the Later Jin ruler whose forces were repelled by Yuan Chonghuan at Ningyuan in 1626.
- 中文联系：宫廷画像标识后金统治者努尔哈赤；其部队在1626年宁远之战中被袁崇焕击退。
- Decision: Hummel’s Nurhaci biography records the defeat by Yuan Chonghuan at Ningyuan. The association deliberately does not turn Nurhaci’s subsequent death into a proven consequence of a cannon wound.
- Evidence: https://en.wikisource.org/wiki/Eminent_Chinese_of_the_Ch'ing_Period/Nurhaci

### china-landmark-475
- Title: Jisi Incident: Hong Taiji bypasses Shanhaiguan to besiege Beijing; Yuan Chonghuan defends the gates / 己巳之变：皇太极绕道破喜峰口逼北京，袁崇焕驰援广渠门
- Asset: `china-batch-04-huangtaiji`; role: named-person.
- Connection: The Qing portrait identifies Hong Taiji, whose 1629 advance through Xifengkou brought his army to Beijing.
- 中文联系：清代画像标识皇太极；他在1629年经喜峰口进军，兵临北京。
- Decision: Hummel’s Abahai biography identifies the Xifengkou route, Beijing attack and Yuan Chonghuan’s relief march. Its separately attributed spy story is not repeated as established fact.
- Evidence: https://en.wikisource.org/wiki/Eminent_Chinese_of_the_Ch'ing_Period/Abahai

### china-landmark-512
- Title: Aged seventy-three, Zuo Zongtang oversees coastal defense in Fujian against France and dies in Fuzhou / 七十三岁的左宗棠抱病督师福建抗法，中法议和后病逝福州行辕
- Asset: `china-batch-04-zuozongtang`; role: named-person.
- Connection: The historical photograph identifies Zuo Zongtang, whose final appointment took him back to Fujian, where he died in 1885.
- 中文联系：历史照片标识左宗棠；他最后一次任职重返福建，并于1885年在那里去世。
- Decision: EBSCO full article gives the Fujian assignment and death at Fuzhou in 1885. Its erroneous overview chronology is not used; the photograph is identity context for his last service, not evidence of a specific battle.
- Evidence: https://www.ebsco.com/research-starters/history/zuo-zongtang

### khmer-angkor-political-phase
- Title: Angkorian courts: power across a managed landscape / 吴哥诸宫廷：经营景观中的权力
- Asset: `world-batch-03-angkor`; role: named-site.
- Connection: Angkor Wat makes the entry’s royal landscape visible: temple building joined political authority to religious devotion within a much wider inhabited city.
- 中文联系：吴哥寺让本条所述王室景观具体可见：寺庙营建把政治权威与宗教奉献联系起来，并属于更广阔的有人居住的城市。
- Decision: Read saved UNESCO Angkor description and modern photograph. Exact named royal-capital landscape is central to the assembled summary; no automatic association with every Khmer ruler.
- Evidence: https://whc.unesco.org/en/list/668/

### bagan-royal-political-phase
- Title: Bagan: kingship and the institutions of merit / 蒲甘：王权与功德制度
- Asset: `world-batch-03-bagan`; role: named-site.
- Connection: Bagan’s surviving temples give physical form to the relationship between royal authority, merit-making and many acts of patronage described here.
- 中文联系：蒲甘留存的寺庙，为本条所述王权、积累功德与众多赞助行为之间的关系提供了实体景观。
- Decision: Read saved UNESCO statement on Bagan’s eleventh–thirteenth-century regional capital and merit-making. The exact site and historical building landscape are the record’s subject.
- Evidence: https://whc.unesco.org/en/list/1588/

### indus-civilization-urban-networks
- Title: Indus civilization · Cities and regional networks / 印度河文明 · 城市与区域联系
- Asset: `world-batch-03-dholavira`; role: named-site.
- Connection: Dholavira is one of the cities named in this Indus overview. Its reservoir makes the practical work of storing water visible within the wider urban network.
- 中文联系：多拉维拉是本条印度河城市概览明确列举的城市之一。蓄水池让城市网络背后的储水工程具体可见。
- Decision: Read saved UNESCO Dholavira description of Harappan urban planning and reservoirs; the exact city is explicitly named in the entry’s account of wells and drainage.
- Evidence: https://whc.unesco.org/en/list/1645/

### vijayanagara-imperial-phase
- Title: Vijayanagara: a regional empire with several successors / 毗奢耶那伽罗：区域帝国与多个继承者
- Asset: `world-batch-03-hampi`; role: named-site.
- Connection: Hampi’s stone chariot shrine belongs to the capital landscape described here, showing how Vijayanagara’s temples joined skilled production with ceremonial life.
- 中文联系：亨比的石车神龛属于本条所述都城景观，呈现毗奢耶那伽罗寺庙如何结合工匠技艺与礼仪生活。
- Decision: Read saved UNESCO Hampi statement identifying the Vijayanagara capital and Vitthala temple stone chariot. Exact capital-site relation is substantive, not generic dynasty matching.
- Evidence: https://whc.unesco.org/en/list/241/

### pala-dynasty
- Title: Pala: Buddhist courts in Bengal and Bihar / 波罗王朝：孟加拉与比哈尔的佛教宫廷
- Asset: `world-batch-03-nalanda`; role: named-site.
- Connection: Nalanda was one of the Buddhist institutions supported by Pala rulers. This modern view makes that named place of teaching and patronage tangible.
- 中文联系：那烂陀是波罗统治者支持的佛教机构之一。这张现代照片，使本条具名的教学与赞助场所具体可见。
- Decision: The Met timeline explicitly states Pala patronage of Nalanda; saved UNESCO page and asset metadata establish this as Nalanda. No individual visible brick course or temple phase is assigned to a Pala king.
- Evidence: https://www.metmuseum.org/toah/ht/06/ssn

### saudeleur-monumental-phase
- Title: Saudeleur authority: a ceremonial center on Pohnpei / 绍德雷尔权威：波纳佩的礼仪中心
- Asset: `world-batch-03-nan-madol`; role: named-site.
- Connection: Nan Madol’s basalt walls make the Saudeleur ceremonial centre visible, connecting the entry’s account of authority with the labour of monumental construction.
- 中文联系：南马都尔的玄武岩墙使绍德雷尔礼仪中心具体可见，把本条的权威叙述与大型营建所需的劳动联系起来。
- Decision: Read saved UNESCO description explicitly identifying Nan Madol as the Saudeleur ceremonial centre and its basalt construction. Same exact political centre, not a general Pacific illustration.
- Evidence: https://whc.unesco.org/en/list/1503/

### sanchi-donor-inscriptions
- Title: Names on the stone: the donors of Sanchi / 刻在石上的姓名：桑奇的施主
- Asset: `world-batch-03-sanchi`; role: named-site.
- Connection: The Great Stupa and its stone railings place Sanchi’s donor inscriptions within the sanctuary they helped support. The view shows the monument rather than a close-up of one donor’s text.
- 中文联系：大塔与石栏把桑奇施主铭文放回他们支持的圣地之中。照片呈现建筑整体，并非某位施主铭文的特写。
- Decision: Read exact donor story and saved UNESCO Sanchi description of railings, gateways and inscriptions. Admitted as the named sanctuary’s setting, not as a legible image of Dhamarakhitā’s inscription.
- Evidence: https://whc.unesco.org/en/list/524/

### indus-civilization-urban-networks
- Title: Indus civilization · Cities and regional networks / 印度河文明 · 城市与区域联系
- Asset: `world-batch-03-mohenjo-daro`; role: named-site.
- Connection: Mohenjo-daro is another city named in this overview. Its Great Bath offers a concrete comparison with Dholavira’s reservoir: two different uses of water in Indus urban life.
- 中文联系：摩亨佐达罗是本条列举的另一座城市。大浴池可与多拉维拉蓄水池具体对读，展示印度河城市生活中两种不同的用水设施。
- Decision: Read saved UNESCO description of Moenjodaro and admitted photograph of the Great Bath. The exact city is central to the overview; a second association adds no additional covered ID.
- Evidence: https://whc.unesco.org/en/list/138/

## Excluded or held entry decisions

Every exact bilingual summary is retained in `association-decisions.json`; titles and reasons are repeated below for scan-friendly review.

- **china-landmark-283** → `qin-shi-huang`. Qin Shi Huang orders the Lingqu Canal dug to link the Xiang and Li rivers and conquer Lingnan / 秦始皇命史禄开凿灵渠沟通湘漓二水，屠睢任嚣统军平定岭南置三郡. Preserve existing-links-01 exclusion without new evidence: Hold: canal attribution and compressed military chronology need source review before pairing.
- **china-event-qin-004** → `qin-shi-huang`. First Emperor decrees the Burning of Books on Li Si advice, executing scholars next year / 秦始皇采李斯议下“焚书令”，次年于咸阳坑杀方士儒生. Preserve existing-links-01 exclusion without new evidence: Hold: the combined burning/executions account needs review of targets, chronology and retrospective testimony.
- **china-landmark-148** → `qin-shi-huang`. On his final eastern tour at Langya, Qin Shi Huang sends Xu Fu across the sea for immortals / 秦始皇末次东巡至琅琊，遣方士徐福率童男女数千人入海求仙. Preserve existing-links-01 exclusion without new evidence: Hold: Shiji chapter 6 places the youths’ first sea expedition in the 28th year, while this entry compresses it into the final tour.
- **china-landmark-145** → `kangxi`. Emperor Kangxi visits Qufu Temple of Confucius, performing full imperial rites and calligraphy / 康熙帝南巡回銮亲幸曲阜孔庙，行三跪九叩大礼并御书“万世师表”匾额. Preserve existing-links-01 exclusion without new evidence: Hold: specific ritual and inscription claims not corroborated by the sources inspected in this batch.
- **china-event-qing-008** → `kangxi`. Siege of Albazin (Yakesa) against Russian Cossack incursions / 康熙命彭春、萨布素发起雅克萨之战，痛击沙俄侵略军. Preserve existing-links-01 exclusion without new evidence: Hold: named generals and military episode need more direct evidence than the broad imperial biography.
- **china-landmark-174** → `kangxi`. Emperor Kangxi convenes the Dolon Nor Assembly, integrating the Khalkha Mongols into banners / 康熙帝亲赴多伦诺尔会盟喀尔喀三部与漠南诸旗，编旗管辖漠北. Preserve existing-links-01 exclusion without new evidence: Hold: Dolon Nor assembly and banner integration need a dedicated source review.
- **china-event-qing-011** → `kangxi`. Emperor Kangxi personally leads campaigns into Outer Mongolia, routing Galdan at Jao Modo / 康熙帝三次亲征漠北，昭莫多之战大破准噶尔部噶尔丹主力. Preserve existing-links-01 exclusion without new evidence: Hold: distinguish Kangxi’s campaign leadership from the separate force that fought at Jao Modo.
- **china-landmark-423** → `kangxi`. Battle of Jao Modo: Kangxi leads Qing forces across the Gobi to crush Zunghar khan Galdan / 康熙帝亲征朔漠，昭莫多之战清军火器大破准噶尔噶尔丹主力. Preserve existing-links-01 exclusion without new evidence: Hold: emperor’s location, battle command and asserted firearms explanation need dedicated review.
- **china-event-qing-013** → `kangxi`. Yongzheng Emperor ascends; tax reform and Southwest gaitu guiliu launched / 康熙帝卒，雍正帝即位，开启摊丁入亩与西南改土归流. Preserve existing-links-01 exclusion without new evidence: Kangxi’s death is the transition; Yongzheng and his reforms are the actual subject.
- **china-event-qing-017** → `qianlong`. Qianlong Emperor ascends; northwest campaigns prepared / 乾隆帝即位，设办理苗疆事务、经略西北准部. Preserve existing-links-01 exclusion without new evidence: Hold: accession in 1735 versus reign era 1736 and bundled frontier-policy claims need separation.
- **china-event-qing-019** → `qianlong`. Qianlong confines Western trade to Canton under the Thirteen Hongs (the Canton System) / 乾隆帝限令西洋商船只许广州一口通商，十三行专营. Preserve existing-links-01 exclusion without new evidence: Hold: restriction of Western maritime trade and monopoly institutions need more precise chronology; do not imply closure of all trade.
- **china-event-qing-022** → `qianlong`. Fuk’anggan crosses the strait to suppress Lin Shuangwen’s uprising; Zhuluo is renamed Jiayi / 福康安率军渡海平定台湾林爽文起义，乾隆赐改诸罗县为“嘉义”. Preserve existing-links-01 exclusion without new evidence: Fuk’anggan and the Taiwan campaign are the central subject; imperial renaming alone is too weak.
- **china-event-qing-025** → `qianlong`. Qianlong abdicates to Jiaqing; White Lotus Rebellion breaks out / 太上皇乾隆禅位嘉庆帝；川楚白莲教起义爆发. Preserve existing-links-01 exclusion without new evidence: Hold: split abdication from outbreak of rebellion rather than imply one portrait explains both.
- **china-event-qing-026** → `qianlong`. Following Qianlong's death, the Jiaqing Emperor executes corrupt minister Heshen / 太上皇乾隆崩，嘉庆帝迅雷赐死权臣和珅，清廷由盛转衰. Preserve existing-links-01 exclusion without new evidence: Qianlong’s death provides the transition; Jiaqing’s action against Heshen is central.
- **china-person-tangxuanzong** → `li-bai`. Xuanzong: a court of poets and a reign in crisis / 唐玄宗：诗人的宫廷与统治危机. Preserve existing-links-01 exclusion without new evidence: Li Bai is a supporting court figure; his portrait does not depict Xuanzong, the biography’s subject.
- **china-landmark-229** → `li-bai`. Poet Wang Changling is exiled to Longbiao (Huaihua), inspiring Li Bai's famous farewell poem / 王昌龄贬龙标（今怀化）尉筑芙蓉楼，李白寄诗“随君直到夜郎西”. Preserve existing-links-01 exclusion without new evidence: Hold: exile date and the Furong Tower claim need review; no image admitted for the poem solely from a name match.
- **china-landmark-367** → `yan-requiem`. Prefect Yan Zhenqing raises the loyalist banner at Pingyuan, rallying seventeen Hebei commanderies / 安禄山叛军南下河北瓦解，平原太守颜真卿首举义旗传檄讨贼. Preserve existing-links-01 exclusion without new evidence: The surviving requiem is not an image of the earlier Pingyuan mobilization; no direct object link central to this title.
- **china-landmark-369** → `yan-requiem`. Seventy-seven-year-old elder statesman Yan Zhenqing defies warlord Li Xilie at Caizhou unto death / 七十七岁的太师颜真卿奉命孤身赴蔡州宣慰叛将李希烈，囚禁逾年凛然不屈. Preserve existing-links-01 exclusion without new evidence: The 758 manuscript is not the 785 execution or a portrait; would supply only broad biographical context.
- **china-landmark-441** → `china-batch-03-wangxizhi`. Migrating south with the aristocratic Wang clan of Langya, young Wang Xizhi masters calligraphy / 王羲之随琅琊王氏衣冠南渡居建康乌衣巷，少学书博采众长. The asset is a later copy of the Orchid Pavilion preface, not a portrait. Neither the youthful migration nor the retirement oath entry names that work; a different life episode is insufficient.
- **china-landmark-442** → `china-batch-03-wangxizhi`. Swearing at his parents’ tomb never to serve again, Wang Xizhi retires among Zhejiang hills / 王羲之誓墓辞官退居剡县金庭，遍游浙东山水安度晚年. The asset is a later copy of the Orchid Pavilion preface, not a portrait. Neither the youthful migration nor the retirement oath entry names that work; a different life episode is insufficient.
- **china-landmark-443** → `china-batch-03-taoyuanming`. Tao Yuanming farms beneath Mount Lu, writing Picking chrysanthemums by the eastern hedge / 陶渊明归隐庐山栗里躬耕垄亩，赋“采菊东篱下，悠然见南山”. The admitted artwork imagines Tao Yuanming’s Return Home. These entries concern other named poems and asserted circumstances/dates not established by the saved object receipt; no automatic author-wide use.
- **china-landmark-338** → `china-batch-03-taoyuanming`. Living in seclusion at Xunyang after Jin falls, Tao Yuanming writes Peach Blossom Spring / 刘裕代晋建宋后陶渊明隐居浔阳，著《桃花源记》寄志. The admitted artwork imagines Tao Yuanming’s Return Home. These entries concern other named poems and asserted circumstances/dates not established by the saved object receipt; no automatic author-wide use.
- **china-person-banchao** → `china-batch-03-ban-zhao`. Ban Chao · Negotiating and coercing the oasis states / 班超 · 绿洲诸国间的交涉与武力. The imaged person is a supporting relative, patron, ally or opponent in another person’s biography. A portrait of the biography’s actual subject would be more faithful; no coverage added from an incidental name.
- **china-landmark-274** → `china-batch-03-quyuan`. Despite Qu Yuan warning against it, King Huai of Chu enters Wu Pass and is detained by Qin / 屈原极谏无果，楚怀王赴武关之会为秦所扣留，客死咸阳. Qu Yuan appears as adviser, while the entry’s event is King Huai’s detention; the warning episode needs a direct textual review and a king/episode-specific image is preferable.
- **china-event-zhanguo-015** → `china-batch-03-quyuan`. Bai Qi captures Chu capital Ying as Qu Yuan drowns; Tian Dan restores Qi (279 BCE) / 秦白起拔楚都郢，屈原投江；前279年田单复齐. The entry combines Chu’s defeat, Qu Yuan’s death and Qi’s restoration across different years. The portrait does not resolve the chronology or make those three events a single illustrated scene.
- **china-gao-shi-fengqiu-office** → `china-batch-03-dufu`. Gao Shi at the county desk / 县衙案前的高适. The named figure appears only in a literary comparison or supporting example. The image does not illustrate the main subject or process of this entry.
- **china-person-tangxuanzong** → `china-batch-03-dufu`. Xuanzong: a court of poets and a reign in crisis / 唐玄宗：诗人的宫廷与统治危机. The named figure appears only in a literary comparison or supporting example. The image does not illustrate the main subject or process of this entry.
- **china-gao-shi-fengqiu-office** → `china-batch-03-baijuyi`. Gao Shi at the county desk / 县衙案前的高适. The named figure appears only in a literary comparison or supporting example. The image does not illustrate the main subject or process of this entry.
- **china-landmark-372** → `china-batch-03-baijuyi`. Young magistrate Bai Juyi composes the narrative poem Song of Everlasting Regret west of Chang’an / 盩厔县尉白居易感玄宗贵妃往事，作长诗《长恨歌》传诵京师. The image is Wen Zhengming’s manuscript of Pipa Song, not a portrait of Bai Juyi. This entry concerns a different work, exchange or life episode and does not name the pictured text.
- **china-landmark-211** → `china-batch-03-baijuyi`. Poet Yuan Zhen serves in exile as Marshal of Tong Zhou (Dazhou), exchanging poems with Bai Juyi / 元稹左迁通州（今达州）司马，与江州司马白居易千里寄诗唱和. The image is Wen Zhengming’s manuscript of Pipa Song, not a portrait of Bai Juyi. This entry concerns a different work, exchange or life episode and does not name the pictured text.
- **china-landmark-374** → `china-batch-03-baijuyi`. As Prefect of Hangzhou, Bai Juyi dredges West Lake and builds causeways irrigating vast farmland / 白居易任杭州刺史主持疏浚西湖、修筑石函蓄水灌田千顷. The image is Wen Zhengming’s manuscript of Pipa Song, not a portrait of Bai Juyi. This entry concerns a different work, exchange or life episode and does not name the pictured text.
- **china-landmark-380** → `china-batch-03-baijuyi`. Meeting Bai Juyi in Yangzhou, Liu Yuxi writes “Past the sunken boat a thousand sails speed by” / 刘禹锡扬州席上酬白居易，赋“沉舟侧畔千帆过，病树前头万木春”. The image is Wen Zhengming’s manuscript of Pipa Song, not a portrait of Bai Juyi. This entry concerns a different work, exchange or life episode and does not name the pictured text.
- **china-landmark-375** → `china-batch-03-baijuyi`. Retiring in Luoyang, Bai Juyi takes the name Layman of Xiangshan by Longmen Fragrant Mountain / 白居易晚年定居洛阳履道里，重修龙门香山寺自号“香山居士”. The image is Wen Zhengming’s manuscript of Pipa Song, not a portrait of Bai Juyi. This entry concerns a different work, exchange or life episode and does not name the pictured text.
- **china-song-book-culture** → `china-batch-03-li-qingzhao`. Song books: carving, copying and readers / 宋代书籍：刻印、传抄与读者. The named figure appears only in a literary comparison or supporting example. The image does not illustrate the main subject or process of this entry.
- **china-landmark-392** → `china-batch-03-li-qingzhao`. Crossing south past Wujiang, Li Qingzhao writes “In life be a hero,” chiding the fleeing court / 靖康乱后李清照南渡过乌江，赋“生当作人杰，死亦为鬼雄”. Hold the alleged Wujiang crossing and dating/occasion of the summer quatrain; the saved portrait identity cannot establish that composition story.
- **china-person-guanyu** → `china-rebuild-cao-cao`. Guan Yu · Loyalty and a contested frontier / 关羽 · 忠诚与争夺中的边地. The imaged person is a supporting relative, patron, ally or opponent in another person’s biography. A portrait of the biography’s actual subject would be more faithful; no coverage added from an incidental name.
- **china-person-zhouyu** → `china-rebuild-cao-cao`. Zhou Yu · Coalition command on the Yangzi / 周瑜 · 长江上的联军指挥. The imaged person is a supporting relative, patron, ally or opponent in another person’s biography. A portrait of the biography’s actual subject would be more faithful; no coverage added from an incidental name.
- **china-person-lvbu** → `china-rebuild-cao-cao`. Lü Bu · military talent without a secure coalition / 吕布 · 勇力与不稳固的联盟. The imaged person is a supporting relative, patron, ally or opponent in another person’s biography. A portrait of the biography’s actual subject would be more faithful; no coverage added from an incidental name.
- **china-person-yuanshao** → `china-rebuild-cao-cao`. Yuan Shao · a great family in a fragmented empire / 袁绍 · 分裂帝国中的大族. The imaged person is a supporting relative, patron, ally or opponent in another person’s biography. A portrait of the biography’s actual subject would be more faithful; no coverage added from an incidental name.
- **china-landmark-314** → `china-rebuild-cao-cao`. Cao Cao takes Yanzhou and integrates Yellow Turban veterans into his elite Qingzhou Army / 曹操入主兖州击败青州黄巾百万众，收编精锐三十余万为“青州兵”. Hold the troop wording: Sanguozhi 1 says more than 300,000 surrendered and that selected elite troops became the Qingzhou Army. The Chinese entry turns the whole total into elite recruits.
- **china-event-donghan-023** → `china-rebuild-cao-cao`. Battle of Guandu: Cao Cao unifies northern China / 官渡之战，曹操统一北方. Hold the conclusion that Guandu in 200 immediately unified all northern China. The inspected annals continue to describe major northern campaigns afterward.
- **china-landmark-317** → `china-rebuild-cao-cao`. Returning from crushing the Wuhuan at Mt. Bailang, Cao Cao composes Gazing on the Blue Sea / 曹操北征乌桓斩蹋顿，归途登碣石山赋《观沧海》. The campaign is supported, but this exact composition location and return-journey occasion for Gazing on the Blue Sea were not established by the inspected chapter. Hold rather than infer from Cao Cao’s name.
- **china-landmark-318** → `china-rebuild-cao-cao`. Battle of Tong Pass: Cao Cao crosses the Wei River and sows discord to rout Ma Chao and Han Sui / 潼关之战：曹操渡渭筑冰城，离间大破马超韩遂联军. Hold the ice-fortification detail and combined tactical anecdote until their textual transmission and seasonal setting are reviewed directly.
- **china-landmark-330** → `china-rebuild-cao-cao`. At Ruxukou Sun Quan sails boldly past Wei lines; Cao Cao sighs that sons should be like Sun / 濡须口之战：曹操率大军南攻濡须，孙权乘大船入曹营观军. Hold the Ruxukou boating anecdote and its 217 date. The inspected Cao annals also describe a major Ruxukou campaign in 213; a name match cannot resolve the episode’s chronology.
- **china-landmark-323** → `china-rebuild-cao-cao`. Battle of Mt. Dingjun: Huang Zhong slays Wei general Xiahou Yuan, securing Hanzhong for Liu Bei / 定军山之战：黄忠法正乘高突击阵斩曹魏征西将军夏侯渊，曹操退兵. The entry focuses on another named commander or actor. The available ruler’s portrait would turn a secondary relationship into the illustration’s subject; held for a closer image.
- **china-landmark-458** → `china-rebuild-cao-cao`. Zhao Yun flings wide his camp gates by the Han River in an empty-camp bluff against Cao Cao's host / 汉水之战：赵云救黄忠后大开营门偃旗息鼓，退曹操追兵. The entry focuses on another named commander or actor. The available ruler’s portrait would turn a secondary relationship into the illustration’s subject; held for a closer image.
- **china-person-guanyu** → `china-rebuild-liu-bei`. Guan Yu · Loyalty and a contested frontier / 关羽 · 忠诚与争夺中的边地. The imaged person is a supporting relative, patron, ally or opponent in another person’s biography. A portrait of the biography’s actual subject would be more faithful; no coverage added from an incidental name.
- **china-person-zhouyu** → `china-rebuild-liu-bei`. Zhou Yu · Coalition command on the Yangzi / 周瑜 · 长江上的联军指挥. The imaged person is a supporting relative, patron, ally or opponent in another person’s biography. A portrait of the biography’s actual subject would be more faithful; no coverage added from an incidental name.
- **china-person-luxun** → `china-rebuild-liu-bei`. Lu Xun · Patience, command and coercion / 陆逊 · 等待、指挥与强制. The imaged person is a supporting relative, patron, ally or opponent in another person’s biography. A portrait of the biography’s actual subject would be more faithful; no coverage added from an incidental name.
- **china-person-lvbu** → `china-rebuild-liu-bei`. Lü Bu · military talent without a secure coalition / 吕布 · 勇力与不稳固的联盟. The imaged person is a supporting relative, patron, ally or opponent in another person’s biography. A portrait of the biography’s actual subject would be more faithful; no coverage added from an incidental name.
- **china-person-zhangfei** → `china-rebuild-liu-bei`. Zhang Fei · service, command and harsh discipline / 张飞 · 从军、统率与严酷纪律. The imaged person is a supporting relative, patron, ally or opponent in another person’s biography. A portrait of the biography’s actual subject would be more faithful; no coverage added from an incidental name.
- **china-person-zhaoyun** → `china-rebuild-liu-bei`. Zhao Yun · guarding people, holding a retreat / 赵云 · 护持与有序撤退. The imaged person is a supporting relative, patron, ally or opponent in another person’s biography. A portrait of the biography’s actual subject would be more faithful; no coverage added from an incidental name.
- **china-landmark-455** → `china-rebuild-liu-bei`. Shooting the Halberd at Camp Gate: Lü Bu hits a halberd prong from 150 paces to save Liu Bei / 辕门射戟：吕布百五十步外射中戟支，化解纪灵攻刘备之围. The entry focuses on another named commander or actor. The available ruler’s portrait would turn a secondary relationship into the illustration’s subject; held for a closer image.
- **china-landmark-220** → `china-rebuild-liu-bei`. Cao Cao overtakes Liu Bei at Changban in Dangyang (Jingmen), where Zhao Yun rescues Liu Shan / 曹操精骑追刘备于当阳长坂，赵云单骑救主、张飞据水断桥. The same uncovered record is accepted with Cao Cao’s image and a directly sourced pursuit connection. No second portrait is needed for this source claim; it would add no coverage.
- **china-landmark-321** → `china-rebuild-liu-bei`. At Changban Slope Zhao Yun rescues infant Liu Shan while Zhang Fei holds Changban Bridge alone / 刘备携荆州十余万百姓南撤，当阳长坂被曹纯虎豹骑追及. The entry focuses on another named commander or actor. The available ruler’s portrait would turn a secondary relationship into the illustration’s subject; held for a closer image.
- **china-landmark-206** → `china-rebuild-liu-bei`. Zhang Fei governs Baxi Commandery from Langzhong for seven years and defeats Zhang He / 刘备定益州后拜张飞为巴西太守镇守阆中七年，于宕渠大破张郃. The entry focuses on another named commander or actor. The available ruler’s portrait would turn a secondary relationship into the illustration’s subject; held for a closer image.
- **china-person-zhaoyun** → `china-rebuild-zhuge-liang`. Zhao Yun · guarding people, holding a retreat / 赵云 · 护持与有序撤退. The imaged person is a supporting relative, patron, ally or opponent in another person’s biography. A portrait of the biography’s actual subject would be more faithful; no coverage added from an incidental name.
- **china-person-jiangwei** → `china-rebuild-zhuge-liang`. Jiang Wei · the choices of a frontier commander / 姜维 · 边地将领的抉择. The imaged person is a supporting relative, patron, ally or opponent in another person’s biography. A portrait of the biography’s actual subject would be more faithful; no coverage added from an incidental name.
- **china-landmark-209** → `china-rebuild-zhuge-liang`. Zhuge Liang sails down the Min River to Jiangyang (Luzhou) to assemble his southern expedition / 诸葛亮南征自成都率水师顺江至江阳（今泸州）会师，分兵平南中. Hold the precise Jiangyang naval itinerary and assembly point. The available Zhuge Liang portrait does not establish this particular route.
- **china-person-xuda** → `china-rebuild-hongwu`. Xu Da · conquest and a continuing frontier / 徐达 · 征服与持续的边疆战争. The imaged person is a supporting relative, patron, ally or opponent in another person’s biography. A portrait of the biography’s actual subject would be more faithful; no coverage added from an incidental name.
- **china-landmark-196** → `china-rebuild-hongwu`. At Huizhou, scholar Zhu Sheng counsels Zhu Yuanzhang to build high walls and store grain / 朱元璋克徽州访休宁名儒朱升，获“高筑墙、广积粮、缓称王”国策. The named Hongwu connection is plausible, but the precise adviser recruitment/quotation/chronology has no inspected corroboration in this pass. Keep for targeted source review.
- **china-landmark-190** → `china-rebuild-hongwu`. Zhu Yuanzhang captures Wu Zhou (Jinhua), recruiting Neo-Confucian scholars Song Lian and Wang Yi / 朱元璋亲率大军攻克婺州改宁越府，延揽宋濂、王祎等浙东名儒. The named Hongwu connection is plausible, but the precise adviser recruitment/quotation/chronology has no inspected corroboration in this pass. Keep for targeted source review.
- **china-landmark-192** → `china-rebuild-hongwu`. After capturing Chu Zhou (Lishui), Zhu Yuanzhang invites Liu Bowen of Qingtian to his court / 朱元璋遣使入处州青田山中礼聘刘基（刘伯温）出山辅佐定天下. The named Hongwu connection is plausible, but the precise adviser recruitment/quotation/chronology has no inspected corroboration in this pass. Keep for targeted source review.
- **china-person-guanyu** → `china-rebuild-sun-quan`. Guan Yu · Loyalty and a contested frontier / 关羽 · 忠诚与争夺中的边地. The imaged person is a supporting relative, patron, ally or opponent in another person’s biography. A portrait of the biography’s actual subject would be more faithful; no coverage added from an incidental name.
- **china-person-zhouyu** → `china-rebuild-sun-quan`. Zhou Yu · Coalition command on the Yangzi / 周瑜 · 长江上的联军指挥. The imaged person is a supporting relative, patron, ally or opponent in another person’s biography. A portrait of the biography’s actual subject would be more faithful; no coverage added from an incidental name.
- **china-landmark-330** → `china-rebuild-sun-quan`. At Ruxukou Sun Quan sails boldly past Wei lines; Cao Cao sighs that sons should be like Sun / 濡须口之战：曹操率大军南攻濡须，孙权乘大船入曹营观军. Hold the Ruxukou boating anecdote and its 217 date. The inspected Cao annals also describe a major Ruxukou campaign in 213; a name match cannot resolve the episode’s chronology.
- **china-landmark-039** → `china-rebuild-sun-quan`. Sun Quan moves his capital to Jianye (Nanjing) and proclaims the Eastern Wu Empire / 孙权自武昌迁都建业（今南京），正式称帝建立东吴. Hold the sequence of accession at Wuchang and the later move to Jianye. The donor wording can imply that the imperial proclamation occurred at the new capital; the admitted Sun Quan image does not resolve it.
- **china-landmark-440** → `china-rebuild-sun-quan`. Appointed Chancellor of Eastern Wu in Nanjing, Lu Xun remonstrates over the succession dispute / 陆逊出任东吴丞相辅佐孙权，直言谏阻两宫太子废立之争，次年愤懑卒于建业. The entry focuses on another named commander or actor. The available ruler’s portrait would turn a secondary relationship into the illustration’s subject; held for a closer image.
- **china-landmark-501** → `china-rebuild-yue-fei`. Twenty-year-old Yue Fei enlists in the army from his hometown Tangyin, vowed to loyal service / 二十岁的农家子岳飞自相州汤阴应募从军，母勉以尽忠报国. Hold the specified Yue Fei anecdote, campaign detail or Fengbo Pavilion setting. The portrait is already admitted, but these donor narratives require dedicated historical review before extension.
- **china-landmark-503** → `china-rebuild-yue-fei`. Yue Fei launches a northern counteroffensive from Ezhou, retaking Shangzhou on the Qinling frontier / 岳飞自鄂州孤军北伐连克伊阳商州，愤孤军无援矢志收复河山. Hold the specified Yue Fei anecdote, campaign detail or Fengbo Pavilion setting. The portrait is already admitted, but these donor narratives require dedicated historical review before extension.
- **china-event-nansong-005** → `china-rebuild-yue-fei`. Yue Fei's northern campaign wins victories at Yancheng and Zhuxianzhen / 岳飞北伐，郾城、颍昌大捷，进兵朱仙镇. Hold the specified Yue Fei anecdote, campaign detail or Fengbo Pavilion setting. The portrait is already admitted, but these donor narratives require dedicated historical review before extension.
- **china-landmark-086** → `china-rebuild-yue-fei`. General Yue Fei is executed at Fengbo Pavilion in Lin'an / 绍兴和议达成，岳飞于临安风波亭遇害. Hold the specified Yue Fei anecdote, campaign detail or Fengbo Pavilion setting. The portrait is already admitted, but these donor narratives require dedicated historical review before extension.
- **china-event-xihan-004** → `china-batch-04-hanwendi`. Emperor Wen abolishes corporal punishment and land taxes, ushering in the Rule of Wen and Jing / 汉文帝废除肉刑、免收全国田租，与景帝轻徭薄赋共创“文景之治”. Preserve China04 hold: abolition of corporal punishment is overbroad; the earlier review identified specified mutilating punishments rather than abolition of punishment generally.
- **china-landmark-119** → `china-batch-04-hanwendi`. Xiongnu Chanyu Laoshang breaches Xiaoguan Pass with 140,000 cavalry, alarming Chang’an / 匈奴老上单于率十四万骑破萧关，汉文帝遣三将军屯细柳备胡. The donor combines the 166 BCE Xiaoguan incursion with Xiliu-camp deployments. Shiji 57 dates Zhou Yafu’s Xiliu camp and the imperial visit to Wen’s later-era year 6 (158 BCE). Hold the blended chronology.
- **china-event-xihan-029** → `china-batch-04-liuxiu`. Gengshi Emperor moves his court to Chang’an while Liu Xiu captures Handan and pacifies Hebei / 更始帝刘玄迁都长安；刘秀攻拔邯郸诛王郎，悉平河北诸部. The entry combines Gengshi’s move with a sweeping claim that Liu Xiu pacified all Hebei. Prefer the narrower Handan/Tongma entry accepted separately; no automatic duplicate event expansion.
- **china-event-donghan-001** → `china-batch-04-liuxiu`. Liu Xiu (Emperor Guangwu) proclaims the Eastern Han at Luoyang / 刘秀称帝，定都洛阳. Preserve China04 hold: the English title places Liu Xiu’s coronation at Luoyang. Hou Hanshu 1上 separates accession near Hao and the later tenth-month move to Luoyang.
- **china-landmark-244** → `china-batch-04-liuxiu`. Emperor Guangwu marches to Gaoping (Pingliang), joining Dou Rong's forces against Wei Xiao / 汉光武帝刘秀亲征陇右至高平第一城（今平凉），会窦融兵合围隗嚣. The exact Gaoping location and personal campaign itinerary were not established in the chapter inspected for this pass. Hold this specific geography.
- **china-landmark-424** → `china-batch-04-linzexu`. Imperial Commissioner Lin Zexu destroys over 20,000 chests of opium in lime pits at Humen Beach / 钦差大臣林则徐于广东虎门海滩当众销毁鸦片二百三十七万斤. The exact count and units need reconciliation: the inspected biography reports 19,179 chests plus 2,119 bags destroyed, whereas the English title says over 20,000 chests. Use the narrower Humen entry instead.
- **china-landmark-226** → `china-batch-04-linzexu`. Shaoyang scholar Wei Yuan compiles the Illustrated Treatise on the Maritime Kingdoms / 邵阳人魏源据林则徐《四洲志》编成《海国图志》，倡师夷长技. Wei Yuan and his compilation are the main subject. Lin’s source text is relevant but the portrait of Lin is not the pictured book or Wei Yuan.
- **china-landmark-425** → `china-batch-04-linzexu`. Exiled to Yili after the Opium War, Lin Zexu builds irrigation canals and warns of border threats / 林则徐遭革职“从重发往伊犁效力赎罪”，途经西安赠魏源《四洲志》. The English and Chinese summaries emphasize different episodes: irrigation/frontier warnings versus dismissal and transfer of a text to Wei Yuan. The inspected source supports exile but not this entire blended story.
- **china-landmark-482** → `china-batch-04-linzexu`. Appointed Viceroy of Yun-Gui in Kunming, Lin Zexu pacifies frontier unrest and strengthens defenses / 林则徐任云贵总督平定滇西纷争整顿边防，旋奉诏督师卒于普宁. The donor folds 1847 provincial service and the 1850 final commission/death into one short episode. Hold the precise pacification and border-defence claims for direct source review.
- **china-person-wanganshi** → `china-batch-04-simaguang`. Wang Anshi: turning a diagnosis into policy / 王安石：从诊断问题到制定政策. The imaged person is a supporting relative, patron, ally or opponent in another person’s biography. A portrait of the biography’s actual subject would be more faithful; no coverage added from an incidental name.
- **china-landmark-444** → `china-batch-04-simaguang`. Young Sima Guang smashes a giant water vat with a stone to save a drowning playmate in Shanxi / 少年司马光于庭院击破大瓮救出溺水幼童，“司马光砸缸”机智沉着传为美谈. The boyhood rescue anecdote and its precise 1026/Shanxi setting are not established by the admitted adult image or saved biography. Hold, rather than using the adult portrait as proof of a childhood tale.
- **china-event-beisong-024** → `china-batch-04-simaguang`. Empress Dowager Gao appoints Sima Guang to repeal Wang Anshi’s reforms (Yuanyou Reversal) / 高太后垂帘起用司马光尽废新法（元祐更化），党争激化. Hold the sweeping repeal of all reforms and the 1085/Yuanyou chronology. A portrait of Sima Guang does not resolve these institutional details.
- **china-landmark-382** → `china-batch-04-zhaokuangyin`. Song forces under Cao Bin capture Jinling sparing civilians; Southern Tang ruler Li Yu surrenders / 曹彬奉赵匡胤命克金陵勿伤生灵，南唐后主李煜出降. The entry focuses on another named commander or actor. The available ruler’s portrait would turn a secondary relationship into the illustration’s subject; held for a closer image.
- **china-event-beisong-007** → `china-batch-04-zhaokuangyin`. Candlelight and Axe-Sound Mystery: Emperor Taizu dies suddenly; brother Taizong ascends / 斧声烛影：宋太祖万岁殿夜饮暴崩，晋王赵光义即位. The candlelight/axe-sound account is a contested death narrative, not established by the inspected earlier Taizu annal. Keep the imperial portrait off these unreviewed anecdotal entries.
- **china-landmark-068** → `china-batch-04-zhaokuangyin`. Candlelight and Axe-Sound Mystery at Wansui Hall: Emperor Taizu dies and Taizong ascends / 斧声烛影：宋太祖与晋王赵光义夜饮万岁殿暴崩，宋太宗即位. The candlelight/axe-sound account is a contested death narrative, not established by the inspected earlier Taizu annal. Keep the imperial portrait off these unreviewed anecdotal entries.
- **china-event-nanbei-027** → `china-batch-04-yangjian`. Regent Yang Jian has Wei Xiaokuan crush Yuchi Jiong and razes the old capital of Ye / 杨坚以丞相辅政，韦孝宽平尉迟迥，焚毁邺城. Hold the precise Sui founding/capital-building or administrative bundle. China04 already flagged founding in 581 versus later Daxing construction; no new image link without a source for this exact event.
- **china-event-sui-001** → `china-batch-04-yangjian`. Yang Jian founds the Sui dynasty at Daxing / 杨坚建隋，定都大兴. Hold the precise Sui founding/capital-building or administrative bundle. China04 already flagged founding in 581 versus later Daxing construction; no new image link without a source for this exact event.
- **china-landmark-014** → `china-batch-04-yangjian`. Emperor Wen of Sui commissions Yuwen Kai to build Daxing City (Tang Chang'an) / 隋文帝诏宇文恺于龙首原南营建大兴城（唐长安前身）. Hold the precise Sui founding/capital-building or administrative bundle. China04 already flagged founding in 581 versus later Daxing construction; no new image link without a source for this exact event.
- **china-landmark-344** → `china-batch-04-yangjian`. Emperor Wen of Sui builds Daxing City and codifies the Three Departments and Six Ministries / 隋文帝杨坚命宇文恺营建新都大兴城，确立三省六部制、开皇律. Hold the precise Sui founding/capital-building or administrative bundle. China04 already flagged founding in 581 versus later Daxing construction; no new image link without a source for this exact event.
- **china-event-sui-002** → `china-batch-04-yangjian`. Emperor Wen of Sui abolishes Western Liang at Jiangling and prepares to conquer Chen / 隋文帝废西梁国，江陵并入隋境，大造战船备战伐陈. Hold the precise Sui founding/capital-building or administrative bundle. China04 already flagged founding in 581 versus later Daxing construction; no new image link without a source for this exact event.
- **china-landmark-237** → `china-batch-04-yangjian`. Lady Xian of Gaoliang (Maoming) leads Lingnan into peaceful reunification under the Sui / 岭南高凉冼夫人率百越诸州奉表归隋，隋文帝册封其为谯国夫人. The entry focuses on another named commander or actor. The available ruler’s portrait would turn a secondary relationship into the illustration’s subject; held for a closer image.
- **china-event-sui-005** → `china-batch-04-yangguang`. Emperor Yang builds Luoyang, digs the Tongji Canal, and founds the Jinshi civil exam / 隋炀帝营建东都洛阳、开通济渠；始设进士科创立科举制. Hold the bundled founding-of-examinations claim. Sui shu 3 supports canal and capital work but does not establish the donor’s sweeping claim that the examination system began at this single moment.
- **china-landmark-036** → `china-batch-04-yangguang`. Emperor Yang of Sui builds the Eastern Capital Luoyang and launches the Grand Canal / 隋炀帝营建东都洛阳，以洛阳为中心开凿通济渠与永济渠. Sui shu 3 dates the Tongji project to 605 and the Yongji project to Daye 4 (608). The Chinese summary bundles both under the 605 anchor; hold the combined chronology.
- **china-event-sui-008** → `china-batch-04-yangguang`. Emperor Yang completes the Grand Canal linking Jiangnan and the north / 隋炀帝开凿江南河，大运河贯通南北. The precise 610 Jiangnan Canal completion is not in the inspected Sui annal passage. An emperor-wide connection would be weaker than a direct canal source; defer for that review.
- **china-landmark-083** → `china-batch-04-yangguang`. Sui completes the Jiangnan Canal terminating at Hangzhou / 隋炀帝开江南河自京口达杭州，贯通大运河最南端. The precise 610 Jiangnan Canal completion is not in the inspected Sui annal passage. An emperor-wide connection would be weaker than a direct canal source; defer for that review.
- **china-event-sui-010** → `china-batch-04-yangguang`. Emperor Yang besieged at Yanmen by Turks; Wagang rebels seize Luokou Granary as revolts spread / 隋炀帝雁门被突厥围困；次年瓦岗军克洛口仓群雄并起. Sui shu 4 dates the Yanmen siege to 615 and the Wagang seizure of Xingluo/Luokou granary to Daye 13 (617), not the following year. Hold the incorrect interval.
- **china-landmark-345** → `china-batch-04-yangguang`. Amid nationwide rebellions, mutinous guards under Yuwen Huaji strangle Emperor Yang in Jiangdu / 天下反隋烽烟四起，宇文化及等于扬州江都宫发动兵变缢杀隋炀帝杨广. The inspected Sui annal supports the mutiny and death but does not establish strangling in this passage. Accept the two narrower death entries, not the more detailed unverified version.
- **china-person-yelu-chucai** → `china-batch-04-genghiskhan`. Yelü Chucai: service across the Jin and Mongol courts / 耶律楚材：金与蒙古朝廷之间的仕途. The imaged person is a supporting relative, patron, ally or opponent in another person’s biography. A portrait of the biography’s actual subject would be more faithful; no coverage added from an incidental name.
- **china-landmark-405** → `china-batch-04-genghiskhan`. Battle of Yehuling: Genghis Khan smashes a 400,000-man Jin army north of Zhangjiakou Pass / 野狐岭之战：成吉思汗集中铁骑冲阵，歼灭金军四十万主力. Hold the asserted annihilation of 400,000 Jin soldiers. The currently inspected sources do not establish that figure or the exact tactical account.
- **china-landmark-176** → `china-batch-04-genghiskhan`. Genghis Khan captures the Western Xia fortress of Khara-Khoto on his final campaign / 成吉思汗末次亲征西夏首克黑水城，后元朝于此置亦集乃路. The exact Khara-Khoto sequence or Mount Liupan death location is not established by the sources inspected here. A general Genghis portrait must not settle those specific campaign claims.
- **china-event-nansong-014** → `china-batch-04-genghiskhan`. Genghis Khan dies at Mount Liupan as Mongol forces annihilate Western Xia / 成吉思汗六盘山病逝，蒙古灭西夏. The exact Khara-Khoto sequence or Mount Liupan death location is not established by the sources inspected here. A general Genghis portrait must not settle those specific campaign claims.
- **china-landmark-406** → `china-batch-04-genghiskhan`. Genghis Khan dies at Mount Liupan during his final campaign crushing the Western Xia Kingdom / 成吉思汗东征西夏围困中兴府，盛夏避暑于六盘山病逝. The exact Khara-Khoto sequence or Mount Liupan death location is not established by the sources inspected here. A general Genghis portrait must not settle those specific campaign claims.
- **china-event-nansong-019** → `china-batch-04-kublaikhan`. Kublai establishes the Bureau of Buddhist and Tibetan Affairs (Zongzhiyuan) / 忽必烈设总制院（后改宣政院），统辖吐蕃政教事务. The institution and 1264 date require a direct administrative source. The inspected Yuan chapter supports earlier accession and Dali, not this Bureau claim.
- **china-landmark-061** → `china-batch-04-kublaikhan`. Kublai Khan establishes Dadu (Khanbaliq) as capital of the Yuan Dynasty / 忽必烈营建元大都成，定为元朝国都，积水潭万艘漕船云集. The donor bundles Dadu completion, capital status and vast transport totals. The source set inspected here does not establish those details under the 1272 anchor.
- **china-landmark-408** → `china-batch-04-kublaikhan`. After a six-year siege Kublai Khan uses counterweight trebuchets to breach Fancheng and Xiangyang / 襄阳之战：忽必烈调回回炮攻破坚守六年的襄樊，长江门户洞开. The named ruler is not the field commander of this siege; engine attribution, siege duration and the separate falls of Fancheng and Xiangyang need dedicated review.
- **china-event-yuan-003** → `china-batch-04-kublaikhan`. Kublai suppresses Nayan's revolt in Manchuria; Liaoyang Province established / 忽必烈亲征平定辽东乃颜之乱，设辽阳行省. Hold the campaign and Liaoyang-province bundle until a source directly supports their chronology; the earlier Yuan chapter cannot establish the 1287 event.
- **china-event-ming-034** → `china-batch-04-nurhaci`. Battle of Sarhū: Nurhaci defeats the four Ming expeditionary columns piecemeal / 萨尔浒之战：努尔哈赤各个击破明军四路大军. The inspected biography supports Sarhu but not the assertion that all four expeditionary columns were defeated piecemeal. Hold the exact operational claim rather than expand by ruler name.
- **china-landmark-466** → `china-batch-04-nurhaci`. After Nurhaci falls following the siege of Ningyuan, Hong Taiji succeeds as khan in Shenyang / 努尔哈赤攻宁远受袁崇焕红夷大炮重创病逝. The entry implies a fatal wound from the Ningyuan cannon action. Hummel describes a possible slight wound and death seven months later; the causal chain remains unestablished.
- **china-landmark-505** → `china-batch-04-huangtaiji`. Deceived by Hong Taiji's ruse, the Chongzhen Emperor executes commander Yuan Chonghuan in Beijing / 崇祯帝中皇太极反间计，于北京西市磔杀督师袁崇焕自毁长城. The inspected biography attributes the spy/ruse story to Qing official accounts. The donor states it as settled fact; hold pending narrative review.
- **china-landmark-467** → `china-batch-04-huangtaiji`. Battle of Song-Jin: Hong Taiji crushes the last Ming field armies outside Shanhaiguan Pass / 松锦大战：皇太极围点打援生擒明督师洪承畴与大将祖大寿. The siege and surrender are supported, but the English title’s claim that these were the last Ming field armies is overbroad. Hold the entry rather than validate the superlative with a portrait.
- **china-event-qing-013** → `china-batch-04-yongzheng`. Yongzheng Emperor ascends; tax reform and Southwest gaitu guiliu launched / 康熙帝卒，雍正帝即位，开启摊丁入亩与西南改土归流. The broad accession and southwest reform bundle needs precise fiscal and regional-policy sources. The admitted Yongzheng portrait is not sufficient by itself.
- **china-landmark-468** → `china-batch-04-yongzheng`. Yongzheng Emperor empowers Ortai to replace hereditary chieftains with regular prefectures / 雍正帝重用鄂尔泰于西南大规模推行“改土归流”. The broad accession and southwest reform bundle needs precise fiscal and regional-policy sources. The admitted Yongzheng portrait is not sufficient by itself.
- **china-landmark-507** → `china-batch-04-zuozongtang`. At forty, Zuo Zongtang joins the defense staff at Changsha, successfully holding off Taiping forces / 四十岁的湘阴举人左宗棠出山入幕长沙，运筹死守孤城退太平军. The broad career is supported, but the exact local campaign, coffin story, willow planting, or territorial/diplomatic outcome has not been checked at the entry’s level of detail. Defer instead of extending across every Zuo reference.
- **china-landmark-509** → `china-batch-04-zuozongtang`. Viceroy Zuo Zongtang retakes Hangzhou with the Chu Army and restores Zhejiang dikes and sericulture / 闽浙总督左宗棠率楚军收复杭州平定浙江，兴修水利恢复蚕桑. The broad career is supported, but the exact local campaign, coffin story, willow planting, or territorial/diplomatic outcome has not been checked at the entry’s level of detail. Defer instead of extending across every Zuo reference.
- **china-landmark-510** → `china-batch-04-zuozongtang`. Viceroy Zuo Zongtang captures Jiuquan and plants thousands of li of roadside willows across Gansu / 陕甘总督左宗棠攻克肃州肃清关内，沿驿道绵延千里广植左公柳. The broad career is supported, but the exact local campaign, coffin story, willow planting, or territorial/diplomatic outcome has not been checked at the entry’s level of detail. Defer instead of extending across every Zuo reference.
- **china-event-qing-040** → `china-batch-04-zuozongtang`. Zuo Zongtang reconquers Xinjiang from Yaqub Beg (Xinjiang Province in 1884) / 左宗棠抬棺西征平定阿古柏，收复新疆（1884 年建省）. The broad career is supported, but the exact local campaign, coffin story, willow planting, or territorial/diplomatic outcome has not been checked at the entry’s level of detail. Defer instead of extending across every Zuo reference.
- **china-landmark-429** → `china-batch-04-zuozongtang`. Under Zuo Zongtang's command, Qing forces retake Kashgar, recovering all Xinjiang save Ili / 左宗棠督师南征克复喀什噶尔，天山南北除伊犁外尽数收复. The broad career is supported, but the exact local campaign, coffin story, willow planting, or territorial/diplomatic outcome has not been checked at the entry’s level of detail. Defer instead of extending across every Zuo reference.
- **china-landmark-511** → `china-batch-04-zuozongtang`. Aged sixty-eight, Zuo Zongtang marches with his coffin to Hami, backing diplomatic recovery of Ili / 六十八岁的左宗棠再舁榇进驻哈密备战，助曾纪泽争回伊犁九城. The broad career is supported, but the exact local campaign, coffin story, willow planting, or territorial/diplomatic outcome has not been checked at the entry’s level of detail. Defer instead of extending across every Zuo reference.
- **indonesian-youth-pledge** → `kartini`. The 1928 Youth Pledge: language and political belonging / 1928年青年誓言：语言与政治归属. The named figure appears only in a literary comparison or supporting example. The image does not illustrate the main subject or process of this entry.
- **person-sei-shonagon** → `murasaki-hiroshige`. Sei Shōnagon: observing the Heian court / 清少纳言：观察平安宫廷. The named figure appears only in a literary comparison or supporting example. The image does not illustrate the main subject or process of this entry.
- **philippines-independence-1946** → `atlantic-rebuild-declaration-of-independence`. 1946: the Philippines gains independence from the United States / 1946年：菲律宾脱离美国统治而独立. Different declaration: the Philippines’ 1898 independence claim is not the United States’ 1776 Declaration pictured by the asset. Keyword-only false positive.
- **aksum-ezana-christianity** → `world-batch-03-aksum`. Aksum: royal conversion and Christian coinage / 阿克苏姆：王室改宗与基督教钱币. The surviving stelae are not Ezana’s Christian coinage or evidence of his conversion. Shared city alone would be too broad for this object-specific story.
- **makuria-kingdom** → `world-batch-03-aksum`. Makuria: a Christian kingdom along the middle Nile / 马库里亚：尼罗河中游的基督教王国. The site appears as a neighboring, earlier, later or comparative case, not the entry’s actual setting. Keep the image for the exact place, not regional or chronological filler.
- **ethiopia-early-solomonic** → `world-batch-03-aksum`. Early Solomonic Ethiopia: legitimacy, churches and exchange / 埃塞俄比亚早期所罗门王朝：合法性、教会与交流. The site appears as a neighboring, earlier, later or comparative case, not the entry’s actual setting. Keep the image for the exact place, not regional or chronological filler.
- **vat-phou-sacred-landscape** → `world-batch-03-angkor`. Vat Phou: mountain, water and political geography / 瓦普：山、水与政治地理. The site appears as a neighboring, earlier, later or comparative case, not the entry’s actual setting. Keep the image for the exact place, not regional or chronological filler.
- **person-jayavarman-vii** → `world-batch-03-angkor`. Jayavarman VII: Buddhist patronage and royal representation / 阇耶跋摩七世：佛教资助与王权表象. The asset shows Angkor Wat, whereas this biography concerns Jayavarman VII’s Buddhist patronage. Angkor Wat should not stand in for his specific buildings or imagery.
- **buganda-regional-kingdom** → `world-batch-03-bagan`. Buganda: lake, land and a changing court / 布干达：湖泊、土地与变化中的宫廷. Substring false positive: Baganda is not Bagan. No geographical or historical relation supports this association.
- **buganda-barkcloth-craft** → `world-batch-03-bagan`. Barkcloth: trees, skilled labour and Buganda identity / 树皮布：树木、技艺劳动与布干达认同. Substring false positive: Baganda is not Bagan. No geographical or historical relation supports this association.
- **toungoo-changing-courts** → `world-batch-03-bagan`. Toungoo courts: expansion, reconstruction and changing strategies / 东吁诸朝廷：扩张、重建与策略变化. The site appears as a neighboring, earlier, later or comparative case, not the entry’s actual setting. Keep the image for the exact place, not regional or chronological filler.
- **patan-stepwell-water** → `world-batch-03-dholavira`. Rani-ki-Vav: water, memory and subterranean architecture / 王后阶井：水、纪念与地下建筑. The site appears as a neighboring, earlier, later or comparative case, not the entry’s actual setting. Keep the image for the exact place, not regional or chronological filler.
- **mapungubwe-hill-kingdom** → `world-batch-03-great-zimbabwe`. Mapungubwe: farming, trade and a hilltop court / 马蓬古布韦：农业、贸易与山顶王廷. The site appears as a neighboring, earlier, later or comparative case, not the entry’s actual setting. Keep the image for the exact place, not regional or chronological filler.
- **khami-regional-capital** → `world-batch-03-great-zimbabwe`. Khami: political change after Great Zimbabwe / 卡米：大津巴布韦之后的政治变化. The site appears as a neighboring, earlier, later or comparative case, not the entry’s actual setting. Keep the image for the exact place, not regional or chronological filler.
- **patan-stepwell-water** → `world-batch-03-hampi`. Rani-ki-Vav: water, memory and subterranean architecture / 王后阶井：水、纪念与地下建筑. The site appears as a neighboring, earlier, later or comparative case, not the entry’s actual setting. Keep the image for the exact place, not regional or chronological filler.
- **songo-mnara-households** → `world-batch-03-kilwa`. Songo Mnara: domestic life in a Swahili stone town / 松戈姆纳拉：斯瓦希里石城的家庭生活. The site appears as a neighboring, earlier, later or comparative case, not the entry’s actual setting. Keep the image for the exact place, not regional or chronological filler.
- **lamu-households-learning** → `world-batch-03-kilwa`. Lamu · Houses, neighbourhoods and learning / 拉穆 · 住宅、街坊与学问. The site appears as a neighboring, earlier, later or comparative case, not the entry’s actual setting. Keep the image for the exact place, not regional or chronological filler.
- **ethiopia-early-solomonic** → `world-batch-03-lalibela-rock-hewn-churches`. Early Solomonic Ethiopia: legitimacy, churches and exchange / 埃塞俄比亚早期所罗门王朝：合法性、教会与交流. The site appears as a neighboring, earlier, later or comparative case, not the entry’s actual setting. Keep the image for the exact place, not regional or chronological filler.
- **kush-napatan-phase** → `world-batch-03-meroe-kush`. Napata: Kushite kings between Nubia and Egypt / 纳帕塔：努比亚与埃及之间的库施王权. The site appears as a neighboring, earlier, later or comparative case, not the entry’s actual setting. Keep the image for the exact place, not regional or chronological filler.
- **deccan-buddhist-donor-networks** → `world-batch-03-sanchi`. Deccan Buddhism: donors, monasteries and sacred landscapes / 德干佛教：捐献者、寺院与神圣景观. The site appears as a neighboring, earlier, later or comparative case, not the entry’s actual setting. Keep the image for the exact place, not regional or chronological filler.
- **toltec-tula-state** → `world-batch-03-teotihuacan`. Toltec Tula: a capital and its contested wider reach / 托尔特克图拉：都城与有待讨论的外部影响. The site appears as a neighboring, earlier, later or comparative case, not the entry’s actual setting. Keep the image for the exact place, not regional or chronological filler.
- **fatehpur-sikri-court** → `world-batch-02-met-446161`. Fatehpur Sikri: building an imperial court / 法泰赫普尔西克里：帝国宫廷的营建. The image is an Akbarnama hunting scene, not Fatehpur Sikri’s architecture. Even though Akbar is the founder, a precise city image would communicate this spatial entry better.
- **mughal-translation-workshops** → `world-batch-02-met-446161`. Mughal translation and the making of imperial books / 莫卧儿翻译与皇家书籍的制作. The hunting folio is from the Akbarnama, not one of the translated works discussed here. General court workshop patronage is insufficient for a direct work-specific association.
- **baghdad-foundation** → `world-batch-02-met-447634`. 762: Baghdad becomes an Abbasid capital / 762年：巴格达成为阿拔斯都城. The asset is glass from Samarra, not an object from Baghdad’s 762 foundation. The summary’s comparison does not change the archaeological provenance.

## Validation and limits

`auditHistoryMedia` passed against the current assembled 2,084 records with zero errors. All 37 accepted association titles and summaries exactly match current assembled records. All 36 unique IDs were uncovered in the combined baseline. No association pair is duplicated. Full build, tests and publication are reserved to the integration owner.

This is an editorial association review, not a comprehensive factual audit of every donor sentence. Targeted holds identify the most concrete problems encountered; absence of a hold is not a claim that every military number or later tradition is independently verified. Sources were not repeatedly retried or fetched in parallel. Only the designated research folder and this ledger were written.
