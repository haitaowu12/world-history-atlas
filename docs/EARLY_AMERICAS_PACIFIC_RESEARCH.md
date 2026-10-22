# Early Americas and Pacific supplement: source notes

Checked **2026-10-22**. Six new bilingual records in `v2-early-americas-pacific.json`. Research provenance below links the institutional pages and primary research abstracts actually opened. No current application files or prior expansion file were edited.

## Scope and validation

- Four Latin American records, one North American record and one Oceanian record.
- English summaries are 98–101 words, with Chinese translations, bilingual date notes, representative pins, importance, kind and source-specific evidence notes.
- `core.mjs` validation: zero errors for these six and for the combined 192 records (existing162 history +24 people +6 supplement). No duplicate IDs.
- At year1200, `chimu-chan-chan` and the endpoint of `chichen-itza-flourishing` are active; Chimú continues through the explicitly approximate1470 endpoint.
- The existing broad `lapita-voyaging` record remains distinct: this supplement examines a specific Vanuatu community through mortuary and isotope research.

## Date choices and interpretation

| Record | Display interval | Qualification |
|---|---|---|
| Chimú / Chan Chan | c.1000–1470 CE | The Met gives this flourishing interval for Chimor; the conquest date is approximate and earlier settlement is not excluded. |
| Chichén Itzá | c.600–1200 CE | INAH’s broad urban heyday. It is not an exact foundation/abandonment claim or the lifespan of Maya civilization. |
| Tiwanaku | 500–900 CE | UNESCO’s stated apogee; the city began earlier and persisted beyond the selected peak. |
| Wari | c.600–1000 CE | Broad imperial-art convention; local chronologies and causes of collapse differ and remain debated. |
| Hopewell | 1–400 CE | NPS’s local ceremonial florescence, not the entire Middle Woodland chronology. |
| Teouma Lapita community | c.1000–750 BCE | Rounded from published regular-use and final-interment calibrated BP ranges. BP has the conventional1950 reference, not2026. Possible earlier use remains uncertain. |

Chichén Itzá’s interaction with central Mexico is described without asserting that a stylistic resemblance proves a Toltec conquest or adopting the sources’ simplified League of Mayapán story. Wari and Tiwanaku are kept politically distinct. A Dutch-language section of the Tiwanaku UNESCO page calls Wari a colony; this was not used, because the specialist Wari essay explicitly describes distinct political societies.

Hopewell is identified as a modern archaeological label rather than a known ancient ethnic self-designation; the network is not presented as a centralized empire. Solar/lunar alignments and distant materials are documented, while no claim is made that every individual earthwork had the same astronomical purpose.

The Teouma sources are ANU-hosted records containing the authors’ research abstracts and bibliographic/DOI information. Those abstracts were read; no claim is made to have reviewed paywalled full texts. The isotope findings are described as evidence for probable mobility, not proof of specific origins or ethnic identities. Mortuary variation is described without turning tentative status interpretations into established fact.

All map points represent named sites or local reference areas, not exact building footprints or territorial boundaries. Summaries and Chinese translations are original synthesis. No media or source article text is redistributed.

## Opened sources

### chimu-met

- **Double-chambered vessel with monkey** — The Metropolitan Museum of Art
- https://www.metmuseum.org/art/collection/search/310616
- Retrieval: `turn173view0`. Used by: `chimu-chan-chan`.
- Evidence: Curatorial account explicitly places Chimor’s flourishing around 1000–1470 CE and describes Chan Chan, specialist silversmiths, elite patronage and ceremonial feasting. Approximate conquest chronology is retained.

### chanchan

- **Chan Chan Archaeological Zone** — UNESCO World Heritage Centre
- https://whc.unesco.org/en/list/366/
- Retrieval: `turn174view2`. Used by: `chimu-chan-chan`.
- Evidence: Outstanding Universal Value section describes the Chimú capital’s earthen compounds, palaces, temples, storage, reservoirs, craft sectors and irrigation. No disputed population total or exact imperial boundary is copied.

### chichen-inah

- **Chichén Itzá** — Instituto Nacional de Antropología e Historia, Mexico
- https://lugares.inah.gob.mx/en/node/4335
- Retrieval: `turn174view0`. Used by: `chichen-itza-flourishing`.
- Evidence: INAH gives a broad heyday around 600–1200 CE and describes paved sacbeob, the main ceremonial platform, buildings and relations with central Mexican architectural traditions. This is a selected focus window, not exact foundation or abandonment.

### chichen-unesco

