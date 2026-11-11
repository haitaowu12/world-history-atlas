# Existing-image connections, pass 03

52 association-only additions; zero new assets. Original baseline: 206 images, 394/2,087 unique records (18.88%). This shard alone raises coverage to 446/2,087 (21.37%), +52 unique records. Recompute against the integration-time catalogue; no union with concurrent workers is claimed.

## Scope and verification

Reviewed assembled record bodies, titles, dates, source lists and provenance. The full selected records and unchanged source-backed image metadata are in `research/v18/existing-links-03/admission-dossier.json`. Image identities, dates and representation limits are inherited from the already-shipped, verified catalogue and its original museum/source receipts; this pass did not re-download images or claim a fresh web-page fetch. `checkedAt` records the association review. Inherited event provenance remains inherited: adding a portrait does not independently verify every anecdote, number, date or political framing in the text.

Original identity evidence: `references/media/china-batch-03.md`, `china-batch-04.md`, `china-batch-05.md`, `china-rebuild-01.md`, `china-rebuild-02.md`, and their research receipt folders. The batch-04 museum QA receipt distinguishes later-added Sima Guang portrait, uncertain Kublai album dating, and replacement sections in the Thirteen Emperors scroll. These qualifications remain intact.

## Files

- Shard: `research/v18/existing-links-03/visual-associations-existing-links-03-v18.json`
- Full body and image evidence: `admission-dossier.json` in that folder
- Counts: `coverage.json`; schema audit: `validation.json`
- Holds: `exclusions.json`; correction leads: `review-flags.json`

No production file, Git state, workflow or deployment modified. The proposed merged catalogue passes `auditHistoryMedia` with 0 errors.

## Admitted links and source ledger

### china-landmark-272
- Record: Sun Bin arrives in Linzi and becomes chief strategist to King Wei of Qi
- Asset: china-batch-05-sunbin; Ming dynasty (1368–1644)
- Source-backed identity: https://commons.wikimedia.org/wiki/File:Sun_Bin.jpg
- Decision and contextual limit: The Ming portrait commemorates Sun Bin, the strategist whose arrival in Qi is the subject of this entry.

### china-event-zhanguo-006
- Record: Battle of Guiling: Sun Bin and Tian Ji besiege Wei to rescue Zhao, defeating Pang Juan
- Asset: china-batch-05-sunbin; Ming dynasty (1368–1644)
- Source-backed identity: https://commons.wikimedia.org/wiki/File:Sun_Bin.jpg
- Decision and contextual limit: Sun Bin is the strategist named in the account of Guiling. This Ming portrait belongs to his later commemoration, rather than the battle.

### china-landmark-274
- Record: Despite Qu Yuan warning against it, King Huai of Chu enters Wu Pass and is detained by Qin
- Asset: china-batch-03-quyuan; Compiled 1607; published 1609
- Source-backed identity: https://commons.wikimedia.org/wiki/File:QuYuan.jpg
- Decision and contextual limit: The 1609 book image identifies Qu Yuan, whose warning to King Huai is central to this account.

### china-landmark-283
- Record: Qin Shi Huang orders the Lingqu Canal dug to link the Xiang and Li rivers and conquer Lingnan
- Asset: qin-shi-huang; 19th century
- Source-backed identity: https://commons.wikimedia.org/wiki/File:Qin_Shi_Huang.jpg
- Decision and contextual limit: This nineteenth-century image represents the emperor who ordered the Lingqu project; it does not show the canal or its construction.

### china-landmark-148
- Record: On his final eastern tour at Langya, Qin Shi Huang sends Xu Fu across the sea for immortals
- Asset: qin-shi-huang; 19th century
- Source-backed identity: https://commons.wikimedia.org/wiki/File:Qin_Shi_Huang.jpg
- Decision and contextual limit: The nineteenth-century portrait represents Qin Shi Huang, whose search for immortality frames the account of Xu Fu’s mission.

### china-landmark-181
- Record: Han Xin endures early hardship in Huaiyin before rising to become Han's supreme commander
- Asset: china-batch-05-hanxin; Historical album; exact date unestablished
- Source-backed identity: https://digitalarchive.npm.gov.tw/Collection/Detail/17997?dep=P
- Decision and contextual limit: The later album names Han Xin beside Xiao He. Here it introduces the general whose early life at Huaiyin the entry recounts.

