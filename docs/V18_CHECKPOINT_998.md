# Scholarly correspondence and contested narratives: 998-entry checkpoint

Prepared 13 November 2026. **543 credited images illustrate 998 of 2,087 entries (47.8%)**. Another **46** entries need meaningful images to reach half. There are **22 guided visual studies**.

## Added since 993

- A 1279 manuscript copy preserves Ibn Sina's letter to al-Biruni, with two sequences of philosophical questions and answers. The actual opening page is connected to both scholars; only al-Biruni is newly illustrated. Princeton's exact **No Known Copyright** label, manuscript date, folio and unchanged official image bytes remain explicit. This is neither an autograph nor a portrait.
- Four event accounts now have named historical figures' later portraits, paired with primary-text repairs: Tong Pass separates a freezing-rampart anecdote from its chronological discussion; Ruxu distinguishes the 217 campaign from the 213 boat story; Changban restores civilians and a twenty-rider rear guard; Dingjun separates Huang Zhong's attack from Cao Cao's later arrival. Two images on Changban count as one illustrated entry.
- Five further Three Kingdoms accounts were corrected without increasing image coverage. Zhou Fang receives credit for the Shiting deception; Zhou Yu's death interrupts preparations rather than an invasion already underway; Lu Xun's Wuchang duties and the uncertain relevance of the inherited Jianye pin are explicit. A separate *Sanguozhi* passage supports the year-long Jiangling confrontation.
- Lu Xun's illustration alt text now identifies a flag, not a sword. Proposed reuse of Red Cliffs and Yiling battle drawings on five different episodes was rejected: a recognizable name alone does not make a battle scene an adequate illustration of another event.

## Verification

`npm run check`: **573 tests passed**, zero failures or skips. Coverage remains based on existing entry IDs; no new records or repeated image files were added to raise it. The generic-date-note test now verifies all remaining generic notes without requiring their number to stay above 900 as reviewed accounts replace them.

Local Chrome verified al-Biruni's manuscript and rights in English and Chinese; the revised 217 Ruxu account and Sun Quan image; the Lu Xun appointment and map-reference qualification; and Changban's two images. The second image loaded when its native disclosure was opened and scrolled into view. No horizontal overflow was observed. The previous checkpoint's 390px keyboard and bilingual checks cover the unchanged image-viewing components.

## Remaining visual gaps

Coverage is uneven: Oceania **25/89**, Southeast Asia **34/101**, North America **47/123**, Africa **54/136**, Latin America **42/94**, South Asia **47/95**, West/Central Asia **50/111**, East Asia **620/1,216**, Europe **79/122**. Oceania and Southeast Asia remain priorities for specific, reusable source images; unrelated battle scenes or generic regional objects will not substitute for evidence.

Evidence: `v18-exact-assets-20-evidence.json`, `v18-exact-existing-links-16-evidence.json`, `v18-three-kingdoms-source-repairs-21A.json`.

## Publication state

Prepared implementation, not a live release. Main/live remain the verified **900-entry** release `1892e4c3bf5e4bd3416d82efdfe90d1dd1b42531`. Remote review remains the **959-entry** checkpoint `417f2ece5e2a60118c734a003d5fe9b5fb4d3779` at last readback. No GitHub Actions are used.
