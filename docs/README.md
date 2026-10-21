# Agent Review Program — landing site

The customer-facing landing page for the Agent Review Program, published with GitHub Pages.

**Live URL:** <https://microsoft.github.io/AI-Solution-Review/>

## Contents

| Path | What it is |
|---|---|
| `index.html` | The landing page: quick navigation, hero, *The program and the tool*, overview video, how the program runs, what Agent Review Center is, screenshot gallery, install summary, what you need to bring, nominate, contact. |
| `install.html` | Installation guide: a featured solution download followed by nine individually collapsible steps from *Before you start* to *Upgrade or uninstall*. |
| `faq.html` | FAQ: program, Agent Review Center, installation, transcripts, results, and updates questions, plus frequently encountered setup errors, each collapsible. |
| `styles.css` | All styling. Fluent-flavoured tokens, forced dark, responsive, reduced-motion and print aware. |
| `main.js` | Progressive enhancement: scroll-reveals sections, adds a hairline to the stuck header, highlights the current quick-navigation link, opens a disclosure when a link points inside it, adds FAQ and installation-guide expand/collapse controls, and opens every collapsed `<details>` while printing. The site is fully readable and navigable without it. |
| `assets/` | Logo, screenshots, setup screenshots and the overview video. See [`assets/README.md`](assets/README.md). |
| `.nojekyll` | Tells GitHub Pages to serve these files as-is instead of running them through Jekyll. |

## Site navigation

Every page has the same header (**Overview · Install · FAQ**, plus the *Nominate an agent* button) and
the same footer links. The current page's header link carries `aria-current="page"`. Below 560px the
*Overview* link is hidden, because the brand link beside it goes to the same place. If you add a page,
copy the header and footer from an existing one and add it to both on every page.

## Quick navigation

Every quick-navigation link intentionally repeats its destination's visible heading exactly. Do not
abbreviate these labels: title parity makes the menu predictable. The menu becomes a roomy side rail
only when the viewport has enough space; otherwise a compact *On this page* control shows the current
section and opens the links in a responsive one-, two-, or three-column panel. It is a native
`<details>` element, so it remains keyboard-accessible and usable without JavaScript. On short
viewports (560px tall or less) it stops sticking, so the stuck header and menu don't cover the page.
The hero is deliberately not in the menu: its heading is a tagline, not a destination.

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

## Contact the Agent Review Program team

The team's contact address is `serenaxie@microsoft.com` for now. It appears as `mailto:` links in:

- `index.html`: the `#contact` section (also in the quick navigation) and the footer
- `install.html`: *Get help* and the footer
- `faq.html`: the `#contact-team` entry, the closing callout, and the footer

When the team gets a shared mailbox, search `docs/` for `serenaxie@microsoft.com` and replace every
occurrence. The address is shown as visible text as well as a link, because `mailto:` does nothing on
machines without a default mail app.

## Solution download

The **Download Agent Review Center (.zip)** buttons (`index.html` `#install`, and the centered
featured download near the top of `install.html` at `#download`) link straight to the `.zip`
attached to the GitHub release, for example
`https://github.com/microsoft/AI-Solution-Review/releases/download/v20261016.1/AgentReviewCenter_20261016.1_managed.zip`.
GitHub Pages serves only `docs/`, so the repository-root `.zip` can't be linked from the site, and
no copy of the binary is kept in `docs/`.

The URL, version, size and (on `install.html`) SHA-256 are written into both pages. **Update them
on every release** — this is a step in [`.github/RELEASING.md`](../.github/RELEASING.md).

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

The landing page deliberately keeps prose short. It exists to explain the program and the tool, show
the product, summarize installation, state the prerequisites, and take a nomination. Longer material
belongs on its own page (installation guide or FAQ). Prefer cards, tables and timelines to paragraphs.

Aim for about **1,000 visible words** on the landing page. Define the program and the tool once, in
*The program and the tool*, and don't redefine them in other sections. No outcome promises or
marketing taglines: captions describe what a screenshot shows.

Keep the prerequisite cards concise.

Keep detailed permissions and configuration instructions in `install.html`, not on the landing page.
In both document order and quick navigation, *What you need to bring* must lead directly to
*Nominate an agent*.

## Installation guide

