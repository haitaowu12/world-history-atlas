# World History Atlas v2: new history records and research provenance

Checked: **2026-10-22**. Deliverable: `v2-history-expansion.json`. This file documents the 100 new records, not the original 62-entry dataset, people/routes datasets, or historical territory layer.

## Scope and validation

100 new distinct records add political history, intellectual and religious change, colonization and resistance, revolutions, diplomacy and social movements. The collection is deliberately broader than the initial heritage-site-led selection. The new records use 121 distinct HTTPS institutional, museum, governmental, archival or academic source URLs.

| Region | New records |
|---|---:|
| east-asia | 16 |
| south-asia | 9 |
| west-central-asia | 13 |
| africa | 14 |
| europe | 16 |
| oceania | 8 |
| north-america | 8 |
| latin-america | 8 |
| southeast-asia | 8 |

Kinds: **47 polities, 42 events, 6 ideas, 5 cultures**. Every record has bilingual title, summary and date note; a civil-date interval; representative coordinates; importance from 1–5; and source metadata. English summaries range from **85 to 103 whitespace-separated words**.

`core.mjs` `validateRecords` returned zero errors for the new 100 and for their combination with the original 62 (162 records at validation time). This also checked unique IDs, dates without year zero, required bilingual fields, permitted regions/themes, coordinate ranges and HTTPS source syntax. Supplementary checks found no missing evidence notes/check dates, no invalid importance values and no summary outside the required 80–130-word range. Mechanical checks do not substitute for historical review. See `v2-history-validation.json`.

## Editorial method

Source pages were opened and their relevant chronology and narrative read during research. Search references retained below are retrieval provenance; a few initially discovered canonical pages were revisited in the final audit. Museum collection or publication metadata is used only for the specific chronology it establishes, not as evidence for every social claim. The summaries are original English synthesis paired with original Chinese translations; no source article or photograph is redistributed. Source-specific evidence notes explain the use of supplementary date/location sources.

The dataset uses negative integers for BCE and positive integers for CE. There is no year zero. An interval may mean the conventional lifetime of a dynasty, a documented event, a rounded cultural period, or an editorial focus within a much longer history. The bilingual date note distinguishes these cases. It is not a claim that authority or cultural practice was uniform during the interval. Capital and event pins are representative points, not boundaries, sovereign claims, or proof of control over surrounding land.

Importance is an editorial discovery weight, not a quantitative judgment of a society’s value. The regional taxonomy is a navigation aid: transregional events are assigned a representative location, so a European pin for a world war does not describe its full geography.

## Chronology and source cautions

- **Gupta:** c.321–500 follows the Met chronology for political control in northern India. The card explicitly avoids claiming that all Gupta successors or cultural forms ended in 500.
- **Sui and Tang:** separate chronology/essay sources now support each card, avoiding excessive dependence on one page. The Sui note distinguishes the 581 foundation from completed reunification in 589.
- **Qing, Yuan, Han and Joseon:** dates distinguish rule in China from earlier dynastic naming, the completion of conquest, the Xin interruption, and the change from kingdom to Korean Empire in 1897. Joseon’s 1910 endpoint follows the ruling house through its imperial phase.
- **Kongo:** 1483–1665 is a chosen diplomatic-political window ending with the battle of Mbwila and loss of António I, not the end of every Kongo state, community or royal tradition.
- **Ptolemaic Egypt:** the 305 BCE royal-dynasty beginning is distinguished from Alexander’s 332 BCE conquest and Ptolemy’s governorship after 323. Both Egypt’s antiquities ministry and a detailed Met essay are linked.
- **Parthia:** the Nisa pin was corrected to Old Nisa near Ashgabat, with UNESCO’s location/context page added. It is an early centre, not a fixed imperial capital for every century.
- **Srivijaya and Majapahit:** these are selected approximate/focus intervals. Trowulan’s UNESCO page is a state-submitted Tentative List nomination, not an inscribed World Heritage designation or blanket scholarly endorsement of all territorial claims. No grand territorial extent from that nomination is asserted.
- **Edo and Chola:** the Edo card follows an art-historical 1615–1868 convention rather than dating the shogunate’s establishment to 1615. Chola follows the Met’s approximate 850–1280 convention and differentiates influence from permanent territorial control.
- **Roman Republic, Hellenistic kingdoms and Black Death:** the Republic’s early date is traditional; 31 BCE marks the selected Hellenistic endpoint at Actium; the Black Death entry uses the first major European wave rather than claiming a worldwide universal period.
- **Twentieth-century wars and revolutions:** World War II’s 1939–1945 convention is accompanied by the earlier Asian chronology; 1917 Russian Revolution dates are qualified for calendar differences. Decolonization declarations, transfers of sovereignty and later constitutional arrangements are kept distinct.
- **Australia 1967:** the card explicitly does not claim that the referendum first granted citizenship or voting rights. The National Museum’s companion explanation is included to correct that common misconception.

Government and national-museum histories may emphasize national achievement, state legitimacy, diplomacy or commemorative narratives. The U.S. State Department’s Milestones collection is archived and no longer maintained; it is useful for documented diplomatic chronology but not treated as the only perspective on anticolonial struggles. The Bangladesh museum’s narrative is used for the liberation-war sequence without importing contested aggregate death estimates. The Indonesian source’s broad “350 years” formula and unqualified territorial-transfer language are not repeated. Some source pages contain questionable incidental claims; such claims were excluded when they did not support the carefully scoped record.

The Met’s trans-Saharan essay calls al-Bakri an eyewitness; the new record does not repeat that description. The source on the Salt March contains a questionable anniversary comparison; the record does not repeat it. A Majapahit directory result contained unrelated gambling/spam material and was rejected as a distributed source.

## Remaining coverage limits

This is a substantially expanded introductory atlas, not a complete world history reference. Political events remain more numerous than intellectual, labor, gender and everyday-life histories. The Indigenous Americas before 1500 and Oceania beyond the selected Pacific/Australasian examples need further depth, as do many smaller states and transregional movements. Source selection is institution-heavy and English-heavy, although Chinese presentation is supplied. These are priorities for continued editorial expansion, not implied absences in the history itself.

Web sources can move or be revised. `checkedAt` records the research session date, not a guarantee of permanent availability or a claim that every linked institutional statement is beyond dispute. No historical boundary polygons were derived from these point records.

## Record-to-source map

