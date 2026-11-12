# Getty Open Content batch 05: proposed research only

Reviewed 2026-11-12. Six exact-subject assets, nine newly covered entry candidates. They remain in `research/v18/getty-images-05/`; no production media/catalogue, git, upload or deployment changes were made.

## Deliverables

- `visual-assets-getty-images-05-v18.json`: proposed v2 shard with bilingual metadata, captions, interpretations and nine associations.
- `target-records.json`: full assembled records for the nine entries, read through the repository loader before selection.
- `rights-receipts.json`, `http-receipts.json`, `download-receipts.json`: exact item/image/rights evidence, status, technical sizes and SHA-256 hashes.
- Saved official HTML, extracted text and JSON-LD for each candidate. `build.py` regenerates and checks the proposed shard without production writes.
- Six admitted JPEGs plus one rejected alternate, all unchanged source-served IIIF derivatives. Each admitted JPEG is below 750,000 bytes and 3,000 pixels on its longest edge. Actual pixels were inspected individually.

## Exact matches and evidence

1. **Constantine bronze coin**, 307–337 CE, Getty 80.NH.152.228. [Official item](https://www.getty.edu/art/collection/object/1064CR). `constantine.jpg`, 1400 × 1399, 356,416 bytes. A right-facing laureate head appears on the actual coin, with worn lettering and corrosion. Constantine is explicitly named in `milan-toleration-313`, `council-of-nicaea-325` and `western-late-roman-empire`. The image is contextual evidence of the named ruler, with no assertion that the issue commemorates a meeting or documents either policy.
2. **Abu Simbel**, Félix Bonfils, 1877, Getty 84.XO.1167.15. [Official item](https://www.getty.edu/art/collection/object/104M9D). `abussimbel.jpg`, 1400 × 1141, 261,512 bytes. Four colossal seated figures, cliff, sand and original album mount are visible. The explicitly dated photograph gives `abu-simbel-relocation` a direct before-relocation view, rather than an image of the 1960s engineering work. The assembled entry supplies the later project's chronology.
3. **Sainte-Chapelle**, Bisson Frères, about 1854–1864, Getty 84.XM.359.3. [Official item](https://www.getty.edu/art/collection/object/1044HW). `chapel.jpg`, 960 × 1400, 268,304 bytes. Elevated view of roof, spire and buttresses. [Getty's relic history](https://www.getty.edu/publications/artists-things/things/relic/) explicitly identifies Louis IX's True Cross relic as kept at Sainte-Chapelle, connecting the monument to the royal religious patronage in `capetian-dynasty`. The caption explicitly dates the photograph to the nineteenth century and describes that later appearance.
4. **Rudolf II gold medal**, about 1600, Getty 92.NJ.87. [Official item](https://www.getty.edu/art/collection/object/103RSF). `rudolf.jpg`, 1177 × 1400, 466,523 bytes. The obverse visibly combines imperial, Hungarian and Bohemian titles around Rudolf's portrait; the catalogue transcribes and explains them. This precise inscription supports `habsburg-composite-monarchy` and `holy-roman-empire` by separating joined titles rather than equating the empire with hereditary possessions. The reverse is not shown and is not described as visible.
5. **The Destruction of Jerusalem**, Boucicaut Master, about 1413–1415, Getty Ms. 63, fol. 237. [Official item](https://www.getty.edu/art/collection/object/107TYY). `jerusalem.jpg`, 936 × 1400, 458,482 bytes. Whole illuminated leaf with Titus by tents and soldiers storming a medieval-looking city. The catalogue identifies the subject as the 70 CE siege, an exact later depiction for `jerusalem-second-temple-destruction-70`. The caption dates it explicitly and the interpretation explains its anti-Jewish medieval Christian theological framing. It is evidence of historical reception, not eyewitness evidence for the siege or an endorsed theological explanation.
6. **Mandalay monastery used as a mess house**, Felice Beato, 1887–1897, Getty 2007.26.203.16. [Official item](https://www.getty.edu/art/collection/object/109BP7). `mandalay.jpg`, 1400 × 1049, 322,858 bytes. A carved wooden monastery with tiered spires and people around its raised base is visible. The catalogue explicitly identifies British military reuse after annexation. For `konbaung-dynasty`, this is precise post-1885 evidence of colonial change in the final capital; it is not labeled a royal palace or a scene during independent rule.

All six official item pages explicitly supply their associated images under CC0 through Getty Open Content. The saved source metadata links each downloaded image identifier to its item. Source URLs, image identifiers and hashes are distinct from the existing production catalogue. All nine entries were uncovered at the 436-asset/822-covered baseline.

## Restraint and exclusions

The requested 12–20 image target was not met. Ten Getty collection item candidates and two Getty authority records were inspected; only six satisfied meaningful new coverage. Searches also examined several remaining regional subjects without opening broad unrelated items.

- **Arch of Titus**, Getty 84.XP.774.17, [item](https://www.getty.edu/art/collection/object/104977), was downloaded and visually inspected. Its photograph shows the exterior and dedicatory inscription; the interior menorah relief is not resolved. Held out as a redundant alternate, with no extra unique coverage.
- **Mira calligraphiae monumenta**, [item](https://www.getty.edu/art/collection/object/103RWD), is genuine Habsburg court material but less exact for these institutional entries than Rudolf's named titles. No image downloaded.
- **Vihara, Ellora**, [item](https://www.getty.edu/art/collection/object/108Y2B), has no digitized image in the inspected item and does not establish the specific Rashtrakuta monument. Excluded.
- **Saint James with Saint Philip**, [item](https://www.getty.edu/art/collection/object/105VJM), is fol. 205v. A Getty article's identifiable Compostela-pilgrim image is a different leaf, fol. 203v; its catalogue rights/identity were unresolved. The two leaves were not conflated.
- **Amritsar Sikh temple interior**, [authority record](https://www.getty.edu/cona/CONAFullSubject.aspx?subid=700005722), did not yield a digitized Getty object with verified image rights. Excluded.

One supplementary request to `https://whc.unesco.org/en/story-abu-simbel/` returned HTTP 403. That source route was stopped immediately and not retried or replaced by another UNESCO endpoint. The existing assembled entry contains earlier inspected UNESCO evidence; this batch does not claim a new UNESCO inspection. No CAPTCHA, Getty rate limit or Getty/media denial occurred. Retrieval scripts used pauses exceeding one second. No blocked source families were revisited.

## Owner integration

Six complete images, source metadata and nine full target records inspected. All images admitted unchanged. Constantine is typed as an object photograph, Jerusalem as a manuscript detail; contemporary/later interpretation stays explicit in text. Redundant links back to the same collection page removed. Durable evidence: docs/v18-getty-images-05-evidence.json.