`install.html` is the customer installation guide. Keep the solution download centered and prominent
near the top. The guide is organized as nine native `<details class="install-step">` disclosures,
collapsed by default. Each summary has the exact step title plus abbreviated *Who* and *When*
context; the open body keeps the full *Who / When / Done when* summary and *Check it worked* box.
The reference about installed components is a separate disclosure and does not count as a step.

Every step has a stable section `id`. Link directly to those anchors rather than to landing-page
setup details: `main.js` opens the correct disclosure before scrolling, including when a link points
to a nested heading. Never rename or remove an anchor without updating all incoming links.
*Expand all* / *Collapse all* controls appear when JavaScript is available. Without JavaScript, the
native disclosures remain keyboard-accessible; print styles expose every body, and JavaScript also
opens and restores disclosures around printing.

Step 1 defines the role names (*Power Platform admin, environment admin, System Administrator, agent
owner, reviewer*); use only those on every page. Steps that change hands end with a *Next:* line. The
guide comes from the approved permissions and configuration documents,
[`guides/install.md`](../guides/install.md),
[`guides/prerequisites.md`](../guides/prerequisites.md), the solution package itself, and Microsoft
Learn for admin-center procedures. Change it together with those sources.

## FAQ page

`faq.html` groups common questions and setup error messages, each with a verified answer. Every
entry is a `<details class="faq">`, **collapsed by default**, with a stable `id` so it can be linked
to — `faq.html#<id>` opens it (`main.js`). Never rename or remove an `id`; other pages link to them.
*Expand all* / *Collapse all* buttons appear when JavaScript is available. Answers come from
[`guides/faq.md`](../guides/faq.md), [`guides/troubleshooting.md`](../guides/troubleshooting.md), the
customer-facing sources below, or a fix the team has verified; keep them in step. The site is public:
replace tenant-specific values in quoted error messages — policy names, policy IDs, request IDs,
timestamps — with placeholders such as `<policy name>`. Entries that quote an on-screen message carry an
*Error* tag (`.faq__tag`). When two entries are merged, keep the retired entry's `id` on the
paragraph that answers it, inside the surviving entry, so old links still open the right answer.

## Content source

Wording on the site comes from:

- the repository [`README.md`](../README.md) and [`guides/`](../guides/README.md);
- customer-facing Agent Review Program material, such as the customer-facing program deck;
- the approved permissions/configuration documents that feed the installation guide;
- the shipped solution package, for facts about what it installs and the messages it shows;
- Microsoft Learn, for admin-center procedures.

Do not add other product claims. In particular:

- **No customer data, ever.** No customer, company or person names, quotes (even anonymized), scores,
  findings, tenant or policy names, IDs, internal tooling, pipeline counts, or internal processes.
- **Only verified facts.** Behaviour read from the app's code but not tested live is not published
  as fact.
- **Data handling.** Say only that Agent Review Center is installed and runs in your own environment,
  and that reviews and results are stored in Dataverse in that environment. Broader data-handling
  statements need product and legal sign-off first.
- No pricing, roadmap or outcome figures unless a customer-facing source states them.

The repository is **public**, as is the site. The site's prerequisites must match
[`guides/prerequisites.md`](../guides/prerequisites.md), permissions/configuration guidance in the
installation guide must match its approved sources and [`guides/install.md`](../guides/install.md),
and FAQ errors should also appear in
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
- Colours only from the `:root` tokens in `styles.css`. New components go in clearly commented
  blocks; reuse `.section`, `.requirements-grid`, `.timeline`, `.table`, `.callout`,
  `.steps--numbered`, `.faq` and friends before adding new ones.
- Give every image real alt text. Several alt strings quote figures visible in the screenshot, so
  update them whenever an image is replaced.
- Anything that moves must be wrapped in a `prefers-reduced-motion` check.
- Colour comes from Fluent 2, on the Fluent neutral ramp, with small radii (2/4/8) and Fluent's
  elevation. The accent is the dark-theme communication blue `#2899F5`. `--text-faint` is the
  disabled grey and fails contrast for body text — never use it for copy.
- Screenshots are **2× captures** (2524 × 1344) shown at ~1084px. Replacing one with a 1× image will
  look soft. See [`assets/README.md`](assets/README.md) for how they are taken.
