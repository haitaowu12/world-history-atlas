# Published: 1,025 illustrated entries

Verified 13 November 2026, 15:06 UTC.

- Live: https://world-history-atlas-guide.web.app/
- Release source: `2d5f8e0ab3d620bc94b3b003ecd6cc2ad002b042`
- Source tree: `2ea6f493a9afdcb3b68eb9256ebe3d7c8ab9368a`
- Main and review were independently read back at that source before deployment.
- Firebase project `tony-wu-projects`, Hosting site `world-history-atlas-guide`; direct CLI release completed using the existing authenticated session. No credential or security-setting changes.
- **1,025/2,087 entries illustrated (49.1%), 550 credited images, 22 visual studies.** Nineteen more illustrated entries are needed to reach half.
- **607/607 local checks pass**, no failures or skips.

## Live verification

Twelve fetched live files return HTTP 200 and match the release SHA-256: the page, application, content assembly module, content/media/coverage/chronology data and all five new image files. Full receipts are in `v18-release-1025-live-hashes.json`.

Chrome verified the Chinese 1942 view, the WWII overlay with an expanded legend, and compact map controls at desktop (38×110 px) and a 390×844 viewport (42×122 px). The controls remain compact after exiting the war view. No horizontal page overflow was measured at the phone viewport.

The live English Malagan detail displays 1800–1899 and loads the corrected alt text and exact Cleveland image. People initially lists all 278 biographies, has no portrait-only checkbox, and shows Makeba’s image automatically after searching. The image loaded at its declared 1227-pixel width. The temporary viewport override was reset. Local pre-release checks also covered Chinese Malagan/Makeba and the Westphalia inspector.

GitHub returned zero Actions runs for both `a66a025` and `2d5f8e0` after their main promotions. Every commit uses `[skip ci]`; no workflow was dispatched or changed.

This release completes a mature increment, not the full half-entry target. Original records, README additions, timeline work and map/People fixes remain.
