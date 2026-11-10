# V17 release evidence — 0.23.0

Release cycle: 9 November 2026; completion and validation continued on 10 November UTC. This receipt describes the tested output on `review/atlas-completion-20261109`. The content build, full local check and scoped browser review are complete. Firebase has not been updated by this continuation.

## Recovery and durable checkpoints

The verified recovery baseline is [`3849fb809e9340e0a06ffa9329c0cdcdb3f733a0`](https://github.com/haitaowu12/world-history-atlas/commit/3849fb809e9340e0a06ffa9329c0cdcdb3f733a0), including its homepage backlinks. The earlier feature branch remains separate. No accessible prior uncommitted draft or handoff was recovered; reported activity in the stalled conversation was not treated as committed content. The [recovery record](ATLAS_RECOVERY_2026_11_09.md) records the accessible-state check and its limits.

The latest pushed checkpoint before final integration is [`300c2708a1e0d46337c8f0918d3005a863b5300e`](https://github.com/haitaowu12/world-history-atlas/commit/300c2708a1e0d46337c8f0918d3005a863b5300e). It preserves all 101 biography drafts, the media review and the CH3 source comparison. Earlier coherent checkpoints are retained in the branch history. That SHA is a recovery checkpoint, not the final integrated release receipt.

**Tested release checkpoint:** [`07890359d4850611fd6e4aafe8d41d4b665c30a5`](https://github.com/haitaowu12/world-history-atlas/commit/07890359d4850611fd6e4aafe8d41d4b665c30a5), tree `451c765e70184517d02e5009d3ab334e892de650`. The pushed tree matches the tested local tree, including prepared application/data files, research records, command output and screenshots. This receipt's subsequent documentation save records that successful push. Main and the existing feature branch have not been overwritten or merged by this continuation.

## Completed content scope

The [V17 manifest](../dist/data/content-expansion-v17.json) assembles the existing release with 148 new narrative records. Its file counts, byte sizes and SHA-256 values are checked against the shipped data.

| Measure | Recovered V16 baseline | V17 addition | Prepared V17 total |
| --- | ---: | ---: | ---: |
| Historical entries | 1,936 | 148 | 2,084 |
| Full biographies | 177 | 101 | 278 |
| Distinct People-directory entries | 278 | 0 | 278 |
| Guided readings | 73 | 30 | 103 |
| Historical images | 16 | 13 | 29 |

The 101 biographies complete the profile-only backlog identified in the recovered directory. They retain stable IDs, bilingual names, aliases and reference links. Together they add **330 dated milestones**. Six records carry explicit, source-linked reviews explaining why only one or two dated episodes are supported: Mencius, Sun Bin, Qu Yuan, Wang Xizhi, Tao Yuanming and Chen Sheng. Supported focus intervals are distinguished from inherited lifespan spans.

The **47 bilingual stories** cover Africa (5), West/Central Asia (6), Europe (7), East Asia (6), South Asia (3), Southeast Asia (4), North America (5), Latin America (5) and Oceania (6). Every new story appears in at least one of the **30 new readings**. Existing reading IDs, stop order and shared links are preserved. New readings connect documented settings without inventing travel routes.

This completes the agreed **101-biography / 47-story / 30-reading** increment. The [expansion plan](CONTENT_EXPANSION_PLAN.md) still contains 32 broader regional workstreams; their continuing research is not described as finished by this release.

## Language, discovery and location presentation

All new narratives have English and Chinese titles, prose, date notes, main-place labels, milestone-place labels and source-specific evidence notes. The [place-caption review](V17_PLACE_LABELS.md) additionally supplies **149 reviewed Chinese captions for older linked records**, preserving their exact English labels and geographic qualifications. The independent language review corrected the subsequent-capital wording for Ming and Ottoman labels and reconciled the established Chinese name for Kültepe.

For the 975 inherited imported events, the display module reuses **970 exact paired source labels** and **five guarded translations of amended captions**. These retain the distinctions around Dujiangyan, Cai Lun's court setting, disputed Yizhou identification, Bi Sheng's unverified workshop and Zheng He's final-voyage port. An overlay applies only when both the record ID and English input match, and it does not overwrite an authored Chinese label. Coordinates, dates and source review status remain unchanged by the translation pass.

Original search normalization handles tone marks, accented text, compatibility width and repeated spaces across the map, People, reference directories and readings. Stable identity comparisons and displayed names retain their existing rules.

# Sources and review

The 148 new records cite **236 distinct source URLs**, as counted by the content build. Source notes identify the inspected claims and retrieval method; the three author ledgers preserve chronology choices, source disagreements and geographical limits:

- [Early China, Africa, West/Central Asia and Europe](V17_EARLY_CHINA_AND_AF_WA_EU_RESEARCH.md): 34 biographies, 103 milestones, 18 stories and 10 readings.
- [Medieval China and Asia](V17_MEDIEVAL_CHINA_AND_ASIA_RESEARCH.md): 34 biographies, 118 milestones, 13 stories and 10 readings.
- [Later China, the Americas and the Pacific](V17_LATER_CHINA_AND_AMERICAS_PACIFIC_RESEARCH.md): 33 biographies, 109 milestones, 16 stories and 10 readings.

Sources include historical texts, scholarly publications, museums, archives, community institutions and official records used for the claims they support. Modern translations and catalogue prose inform original bilingual synthesis; their wording is not imported as atlas prose. Source access and citation do not grant image rights.

Peer review corrected material distinctions including Fan Zhongyan's 1034 appointment versus the 1035 school foundation; An Lushan's 755 rebellion versus the 756 imperial proclamation; Mao's 1943 office; Deng's 1956 electing body; and Kangxi's 1689 tour versus its later painted commemoration. The ledgers record the relevant evidence and changes. The Africa/West Asia/Europe story review also reopened all 28 cited URLs for its 18 stories and requested no further correction. Newly reviewed articles do not certify every inherited record to which they link.

### Jiangshan and inherited geography

The [Jiangshan delta review](JIANGSHAN_REVIEW_V17.md) examines four commits after `5be0dd1ae8550ea7376dde6aa95dd9c4eabe827e`, through `cfdd892b3f69d0d1abce975ea887fc4a1ec1dab0`. The delta supplies useful connected-reading and search-parity methods, with credit; it contains no new batch of biographies or narrative records to import. V17 imports no new donor code, prose, translations, screenshots or geometry.

The [CH3 source comparison](CH3_SOURCE_COMPARISON_V17.md), with its [machine-readable receipt](CH3_SOURCE_COMPARISON_V17.json), checks **187 rivers, 62 lake edges, 41 water labels and 16 corridors** against pinned source blobs. It identifies the two existing timeline caps from source end year `9999` to atlas year `2026`. This establishes source correspondence and an implementation inventory. Historical interpretation and individual feature provenance/rights remain separate research questions. It is not blanket clearance of the inherited non-polygon geometry.

The [acknowledgements](../ACKNOWLEDGEMENTS.md), [content licence](CONTENT_LICENSE.md) and existing per-file notices retain the donor licence discrepancy and other third-party terms. Original atlas narrative and teaching expression use CC BY 4.0; third-party material keeps its own notices.

### Images and rights

The [V17 media catalogue](../dist/data/history-media-v17.json) preserves all sixteen earlier item objects and adds **eleven public-domain portraits or depictions and two Metropolitan Museum of Art CC0 object photographs**. The [image review](HISTORICAL_MEDIA_V17.md) and [file-specific notice](../dist/assets/history-media/NOTICE.md) record creators, collections, file sources, rights, dates and transformations.

The image-review receipt records file-page/API inspection, downloaded-file decoding and visual inspection. Each catalogue item has bilingual caption and alt text, a representation category, source and rights links, dimensions, byte count and SHA-256. Later depictions of Qin Shi Huang, Su Shi and Li Bai remain labelled as later portrayals. Equiano's admitted engraving has an identified sitter and print attribution; the catalogue uses the Commons/Gutenberg scan rather than a separately supplied National Portrait Gallery image. The two Met photographs depict the Mangaaka figure and a Vietnamese ceramic dish. No uncertain new portrait identification or generated historical reconstruction is added.

## Local verification

The integration owner ran the following checks against the completed V17 inputs. The command receipts were inspected when this release note was prepared.

| Check | Observed result | Scope |
| --- | --- | --- |
| `npm run build:content` | Exit 0 | Generated 2,084 total records; additions 101 biographies, 330 milestones and 236 distinct source URLs; 148 new records in all. |
| `npm run check` | Exit 0; **325/325 tests passed**, zero failed, skipped or cancelled | Data validation and complete local regression suite. |
| Assembled inventory comparison | 2,084 unique IDs; 278 biographies and directory people; 103 readings | Confirms release totals and that every directory person resolves to a biography. |
| Reading and media preservation | Existing reading objects and sixteen prior media item objects unchanged | Protects prior shared reading structure and attribution. |
| Release-document review | Counts, publication wording, rights scope and relative references reviewed | The final receipt link was intentionally pending creation during that check. |

The full local suite includes manifest/hash consistency, stable profile identity, chronology exceptions, related IDs and reading anchors, bilingual source/place fields, guarded caption overlays, historical media integrity and links, search normalization, and existing map/date/accessibility-related regressions. These checks validate data and application contracts; the claim-by-claim historical evidence is recorded in the source ledgers.

The [build receipt](v17-evidence/build-output.txt) and [complete check receipt](v17-evidence/check-output.txt) retain the observed command output in the repository. Browser evidence is listed below.

## Browser and accessibility review

The completed output was exercised through the supported shared-browser preview on 10 November 2026 UTC. The development-only [viewport harness](../scripts/browser-review.html) supplied 768, 390 and 320 CSS-pixel iframe widths; the desktop preview used the browser's full viewport. The temporary copy of that harness was removed from `dist` after review.

| Observed behavior | Result |
| --- | --- |
| People directory and accented search | The directory displays 278 people. `Lǐ Bái` finds the Li Bai biography and a separate Xuanzong entry whose text mentions him; there is one Li Bai identity. |
| Portraits and keyboard filtering | Space toggles the portrait filter. Li Bai's image loads, and the caption distinguishes Liang Kai's thirteenth-century depiction from an eyewitness likeness. Collection and public-domain links remain visible in English and Chinese. |
| Narrow portrait and object layouts | Li Bai's dialog and the Hội An ceramic story were read at 390 and 320 pixels. After images loaded, document scroll width equalled available document width; dialogs and text did not create page-level horizontal overflow. The separate timeline rail retains its intentional horizontal scrolling. |
| Keyboard focus | Escape closes the People dialog and restores focus to `people-nav`. Enter on the Chinese story's evidence button moves focus to `entry-sources`. |
| Limited chronology | Mencius's Chinese biography opens from its shared URL, displays its one supported approximate episode, and opens a finite, usable one-point map view. |
| Translated related places | Mencius's People view displays Chinese captions for the older Zhou record and imported Daliang, Jixia and Zou entries. Li Bai's related entries retain their Chinese place captions. |
| New reading and sharing | The catalog displays 103 readings. The five-stop *Cloth and the many hands of authorship* reading starts at Kuba raffia, advances to Bukhara suzani, copies a URL containing the reading ID and step, and restores stop 2/5 in a separate tab. Switching the phone view to Chinese preserves that stop. |
| Object attribution and source access | The Hội An story loads the Met dish photograph, bilingual caption, probable-origin qualifier, museum credit, CC0 link and two source notes. |
| Console inspection | No application-origin errors were present in the captured preview and responsive-tab error logs. Browser-extension metadata errors were excluded from the application result. |

Evidence images: [English desktop portrait](v17-evidence/desktop-en-li-bai.jpg) and [Chinese phone object story](v17-evidence/phone-zh-hoi-an.jpg). These screenshots document selected views; this was a scoped manual browser review, not an exhaustive assistive-technology audit.

Standalone Playwright could not launch under the runtime's local-socket restriction. Automatic approval review rejected the requested sandbox escalation; the rejected action was not retried. The browser observations above were made through the supported CUA surface without changing security or access settings. The standalone acceptance script was updated for the active manifest and syntax-checked, but no successful run of that script is claimed.

## Publication and Actions pause

The deployment destination remains [the existing Firebase site](https://world-history-atlas-guide.web.app/), project `tony-wu-projects`, site `world-history-atlas-guide`. **Publication is blocked by the absence of an existing authorized direct Firebase deployment session in the accessible environment.** A read-only live browser check on 10 November UTC found **1,936 entries and 162 state overviews**, with the Tony Wu homepage backlink present. No Firebase deployment or live V17 verification has occurred in this continuation. The minimum missing prerequisite is an authorized direct deployment session for that existing project/site; no new security setting or access workaround is proposed.

The workflow triggers were inspected before checkpoints: pushes to `main` or `feature/atlas-*`, pull requests, and manual dispatch can run `.github/workflows/firebase-hosting.yml`. The recovery branch is outside the push patterns, and checkpoints use `[skip ci]`. No pull request was opened, and no GitHub Actions workflow was dispatched, retried or triggered by this continuation. The user's pause remains in force before December 2026. GitHub Actions workload identity is not used as a substitute for the missing direct session.

The remaining release step is publication and live verification when authorized Firebase access is available. Use the tested checkpoint on `review/atlas-completion-20261109` for that deployment; `main` still contains the earlier live release. Continuing research remains as itemized in the expansion plan, including inherited non-polygon provenance, older imported claims and further regional material.
