# Agent Review Program — landing site

The customer-facing landing page for the Agent Review Program, published with GitHub Pages.

**Live URL (once Pages is enabled):** <https://microsoft.github.io/AI-Solution-Review/>

## Contents

| Path | What it is |
|---|---|
| `index.html` | The landing page. Four blocks only: hero, screenshot gallery, overview video, nominate. |
| `setup.html` | Prerequisites, transcript guidance and the install steps — linked from the nominate block and the footer, so the detail never lands on the landing page. |
| `styles.css` | All styling. Fluent-flavoured tokens, light + dark, responsive, reduced-motion and print aware. |
| `main.js` | ~130 lines of progressive enhancement: reveals screenshots once they load, scroll-reveals sections, adds a hairline to the stuck header, and dismisses the compact menu. The site is fully readable and navigable without it. |
| `favicon.svg` | Site icon. |
| `assets/` | Screenshots, video, and social card. See [`assets/README.md`](assets/README.md) for filenames and dimensions. |
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
- Give every image real alt text.
- Anything that moves must be wrapped in a `prefers-reduced-motion` check.
- Mock panels are illustrative only. Keep the `PLACEHOLDER` badge on them, and use skeleton shapes
  rather than invented numbers or finding text, so nothing reads as a real product claim.
- The mocks were drawn from the real Agent Review Center UI: a square letter badge with a rolled-up
  score, a per-agent pill, `Agent review / Agent map / Runtime` tabs, a total-checks-passed bar with
  run metadata, finding rows carrying a rule ID (`INS-07`, `SKL-02`) and a pass/fail pill, an agent
  map of typed component cards with solid "configured" vs dashed "found by AI review" edges, and a
  runtime stat-tile grid. Keep them aligned with the product if it changes.
