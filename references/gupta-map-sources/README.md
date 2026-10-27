# Gupta and Vakataka source illustrations

The retained original SVGs are Woudloper's historical South Asia maps, published through Wikimedia Commons in 2014. Their author identifies books by A. Agrawal, H. Kulke and D. Rothermund, and B. Stein as sources. We inspected the map description pages and images; we did not independently inspect those books.

- [South Asia historical AD375 EN.svg](https://commons.wikimedia.org/wiki/File:South_Asia_historical_AD375_EN.svg), selected **CC BY-SA 3.0**. Source SHA-256 `b7825f1f66b8143ad5de591dd398b9396b4eed2229ea44bf57cafb7c57931b25`.
- [South Asia historical AD450 EN.svg](https://commons.wikimedia.org/wiki/File:South_Asia_historical_AD450_EN.svg), **CC BY-SA 4.0**. Source SHA-256 `50c1e11a8d2bc651644492265f6d4ca6b2e16eb0ad9b6816f4b1bb2df9492904`.

The derived core illustrations and notices are separately licensed in `dist/data/gupta-schematic-375.LICENSE` and `dist/data/gupta-schematic-450.LICENSE`. `scripts/build-gupta-schematic.mjs` samples the mapmaker's SVG paths and applies an approximate geographic registration. The original shapes have deliberately blurred edges. See `docs/THREE_REGIONS_REVIEW.md` for controls, measured discrepancies, choices and important limitations.
