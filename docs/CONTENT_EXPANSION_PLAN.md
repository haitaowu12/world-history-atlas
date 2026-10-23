# World History Atlas: content expansion roadmap

Planning baseline: V8, source commit `2517be5ebd87a12ba643823685b2bb4b8c6ca562`, 23 October 2026.

## Goal and scope

Build connected regional histories that explain change through time. Add political sequences, events, people, places and social history together, while keeping the main timeline focused on selected states, dynasties and comparable political formations. Adding more entries alone will not establish completeness or improve territorial coverage.

This roadmap records the V8 planning baseline. The selected implementation of all three releases is documented in ; the baseline inventory and original backlog below are retained for comparison. “Gap” below means missing or insufficient standalone treatment in the current collection, not necessarily that a subject is never mentioned in another entry. Proposed subjects still require detailed research and checks against existing records before authoring.

## Current inventory

The selectable corpus contains 1,369 entries: 975 imported Jiangshan event records and 394 other entries, consisting of 370 history entries and 24 full biographies. The shared People index also contains inherited profiles; its larger headcount must not be treated as a count of full researched biographies. There are 112 records classified as political overviews across the corpus.

| Atlas region | Other entries, including full biographies | Imported event records | Full biographies |
|---|---:|---:|---:|
| Africa | 54 | 0 | 6 |
| West and Central Asia | 44 | 3 | 2 |
| Europe | 57 | 0 | 2 |
| South Asia | 39 | 0 | 2 |
| East Asia | 61 | 964 | 3 |
| Southeast Asia | 33 | 8 | 2 |
| North America | 34 | 0 | 2 |
| Latin America and the Caribbean | 40 | 0 | 3 |
| Oceania | 32 | 0 | 2 |
| **Total** | **394** | **975** | **24** |

Counts use the application's current region assignments. Imported records originate in the China collection even when their representative location falls in another region. The nine broad region labels conceal substantial differences within regions. Counts measure inventory, not independent historical verification, quality or continuous coverage.

Baseline files: `dist/data/history.json`, `china-depth-v7.json`, `world-depth-v7.json`, `modern-continuity-v7.json`, `people.json`, and the event files listed in `china-import-manifest.json`. Read alongside `V7_CHINA_REVIEW.md`, `V7_WORLD_RESEARCH.md`, `V7_MAP_COVERAGE_REVIEW.md` and `V8_GEOMETRY_FIX.md`.

## Regional backlog

The rows below are research workstreams. Large workstreams must be divided into bounded publication batches; they are not requests to summarize an entire region in one article. Periods are editorial focus windows, not asserted founding or terminal dates for cultures or peoples.

