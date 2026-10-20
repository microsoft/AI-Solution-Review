# Site assets

Served directly by GitHub Pages from `https://microsoft.github.io/AI-Solution-Review/assets/…`.

---

## Brand

| File | Used for | Notes |
|---|---|---|
| `logo.png` | Header mark, favicon, Apple touch icon | 280 × 280 square tile. Flattened to fully opaque — the supplied file carried ragged alpha in the corners (255, 128, 128, 64), which would have let the page show through on what is meant to be a solid tile. Rendered at 36px with an 8px radius. |
| `og-card.png` | `og:image` link previews | 1200 × 630, logo centred on the site surface colour. Regenerate with the ffmpeg command below if the logo changes. |

```bash
ffmpeg -y -f lavfi -i "color=c=0x1b1a19:s=1200x630" -i logo.png \
  -filter_complex "[1:v]scale=320:320,format=rgba[lg];[0:v][lg]overlay=(W-w)/2:(H-h)/2" \
  -frames:v 1 og-card.png
```

> **Naming:** the badge reads *Agent Review **Center*** — the tool — while the site is the
> Agent Review **Program**. At 36px in the header the inner text is not legible so it reads purely
> as a mark, but it is clearly readable in link previews, where the card says "Center" and the title
> says "Program". Worth a deliberate decision if the program gets its own mark.

---

## Screenshots

The hero shot and five gallery shots are in place. They are captures of the Agent Review Center against demo agents
(Contoso, ZAVA, DevDocs Assistant, Python Expert Agent) — no customer data.

| File | Where it appears | What it shows |
|---|---|---|
| `shot-scorecard.png` | Hero | Rolled-up score of B · 83/100 across three agents, the per-agent pills, and the review summary. |
| `shot-finding-detail.png` | Gallery 1 | A finding expanded: what the rule checks, what was found, why it matters, recommendation. |
| `shot-runtime-errors.png` | Gallery 2 | Runtime → Errors: conversations analysed, error counts, tool calls, and the failing connectors. |
| `shot-knowledge-usage.png` | Gallery 3 | Runtime → Knowledge: 357 sources configured vs 5 confirmed used vs 348 never used. |
| `shot-score-progress.png` | Gallery 4 | One agent's score across three reviews, rising to 95/100. |
| `shot-architecture-map.png` | Gallery 5 | Architecture map of the demo ZAVA Store Operations Agent: skills, connector tools and a knowledge file, with configured links solid and AI-found links dotted. |

**`shot-architecture-map.png` is the exception to the specification below.** It is an **824 × 588**
crop of a 1280 × 720 (1×) capture, cropped to the map canvas. The right-hand details
panel was cropped off because it shows component IDs and schema names, and the tab row was cropped off
because it carries the old tab name (*Agent map*; the current build calls it *Architecture*). It is
shown at its own pixel size (`.shot--native`, max 824px) so it is never upscaled. Replace it with a
2× capture of the **Architecture** tab when one is available, cropped the same way.

**Specification**

- **Format:** PNG. **Dimensions: 2524 × 1344.** Keep this ratio — the layout reserves space from the
  `width`/`height` attributes, so a different ratio will shift the page as images load.
- **Why 2524 wide:** these are **2× captures**. They display at ~1084px, so the extra pixels are
  what keeps the interface text sharp on high-DPI screens rather than soft and upscaled. A 1280px
  source shown at this size looks visibly blurry — that is the problem these replaced.
- **File size:** these sit at 149–410 KB each. Keep replacements under ~500 KB.
- **Smaller copies for srcset:** each 2524-wide shot has a -1262.png copy (1262 × 672), a
  high-quality bicubic downscale, so phones and 1× screens don't download the full file. The <img>s
  list both in srcset. When you replace a shot, regenerate its -1262.png too (PowerShell
  System.Drawing with InterpolationMode = HighQualityBicubic, or fmpeg -vf scale=1262:-1:flags=lanczos).
- **Content:** these are customer-facing on a **public** site. Scrub real tenant data — customer and
  user names, email addresses, environment URLs, GUIDs, and any PII in transcript text.

### How these were captured

Playwright at `deviceScaleFactor: 2` against a 1280 × 720 viewport, screenshotting the
`iframe[name="fullscreen-app-host"]` element rather than the page so the purple Power Apps chrome is
excluded. The raw grab is 2560 × 1344; the right-hand scrollbar is then cropped off:

```bash
ffmpeg -y -i raw.png -vf "crop=2524:1344:0:0" shot-name.png
```

Note that `Emulation.setDeviceMetricsOverride` over CDP does **not** work for this — it still yields
1× output. A new browser context created with `deviceScaleFactor: 2` is what produces real 2× pixels.

### Replacing or adding one

The images are plain `<img>` tags in `docs/index.html`. Swap the file, and update the `alt` text and
the `<figcaption>` to match what the new capture actually shows — several alt strings and one
caption ("348 of 357 configured sources were never cited") quote specific figures from the screenshot.

---

## Setup screenshots

Power Platform admin center captures from the *Agent Review Center - Permissions and Configuration
Checklist* document, shown inside the collapsed setup details on `index.html`. They load lazily, so
they cost nothing until a visitor opens the details.

| File | Step | What it shows |
|---|---|---|
| `setup-target-env-features.png` | 2 | Environment settings, Product expanded, **Features** highlighted. |
| `setup-code-apps-on.png` | 2 | **Power Apps Code Apps** with **Enable code apps** On. |
| `setup-agent-env-features.png` | 3 | The agent environment's settings, **Features** highlighted. |
| `setup-transcript-settings.png` | 3 | **Copilot Studio agents** section with both transcript settings selected. |

Replace them only with captures from an updated version of that document, and keep them free of
customer environment names.

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
