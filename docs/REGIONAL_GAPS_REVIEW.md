# South Asia, Africa and Southeast Asia: selected historical map gaps

26 October 2026. Application 0.15.0 regional map addition. This review adds **60 source instances across 24 identities**: South Asia20, Africa23, Southeast Asia17. Historical global instances increase from567 to627. The 1,874 narrative entries,174 biographies,552 milestones and60 readings are unchanged. This is a bounded map-source and chronology review, not certification of every political frontier or worldwide completeness.

## Source and editorial method

Outlines come from André Ourednik and contributors’ GPL-3.0 historical-basemaps, immutable commit `da7a4b735ecef70aebdc9c73e409d8a2500d50f3`. The selection is reproducible from **19 pinned raw snapshots** using `scripts/build-regional-gap-context.mjs`; its exact feature indices, original names, bilingual interpretations, windows and evidence keys are in `scripts/regional-gap-selection.json`. Input SHA-256 receipts, source URLs and output shard hashes are in `dist/data/map-snapshots.json`. The new296,280-byte transport shard retains the GPL notice and is under the450KB limit. Source maps were inspected against known regional centers and dated institutional accounts. Institutional narrative sources support the chronology and interpretation; they do not independently validate every donor vertex.

Run the additive builders in order after any V4 reconstruction: regional-continuity, early-regional, then regional-gap-context. Each owns only its file prefix. Re-running this builder replaces its own selection idempotently. All567 previous distributed source instances and their layer descriptors/hashes are frozen in `REGIONAL_GAPS_BASELINE.json` and regression-checked; the two corrections below apply to immutable runtime copies.

A finite `contextValidity` is **editorial eligibility for a dated regional reference**, not a surveyed border for each year or necessarily a state's full lifespan. Source year remains visible even when different from the selected year. Valid explicit intervals now constrain exact source years too: an outline from1000 reused for an independent post1070 phase cannot appear at1000 under its later label. Exact source checkpoints with no interval, or a malformed interval, retain their earlier exact-only behavior. Map-date card counts and ghost previews use the same reviewed selector.

All selected original polygon components, holes and vertices are retained, with four-decimal rounding and D3 spherical winding normalization. Two exceptional, explicit component treatments are documented below: the Sri Lanka component reassignment and the Bagan/Pyu composite. There are no capital circles, modern-border backfills, interpolated frontiers or newly hand-drawn vertices.

## South Asia

| Selected references | Inclusive display eligibility | Interpretation and sequence check |
| --- | --- | --- |
| Satavahana100/200 |100–199;200–224 |Partial eastern/southern Deccan only. Amaravati covered, Paithan omitted. Stop before the selected Ikshvaku rise225; not an exact Satavahana extinction. Reject repetitions300/400. |
| Pallava600/700/800 |600–699;700–799;800–879 |Kanchi-centered phases; conservative stop before late ninth-century Chola expansion. Harvard and the Met differ in the dynasty span. |
| Badami Chalukya600/700 |600–699;700–752 |Early line kept separate from later Kalyani line. |
| Rashtrakuta800/900 |753–899;900–972 |Imperial succession gate753 and973; residual Rashtrakuta rulers outlast the main imperial phase. |
| Kalyani Chalukya1000/1100 |973–1099;1100–1189 |Taila II succession973; stop before circa1190 partition, without denying residual rulers. |
| Pala800/900/1000 |750–899;900–999;1000–1099 |Bengal/Bihar, not Kamarupa's Pala line. Withhold700 premature label and1100 problematic overlapping fragments. Later Pala/Sena coexistence needs another source. |
| Gurjara-Pratihara800/900 |775–899;900–999 |Kanauj geographic witness passes. The1000/1100 donor is displaced eastward and misses Kanauj; rejected. |
| Delhi1300/1500 |1296–1315;1451–1525 |Northern Khalji/Lodi references. Reject1200 before foundation1206 and1400 erroneously covering Hampi after fragmentation. Not all South Asia. |
| Vijayanagara1500 |1450–1564 |Mature southern reference stops before1565 Talikota defeat; successor courts continued. Reject unchanged1600 outline. |
| Independent Polonnaruwa |1070–1199, outline source1000 |Explicit reuse of the source's Sri Lanka component after independence. See correction below. |

