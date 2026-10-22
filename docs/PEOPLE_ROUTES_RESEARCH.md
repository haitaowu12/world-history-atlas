# World History Atlas v2: people, routes, and learning sequences

Research checked on **22 October 2026**. These are independently written bilingual learning narratives. No third-party prose or map images are copied into the app data.

## Deliverables

| File | Contents |
|---|---|
| `v2-people.json` | 24 biographies, all nine atlas regions, 75 mapped milestones |
| `v2-routes.json` | Four historical journeys and four network layers; 58 stops and 51 explicit connections |
| `v2-courses.json` | Eight thematic reading sequences; two discussion questions and one comparison activity each |
| `v2-people-routes-validation.json` | Counts and completed data-integrity checks |
| `build_v2_people.py`, `build_v2_routes.py`, `build_v2_courses.py` | Reproducible data authoring scripts |

People have 106–113-word English summaries and original Chinese versions. The combined people/route data links to **67 distinct source URLs**. Each source has a publisher, a short evidence note, and `checkedAt`. The evidence notes are part of the data, so future editors can distinguish a source used for chronology from one used for interpretation or reception.

## Integration contract

### People

The person objects retain existing core record fields: `id`, `title`, `start`, `end`, `location`, `region`, `theme`, `summary`, `dateNote`, `locationPrecision`, `importance`, and `sources`.

Additional fields:

- `kind: "person"`
- `name: {en, zh}`
- `milestones: [{year, title:{en,zh}, description:{en,zh}, location:{lat,lon,label}, approximate}]`

Do not silently label every start/end range a lifespan. Hatshepsut, Ashoka, Mansa Musa, and Murasaki use a reign or documented-career window. Their `dateNote` explains the choice. Ancient birth years and uncertain endpoints are identified as approximate. There is no year zero.

Milestone locations represent the event, research environment, or explicitly named regional reference. They are not verified building-level addresses. An award point can identify the research setting, and a publication point can identify the relevant institution without implying the person attended an event there.

The final people file includes the requested improvements to Xuanzang and Darwin: an approximate Nalanda study marker and the documented 1835 Galápagos visit. The Nalanda marker represents the institution-curated Bihar travel window of 637–642, not a claimed exact arrival day.

### Routes

Every route has `kind: "journey" | "network"`, bilingual title/summary/date note/caveat, `geometryPrecision: "schematic"`, stops, explicit legs, sources, `personIds`, and `relatedIds`.

Stop fields:

```json
{
  "id": "stop-id",
  "label": {"en": "Place", "zh": "地点"},
  "year": null,
  "lat": 0,
  "lon": 0,
  "description": {"en": "Context", "zh": "背景"}
}
```

The zeroes above are a schema illustration, not historical dates or actual stop coordinates. `year` is null for every network stop. Journey stops use documented years; Salt March stops additionally have bilingual `dateLabel` with dates verified from chronology/speeches.

Leg fields:

```json
{"from":"stop-id-a","to":"stop-id-b","evidenceNote":"Basis and scope of this connection"}
```

**Render only the supplied legs.** Do not automatically connect a network’s stop list into one itinerary. Network direction is a presentation convention unless the data describes forced movement. None of the lines encodes volume, speed, travel distance, or political control. Long curves can cross land because they are relationships, not sailing tracks.

## Route evidence and editorial scope