- **Pre-Hispanic City of Chichen-Itza** — UNESCO World Heritage Centre
- https://whc.unesco.org/en/list/483/
- Retrieval: `turn170view1`. Used by: `chichen-itza-flourishing`.
- Evidence: Supports Chichén Itzá as a major Maya centre, architectural interaction with central Mexico, and the Temple of the Warriors, El Castillo and El Caracol. The record does not equate stylistic similarity with proven conquest.

### tiwanaku

- **Tiwanaku: Spiritual and Political Centre of the Tiwanaku Culture** — UNESCO World Heritage Centre
- https://whc.unesco.org/en/list/567/
- Retrieval: `turn171view7`. Used by: `tiwanaku-apogee`.
- Evidence: Supports the selected 500–900 CE apogee, Lake Titicaca setting, monumental ceremonial buildings, sophisticated drainage and raised-field agriculture. The 900 endpoint marks the chosen apogee, not abandonment or the end of the culture.

### wari

- **Wari Imperial Art** — The Metropolitan Museum of Art; José Ochatoma Paravicino
- https://www.metmuseum.org/essays/wari-imperial-art
- Retrieval: `turn174view3`. Used by: `tiwanaku-apogee`, `wari-imperial-world`.
- Evidence: Essay by a Wari-site researcher and archaeology professor supports the broad 600–1000 CE period, Ayacucho capital, D-shaped temples, Nasca and Tiwanaku interaction, ceremonial weaving and disputed causes of collapse. It explicitly treats Wari and Tiwanaku as distinct political societies.

### hopewell-nps

- **Hopewell Mound Group** — U.S. National Park Service
- https://www.nps.gov/hocu/learn/historyculture/hopewell-mound-group.htm
- Retrieval: `turn173view2`. Used by: `hopewell-ceremonial-networks`.
- Evidence: Describes ceremonial and mortuary gatherings, earthen enclosures, crafted objects and a local florescence in 1–400 CE. Also explains that Hopewell is a modern archaeological name derived from a later landowner, not a documented ancient self-designation.

### hopewell-networks

- **Hopewell Ceremonial Earthworks** — U.S. National Park Service
- https://www.nps.gov/hocu/learn/historyculture/hopewell-ceremonial-earthworks.htm
- Retrieval: `turn173view3`. Used by: `hopewell-ceremonial-networks`.
- Evidence: Supports geometric construction and long-distance connections reaching the Yellowstone basin and Florida. The narrative avoids calling the cultural network one centralized state.

### hopewell-unesco

- **Hopewell Ceremonial Earthworks** — UNESCO World Heritage Centre
- https://whc.unesco.org/en/list/1689/
- Retrieval: `turn170view3`. Used by: `hopewell-ceremonial-networks`.
- Evidence: Supports the ceremonial earthworks’ geometric design, solar/lunar alignments and ritual objects made with materials acquired from distant places.

### teouma-dating

- **Radiocarbon dating of burials from the Teouma Lapita cemetery, Efate, Vanuatu** — Australian National University research portal; Petchey et al., Journal of Archaeological Science (2014)
- https://researchportalplus.anu.edu.au/en/publications/radiocarbon-dating-of-burials-from-the-teouma-lapita-cemetery-efa/
- Retrieval: `turn171view1`. Used by: `lapita-teouma-community`.
- Evidence: Research abstract gives regular use by c.2940–2880 calibrated BP and last interments c.2770–2710 calibrated BP; the record rounds this to c.1000–750 BCE. BP is relative to 1950, not the browsing year. Possible earlier use is explicitly uncertain.

### teouma-burial

- **Lapita burial practices: evidence for complex body and bone treatment at the Teouma cemetery** — Australian National University research portal; Valentin et al., Journal of Island and Coastal Archaeology (2010)
- https://researchportalplus.anu.edu.au/en/publications/lapita-burial-practices-evidence-for-complex-body-and-bone-treatm/
- Retrieval: `turn173view4`. Used by: `lapita-teouma-community`.
- Evidence: Original research identifies multi-stage burial practices and variation among mortuary contexts. Interpretations of status and individual choice are possibilities rather than established explanations.

### teouma-mobility

- **Lapita migrants in the Pacific’s oldest cemetery: isotopic analysis at Teouma, Vanuatu** — Australian National University research portal; Bentley et al., American Antiquity (2007)
- https://researchportalplus.anu.edu.au/en/publications/lapita-migrants-in-the-pacifics-oldest-cemetery-isotopic-analysis/
- Retrieval: `turn173view5`. Used by: `lapita-teouma-community`.
- Evidence: Original isotope study of seventeen individuals identifies a majority consistent with local diets and four probable immigrants. The record preserves uncertainty and does not assign a specific birthplace or ethnic identity.