| ID | Focus | Existing anchors to develop | Main additions or deeper treatment |
|---|---|---|---|
| AF1 | Great Lakes and Congo basin, principally 1200–1900 | Kongo; Mbanza Kongo | Buganda and Bunyoro; Rwanda and Burundi; Luba and Lunda; institutions, agriculture, exchange, oral evidence and later colonial encounters. Separate local sequences and qualify uncertain chronology. |
| AF2 | Sahel and West Africa, principally 700–1900 | Ghana/Wagadu, Mali, Songhai, Timbuktu, Benin, Asante, Dahomey | Kanem–Bornu, Hausa cities and Sokoto; links among existing states; scholarship, markets, farming, gender, enslavement and resistance. |
| AF3 | Nile, Horn, eastern and southern Africa | Egypt, Kerma, Meroe, Aksum, Makuria, Kilwa, Zimbabwe, Mapungubwe, Adwa | Egyptian and Kushite political continuity; Ethiopian and Horn sequences; Swahili towns and hinterlands; Madagascar; southern African societies. Publish as several subregional batches. |
| AF4 | Colonial rule, liberation and postcolonial societies | Numerous independence milestones; OAU/AU | Explain colonial economies, land and labour, resistance, liberation movements and nation building between the milestone dates. Avoid treating independence as the end of each country's history. |
| EA1 | Korea before Goryeo, principally 300–1000 | Gyeongju; Goryeo | Goguryeo, Baekje, Silla and Balhae; competing political centers, cross-border exchange, material culture and the transition to Goryeo. |
| EA2 | Japan before and between existing shogunate entries | Jōmon, Hōryūji, Nara, Heian, Kamakura, Muromachi, Edo, Meiji | Yayoi and Kofun societies; Asuka/Nara institutions; transitions among court and warrior governments; Tokugawa political overview; regional and everyday experience. |
| EA3 | Modern Japan, Korea and wider East Asian connections | Meiji, 1895 treaty, Korean division/war, postwar Japan, 1987 South Korea | Empire and colonial rule, civilian experiences, reform, economic and social change; Mongolia, Ryukyu and Ainu histories with appropriate distinct identities and sourcing. |
| CH1 | China: evidence and source depth | 975 imported events, source profiles, dynastic overviews | Continue claim-level corroboration, resolve the held location mismatch, deepen selected inherited profiles into biographies and make reviewed versus inherited evidence clear. |
| CH2 | China: society and regional experience | Existing cities, canal, texts, journeys and political records | Agriculture and food, markets and labour, women and family, regional communities, technology and environment; strengthen causal links rather than adding another list of rulers. |
| CH3 | China: remaining source comparison | Inherited phase maps and place layers | Audit historical rivers/water systems, roads and walls against the original source. Record missing functionality separately from missing historical research; preserve uncertainty and provenance. |
| WA1 | Ancient West Asia and the eastern Mediterranean | Uruk, Akkad, Babylon, Assyria, Hittites, Achaemenids | Connect existing overviews through Levantine, Anatolian and Iranian histories; religious and intellectual traditions, rural production, law, administration and exchange. |
| WA2 | Central Asia, especially after 1500 | Samanids, Qarakhanids, Ghaznavids, Ghurids, Golden Horde, Samarkand | Chagatai and later successor sequences; Bukhara, Khiva, Kokand and Kazakh histories; pastoral and settled societies; imperial incorporation and Soviet-era transformations. |
| WA3 | West Asia, principally 1800 onward | Ottomans, Qajars, Tanzimat, Iranian constitutional movement, Turkish republic, Yemen unification | Ottoman dissolution and mandates; Iran after the Qajars; Arab state formation; Israel/Palestine; Afghanistan and regional societies. Research contested interpretations and modern chronology carefully. |
| SA1 | Early South Asian societies and institutions | Indus cities, Maurya, Sanchi, Taxila, Kushan, Gupta | Vedic and early-state contexts; Buddhist, Jain and other intellectual traditions; languages, caste and social institutions; farming, trade and regional variation. |
| SA2 | Regional powers, principally 1300–1858 | Hampi, Delhi, Mughal, Deccan dynasties, Sikh Punjab, Plassey, Crown rule | Vijayanagara, Bahmani and successor sultanates, Maratha formations, Bengal and Company expansion; political transitions linked to taxation, agriculture and trade. |
| SA3 | South Asia beyond the main India narrative | Sri Lankan sites, Ceylon independence, Partition, Bengali language movement, Bangladesh liberation, Nepal republic | Pakistan, Bangladesh, Sri Lanka, Nepal, Bhutan and Maldives as continuing histories; migration, constitutional change, conflict and everyday life. Split into country/subregional modules. |
| SE1 | Mainland Southeast Asia, principally 900–1900 | Angkor, Bagan, Lý, Ayutthaya, Champa, Konbaung | Vietnamese Trần, later Lê and Nguyễn sequences; Khmer and Bagan political contexts; Taungoo, Lan Xang and Chakri; irrigation, religious institutions and regional exchange. |
| SE2 | Maritime Southeast Asia before colonial consolidation | Srivijaya, Borobudur, Majapahit, Melaka, Batavia | Malay-world Islamic networks; Aceh, Johor and Brunei; Philippine regional communities; Austronesian mobility, ports, commerce and local political diversity. |
| SE3 | Colonial and modern Southeast Asia | Independence milestones, Bandung, ASEAN, Vietnam, Khmer Rouge, Timor-Leste | Colonial economies and resistance; occupation and revolution; Indonesia, Vietnam, Laos and Cambodia through the Cold War; migration and social change. |
| NA1 | Indigenous North American regional continuities | Poverty Point, Hopewell, Cahokia, Chaco, Haudenosaunee, Pueblo revolt, Nunavut | Great Lakes, Plains, Pacific Northwest, Arctic and other distinct regional sequences; institutions, settlement, exchange and continuing sovereignty. Select bounded local cases rather than one generic Indigenous narrative. |
| NA2 | Colonization, land and forced movement | Quebec, proclamation/Niagara, American Revolution, Cherokee removal | New France, British colonies, Spanish/Mexican North America; epidemics, land dispossession, slavery, resistance, treaties and competing legal understandings. |
| NA3 | United States and Canada as social histories | Constitutional records, civil war, railways, suffrage, civil rights, space/science | Immigration, industrial labour, Canadian regional and constitutional developments, residential schools, urbanization and modern Indigenous movements. |
| LA1 | Mesoamerica and the Caribbean before and through conquest | Olmec centers, Monte Albán, Teotihuacan, Maya sites, Toltec, Mixtec, Purépecha, Mexica | Political and social sequences among existing places; Maya diversity and continuity; Caribbean Indigenous histories; conquest, alliances, disease and resistance. |
| LA2 | Andes before and through Inca expansion | Caral, Nasca, Tiwanaku, Wari, Chimú, Inca, road network | Chavín and Moche contexts; transitions between existing anchors; highland/coastal exchange, farming and labour; distinguish archaeological cultural distributions from state territories. |
| LA3 | Colonial Americas and the Afro-Atlantic world | Potosí, Cartagena, Sor Juana, Haitian Revolution, Brazil abolition | Colonial institutions, silver and plantations, Indigenous and African labour, maroon communities, religion, gender and resistance; Caribbean and Central American diversity. |
| LA4 | Independent republics and modern societies | Independence events, Gran Colombia, Brazil, Mexican Revolution, Cuba, MERCOSUR | National trajectories beyond independence; land reform, migration, dictatorship and democracy, Indigenous and Afro-descendant movements; avoid a single continental political narrative. |
| OC1 | Pacific political and exchange networks, principally 1000–1800 | Nan Madol, Taputapuātea, Lapaha, Rapa Nui, voyaging | Pohnpei, Yap, Samoa and Tonga; political authority, navigation, inter-island exchange and local knowledge. Link existing anchors without inventing direct voyages. |
| OC2 | Long Indigenous Australian and New Guinea histories | Budj Bim, Kuk, Lapita | Regional societies, ecological knowledge, trade and agriculture; living-community perspectives and continuity beyond the dates attached to archaeological sites. |
| OC3 | Pacific colonial and modern experience | Waitangi, New Zealand wars, Hawaiʻi, Mau, independence events, nuclear testing, Mabo | Land and sovereignty, indentured labour and migration, wartime experience, self-government, nuclear displacement and contemporary regional institutions. |
| EU1 | Ancient and medieval regional sequences | Greek places, Roman Republic/city, Eastern Rome, Frankish and early French/German dynasties | Roman imperial political sequence; Nordic, Slavic, Baltic, Balkan and eastern European histories; Iberian, Italian and imperial German continuities. |
| EU2 | Early modern Europe in global context | Renaissance/Reformation anchors, Dutch Republic, Westphalia, scientific institutions | Ottoman–European interactions, Habsburg and Polish–Lithuanian histories, religion and state formation, colonial commerce, labour, science and Enlightenment. |
| EU3 | Modern Europe beyond a few major turning points | Revolutions, industrial sites, world wars, Holocaust, Soviet Union, integration and reunification | Civilian and minority experiences; fascism and resistance; eastern Europe and the Balkans; postwar reconstruction, migration and social change. |