Each row gives the selected interval and source keys. Full URLs, publishers and exact retrieval references follow in the source index. Detailed date qualifications and evidence notes are preserved in the JSON.

| Record ID | English title | Selected interval | Source keys |
|---|---|---|---|
| `zhou-dynasty` | Zhou: kings, lineages and competing states | 1046 BCE–256 BCE | zhou |
| `qin-unification` | Qin: unification and its human cost | 221 BCE–206 BCE | qin |
| `han-dynasty` | Han: an enduring model of empire | 206 BCE–220 CE | han |
| `sui-reunification` | Sui: reunification before the Tang | 581 CE–618 CE | suichronology |
| `tang-dynasty` | Tang: a cosmopolitan imperial world | 618 CE–907 CE | tang |
| `northern-song` | Northern Song: governing through learning | 960 CE–1127 CE | nsong |
| `southern-song` | Southern Song: a court remade in the south | 1127 CE–1279 CE | ssong |
| `yuan-dynasty` | Yuan: Mongol rule and connected Eurasia | 1271 CE–1368 CE | yuan |
| `ming-dynasty` | Ming: rebuilding court and cultural authority | 1368 CE–1644 CE | ming |
| `qing-dynasty` | Qing: a multiethnic imperial order | 1644 CE–1912 CE | qing, revolution1911 |
| `xinhai-revolution` | 1911–1912: from empire to republic | 1911 CE–1912 CE | revolution1911 |
| `prc-proclamation` | 1949: a new government in Beijing | 1949 CE | prc |
| `goryeo-kingdom` | Goryeo: Buddhism, printing and diplomacy | 918 CE–1392 CE | goryeo |
| `joseon-kingdom` | Joseon: scholars, kings and a new script | 1392 CE–1910 CE | joseon, koreanempire |
| `heian-court` | Heian Japan: writing a courtly world | 794 CE–1185 CE | heian |
| `edo-urban-culture` | Edo Japan: cities under warrior government | 1615 CE–1868 CE | edo |
| `maurya-empire` | Maurya: empire and public inscriptions | 321 BCE–185 BCE | maurya |
| `kushan-networks` | Kushan: a crossroads of religions and trade | 1 CE–300 CE | kushan |
| `gupta-period` | Gupta: courts, temples and classical forms | 321 CE–500 CE | gupta |
| `delhi-sultanate` | Delhi Sultanate: new courts in South Asia | 1206 CE–1526 CE | delhi |
| `mughal-empire` | Mughal: imperial courts and many traditions | 1526 CE–1858 CE | mughal |
| `akkadian-empire` | Akkad: joining city-states by conquest | 2350 BCE–2150 BCE | akkad |
| `old-babylon` | Old Babylon: Hammurabi’s expanding kingdom | 1792 BCE–1595 BCE | babylon |
| `neo-assyria` | Assyria: power displayed in stone | 911 BCE–609 BCE | assyria |
| `hittite-hattusha` | Hittites: a capital on the Anatolian plateau | 1600 BCE–1200 BCE | hittite |
| `parthian-empire` | Parthia: between Rome and Central Asia | 247 BCE–224 CE | parthia, nisalocation |
| `sasanian-empire` | Sasanian Iran: kingship and imperial rivalry | 224 CE–651 CE | sasanian |
| `early-islam` | Early Islam: a community takes shape | 610 CE–632 CE | islam |
| `umayyad-caliphate` | Umayyads: governing from Damascus | 661 CE–750 CE | umayyad |
| `abbasid-caliphate` | Abbasids: Baghdad and a changing caliphate | 750 CE–1258 CE | abbasid |
| `great-seljuqs` | Great Seljuqs: sultans and caliphs | 1040 CE–1157 CE | seljuq |
| `ilkhanid-iran` | Ilkhanids: conquest and artistic exchange | 1256 CE–1353 CE | ilkhanid |
| `timurid-dynasty` | Timurids: empire, rivalry and Persian culture | 1370 CE–1507 CE | timurid |
| `safavid-iran` | Safavid Iran: religion and royal workshops | 1501 CE–1722 CE | safavid |
| `egypt-new-kingdom` | New Kingdom Egypt: empire along the Nile | 1550 BCE–1070 BCE | newkingdom |
| `ptolemaic-egypt` | Ptolemaic Egypt: a Mediterranean kingdom | 305 BCE–30 BCE | ptolemy, ptolemymet |
| `carthaginian-power` | Carthage: a North African maritime power | 600 BCE–146 BCE | carthage |
| `fatimid-caliphate` | Fatimids: a new capital at Cairo | 909 CE–1171 CE | fatimid |
| `mamluk-sultanate` | Mamluks: military households rule from Cairo | 1250 CE–1517 CE | mamluk |
| `ghana-wagadu` | Wagadu / Ghana: wealth across the Sahara | 800 CE–1100 CE | ghana |
| `songhai-empire` | Songhai: power along the Niger bend | 1464 CE–1591 CE | songhai |
| `benin-kingdom` | Benin: court artists and diplomatic power | 1400 CE–1897 CE | benin |
| `kongo-diplomacy` | Kongo: African and Atlantic diplomacy | 1483 CE–1665 CE | kongo, kongo1665 |
| `asante-confederacy` | Asante: gold, authority and a connected court | 1700 CE–1900 CE | asante |
| `adwa-victory` | Adwa: Ethiopia defeats an invading army | 1896 CE | adwa |
| `algerian-independence` | Algeria: a long war for independence | 1954 CE–1962 CE | algeria, algeriawar |
| `congo-independence-crisis` | Congo: independence amid international pressure | 1960 CE–1965 CE | congo |
| `oau-foundation` | 1963: organizing African unity | 1963 CE | oau |
| `roman-republic` | Rome: expansion and the republic’s crisis | 509 BCE–27 BCE | republic |
| `hellenistic-kingdoms` | After Alexander: a world of competing kingdoms | 323 BCE–31 BCE | hellenistic |
| `charlemagne-coronation` | 800: Charlemagne and a new imperial claim | 800 CE | carolingian |
| `magna-carta` | Magna Carta: bargaining over royal power | 1215 CE | magna |
| `black-death` | The Black Death: catastrophe and uneven change | 1347 CE–1353 CE | plague |
| `gutenberg-printing` | Gutenberg’s Bible and European print culture | 1455 CE | printing |
| `reformation-theses` | 1517: the Reformation debate spreads | 1517 CE | reformation |
| `galileo-telescope` | Galileo turns the telescope toward the sky | 1609 CE–1610 CE | galileo, galileolens |
| `french-revolution` | France: revolution, citizenship and war | 1789 CE–1799 CE | french |
| `waterloo` | Waterloo: a coalition defeats Napoleon | 1815 CE | waterloo |
| `first-world-war` | The First World War: an imperial and global conflict | 1914 CE–1918 CE | wwi |
| `russian-revolutions` | 1917: two revolutions in Russia | 1917 CE | russian |
| `second-world-war` | The Second World War: conquest and global resistance | 1939 CE–1945 CE | wwii |
| `holocaust` | The Holocaust: persecution and genocide | 1933 CE–1945 CE | holocaust |
| `berlin-wall-opens` | 1989: the Berlin Wall opens | 1989 CE | berlin |
| `european-integration` | Coal, steel and the beginnings of European integration | 1951 CE–1958 CE | eec |
| `lapita-voyaging` | Lapita voyagers enter Remote Oceania | 1500 BCE–800 BCE | lapita |
| `treaty-waitangi` | Waitangi: an agreement with different meanings | 1840 CE | waitangi |
| `new-zealand-wars` | The New Zealand Wars: land and sovereignty | 1845 CE–1872 CE | nzwars, nzwarsdates |
| `first-fleet-colonization` | 1788: a penal colony on Eora lands | 1788 CE | firstfleet |
| `australian-federation` | 1901: six colonies form the Commonwealth | 1901 CE | federation, referendum |
| `australia-1967-referendum` | 1967: Indigenous campaigning changes the constitution | 1967 CE | referendum, referendumrights |
| `samoa-mau-independence` | Samoa: the Mau and the path to independence | 1926 CE–1962 CE | mau, samoa |
| `tonga-constitution` | 1875: Tonga defines a constitutional kingdom | 1875 CE | tonga, tongatext |
| `poverty-point` | Poverty Point: building without an agricultural state | 1700 BCE–1100 BCE | poverty |
| `pueblo-revolt` | 1680: Pueblo communities expel Spanish rule | 1680 CE | pueblo |
| `haudenosaunee-revolution-era` | Haudenosaunee diplomacy through revolution | 1775 CE–1794 CE | haudwar, haudtreaty |
| `american-revolution` | American independence in an Atlantic war | 1775 CE–1783 CE | usrev |
| `us-constitution` | 1787: designing a federal republic | 1787 CE | usconstitution |
| `us-civil-war` | The U.S. Civil War: union, slavery and emancipation | 1861 CE–1865 CE | uscivil, usciviloverview |
| `canadian-confederation` | 1867: a Canadian federation begins | 1867 CE | canada |
| `us-civil-rights-movement` | Civil rights: organizing against racial exclusion | 1954 CE–1965 CE | civilrights |
| `olmec-centres` | Olmec centres and the movement of precious materials | 1200 BCE–400 BCE | olmec |
| `mexica-triple-alliance` | The Mexica and the Triple Alliance | 1428 CE–1521 CE | mexica |
| `haitian-revolution` | Haiti: enslaved people make a revolution | 1791 CE–1804 CE | haiti |
| `mexican-independence` | Mexico: insurgency, alliance and independence | 1810 CE–1821 CE | mexind |
| `south-american-independence` | South America: campaigns that broke Spanish rule | 1810 CE–1825 CE | southam |
| `brazil-abolition` | 1888: Brazil abolishes slavery | 1888 CE | brazilabol, brazilfreedom |
| `mexican-revolution` | Mexico: revolution over power, land and labor | 1910 CE–1920 CE | mexrev, mexrevend |
| `cuban-revolution-victory` | 1959: Batista falls in Cuba | 1959 CE | cuba |
| `srivijaya-maritime` | Srivijaya: power across maritime connections | 650 CE–1300 CE | srivijaya, seaearly |
| `majapahit-java` | Majapahit: a Javanese court and regional networks | 1293 CE–1500 CE | seamedieval, majapahit, sealate |
| `ayutthaya-kingdom` | Ayutthaya: a kingdom of rivers and diplomacy | 1351 CE–1767 CE | ayutthaya, sealate |
| `ly-dynasty` | The Lý dynasty establishes a capital at Thăng Long | 1009 CE–1225 CE | ly, thanglong |
| `philippine-american-war` | Filipino independence meets a new colonial war | 1899 CE–1902 CE | philippines |
| `indonesian-independence` | Indonesia: proclamation, revolution and diplomacy | 1945 CE–1949 CE | indonesia |
| `dien-bien-phu` | 1954: Điện Biên Phủ and the end of French colonial war | 1954 CE | dienbien |
| `khmer-rouge-cambodia` | Cambodia under the Khmer Rouge | 1975 CE–1979 CE | cambodia |
| `chola-dynasty` | Chola power: temples, kingship and sea routes | 850 CE–1280 CE | chola, choladates, seamedieval |
| `indian-rebellion-1857` | 1857: rebellion against Company rule | 1857 CE–1859 CE | rebellioncause, rebellion |
| `salt-march` | 1930: salt becomes a challenge to empire | 1930 CE | salt, saltstudy |
| `bangladesh-liberation` | 1971: Bangladesh emerges through liberation war | 1971 CE | bangladesh |

