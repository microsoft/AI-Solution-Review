# Site assets

Everything in this folder is served directly by GitHub Pages from
`https://microsoft.github.io/AI-Solution-Review/assets/…`.

The landing page is already laid out for these files. Until a file exists, the page shows a **designed
mock of that panel** — app-window chrome with a realistic skeleton of the UI — carrying a dark
`PLACEHOLDER` badge with the expected filename. The layout is therefore already correct, and the page
looks finished while you gather the real captures.

---

## Screenshots

Drop the PNGs in with **exactly these filenames**. No HTML or CSS change is needed — `main.js`
detects that the image loaded, then hides the mock and its badge automatically.

| Filename | Where it appears | Capture this |
|---|---|---|
| `shot-scored-review-result.png` | Gallery, top-left | The rolled-up score — letter badge, `NN/100`, the per-agent pill and the review summary bar. |
| `shot-findings-list.png` | Gallery, top-right | The findings list with rule IDs and pass/fail status visible. Expand one finding if it still fits. |
| `shot-agent-map.png` | Gallery, bottom-left | The agent map showing how components connect, with the relationship-evidence legend visible. |
| `shot-runtime.png` | Gallery, bottom-right | The Runtime tab — the stat tiles (conversations analysed, errors, tool calls, knowledge searches). |

**Specification**

- **Format:** PNG (or WebP if you also rename the `src` in `index.html`).
- **Dimensions:** `1600 × 1000` (16:10). Capture at 2× / HiDPI and downscale to 1600 px wide for a
  crisp result.
- **Crop:** the frame is `object-fit: cover`, so avoid putting anything critical in the outer ~2%.
- **File size:** aim for under 400 KB each. Run them through an optimizer (e.g. `oxipng`, `pngquant`,
  or Squoosh) before committing.
- **Content:** these are customer-facing. **Scrub all real tenant data** — customer names, user
  names, email addresses, agent names, environment URLs, GUIDs, and any PII in transcript text.

If you want to add or remove a screenshot, copy an existing `<figure class="shot">` block in
`docs/index.html`. The gallery is a 2×2 grid, so add or remove them in pairs to keep it balanced.

> **Expected until the assets land:** each missing image logs a `404` in the browser console. That is
> the mechanism working as designed — the `<img>` points at its final path so the swap needs no code
> change, and the mock covers it in the meantime. The 404s disappear as soon as the files are
> committed.

### Alt text

Each `<img>` already has descriptive alt text written against the capability it shows. If you
capture something meaningfully different from the description above, update the `alt` attribute in
`docs/index.html` to match what is actually on screen.

---

## Overview video

The page has a responsive 16:9 player slot, with the duration (**2:30**) shown on the placeholder.

### Option A — hosted (recommended)

YouTube, Microsoft Stream, or Vimeo. In `docs/index.html`, find the comment block
`================== VIDEO EMBED: SWAP HERE ==================` inside
`<section id="overview-video">` and replace the `<div class="video__ph">…</div>` with the ready-made
`<iframe class="video__embed" …>` snippet in that comment, pasting in your video URL.

Hosted is recommended: no repo size cost, adaptive bitrate, and captions are handled by the host.

> Note: a hosted embed loads a third party in the visitor's browser. Use a privacy-respecting embed
> domain where one is offered (e.g. `youtube-nocookie.com`). The site itself has no analytics or
> trackers.

### Option B — self-hosted MP4

Commit the file here and swap in the `<video class="video__embed" …>` snippet from the same comment
block.

| File | Purpose | Spec |
|---|---|---|
| `agent-review-overview.mp4` | The video itself | H.264 / AAC, 1920 × 1080, 16:9. **Keep it under 50 MB.** |
| `video-poster.png` | Still frame shown before playback | 1920 × 1080 PNG or JPG, under 500 KB. |
| `agent-review-overview.vtt` | Captions | WebVTT. Required for accessibility. |

**GitHub file size limits — read before committing an MP4**

- GitHub **warns** above **50 MB** and **blocks** any file over **100 MB** on push.
- A published Pages site is capped at **1 GB** total, with a soft bandwidth limit of 100 GB/month.
- Large binaries are permanent in git history even if deleted later, so get the encode right before
  the first commit. A 2:30 1080p H.264 clip at ~2.5 Mbps lands around 45 MB; drop to 720p or
  ~1.5 Mbps if you need more headroom.
- Do **not** use Git LFS for this — GitHub Pages does not serve LFS objects, so the video would
  404 on the live site.

---

## Social preview card

| Filename | Dimensions | Notes |
|---|---|---|
| `og-card.png` | 1200 × 630 | Used by the `og:image` meta tag for link previews in Teams, Slack, and social. Optional — the page works without it. |

---

## Checklist before committing assets

- [ ] No customer, tenant, or personal data visible in any screenshot
- [ ] No credentials, tokens, environment URLs, or GUIDs on screen
- [ ] Filenames match the tables above exactly (case-sensitive — Pages is served from Linux)
- [ ] Images optimized; MP4 (if self-hosted) under 50 MB
- [ ] Captions file present if the video is self-hosted
- [ ] Page checked at narrow width after swapping assets in
