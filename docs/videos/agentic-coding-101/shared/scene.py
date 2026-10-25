"""Writes one scene sub-composition from its parts, so every scene file in clips
03 to 10 has the same frame: template, root, stage, scene label, source line,
a paused timeline bound to the kit, and an exit fade (except the last scene).

    from scene import scene
    scene("03-rules", "what", "1 / 4 · What it is", "Source: …", css, body, js)
"""
import os

ROOT = os.path.expanduser("~/Desktop/Projects/Personal_Projects/agentic-coding-101-video")


def scene(clip, sid, step, source, css, body, js, last=False, title=""):
    exit_line = "" if last else '\n          k.exit("#stage-' + sid + '")'
    html = f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>{title or clip + " · " + sid}</title>
  </head>
  <body>
    <template>
      <style>
        #root {{ position: absolute; inset: 0; color: #15191f; }}
        #stage-{sid} {{ position: absolute; inset: 0; }}
{css.rstrip()}
      </style>

      <div id="root" data-composition-id="{sid}" data-width="1920" data-height="1080">
        <div id="stage-{sid}">
          <div class="k-step">{step}</div>
{body.rstrip()}
          <div class="k-source">{source}</div>
        </div>
      </div>

      <script>
        ;(() => {{
          const tl = gsap.timeline({{ paused: true }})
          const k = window.__kit(tl, "{sid}")
          const at = k.at
{js.rstrip()}{exit_line}
          window.__timelines["{sid}"] = tl
        }})()
      </script>
    </template>
  </body>
</html>
"""
    path = os.path.join(ROOT, clip, "compositions", f"{sid}.html")
    with open(path, "w") as f:
        f.write(html)
