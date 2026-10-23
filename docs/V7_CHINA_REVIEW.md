# V7 China: restore the reference project's map depth inside the shared atlas

Review date: 23 October 2026. Inspected the pinned Jiangshan Map source at commit `fcd6484d06d3c581241fc24adbab288cf3a4a2ea`, the current atlas data and renderer, and the institutional historical sources listed below. This is a source/code and content review.

## Concrete deficit found

The earlier releases accounted for 975 imported mapped events and 1,387 period-specific place records. That accounting did not establish feature parity with the original. The reference’s map used 166 source stages over 18 period windows, including simultaneous states during political division. The world atlas imported only three selected Jiangshan political shapes. Period settlements were available in directories, but not drawn as historical map labels. Restoring records without these map behaviors left the China experience shallower even when the record count looked large.

Inspected implementation:

- Original `js/app.js`, `_resolvePhase`, `_resolveSnapKey` and `_fetchSnapshot`: select a source stage from the year rather than relying on occasional worldwide snapshot years.
- Original `js/app.js`, source reference handling near lines 330–334: `prefRef` and `regionRef` provide administrative geometry when a stage's array is absent or empty.
- Original `js/app.js`, settlement rendering near lines 1879–1880: `appear` is inclusive and `vanish` is exclusive.
- Original `js/map_data.js`: 18 display windows and 165 explicit phase rules. The modern period has no phase list, so its default source stage makes 166 stage selections in total.
- Original `js/atlas_snapshots.js`: compressed geometry registry and 167 keys including the non-period `neighbors` collection.
- Atlas `dist/app.mjs`, initialization and `createDiscovery`: loaded period settlements were supplied to the directory but not used as a historical map layer.
- Atlas `dist/data/territories-jiangshan.geojson`: only Southern Song, Jurchen Jin and Ming selected shapes were retained.

The reference is additionally stronger in historical hydrology, dated transport/wall overlays, on-map administrative layers and dense place genealogy. V7 supplies phase polities, optional administrative geometry and active-place selection. This does not claim full parity for historical river-course changes or every transport interaction.

## New source-phase package

Files:

- `dist/china-period-context.mjs`
- `dist/data/china-context-index-v7.json`
- `dist/data/china-context-<period>-<chunk>-v7.json`
- `dist/data/china-administrative-<period>-<chunk>-v7.json`
- `dist/data/china-context-v7.LICENSE.md`
- `scripts/build-china-context-v7.mjs`
- `tests/china-context-v7.test.mjs`

The extraction retains **18 periods, 166 stage selections and 689 political feature occurrences, deduplicated to 377 stored political shapes**. It supplies **3,211 unique administrative features** in optional per-period chunks. Political data total approximately 3.34 MB uncompressed; administrative data approximately 6.95 MB. Individual geometry files remain below 391 KB. The index is approximately 173 KB after administrative IDs are stored as numeric indexes rather than repeated long strings.

The source’s political `main` and `rival` roles are included. Static `neighbor` templates and separate `protectorate` roles are omitted. This avoids copying repeated neighbor labels across centuries and avoids equating a protectorate/influence category with ordinary control. One concrete reason for excluding the templates: the source’s earliest Warring States stage includes a Seleucid label even though the stage begins in 403 BCE. Those templates cannot be reused as a dated world map without another review.

No source year was invented for the new phase geometry. It has an explicit source phase and source display interval. These intervals are **inherited schematic display periods**, not independently verified annual borders. The layer must remain visibly distinguishable from the atlas’s independently reviewed context geometries. The source text and attribution remain accessible.

Period ends are exclusive at the next source period start. The Western Jin source has a `toYear` of 316 and the next period starts in 317. The extraction retains year 316 in the last Western Jin stage, matching the original resolver’s final-stage fallback; it does not create a missing year. BCE/CE selection skips civil year zero. The original modern `s_prc` stage is empty, so no modern historical polygon is invented: the shared global layers handle modern geography.

Administrative references are resolved with the same empty-array fallback used by the original. Duplicate references within a stage are removed by the selector. Optional administrative geometry should load at local zoom, with limited labels; it should not cover the world map in administrative names.

Capital flags only prioritize settlement label selection. They do **not** establish capital status throughout the source display period. For example, an era’s capital list can include a place whose capital date begins later than the era start. The shared map should use neutral place symbols unless a separately dated capital-status record supports a capital symbol.

## Module interfaces

```js
const loader = createChinaContextLoader(index, file => loadJSON('./data/' + file));
const context = await loader.load(year, {includeAdministrative: false});
// {year, period, phase, features, administrative}

const phase = chinaPhaseAt(index, year); // synchronous metadata selection
const places = activePeriodPlaces(settlements, year, {zoom, budget, region, query});
```

