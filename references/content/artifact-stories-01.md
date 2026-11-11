# Three artifact-centered story drafts

Reviewed 2026-11-11. Source-research record followed by owner integration notes below. Publication remains pending the full visual pass.

- `research/v18/artifact-stories-01/history-drafts.json`: three original bilingual culture records following the assembled record schema, without expansion/release metadata.
- `research/v18/artifact-stories-01/image-mapping-draft.json`: proposed reuse of existing reviewed assets. No new images downloaded.
- English narratives: 173, 175 and 179 words; Chinese gives equivalent narratives, not shortened captions.

## Cao Zhenxiu’s 1799 commission

ID: `cao-zhenxiu-famous-women-album`. Existing Ban Zhao coverage concerns the Han scholar’s work, not the Qing commission that produced her later image. The new story addresses patronage, selection of exemplary women and combined poetic/pictorial authorship. Link: `china-person-ban-zhao`. Image: `china-batch-03-ban-zhao`.

Sources read:
1. https://www.metmuseum.org/art/collection/search/733847 — introductory paragraphs and Artwork Details: 1799, sixteen-leaf album, Cao’s poems and commission, Gai’s varied brushwork.
2. https://www.tretyakovgallerymagazine.com/news/metcollects-metropolitan-museum-art-episode-10-2017 — Joseph Scheier-Dolberg’s 2017 MetCollects essay, opening and middle paragraphs: choices of exemplary women and Gai’s early reputation. This is a reprinted Met curator essay, not independent institutional corroboration. Its apparent attribution slip in the third paragraph is not reproduced.

Evidence limits: no reviewed source identifies the physical place of commission or painting. The marker at 35 N, 105 E is only a deliberately broad China reference, not a studio, city, birthplace or travel claim. Prefer a regional map treatment if available. The reused Ban Zhao image is one leaf; it does not show the entire album or Cao’s likeness. No claim of a revolutionary program, universal audience, exact leaf sequence or contemporaneous Han likeness. The British Museum exhibition-guide PDF appeared in search but returned 403 on opening; it is not a cited or relied-on source.

## Chuquibamba’s star-patterned tunic

ID: `chuquibamba-stars-imperial-tunic`. Existing `inka-imperial-tunic-story` concerns a different black-and-white checkerboard tunic (Met 751901). This story centers the newly illustrated Met 308120 and its current local-maker attribution, particularly contrasting square centers within stars. The scholarship comparison overlaps the earlier entry, but the object, observable detail and attribution question are distinct. Related IDs: that story and `inca-imperial-expansion`. Image: `world-batch-02-met-308120`.

Sources read:
1. https://www.metmuseum.org/art/collection/search/308120 — introductory paragraphs and Artwork Details: current Chuquibamba artist attribution, local continuity under Inca rule, star-center distinction, adopted proportions, object dates 1460–1540.
2. https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0280511 — abstract and introduction: the Caleta Vitor case and authors’ interpretation of local technical/stylistic decisions within imperial production.

Evidence limits: PLOS analyzes another garment from northern Chile, not this museum object. It does not establish this garment’s workshop, wearer, commission or precise date. The current Met API still labels culture as Inca while naming a Chuquibamba artist; follow its more specific current curatorial attribution rather than treating these as mutually exclusive political/cultural categories. The numerical dates are the object range, extending across conquest; do not label the whole interval securely preconquest. Coordinates 16 S, 72 W are a broad southern-Peru reference only, not an archaeological findspot or precisely documented workshop.

## Domestic terracotta in Majapahit

ID: `majapahit-clay-domestic-architecture`. Existing `majapahit-java` supplies polity and city context; this story instead begins with a small column surround and moves to domestic clay production. Link: `majapahit-java`. Image: `world-batch-02-met-38577`.

Sources read:
1. https://www.metmuseum.org/art/collection/search/38577 — introductory paragraphs and Artwork Details: terracotta column surround, pose, clothing and hairstyle, 14th–15th century, possible narrative series.
2. https://whc.unesco.org/en/tentativelists/5466/ — Description, especially the inventory of terracotta objects: household containers, money boxes, molds, roof tiles and pipes; wider settlement and industrial context. This is Indonesia’s 2009 state-party submission hosted by UNESCO, not a World Heritage inscription or an independent UNESCO endorsement of every claim.

Evidence limits: Trowulan is the contextual capital associated with this architectural type, not a documented excavation location for the Met object. Its particular building, maker, subject identity and narrative sequence are unestablished. The 1300–1500 display envelope represents a two-century museum attribution, not exact beginning or ending events. Coordinates match the existing Trowulan reference and fall within the submitted site’s coordinate bounds. Avoid repeating the nomination’s sweeping planning, uniqueness and ethnicity assertions.

## Integration review

On 2026-11-11, `loadAtlasRecords()` from `scripts/lib/atlas-records.mjs` confirmed that all three proposed IDs are unique against the assembled catalogue and all related IDs exist. The source notes are bilingual; reference geography is stated in both languages. No expansion release/edition/workstream assigned. No dist, manifest, build, tests, Git or deployment changes. Owner should decide final integration and whether to add reciprocal related links. Mapping file is a proposal, not a visual-manifest mutation.


## V18 integration, 11 November 2026

The owner admitted all three stories in `artifact-stories-v18.json`, release 12 / edition v18, with their object-specific image links. The Cao narrative was tightened, date notes shortened and second connected readings added for Qing context and contemporary Vietnamese ceramic work. The latter is comparative reading, not evidence of a direct connection between the two objects. All three map points explicitly describe regional or architectural context and are excluded from inferred modern-area membership. Two older linked entries received additive Chinese place captions without changing labels, dates or coordinates.

Three image studies pair the Inka and Chuquibamba tunics, two Harappan water spaces, and Yongle / Encyclopédie pages. Observations preserve manuscript-copy dates, uncertainty about the Great Bath’s use and collection-specific object identities. Existing image credits and rights remain visible.