## Source index

The retrieval reference is an audit pointer from the research session; the HTTPS URL is the durable citation to distribute. Source summaries in the application are original synthesis, not quotations.

### zhou

- **Title:** Shang and Zhou Dynasties: The Bronze Age of China
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/shang-and-zhou-dynasties-the-bronze-age-of-china
- **Research retrieval:** `turn164view4`
- **Used by:** `zhou-dynasty`

### qin

- **Title:** China, 1000 B.C.–1 A.D.
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/toah/ht/04/eac.html
- **Research retrieval:** `turn164view5`
- **Used by:** `qin-unification`

### han

- **Title:** Han Dynasty (206 B.C.–220 A.D.)
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/han-dynasty-206-b-c-220-a-d
- **Research retrieval:** `turn51view0`
- **Used by:** `han-dynasty`

### suichronology

- **Title:** China, 500–1000 A.D.
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/toah/ht/06/eac.html
- **Research retrieval:** `turn164view6`
- **Used by:** `sui-reunification`

### tang

- **Title:** Tang Dynasty (618–907)
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/tang-dynasty-618-906
- **Research retrieval:** `turn51view6`
- **Used by:** `tang-dynasty`

### nsong

- **Title:** Northern Song Dynasty (960–1127)
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/northern-song-dynasty-960-1127
- **Research retrieval:** `turn52view0`
- **Used by:** `northern-song`