`chinaPeriodFeatures` maps a stored period collection onto the selected stage and attaches `sourcePhase`, `schematic` and source-display validity. Its administrative selector deduplicates numeric indexes. The loader caches by period, and drops failed promises so a later attempt can retry. The site owner may preload political geometry for slider continuity while keeping administrative geometry lazy.

`sourcePhaseTimeline(index)` is supplied only for reference-period navigation. It explicitly marks each output as a **source display window**, not a researched dynasty lifespan. The world timeline should prefer researched polity entries and must not turn the 165 phase rules, 975 short events or 1,387 period-place rows into overlapping timeline bars.

## Eleven researched dynasty entries

`dist/data/china-depth-v7.json` contains original bilingual narratives for:

| Entry | Span used | Reason for adding |
|---|---:|---|
| Western Jin | 265–316 | The reference map window begins at 280 after reunification; a dynasty timeline must not mistake that for its founding. |
| Eastern Jin | 317–420 | Adds a southern political span concurrent with northern states. |
| Northern Wei | 386–534 | Makes northern history visible beside the southern sequence. |
| Liu Song | 420–479 | Distinguishes 南朝宋 from the much later 宋. |
| Southern Qi | 479–502 | Distinguishes 南齐 from 北齐 and the Warring States 齐. |
| Liang | 502–557 | Connects a southern court with Buddhist textual and patronage networks. |
| Chen | 557–589 | Prevents the founding of Sui in 581 from erasing the southern court before 589. |
| Liao | 907–1125 | Gives the Khitan polity equal chronological presence with Song. |
| Jurchen Jin | 1115–1234 | Distinguishes 金 from 晋 and shows coexistence with Southern Song. |
| Western Xia | 1038–1227 | Adds the Tangut state alongside Song, Liao and Jin. |
| Wu Zhou | 690–705 | Makes Wu Zetian’s change of dynasty visible inside the broader Tang historical frame. |

Each record includes a representative location, a separate date explanation, bilingual facts, source evidence notes and related atlas records. The new records pass the shared record validator. An alias-search check for “Tangut” returns Western Xia.

### Source conflicts and editorial boundaries

- Western Jin: museum sources commonly use 265–316, while other histories distinguish a 266 foundation. The adopted museum convention is explicit. A map display beginning in 280 is a different question.
- Northern Wei: the Met and National Museum of China use 386–534; a Princeton overview ends at 535. The entry adopts the former convention and notes the difference.
- Liao: 907–1125 follows the museum chronology. The assumption of an imperial title in 916 is a different possible starting convention.
- Western Xia: UNESCO’s current English page says 1038, while its Chinese synopsis says 1032. The 2025 ICOMOS evaluation supports 1038–1227. The entry discloses the inconsistency rather than treating a language version as inherently authoritative.
- Princeton’s chronology contains additional mistakes, including describing Kaifeng in 946–947 as the Northern Song capital and giving a misleading Northern Zhou reunification statement. Those claims were **not imported**. The page supports selected Liao/Jin material-cultural context and was cross-checked with the Met’s chronology for adopted dates.
- The original Tang schematic keeps the 唐 label across 690–705. Wu Zhou is now separately described. Source names should remain preserved in evidence if the renderer supplies a date-specific display name.
- A named dynasty span does not authorize reusing one of its outlines throughout its lifespan. The new essays and the inherited phase layer keep those different intervals separate.

## Sources read in this review

- Met, China 1–500: https://www.metmuseum.org/toah/ht/05/eac.html
- Met, China 500–1000: https://www.metmuseum.org/toah/ht/06/eac.html
- Met, China 1000–1400: https://www.metmuseum.org/toah/ht/07/eac.html
- National Museum of China, Three Kingdoms/Jin/Northern and Southern Dynasties: https://www.chnmuseum.cn/portals/0/web/zt/gudai/en/detail5.html
- Met, Western Jin funerary urn: https://www.metmuseum.org/art/collection/search/44733
- Met, Eastern Jin jar: https://www.metmuseum.org/art/collection/search/50707
- Met, Northern and Southern Dynasties essay: https://www.metmuseum.org/essays/period-of-the-northern-and-southern-dynasties-386-589
- UNESCO, Yungang: https://whc.unesco.org/en/list/1039/
- Princeton University Art Museum, China timeline: https://static.artmuseum.princeton.edu/asian-art/china/timeline
- UNESCO, Xixia imperial tombs: https://whc.unesco.org/en/list/1736/
- ICOMOS evaluation: https://whc.unesco.org/document/222057
- CUHK Research Centre for Translation, Wu Zetian: https://www.cuhk.edu.hk/rct/renditions/authors/wuzt.html
- Cambridge, Wu Zetian and dynastic legitimacy, abstract-level review: https://www.cambridge.org/core/books/abs/companion-to-global-queenship/when-the-emperor-is-a-woman-the-case-of-wu-zetian-624705-the-emulator-of-heaven/C613662325224FEEA5ACD972FCA1CE5D

