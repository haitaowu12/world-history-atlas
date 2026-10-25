# Application 0.13.0: dated Americas, mineral palette and map views

25 October 2026. Extends application 0.12.0 / narrative V12. The collection remains 1,863 entries and 170 biographies; Carver's new 1896 Tuskegee milestone brings life milestones to 535.

## Demonstrated causes and correction

The previous source selector left the US without an eligible political fill before 1867; the late source used from 1867 could overlap the 1815 Russia source's Alaska components. Canada first appeared at the 1886 CShapes seam, rather than at Confederation. CShapes also codes Alaska/Hawaii separately before statehood and Newfoundland at a 1948 source date. Merely changing colors cannot correct those source choices.

Newberry's historical state/territory units replace US political geometry only within 1783–2000. NRCan territorial evolution stages replace Canadian units only within 1867–2003. Outside those windows the existing global source selection remains; no pre-1783 US or pre-1867 Canadian geography is invented. Raw global geometry stays frozen. A separately documented runtime amendment removes only the 15 Alaska components from the 1815 Russian multipolygon from 1867, preserving its Chukotka/Eurasia components and source year. The 1878 Mexico source is withheld in 1853 to avoid premature Gadsden transfer interpretation. Treaties and source extents remain approximations rather than uniform occupation or Indigenous sovereignty.

Direct references inspected in a browser:

- NARA, Alaska treaty/payment: https://www.archives.gov/milestone-documents/check-for-the-purchase-of-alaska . Treaty signed March 30, 1867; ratification exchange June 20. Year-end display selects the later administrative context; exact transfer-day geometry is not supplied.
- Yale Avalon, Gadsden Treaty, Article IX and proclamation: https://avalon.law.yale.edu/19th_century/mx1853.asp . Signature December 30, 1853; ratifications exchanged June 30, 1854. Source signing-date field is preserved; display interpretation begins in 1854.
- Newberry: https://publications.newberry.org/ahcb/pages/United_States.html and https://www.newberry.org/rights-and-reproductions . Packaged CC BY-NC-SA 2.5 retained despite the broader current public-reuse statement.
- NRCan catalog: https://app.geo.ca/en-ca/map-browser/record/e88ce995-b69a-4595-a752-bb06b061b5a3 and https://open.canada.ca/en/open-government-licence-canada . Required attribution is included in the distributed license notice.

## Reproduction and limits

Pinned archive names and SHA256 are in `dist/data/americas-history.json` and the generator. Run `python scripts/build-americas-history.py /path/to/input-directory` in a build environment with pyogrio 0.13.0, shapely 2.2.0 and pyproj 3.8.0. No network calls or app runtime dependencies are added. NRCan's `political_divisions_politique_1867_2003` layer is reprojected from EPSG3978. Simplification is .04 degrees Canada / .02 degrees US, with .0001-degree rounding and D3 ring winding. Source IDs, original date fields, names, types and citations remain inspectable. Parent names are placed at existing representative unit points, never new polygons.

US START_N/END_N intervals are sampled at December 31 into 69 distinct year-end selections. NRCan uses explicit HISTO snapshot years, giving 23 stages; a stage is a contextual reference until the next supplied stage, not an annual survey. Broad START_TIME/END_TIME fields do not justify relabeling modern geometry as 1867. One identical Manitoba row in 2003 is removed and recorded. US Other units (including independent republics and disputed/unrecognized claims) and Oregon joint occupation retain separate classifications; they do not become US federal extent. Civil War state frames are administrative references, not Union/Confederate fronts. These data do not map Indigenous territorial sovereignty or settle competing titles. Canadian source stages omit some intermediate changes. Names may fall back to the original English when no reviewed Chinese equivalent exists.

Geometry totals 8,106,403 bytes: 2,314,425 US shared units and 5,791,978 Canadian stages. Individual shards remain below 450,000 bytes. Only eligible dates load them; initial year 1200 does not. US units are shared across epochs rather than duplicating country-wide polygons. File cache is bounded at 14 and phase frames at eight. No latency/FPS improvement is claimed.

## UI direction and behavior

The authorized mineral palette uses slate/navy typography, cool white surfaces and pale blue ocean; categorical fills use consistent parent colors (US blue, Canada ochre, British North America coral, Russia plum). Original geometry/source colors remain available in the data. Distinct identities do not merge merely because colors match. Existing editorial serif/sans hierarchy and the map/results/reader workflow remain.

The updated Second Brain frontend skill, UI design-delivery guide and selective Impeccable task-review/type guidance informed the audit. This is a manual adaptation, not a run of an Impeccable engine or an accessibility certification.

## Research model triage

Gemini's initial upstream/static review could not inspect current atlas data; its later URL attempt also failed. Its useful follow-up received exactly three current biography records (Sacagawea, Ware, Carver) and the Ibn Battuta Hajj route inline. That response explicitly performed internal-consistency/source-fit review without opening external sources. The accepted changes clarify representative pin semantics and add Carver's independently corroborated 1896 appointment. Generic claims that every `approximate:false` was a location error were not adopted: the field describes the milestone date, while representative location caveats remain separate. English-only location labels remain a bounded bilingual backlog; core narrative caveats remain bilingual. Ibn Battuta detail leads remain unadopted pending fresh source inspection. No complete chronology or roadmap validation is claimed.

Five explicit map anchors in `reading-map-anchors.json` keep the thematic NA2 reading order while choosing Navajo 1864, Fort Laramie 1868, Red River 1870, Indian Act 1876 and National Policy 1878. Article ranges and earlier path stops remain intact; map focus no longer jumps the Indian Act article midpoint to 1931.

Carver's new source: Iowa State University Museums, https://museums.iastate.edu/news/let-me-introduce-you-george-washington-carver (explicit 1896 acceptance of Washington's invitation). NPS biography and Tuskegee legacy page were re-inspected; Tuskegee's linked chronology was a 404, not verified evidence. Ware's Parks Canada page was re-inspected for historical district and traditional-territory context: https://parks.canada.ca/culture/designation/personnage-person/john-ware . Birth and first-ranch disagreements remain unresolved. Sacagawea's competing NPS/MHA accounts remain intact; pin clarification does not resolve them.

Toronto/Borealis CC BY-NC 4.0 terms were explicitly approved by the user. Its Accept/download control did not complete after semantic and observed-coordinate attempts. No Toronto file was imported and no alternative access path bypassed that control.

## Remaining development

Continue dated regional work outside these two countries and earlier North American periods; add community/tribal sources for Indigenous geographies and living continuities. Independently inspect queued Jiangshan person/landmark leads and Ibn Battuta detail claims. Seek specialist, community and bilingual review. Automated contracts and bounded model reviews do not establish comprehensive factual accuracy, learning outcomes or source completeness.