## Proposed delivery sequence

### Preparation: define coverage before adding volume

1. Split each broad region into editorial subregions and period outlines. Include a cross-region tag for topics such as Indian Ocean trade rather than duplicating the same event in several regions.
2. Track proposed, drafted, source-reviewed and bilingual-reviewed states. Keep territorial evidence separate from article evidence.
3. Match proposed topics to current IDs; prefer improving a weak existing entry to creating a near-duplicate. Inspect full narrative, facts and related reading before declaring a topic absent.
4. For each batch, name its learning questions, geographic focus and period. List intentionally deferred topics. Do not assign a global “percent complete.”

### First release: four focused regional batches

Start with **AF1, EA1, LA2 and SE1**. These address weak regional continuities and can connect to existing records immediately. Divide AF1 and SE1 into smaller subregional units if research cannot support a coherent bounded batch.

As an editorial planning range, each batch should deliver roughly **12–20 new or substantially expanded entries**, including **2–4 full biographies**, selected events and places, and only the political overviews needed to explain the sequence. These are scope estimates, not publication quotas; existing content and available evidence should determine the final mix. Four such batches imply roughly 48–80 additions or substantial revisions, not a commitment to create that many new IDs.

Review a bounded China sample in parallel with this release, documenting actual claim-level changes. Do not claim the full imported corpus has been verified after a sample review.

