> Historical review of the first edition (62 entries). The expanded edition is documented in [HISTORY_RESEARCH.md](HISTORY_RESEARCH.md), [PEOPLE_ROUTES_RESEARCH.md](PEOPLE_ROUTES_RESEARCH.md), and [MAP_METHODOLOGY.md](MAP_METHODOLOGY.md).

# Content and chronology review

Reviewed 22 October 2026. This is a bounded editorial review of the first curated edition, not a claim that the dataset is comprehensive or that every archaeological interpretation is settled.

## Scope and result

I read the 30 records then present in `research/global-history.json`, checked targeted date/source and narrative questions against the full institutional pages, and separately re-examined the Jōmon, Budj Bim and Kuk records in `research/asia-oceania.json`. The combined 62-record snapshot passes the application’s record validator, contains no year-zero endpoints, and uses representative coordinates within valid latitude/longitude bounds.

The apparent global date conflicts listed below were resolved by reading beyond page titles and introductory summaries. I did not find a confirmed factual error among these checked global claims. Three concrete precision risks in my own Asia/Oceania contribution were corrected in the research JSON. No other contributor’s records were edited.

## Three content risks and applied corrections

### 1. Jōmon: distinguish a regional archaeological span from one component site

**Risk.** The entry covers approximately 13,000–400 BCE, the span of a regional group of 17 sites, but its map label previously named Sannai-Maruyama. The official component-site page dates that particular historic site to approximately 3900–2200 BCE. A learner looking at the map in 13,000 BCE could incorrectly infer occupation at that named site.

**Applied correction.** Kept the source-supported regional interval and the representative point at 40.81, 140.70. Changed the label to “Northern Japan; regional reference point near Aomori.” The bilingual date note now distinguishes the regional chronology from Sannai-Maruyama’s chronology and states that the pin does not imply continuous occupation at one place. Added the opened official component-site page to the record’s sources. The coordinates are appropriate for a regional reference; this was a scope and labeling issue, not a misplaced-country issue.

