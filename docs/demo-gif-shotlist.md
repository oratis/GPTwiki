# Demo GIF — shot-list & recording guide

The demo GIF is the **single biggest star-conversion lever** for the launch (README
first screen, Show HN, Product Hunt, Reddit, Twitter all reuse it). This is the
storyboard; recording it is an owner action.

## Specs

- **Length:** 15–30s, silent, looping.
- **Aspect:** landscape (~16:9), 1280×720 source. Export GIF ≤ ~1280px wide.
- **Size budget:** keep the GIF under ~8 MB so the README stays light (GitHub caps
  inline images at 10 MB). If it's too big: cut to ~20s, drop to ~12 fps, reduce
  colors, or host an `.mp4`/`.webm` and link a poster.
- **Output:** `docs/assets/demo.gif`. Also keep the source `.mp4` for PH/YouTube.
- **Theme:** pick one (light recommended for README); zoom the browser to ~125% so
  text is legible at GIF resolution. Use a clean window, no bookmarks bar.

## Storyboard (the product's whole narrative in 5 beats)

| # | Beat | On screen | ~secs |
|---|------|-----------|-------|
| 1 | **Ask** | Type a real question into chat, pick a model, hit send | 0–5 |
| 2 | **Cited answer** | AI answer streams in; pan to the **References** section | 5–11 |
| 3 | **Publish** | Click Publish → article appears with its own URL, title, tags | 11–17 |
| 4 | **Multilingual** | Use the language switcher; the article shows in another language | 17–21 |
| 5 | **Grow** | Someone asks a follow-up thread → it merges into the article | 21–28 |

End on the published, growing article so the loop restarts cleanly on "Ask".

## Recording tips

- Pre-stage the question and a strong answer so the AI doesn't stall on camera (or
  speed up dead air in post).
- Hide cursor jitter; move deliberately. Add ~0.5s pauses on the key moments
  (references appearing, the new URL, the language flip).
- Tools: macOS — [Kap](https://getkap.co/) or QuickTime + [Gifski](https://gif.ski/);
  cross-platform — [Peek](https://github.com/phw/peek) or `ffmpeg` + `gifski`.
  - `ffmpeg -i demo.mp4 -vf "fps=12,scale=1280:-1:flags=lanczos" frames/%04d.png`
  - `gifski -o docs/assets/demo.gif --fps 12 --width 1280 frames/*.png`

## Done when

- [ ] `docs/assets/demo.gif` exists, ≤ ~8 MB, loops cleanly, all 5 beats legible.
- [ ] README first screen renders it (no 404).
- [ ] Source `.mp4` kept for the PH/YouTube/Twitter cuts.
