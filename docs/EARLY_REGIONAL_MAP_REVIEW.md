# Early and medieval map coverage review · 0.15.0

Reviewed 26 October 2026. Baseline: `0eacba4456273a99423dbde38d42b4bb6385220e` (539 global source instances). This release adds 28 dated instances in one 197,560-byte shard, for 567. Detailed China stages, annual CShapes, dated US/Canada divisions, modern 2022 reference units and every pre-existing historical geometry file remain unchanged. This is a bounded coverage correction, not certification of world history or individual frontier vertices.

## Demonstrated cause

The China stage loader correctly starts at 403 BCE. No earlier Zhou source feature had been selected, so the global view lost Chinese regional color before that point. The correction adds three finite Zhou references and stops the aggregate at 404 BCE, handing over to the existing detailed stages at 403 BCE. Eastern Zhou color denotes a collective region of competing states, not unified imperial rule.

The user's long-open live tab also retained an older application (0.12-era entry count and controls). A document reload is necessary to obtain the new module URL and content manifest; changing only the hash does not reload application modules. Changed modules and JSON requests now have a new release identity.

## Added source selection

Geometry: [Historical Basemaps](https://github.com/aourednik/historical-basemaps/tree/da7a4b735ecef70aebdc9c73e409d8a2500d50f3), immutable commit `da7a4b735ecef70aebdc9c73e409d8a2500d50f3`, GPL-3.0-only. Original names, source indices, source years, input hashes and source URLs are retained in the map manifest and features. The builder retains every selected polygon component, rounds to four decimals and normalizes winding for D3. It does not generate borders from capitals, modern administrative units or interpolation.

| Reference | Source years | Display eligibility (inclusive) | Meaning and limit |
|---|---|---|---|
| Western / Eastern Zhou | 1000, 700, 500 BCE | 1046–771, 770–501, 500–404 BCE | Original alias `Zhoa` retained; later stages are competing-state regions |
| Greek regions | 700, 500, 400 BCE | 700–501, 500–401, 400–324 BCE | Cultural grouping of separate poleis and settlements; no Greek empire |
| Olmec | 1000, 500 BCE | 1200–501, 500–400 BCE | Selected Gulf Coast cultural region; traditions do not end at cutoff |
| Paracas | 323 BCE | 500 BCE–200 CE | Selected coastal cultural portion, not an exhaustive cultural perimeter |
| Maya | 323 BCE, 500, 800 CE | 500 BCE–249 CE, 250–799, 800–899 | Multiple independent communities and cities, not a single empire |
| Kushan northern portion | 100 CE | 100–199 | Explicitly incomplete: source omits Peshawar and Mathura |
| Goryeo | 1000, 1100, 1200 | 918–1099, 1100–1199, 1200–1391 | Later context includes Mongol overlordship; not uniform independence |
| Kamakura Japan | 1300 | 1185–1332 | Court and military authority coexist; Hokkaido not filled |
| Chola | 1100, 1200 | 1071–1199, 1200–1279 | Extends existing earlier context; no overseas raids treated as permanent sovereignty |
| Srivijaya | 800, 1000, 1100, 1200 | 750–999, 1000–1024, 1025–1199, 1200–1299 | Maritime sphere; 1025 raid is a contextual handoff, not a reconstructed frontier |
| Wari / Tiwanaku | 700, 800 | 600–799, 800–999 | Selected regional spheres, separate identities; not uniform territorial administration |
| Chimú | 1400 | 1350–1469 | Selected dated coastal reference, not the kingdom's entire lifespan |

These windows are editorial eligibility, not exact founding, disappearance or annual border dates. Later source outlines are used backward only with an explicit finite review flag and visible source year. The inherited generalization and scholarship limits remain visible on selection.

## 虞、夏、商 and archaeological evidence

The early China guide is available beside the ancient map, through searches for 虞/舜/Yu/Shun/Xia/Shang/Zhou, and in About. It includes linked sources and opens dated entries only where a chronology is disclosed. One new five-stop reading connects Xia, Erlitou, Shang, the existing Yin Xu entry and Zhou.

- **虞／有虞氏:** the user's intended Shun tradition, explicitly distinct from 大禹. The received [《尚书·舜典》](https://zh.wikisource.org/wiki/尚書/舜典) was inspected as a transmitted narrative. It is not contemporary proof of a dynasty, absolute chronology, capital or frontier. The guide has `calendarRange: null`, no map year and no invented ruler record. No critical-edition collation is claimed.
- **Xia:** the Met's [China, 2000–1000 BCE](https://www.metmuseum.org/toah/ht/03/eac.html) explicitly labels its circa 2100–1600 BCE chronology unconfirmed. This is an `idea` entry about a tradition and its identification problem, not a confirmed mapped polity.
- **Erlitou:** the museum's selected urban phase circa 1700–1500 BCE is a separate archaeological place; neither the site's full duration nor proof of Xia identity. Its Henan point is a representative comparison site, not a proven Xia capital.
- **Shang:** circa 1600–1046 BCE is a conventional dynasty focus. Zhengzhou and Anyang are distinct royal centers; the existing [Yin Xu](https://whc.unesco.org/en/list/1114/) entry covers the late capital circa 1300–1046 BCE. Site protection boundaries are not whole-realm boundaries. The 1046 transition year also belongs to the Zhou narrative.

No approved whole-realm outline for Yu/Shun, Xia or Shang was found in this bounded review. Those periods now have accessible evidence and supported site points; they do not receive invented territorial fills.

## Rejected or unresolved donor shapes

- The 1500 BCE `Zhoa` polygon repeats later Zhou geography. It cannot be relabeled Shang.
- A 2000 BCE donor `Xia` shape does not establish the named dynasty or a defensible frontier; withheld.
- The 500 BCE Magadha shape misses Rajgir/Patna; two 400 BCE `Magadha` source features lie in northern Europe. The remaining 400 BCE shape spans Bihar and areas farther east without resolving control. All withheld rather than repairing by guesswork.
- The selected Gupta donor outlines extend deeply into the Deccan without resolving direct rule versus influence; withheld pending better evidence.
- The Kushan donor portion is explicitly partial, not evidence that India lacked Kushan rule.
- The donor's `Kamakura` repetition at 1400 and `Chola` repetitions at 1300/1400 are not adopted. A broader 1000 CE Tiwanaku shape extending far into Chile is also withheld.
- Previously quarantined South American and Ethiopian shapes remain excluded.

## Wider review and remaining work

`node scripts/audit-map-coverage.mjs <output.json>` evaluates the actual composed layers at 64 checkpoint/transition years from 2600 BCE to 2026 CE. It compares active narrative polity representative points with selected fills, excluding gray modern reference outlines. A hit can belong to the wrong polity and is not border validation. A miss can be a coastal simplification; Carthage and Istanbul illustrate why a count alone is insufficient. The three new narratives change witness denominators, so feature counts below are the directly comparable measure.

| Selected year | Source instances visible before | After |
|---|---:|---:|
| 1000 BCE | 3 | 5 |
| 500 BCE | 3 | 8 |
| 404 BCE | 3 | 8 |
| 403 BCE | 16 | 20 |
| 399 BCE | 17 | 20 |
| 100 CE | 4 | 7 |
| 700 CE | 5 | 8 |
| 1000 CE | 12 | 14 |
| 1200 CE | 10 | 14 |
| 1600 CE | 17 | 17 |
| 1867 CE | 88 | 88 |
| 2026 CE | 242 | 242 |

Remaining priority gaps include early South Asia (Magadha, Gupta, Satavahana), mainland Southeast Asia (Champa/Khmer/Bagan), early Korea/Japan, African regional states and North American Indigenous political/cultural geography. Oceania requires community/network geography rather than blanket sovereign polygons. More recent misses such as Benin, Dahomey, Bukhara and other regional polities require source acquisition; existing narratives alone cannot authorize geometry. These are retained coverage gaps, not historical absences.

