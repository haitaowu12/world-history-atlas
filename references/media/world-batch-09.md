# World batch 09: Wellcome historical views

Thirteen authentic historical images newly illustrate twelve entries. Fourteen were researched; the owner held the Bologna anatomy-theatre photo because the target story specifically concerns the medieval university before 1300. All images were obtained from the independent Wellcome Collection catalogue and official IIIF services, with item-level Public Domain Mark evidence. No existing asset source URL, image URL, or SHA-256 matches the released catalogue.

## Deliverables

- Compatible catalogue shard: `research/v18/world-batch-09/shard.json`
- File-copy manifest: `research/v18/world-batch-09/copy-manifest.json`
- Source and rights receipts: `detail-*.json`, plus `manifest-gf5crxmv.json`
- Accepted ledger: `source-rights-ledger.json`; rejected searches: `rejected-ledger.json`
- Actual pixel review: `contact-sheet-final.jpg`
- Schema and coverage audit: `audit.json`

## Method and limits

The manifest-selected live catalogue and `loadAtlasRecords()` identified uncovered records. `auditHistoryMedia()` returned no errors. Each official derivative is at most 1,000 pixels on its longest edge and below 750,000 bytes. All 14 images were viewed in the final contact sheet; no local image edits were made. Contact sheets are review aids only.

The requested 35–50 image target was not reached: broad searches returned many unrelated or weakly matched images, which were excluded rather than used to inflate coverage. No denied image source was retried. A missing direct IIIF image location for the Delhi painting was resolved through the catalogue-provided IIIF presentation manifest, not through an alternate source or a denied route.

Creator/date limitations remain visible: Coalbrookdale and Bastille prints are undated in their item records. The Meiji print has the catalogue’s approximate date circa 1870; do not infer an exact bank-opening date from it. Bologna is a later view of the institution’s teaching tradition, not a picture of its medieval student associations. Rome is a later architectural vision, not an ancient view.

Extended-reading links are inherited from the matching Atlas record and retain that record’s prior source review, rather than being presented as newly fetched sources in this batch.

## Reviewed sources

The production shard and `docs/v18-world-batch-09-evidence.json` are the authoritative admission record. Captions and looking prompts were edited and translated during owner review. The following source ledger preserves the research findings.

### Venice’s Grand Canal

- Atlas story: venice-maritime
- Collection record: https://wellcomecollection.org/works/ff2yehun
- Creator/date: G. B. Brustoloni after Canaletto; 18th century
- Item rights: Public Domain Mark; https://creativecommons.org/share-your-work/public-domain/pdm/
- Relationship: An eighteenth-century view shows how boats, buildings and water formed a working city. Read it as a later view of the lagoon city, rather than a medieval scene.
- Further reading: https://whc.unesco.org/en/list/394/

### The iron bridge at Coalbrookdale

- Atlas story: ironbridge
- Collection record: https://wellcomecollection.org/works/g6u2rykr
- Creator/date: Unidentified engraver; Undated; depicts the bridge built in 1779
- Item rights: Public Domain Mark; https://creativecommons.org/share-your-work/public-domain/pdm/
- Relationship: The bridge and its structural diagram connect the finished landmark to the ironworking skills behind it. The print’s publication date and maker are not recorded.
- Further reading: https://whc.unesco.org/en/list/371/

### The storming of the Bastille, after Singleton

- Atlas story: french-revolution
- Collection record: https://wellcomecollection.org/works/efusb37c
- Creator/date: Unidentified engraver after Henry Singleton; Undated; depicts 14 July 1789
- Item rights: Public Domain Mark; https://creativecommons.org/share-your-work/public-domain/pdm/
- Relationship: This dramatic engraving turns 14 July 1789 into a public image of revolution. Its crowded composition is an artistic interpretation of the event, not an eyewitness photograph.
- Further reading: https://history.state.gov/milestones/1784-1800/french-rev

### News of Waterloo reaches Chelsea

- Atlas story: waterloo
- Collection record: https://wellcomecollection.org/works/wqwu4shh
- Creator/date: John Burnet after David Wilkie; 1831, after a painting of 1822
- Item rights: Public Domain Mark; https://creativecommons.org/share-your-work/public-domain/pdm/
- Relationship: Burnet’s 1831 engraving after Wilkie’s 1822 painting follows the battle into civilian life: news travels through reading, gathering and conversation.
- Further reading: https://www.nam.ac.uk/explore/battle-waterloo

### A hostile British image of the Paris Commune

- Atlas story: paris-commune-1871
- Collection record: https://wellcomecollection.org/works/xkff2t3q
- Creator/date: George Cruikshank; June 1871
- Item rights: Public Domain Mark; https://creativecommons.org/share-your-work/public-domain/pdm/
- Relationship: George Cruikshank portrayed the Commune through a fiery demon in June 1871. This is evidence of hostile political reception, not a literal portrayal of Communard actions.
- Further reading: https://www.carnavalet.paris.fr/le-nouveau-parcours

### Tokyo bridges, traffic and a bank

