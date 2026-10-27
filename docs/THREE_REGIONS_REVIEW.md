# Gupta India, later Borno and Ayutthaya: map review

26 October 2026. This batch adds **16 dated source instances**: four schematic Gupta/Vakataka cores, one later eligibility window for the earlier Kanem reference, eight Borno phases and three Ayutthaya phases. The prior627 distributed historical source instances remain frozen; the current total is643. Map outlines are selected context, not annual surveys or proof of uniform administration.

## Gupta and Vakataka: illustrated cores, not surveyed frontiers

The licensed Historical Basemaps 400/500 Gupta shapes cover independent Deccan regions, while the300 donor omits Pataliputra. We continue to withhold them as direct empire outlines. Two differently licensed, dated illustrations supply a more useful alternative:

| Source and depicted subject | Atlas display window | Treatment |
| --- | --- | --- |
| Woudloper's [375 CE map](https://commons.wikimedia.org/wiki/File:South_Asia_historical_AD375_EN.svg) |375–449 |Gupta and Vakataka **core** regions, selected separately from the source's much wider conquest/suzerainty lines. |
| Woudloper's [450 CE map](https://commons.wikimedia.org/wiki/File:South_Asia_historical_AD450_EN.svg) |450–479 |Later Gupta and Vakataka core schematics, again excluding the wider campaign/relationship line. |

