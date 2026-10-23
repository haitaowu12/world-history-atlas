# Reviewed historical map context — version 4

Reviewed 23 October 2026. This document records the evidence and editorial decisions behind the new temporal intervals. The complete reproducible selection is in [map-context-curation.cjs](../scripts/map-context-curation.cjs); the feature-by-feature output is in . Geometry methods, licensing and the checkpoint table are in [MAP_METHODOLOGY.md](MAP_METHODOLOGY.md).

## What continuity means

The preceding release only drew an outline in its source year. That preserved source dates but made countries and labels disappear during normal year scrolling. The new collection contains 516 dated feature instances representing 180 societies or states across 43 actual checkpoints, including 271 newly selected instances.

Each feature retains its original `year` and `sourceYear`. Its separate `contextValidity` specifies inclusive eligibility bounds, an explicit backward-review flag, a review date, evidence URLs and a bilingual qualification. A context interval permits a **dated reference outline**, not a claim that its borders were identical in every eligible year.

At each selected year the application chooses the newest eligible prior outline for each `polityId`. If none exists, an eligible later outline can be used only when `backwardReviewed` is true. Missing interval metadata means exact source-year display only. The original source date and uncertainty remain visible. A view combining different source dates is a context view even when the selected year happens to be a source checkpoint.

The data report checks every civil year from 2600 BCE through 2010 CE: 4,610 years, with no year zero. At least one society/state reference is eligible in each. **This does not mean that every place is covered.** Coverage is selective, especially in early periods, and an uncolored region is an evidence or curation gap. The separately reviewed contemporary reference supplies 2011–2026, subject to its country-specific exceptions.

## Earliest societies and cultural regions

The oldest selected geometry is the upstream **2000 BCE** checkpoint. The atlas does not invent 3000 BCE state outlines to fill the slider.

