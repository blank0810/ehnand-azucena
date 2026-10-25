import sys; sys.path.insert(0, "/home/blank/Desktop/Projects/Personal_Projects/agentic-coding-101-video/shared")
from scene import scene
C = "10-features"

scene(C, "what", "1 / 5 · What it is", "Source: code.claude.com/docs/en/commands", """
        #w-title { left: 120px; top: 300px; width: 700px; }
        #w-list { left: 900px; top: 252px; width: 900px; }
        #w-list .k-row { justify-content: flex-start; height: 116px; padding-left: 20px; }
        .w-n { display: block; width: 60px; }
        .w-what { display: block; width: 360px; }
""", """
          <h1 id="w-title" class="k-abs k-title-xl">Four features for every session</h1>
          <div id="w-list" class="k-abs">
            <div id="w-head" class="k-head"><span style="padding-left: 20px; width: 440px">Feature</span><span style="flex: 1">How</span></div>
            <div id="w-r1" class="k-row"><b class="w-n k-num">1</b><span class="w-what k-name">Steer</span><span class="k-tag">Shift+Tab</span></div>
            <div id="w-r2" class="k-row"><b class="w-n k-num">2</b><span class="w-what k-name">Undo</span><span class="k-tag">Esc Esc</span>&#160;<span class="k-tag">/rewind</span></div>
            <div id="w-r3" class="k-row"><b class="w-n k-num">3</b><span class="w-what k-name">Inspect</span><span class="k-tag">/context</span>&#160;<span class="k-tag">/doctor</span></div>
            <div id="w-r4" class="k-row"><b class="w-n k-num">4</b><span class="w-what k-name">Run in parallel</span><span class="k-tag">--worktree</span></div>
          </div>
""", """
          k.fade("#w-head", at("l02") - 0.2)
          k.rise("#w-r1", at("l02", "steer"))
          k.rise("#w-r2", at("l02", "undo"))
          k.rise("#w-r3", at("l02", "inspect"))
          k.rise("#w-r4", at("l02", "run in parallel"))
""")

modes = [("auto", "A classifier blocks risky actions. The terminal's default"), ("manual", "Asks before file edits and shell commands"), ("accept edits", "Edits files without asking; asks for other commands"), ("plan", "Explores and writes a plan; edits wait for your approval")]
rows = "\n".join(f'            <div id="s-r{i}" class="k-row"><span class="s-mode"><span id="s-m{i}" class="k-tag">{m}</span></span><span class="k-dim s-what">{d}</span></div>' for i, (m, d) in enumerate(modes, 1))
scene(C, "steer", "2 / 5 · Steer", "Source: code.claude.com/docs/en/permission-modes", """
        #s-title { left: 120px; top: 196px; }
        #s-key { right: 120px; top: 206px; }
        #s-table { left: 120px; top: 320px; width: 1680px; }
        #s-table .k-row { justify-content: flex-start; height: 112px; padding-left: 28px; }
        .s-mode { display: block; width: 400px; }
        .s-what { width: 1200px; font-size: 32px; }
""", f"""
          <h2 id="s-title" class="k-abs k-title">Steer: permission modes</h2>
          <div id="s-key" class="k-abs"><span class="k-dim" style="display: inline">Cycle with </span><span id="s-tab" class="k-tag">Shift+Tab</span></div>
          <div id="s-table" class="k-abs">
            <div id="s-head" class="k-head"><span style="padding-left: 28px; width: 428px">Mode</span><span style="flex: 1">What the agent does</span></div>
{rows}
          </div>
""", """
          k.title("#s-title")
          k.pop("#s-key", at("l03"))
          k.fade("#s-head", at("l03", "cycles"))
          ;[["1", "auto"], ["2", "manual"], ["3", "accept edits"], ["4", "and plan"]].forEach(([i, w]) => {
            k.rise(`#s-r${i}`, at("l03", w))
            tl.fromTo(`#s-m${i}`, { backgroundColor: "#164bc5", color: "#ffffff" }, { backgroundColor: "#e8ebef", color: "#15191f", duration: 0.3, immediateRender: false }, at("l03", w) + 0.6)
          })
          tl.fromTo("#s-m1", { backgroundColor: "#e8ebef", color: "#15191f" }, { backgroundColor: "#164bc5", color: "#ffffff", duration: 0.3, immediateRender: false }, at("l04"))
          tl.fromTo("#s-m1", { backgroundColor: "#164bc5", color: "#ffffff" }, { backgroundColor: "#e8ebef", color: "#15191f", duration: 0.3, immediateRender: false }, at("l05") - 0.3)
          tl.fromTo("#s-m4", { backgroundColor: "#e8ebef", color: "#15191f" }, { backgroundColor: "#164bc5", color: "#ffffff", duration: 0.3, immediateRender: false }, at("l05"))
""")

