# Getty images 07: exact East Asian settings

Research-only delivery, 12 November 2026. No production, Git, upload or publication changes.

## Result

Five ready images add **six uncovered entries**. Two separately packaged images could add three more entries after the supplied historical corrections are reviewed. All seven prepared assets have item-specific Getty CC0, an unchanged official IIIF JPEG, SHA-256 and dimensions, bilingual reader text, full original target records and an individual pixel review. The largest ready file is 311,396 bytes; maximum side is 1,200 pixels. The five ready images total 1,206,346 bytes.

- Guangzhou examination compound, Rossier, 1858–1859 → `china-event-qing-048`.
- Ieyasu’s actual tomb at Nikkō, about 1875–1890s → `tokugawa-shogunate-establishment`. The full entry explicitly discusses posthumous sacred memory.
- Edo Castle moat, Beato, 1863–1868 → `japan-tokugawa-domains` and `tokugawa-shogunate-political-order`.
- Kinkaku-ji, 1850s–1890s → `muromachi-shogunate`. The photograph predates the pavilion’s destruction in 1950 and reconstruction in 1955.
- A couple catalogued as Ainu in Hokkaido, Genthe, 1908 → `ainu-language-cultural-continuity`. Identity comes from the catalogue; no particular textile, maker, language use or uniform community experience is inferred from the image.

## Integration files

- Ready shard: `research/v18/getty-images-07/visual-assets-getty-images-07-v18.json`.
- Full records, relationship decisions, observed pixels and local-to-production file mapping: `admission-dossier.json` in the same folder.
- Conditional shard: `conditional-assets-getty-images-07-v18.json`. **Do not integrate it until its narrative corrections have been reviewed and applied.**
- Exact originals, scoped replacements and fresh evidence: `historical-correction-proposals.json`.
- Item JSON-LD, API responses, saved HTML, web-context receipts, `rights-receipts.json` and `download-receipts.json` retain the evidence.
- `audit.json`, `schema-validation.json` and `target-prior-decisions.json` provide checks. Both prepared shards pass `auditHistoryMedia` with no errors. Ready and conditional sources/images/hashes were compared with the current catalogue and pending Getty 06.

`build.py` reproduces the shards and dossiers without touching production. The Guangzhou compound’s verified photographer is **Pierre Joseph Rossier**; Negretti & Zambra is the publisher. Ieyasu’s photograph is **attributed to Farsari or Tamamura**, not a joint or certain authorship; that distinction comes from the API producer qualifiers.

## Correction proposals kept separate

1. `china-event-qing-037` and `china-landmark-066`: English says the eight regents were ousted, but Chinese says “诛肃顺等八大臣.” The [Palace Museum’s account](https://www.dpm.org.cn/court/event/156213.html) distinguishes Sushun’s execution, Zaiyuan and Duanhua’s compelled suicides, and removal of the remaining regents. The proposal fixes the Chinese titles and supplies matching summaries. The Prince Gong portrait remains held until then.
2. `china-landmark-266`: the entry’s 1842 bundle joins cession and Victoria City’s foundation. The [Hong Kong Lands Department](https://www.landsd.gov.hk/en/survey-mapping/historical-bdy-stones/victoria-city-bdy-stones.html) records land sales in 1841 and official naming on **29 June 1843**. The proposal retains the 1842 cession anchor while stating the surrounding chronology. The later Lai Afong photograph remains held until then.

These are corrections to independently checked chronology and wording, not rewritten stories to fit pictures.

## Important holds

- Getty [109C3K](https://www.getty.edu/art/collection/object/109C3K) inherits a title identifying “Yuan Ming Yuan.” The [Canadian Centre for Architecture](https://www.cca.qc.ca/en/search/details/collection/object/13851) explicitly identifies an identical published view as **Qingyi Yuan, now Yiheyuan**, a different garden complex. [MIT Visualizing Cultures](https://visualizingcultures.mit.edu/opium_wars_02/ow2_essay05.html) independently discusses misidentification in Beato’s palace series. It is **not** admitted for the Old Summer Palace entries. The full supporting web captures are retained.
- Getty [108QBA](https://www.getty.edu/art/collection/object/108QBA) is titled “The Examination Halls in Canton,” but its own description says **Hualin Temple / Temple of the Five Hundred Genii**. It is held rather than silently preferring its title. The separately catalogued Rossier image is used instead.
- Rossier’s companion examination-ground stereograph is rights-verified and pixel-inspected, but held as a fainter, redundant view. No second asset is added solely to inflate the count.
- Generic city views, wrong Great Wall sections, unidentified canals and old photographs unrelated to the actual event were not promoted into target links. The specific Ainu robe entry was not illustrated with a different person’s clothing. Kinkaku-ji was not linked to the Ōnin War just for being in Kyoto.

## Source method and bounds

Loaded the complete assembled targets with `loadAtlasRecords(readAtlasData('content-expansion-v18.json'))`, preserving originals. Read existing-links 08/09 and prior hold ledgers; no previous decision on the nine proposed ready/conditional targets was found. Checked current and Getty 06 assets for source URL, image identity and SHA duplication.

Used Getty’s official public application endpoint, `/art/collection/api/search?q=…&open_content=true&size=20`, to discover candidates. Search results are discovery only; each selected object’s public HTML JSON-LD supplied explicit CC0 and object identity, and API producer fields supplied qualifiers absent from the JSON-LD. Forty-three bounded search queries led to **10 candidate object pages**, below the 40-page ceiling. Search/fetch scripts pause before requests; final image retrieval was serialized. Two HTML receipts were recovered from the completed fetch output after overlapping receipt writers, with that provenance stated in the log. No blocked source was bypassed.

Official `media.getty.edu` IIIF renditions were requested at `!1200,1200`, capped at 750,000 bytes, decoded and opened individually. Source mounts and stereo pairings are retained without local image edits. Eight downloaded files were inspected: five ready, two conditional and one redundant hold. No Commons, Met/Cleveland, AIC, LoC, NASA/NPS, NDL, NYPL, Rijks, Harvard, NPG/NMAfA, NLA/SLNSW/Walters or blocked UNESCO image route was used.

## Owner integration review

All seven images and nine exact target connections were accepted after independent pixel, metadata and full-record review. The three proposed record corrections were applied through the separate review layer; frozen imported records remain unchanged. Ainu wording avoids an inferred marital relationship; Kinkaku interpretation no longer claims the photograph visibly proves trade with Ming China. Attribution to Farsari or Tamamura remains qualified. Duplicate context links for the correction sources were removed from the two image cards because those sources appear with their entries.
