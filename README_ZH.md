# 普天之下 · World History Atlas

**把故事放回当时的世界。**

[打开地图](https://world-history-atlas-tony.techiesea.chatgpt.site) · [English](README.md) · [致谢与来源](ACKNOWLEDGEMENTS.md) · [参与贡献](CONTRIBUTING.md)

![普天之下 · World History Atlas, 1200 CE](dist/assets/atlas-preview.jpg)

## 为什么做这个项目

最初只是想给女儿讲历史故事。我常常觉得，一个故事讲完了，却还缺少一些背景：那个时代的人怎样生活？同一时期，世界其他地方又在发生什么？每次讲一个事件，或解释一件文物，我都想把这些联系也讲给她听。

这件事我已经自己摸索了一段时间。我也希望能用中文和英文一起讲，让她认识更广阔的世界，同时与自己的中华文化保持联系，并为自己的文化传承感到自豪。

后来，我偶然发现了 DeanChensj 和贡献者们的[江山时序（Jiangshan Map）](https://github.com/DeanChensj/jiangshan-map)。它把中国历史中的地点、事件和人物故事放在地图上，让我看到了实现这个想法的一种具体方式。

受到它的启发，在 OpenAI Codex 的帮助下，我做出了普天之下。很高兴能把它分享给其他家长、学习者，以及喜欢把历史放回更大背景中理解的人。

— Tony Wu

## 可以怎样探索

- 拖动时间，看看同一时期世界不同地区的故事。
- 探索人物、地点、事件和部分历史地图，阅读所引来源及年代与证据局限说明。
- 在中文和英文之间切换。
- 跟随短篇导读，或分章阅读较长的主题序列。
- 在浏览器中保存条目和个人笔记，并导出笔记本。

当前应用版本为 **0.20.0**，包含 **70篇主题阅读**。这是一个仍在成长、选择性收录内容的教育项目。地图有各自的来源年代与适用范围；空白并不表示那里没有人或没有历史。欢迎历史纠错、翻译建议，以及来自不同地区和社群的观点。

## 致谢

特别感谢 **DeanChensj 和江山时序的贡献者们**。原项目不只提供了灵感；本项目也使用并改编了有明确归属的江山叙述、翻译、地名资料和人物纪事。欢迎也去探索[江山时序原版地图](https://deanchen.me/jiangshan-map/)。

普天之下由 Tony Wu 独立维护。[致谢与来源](ACKNOWLEDGEMENTS.md)列出了相关项目、地图作者、数据提供者和历史资料机构，并说明继承资料及其保留的来源声明。

## 本地运行与参与

需要 Node.js 22 或更新版本及 Python 3；无需安装依赖或编译应用。

```sh
git clone https://github.com/haitaowu12/world-history-atlas.git
cd world-history-atlas
npm run serve
```

打开 http://127.0.0.1:8080。运行 `npm run check` 检查应用和数据。

欢迎通过 [GitHub Issues](https://github.com/haitaowu12/world-history-atlas/issues) 提交历史纠错、翻译建议或使用问题。历史纠错请附上条目链接或标题，以及支持修正的来源。修改资料前请阅读[贡献指南](CONTRIBUTING.md)和[数据政策](docs/DATA_POLICY.md)。

原创代码和项目文档采用 [MIT](LICENSE)，原创历史叙述和教学内容采用 [CC BY 4.0](docs/CONTENT_LICENSE.md)。继承内容、地图、引文、翻译和依赖保留各自的声明；这两个许可均不覆盖仓库内全部材料。详见[致谢与来源](ACKNOWLEDGEMENTS.md)及[内容与第三方声明](docs/CONTENT_LICENSE.md)。
