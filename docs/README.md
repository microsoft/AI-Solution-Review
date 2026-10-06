# Agent Review Program — landing site

The customer-facing landing page for the Agent Review Program, published with GitHub Pages.

**Live URL (once Pages is enabled):** <https://microsoft.github.io/AI-Solution-Review/>

## Contents

| Path | What it is |
|---|---|
| `index.html` | The landing page — hero, four-up, the Baseline → Re-run loop, what it checks, screenshot gallery, video, what you get, capability table, what you bring, data handling, get started. |
| `setup.html` | The dense reference page: prerequisites, transcript guidance, and the five install steps. Linked from the landing page so the detail does not swamp the top of the site. |
| `styles.css` | All styling. Light and dark themes via `prefers-color-scheme`, responsive, `prefers-reduced-motion` aware, plus a print stylesheet. |
| `main.js` | ~60 lines of progressive enhancement: reveals screenshots once they load, and dismisses the compact menu. The site is fully readable and navigable without it. |
| `favicon.svg` | Site icon. |
| `assets/` | Screenshots, video, and social card. See [`assets/README.md`](assets/README.md) for filenames and dimensions. |
| `.nojekyll` | Tells GitHub Pages to serve these files as-is instead of running them through Jekyll. |

## Content source

Every word on the site comes from the repository [`README.md`](../README.md). If the README changes,
update the matching section here. Do not add product claims that are not in the README.

## Publishing

This site publishes from the **`/docs` folder on `main`** — no build step, no Actions workflow, no
dependencies. Push to `main` and Pages redeploys.

To enable it: **Settings → Pages → Build and deployment → Source: _Deploy from a branch_ →
Branch: `main`, folder: `/docs` → Save.**

## Working on it locally

There is nothing to install.

```bash
cd docs
python -m http.server 8000
# then open http://127.0.0.1:8000
```

Open `index.html` directly from disk and it mostly works too, but a local server is closer to how
Pages behaves.

## House rules

- No build step, no npm, no Jekyll theme gems — keep it plain HTML and CSS.
- No analytics, trackers, or third-party fonts.
- Keep semantic HTML and the heading hierarchy intact (one `<h1>` per page).
- Give every image real alt text.
- Anything that moves must be wrapped in a `prefers-reduced-motion` check.