The source creator cites A. Agrawal, *Rise and Fall of the Imperial Guptas* (1989); H. Kulke and D. Rothermund, *A History of India* (2004); and B. Stein, *A History of India* (2010). Those source descriptions and the maps were inspected, **not the three books themselves**. The [Harvard South Asian chronology](https://timelinesouthasianhistory.hsites.harvard.edu/gupta-v%C4%81k%C4%81%E1%B9%ADaka-age-c-300-%E2%80%93-550-ce) separates the northern Gupta and Deccan Vakataka dynasties and provides approximate ruler tables. [World History Encyclopedia's 375 map description](https://www.worldhistory.org/image/10134/extent-of-the-gupta-empire-375-ce/) describes distinct core, conquests and suzerainty. Neither source establishes exact map vertices. Harvard's Schwartzberg map is separately copyrighted and was not reused.

The illustrator deliberately blurred the edges of the original colored core paths. We preserve that visual idea with a soft, unstroked fill and explicitly label both features as **schematic cores**. Their nearby, separate identities have an explicit palette-separation rule so that a gap between the fuzzy cores does not make them share a shade. The boundaries of the source paths are not evidence of state frontiers. The display windows use earlier selected depictions as partial regional context; they do not assert that the shapes show every change or the whole extent of either state. Early Gupta rule before375 and changing late-fifth/sixth-century geography remain unfilled pending better evidence; ending the map window in479 is not a dynasty-extinction claim.

### Registration and independent checks

The 2014 SVGs are illustrations, not georeferenced GIS files. They are retained unmodified under `references/gupta-map-sources/`, with authorship, checksums and separate CC BY-SA notices. The builder selects source path IDs `path4529` (Gupta core) and `path4541` (Vakataka core), samples the original cubic Bézier curves at at most five source pixels per control-polygon length, applies a single affine approximation, rounds coordinates to four decimals and normalizes ring winding. It does not add a political boundary by hand. The source450 map's basemap is shifted38.21654 pixels east and16.25961 pixels down in the original layer coordinate system; these offsets were checked against three common city markers.

Registration used eight approximate modern city-center equivalents of labeled source markers: Pataliputra/Patna, Prayaga/Allahabad, Mathura, Ayodhya, Ujjain, Valabhi vicinity, Taxila and Purusapura/Peshawar. Five city locations were checked against Natural Earth's 1:10m populated places; the remaining values are approximate geographic controls. Fitted residuals range about4–27 km, and leave-one-out errors about5–54 km. The source's Vidisha marker, excluded from the fit, is roughly **181 km** from the modern Vidisha-area reference after registration. This is an identified source/map placement discrepancy, not a measured border error.

As an independent coarse check, sampled source coastline paths `_x31_0m-coastline.68` and `.69` were compared with the nearest Natural Earth 1:10m coastline vertices in the relevant region (repository `nvkelso/natural-earth-vector`, commit `ca96624a56bd078437bca8184e78163e5039ad19`). Median nearest distances were about21 km and12 km; 90th percentiles about61 km and32 km. This check depends on coastline versions, sampling, nearest-point ambiguity and planar distance approximations. It does not establish a global maximum error, historical sovereignty, or the accuracy of any given political outline. The map detail discloses the Vidisha discrepancy in English and Chinese.

Each licensed source and its derived data remain separate: 375 is **CC BY-SA 3.0**, 450 is **CC BY-SA 4.0**. The source file's hashes, path IDs, original author, source link and transformation notice remain inspectable in the manifest, features and license files. Running `node scripts/build-gupta-schematic.mjs` rebuilds these layers without a runtime or npm dependency.

## Kanem and later Borno

The earlier review correctly rejected the **whole** 1300–1500 donor as a Kanem-wide map because it misses Njimi and includes a faraway coast. This review identifies an actionable part: those donor features contain **two separate polygon components**. Component0 lies on the Gulf of Guinea around 3–4°N and is removed; component1 covers the Lake Chad region and includes the Ngazargamu vicinity. The same explicit component removal applies to the1600 source. Holes and all vertices of the retained source component remain intact. This is a correction to the prior explanation, not a claim that its western component covers the entire earlier Kanem realm.

| Selected outline | Display window | Interpretation |
| --- | --- | --- |
| 1200 Kanem |1300–1379 |Earlier Njimi-centered reference retained for the later Kanem context; it overlaps the separate western Borno reference. The old outline does not resolve their changing frontier. |
| 1300 Borno |1300–1379 |Western Lake Chad region; the Met describes a Borno splinter population in the thirteenth century while Kanem continued. |
| 1400 Borno |1380–1459 |Approximate westward Sayfawa court transition;1380 is an editorial gate for a gradual historical process. |
| 1500 Borno |1460–1599 |Ngazargamu court region from approximately1460. This source omits Njimi, including after its early-sixteenth-century reconquest; it is not the whole empire. |
| 1600 Borno |1600–1699 |Selected Kanem–Borno court sphere; the source includes the Njimi vicinity. |
| 1700 Borno |1700–1807 |Later Ngazargamu-centered regional reference. |
| 1815 Borno |1808–1813;1814–1845 |Crisis and relocation, then the Kukawa court.1808/1809 sources differ on the old capital's siege; Kukawa dates to1814, and Sayfawa titular rulers continued until1846. |
| 1878 Borno |1846–1885 |al-Kanemi court region after the1846 transition; selected donor omits some southern towns. Annual CShapes context resumes in1886. |

Sources inspected: the Met's [Western and Central Sudan1000–1400 Key Events](https://www.metmuseum.org/toah/ht/07/afu), [Lumen Learning's World History account](https://courses.lumenlearning.com/suny-worldhistory/chapter/bornu-empire/) (Bornu, Kanem–Borno and decline sections), the [Nigerian Cultural Heritage site account](https://nigeria.archivingafrica.com/items/show/312), and the [German Archaeological Institute's Lake Chad project overview](https://www.dainst.org/en/research/projects/noslug/5822). The Lumen text incorrectly locates Ngazargamu in present-day Niger; the heritage description places it in Yobe, Nigeria. Its own map marker conflicts with other geographic records and is not used as a coordinate. Witnesses use an approximate Ngazargamu vicinity, not a surveyed site point. These histories also describe the trade in enslaved people; the map does not imply equal or peaceful participation.

## Ayutthaya: occupation and a disputed transition

The older 1400 Ayutthaya source outline is reused as a **Chao Phraya core orientation reference**, explicitly displaying its1400 source year. It is not a reconstruction of the much later military frontier. It was chosen because it contains the historic capital and is smaller than the donor's broad1500 outline, which reaches into other political regions.

| Display window | Label and evidence |
| --- | --- |
|1569–1580 |Ayutthaya under Toungoo overlordship. The [Smithsonian chronology](https://publications.asia.si.edu/publications/seaceramics/time/chronologies.php) dates Toungoo occupation1569–1581; [Ayutthaya Historical Research's Maha Chai account](https://www.ayutthaya-history.com/Historical_Sites_FortMahaChai.html) describes the1569 siege, installation of Maha Thammaracha and vassalage, citing historian David K. Wyatt. We inspected that account, not Wyatt's original book. |
|1581–1583 |**Restoration transition**, because the Smithsonian table gives an independence entry in1581 whereas [Chulalongkorn University's library catalog](https://www.car.chula.ac.th/display7.php?bib=1564484) lists a Siamese proclamation in1584. The catalog is a table of contents for a chronicle edition, not the full chronicle. It also lists a1568 fall date; the Smithsonian table uses1569. |
|1584–1599 |Restoration and warfare context. It does not imply that a proclamation instantly settled all control. The existing later Ayutthaya reference starts in1600. |

The three features retain the original 1400 geometry, source index230, source year and GPL notice. They have one political identity with distinct bilingual phase names and are ineligible at1400 under their later names. Different dates can refer to different events; the atlas does not silently resolve the disagreement.

## Boundaries, verification and remaining gaps

Remaining work includes Gupta before375 and after479; more precise Gupta and Vakataka geography; later Kanem/Borno boundaries through and after the 1893 conquest; more precise 1569–1599 Ayutthaya/Toungoo military geography; other gaps listed in [the previous regional review](REGIONAL_GAPS_REVIEW.md). Missing fill does not imply a lack of people or governance. Britannica was blocked by the browser site-safety policy, and a BlackPast page presented a security verification; neither was bypassed or counted as inspected. Two ArcGIS items had no acknowledged source and no explicit reuse license and were not adopted. Cambridge chapter text was inaccessible; only its bibliographic metadata was visible.

## Rebuilding the additions

After the earlier historical map builders, run `node scripts/build-gupta-schematic.mjs` to reproduce the two retained-source illustrations, then `node scripts/build-three-region-transitions.mjs /path/to/pinned/geojson` for the Kanem/Borno and Ayutthaya references. Each builder replaces only its own layers and checks the immutable input hashes. No application dependency or network service is needed at runtime.