- Atlas story: meiji-restoration
- Collection record: https://wellcomecollection.org/works/hheyrprn
- Creator/date: Utagawa Kunisada II; Circa 1870, as catalogued
- Item rights: Public Domain Mark; https://creativecommons.org/share-your-work/public-domain/pdm/
- Relationship: The print connects early Meiji change with urban circulation and financial institutions. The collection dates it approximately to 1870; its subject is the changing city, not the 1868 transfer of power itself.
- Further reading: https://afe.easia.columbia.edu/main_pop/ps/ps_japan-charter-oath-1868.htm

### Qutb Minar and its surrounding monuments

- Atlas story: delhi-sultanate
- Collection record: https://wellcomecollection.org/works/gf5crxmv
- Creator/date: Ghulam Ali Khan; Circa 1820
- Item rights: Public Domain Mark; https://creativecommons.org/share-your-work/public-domain/pdm/
- Relationship: Ghulam Ali Khan painted the Delhi Sultanate’s architectural legacy around 1820, before additions to the tower in 1829. The view lets the later condition of the monument be distinguished from its medieval construction.
- Further reading: https://legacy.davidmus.dk/en/collections/islamic/dynasties/sultanates/art

### Excavating the Suez Canal

- Atlas story: suez-canal-opening
- Collection record: https://wellcomecollection.org/works/zkgw8fsx
- Creator/date: Mason Jackson; Circa 1864
- Item rights: Public Domain Mark; https://creativecommons.org/share-your-work/public-domain/pdm/
- Relationship: This engraving of construction around 1864 directs attention to the labour and earthmoving that preceded the canal’s 1869 opening.
- Further reading: https://www.suezcanal.gov.eg/English/About/SuezCanal/Pages/CanalHistory.aspx

### The Acropolis photographed around 1870

- Atlas story: athens-acropolis
- Collection record: https://wellcomecollection.org/works/hrjwe54r
- Creator/date: Petros Moraites; Circa 1870
- Item rights: Public Domain Mark; https://creativecommons.org/share-your-work/public-domain/pdm/
- Relationship: Moraites recorded parts of the Propylaea and the Temple of Athena Nike as ruins. The photograph documents a nineteenth-century condition of the ancient civic landscape.
- Further reading: https://whc.unesco.org/en/list/404/

### A later vision of the Baths of Diocletian

- Atlas story: rome-imperial-city
- Collection record: https://wellcomecollection.org/works/e236c678
- Creator/date: Robert Edler von Spalart, as catalogued; Circa 1804–1811
- Item rights: Public Domain Mark; https://creativecommons.org/share-your-work/public-domain/pdm/
- Relationship: This early nineteenth-century print presents an ordered architectural vision of an imperial bath complex. It is a later reconstruction-like image, not a surviving ancient view or a modern site photograph.
- Further reading: https://whc.unesco.org/en/list/91/

### Lucknow Residency after the rebellion

- Atlas story: indian-rebellion-1857
- Collection record: https://wellcomecollection.org/works/eq64426u
- Creator/date: Felice Beato; Circa 1858
- Item rights: Public Domain Mark; https://creativecommons.org/share-your-work/public-domain/pdm/
- Relationship: Felice Beato photographed the Residency’s damaged buildings around 1858. Ruins provide material evidence of the fighting while the camera’s selection remains part of a colonial photographic record.
- Further reading: https://www.nam.ac.uk/explore/why-did-indian-mutiny-happen

### Held: Bologna’s anatomy theatre

- Atlas story: bologna-medieval-student-universities
- Collection record: https://wellcomecollection.org/works/tc5wctnv
- Creator/date: Fotografia dell’Emilia; 19th century
- Item rights: Public Domain Mark; https://creativecommons.org/share-your-work/public-domain/pdm/
- Relationship: The nineteenth-century photograph shows a later home of Bologna’s teaching tradition. This early modern anatomy theatre is not an image of the medieval student associations themselves.
- Further reading: https://www.unibo.it/en/university/who-we-are/our-history/nine-centuries-of-history/nine-centuries-of-history

### Sunset over Singapore harbour

- Atlas story: straits-settlements-formation
- Collection record: https://wellcomecollection.org/works/xh96865n
- Creator/date: J. Taylor; 1879
- Item rights: Public Domain Mark; https://creativecommons.org/share-your-work/public-domain/pdm/
- Relationship: Taylor’s 1879 watercolour depicts one port within the Straits Settlements more than fifty years after the 1826 grouping. It offers a view of the maritime setting, not the founding agreement.
- Further reading: https://corporate.nas.gov.sg/discover-archives/media/lawoftheland/

### Chinese junks at Tanjong Katong

- Atlas story: straits-settlements-formation
- Collection record: https://wellcomecollection.org/works/n9vxe6at
- Creator/date: J. Taylor; 1879
- Item rights: Public Domain Mark; https://creativecommons.org/share-your-work/public-domain/pdm/
- Relationship: The 1879 watercolour adds working vessels and weather to the history of Singapore’s colonial port. Read it alongside the harbour view to compare the same place through different maritime details.
- Further reading: https://corporate.nas.gov.sg/discover-archives/media/lawoftheland/