Freshly inspected evidence: Harvard's [Satavahana chronology](https://timelinesouthasianhistory.hsites.harvard.edu/south-asia-satavahana-saka-kushan-age-c-1-%E2%80%93-300-ce), [early Chalukyas/Pallavas](https://timelinesouthasianhistory.hsites.harvard.edu/pusyabhuti-and-chalukyan-ascendancy-c-550-%E2%80%93-700-ce), [Pratihara/Pala/Rashtrakuta tables](https://timelinesouthasianhistory.hsites.harvard.edu/gurjara-pratiharas-palas-and-rashtrakutas-c-700-%E2%80%93-975-ce), [later Chalukyas/Cholas](https://timelinesouthasianhistory.hsites.harvard.edu/ghaznavids-cahamanas-later-calukyas-and-colas-c-975-%E2%80%93-1200-ce), [Khaljis](https://timelinesouthasianhistory.hsites.harvard.edu/khaljis-and-tughluqs-c-1290-ce-1390-ce) and [Lodis](https://timelinesouthasianhistory.hsites.harvard.edu/lodis-c-1451-ce-1526-ce); Met [South500–1000](https://www.metmuseum.org/toah/ht/06/sss.html), [North500–1000](https://www.metmuseum.org/toah/ht/06/ssn.html), [South1000–1400](https://www.metmuseum.org/toah/ht/07/sss.html), expanded Key Events; UNESCO [Hampi](https://whc.unesco.org/en/list/241/) and [Polonnaruwa](https://whc.unesco.org/en/list/201/), descriptions/brief syntheses. Harvard's separately copyrighted Schwartzberg map image was neither downloaded nor reused.

### Correction: Chola and Sri Lanka

**Before:** source IDs `1000-chola`, `early-1100-chola`, `early-1200-chola` all contain the whole island, including before full conquest and long after independence. **After:** `dist/regional-chronology.mjs` removes only component0 before circa1017 and from circa1070 onward; the mainland component remains unchanged. The Met's expanded Key Events place full conquest circa1017 and Vijayabahu's expulsion circa1070, followed by the independent Polonnaruwa phase1070–1200. UNESCO distinguishes the destruction of Anuradhapura993 from later Polonnaruwa history. No speculative northern Chola frontier is drawn for993–1016.

For1070–1199, `gaps-1000-polonnaruwa` reassigns only the original licensed island component to an independent island-scale reference. It retains **sourceYear1000**, the original Chola alias/index, component index0 and a visible bilingual explanation. Its outline is not presented as a newly surveyed1070 border. It is ineligible at1000 and retires before the circa1200 fragmentation. This is a supported whole-island context, not proof of uniform local administration.

## Africa

| Selected references | Inclusive display eligibility | Interpretation and sequence check |
| --- | --- | --- |
| Aksum100/200/300 |100–199;200–299;300–399 |Northern Horn/Red Sea reference; joins existing400–699 phase. Does not infer maximal Arabian reach. |
| Wagadu transition1200 |1180–1234 |Culture/regional transition during Soso expansion, not an independent Ghana or single Soso empire. Existing Ghana1100 runtime eligibility ends1179; Mali's existing phase begins1235. |
| Kanem800/1000/1200 |800–999;1000–1199;1200–1299 |Lake Chad/Njimi geographic fit. Reject1300–1500 Kanem-Bornu donor displaced toward Guinea and missing Njimi. No automatic projection across later Bornu court migration. |
| Early Solomonic Ethiopia1300/1400/1500 |1270–1399;1400–1499;1500–1530 |Stop before1531–1543 Adal war. |
| Ethiopia1700/1815/1878 |1636–1768;1769–1854;1855–1885 |Gondarine court, fragmented highland principalities, then renewed imperial consolidation. Not unchanged uniform sovereignty;1868 British expedition was not annexation. |
| Edo Benin1500/1600/1700 |1500–1599;1600–1699;1700–1877 |Distinct from modern Republic of Benin. Donor1878 misses Benin City and remains withheld. |
| Oyo1600/1700/1800 |1600–1699;1700–1799;1800–1829 |Imperial sphere with dependent relationships, stopped conservatively before nineteenth-century disintegration. Reject mislocated1815 donor over Dahomey and late1878 empire. |
| Dahomey1800/1878 |1800–1877;1878–1885 |Abomey-centered reference; acknowledges earlier Oyo dependence, warfare and coerced enslavement. Royal succession through1900 does not establish continuous independence. |
| Great Zimbabwe1300/1400 |1250–1399;1400–1449 |State-center/cultural interaction region, not a proven single frontier. Stop before circa1450 capital abandonment; distinguish later Torwa/Mutapa. Withhold premature1000/1100 empire shapes. |

