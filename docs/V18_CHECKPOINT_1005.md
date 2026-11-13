# Source repairs and connected canal stories: 1,005-entry checkpoint

Prepared 13 November 2026. **543 credited images illustrate 1,005 of 2,087 entries (48.2%)**. Another **39** entries need meaningful images to reach half. There are **22 guided visual studies**.

## Added since 998

Seven existing entries now pair reviewed narratives with already-credited portraits of named participants. These are explicitly later depictions, not views of the works or battles. No new image files or entry IDs were added.

- Daxing's founding is corrected from 584 to **582–583**: the order, naming and court move are separated. The inherited record remains available in provenance.
- The **605 Luoyang and Tongji works** distinguish the commission from the capital's 606 completion, and remove an unsupported claim that the examination system began with this project.
- The **610 Jiangnan Canal** stories explain two perspectives on the same works: the imperial order and Yuhang's southern endpoint. They do not count as two canal projects. Their location notes distinguish the inherited Jiangdu itinerary point from the actual Jingkou–Yuhang corridor.
- Yehuling distinguishes a reported army strength from casualties; Heishui separates the **1226** campaign from **1286** administration and irrigation.
- The **89 BCE Luntai decree** describes a rejected frontier-farming proposal, hardship and changed priorities without turning it into an unqualified renunciation of military preparedness.

## Interaction repair

The canal pair exposed a real bug: related-entry filtering admitted general atlas records but discarded valid China-event peers. The resolver now includes those events while continuing to reject missing and self links. A regression test covers reciprocal links and unchanged input. The browser module URL was versioned so existing visitors receive the fix.

## Verification

`npm run check`: **580 tests passed**, zero failures or skips. Tests cover the seven source repairs, exact associations, the Daxing date correction, companion-story navigation and the unchanged coverage denominator.

Local Chrome verified Daxing's corrected dates and portrait, then both canal stories in Chinese and English. Clicking the Chinese companion link and keyboard-activating its return changed the selected entry correctly. In the verified **390 × 844** mobile viewport, the English return link worked with Enter, the portrait loaded with descriptive alt text, the title received visible keyboard focus, and the document did not exceed viewport width. Temporary viewport overrides were reset. These checks are local, not a new live release.

## Remaining gaps and held candidates

Oceania and Southeast Asia remain priorities. Read-only review verified a Wellcome 1821 *Malay Annals* title page and a British Library nineteenth-century *Truyện Kiều* manuscript frontispiece, including their item-specific public-domain labels and visible contents. They are not yet downloaded or counted. A State Library of Queensland photograph download was blocked before file creation and remains outside this checkpoint. Contested dates and weak associations, including the Dunhuang commandery date, were not filled merely to raise coverage.

Evidence: `v18-exact-existing-links-17-evidence.json`; seven narrative reviews in `china-visual-reviews-v18.json`; associations in `visual-assets-exact-links-17-v18.json`.

## Publication state

Prepared implementation, not a live release. Main/live remain the verified **900-entry** release `1892e4c3bf5e4bd3416d82efdfe90d1dd1b42531`. Remote review remains the **959-entry** checkpoint `417f2ece5e2a60118c734a003d5fe9b5fb4d3779` at last readback. No GitHub Actions are used. Pending authorization for an earlier exact checkpoint must not be treated as permission to substitute this later tree.
