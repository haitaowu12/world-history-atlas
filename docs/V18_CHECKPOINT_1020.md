# Exact rulers and clearer date notes: 1,020-entry checkpoint

Prepared 13 November 2026. **545 credited images illustrate 1,020/2,087 entries (48.9%)**. **24** further entries need meaningful images to reach half. The 22 visual studies are unchanged.

- **Liu Song, 420–479:** an explicitly later portrait shows its actual founder, Liu Yu. The accession annal adds specific tax, debt and market orders to the story. Orders are described as orders, not proof of universal implementation. Existing museum chronology and the distinction from the later Song remain.
- **Jin’s campaign against Wu, 279–280:** the entry distinguishes deployment in 279 from surrender in 280. The paired album identifies Sima Yan at left and the earlier Wu founder Sun Quan at right. The Jiangling coordinate no longer carries a misleading combined Jiangling/Jianye label.
- Eleven date notes now explain historical dates and map context without internal editing language such as “inherited,” “retained,” or “this corrects.” Two summaries lose redundant corrective commentary. Source distinctions, historical dates, original-record provenance and coordinates remain intact.

## Verification

`npm run check`: **599/599 passed**, zero failures or skips. New tests cover exact ruler identities, the two Song dynasties, edicts versus implementation, the campaign’s two-year sequence, map labels and the prose cleanup. One test initially expected removed defensive wording; it now tests the positive chronology and absence of an invented distance conversion.

Chrome checked Liu Song in English and the 279 campaign in Chinese. Images loaded, historical versus image dates were visible, the paired album identified left/right correctly, and source links and credits remained available. Prior responsive and keyboard checks apply to the unchanged interface.

Evidence: `v18-exact-existing-links-20-evidence.json`; `v18-reader-note-cleanup-2026-11-13.json`; `visual-assets-exact-links-20-v18.json`.

## Publication boundary

Local implementation only. Remote review remains **417f2ece** (959 illustrated entries), main/live **1892e4c** (900). The exact 968 save remains gated and was not retried. A new Princeton Kuba image download was also denied by the approval review as read-only monitoring; its target file was verified absent. Neither a substitute download nor a remote write was attempted. No GitHub Actions were used.