### ssong

- **Title:** Southern Song Dynasty (1127–1279)
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/southern-song-dynasty-1127-1279
- **Research retrieval:** `turn52view1`
- **Used by:** `southern-song`

### yuan

- **Title:** Yuan Dynasty (1271–1368)
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/yuan-dynasty-1271-1368
- **Research retrieval:** `turn52view2`
- **Used by:** `yuan-dynasty`

### ming

- **Title:** Ming Dynasty (1368–1644)
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/ming-dynasty-1368-1644
- **Research retrieval:** `turn52view3`
- **Used by:** `ming-dynasty`

### qing

- **Title:** The Qing Dynasty (1644–1911): Painting
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/the-qing-dynasty-1644-1911-painting
- **Research retrieval:** `turn52view4`
- **Used by:** `qing-dynasty`

### revolution1911

- **Title:** The Chinese Revolution of 1911
- **Publisher:** U.S. Department of State, Office of the Historian
- **URL:** https://history.state.gov/milestones/1899-1913/chinese-rev
- **Research retrieval:** `turn71view3`
- **Used by:** `qing-dynasty`, `xinhai-revolution`

### prc

- **Title:** The Chinese Revolution of 1949
- **Publisher:** U.S. Department of State, Office of the Historian
- **URL:** https://history.state.gov/milestones/1945-1952/chinese-rev
- **Research retrieval:** `turn71view4`
- **Used by:** `prc-proclamation`

### goryeo

- **Title:** Korea, 1000–1400 A.D.
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/toah/ht/07/eak.html
- **Research retrieval:** `turn74view5`
- **Used by:** `goryeo-kingdom`

### joseon

- **Title:** Art of the Korean Renaissance, 1400–1600
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/art-of-the-korean-renaissance-1400-1600
- **Research retrieval:** `turn165view1`
- **Used by:** `joseon-kingdom`

### koreanempire

- **Title:** Korean Empire
- **Publisher:** National Museum of Korea
- **URL:** https://www.museum.go.kr/ENG/contents/E0201040600.do?showHallId=759&showroomCode=DM0041
- **Research retrieval:** `turn167view1`
- **Used by:** `joseon-kingdom`

### heian

- **Title:** Heian Period (794–1185)
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/heian-period-794-1185
- **Research retrieval:** `turn65view6`
- **Used by:** `heian-court`

### edo

- **Title:** Art of the Edo Period (1615–1868)
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/art-of-the-edo-period-1615-1868
- **Research retrieval:** `turn65view7`
- **Used by:** `edo-urban-culture`

### maurya

- **Title:** Mauryan Empire (ca. 323–185 B.C.)
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/mauryan-empire-ca-323-185-b-c
- **Research retrieval:** `turn74view2`
- **Used by:** `maurya-empire`

### kushan

- **Title:** Kushan Empire (ca. Second Century B.C.–Third Century A.D.)
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/kushan-empire-ca-second-century-b-c-third-century-a-d
- **Research retrieval:** `turn74view3`
- **Used by:** `kushan-networks`

### gupta

- **Title:** South Asia, 1–500 A.D.
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/toah/ht/05/ssa.html
- **Research retrieval:** `turn164view2`
- **Used by:** `gupta-period`

### delhi

- **Title:** The Indian Sultanates
- **Publisher:** The David Collection
- **URL:** https://legacy.davidmus.dk/en/collections/islamic/dynasties/sultanates/art
- **Research retrieval:** `turn74view8`
- **Used by:** `delhi-sultanate`

### mughal

- **Title:** The arts of the Mughal Empire
- **Publisher:** Victoria and Albert Museum
- **URL:** https://www.vam.ac.uk/articles/the-arts-of-the-mughal-empire
- **Research retrieval:** `turn74view7`
- **Used by:** `mughal-empire`

### akkad

- **Title:** The Akkadian Period (ca. 2350–2150 B.C.)
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/the-akkadian-period-ca-2350-2150-b-c
- **Research retrieval:** `turn51view7`
- **Used by:** `akkadian-empire`

### babylon

- **Title:** Babylon
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/babylon
- **Research retrieval:** `turn100view0`
- **Used by:** `old-babylon`

### assyria

- **Title:** Assyria, 1365–609 B.C.
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/assyria-1365-609-b-c
- **Research retrieval:** `turn100view1`
- **Used by:** `neo-assyria`

### hittite

- **Title:** Hattusha: the Hittite Capital
- **Publisher:** UNESCO World Heritage Centre
- **URL:** https://whc.unesco.org/en/list/377/
- **Research retrieval:** `turn101view3`
- **Used by:** `hittite-hattusha`

### parthia

- **Title:** The Parthian Empire (247 B.C.–224 A.D.)
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/the-parthian-empire-247-b-c-224-a-d
- **Research retrieval:** `turn101view0`
- **Used by:** `parthian-empire`

### nisalocation

- **Title:** Parthian Fortresses of Nisa
- **Publisher:** UNESCO World Heritage Centre
- **URL:** https://whc.unesco.org/en/list/1242/
- **Research retrieval:** `turn164view7`
- **Used by:** `parthian-empire`

### sasanian

- **Title:** The Sasanian Empire (224–651 A.D.)
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/the-sasanian-empire-224-651-a-d
- **Research retrieval:** `turn100view2`
- **Used by:** `sasanian-empire`

### islam

- **Title:** The Birth of Islam
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/the-birth-of-islam
- **Research retrieval:** `turn101view1`
- **Used by:** `early-islam`

### umayyad

- **Title:** The Art of the Umayyad Period (661–750)
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/the-art-of-the-umayyad-period-661-750
- **Research retrieval:** `turn54view0`
- **Used by:** `umayyad-caliphate`

### abbasid

- **Title:** The Art of the Abbasid Period (750–1258)
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/the-art-of-the-abbasid-period-750-1258
- **Research retrieval:** `turn54view1`
- **Used by:** `abbasid-caliphate`

### seljuq