### china-landmark-294
- Record: Han Xin crosses the Yellow River using wooden jars to outflank and capture King Bao of Wei
- Asset: china-batch-05-hanxin; Historical album; exact date unestablished
- Source-backed identity: https://digitalarchive.npm.gov.tw/Collection/Detail/17997?dep=P
- Decision and contextual limit: Han Xin, named in this later paired portrait with Xiao He, commanded the campaign against Wei described here.

### china-landmark-295
- Record: Battle of the Wei River: Han Xin dams the river with sandbags to defeat Chu general Long Ju
- Asset: china-batch-05-hanxin; Historical album; exact date unestablished
- Source-backed identity: https://digitalarchive.npm.gov.tw/Collection/Detail/17997?dep=P
- Decision and contextual limit: The later album supplies a named image of Han Xin, commander in the Wei River account, rather than a reconstruction of the river battle.

### china-landmark-004
- Record: Xiao He completes Weiyang Palace; Chang'an becomes Western Han capital
- Asset: china-batch-05-hanxin; Historical album; exact date unestablished
- Source-backed identity: https://digitalarchive.npm.gov.tw/Collection/Detail/17997?dep=P
- Decision and contextual limit: Xiao He appears alongside Han Xin in this later album. This entry follows Xiao He’s role in building Weiyang Palace.

### china-event-xihan-029
- Record: Gengshi Emperor moves his court to Chang’an while Liu Xiu captures Handan and pacifies Hebei
- Asset: china-batch-04-liuxiu; Second half of the 7th century, with later replacement; precise section date not established
- Source-backed identity: https://commons.wikimedia.org/wiki/File:Han_Guangwu_Di.jpg
- Decision and contextual limit: The retrospective imperial image identifies Liu Xiu, whose campaign at Handan forms the second part of this entry.

### china-landmark-244
- Record: Emperor Guangwu marches to Gaoping (Pingliang), joining Dou Rong's forces against Wei Xiao
- Asset: china-batch-04-liuxiu; Second half of the 7th century, with later replacement; precise section date not established
- Source-backed identity: https://commons.wikimedia.org/wiki/File:Han_Guangwu_Di.jpg
- Decision and contextual limit: The later Thirteen Emperors image represents Liu Xiu, the ruler leading the Longyou campaign described here.

### china-event-donghan-007
- Record: Ban Chao sent to the Western Regions, reopening the Silk Road
- Asset: china-batch-05-banchao; Ming dynasty (1368–1644)
- Source-backed identity: https://digicol.dpm.org.cn/cultural/detail?id=818afd31fcda41fba17f443971bd5090
- Decision and contextual limit: The Ming standing portrait commemorates Ban Chao, the envoy and commander whose Western Regions mission is the subject here.

### china-landmark-166
- Record: Ban Chao wins the allegiance of King Guangde of Khotan, reopening the southern Silk Road
- Asset: china-batch-05-banchao; Ming dynasty (1368–1644)
- Source-backed identity: https://digicol.dpm.org.cn/cultural/detail?id=818afd31fcda41fba17f443971bd5090
- Decision and contextual limit: This Ming image represents Ban Chao, whose dealings with Khotan’s ruler are recounted here.

### china-landmark-311
- Record: Ban Chao leads 36 men in a daring night raid on Xiongnu envoys, winning Shanshan over to Han
- Asset: china-batch-05-banchao; Ming dynasty (1368–1644)
- Source-backed identity: https://digicol.dpm.org.cn/cultural/detail?id=818afd31fcda41fba17f443971bd5090
- Decision and contextual limit: Ban Chao’s later Ming portrait identifies the leader in the Shanshan episode; the image itself contains no night raid.

### china-landmark-312
- Record: Protector-General Ban Chao subdues Yanqi as fifty Western Regions states submit to Eastern Han
- Asset: china-batch-05-banchao; Ming dynasty (1368–1644)
- Source-backed identity: https://digicol.dpm.org.cn/cultural/detail?id=818afd31fcda41fba17f443971bd5090
- Decision and contextual limit: The Ming portrait recalls Ban Chao, the protector-general at the center of this account of the Yanqi campaign.

