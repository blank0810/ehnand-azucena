import sys; sys.path.insert(0, "/home/blank/Desktop/Projects/Personal_Projects/agentic-coding-101-video/shared")
from scene import scene
C = "06-hooks"
S = "Source: code.claude.com/docs/en/hooks"

scene(C, "what", "1 / 4 · What it is", S, """
        #w-title { left: 120px; top: 300px; width: 700px; }
        #w-who { left: 900px; top: 252px; width: 900px; }
        #w-who .k-row { height: 120px; padding-left: 28px; }
        #w-who .k-dim { width: 440px; }
        #w-use { left: 900px; top: 640px; width: 900px; }
        #w-tags { display: flex; gap: 16px; padding: 24px 0 0 28px; }
""", """
          <h1 id="w-title" class="k-abs k-title-xl">Your code, at a set point, every time</h1>
          <div id="w-who" class="k-abs">
            <div id="w-head" class="k-head"><span style="padding-left: 28px">Layer</span><span style="width: 440px">Who decides it runs</span></div>
            <div id="w-r1" class="k-row"><span class="k-name">Rules file</span><span class="k-dim">The model, each time it reads it</span></div>
            <div id="w-r2" class="k-row"><span class="k-name k-cobalt">Hook</span><span class="k-dim">No one: it always runs</span></div>
          </div>
          <div id="w-use" class="k-abs">
            <div id="w-use-head" class="k-head"><span style="padding-left: 28px">Use it for</span></div>
            <div id="w-tags"><span id="w-t1" class="k-tag">Blocking</span><span id="w-t2" class="k-tag">Formatting</span><span id="w-t3" class="k-tag">Logging</span></div>
          </div>
""", """
          k.fade("#w-head", at("l02"))
          k.rise("#w-r1", at("l02"))
          k.rise("#w-r2", at("l02", "That makes"))
          k.fade("#w-use-head", at("l03"))
          k.pop("#w-t1", at("l03", "blocking"))
          k.pop("#w-t2", at("l03", "formatting"))
          k.pop("#w-t3", at("l03", "logging"))
""")

