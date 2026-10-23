# Modern history expansion: source and chronology review

Reviewed 22 October 2026. This supplement contains **26 original bilingual records**, dated 1922–2023, across all nine atlas regions. It adds 53 distinct source URLs. It does not alter any existing record. It avoids duplicating the existing Bangladesh liberation, Berlin Wall opening, UN Charter, South Africa election, and other modern records.

## Purpose and integration

The user identified a Soviet Union outline displayed at 2026. These narratives complement the map-engine correction by making the transitions themselves discoverable. They are events or bounded historical processes, not territorial geometry and not entries artificially extended to 2026. Every record has finite `start`/`end`, `ongoing: false`, explicit `kind: event`, bilingual date notes, a representative location and `locationYear`, and claim-level evidence notes in each source object.

- All26 records are integrated into `dist/data/history.json` after duplicate-ID checks.
- The seven-stop guided reading is integrated into `dist/journeys.mjs`; the study course is integrated into `dist/data/courses.json`. The existing `bangladesh-liberation` record is intentionally referenced rather than duplicated.
- Narrative and translations are newly written; linked sources retain their own rights.
- `locationYear` is metadata for the representative marker, not a claim that a whole transition occurred in one city.

## Chronological decisions

**Soviet Union.** Separate establishment in 1922 from the 1917 revolutions. Treat dissolution as a 1991 process, with Gorbachev’s resignation on 25 December and formal institutional dissolution on 26 December. Russia’s continuation of UN membership does not make the USSR and Russia the same territory. Baltic independence restoration and individual republics’ recognition dates should not be flattened into one date. [Presidential Library collection](https://www.prlib.ru/en/collections/1732906), [Office of the Historian](https://history.state.gov/milestones/1989-1992/collapse-soviet-union), [ENRS](https://enrs.eu/news/dissolution-of-the-ussr), [UN membership history](https://www.un.org/en/about-us/member-states/russian-federation).

**Germany and Czechoslovakia.** The opening of the Berlin Wall in November 1989 is distinct from reunification effective 3 October 1990. Czechoslovakia’s last day was 31 December 1992, with two successor states from 1 January 1993; their UN admission was 19 January. Annual maps require an explicit day-of-year convention. [German federal chronology](https://www.bundesregierung.de/breg-de/schwerpunkte/deutsche-einheit/die-einheit-ist-wirklichkeit-432814), [UN Czech/Slovak history](https://www.un.org/en/about-us/member-states/czechoslovakia).

**Yugoslavia.** The 1991–2006 record follows selected constitutional transitions and expressly does not describe one uninterrupted war. The socialist federation, the 1992 Federal Republic of Yugoslavia, and the 2003 Serbia and Montenegro union were different entities. The account acknowledges mass crimes prosecuted by the ICTY rather than presenting the breakup as a sequence of neutral cartographic relabelings. Kosovo’s later status is outside this bounded record. [UN successor-state history](https://www.un.org/en/about-us/member-states/yugoslavia), [ICTY background](https://www.icty.org/en/about/what-former-yugoslavia), [ICTY mandate](https://www.icty.org/en/about).

**Eritrea, Namibia, Timor-Leste and South Sudan.** Military outcomes, referendum dates, independence, and UN admission are different evidence points. Eritrea’s 1991 military transition is distinguished from its 1993 referendum and UN admission; the record avoids forcing varying “declaration” or commemorative dates into one event. Timor-Leste’s 1975 declaration, 1999 consultation, and 20 May 2002 restoration of independence are separate. Namibia’s independence was 21 March 1990. South Sudan’s independence was 9 July 2011, before UN admission on 14 July. Primary and institutional evidence appears in each record.

**Vietnam and Yemen.** Formal Vietnamese state reunification on 2 July 1976 is distinct from the military events of April 1975. Yemen’s merger took effect 22 May 1990. Neither event is used to infer present-day control on the ground. [UN Vietnam authority record](https://digitallibrary.un.org/record/3979563?ln=en), [UN Yemen history](https://www.un.org/en/node/122919).

**Treaty organizations and autonomy.** EU, AU, MERCOSUR, the Rarotonga zone, and Bougainville autonomy are not painted as sovereign countries by these narratives. Treaty signatures, entry into force, institutional launch, and implementation are distinguished. Bougainville’s 2001 agreement is not described as a grant of independence or a statement of current status.

**Science.** The 2003 Human Genome Project record distinguishes about 92% sequence coverage from later gapless work and flags reference diversity limitations. Webb’s July 2022 release is distinct from its 2021 launch; the Earth marker is a public-release site. Chandrayaan-3’s August 2023 landing was at about 69°S on the Moon, not the geographic south pole. Its Earth marker is Sriharikota, not a lunar coordinate. [NHGRI](https://www.genome.gov/about-genomics/educational-resources/fact-sheets/human-genome-project), [NASA](https://www.nasa.gov/news-release/nasa-reveals-webb-telescopes-first-images-of-unseen-universe/), [ISRO](https://pradan.issdc.gov.in/ch3/).

## Research method and limits

Sources were retrieved through web search, favoring public institutional records, original legal instruments, UN documentation, archives, and the organizations responsible for scientific missions. Stronger search was used to verify core chronology. Some official sites returned access errors or bot checks on direct opening while their indexed text remained available. In particular, the Presidential Library founding collection, some UN pages and the ICTY background page were supported by retrieved index text rather than a complete direct page load. `checkedAt` records the date that evidence was retrieved; it is not a guarantee that every link is currently reachable from every browser.

Narrative dates and broad institutional facts were checked; representative city coordinates are approximate locators, not surveyed venue points. This research does not validate polygon vertices, contemporary control lines, or all historical claims elsewhere in the atlas. The expansion reaches 2023 through selected science events; it does not claim comprehensive news or political coverage through 2026.

Structural verification used the existing `validateRecords` against the combined original history, people, and supplement. Result: **218 records, no structural errors or duplicate IDs**. All 26 new records are finite; 53 source URLs; all nine regions represented. The two integrated learning objects were checked for valid references.

## Record inventory

| ID | Period | Region | Main evidence |
|---|---:|---|---|
| `soviet-union-formation` | 1922 | europe | [Boris Yeltsin Presidential Library](https://www.prlib.ru/en/collections/1732906) |
| `german-reunification` | 1990 | europe | [Federal Government of Germany](https://www.bundesregierung.de/breg-de/schwerpunkte/deutsche-einheit/die-einheit-ist-wirklichkeit-432814) |
| `soviet-union-dissolution` | 1991 | europe | [U.S. Department of State, Office of the Historian](https://history.state.gov/milestones/1989-1992/collapse-soviet-union) |
| `yugoslavia-successor-states` | 1991–2006 | europe | [United Nations](https://www.un.org/en/about-us/member-states/yugoslavia) |
| `czechoslovakia-dissolution` | 1993 | europe | [United Nations](https://www.un.org/en/about-us/member-states/czechoslovakia) |
| `eritrea-referendum-independence` | 1993 | africa | [United Nations](https://press.un.org/en/1996/19961223.pi986.html) |
| `timor-leste-independence` | 2002 | southeast-asia | [United Nations Peacekeeping](https://peacekeeping.un.org/sites/default/files/past/etimor/etimor.htm) |
| `south-sudan-independence` | 2011 | africa | [United Nations](https://www.un.org/en/about-us/member-states/south-sudan) |
| `zimbabwe-independence` | 1980 | africa | [U.S. Department of State, Office of the Historian](https://history.state.gov/countries/zimbabwe) |
| `namibia-independence` | 1990 | africa | [United Nations Peacekeeping](https://peacekeeping.un.org/sites/default/files/past/untagFT.htm) |
| `vietnam-formal-reunification` | 1976 | southeast-asia | [United Nations Dag Hammarskjöld Library](https://digitallibrary.un.org/record/3979563?ln=en) |
| `yemen-unification` | 1990 | west-central-asia | [United Nations](https://www.un.org/en/node/122919) |
| `hong-kong-handover` | 1997 | east-asia | [Hong Kong SAR Government](https://www.basiclaw.gov.hk/en/basiclaw/preamble.html) |
| `macao-handover` | 1999 | east-asia | [Macao Government Information Bureau](https://www.gcs.gov.mo/news/detail/en/M23GFVdRmC) |
| `maastricht-european-union` | 1993 | europe | [European Parliament](https://www.europarl.europa.eu/about-parliament/en/in-the-past/the-parliament-and-the-treaties/maastricht-treaty) |
| `african-union-launch` | 2002 | africa | [African Union](https://www.au.int/en/overview) |
| `paris-climate-agreement` | 2015–2016 | europe | [United Nations Framework Convention on Climate Change](https://www.unfccc.int/process-and-meetings/the-paris-agreement) |
| `human-genome-project-completion` | 2003 | north-america | [National Human Genome Research Institute](https://www.genome.gov/about-genomics/educational-resources/fact-sheets/human-genome-project) |
| `panama-canal-transfer` | 1999 | latin-america | [Panama Canal Authority](https://pancanal.com/panama-celebra-20-anos-de-la-transferencia-del-canal-con-izada-de-la-bandera/) |
| `mercosur-treaty` | 1991 | latin-america | [MERCOSUR](https://www.mercosur.int/en/documents/founding-texts) |
| `bougainville-peace-agreement` | 2001 | oceania | [United Nations Peacemaker](https://peacemaker.un.org/en/node/9203) |
| `rarotonga-treaty` | 1985–1986 | oceania | [United Nations Office for Disarmament Affairs](https://disarmament.unoda.org/en/nwfz/treaty-rarotonga) |
| `singapore-independence` | 1965 | southeast-asia | [National Archives of Singapore](https://corporate.nas.gov.sg/discover-archives/media/proclamationofsingapore/) |
| `un-indigenous-rights-declaration` | 2007 | north-america | [United Nations General Assembly](https://press.un.org/en/2007/ga10612.doc.htm) |
| `webb-first-science-images` | 2022 | north-america | [NASA](https://www.nasa.gov/news-release/nasa-reveals-webb-telescopes-first-images-of-unseen-universe/) |
| `chandrayaan-three-landing` | 2023 | south-asia | [Indian Space Research Organisation](https://www.isro.gov.in/Ch3_Propulsion_Module_moved_from_Lunar_orbit_to_Earth_orbit.html?s=03) |