### china-landmark-317
- Record: Returning from crushing the Wuhuan at Mt. Bailang, Cao Cao composes Gazing on the Blue Sea
- Asset: china-rebuild-cao-cao; Sancai Tuhui, completed 1607, printed 1609; impression date not established
- Source-backed identity: https://commons.wikimedia.org/wiki/File:Cao_Cao_scth.jpg
- Decision and contextual limit: The Ming book image commemorates Cao Cao, the commander and poet named in the account of the Wuhuan expedition and Gazing on the Blue Sea.

### china-landmark-209
- Record: Zhuge Liang sails down the Min River to Jiangyang (Luzhou) to assemble his southern expedition
- Asset: china-rebuild-zhuge-liang; Ming dynasty, 1368–1644
- Source-backed identity: https://commons.wikimedia.org/wiki/File:%E6%98%8E%E4%BA%BA%E7%BB%98_%E3%80%8A%E8%AF%B8%E8%91%9B%E4%BA%AE%E5%83%8F%E3%80%8B%EF%BC%88%E5%8D%97%E8%96%B0%E6%AE%BF%E6%9C%AC%EF%BC%89.jpg
- Decision and contextual limit: This Ming portrait represents Zhuge Liang, who leads the southern expedition discussed here; it is not a picture of the Jiangyang assembly.

### china-event-nanbei-027
- Record: Regent Yang Jian has Wei Xiaokuan crush Yuchi Jiong and razes the old capital of Ye
- Asset: china-batch-04-yangjian; Second half of the 7th century, with later replacement; precise section date not established
- Source-backed identity: https://commons.wikimedia.org/wiki/File:Sui_Wendi_Tang.jpg
- Decision and contextual limit: The later imperial scroll portrays Yang Jian, the regent named in this account of the suppression of Yuchi Jiong.

### china-landmark-345
- Record: Amid nationwide rebellions, mutinous guards under Yuwen Huaji strangle Emperor Yang in Jiangdu
- Asset: china-batch-04-yangguang; Second half of the 7th century, with later replacement; precise section date not established
- Source-backed identity: https://commons.wikimedia.org/wiki/File:Sui_Yangdi_Tang.jpg
- Decision and contextual limit: The retrospective imperial likeness represents Yang Guang, the ruler killed in the Jiangdu coup described here.

### china-landmark-021
- Record: An Lushan rebels capture Chang’an, sparking the Mawei Mutiny; Guo Ziyi retakes it in 757
- Asset: china-batch-05-guoziyi; Historical album; exact date unestablished
- Source-backed identity: https://digitalarchive.npm.gov.tw/Collection/Detail/17865?dep=P
- Decision and contextual limit: Guo Ziyi, at right in this later album, is the commander named in the entry’s account of recovering Chang’an in 757.

### china-landmark-364
- Record: General Guo Ziyi marches from Shuofang to Lingwu to rally Tang armies around Emperor Suzong
- Asset: china-batch-05-guoziyi; Historical album; exact date unestablished
- Source-backed identity: https://digitalarchive.npm.gov.tw/Collection/Detail/17865?dep=P
- Decision and contextual limit: The right-hand portrait commemorates Guo Ziyi, whose support for Suzong at Lingwu is the subject of this entry.

### china-landmark-366
- Record: Aged nearly seventy, Guo Ziyi rides unarmored alone into the Uyghur camp at Jingyang to win peace
- Asset: china-batch-05-guoziyi; Historical album; exact date unestablished
- Source-backed identity: https://digitalarchive.npm.gov.tw/Collection/Detail/17865?dep=P
- Decision and contextual limit: The later album celebrates Guo Ziyi’s service. It accompanies the account of his negotiation with Uyghur forces, rather than depicting that meeting.

### china-landmark-216
- Record: Governing Yuan Zhou (Yichun), Han Yu frees over 700 bonded servants and promotes schooling
- Asset: china-batch-05-hanyu; After 1330; exact date unestablished
- Source-backed identity: https://digitalarchive.npm.gov.tw/Collection/Detail/17940?dep=P
- Decision and contextual limit: The later portrait of Han Yu introduces the prefect whose actions concerning bonded people and education are discussed here.

### china-landmark-497
- Record: Bi Sheng: reusable clay printing type
- Asset: china-batch-05-shenkuo; Published in a 1919 genealogy; image made by then
- Source-backed identity: https://commons.wikimedia.org/wiki/File:Portrait_of_Shen_Cunzhong.jpg
- Decision and contextual limit: The genealogy’s later image identifies Shen Kuo, the writer whose account preserves the description of Bi Sheng’s movable type.

