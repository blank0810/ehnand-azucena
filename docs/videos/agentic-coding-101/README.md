# Agentic Coding 101: clip sources

The ten narrated clips embedded in `content/articles/agentic-coding-101.mdx`, one folder per clip. Only text sources are kept here: narration scripts, HyperFrames compositions and the build scripts. Voice audio, fonts, the vendored GSAP file and renders stay in the working folder outside the repository; the shipped files are in `public/videos/agentic-coding-101/`. Design: `docs/plans/2026-10-25-agentic-coding-101-design.md`.

## Per clip

- `script.json`: the narration, one scene per entry, one voiced line per item. `text` is what the captions show (`|` splits a line into two cues); `say` spells file names out for the voice.
- `compositions/*.html`: one HyperFrames sub-composition per scene. Every reveal is timed from the line that names it, through `window.__vo` (generated timing) and the kit's `at(line, words)`.
- `scenes.py` (clips 03 to 10): writes the scene files above through `shared/scene.py`. Edit this, not the HTML.
- `index.html`: the shell (chapter rail, progress trace, eyebrow) and the scene hosts. Clips 03 to 10 generate it with `shared/shell.mjs`; 01 and 02 were authored by hand before the generator existed.

## Shared

- `voice.mjs`: voices each line with Kokoro `af_heart` through `hyperframes tts`, joins the lines with fixed gaps, normalises to -16 LUFS, and writes `assets/timing.js`, `timing.json` and `captions.vtt`.
- `mix.mjs`: lays the music bed (`music.json`: Pixabay, "Minimal Tech Ambient (Main)" by Good_B_Music, Pixabay Content License) about 19 dB under the voice, ducked while the voice speaks, and normalises the mix to -16 LUFS.
- `shell.mjs`, `kit.css`, `kit.js`: the shared shell and the scene kit (Production Trace tokens, IBM Plex, 28 px text floor).
- `deliver.sh`: renders 1920x1080 at 30 fps, encodes h264 with `+faststart` and AAC, and writes the `.mp4`, `.vtt` and `.webp` poster the site ships.
- `snap.sh`: a contact sheet of every scene's midpoint and last moment, for review.
- `claude-code-setup-run-2026-10-25.md`: the real recommender output used in clip 09.

## Rebuild one clip

In the working folder (`~/Desktop/Projects/Personal_Projects/agentic-coding-101-video/<clip>`, with `assets/fonts` and `assets/vendor/gsap-3.14.2.min.js` copied in), run outside this repository:

```bash
node ../shared/voice.mjs
node ../shared/mix.mjs ../shared/music/minimal-tech-ambient-good_b_music.mp3
node ../shared/shell.mjs
python3 scenes.py
npx hyperframes@0.8.192 check
bash ../shared/deliver.sh
```

Then copy `out/<clip>.{mp4,vtt,webp}` into `public/videos/agentic-coding-101/` and update the clip's `seconds` in `src/data/article-videos.ts` if its length changed.