- **Title:** The Art of the Seljuqs of Iran (ca. 1040–1157)
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/the-art-of-the-seljuqs-of-iran-ca-1040-1196
- **Research retrieval:** `turn100view7`
- **Used by:** `great-seljuqs`

### ilkhanid

- **Title:** The Art of the Ilkhanid Period (1256–1353)
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/the-art-of-the-ilkhanid-period-1256-1353
- **Research retrieval:** `turn101view2`
- **Used by:** `ilkhanid-iran`

### timurid

- **Title:** The Art of the Timurid Period (ca. 1370–1507)
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/the-art-of-the-timurid-period-ca-1370-1507
- **Research retrieval:** `turn100view4`
- **Used by:** `timurid-dynasty`

### safavid

- **Title:** The Art of the Safavids before 1600
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/the-art-of-the-safavids-before-1600
- **Research retrieval:** `turn100view3`
- **Used by:** `safavid-iran`

### newkingdom

- **Title:** Egypt in the New Kingdom (ca. 1550–1070 B.C.)
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/egypt-in-the-new-kingdom-ca-1550-1070-b-c
- **Research retrieval:** `turn100view6`
- **Used by:** `egypt-new-kingdom`

### ptolemy

- **Title:** Ptolemaic Period
- **Publisher:** Egyptian Ministry of Tourism and Antiquities
- **URL:** https://egymonuments.gov.eg/historical-periods/ptolemaic-period/
- **Research retrieval:** `turn164view0`
- **Used by:** `ptolemaic-egypt`

### ptolemymet

- **Title:** Egypt in the Ptolemaic Period
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/egypt-in-the-ptolemaic-period
- **Research retrieval:** `turn169view0`
- **Used by:** `ptolemaic-egypt`

### carthage

- **Title:** Archaeological Site of Carthage
- **Publisher:** UNESCO World Heritage Centre
- **URL:** https://whc.unesco.org/en/list/37/
- **Research retrieval:** `turn101view4`
- **Used by:** `carthaginian-power`

### fatimid

- **Title:** The Art of the Fatimid Period (909–1171)
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/the-art-of-the-fatimid-period-909-1171
- **Research retrieval:** `turn54view5`
- **Used by:** `fatimid-caliphate`

### mamluk

- **Title:** The Art of the Mamluk Period (1250–1517)
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/the-art-of-the-mamluk-period-1250-1517
- **Research retrieval:** `turn100view5`
- **Used by:** `mamluk-sultanate`

### ghana

- **Title:** The Trans-Saharan Gold Trade (7th–14th Century)
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/the-trans-saharan-gold-trade-7th-14th-century
- **Research retrieval:** `turn99view2`
- **Used by:** `ghana-wagadu`

### songhai

- **Title:** Sahel: Art and Empires on the Shores of the Sahara
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/exhibitions/sahel-art-empire-sahara/inside-the-exhibition
- **Research retrieval:** `turn101view6`
- **Used by:** `songhai-empire`

### benin

- **Title:** The Legacy of Benin Court Art: From Tragedy to Resilience
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/perspectives/benin-court-art-legacy
- **Research retrieval:** `turn101view5`
- **Used by:** `benin-kingdom`

### kongo

- **Title:** Kongo: Power and Majesty — Exhibition Galleries
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/exhibitions/listings/2015/kongo/exhibition-galleries
- **Research retrieval:** `turn164view1`
- **Used by:** `kongo-diplomacy`

### kongo1665

- **Title:** Central Africa, 1600–1800 A.D.
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/toah/ht/09/afc.html
- **Research retrieval:** `turn167view0`
- **Used by:** `kongo-diplomacy`

### asante

- **Title:** Art of the Asante Kingdom
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/art-of-the-asante-kingdom
- **Research retrieval:** `turn99view4`
- **Used by:** `asante-confederacy`

### adwa

- **Title:** Ethiopia: three millennia of legend and history
- **Publisher:** UNESCO Courier
- **URL:** https://courier.unesco.org/en/articles/ethiopia-three-millennia-legend-and-history
- **Research retrieval:** `turn102search31`
- **Used by:** `adwa-victory`

### algeria

- **Title:** Algeria — Countries
- **Publisher:** U.S. Department of State, Office of the Historian
- **URL:** https://history.state.gov/countries/algeria/recognition
- **Research retrieval:** `turn102search12`
- **Used by:** `algerian-independence`

### algeriawar

- **Title:** Foreign Relations of the United States, 1969–1976, Volume E–5, Part 2, Document 27
- **Publisher:** U.S. Department of State, Office of the Historian
- **URL:** https://history.state.gov/historicaldocuments/frus1969-76ve05p2/d27
- **Research retrieval:** `turn102search15`
- **Used by:** `algerian-independence`

### congo

- **Title:** The Congo, Decolonization, and the Cold War, 1960–1965
- **Publisher:** U.S. Department of State, Office of the Historian
- **URL:** https://history.state.gov/milestones/1961-1968/congo-decolonization
- **Research retrieval:** `turn71view6`
- **Used by:** `congo-independence-crisis`

### oau

- **Title:** The Pan-Africanist Movement and the road to liberation
- **Publisher:** African Union
- **URL:** https://oau60.au.int/en/pan-africanist-movement-and-road-liberation
- **Research retrieval:** `turn102search3`
- **Used by:** `oau-foundation`

### republic

- **Title:** The Roman Republic
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/the-roman-republic
- **Research retrieval:** `turn125view1`
- **Used by:** `roman-republic`

### hellenistic

- **Title:** Art of the Hellenistic Age and the Hellenistic Tradition
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/art-of-the-hellenistic-age-and-the-hellenistic-tradition
- **Research retrieval:** `turn125view2`
- **Used by:** `hellenistic-kingdoms`

### carolingian

- **Title:** Carolingian Art
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/carolingian-art
- **Research retrieval:** `turn112view8`
- **Used by:** `charlemagne-coronation`

### magna

- **Title:** Magna Carta: Enduring Legacy
- **Publisher:** U.S. National Archives
- **URL:** https://www.archives.gov/exhibits/featured-documents/magna-carta/legacy.html
- **Research retrieval:** `turn113view2`
- **Used by:** `magna-carta`

### plague

- **Title:** More continuity than change following the Black Death epidemic in medieval Cambridge
- **Publisher:** Scientific Reports / University of Cambridge researchers
- **URL:** https://www.nature.com/articles/s41598-025-18437-5
- **Research retrieval:** `turn113view1`
- **Used by:** `black-death`