### Second release: broaden the foundation

Prioritize **OC1, NA1, SA2 and WA2**, then the remaining early/medieval continuity work. This brings Pacific, Indigenous North American, regional South Asian and Central Asian histories into the same level of connected treatment. Expand Europe through EU1 where political sequences remain discontinuous.

### Third release: societies and modern transitions

Develop the colonial, independence, postcolonial and modern workstreams across regions. Build on existing milestones to explain what changed between them. Add thematic readings on food and agriculture, work and slavery, women and family, belief and learning, migration, disease, technology and environmental change.

Thematic readings should reuse the same regional entries and stable IDs. They should not become a separate parallel collection disconnected from the atlas.

## Map and timeline work accompanying the content

- **Main timeline:** retain selected political entities and phases. Give detail through region filters and related reading. Events, biographies, sites, cultures and ideas do not automatically earn a main-timeline row. Civilizations and cultural traditions must not be relabeled as states to occupy space.
- **Premodern maps:** commission evidence and reusable geometry at meaningful transitions alongside each regional batch. An overview's date interval cannot justify extending one boundary unchanged throughout that interval. Use supported sites, corridors or qualified cultural areas when political outlines are unknown.
- **Modern maps:** current 1886–2019 annual selections and the contemporary reference layer provide map context; they do not establish adequate article coverage or daily boundary precision. Audit significant transitions separately.
- **China source comparison:** remaining historical water, road and wall layers need an explicit feature/evidence inventory. More prose alone will not restore those interactions.
- **Journeys:** distinguish a documented itinerary from a long-lived trade network. Every added route leg needs evidence, with uncertain dates left uncertain.

## Definition of a ready regional batch

Each batch should let a reader explain the principal transitions, identify several contemporaneous societies and connect political history to at least two social or economic processes. It should include meaningful biographies beyond rulers and military leaders where the evidence permits.

Every published addition or substantial revision needs:

1. Original English and Chinese synthesis with reviewed names, dates and terminology.
2. Claim-specific source notes. Seek at least two independent scholarly or institutional sources for substantive overviews; document a narrower evidence base explicitly rather than padding the reference list. Government or colonial documents require context about perspective.
3. A distinction between a representative point, a settlement's duration, a political focus interval and territorial control. Do not manufacture precise years where only a century or approximate period is supported.
4. Related links to relevant existing histories, people and places; reciprocal links where useful. A direct journey or causal connection requires supporting evidence.
5. Appropriate uncertainty, provenance and image/map licensing. Imported material remains identified as inherited until its claims are actually reviewed.
6. A short coverage statement listing what the batch develops and what remains outside scope.

Track completion against these declared outlines and review criteria. Do not rank regions by raw pin counts, equate a selectable year with an accurately reconstructed border, or describe this open-ended project as complete after one expansion.

## Research starting points

These are starting frameworks, not blanket support for the proposed entries. Inspect the relevant chapters, objects, documents and local scholarship before using them as evidence.

- [UNESCO General History of Africa](https://www.unesco.org/en/general-history-africa): regional and thematic outline, African historiography and bibliographies. Supplement with relevant African institutions and local scholarship.
- [UNESCO History of Civilizations of Central Asia, Volume IV, Part I](https://www.unesco.org/en/articles/history-civilizations-central-asia-v-4-age-achievement-ad-750-end-fifteenth-century-pt-i-historical?hub=185505): historical, social and economic framing; consult the other volumes for their respective periods.
- [Smithsonian NMAI Native Knowledge 360°: Essential Understandings](https://americanindian.si.edu/nk360/about/essential-understandings): framework developed with Native communities and educators; combine with nation-specific sources and scholarship.
- [Te Papa Pacific Cultures research](https://tepapa.govt.nz/learn/research/pacific-cultures-research): Pacific histories and collection-based research; supplement with island-specific and community sources.
- Existing atlas research registers already identify useful museum, archive and university leads for South Asia, Southeast Asia, East Asia, Europe and the Americas. Reuse the bibliography, while inspecting sources anew for each proposed claim.

The next implementation step is to prepare individual source-and-record outlines for the first four regional batches. No additional political timeline rows or territorial shapes are implied merely by listing a topic here.
