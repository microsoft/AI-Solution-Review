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

## Overview video

`agent-review-overview.mp4` — 2:21, 1920 × 1080, H.264 / AAC, **15.6 MB**, self-hosted so the page
pulls in no third-party player. `video-poster.png` is the still shown before playback, taken from
the 1:58 mark.

The `<video>` element uses `preload="none"`, so only the poster loads until someone presses play.

### ⚠️ Captions are still missing

The video has narration, and there is no `.vtt` yet. Prerecorded audio needs captions
([WCAG 1.2.2](https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded)), so this is an open
accessibility gap on a public page.

To close it, add `agent-review-overview.vtt` here and uncomment the `<track>` line in
`docs/index.html` — it is already written, just commented out.

### If the video is ever re-encoded

The source was a 161 MB `.mov`, which **exceeds GitHub's 100 MB hard limit** and could not be
committed. It was transcoded with:

```bash
ffmpeg -i source.mov -map 0:v:0 -map 0:a:0 \
  -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -profile:v high -level 4.0 \
  -c:a aac -b:a 128k -ac 2 \
  -movflags +faststart agent-review-overview.mp4
```

`-movflags +faststart` matters: it moves the index to the front of the file so playback can begin
before the whole thing downloads. `-crf 24` took 161 MB down to 15.6 MB — screen recordings
compress very well, so raise the CRF before reaching for a lower resolution.

**GitHub limits**

- GitHub warns above **50 MB** and blocks over **100 MB**.
- A published Pages site is capped at **1 GB**.
- Large binaries are permanent in git history even if deleted later.
- Do **not** use Git LFS — Pages does not serve LFS objects, so the video would 404.

---

## Social preview card

| File | Dimensions | Notes |
|---|---|---|
| `og-card.png` | 1200 × 630 | Used by the `og:image` meta tag for link previews. Optional. |