### china-song-book-culture
- Record: Song books: carving, copying and readers
- Asset: china-batch-05-shenkuo; Published in a 1919 genealogy; image made by then
- Source-backed identity: https://commons.wikimedia.org/wiki/File:Portrait_of_Shen_Cunzhong.jpg
- Decision and contextual limit: This later commemorative portrait identifies Shen Kuo, whose description of Bi Sheng is a specific example of craft knowledge transmitted through books in this story.

### china-event-beisong-024
- Record: Empress Dowager Gao appoints Sima Guang to repeal Wang Anshi’s reforms (Yuanyou Reversal)
- Asset: china-batch-04-simaguang; Song-period document with later-added portrait; portrait date unestablished
- Source-backed identity: https://commons.wikimedia.org/wiki/File:Sima_Guang_1.jpg
- Decision and contextual limit: The portrait added to Sima Guang’s appointment document identifies the minister recalled during the reversal of Wang Anshi’s reforms.

### china-landmark-503
- Record: Yue Fei launches a northern counteroffensive from Ezhou, retaking Shangzhou on the Qinling frontier
- Asset: china-rebuild-yue-fei; Ming dynasty, 1368–1644
- Source-backed identity: https://commons.wikimedia.org/wiki/File:%E6%98%8E%E4%BA%BA%E3%80%8A%E5%B2%B3%E9%A3%9E%E5%83%8F%E3%80%8B%E8%BD%B4.jpg
- Decision and contextual limit: The Ming portrait commemorates Yue Fei, commander of the northern offensive described here, wearing the later painter’s official dress.

### china-landmark-447
- Record: Serving across western Sichuan, Lu You embraces a bold poetic style and takes the name Fangweng
- Asset: china-batch-05-luyou; Qing dynasty (1644–1912)
- Source-backed identity: https://commons.wikimedia.org/wiki/File:%E9%99%B8%E6%B8%B8_%E8%82%96%E5%83%8F.jpg
- Decision and contextual limit: The later traveler-like portrait of Lu You connects with this entry’s account of his official service and poetic life in Sichuan.

### china-event-nansong-019
- Record: Kublai establishes the Bureau of Buddhist and Tibetan Affairs (Zongzhiyuan)
- Asset: china-batch-04-kublaikhan; Yuan imperial portrait album; exact date unestablished
- Source-backed identity: https://commons.wikimedia.org/wiki/File:YuanEmperorAlbumKhubilaiPortrait.jpg
- Decision and contextual limit: The imperial album identifies Kublai, the ruler who established the Zongzhiyuan discussed here. Its precise painting date remains unestablished.

### china-landmark-061
- Record: Kublai Khan establishes Dadu (Khanbaliq) as capital of the Yuan Dynasty
- Asset: china-batch-04-kublaikhan; Yuan imperial portrait album; exact date unestablished
- Source-backed identity: https://commons.wikimedia.org/wiki/File:YuanEmperorAlbumKhubilaiPortrait.jpg
- Decision and contextual limit: Kublai’s imperial album portrait introduces the ruler associated here with building and naming Dadu; it does not depict the city.

### china-event-yuan-003
- Record: Kublai suppresses Nayan's revolt in Manchuria; Liaoyang Province established
- Asset: china-batch-04-kublaikhan; Yuan imperial portrait album; exact date unestablished
- Source-backed identity: https://commons.wikimedia.org/wiki/File:YuanEmperorAlbumKhubilaiPortrait.jpg
- Decision and contextual limit: The album portrait identifies Kublai, who led the campaign against Nayan named in this entry.

### china-landmark-401
- Record: As Yuan armies cross the Yangtze, prefect Wen Tianxiang sells his estate in Ganzhou to raise troops
- Asset: china-batch-05-wentianxiang; 1829
- Source-backed identity: https://open.library.ubc.ca/collections/chineserare/items/1.0371017
- Decision and contextual limit: The 1829 book portrait commemorates Wen Tianxiang, whose recruitment at Ganzhou is the focus of this entry.

### china-landmark-138
- Record: Wen Tianxiang, Zhang Shijie, and Lu Xiufu enthrone Emperor Duanzong at Fuzhou against Yuan
- Asset: china-batch-05-wentianxiang; 1829
- Source-backed identity: https://open.library.ubc.ca/collections/chineserare/items/1.0371017
- Decision and contextual limit: The later portrait identifies Wen Tianxiang, one of the Song ministers named in the account of the court at Fuzhou.

