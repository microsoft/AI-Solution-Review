# Site assets

Served directly by GitHub Pages from `https://microsoft.github.io/AI-Solution-Review/assets/…`.

---

## Screenshots

All five are in place. They are captures of the Agent Review Center against demo agents
(Contoso, ZAVA, DevDocs Assistant, Python Expert Agent) — no customer data.

| File | Where it appears | What it shows |
|---|---|---|
| `shot-scorecard.png` | Hero | Rolled-up score of B · 86/100 across three agents, the per-agent pills, and the review summary. |
| `shot-finding-detail.png` | Gallery 1 | A finding expanded: detection method, source, parsed fact, what it means, recommendation. |
| `shot-runtime-errors.png` | Gallery 2 | Runtime → Errors: conversations analysed, error counts, tool calls, and the failing connectors. |
| `shot-knowledge-usage.png` | Gallery 3 | Runtime → Knowledge: sources configured vs confirmed used vs never used. |
| `shot-score-progress.png` | Gallery 4 | One agent's score across three reviews, rising to 95/100. |

**Specification**

- **Format:** PNG. **Dimensions: 1280 × 720 (16:9).** Keep this ratio — the layout reserves space
  from the `width`/`height` attributes, so a different ratio will shift the page as images load.
- **Rendering:** the gallery is a single column so each image renders near full size (~1084px, about
  85%). That is deliberate: at half-width the interface text is unreadable, which defeats the point.
- **File size:** these sit at 48–129 KB each. Keep replacements under ~200 KB.
- **Content:** these are customer-facing on a **public** site. Scrub real tenant data — customer and
  user names, email addresses, environment URLs, GUIDs, and any PII in transcript text.

### Replacing or adding one

The images are plain `<img>` tags in `docs/index.html`. Swap the file, and update the `alt` text and
the `<figcaption>` to match what the new capture actually shows — several alt strings quote specific
figures from the screenshot.

---

## Overview video — still needed

The page has a responsive 16:9 player slot showing the duration (**2:30**).

### Option A — hosted (recommended)

In `docs/index.html`, find the `VIDEO EMBED: SWAP HERE` comment inside `<section id="overview-video">`
and replace the `<div class="video__ph">…</div>` with the ready-made `<iframe class="video__embed" …>`
snippet in that comment.

Hosted avoids repo size cost and handles captions. Prefer a privacy-respecting embed domain
(e.g. `youtube-nocookie.com`) — the site itself has no analytics or trackers.

### Option B — self-hosted MP4

| File | Purpose | Spec |
|---|---|---|
| `agent-review-overview.mp4` | The video | H.264 / AAC, 1920 × 1080. **Keep under 50 MB.** |
| `video-poster.png` | Still before playback | 1920 × 1080, under 500 KB. |
| `agent-review-overview.vtt` | Captions | WebVTT. Required for accessibility. |

**GitHub limits — read before committing an MP4**

- GitHub warns above **50 MB** and blocks over **100 MB**.
- A published Pages site is capped at **1 GB**.
- Large binaries are permanent in git history even if deleted later.
- Do **not** use Git LFS — Pages does not serve LFS objects, so the video would 404.

---

## Social preview card

| File | Dimensions | Notes |
|---|---|---|
| `og-card.png` | 1200 × 630 | Used by the `og:image` meta tag for link previews. Optional. |