stations = [("Session start", "SessionStart"), ("Prompt", "UserPromptSubmit"), ("Before tool", "PreToolUse"), ("Tool runs", ""), ("After tool", "PostToolUse"), ("Stop", "Stop")]
xs = [210 + i * 300 for i in range(6)]
nodes = "\n".join(f'          <div id="h-n{i}" class="h-node" style="left: {x}px"></div>\n          <div id="h-l{i}" class="h-label" style="left: {x}px"><span class="k-name">{n}</span><span class="k-dim">{e}</span></div>' for i, ((n, e), x) in enumerate(zip(stations, xs)))
scene(C, "how", "2 / 4 · How it works", S, """
        #h-title { left: 120px; top: 196px; }
        #h-count { right: 120px; top: 256px; }
        #h-rail { left: 210px; top: 409px; width: 1500px; height: 2px; background: #87919d; }
        .h-node { position: absolute; top: 396px; width: 28px; height: 28px; margin-left: -14px; background: #f6f7f8; border: 3px solid #87919d; }
        .h-label { position: absolute; top: 444px; width: 290px; margin-left: -145px; text-align: center; }
        .h-label .k-name { font-size: 32px; }
        #h-gate { left: 810px; top: 352px; width: 290px; margin-left: -145px; text-align: center; }
        #h-types { left: 120px; top: 640px; width: 900px; }
        #h-tags { display: flex; gap: 16px; padding: 24px 0 0 28px; }
        #h-merge { left: 120px; top: 840px; width: 1680px; }
        #h-merge .k-dim { margin-top: 12px; }
        #h-merge { width: 900px; }
        #h-json { left: 1080px; top: 640px; width: 720px; }
        #h-list { left: 1080px; top: 846px; width: 720px; }
        #h-list .k-dim { margin-top: 10px; }
""", f"""
          <h2 id="h-title" class="k-abs k-title">Points in the lifecycle</h2>
          <div id="h-count" class="k-abs k-label">33 events in Claude Code</div>
          <div id="h-rail" class="k-abs"></div>
{nodes}
          <div id="h-gate" class="k-abs k-label">Exit 2 blocks</div>
          <div id="h-types" class="k-abs">
            <div id="h-types-head" class="k-head"><span style="padding-left: 28px">A hook can be</span></div>
            <div id="h-tags"><span id="h-t1" class="k-tag">command</span><span id="h-t2" class="k-tag">http</span><span id="h-t3" class="k-tag">mcp_tool</span><span id="h-t4" class="k-tag">prompt</span><span id="h-t5" class="k-tag">agent</span></div>
          </div>
          <div id="h-merge" class="k-abs">
            <div id="h-merge-label" class="k-label">Every scope fires</div>
            <span id="h-merge-dim" class="k-dim">Hooks from user, project and plugins add up. None overrides another.</span>
          </div>
          <div id="h-json" class="k-abs k-file">
            <div class="k-file-name">What the hook receives</div>
            <pre class="k-code"><span>"tool_input": {{"command": "git push -f"}}</span></pre>
          </div>
          <div id="h-list" class="k-abs">
            <span id="h-list-tag" class="k-tag">/hooks</span>
            <span id="h-list-dim" class="k-dim">Lists every configured hook</span>
          </div>
""", """
          k.title("#h-title")
          k.fade("#h-rail", at("l04"))
          ;[["0", "session start"], ["1", "prompt submitted"], ["2", "before a tool"], ["3", "after it runs"], ["4", "after it runs"], ["5", "and stop"]].forEach(([i, w], n) => {
            const t = at("l04", w) + (n === 4 ? 0.3 : 0)
            tl.fromTo(`#h-n${i}`, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, t)
            k.rise(`#h-l${i}`, t, 14)
          })
          k.slide("#h-count", at("l05"), 20)
          k.fade("#h-types-head", at("l06"))
          ;[["#h-t1", "shell command"], ["#h-t2", "H T T P"], ["#h-t3", "M C P"], ["#h-t4", "a prompt"], ["#h-t5", "another agent"]].forEach(([el, w]) => k.pop(el, at("l06", w)))
          tl.to("#h-n2", { backgroundColor: "#164bc5", borderColor: "#164bc5", duration: 0.3 }, at("l07"))
          k.rise("#h-gate", at("l07", "exits with code two"), 12)
          k.slide("#h-merge-label", at("l08"))
          k.fade("#h-merge-dim", at("l08", "They add up"))
          k.rise("#h-json", at("l07b"))
          k.pop("#h-list-tag", at("l08b", "slash hooks"))
          k.fade("#h-list-dim", at("l08b", "to see"))
""")

scene(C, "example", "3 / 4 · Example", S, """
        #e-title { left: 120px; top: 196px; }
        #e-settings { left: 120px; top: 290px; width: 960px; }
        #e-script { left: 1120px; top: 290px; width: 680px; }
        #e-result { left: 1120px; top: 720px; width: 680px; }
        #e-result .k-dim { margin-top: 12px; }
        #e-more { left: 1120px; top: 880px; width: 680px; }
""", """
          <h2 id="e-title" class="k-abs k-title">Blocking a force push</h2>
          <div id="e-settings" class="k-abs k-file">
            <div class="k-file-name">.claude/settings.json</div>
            <pre class="k-code"><span>{</span><span>  "hooks": {</span><span>    <b>"PreToolUse"</b>: [{</span><span>      "matcher": <b>"Bash"</b>,</span><span>      "hooks": [{</span><span>        "type": "command",</span><span>        "command": ".claude/hooks/no-force-push.sh"</span><span>      }]</span><span>    }]</span><span>  }</span><span>}</span></pre>
          </div>
          <div id="e-script" class="k-abs k-file">
            <div class="k-file-name">.claude/hooks/no-force-push.sh</div>
            <pre class="k-code"><span>#!/bin/sh</span><span>cmd=$(jq -r .tool_input.command)</span><span>case "$cmd" in</span><span>  *"push --force"*|*"push -f"*)</span><span>    echo "Force push is blocked." &gt;&amp;2</span><span>    <b>exit 2</b> ;;</span><span>esac</span></pre>
          </div>
          <div id="e-result" class="k-abs">
            <div id="e-result-label" class="k-label">Result</div>
            <span id="e-result-dim" class="k-dim">The push never runs. The agent reads "Force push is blocked." and changes course.</span>
          </div>
          <p id="e-more" class="k-abs k-dim">Same pattern: block edits to secrets, or format a file after every write.</p>
""", """
          k.title("#e-title")
          k.fade("#e-settings", at("l09"))
          k.lines("#e-settings .k-code span", at("l09") + 0.2, 0.08)
          k.fade("#e-script", at("l10"))
          k.lines("#e-script .k-code span", at("l10", "force push"), 0.12)
          k.slide("#e-result-label", at("l11"))
          k.fade("#e-result-dim", at("l11", "and the agent"))
          k.rise("#e-more", at("l11b"))
""")