Evidence: UNESCO [Aksum](https://whc.unesco.org/en/list/15/), [Fasil Ghebbi/Gondar](https://whc.unesco.org/en/list/19/), [Great Zimbabwe](https://whc.unesco.org/en/list/364/), [Abomey](https://whc.unesco.org/en/list/323/), descriptions and selected brief syntheses; Met [African Christianity in Ethiopia](https://www.metmuseum.org/essays/african-christianity-in-ethiopia), [West/Central Sudan1000–1400](https://www.metmuseum.org/toah/ht/07/afu) including Key Events, [Guinea Coast1600–1800](https://www.metmuseum.org/toah/ht/09/afg.html) including Key Events, [1800–1900 overview](https://www.metmuseum.org/toah/ht/10/afg.html), [Benin court art](https://www.metmuseum.org/perspectives/benin-court-art-legacy); German Archaeological Institute [Lake Chad/Kanem-Borno project](https://www.dainst.org/en/research/projects/noslug/5822), English overview; National Army Museum [Abyssinia expedition](https://www.nam.ac.uk/explore/abyssinia), Origins/expedition account. The last is an institutional military narrative; its imperial self-justifications and stereotypes are not adopted.

The Ghana amendment is applied to a cached runtime copy with original end1199 retained in provenance. Met's approximate1180–1230 Soso expansion and circa1230–1235 Mali emergence support a transition gate, not an exact1180 national collapse. Contested traditional accounts of a decisive1076 conquest are not adopted as settled complete collapse. A LoC Timbuktu page was security-blocked and is **not** counted as inspected evidence.

## Southeast Asia

| Selected references | Inclusive display eligibility | Interpretation and sequence check |
| --- | --- | --- |
| Funan500 |400–549 |Lower Mekong trading polities. Transition to Zhenla broadly500–600;550 is an editorial gate, not an exact fall. Late600 donor withheld. |
| Dvaravati600/700/800 |550–699;700–799;800–989 |Mon cultural centers, not one proven sovereign kingdom. Met500–900 and Smithsonian550–990 differ. No1000 independent-state carry-forward. |
| Champa500/600/800/1000 |500–599;600–799;800–999;1000–1189 |Selected separate coastal centers, not continuous uniform independence. |
| Champa1200 |1190–1220 |Explicit Angkorian occupation/recovery. Smithsonian occupation circa1190–1210 differs in scope from EBSCO's independence1220. |
| Champa1300/1500 |1221–1305;1471–1599 |Northern reference stops before1306 O/Ly cession including Hue. Reject1400 donor retaining Hue. After1471 Vijaya's loss, southern Champa continues; not the disappearance of Cham peoples. |
| Bagan900/1000/1200 |950–1043;1044–1199;1200–1286 |Central plain, then imperial phase from Anawrahta1044.1200 composite explicitly combines Bagan and central plain mislabeled Pyu state. Stop before1287 imperial crisis; reject1300/1400 repetitions. |
| Sukhothai1300 |1279–1319 |Claimed regional network, including dependent/contested centers. Stop before circa1320 reduction, not polity extinction. Later1378 suzerainty/1438 annexation need distinct references. |
| Ayutthaya1400/1500 |1351–1499;1500–1568 |Foundation1351; stop before1569 Toungoo occupation. Leave1569–1599 pending reviewed occupation/restoration geography. Existing later references resume1600. |

Evidence: Met [Southeast Asia500–1000](https://www.metmuseum.org/toah/ht/06/sse.html), [1000–1400](https://www.metmuseum.org/toah/ht/07/sse.html), [1400–1600](https://www.metmuseum.org/toah/ht/08/sse.html), expanded Key Events; Smithsonian National Museum of Asian Art [historical chronology tables](https://publications.asia.si.edu/publications/seaceramics/time/chronologies.php), Vietnam/Champa/Cambodia/Thailand/Burma sections; UNESCO [Bagan](https://whc.unesco.org/en/list/1588/) and [Pyu cities](https://whc.unesco.org/en/list/1444/), descriptions and selected brief syntheses; EBSCO/R.C.Lutz2022 [Champa independence](https://www.ebsco.com/research-starters/history/champa-wins-independence-dai-viet/), relevant occupation,1220 recovery and1306 cession paragraphs. EBSCO's broader ethnic characterizations and anecdotal princess narrative are not adopted. A NUS PDF rendered unreadably and is not counted as inspected.

The1200 source's independent “Pyu state” classification conflicts with UNESCO's Pyu city-state phase about200BCE–900CE and Bagan's eleventh–thirteenth-century imperial context. The selected Bagan composite retains all original polygons from source indices218 and31, aliases, vertices, separate components and an explicit bilingual source-correction note. It repairs the donor's omission of Bagan's own central plain; it does not prove an exact uniform imperial frontier.