### china-landmark-533
- Record: Detained while parleying in the Yuan camp, Wen Tianxiang escapes under cover of night at Zhenjiang
- Asset: china-batch-05-wentianxiang; 1829
- Source-backed identity: https://open.library.ubc.ca/collections/chineserare/items/1.0371017
- Decision and contextual limit: The 1829 portrait remembers Wen Tianxiang, whose detention and escape at Jingkou the entry recounts.

### china-landmark-402
- Record: Captive crossing Lingdingyang Sea, Wen Tianxiang writes Let my loyal heart shine in history
- Asset: china-batch-05-wentianxiang; 1829
- Source-backed identity: https://open.library.ubc.ca/collections/chineserare/items/1.0371017
- Decision and contextual limit: This 1829 commemorative portrait represents Wen Tianxiang, the captive poet named in the Lingdingyang account.

### china-landmark-130
- Record: After the Tumu Crisis, Yu Qian fortifies Juyong and Zijing passes and repels Oirat forces
- Asset: china-batch-05-yuqian; 17th century
- Source-backed identity: https://commons.wikimedia.org/wiki/File:Yu_Qian_by_Gu_Jianlong.jpg
- Decision and contextual limit: The Qing portrait commemorates Yu Qian, whose defensive preparations after the Tumu crisis are discussed here.

### china-landmark-415
- Record: Defense of Beijing: War Minister Yu Qian enthrones Jingtai and routs Oirat cavalry at Deshengmen
- Asset: china-batch-05-yuqian; 17th century
- Source-backed identity: https://commons.wikimedia.org/wiki/File:Yu_Qian_by_Gu_Jianlong.jpg
- Decision and contextual limit: This later portrait identifies Yu Qian, the war minister central to the account of Beijing’s defense in 1449.

### china-landmark-064
- Record: Wresting the Gate Coup: Emperor Yingzong is restored from the Southern Palace; Yu Qian is slain
- Asset: china-batch-05-yuqian; 17th century
- Source-backed identity: https://commons.wikimedia.org/wiki/File:Yu_Qian_by_Gu_Jianlong.jpg
- Decision and contextual limit: The later portrait commemorates Yu Qian, whose execution forms part of this account of the restoration of Yingzong.

### china-landmark-145
- Record: Emperor Kangxi visits Qufu Temple of Confucius, performing full imperial rites and calligraphy
- Asset: kangxi; 1699
- Source-backed identity: https://commons.wikimedia.org/wiki/File:Kangxi_Emperor.jpg
- Decision and contextual limit: The 1699 reading portrait presents Kangxi as a learned ruler, complementing this entry on his earlier visit and calligraphy at Qufu.

### china-event-qing-008
- Record: Siege of Albazin (Yakesa) against Russian Cossack incursions
- Asset: kangxi; 1699
- Source-backed identity: https://commons.wikimedia.org/wiki/File:Kangxi_Emperor.jpg
- Decision and contextual limit: The 1699 court portrait identifies Kangxi, who ordered the Albazin operations in the entry’s Chinese account; the commanders carried out the siege.

### china-landmark-174
- Record: Emperor Kangxi convenes the Dolon Nor Assembly, integrating the Khalkha Mongols into banners
- Asset: kangxi; 1699
- Source-backed identity: https://commons.wikimedia.org/wiki/File:Kangxi_Emperor.jpg
- Decision and contextual limit: The 1699 portrait identifies Kangxi, the emperor who attended the Dolon Nor assembly discussed here.

### china-landmark-468
- Record: Yongzheng Emperor empowers Ortai to replace hereditary chieftains with regular prefectures
- Asset: china-batch-04-yongzheng; 18th century
- Source-backed identity: https://commons.wikimedia.org/wiki/File:%E9%9B%8D%E6%AD%A3%E6%9C%9D%E6%9C%8D%E5%83%8F%E8%BD%B4.jpg
- Decision and contextual limit: Yongzheng’s court portrait introduces the emperor who empowered Ortai in the administrative changes described here.

