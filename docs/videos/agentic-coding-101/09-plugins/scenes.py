import sys; sys.path.insert(0, "/home/blank/Desktop/Projects/Personal_Projects/agentic-coding-101-video/shared")
from scene import scene
C = "09-plugins"
S = "Source: code.claude.com/docs/en/plugins"

scene(C, "what", "1 / 4 · What it is", S, """
        #w-title { left: 120px; top: 300px; width: 620px; }
        #w-tree { left: 900px; top: 252px; width: 900px; }
        #w-market { left: 900px; top: 760px; width: 900px; }
        #w-market .k-dim { margin-top: 12px; }
""", """
          <h1 id="w-title" class="k-abs k-title-xl">One install, every layer</h1>
          <div id="w-tree" class="k-abs k-file">
            <div class="k-file-name">A plugin</div>
            <pre class="k-code"><span id="w-l0">my-plugin/</span><span id="w-l1">  skills/</span><span id="w-l2">  commands/</span><span id="w-l3">  hooks/hooks.json</span><span id="w-l4">  agents/</span><span id="w-l5">  .mcp.json</span><span id="w-l6">  .claude-plugin/<b>plugin.json</b></span></pre>
          </div>
          <div id="w-market" class="k-abs">
            <div id="w-market-label" class="k-label">From a marketplace</div>
            <span id="w-market-dim" class="k-dim">A catalog of plugins, added once, then browsed with /plugin</span>
          </div>
""", """
          k.fade("#w-tree", at("l01") - 0.2)
          k.lines("#w-l0", at("l01", "plugin bundles"))
          ;[["#w-l1", "skills"], ["#w-l2", "commands"], ["#w-l3", "hooks"], ["#w-l4", "subagents"], ["#w-l5", "M C P"], ["#w-l6", "one install"]].forEach(([el, w]) => k.lines(el, at("l01", w)))
          k.slide("#w-market-label", at("l02"))
          k.fade("#w-market-dim", at("l02") + 0.3)
""")

scene(C, "how", "2 / 4 · How it works", "Sources: code.claude.com/docs/en/discover-plugins, /plugins", """
        #h-title { left: 120px; top: 196px; }
        #h-cmd { left: 120px; top: 290px; width: 1000px; }
        #h-name { left: 1180px; top: 300px; width: 620px; }
        #h-name .k-dim { margin-top: 14px; }
        #h-scope { left: 120px; top: 560px; width: 1680px; }
        #h-scope .k-row { height: 100px; padding-left: 28px; justify-content: flex-start; }
        .h-who { display: block; width: 520px; }
""", """
          <h2 id="h-title" class="k-abs k-title">Install, then use</h2>
          <div id="h-cmd" class="k-abs k-file">
            <div class="k-file-name">Prompt</div>
            <pre class="k-code"><span>/plugin install <b>superpowers</b>@superpowers-marketplace</span></pre>
          </div>
          <div id="h-name" class="k-abs">
            <span id="h-tag" class="k-tag">/superpowers:brainstorming</span>
            <span id="h-tag-dim" class="k-dim">Its skills carry the plugin's name</span>
          </div>
          <div id="h-scope" class="k-abs">
            <div id="h-scope-head" class="k-head"><span style="padding-left: 28px; width: 548px">Turned on for</span><span style="flex: 1">Recorded in</span></div>
            <div id="h-s1" class="k-row"><span class="h-who k-name">You alone</span><span class="k-tag">~/.claude/settings.json</span></div>
            <div id="h-s2" class="k-row"><span class="h-who k-name">Everyone in the repository</span><span class="k-tag">.claude/settings.json</span><span class="k-dim">committed</span></div>
          </div>
""", """
          k.title("#h-title")
          k.rise("#h-cmd", at("l03"))
          k.pop("#h-tag", at("l04", "like slash"))
          k.fade("#h-tag-dim", at("l04", "name in front"))
          k.fade("#h-scope-head", at("l04b"))
          k.rise("#h-s1", at("l04b", "for you alone"))
          k.rise("#h-s2", at("l04b", "or for everyone"))
""")

