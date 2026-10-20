# Agent Review Program — landing site

The customer-facing landing page for the Agent Review Program, published with GitHub Pages.

**Live URL:** <https://microsoft.github.io/AI-Solution-Review/>

## Contents

| Path | What it is |
|---|---|
| `index.html` | The landing page: quick navigation, hero, overview video, screenshot gallery, program timeline, prerequisites, permissions/configurations (with collapsed setup details), nominate. |
| `faq.html` | FAQ: known setup error messages and how to fix them. Linked from the header and footer. |
| `styles.css` | All styling. Fluent-flavoured tokens, forced dark, responsive, reduced-motion and print aware. |
| `main.js` | Progressive enhancement: scroll-reveals sections, adds a hairline to the stuck header, highlights the current quick-navigation link, and opens the setup details when a link points into them. The site is fully readable and navigable without it. |
| `assets/` | Logo, screenshots, setup screenshots and the overview video. See [`assets/README.md`](assets/README.md). |
| `.nojekyll` | Tells GitHub Pages to serve these files as-is instead of running them through Jekyll. |

## Quick navigation

Every quick-navigation link intentionally repeats its destination's visible heading exactly. Do not
abbreviate these labels: title parity makes the menu predictable. The menu becomes a roomy side rail
only when the viewport has enough space; otherwise it stays as a larger horizontal-scroll tab row.

## The nomination forms

Two audiences, two forms, both in the `#nominate` section of `index.html` and nowhere else:

| Who | Link | Attribute |
|---|---|---|
| The customer, nominating their own agent | <https://aka.ms/CATAgentReviewSignup> | `data-nomination-form="self"` |
| A Microsoft team, nominating a customer | <https://aka.ms/AgentReviewCustomerNomination> | `data-nomination-form="customer"` |

Every other "Nominate an agent" link on the page is an in-page anchor to that section, so each form
URL only ever has to change in one place. The header and hero buttons are deliberately worded
neutrally — they scroll to a choice rather than to a single form.

Use the `aka.ms` short links, not the resolved `forms.cloud.microsoft` URLs, so either form can be
repointed without a site change.

## Dark only, on purpose

The page ships **one palette: dark**, regardless of the visitor's OS setting. The link gets shared
around, and it should look the same for everyone who opens it.

That is enforced in two places and both are needed:

- `<meta name="color-scheme" content="dark">` in `index.html`
- `color-scheme: dark` on `html` in `styles.css` — this is what makes scrollbars, form controls and
  the video player chrome render dark too

The dark values live directly in `:root`. There is **no `prefers-color-scheme` block for tokens**;
re-adding one would reintroduce the light theme. If you are adding a colour, add it to `:root`.

One consequence worth knowing: the dark accent (`#2899f5`) is light enough that **white text on it
fails AA**. Anything sitting on `--brand` takes dark text (`#0b1a26`) — see `.btn--primary` and
`.skip`.

## Keep it short

The landing page deliberately keeps prose short. It exists to show the product, explain the program,
state the prerequisites and required permissions/configurations, and take a nomination. Longer
material is either collapsed (setup details) or on its own page (FAQ).

Keep the prerequisite cards concise.

The **Permissions and configurations** section has a narrower source boundary than the rest of the
page: it comes only from the approved *Agent Review Center - Roles, Permissions and Configurations*
document. Do not add roles, admin permissions, environment settings or setup dependencies that are
not in that source.

### Setup details: hidden until clicked

Below that section, a native `<details>` element (`#permissions-setup`) holds the full
**Agent Review Center permissions and configuration setup details**. It is **collapsed by default** so the
landing page stays short; visitors open it with the *Show details about Agent Review Center
permissions and configuration setup* toggle. Its content comes only from the approved
*Agent Review Center - Permissions and Configuration Checklist* document, including its screenshots
(`assets/setup-*.png`). Keep it collapsed and keep it in step with that document.

Links to `#permissions-setup`, or to a step inside it such as `#setup-step-5`, open the details
automatically (`main.js`).

## FAQ page

`faq.html` lists setup error messages the team has seen, each with a verified fix. Add one
`<article class="faq">` per error, with a stable `id` so it can be linked to. The site is public:
replace tenant-specific values in quoted error messages — policy names, policy IDs, request IDs,
timestamps — with placeholders such as `<policy name>`.

## Content source

Wording on the site comes from the repository [`README.md`](../README.md), except for the approved
permissions/configurations sources and the FAQ noted above. Do not add other product claims.

The repository is **public**, as is the site. The full install guide stays in the repository's
[guides](../guides/README.md); the site carries only the collapsed setup details above. The site's
prerequisites and permissions/configurations must match
[`guides/prerequisites.md`](../guides/prerequisites.md), and FAQ errors should also appear in
[`guides/troubleshooting.md`](../guides/troubleshooting.md), so change them together.

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
- Colour comes from Fluent 2, on the Fluent neutral ramp, with small radii (2/4/8) and Fluent's
  elevation. The accent is the dark-theme communication blue `#2899F5`. `--text-faint` is the
  disabled grey and fails contrast for body text — never use it for copy.
- Screenshots are **2× captures** (2524 × 1344) shown at ~1084px. Replacing one with a 1× image will
  look soft. See [`assets/README.md`](assets/README.md) for how they are taken.