### china-event-qing-019
- Record: Qianlong confines Western trade to Canton under the Thirteen Hongs (the Canton System)
- Asset: qianlong; 1736
- Source-backed identity: https://commons.wikimedia.org/wiki/File:%E6%B8%85%E9%AB%98%E5%AE%97%E4%B9%BE%E9%9A%86%E5%B8%9D%E6%9C%9D%E6%9C%8D%E5%83%8F.jpg
- Decision and contextual limit: The 1736 court portrait identifies Qianlong, the emperor whose 1757 restriction of Western shipping to Guangzhou is discussed here.

### china-event-qing-025
- Record: Qianlong abdicates to Jiaqing; White Lotus Rebellion breaks out
- Asset: qianlong; 1736
- Source-backed identity: https://commons.wikimedia.org/wiki/File:%E6%B8%85%E9%AB%98%E5%AE%97%E4%B9%BE%E9%9A%86%E5%B8%9D%E6%9C%9D%E6%9C%8D%E5%83%8F.jpg
- Decision and contextual limit: Painted in 1736 near the start of his reign, this portrait shows Qianlong decades before the abdication discussed here.

### china-event-qing-026
- Record: Following Qianlong's death, the Jiaqing Emperor executes corrupt minister Heshen
- Asset: qianlong; 1736
- Source-backed identity: https://commons.wikimedia.org/wiki/File:%E6%B8%85%E9%AB%98%E5%AE%97%E4%B9%BE%E9%9A%86%E5%B8%9D%E6%9C%9D%E6%9C%8D%E5%83%8F.jpg
- Decision and contextual limit: The 1736 portrait recalls Qianlong, whose death is the transition that opens this account of Jiaqing’s action against Heshen.

### china-landmark-226
- Record: Shaoyang scholar Wei Yuan compiles the Illustrated Treatise on the Maritime Kingdoms
- Asset: china-batch-04-linzexu; 19th century
- Source-backed identity: https://commons.wikimedia.org/wiki/File:Portrait_of_Lin_Zexu.jpeg
- Decision and contextual limit: Lin Zexu appears here as the compiler of Sizhou zhi, named in the Chinese text as a source for Wei Yuan’s work. The portrait is not of Wei Yuan.

### china-landmark-227
- Record: Xiang Yu exiles Emperor Yi of Chu to Chen County (Chenzhou) and orders his assassination
- Asset: china-batch-05-xiangyu; 19th–early 20th century
- Source-backed identity: https://philamuseum.org/collection/object/42784
- Decision and contextual limit: The nineteenth- or early-twentieth-century portrait identifies Xiang Yu, whose removal of Emperor Yi is the focus here.

### china-landmark-289
- Record: Xiang Yu and Liu Bang divide the realm along the Hong Canal before Han launches the final push
- Asset: china-batch-05-xiangyu; 19th–early 20th century
- Source-backed identity: https://philamuseum.org/collection/object/42784
- Decision and contextual limit: The later portrait represents Xiang Yu, one of the two leaders named in the Hong Canal agreement described here.

### china-landmark-202
- Record: Fan Zhongyan initiates construction of the coastal Fan Gong Dike at Yancheng
- Asset: china-batch-05-fanzhongyan; 1609
- Source-backed identity: https://commons.wikimedia.org/wiki/File:Fan_Zhongyan_scth.jpg
- Decision and contextual limit: The 1609 Sancai Tuhui image commemorates Fan Zhongyan, the official associated with the coastal dike work described here.

### china-landmark-384
- Record: Vice Chancellor Fan Zhongyan, joined by Ouyang Xiu, launches the ten-point Qingli New Policies
- Asset: china-batch-05-fanzhongyan; 1609
- Source-backed identity: https://commons.wikimedia.org/wiki/File:Fan_Zhongyan_scth.jpg
- Decision and contextual limit: This Ming book portrait identifies Fan Zhongyan, the reforming official at the center of the Qingli policy proposals discussed here.

### china-landmark-509
- Record: Viceroy Zuo Zongtang retakes Hangzhou with the Chu Army and restores Zhejiang dikes and sericulture
- Asset: china-batch-04-zuozongtang; 1875
- Source-backed identity: https://commons.wikimedia.org/wiki/File:Zuo_Zongtang_1875.jpg
- Decision and contextual limit: The 1875 photograph shows Zuo Zongtang after the 1864 Hangzhou campaign and restoration work discussed here.