### printing

- **Title:** The Gutenberg Bible
- **Publisher:** Library of Congress
- **URL:** https://www.loc.gov/exhibits/bibles/the-gutenberg-bible.html
- **Research retrieval:** `turn121view0`
- **Used by:** `gutenberg-printing`

### reformation

- **Title:** The Reformation
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/the-reformation
- **Research retrieval:** `turn109view9`
- **Used by:** `reformation-theses`

### galileo

- **Title:** Telescope
- **Publisher:** Museo Galileo
- **URL:** https://catalogue.museogalileo.it/multimedia/TelescopeBis.html
- **Research retrieval:** `turn112view5`
- **Used by:** `galileo-telescope`

### galileolens

- **Title:** Galileo’s objective lens
- **Publisher:** Museo Galileo
- **URL:** https://catalogue.museogalileo.it/object/GalileosObjectiveLens.html
- **Research retrieval:** `turn111search13`
- **Used by:** `galileo-telescope`

### french

- **Title:** The United States and the French Revolution, 1789–1799
- **Publisher:** U.S. Department of State, Office of the Historian
- **URL:** https://history.state.gov/milestones/1784-1800/french-rev
- **Research retrieval:** `turn113view5`
- **Used by:** `french-revolution`

### waterloo

- **Title:** The Battle of Waterloo
- **Publisher:** National Army Museum
- **URL:** https://www.nam.ac.uk/explore/battle-waterloo
- **Research retrieval:** `turn112view6`
- **Used by:** `waterloo`

### wwi

- **Title:** First World War
- **Publisher:** National Army Museum
- **URL:** https://www.nam.ac.uk/explore/first-world-war
- **Research retrieval:** `turn112view0`
- **Used by:** `first-world-war`

### russian

- **Title:** The Russian Revolution (1917)
- **Publisher:** United States Holocaust Memorial Museum
- **URL:** https://encyclopedia.ushmm.org/content/en/article/the-russian-revolution-1917
- **Research retrieval:** `turn112view2`
- **Used by:** `russian-revolutions`

### wwii

- **Title:** World War II: In Depth
- **Publisher:** United States Holocaust Memorial Museum
- **URL:** https://encyclopedia.ushmm.org/content/en/article/world-war-ii-in-depth
- **Research retrieval:** `turn121view1`
- **Used by:** `second-world-war`

### holocaust

- **Title:** Introduction to the Holocaust
- **Publisher:** United States Holocaust Memorial Museum
- **URL:** https://encyclopedia.ushmm.org/content/en/article/introduction-to-the-holocaust
- **Research retrieval:** `turn109view5`
- **Used by:** `holocaust`

### berlin

- **Title:** The Fall of Communism in Eastern Europe, 1989
- **Publisher:** U.S. Department of State, Office of the Historian
- **URL:** https://history.state.gov/milestones/1989-1992/fall-of-communism
- **Research retrieval:** `turn109view7`
- **Used by:** `berlin-wall-opens`

### eec

- **Title:** History of the European Union 1945–59
- **Publisher:** European Union
- **URL:** https://european-union.europa.eu/principles-countries-history/history-eu/1945-59_en
- **Research retrieval:** `turn109view8`
- **Used by:** `european-integration`

### lapita

- **Title:** Into Remote Oceania: Lapita people
- **Publisher:** Te Ara Encyclopedia of New Zealand / Manatū Taonga
- **URL:** https://teara.govt.nz/en/pacific-migrations/page-3
- **Research retrieval:** `turn136view6`
- **Used by:** `lapita-voyaging`

### waitangi

- **Title:** The Treaty in brief
- **Publisher:** Manatū Taonga — Ministry for Culture and Heritage
- **URL:** https://nzhistory.govt.nz/politics/treaty/the-treaty-in-brief
- **Research retrieval:** `turn136view3`
- **Used by:** `treaty-waitangi`

### nzwars

- **Title:** New Zealand’s 19th-century wars
- **Publisher:** Manatū Taonga — Ministry for Culture and Heritage
- **URL:** https://nzhistory.govt.nz/war/new-zealands-19th-century-wars/introduction
- **Research retrieval:** `turn136view4`
- **Used by:** `new-zealand-wars`

### nzwarsdates

- **Title:** New Zealand Wars timeline
- **Publisher:** Manatū Taonga — Ministry for Culture and Heritage
- **URL:** https://nzhistory.govt.nz/war/new-zealands-19th-century-wars/nzwars-timeline
- **Research retrieval:** `turn138view3`
- **Used by:** `new-zealand-wars`

### firstfleet

- **Title:** The First Fleet arrives at Sydney Cove
- **Publisher:** National Museum of Australia
- **URL:** https://digital-classroom.nma.gov.au/defining-moments/first-fleet-arrives-sydney-cove
- **Research retrieval:** `turn138view0`
- **Used by:** `first-fleet-colonization`

### federation

- **Title:** Federation
- **Publisher:** National Museum of Australia
- **URL:** https://www.nma.gov.au/defining-moments/resources/federation
- **Research retrieval:** `turn136view1`
- **Used by:** `australian-federation`

### referendum

- **Title:** Indigenous referendum
- **Publisher:** National Museum of Australia
- **URL:** https://www.nma.gov.au/defining-moments/resources/indigenous-referendum
- **Research retrieval:** `turn138view1`
- **Used by:** `australian-federation`, `australia-1967-referendum`

### referendumrights

- **Title:** 1967 Indigenous referendum: rights and freedoms
- **Publisher:** National Museum of Australia
- **URL:** https://digital-classroom.nma.gov.au/learning-modules/rights-and-freedoms-defining-moments-1945-present/110-1967-indigenous-referendum
- **Research retrieval:** `turn140view2`
- **Used by:** `australia-1967-referendum`

### mau

- **Title:** The rise of the Mau movement
- **Publisher:** Manatū Taonga — Ministry for Culture and Heritage
- **URL:** https://nzhistory.govt.nz/politics/samoa/rise-of-mau
- **Research retrieval:** `turn136view7`
- **Used by:** `samoa-mau-independence`

### samoa

- **Title:** Towards independence
- **Publisher:** Manatū Taonga — Ministry for Culture and Heritage
- **URL:** https://nzhistory.govt.nz/page/towards-independence
- **Research retrieval:** `turn136view5`
- **Used by:** `samoa-mau-independence`