scene(C, "gotchas", "4 / 4 · Gotchas", "Sources: code.claude.com/docs/en/hooks, developers.openai.com/codex/hooks", """
        #g-left { left: 120px; top: 196px; width: 860px; }
        #g-left .k-row { height: 104px; padding-left: 28px; }
        #g-left .k-dim { width: 300px; }
        #g-proof { left: 120px; top: 610px; width: 860px; }
        #g-proof .k-body { margin-top: 14px; }
        #g-cost { left: 120px; top: 830px; width: 860px; }
        #g-cost .k-row { height: 96px; padding-left: 28px; border-top: 1px solid #d0d5db; }
        #g-cost .k-dim { width: 300px; }
        #g-right { left: 1060px; top: 196px; width: 740px; }
        #g-right .k-row { height: 104px; padding-left: 28px; }
        #g-right .k-dim { width: 360px; }
        .g-head { margin-top: 30px; }
""", """
          <div id="g-left" class="k-abs">
            <h2 id="g-t1" class="k-title">Request or guarantee</h2>
            <div id="g-h1" class="k-head g-head"><span style="padding-left: 28px">"Never edit .env"</span><span style="width: 300px">Is</span></div>
            <div id="g-r1" class="k-row"><span class="k-name">In a rules file</span><span class="k-dim">A request</span></div>
            <div id="g-r2" class="k-row"><span class="k-name">In a hook that blocks it</span><span class="k-dim k-cobalt">A guarantee</span></div>
          </div>
          <div id="g-proof" class="k-abs">
            <div id="g-proof-label" class="k-label">Prove it fires</div>
            <p id="g-proof-body" class="k-body">In the setup behind this series, the guard hooks sat in an example file and never ran.</p>
          </div>
          <div id="g-cost" class="k-abs">
            <div id="g-c0" class="k-row"><span class="k-name">Context cost</span><span class="k-dim">None, unless it prints</span></div>
          </div>
          <div id="g-right" class="k-abs">
            <h2 id="g-t2" class="k-title">Codex</h2>
            <div id="g-h2" class="k-head g-head"><span style="padding-left: 28px">Hooks</span></div>
            <div id="g-c1" class="k-row"><span class="k-tag">hooks.json</span><span class="k-dim">A smaller set of events</span></div>
          </div>
""", """
          k.title("#g-t1")
          k.fade("#g-h1", at("l12") - 0.2)
          k.rise("#g-r1", at("l12", "a request"))
          k.rise("#g-r2", at("l12", "A hook that"))
          k.slide("#g-proof-label", at("l13"))
          k.rise("#g-proof-body", at("l13", "In the setup"))
          k.rise("#g-c0", at("l14"))
          k.title("#g-t2", at("l15"))
          k.fade("#g-h2", at("l15") + 0.3)
          k.rise("#g-c1", at("l15", "hooks dot"))
""", last=True)
print("06 scenes written")
