# V17 linked-record place captions

## Scope

This is a translation-only overlay for 149 older, non-imported records reached from the V17 stories and readings. The inventory is derived from the new records' `relatedIds` and the 30 readings' stops, selecting older records without a Chinese location caption. Each overlay item retains the stable record ID and original English caption, which the release checks compare with the source records.

The overlay preserves every English caption exactly. Chinese text retains qualifications such as representative location, approximate region, probable provenance, findspot versus production site, and the distinction between an event setting and a whole movement. Existing Chinese names in the atlas are reused; an Indigenous or alternate name is retained in its original spelling where the atlas provides no established Chinese form.

Raw records, coordinates, dates and the underlying historical claims are outside this translation pass. The review date is the edition’s agreed `2026-11-09` batch label. The root integration applies a caption only when both record ID and English text match.

## Completion and checks

All 149 captions are translated and saved. Checks confirmed JSON parsing, 149 unique record IDs, exact English equality against every input item, nonempty Chinese text, and preservation of explicit representative, approximate, probable, negative and present-day qualification markers. The captions were also read for meaning rather than relying on keyword checks alone.

Names were reconciled with existing Chinese atlas text where needed: examples include 福斯塔特／本·以斯拉会堂, “四十英亩”, 吉特克桑／韦特苏韦特恩, 阿勒特湾／乌米斯塔, 华氏城 and 波纳佩. Tae Rak, Haithabu and Minjerribah remain in their original spelling where no established Chinese form was available in the inspected atlas text. This preserves identification without inventing a canonical translation.

The Memphis caption retains the English reference to the final campaign without adding a name or expanding the location claim. Historical versus present-day pairs, such as 长安／今西安 and 大都／汗八里，今北京, remain explicit. The two Memphis records are distinguished by 尼罗河谷 and 田纳西州.

The root integration owns overlay application and aggregate tests. No older raw data file, coordinate or date was edited by this translation pass.

## Existing imported place names

The frozen importer stores source places as `[site.zh, site.en]` in each event's aliases (`scripts/import-jiangshan.mjs`). Of its 975 rows, 974 retain an exact pair against the original English location label. After the existing historical review layers, 970 still match; the other five display amended location cautions.

`dist/place-labels.mjs` reuses only an exact English match. Five explicit translations preserve the amended captions for Dujiangyan, Cai Lun's court setting, the disputed identification of Yizhou, Bi Sheng's unverified workshop and Zheng He's final-voyage port. In particular, the Yizhou caption does not restore the unqualified Taiwan identification from the inherited alias. Together these paths supply Chinese captions for all 975 imported records while retaining their original English labels, coordinates, source references and review status.

Tests reject stale record/English pairs, duplicate overlay IDs and attempts to overwrite an authored Chinese label. A changed English qualification causes the translation to remain unapplied until it is reviewed again. Location translation is not independent corroboration of the event or map point.

The [assembled-caption count receipt](v17-evidence/imported-caption-counts.json) applies all existing China review layers before counting the 970 source pairs and five amended translations. It confirms 975 Chinese captions in the 975 imported records.