scene(C, "undo", "3 / 5 · Undo", "Source: code.claude.com/docs/en/checkpointing", """
        #u-title { left: 120px; top: 196px; }
        #u-keys { left: 120px; top: 310px; width: 1680px; display: flex; align-items: center; gap: 18px; }
        #u-restore { left: 120px; top: 410px; width: 1680px; }
        #u-tags { display: flex; gap: 16px; padding: 22px 0 0 28px; }
        #u-limits { left: 120px; top: 600px; width: 1680px; }
        #u-limits .k-row { justify-content: flex-start; height: 96px; padding-left: 28px; }
        .u-what { display: block; width: 520px; }
""", """
          <h2 id="u-title" class="k-abs k-title">Undo: rewind</h2>
          <div id="u-keys" class="k-abs"><span id="u-k1" class="k-tag">Esc Esc</span><span id="u-or" class="k-dim" style="display: inline">or</span><span id="u-k2" class="k-tag">/rewind</span></div>
          <div id="u-restore" class="k-abs">
            <div id="u-restore-head" class="k-head"><span style="padding-left: 28px">Restore</span></div>
            <div id="u-tags"><span id="u-t1" class="k-tag">The code</span><span id="u-t2" class="k-tag">The conversation</span><span id="u-t3" class="k-tag">Both</span></div>
          </div>
          <div id="u-limits" class="k-abs">
            <div id="u-limits-head" class="k-head"><span style="padding-left: 28px">Know its limits</span></div>
            <div id="u-r1" class="k-row"><span class="u-what k-name">Shell-only changes</span><span class="k-dim">A file only shell commands changed isn't tracked</span></div>
            <div id="u-r2" class="k-row"><span class="u-what k-name">Not version control</span><span class="k-dim">Keep using git for real history</span></div>
            <div id="u-r3" class="k-row"><span class="u-what k-name">Survives a resume</span><span class="k-dim">Checkpoints are saved with the conversation</span></div>
          </div>
""", """
          k.title("#u-title")
          k.pop("#u-k1", at("l06", "escape twice"))
          k.fade("#u-or", at("l06", "or type"))
          k.pop("#u-k2", at("l06", "slash rewind"))
          k.fade("#u-restore-head", at("l06", "to restore"))
          k.pop("#u-t1", at("l06", "the code"))
          k.pop("#u-t2", at("l06", "the conversation"))
          k.pop("#u-t3", at("l06", "or both"))
          k.fade("#u-limits-head", at("l07"))
          k.rise("#u-r1", at("l07", "only shell"))
          k.rise("#u-r2", at("l07", "no replacement"))
          k.rise("#u-r3", at("l07b"))
""")