picks = [
  ("superpowers", "skills", "Brainstorm, plan, test first, debug, verify. This article was planned with its brainstorming skill."),
  ("playwright", "MCP", "A real browser the agent drives: your dev server at phone width, then a screenshot."),
  ("security-guidance", "hooks", "Warns about risky patterns as files change, and reviews the diff when the agent stops."),
  ("claude-code-setup", "skill", "Reads your repository and recommends automations for each layer. Changes nothing."),
]
rows = "\n".join(f'            <div id="e-r{i}" class="k-row"><span class="e-name k-name">{n}</span><span class="e-layer"><span class="k-tag">{l}</span></span><span class="e-what k-dim">{d}</span></div>' for i, (n, l, d) in enumerate(picks, 1))
scene(C, "example", "3 / 4 · Example", "Sources: each plugin's files; a claude-code-setup run on this repository, 2026-10-25", """
        #e-title { left: 120px; top: 196px; }
        #e-list { left: 120px; top: 290px; width: 1680px; }
        #e-list .k-row { justify-content: flex-start; height: 120px; padding-left: 28px; }
        .e-name { width: 400px; }
        .e-layer { display: block; width: 180px; }
        .e-what { width: 1040px; }
        #e-out { left: 120px; top: 846px; width: 1680px; }
        #e-out .k-dim { margin-top: 12px; }
""", f"""
          <h2 id="e-title" class="k-abs k-title">Four worth installing</h2>
          <div id="e-list" class="k-abs">
            <div id="e-head" class="k-head"><span style="padding-left: 28px; width: 428px">Plugin</span><span style="width: 180px">Layer</span><span style="width: 1040px">What it does</span></div>
{rows}
          </div>
          <div id="e-out" class="k-abs">
            <div id="e-out-label" class="k-label">claude-code-setup, run on this portfolio, suggested</div>
            <span id="e-out-dim" class="k-dim">A hook that enforces its Docker-only rule, and a /verify skill that runs all five checks.</span>
          </div>
""", """
          k.title("#e-title")
          k.fade("#e-head", at("l05"))
          k.rise("#e-r1", at("l06"))
          k.rise("#e-r2", at("l07"))
          k.rise("#e-r3", at("l08"))
          k.rise("#e-r4", at("l09"))
          k.slide("#e-out-label", at("l09b"))
          k.fade("#e-out-dim", at("l09b", "it suggested"))
""")

scene(C, "gotchas", "4 / 4 · Gotchas", "Sources: code.claude.com/docs/en/plugins, developers.openai.com/codex/plugins", """
        #g-left { left: 120px; top: 196px; width: 900px; }
        #g-left .k-row { height: 110px; padding-left: 28px; }
        #g-left .k-dim { width: 340px; }
        #g-right { left: 1100px; top: 196px; width: 700px; }
        #g-right .k-row { height: 110px; padding-left: 28px; }
        .g-head { margin-top: 30px; }
""", """
          <div id="g-left" class="k-abs">
            <h2 id="g-t1" class="k-title">Before you install</h2>
            <div id="g-h1" class="k-head g-head"><span style="padding-left: 28px">Because</span><span style="width: 340px">Do</span></div>
            <div id="g-r1" class="k-row"><span class="k-name">It runs in every session</span><span class="k-dim">Read its hooks first</span></div>
            <div id="g-r2" class="k-row"><span class="k-name">Descriptions cost context</span><span class="k-dim">Install only what you use</span></div>
            <div id="g-r3" class="k-row"><span class="k-name">A second repo needs it</span><span class="k-dim">Build your own plugin</span></div>
          </div>
          <div id="g-right" class="k-abs">
            <h2 id="g-t2" class="k-title">Codex</h2>
            <div id="g-h2" class="k-head g-head"><span style="padding-left: 28px">Plugins</span></div>
            <div id="g-c1" class="k-row"><span class="k-name">Plugins too</span><span class="k-dim">Shared with ChatGPT</span></div>
          </div>
""", """
          k.title("#g-t1")
          k.fade("#g-h1", at("l10") - 0.2)
          k.rise("#g-r1", at("l10"))
          k.rise("#g-r2", at("l11"))
          k.rise("#g-r3", at("l11b"))
          k.title("#g-t2", at("l12"))
          k.fade("#g-h2", at("l12") + 0.3)
          k.rise("#g-c1", at("l12", "shared"))
""", last=True)
print("09 scenes written")
