# Getty images 03: European material history

Research-only proposal, checked 2026-11-11. No production, Git, upload, deployment or Actions changes.

## Deliverable

- Catalog: research/v18/getty-images-03/visual-assets-getty-images-03-v18.json
- Original assembled target records: research/v18/getty-images-03/target-records.json
- Rights evidence: each proposed object's saved HTML and schema JSON, including explicit image CC0 statement.
- Receipts: research/v18/getty-images-03/download-receipts.json
- Audit: research/v18/getty-images-03/audit.json
- Images: florence.jpg, paul.jpg, grat.jpg, isabella.jpg in the research directory.
- All four proposed images are source-served IIIF JPEGs with a 1,400-pixel maximum side, below 750,000 bytes. No local image editing.

## Proposed matches

1. **florence-renaissance**: [The Arno with Fishermen](https://www.getty.edu/art/collection/object/103QWQ), Stradanus, 1580–1596. Direct view of named Florentine monuments plus likely Medici tapestry commission. The foreground river god makes its idealization explicit. Getty reports the artist's historical cut-and-replacement at lower center. Seen in full: river, nets, bridges, cathedral dome, towers, allegorical figure. 1400 × 948, 429445 bytes.
2. **paul-corinth-letters-50s**: [Initial P: Saint Paul; Initial P: A Bishop Giving a Letter to a Messenger](https://www.getty.edu/art/collection/object/103S1X), about 1280–1290. Specifically named Paul, shown passing a letter. Association is historical context, expressly later reception. This page depicts Philippians, not Corinthians; neither a first-century scene nor a portrait from life. Seen in full: two text columns, upper scroll exchange, lower writing figure, decorated margin. 901 × 1400, 473111 bytes.
3. **bologna-medieval-student-universities**: [Initial D: A Bishop Enthroned with Two Plaintiffs](https://www.getty.edu/art/collection/object/105WAV), about 1170–1180. A surviving page of Gratian's Decretum, not generic medieval art. [Getty's volume description](https://www.getty.edu/cona/CONAFullSubject.aspx?subid=700002321) explicitly connects Gratian's compilation with Bologna teaching and university textbook use. The copy was made in Paris or Sens; no assertion that it belonged to Bologna students or depicts their university. Seen in full: text, legal-scene initial, marginal annotations. 816 × 1400, 459239 bytes.
4. **castile-aragon-dynastic-union**: [Study for a Statue of Queen Isabella](https://www.getty.edu/art/collection/object/103R87), Pedro Mena y Medrano, 1673–1674. Named queen in a design paired with Ferdinand II at Granada Cathedral. Later devotional commemoration, not lifetime portrait or depiction of the 1479 accession. Current object catalog date used instead of older exhibition's 1675. The object description and older exhibition differ on statue material, so caption describes the design without asserting final material. Seen in full: kneeling queen, crown, bracket, empty escutcheon, scale. 964 × 1400, 323632 bytes.

## Exclusions and limits

- Abbey Bible, Getty 109FQG: downloaded and inspected; not proposed. Getty suggests a university origin, but identifies monastic use and the thumbnail is a biblical scene. The canon-law page is a more direct match for this legal-study record. Receipt and source evidence retained.
- Getty 109Q08, surfaced in Palermo searching: actual object is an intaglio of Demosthenes. Rejected; no image downloaded. Saved palermo-schema.json/HTML retain the discovery evidence despite that filename.
- Aachen and Palermo architecture: discovered vocabulary records and archival finding aids, but no verified explicit-CC0 Museum image of the named surviving monuments in this search. No generic Charlemagne, Norman or Byzantine illustration substituted.
- Capetian dynasty: Louis of Toulouse is not Louis IX of France. Rejected. Later Carracci acquisition mentions Louis of France, but no verified downloadable object image was established during this batch.
- Late western Rome / Milan 313: Arch of Constantine and Milvian Bridge art are different subjects, not direct depictions of Milan toleration or the western imperial endpoint. Generic emperor portraits rejected.
- Holy Roman Empire: no exact imperial institutions image or specifically named Francis II match established. Generic Habsburg portrait not used.
- Santiago routes: John of Gaunt's military travel and the Marquesa de Santiago do not establish pilgrimage infrastructure. Rejected.
- No challenge, denial or rate limit was encountered. One web-renderer request for Getty CONA returned HTTP 500; the official public page subsequently returned HTTP 200 through the normal fetch route and was saved as gratian-context.html. No restriction was bypassed.
- Catalog is a proposal. Parent should review the deliberately contextual Paul and Bologna associations before integration.

## Method

Loaded all eleven full target records with scripts/lib/atlas-records.mjs; compared target identities to dist/data/visual-coverage-v18.json. Discovery searches were Getty-scoped, and only Getty sources were fetched. Source descriptions, dates, thumbnail identity and CC0 declaration were read from saved official JSON-LD; full catalog context was inspected for the Decretum. Every downloaded image was opened with view_image. Dimensions, byte counts and SHA-256 values were verified without editing pixels. build.py reproduces the bilingual catalog from the retained source evidence and receipts.

## Owner integration, 2026-11-12

Admitted after individual source-image inspection and full target review. Final captions and metadata are in dist/data/visual-assets-getty-images-03-v18.json; durable evidence is in docs/v18-getty-images-03-evidence.json. Generic contrast prose was shortened while preserving source dates, context and rights.