### china-landmark-510
- Record: Viceroy Zuo Zongtang captures Jiuquan and plants thousands of li of roadside willows across Gansu
- Asset: china-batch-04-zuozongtang; 1875
- Source-backed identity: https://commons.wikimedia.org/wiki/File:Zuo_Zongtang_1875.jpg
- Decision and contextual limit: Zuo Zongtang’s 1875 photograph identifies the commander associated here with Suzhou in Gansu and roadside planting.

## Exclusions

- **Cross-reference-only names:** Sei Shonagon/Murasaki; Copernicus/Galileo; Indonesian Youth Pledge/Kartini; Gao Shi/Du Fu and Bai Juyi: comparison is not the subject of the narrative.

- **Wrong subject and substring hits:** Martin Luther King Jr. is not Martin Luther; Lilian Ngoyi is not Liliuokalani; Chinese 历史记忆 is not a reference to the Shiji manuscript.

- **Wrong monument and generic locality:** Angkor Wat does not stand for every Angkorian ruler or Vat Phou. Timbuktu mosque does not illustrate specific legal manuscripts. A later Meroe pyramid photograph is not a Napatan-period site view.

- **Different work by same author:** Pipa Song calligraphy is not Song of Everlasting Regret, Bai Juyi’s Hangzhou administration, or his meeting with Liu Yuxi. Ouyang Xiu’s 1072 letter is not Pavilion of the Old Drunkard or the 1043 reform memorial.

- **Other person’s biography:** Did not fill Liu Bang, Guan Yu, Zhou Yu, Zhang Fei, Jiang Wei, Lu Xun, Xu Da or Wang Anshi biographies with portraits of associates or opponents.

- **Reserved for owner corrections:** china-landmark-119,314,036,424,466,505; china-event-donghan-001; china-event-sui-010: no links here.

- **Unreconciled inherited scenes and claims:** Held china-landmark-292 (moonlit pursuit),293 (plank-road stratagem),118 (exact troop total),290 (ten-sided ambush),444 (vat anecdote),446 (Shen Garden meeting),405 (400,000 troops),086 (Fengbo Pavilion),455/458 (heroic scenes). These need source-specific history versus reception treatment.

## Correction leads (not edits or newly source-verified corrections)

- `china-landmark-127`: English calls Han Yu’s Lantian poem a quatrain; the quoted poem 左迁至蓝关示侄孙湘 is an eight-line regulated verse. Hold until corrected; no association supplied.

- `china-landmark-425`: English discusses irrigation and border warnings, Chinese discusses dismissal and giving Sizhou zhi to Wei Yuan en route. Bilingual narrative divergence. Held.

- `china-landmark-482`: 1847 anchor bundles Lin Zexu’s Yunnan-Guizhou appointment with death at Puning, which occurred in 1850. Held.

- `china-event-donghan-023`: Guandu in 200 did not immediately complete Cao Cao’s unification of the north. Held rather than amplify title.

- `china-event-sui-001`: 581 founding and Daxing construction/relocation are combined. Existing batch-04 ledger already flags this; held.

- `china-landmark-039`: Sun Quan’s 229 accession and subsequent move to Jianye need sequencing, not a claim accession occurred in Jianye. Held.

- `china-landmark-443`: 393 anchor assigns famous retirement poetry too early relative to Tao’s 405 withdrawal; requires poem-specific dating. Held.

- `china-landmark-370`: Serving in Pei Du’s staff does not establish that Han Yu personally witnessed Li Su’s night assault at Caizhou. Held.

- `china-event-qing-011 / china-landmark-423`: Distinguish Kangxi’s overall campaign leadership from Fiyanggu’s battlefield command at Jao Modo. Held.

- `china-landmark-509`: Existing provenance flags inherited political framing as unreviewed. Admitted only a verified named-person photograph association; no change to historical-confidence status or adoption of pacification framing.

## Integration decision

Admitted 50 of 52 proposed links. Held `china-event-qing-026` because the deceased Qianlong is a less direct image for Jiaqing's action against Heshen, and `china-landmark-226` pending an image of Wei Yuan or his actual book rather than a contributing source's portrait. Removed the unverified assertion that Yue Fei's clothing follows a particular era's dress rules; shortened repeated scene disclaimers while retaining later-image dates. Final production shard: `dist/data/visual-assets-existing-links-03-v18.json`. The complete proposal dossier, decisions and remaining narrative flags are preserved in `docs/v18-existing-links-03-evidence.json`.