**Evidence.** [UNESCO’s regional synthesis](https://whc.unesco.org/en/list/1632/) supports the regional span. The [official Sannai Maruyama page](https://jomon-japan.jp/en/learn/jomon-sites/sannai-maruyama) supplies the component dates and identifies its location in Aomori City.

### 2. Budj Bim: fix the age anchor and distinguish an early dated channel from the whole network

**Risk.** The former start of 4600 BCE was described only as an approximate conversion of a 6,600-year history. That leaves the reference year unstated and risks treating an age as a number to subtract from the current year. It also risks making every part of a complex, repeatedly modified network appear equally old.

**Applied correction.** Changed `start` to `-4650`, explicitly approximate. The research abstract reports early channel construction at least 6600 **cal BP**; BP uses the fixed 1950 convention. The coarse conversion is therefore around 4650 BCE. The calibrated age is approximate, so the one-year distinction created by civil chronology without year zero has no archaeological precision here. It should not be displayed as an exact construction year.

The bilingual note now says this date concerns an early dated channel, does not date the entire network or the beginning of Gunditjmara culture, and does not imply uninterrupted use of every feature. The summary acknowledges several construction phases. The 2026 endpoint remains a display cutoff for living traditions. Two opened university sources were added to the record.

**Evidence.** The [University of Melbourne-hosted research abstract](https://findanexpert.unimelb.edu.au/scholarlywork/1028175-phased-redevelopment-of-an-ancient-gunditjmara-fish-trap-over-the-past-800-years--muldoons-trap-complex--lake-condah--southwestern-victoria) distinguishes early channel construction from later basalt walls. [Ian McNiven’s firsthand Monash account](https://www.monash.edu/arts/monash-indigenous-studies/news-and-events/articles/2017/the-detective-work-behind-the-budj-bim-eel-traps-world-heritage-bid) explains the excavation and different ages of channel and dam features. [UNESCO’s synthesis](https://whc.unesco.org/en/list/1577/) supports the living cultural landscape.

### 3. Kuk: make a phased land-use history explicit within a single focus interval

**Risk.** A single interval from approximately 5000 BCE to 2026 can be mistaken for farming in every intervening year. The existing summary already called land use episodic, but the date note did not explain the archaeological age anchor or give a concrete interruption.

**Applied correction.** Kept `start: -5000`: the early edge of the primary research range for mounded cultivation, 6950–6440 cal BP, rounds to approximately 5000 BCE using the fixed 1950 convention. The bilingual note now explains this choice, identifies early-20th-century abandonment and renewed settlement around 1960, and explicitly says that the focus interval does not imply cultivation in every year. Added the opened research abstract and a scholarly chapter on the later occupation history. The pin at -5.78, 144.33 remains a suitable approximate reference to the Kuk archaeological area.

**Evidence.** The [ANU-hosted Science paper abstract](https://researchportalplus.anu.edu.au/en/publications/origins-of-agriculture-at-kuk-swamp-in-the-highlands-of-new-guine/) separates earlier plant exploitation from the stronger mounded-cultivation evidence. [ANU Press chapter 23](https://press-files.anu.edu.au/downloads/press/n2540/html/ch23.xhtml?page=34&referer=) documents abandonment and return. [UNESCO’s synthesis](https://whc.unesco.org/en/list/887/) describes episodic land use and the continuing cultural landscape. The book’s [chapter 15, footnote 1](https://press-files.anu.edu.au/downloads/press/n2540/html/ch15.xhtml?page=24&referer=) explicitly states the 1950 BP convention.

**Remaining representation limit.** `activeAt` uses one inclusive focus interval, so Kuk still appears when browsing a year inside a documented interruption. This is acceptable only with the app’s focus-interval explanation and the record’s explicit note; it is not evidence of activity in that exact year. Multiple activity intervals could support finer future archaeology entries. Do not invent an exact abandonment year merely to fit this schema.

## Targeted global checks that did not require corrections

| Record / question | Finding in the opened source |
| --- | --- |
| Rome: does the source support an endpoint of 476 when the article title ends in 393? | The [Met essay](https://www.metmuseum.org/essays/the-roman-empire-27-b-c-393-a-d) explicitly discusses the late empire through 476 and distinguishes continued eastern rule. The record’s selected western endpoint is supported. |
| Ottoman state: does a source headed 1600–1800 support 1299–1922? | The opening of the [Met essay](https://www.metmuseum.org/essays/the-greater-ottoman-empire-1600-1800) gives the broader approximate dynastic range. Its descriptions also support the art, trade and workshop narrative. |
| Aksum: do the longer-lived ruins conflict with the entry’s 1–800 interval? | [UNESCO’s synthesis](https://whc.unesco.org/en/list/15/) distinguishes the kingdom’s 1st–8th-century phase from ruins and later cultural history. The selected interval is supported. |
| Meroë: is 300 BCE–400 CE too short for Kush as a whole? | [UNESCO](https://whc.unesco.org/en/list/1336/) dates the broader kingdom earlier, but identifies royal burial at Meroë from the 3rd century BCE and the kingdom’s continuation to the 4th century CE. The entry is a selected Meroë phase, not the full chronology of Kush. |
| Samarra: dates and artistic production | [UNESCO](https://whc.unesco.org/en/list/276/) explicitly gives 836–892 as the Abbasid capital phase and discusses stucco and ceramic innovations. Later occupation does not invalidate this selected phase. |
| Córdoba: caliphate dates | [UNESCO criterion (iii)](https://whc.unesco.org/en/list/313/) explicitly gives 929–1031. |
| Memphis / Old Kingdom: 2130 versus 2150 in the source URL | The actual title and text of the [Met page](https://www.metmuseum.org/essays/egypt-in-the-old-kingdom-ca-2649-2150-b-c) use approximately 2649–2130 BCE; the URL slug differs. The data matches the page text. |
| Uruk: bookkeeping and ration claims | The [Met essay](https://www.metmuseum.org/essays/uruk-the-first-city) explicitly discusses early pictographic accounting and ration records. |
| Unified Mongol phase: why stop around 1260? | The [University of Chicago dissertation abstract](https://knowledge.uchicago.edu/records/cbdsw-avq47) distinguishes the unified polity from its dissolution in the 1260s and the later continuing networks. The record correctly labels a selected unified phase. |

## No-year-zero implementation assessment

A bounded executable check against `dist/core.mjs` and both research files found:

- All 62 records pass `validateRecords`; no start or end equals zero.
- All 8,001 integer slider positions return nonzero civil years.
- Stepping forward from 1 BCE returns 1 CE; stepping backward from 1 CE returns 1 BCE.
- A URL hash containing `year=0` normalizes to the default year 1200.
- `activeAt(record, 0)` is false for every record.

There is one **helper-level hardening opportunity**, not a demonstrated normal-UI failure: directly calling the exported `formatYear(0)` returns `0 CE` (or `公元0年`). Normal application state is validated before formatting. If this function is intended as a reusable public helper, it should reject an invalid civil year; a small assertion for zero would prevent later callers from bypassing the invariant. Likewise, `hashFromState` assumes already-valid application state rather than validating its input itself.

The invalid-year helper message previously named 2025 despite `MAX_YEAR = 2026`; root has reported that both language strings are now corrected to 2026. No change to the core functions or other contributors’ records was made during this review.

## Source retrieval notes

All links cited above were opened during research or this review. A direct publisher endpoint for the 2012 Budj Bim paper returned an access error and the Australian nomination PDF exceeded the browser’s content-size limit; neither inaccessible response was treated as evidence. The accessible university-hosted research abstract and author’s institutional account support the applied correction. Source reference identifiers for the three additions are recorded in the research JSON alongside evidence notes and check dates.