| Layer | Evidence base | What the layer represents |
|---|---|---|
| Silk Roads corridor | [UNESCO corridor entry](https://whc.unesco.org/en/list/1442/), [UNESCO overview](https://www.unesco.org/en/silk-roads/about-silk-roads) | Selected overland branches and valley connections; many intervening places omitted |
| Indian Ocean ports | [UNESCO legacy Quanzhou article](https://en.unesco.org/silkroad/content/quanzhou), [current World Heritage entry](https://whc.unesco.org/en/list/1561/) | Commercial connections, potentially through many intermediaries; not direct port-to-port sailing claims |
| Ibn Battuta’s first pilgrimage | Berkeley ORIAS’s [North Africa chapter](https://orias.berkeley.edu/resources-teachers/travels-ibn-battuta/journey/across-north-africa-cairo-1325), [Egypt–Syria chapter](https://orias.berkeley.edu/resources-teachers/travels-ibn-battuta/journey/cairo-jerusalem-damascus-medina-and-mecca-1326), [hajj chapter](https://orias.berkeley.edu/resources-teachers/travels-ibn-battuta/journey/hajj-medina-mecca-1326) | Selected progression in the reconstructed first pilgrimage, omitting shorter stops and attempted detours |
| Zheng He’s fleets | [Columbia voyage account](https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm), [Mariners’ Museum biography](https://exploration.marinersmuseum.org/subject/zheng-he/) | Aggregate activity across expeditions and squadrons, not every destination visited by one man |
| Tupaia aboard Endeavour | [Natural History Museum interview](https://www.nhm.ac.uk/discover/on-tour-with-tupaia.html), [Dictionary of New Zealand Biography](https://teara.govt.nz/en/biographies/6t2/tupaia), [National Library catalogue](https://natlib.govt.nz/records/22529771) | Tupaia’s documented segment, with Indigenous expertise and inhabited societies foregrounded |
| Darwin’s Beagle landfalls | [Darwin Online itinerary](https://darwin-online.org.uk/EditorialIntroductions/vanWyhe_Itinerary_of_Charles_Darwin.html), [notebook register](https://darwin-online.org.uk/converted/published/2009_Rookmaaker_F2044b.html), [Cambridge correspondence](https://www.darwinproject.ac.uk/voyage-beagle) | Selected landfalls; ship movement and Darwin’s inland work are not conflated |
| Forced Atlantic crossings | SlaveVoyages [regional synthesis](https://legacy.slavevoyages.org/blog/volume-and-direction-trans-atlantic-slave-trade), [port map](https://legacy.slavevoyages.org/blog/major-regions-ports-trans-atlantic-slave-trade), [methodology](https://legacy.slavevoyages.org/blog/methodology-trans-atlantic) | Regional relationships with geographic anchors, not paired-port voyage records or individual origins |
| Salt March | [GandhiServe chronology](https://www.gandhiserve.net/about-mahatma-gandhi/chronologies/chronology-1930/), [Aslali speech](https://www.mkgandhi.org/civil_dis/speech1.php), [Dandi Path project](https://www.dandimarch.org/) | Selected documented speeches and stops, with arrival distinguished from the salt-law action |

The two SlaveVoyages map images were inspected directly for regional labels and scope. They are research references only and are not redistributed. Their values were not copied or converted into visual weights.

## Source handling and uncertainty

Several official or institutional pages contain outdated dates, internal inconsistencies, or simplified narratives. The dataset therefore uses relevant portions of sources without assuming the entire page is error-free. Source notes record this where it matters.

- Birth estimates are preserved as estimates, particularly for Hypatia, Al-Khwarizmi, Ibn Sina, Sor Juana, Tupaia, and Kate Sheppard.
- Ibn Sina follows the revised specialist Stanford biography and explicitly acknowledges the more familiar alternative birth year.
- Murasaki’s start/end window represents documented activity. It is not a fabricated lifespan or exact completion date for *Genji*.
- Al-Khwarizmi’s algebra milestone is an explicit editorial reference within a documented patronage period. It is not presented as a known publication year.
- The Xuanzang museum and local-government sources support a Nalanda presence; the institutional exhibition provides the broader Bihar date window.
- No wealth calculation is assigned to Mansa Musa. No specific invention is assigned to Hypatia where surviving evidence is insufficient.
- Institutional summaries of Toussaint were cross-checked against a specialist Oxford bibliography and the constitutional text. Independence is not attributed to the 1801 constitution.
- Minor contradictory dates in broad Zheng He accounts are not reused. The network makes different expeditions and leadership arrangements explicit.
- Tupaia’s death is dated only to the year. Conflicting exact days in older accounts are not resolved by choosing a convenient one.
- The Beagle selection excludes an inconsistent-looking late-voyage location in a general itinerary. The more detailed notebook-based register supports the earlier Brazilian stops.
- The legacy UNESCO Quanzhou article currently redirects to its programme homepage. Its indexed institutional text was available and specifically names the displayed commercial connections. This access condition is recorded in its source note; the live World Heritage page provides additional accessible context.
- The Xuanzang Internet Encyclopedia of Philosophy entry was available in indexed excerpts while direct retrieval failed. Its source note makes that limitation visible, and additional institutional sources accompany it.

The narratives distinguish political claims, later memory, and surviving evidence. They also identify collective participants around famous individuals. The aim is to make the records useful for inquiry while keeping factual statements within the sources’ support.

## Learning sequences

`v2-courses.json` is optional integration data. Courses are thematic reading/comparison sequences, not journeys. Each contains `recordIds`, `routeIds`, two bilingual `questions`, a bilingual `activity`, and `estimatedMinutes: 15`. The duration is an editorial guide. Questions do not assert new historical facts and do not contain artificial machine-graded answers.

Course themes: cities and landscapes; political legitimacy; knowledge across languages; connected seas; writing and authority; freedom; scientific evidence; collective change.

