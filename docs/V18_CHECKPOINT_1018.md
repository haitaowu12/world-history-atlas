# Source-corrected campaigns and letters: 1,018-entry checkpoint

Prepared 13 November 2026. **545 credited images illustrate 1,018/2,087 entries (48.8%)**. **26** further entries need meaningful images to reach half. The 22 visual studies are unchanged.

Six existing entries gain explicit named-person image connections. Four narratives were corrected against historical texts:

- **Chang’an, 757:** the Prince of Guangping, Guo Ziyi, Li Siye and Uyghur cavalry have distinct roles. Luoyang's recovery is a later campaign. The retained city point is not presented as Xiangji Temple's exact location.
- **Huan Wen, 369:** a failed supply route and exhausted provisions precede withdrawal from Fangtou. Murong Chui defeats the retreating army at Xiangyi, not at the original advance point.
- **Xiangyang, 1273:** Fancheng is captured, while Xiangyang subsequently surrenders. Kublai's portrait relates to his documented orders; it is not a siege scene.
- **Hami, 1880:** Zuo Zongtang's memorial distinguishes planned departure, delay and movement from Suzhou in Gansu. The account separates military deployment from Zeng Jize's treaty negotiations. No precise arrival day is invented.
- The already-reviewed **Lu Xun letters (219)** and **chancellorship (244)** gain images of the actual recipient Guan Yu and appointing ruler Sun Quan. These are later portraits, not surviving letters or appointment scenes.

The existing image bytes and credits are unchanged. Huan Wen's 1893 novel illustration, Guo Ziyi's right-hand album portrait, Sun Quan's retrospective scroll image, and Zuo's 1875 photograph each retain their specific identity and date context. No new image files were downloaded.

## Verification

`npm run check`: **595/595 passed**, zero failures or skips. Six new regressions cover source links, identity, allied command, locations, logistics, surrender, imperial orders and dating.

Chrome checked Chang’an and Huan Wen in English and Hami in Chinese. Images loaded, the new narrative and connection text appeared, and collection credits and source links remained available. Earlier responsive and keyboard acceptance applies to the unchanged interface. The first check exposed one stale expected coverage count, which was updated before the passing full run.

Evidence: `v18-exact-existing-links-19-evidence.json`; `visual-assets-exact-links-19-v18.json`.

## Publication boundary

Local implementation only. Remote review remains **417f2ece** (959 illustrated entries), main/live **1892e4c** (900). The exact earlier 968 save remains gated; no retry or substitute tree was pushed. No GitHub Actions were used.