| Selected identity | Reviewed context | Interpretation and evidence |
| --- | --- | --- |
| Indus civilization | 2600–1900 BCE | A cultural region associated with the Mature Harappan phase. The [Metropolitan Museum's collection record](https://www.metmuseum.org/art/collection/search/326374) supplies the phase chronology. It does not establish a single state or political border. |
| Minoan Crete | 2500–1450 BCE | An explicitly cultural island reference, informed by the [Met's Minoan Crete essay](https://www.metmuseum.org/essays/minoan-crete). The chosen finite interval is a display phase, not a claim that people or culture disappeared at its end. |
| Kingdom of Kerma | 2500–1551 BCE | A selected kingdom reference. Sudan's [UNESCO tentative-list submission for Kerma and Dokki Geil](https://whc.unesco.org/en/tentativelists/6594/) describes the chronology. A tentative-list submission is not a World Heritage inscription or a survey of all vertices. |
| Kassite Babylonia | 1595–1155 BCE | A source core region, supported by the [Met's Kassite-period chronology](https://www.metmuseum.org/essays/the-middle-babylonian-kassite-period-ca-1595-1155-b-c-in-mesopotamia). |
| New Kingdom Egypt | 1550–1071 BCE | The selected 1500 BCE source polygon represents a Nile core, not the full imperial frontier; see the [Met's New Kingdom chronology](https://www.metmuseum.org/essays/egypt-in-the-new-kingdom-ca-1550-1070-b-c). |
| Egyptian kingdoms, Assyria, Babylonia and Kush | Separate bounded phases | The atlas separates the later Egyptian core and Kushite phase, using [Third Intermediate Period chronology](https://www.metmuseum.org/essays/egypt-in-the-third-intermediate-period-1070-712-b-c) and [Gebel Barkal's UNESCO record](https://whc.unesco.org/en/list/1073/). Core labels do not claim a single unchanging administration. |

Both cultural identities have `kind: "culture"`. Their notes say that political borders and the number of governing authorities are unknown. They receive a distinct map treatment. None is silently reclassified as a country.

The upstream 3000/2000 BCE Egyptian outline overextends into Kerma, its Elam outline misses Susa, and several early named states are chronologically unsupported. These are excluded. Other rejected early items include premature Hittite political labels, an Ur III label after its phase, and David/Solomon and Urartu labels at 1500 BCE. The named exclusions and observed source defects remain in the manifest.

## Classical, medieval and early modern coverage

Actual checkpoints at 400, 300, 200 and 100 BCE distinguish the Roman Republic and Hellenistic successor states from the earlier Alexander reference. Han references are separated across the Xin interruption: the 1 BCE outline ends in 8 CE and the 100 CE reference begins in 25 CE. The atlas does not carry the Han label unbroken through that interval. The [Met's Han chronology](https://www.metmuseum.org/essays/han-dynasty-206-b-c-220-a-d) supports the political phase distinction.

New 400/500/700/900/1100 checkpoints add selected Eastern and Western Roman, Sasanian, Frankish, Aksumite, Tang, Abbasid, Song, Liao, Seljuk and other regional references. The 700 upstream Sui/Sasanian labels are excluded, as is an Umayyad outline already containing Iberia before 711. East and West Francia replace an undivided Carolingian identity after 843. The [Met's Islamic chronology](https://www.metmuseum.org/learn/educators/curriculum-resources/art-of-the-islamic-world/introduction/chronology) and separate dynasty essays provide phase evidence; they do not certify the atlas polygons.

The Jiangshan Southern Song and Jin schematics retain their published 1141–1205 phase. The selected Ming schematic is not extended past its published 1615 endpoint. A separate 1500 Ming outline supplies earlier context. The stricter source-phase limit deliberately leaves later Ming years without a reviewed Ming outline, even though the general dynasty continued. The reviewed Qing phase ends in 1911 and excludes the source's lingering 1914 Manchu label; see the [Qing chronology](https://www.metmuseum.org/essays/the-qing-dynasty-1644-1911-painting).

Actual 1650, 1700, 1715, 1783, 1815 and 1878 checkpoints reduce long jumps in early modern and nineteenth-century geography. The selection includes Ottoman, Safavid, Mughal, Qing, European and colonial administrative outlines. Portugal is eligible only from its 1640 restoration in this selection; the [Met's Iberian chronology](https://www.metmuseum.org/toah/ht/09/eusi.html) supplies that distinction. The [Low Countries chronology](https://www.metmuseum.org/toah/ht/09/euwl.html) distinguishes Dutch independence claims from later recognition. Colonial shading represents broad administration or claims and is explicitly qualified: Indigenous societies and independent communities continued within those outlines.

### Russia and Crimea before 1783

A targeted visual review found a concrete error in an initially proposed interval: the 1783 Russian source outline includes Simferopol in Crimea and cannot be a Russian territorial reference for 1750. The [Law Library of Congress historical account](https://blogs.loc.gov/law/2014/03/crimean-history-status-and-referendum/) dates Russian annexation and provincial incorporation to 1783.

The correction preserves the real source dates. `1783-russian` starts in 1783. A new `1715-russian` selects the actual upstream `Tsardom of Muscovy` polygon and is eligible from 1715 through 1782; Moscow lies inside and Simferopol lies outside. The label is **Tsardom of Russia** through 1720 and **Russian Empire** from 1721, following the imperial-title chronology in the [Library of Congress Russia country study](https://tile.loc.gov/storage-services/master/frd/frdcstdy/ru/russiacountrystu00curt/russiacountrystu00curt.pdf). The earlier outline remains visibly dated 1715; its note does not infer subsequent frontier expansion.

## Modern transitions and deliberate stops

The source inventory contains no 1970 or 1980 checkpoint. The atlas therefore uses bounded source context, additional genuine 1914/1920/1930/1938/1945/1960 features and the existing 1994/2000/2010 selection. It does not relabel a present-day shape with a historical source year.

| Identity or transition | Implemented eligibility | Dated evidence and consequence |
| --- | --- | --- |
| Russian Empire, `russian` | Ends 1916 | The [National Park Service's 1917 chronology](https://www.nps.gov/features/shen/2019/hoover/lesson-1/timeline/1917-2.html) supports ending the imperial identity before revolutionary transition years. Civil-war authorities are not filled automatically. |
| Soviet Union, `ussr` | 1922–1991 | [Formation chronology](https://1997-2001.state.gov/background_notes/russia_0005_bgn.html) and [dissolution history](https://history.state.gov/milestones/1989-1992/collapse-soviet-union) bound eligibility. A 1938 outline is explicitly pre-1939; 1945 and 1960 supply later checkpoints. USSR is absent from 1992 onward. |
| China, mainland Republic / PRC | Mainland Republic source context ends 1948; PRC context starts 1949 | The [Office of the Historian's 1949 account](https://history.state.gov/milestones/1945-1952/chinese-rev) supports the identity change. The 1960 PRC source core omits separately drawn Tibet; the gap is disclosed, with no sovereignty or civil-war front-line claim. |
| Pakistan and Bangladesh | 1960 Pakistan outline ends 1970; separate later Pakistan/Bangladesh context starts 1971 | [The National Archives' Bangladesh material](https://www.nationalarchives.gov.uk/education/teaching-resources/independence-of-bangladesh/) supports the transition. Later dated reference outlines retain their source date. |
| Germany | Divided-state identities end 1989; reunited reference starts 1990 | [German Federal Government evidence](https://www.bundesregierung.de/breg-en/service/archive/archive/the-chancellor-who-reunited-germany-413888) dates reunification to 3 October 1990. Annual resolution does not claim that reunification occurred on 1 January. |
| Czechoslovakia | Ends 1992; Czech/Slovak identities start 1993 | [UN successor-state history](https://www.un.org/en/about-us/member-states/czechoslovakia) records dissolution at the end of 1992. |
| Eritrea and Ethiopia | Distinct later reference outlines from 1993 | [UN independence message](https://digitallibrary.un.org/record/218378?ln=en) records 24 May 1993. Earlier Ethiopia context is kept separate. |
| Yugoslavia | `yugoslavia-kingdom`: 1918–1940; `yugoslavia-sfr`: 1945–1990 | The kingdom and socialist phases are distinct. Source geometry is not carried through wartime occupation or successor-state wars. [UN successor-state notes](https://www.un.org/en/about-us/member-states/yugoslavia) support avoiding a blanket 1918–2006 identity. No unreviewed Federal Republic silhouette is invented. |
| Sudan and South Sudan | Historical Sudan ends 2010; separate contemporary units from 2011 | [UN independence ceremony](https://press.un.org/en/2011/sgsm13696.doc.htm) dates South Sudan's independence to 9 July 2011. |

Other identity ranges use the dated source review, UN member histories and, for the previously selected modern set, independent CShapes comparisons. These sources support chronology or coarse geography, not an assertion that all borders remained fixed. The interval registry is intentionally finite and can be tightened as more detailed evidence becomes available.

### United Kingdom and the Irish Free State

The 1930 source's UK polygon incorrectly contains Athlone, well inside the Irish Free State. That feature is excluded. The 1920 outline ends in 1922; actual 1938 UK and Ireland outlines are backward-reviewed from 1923. The [House of Commons Treaty briefing](https://commonslibrary.parliament.uk/research-briefings/cbp-9260/) dates the Free State's establishment to 6 December 1922, and its [border briefing](https://commonslibrary.parliament.uk/research-briefings/cbp-9105/) explains establishment and later confirmation of the border.

Ireland's period name is **Irish Free State** through 1936 and **Ireland** from 1937. Point regressions require Athlone outside UK context while Belfast and London remain inside. This catches a real geometric error rather than only checking whether a string changes.

## Evidence limits and reproducibility

The source is pinned at `aourednik/historical-basemaps@da7a4b735ecef70aebdc9c73e409d8a2500d50f3`. All 271 additions come from actual files at that commit. Raw hashes, selected names and source URLs are recorded. Eight context chunks remain below 450,000 bytes each, and the pre-existing collections are also chunked. GPL, AWMC and Jiangshan licensing remain separate.

The builder verifies closed, nondegenerate geometry and finite projection paths. The temporal suite verifies selection, stops, backward-review requirements, concrete point locations and contemporary fallbacks. Previously checked 1994/2000/2010 instances retain their 142 dated CShapes state-existence and interior-point checks. **The 271 new instances have not all undergone that independent CShapes comparison**, and no restricted CShapes geometry is redistributed.

The remaining limits are substantive: no annual frontier reconstruction, no complete coverage of small states or Indigenous polities, no comprehensive civil-war front lines, no verification of every vertex, and no claim that a cultural region is politically unified. Display continuity improves ordinary year browsing while keeping source dates, known gaps and uncertain boundaries explicit.
