# Agent Review Program — landing site

The customer-facing landing page for the Agent Review Program, published with GitHub Pages.

**Live URL (once Pages is enabled):** <https://microsoft.github.io/AI-Solution-Review/>

## Contents

| Path | What it is |
|---|---|
| `index.html` | The landing page. Four blocks only: hero, screenshot gallery, overview video, nominate. |
| `setup.html` | Prerequisites, transcript guidance and the install steps — linked from the nominate block and the footer, so the detail never lands on the landing page. |
| `styles.css` | All styling. Fluent-flavoured tokens, light + dark, responsive, reduced-motion and print aware. |
| `main.js` | ~100 lines of progressive enhancement: scroll-reveals sections, adds a hairline to the stuck header, and dismisses the compact menu. The site is fully readable and navigable without it. |
| `favicon.svg` | Site icon. |
| `assets/` | Screenshots and the overview video. See [`assets/README.md`](assets/README.md). |
| `.nojekyll` | Tells GitHub Pages to serve these files as-is instead of running them through Jekyll. |

## The nomination form

The primary call to action is a single button in the `#nominate` section of `index.html`, pointing at
<https://aka.ms/CATAgentReviewSignup>. The URL appears in exactly one place, marked with a
`NOMINATION FORM` comment and a `data-nomination-form` attribute — every other "Nominate your agent"
link on the site is an in-page anchor to that section. Keep it that way so the form URL only ever
has to change once.

## Keep it short

The landing page deliberately carries almost no prose. It exists to show the product, play the
video, and take a nomination. Detail belongs in [`README.md`](../README.md) or `setup.html` — resist
adding sections here.

## Content source

Wording on the site comes from the repository [`README.md`](../README.md). Do not add product claims
that are not in it.

> The repo is **private** but the published site is **public**. Never link to `github.com/microsoft/AI-Solution-Review`
> or any file in it from these pages — those links 404 for visitors.

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
- Give every image real alt text. Several alt strings quote figures visible in the screenshot, so
  update them whenever an image is replaced.
- Anything that moves must be wrapped in a `prefers-reduced-motion` check.
- Colour comes from Fluent 2: `#0078D4` as the only accent, on the Fluent neutral ramp, with small
  radii (2/4/8) and Fluent's light elevation. `--text-faint` is the disabled grey and fails contrast
  for body text — never use it for copy.