scene(C, "inspect", "4 / 5 · Inspect", "Source: code.claude.com/docs/en/commands", """
        #i-title { left: 120px; top: 196px; }
        #i-table { left: 120px; top: 310px; width: 1680px; }
        #i-table .k-row { justify-content: flex-start; height: 130px; padding-left: 28px; }
        .i-cmd { display: block; width: 300px; }
        .i-what { width: 1300px; font-size: 32px; }
        #i-rule { left: 120px; top: 700px; width: 1680px; }
""", """
          <h2 id="i-title" class="k-abs k-title">Inspect: see what's really loaded</h2>
          <div id="i-table" class="k-abs">
            <div id="i-head" class="k-head"><span style="padding-left: 28px; width: 328px">Command</span><span style="flex: 1">Shows</span></div>
            <div id="i-r1" class="k-row"><span class="i-cmd"><span class="k-tag">/context</span></span><span class="k-dim i-what">What loaded and what each part costs, with what to trim when a tool or memory file gets heavy</span></div>
            <div id="i-r2" class="k-row"><span class="i-cmd"><span class="k-tag">/doctor</span></span><span class="k-dim i-what">A checkup of your installation, settings, extensions and rules files</span></div>
          </div>
          <div id="i-rule" class="k-abs k-title">Check both before you blame the model.</div>
""", """
          k.title("#i-title")
          k.fade("#i-head", at("l08"))
          k.rise("#i-r1", at("l08"))
          k.rise("#i-r2", at("l09"))
          k.rise("#i-rule", at("l10"))
          k.tint("#i-rule", at("l10") + 0.8)
""")

scene(C, "parallel", "5 / 5 · Parallel", "Sources: code.claude.com/docs/en/worktrees, /agent-view, /agent-teams; developers.openai.com/codex", """
        #p-title { left: 120px; top: 196px; }
        #p-cmd { left: 120px; top: 290px; width: 760px; }
        #p-note { left: 940px; top: 316px; width: 860px; }
        #p-ladder { left: 120px; top: 470px; width: 1680px; }
        #p-ladder .k-row { justify-content: flex-start; height: 88px; padding-left: 28px; }
        .p-what { display: block; width: 460px; }
        #p-codex { left: 120px; top: 830px; width: 1680px; display: flex; align-items: center; gap: 18px; }
""", """
          <h2 id="p-title" class="k-abs k-title">Run in parallel</h2>
          <div id="p-cmd" class="k-abs k-file">
            <div class="k-file-name">Terminal</div>
            <pre class="k-code"><span>claude <b>--worktree</b> feature-auth</span></pre>
          </div>
          <p id="p-note" class="k-abs k-dim">Each session gets its own checkout under .claude/worktrees/, so parallel work doesn't collide.</p>
          <div id="p-ladder" class="k-abs">
            <div id="p-head" class="k-head"><span style="padding-left: 28px; width: 488px">Then</span><span style="flex: 1">For</span></div>
            <div id="p-r1" class="k-row"><span class="p-what k-name">Subagents</span><span class="k-dim">Side tasks</span></div>
            <div id="p-r2" class="k-row"><span class="p-what k-name">Agent view</span><span class="k-dim">Watching background sessions</span></div>
            <div id="p-r3" class="k-row"><span class="p-what k-name">Agent teams</span><span class="k-dim">Agents that coordinate (experimental)</span></div>
          </div>
          <div id="p-codex" class="k-abs"><span id="p-cx" class="k-label">Codex</span><span id="p-c1" class="k-tag">/permissions</span><span id="p-c1d" class="k-dim" style="display: inline">approvals and the sandbox</span><span id="p-c2" class="k-tag">/review</span><span id="p-c2d" class="k-dim" style="display: inline">a second look at your changes</span></div>
""", """
          k.title("#p-title")
          k.rise("#p-cmd", at("l11", "dash dash"))
          k.fade("#p-note", at("l11", "and each session"))
          k.fade("#p-head", at("l12"))
          k.rise("#p-r1", at("l12", "subagents"))
          k.rise("#p-r2", at("l12", "agent view"))
          k.rise("#p-r3", at("l12", "and agent teams"))
          k.slide("#p-cx", at("l13"))
          k.pop("#p-c1", at("l13", "slash permissions"))
          k.fade("#p-c1d", at("l13", "for approvals"))
          k.pop("#p-c2", at("l13", "slash review"))
          k.fade("#p-c2d", at("l13", "for a second"))
""", last=True)
print("10 scenes written")