### tonga

- **Title:** History of the Tongan Parliament
- **Publisher:** Legislative Assembly of Tonga
- **URL:** https://parliament.gov.to/en/about-parliament/history
- **Research retrieval:** `turn140view0`
- **Used by:** `tonga-constitution`

### tongatext

- **Title:** Tonga 1875 Constitution, revised 2013
- **Publisher:** Constitute / Comparative Constitutions Project
- **URL:** https://www.constituteproject.org/constitution/Tonga_2013?lang=en
- **Research retrieval:** `turn140view1`
- **Used by:** `tonga-constitution`

### poverty

- **Title:** Monumental Earthworks of Poverty Point: World Heritage Site
- **Publisher:** U.S. National Park Service
- **URL:** https://www.nps.gov/articles/000/monumental-earthworks-of-poverty-point-world-heritage-site.htm
- **Research retrieval:** `turn143view0`
- **Used by:** `poverty-point`

### pueblo

- **Title:** Spanish Encounters: Pecos National Historical Park
- **Publisher:** U.S. National Park Service
- **URL:** https://www.nps.gov/peco/learn/historyculture/spanish-encounters.htm
- **Research retrieval:** `turn143view6`
- **Used by:** `pueblo-revolt`

### haudwar

- **Title:** American Revolution: Haudenosaunee Perseverance, Chapter 2
- **Publisher:** Smithsonian National Museum of the American Indian
- **URL:** https://americanindian.si.edu/nk360/american-revolution-perseverance/students/chapter-2/
- **Research retrieval:** `turn144view2`
- **Used by:** `haudenosaunee-revolution-era`

### haudtreaty

- **Title:** American Revolution: Haudenosaunee Perseverance, Chapter 5
- **Publisher:** Smithsonian National Museum of the American Indian
- **URL:** https://americanindian.si.edu/nk360/american-revolution-perseverance/students/chapter-5/
- **Research retrieval:** `turn144view1`
- **Used by:** `haudenosaunee-revolution-era`

### usrev

- **Title:** Treaty of Paris (1783)
- **Publisher:** U.S. National Archives
- **URL:** https://www.archives.gov/milestone-documents/treaty-of-paris
- **Research retrieval:** `turn143view3`
- **Used by:** `american-revolution`

### usconstitution

- **Title:** The Constitution of the United States: A Transcription
- **Publisher:** U.S. National Archives
- **URL:** https://www.archives.gov/founding-docs/constitution-transcript
- **Research retrieval:** `turn143view5`
- **Used by:** `us-constitution`

### uscivil

- **Title:** Slavery as a Cause of the Civil War
- **Publisher:** U.S. National Park Service
- **URL:** https://www.nps.gov/liho/learn/historyculture/slavery-cause-civil-war.htm
- **Research retrieval:** `turn143view1`
- **Used by:** `us-civil-war`

### usciviloverview

- **Title:** The Civil War: Overview
- **Publisher:** U.S. National Park Service
- **URL:** https://www.nps.gov/civilwar/overview.htm
- **Research retrieval:** `turn144view0`
- **Used by:** `us-civil-war`

### canada

- **Title:** Provinces and territories: the Canadian federation
- **Publisher:** Government of Canada
- **URL:** https://www.canada.ca/en/intergovernmental-affairs/services/provinces-territories.html
- **Research retrieval:** `turn142view3`
- **Used by:** `canadian-confederation`

### civilrights

- **Title:** The Civil Rights Era
- **Publisher:** Library of Congress
- **URL:** https://www.loc.gov/exhibits/african-american-odyssey/civil-rights-era.html
- **Research retrieval:** `turn143view2`
- **Used by:** `us-civil-rights-movement`

### olmec

- **Title:** Olmec Art
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/essays/olmec-art
- **Research retrieval:** `turn150view5`
- **Used by:** `olmec-centres`

### mexica

- **Title:** Golden Kingdoms: exhibition galleries, the Aztec Empire
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/exhibitions/listings/2018/golden-kingdoms/exhibition-galleries
- **Research retrieval:** `turn150view6`
- **Used by:** `mexica-triple-alliance`

### haiti

- **Title:** The United States and the Haitian Revolution, 1791–1804
- **Publisher:** U.S. Department of State, Office of the Historian
- **URL:** https://history.state.gov/milestones/1784-1800/haitian-rev
- **Research retrieval:** `turn153view0`
- **Used by:** `haitian-revolution`

### mexind

- **Title:** Independence from Spain to President Porfirio Díaz
- **Publisher:** Library of Congress
- **URL:** https://www.loc.gov/exhibits/mexican-revolution-and-the-united-states/independence-from-spain.html
- **Research retrieval:** `turn151view4`
- **Used by:** `mexican-independence`

### southam

- **Title:** Spanish South America: independence movements
- **Publisher:** OpenStax, Rice University
- **URL:** https://openstax.org/books/world-history-volume-2/pages/8-3-spanish-south-america
- **Research retrieval:** `turn151view5`
- **Used by:** `south-american-independence`

### brazilabol

- **Title:** Lei Áurea faz parte do acervo do Arquivo Nacional
- **Publisher:** Arquivo Nacional, Brazil
- **URL:** https://www.gov.br/arquivonacional/pt-br/canais_atendimento/imprensa/noticias/lei-aurea-faz-parte-do-acervo-do-arquivo-nacional
- **Research retrieval:** `turn151view2`
- **Used by:** `brazil-abolition`

### brazilfreedom

- **Title:** Escravizados e a conquista da liberdade na Justiça do Império
- **Publisher:** Arquivo Nacional, Brazil
- **URL:** https://www.gov.br/arquivonacional/pt-br/sites_eventos/sites-tematicos-1/brasil-oitocentista/temas-oitocentistas/escravizados-e-a-conquista-da-liberdade-na-justica-do-imperio
- **Research retrieval:** `turn152view2`
- **Used by:** `brazil-abolition`

### mexrev

- **Title:** The Mexican Revolution and the United States: overview
- **Publisher:** Library of Congress
- **URL:** https://www.loc.gov/exhibits/mexican-revolution-and-the-united-states/overview.html
- **Research retrieval:** `turn150view1`
- **Used by:** `mexican-revolution`

### mexrevend

