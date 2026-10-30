# GitHub Pages alongside the GPT Site

普天之下 · World History Atlas is published at two addresses:

- [GitHub Pages](https://haitaowu12.github.io/world-history-atlas/)
- [GPT Site](https://world-history-atlas-tony.techiesea.chatgpt.site/)

Both hosts serve the same static application. Publish application changes to each host separately.

## Pages configuration

Repository: `haitaowu12/world-history-atlas`. Publishing source: **Deploy from a branch → gh-pages → / (root)**, represented by API `build_type: legacy`. The generated branch includes `.nojekyll`, the committed `dist/` files, the original code license and deployment metadata. It does not contain a custom Actions workflow.

GitHub still performs its own Pages build/deployment workflow. GitHub documents standard hosted runners as free for public repositories and GitHub Pages; the managed deployment can appear in Actions without consuming the included compute allowance. This is not a promise of zero workflow runs. See [Pages publishing sources](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) and [Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions).

## Publish a new Pages snapshot

Use Node.js 22+, Python 3.12+ and Git with write access to the repository. Commit intended application changes on `main`, then run:

```sh
npm run publish:pages
```

The command runs `npm run check`, then `scripts/publish-pages.py`. The publisher:

1. Refuses uncommitted or untracked changes under `dist/`.
2. Exports the committed `dist/` tree into a temporary publication checkout.
3. Preserves the existing `gh-pages` history and replaces the previous static snapshot, including removing retired files.
4. Adjusts only `og:url` and `og:image` in the mirror's HTML to point at GitHub Pages. Runtime files/data and the GPT Site's source HTML are unchanged.
5. Adds `.nojekyll`, `deployment.json`, the code license and a branch README linking to source and acknowledgements.
6. Pushes normally, with no force push, and verifies the remote publication commit. A concurrent branch update rejects the push.

To inspect the committed input without changing any remote:

```sh
python3 scripts/publish-pages.py --dry-run
```

A successful push is not a completed deployment. Check the Pages build/status and open the public address. The public [`deployment.json`](https://haitaowu12.github.io/world-history-atlas/deployment.json) identifies the source commit, dist tree and application version.

## Keep both hosts aligned

Pages and the GPT Site are separate delivery destinations. Publish the same committed application snapshot to both when changing the app. The Pages helper does not publish the GPT Site, and Sites publication does not update `gh-pages`.

The app loads modules, data, fonts and images with relative paths, supporting the Pages project prefix. Hash links preserve the current host, year, language and reading/chapter state. Pages' sharing image points at its own host; the GPT Site retains its own social URLs.

Notebooks and map preferences use browser local storage. Each origin has its own storage. Moving between these two addresses does not automatically move bookmarks or notes; export from the old address and import at the other one to transfer them.