- **Title:** The End of the Revolution and its Consequences
- **Publisher:** Library of Congress
- **URL:** https://www.loc.gov/exhibits/mexican-revolution-and-the-united-states/end-of-the-revolution-and-its-consequences.html
- **Research retrieval:** `turn149view3`
- **Used by:** `mexican-revolution`

### cuba

- **Title:** Memorandum recommending recognition of Cuba’s provisional government, January 1959
- **Publisher:** U.S. Department of State, Foreign Relations of the United States
- **URL:** https://history.state.gov/historicaldocuments/frus1958-60v06/d217
- **Research retrieval:** `turn149view6`
- **Used by:** `cuban-revolution-victory`

### srivijaya

- **Title:** Sang Nila Utama: historical background of Srivijaya
- **Publisher:** National Library Board, Singapore
- **URL:** https://www.nlb.gov.sg/main/article-detail?cmsuuid=7dc04ff9-f9fb-44ba-867e-8b714f87b324
- **Research retrieval:** `turn158view4`
- **Used by:** `srivijaya-maritime`

### seaearly

- **Title:** Southeast Asia, 500–1000 A.D.
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/toah/ht/06/sse.html
- **Research retrieval:** `turn156view2`
- **Used by:** `srivijaya-maritime`

### seamedieval

- **Title:** Southeast Asia, 1000–1400 A.D.
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/toah/ht/07/sse.html
- **Research retrieval:** `turn158view5`
- **Used by:** `majapahit-java`, `chola-dynasty`

### majapahit

- **Title:** Trowulan: Former Capital City of Majapahit Kingdom
- **Publisher:** Indonesia Ministry of Culture and Tourism / UNESCO Tentative Lists
- **URL:** https://whc.unesco.org/en/tentativelists/5466/
- **Research retrieval:** `turn159view0`
- **Used by:** `majapahit-java`

### sealate

- **Title:** Southeast Asia, 1400–1600 A.D.
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/toah/ht/08/sse.html
- **Research retrieval:** `turn160view0`
- **Used by:** `majapahit-java`, `ayutthaya-kingdom`

### ayutthaya

- **Title:** Historic City of Ayutthaya
- **Publisher:** UNESCO World Heritage Centre
- **URL:** https://whc.unesco.org/en/list/576/
- **Research retrieval:** `turn157view9`
- **Used by:** `ayutthaya-kingdom`

### ly

- **Title:** The Cultural Heritage Complex of Thăng Long-Hà Nội
- **Publisher:** Viet Nam Government Portal
- **URL:** https://thanglong.chinhphu.vn/english/the-cultural-heritage-complex-of-thang-long-ha-noi-110143.htm
- **Research retrieval:** `turn159view2`
- **Used by:** `ly-dynasty`

### thanglong

- **Title:** Central Sector of the Imperial Citadel of Thang Long – Hanoi
- **Publisher:** UNESCO World Heritage Centre
- **URL:** https://whc.unesco.org/en/list/1328/
- **Research retrieval:** `turn154view3`
- **Used by:** `ly-dynasty`

### philippines

- **Title:** The Philippine-American War, 1899–1902
- **Publisher:** U.S. Department of State, Office of the Historian
- **URL:** https://history.state.gov/milestones/1899-1913/war
- **Research retrieval:** `turn158view0`
- **Used by:** `philippine-american-war`

### indonesia

- **Title:** Indonesian independence
- **Publisher:** National Archives of Australia
- **URL:** https://www.naa.gov.au/help-your-research/fact-sheets/indonesian-independence
- **Research retrieval:** `turn156view0`
- **Used by:** `indonesian-independence`

### dienbien

- **Title:** Dien Bien Phu and the Fall of French Indochina, 1954
- **Publisher:** U.S. Department of State, Office of the Historian
- **URL:** https://history.state.gov/milestones/1953-1960/dien-bien-phu
- **Research retrieval:** `turn157view2`
- **Used by:** `dien-bien-phu`

### cambodia

- **Title:** Cambodia 1975–1979
- **Publisher:** United States Holocaust Memorial Museum
- **URL:** https://www.ushmm.org/genocide-prevention/countries/cambodia/cambodia-1975
- **Research retrieval:** `turn157view0`
- **Used by:** `khmer-rouge-cambodia`

### chola

- **Title:** Great Living Chola Temples
- **Publisher:** UNESCO World Heritage Centre
- **URL:** https://whc.unesco.org/en/list/250/
- **Research retrieval:** `turn154view0`
- **Used by:** `chola-dynasty`

### choladates

- **Title:** Divine Images in Stone and Bronze: South India, Chola Dynasty (c. 850–1280)
- **Publisher:** The Metropolitan Museum of Art
- **URL:** https://www.metmuseum.org/met-publications/divine-images-in-stone-and-bronze-the-metropolitan-museum-journal-v-4-1971
- **Research retrieval:** `turn159view1`
- **Used by:** `chola-dynasty`

### rebellioncause

- **Title:** Why did the Indian Rebellion happen?
- **Publisher:** National Army Museum
- **URL:** https://www.nam.ac.uk/explore/why-did-indian-mutiny-happen
- **Research retrieval:** `turn155view1`
- **Used by:** `indian-rebellion-1857`

### rebellion

- **Title:** Decisive events of the Indian Rebellion
- **Publisher:** National Army Museum
- **URL:** https://www.nam.ac.uk/explore/decisive-events-indian-mutiny
- **Research retrieval:** `turn161view3`
- **Used by:** `indian-rebellion-1857`

### salt

- **Title:** Salt Satyagraha and Dandi March
- **Publisher:** Bombay Sarvodaya Mandal / Gandhi Research Foundation
- **URL:** https://www.mkgandhi.org/articles/salt_satya.php
- **Research retrieval:** `turn163view0`
- **Used by:** `salt-march`

### saltstudy

- **Title:** The Indian Independence Struggle (1930–1931)
- **Publisher:** International Center on Nonviolent Conflict, research by Lester Kurtz
- **URL:** https://www.nonviolent-conflict.org/indian-independence-struggle-1930-1931/
- **Research retrieval:** `turn163view2`
- **Used by:** `salt-march`

### bangladesh

- **Title:** Our Museum: overview of the Liberation War
- **Publisher:** Liberation War Museum, Dhaka
- **URL:** https://www.liberationwarmuseumbd.org/page/our-museum
- **Research retrieval:** `turn159view4`
- **Used by:** `bangladesh-liberation`

