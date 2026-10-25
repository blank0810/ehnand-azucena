import sys; sys.path.insert(0, "/home/blank/Desktop/Projects/Personal_Projects/agentic-coding-101-video/shared")
from scene import scene
C = "03-rules"
SRC = "Sources: code.claude.com/docs/en/memory, developers.openai.com/codex/agent-configuration/agents-md"

scene(C, "what", "1 / 4 · What it is", "Source: code.claude.com/docs/en/memory", """
        #w-title { left: 120px; top: 300px; width: 700px; }
        #w-names { left: 900px; top: 252px; width: 900px; }
        #w-names .k-row { height: 110px; padding-left: 28px; }
        #w-names .k-dim { width: 420px; }
        #w-what { left: 900px; top: 600px; width: 900px; }
        #w-tags { display: flex; flex-wrap: wrap; gap: 16px; padding: 26px 0 0 28px; }
""", """
          <h1 id="w-title" class="k-abs k-title-xl">Plain Markdown, read every session</h1>
          <div id="w-names" class="k-abs">
            <div id="w-head" class="k-head"><span style="padding-left: 28px">File</span><span style="width: 420px">Read by</span></div>
            <div id="w-r1" class="k-row"><span class="k-tag">CLAUDE.md</span><span class="k-dim">Claude Code</span></div>
            <div id="w-r2" class="k-row"><span class="k-tag">AGENTS.md</span><span class="k-dim">Codex and many other agents</span></div>
          </div>
          <div id="w-what" class="k-abs">
            <div id="w-what-head" class="k-head"><span style="padding-left: 28px">What goes in it</span></div>
            <div id="w-tags">
              <span id="w-t1" class="k-tag">Build commands</span><span id="w-t2" class="k-tag">Conventions</span><span id="w-t3" class="k-tag">Where things live</span><span id="w-t4" class="k-tag">What never to do</span>
            </div>
          </div>
""", """
          k.fade("#w-head", at("l02") - 0.2)
          k.rise("#w-r1", at("l02", "Claude dot"))
          k.rise("#w-r2", at("l02", "Codex"))
          k.fade("#w-what-head", at("l03", "new teammate"))
          k.pop("#w-t1", at("l03", "build commands"))
          k.pop("#w-t2", at("l03", "conventions"))
          k.pop("#w-t3", at("l03", "where things"))
          k.pop("#w-t4", at("l03", "what never"))
""")

scene(C, "how", "2 / 4 · How it works", "Source: code.claude.com/docs/en/memory", """
        #h-title { left: 120px; top: 196px; }
        #h-order { left: 120px; top: 300px; width: 900px; }
        #h-order .k-row { justify-content: flex-start; height: 100px; }
        .h-n { display: block; width: 64px; padding-left: 20px; }
        .h-who { display: block; width: 300px; }
        #h-ctx { left: 1100px; top: 300px; width: 700px; }
        #h-sent { left: 1100px; top: 740px; width: 700px; }
        #h-sent .k-dim { margin-top: 12px; }
""", """
          <h2 id="h-title" class="k-abs k-title">Broad to specific</h2>
          <div id="h-order" class="k-abs">
            <div id="h-head" class="k-head"><span style="padding-left: 20px">Load order</span><span style="width: 470px">File</span></div>
            <div id="h-r1" class="k-row"><b class="h-n k-num">1</b><span class="h-who k-name">Organization</span><span class="k-tag">/etc/claude-code/CLAUDE.md</span></div>
            <div id="h-r2" class="k-row"><b class="h-n k-num">2</b><span class="h-who k-name">You</span><span class="k-tag">~/.claude/CLAUDE.md</span></div>
            <div id="h-r3" class="k-row"><b class="h-n k-num">3</b><span class="h-who k-name">Project</span><span class="k-tag">./CLAUDE.md</span></div>
            <div id="h-r4" class="k-row"><b class="h-n k-num">4</b><span class="h-who k-name">A folder</span><span class="k-tag">src/api/CLAUDE.md</span></div>
          </div>
          <div id="h-ctx" class="k-abs k-file">
            <div class="k-file-name">What the agent receives</div>
            <pre class="k-code"><span id="h-c1"><i># organization rules</i></span><span id="h-c2"><i># your rules</i></span><span id="h-c3"><i># project rules</i></span><span id="h-c4"><b># src/api rules, read last</b></span></pre>
          </div>
          <div id="h-sent" class="k-abs">
            <div id="h-sent-label" class="k-label">Sent with every request</div>
            <span id="h-sent-dim" class="k-dim">Every line costs context, every time.</span>
          </div>
""", """
          k.title("#h-title")
          k.fade("#h-head", at("l04", "broad"))
          k.rise("#h-r1", at("l05"))
          k.rise("#h-r2", at("l05", "then yours"))
          k.rise("#h-r3", at("l05", "then the project"))
          k.rise("#h-r4", at("l05", "then any folder"))
          k.fade("#h-ctx", at("l06"))
          k.lines("#h-c1, #h-c2, #h-c3, #h-c4", at("l06", "combined"), 0.25)
          k.slide("#h-sent-label", at("l07"))
          k.fade("#h-sent-dim", at("l07", "so every line"))
""")

scene(C, "example", "3 / 4 · Example", "Source: code.claude.com/docs/en/memory", """
        #e-title { left: 120px; top: 196px; }
        #e-main { left: 120px; top: 300px; width: 860px; }
        #e-rule { left: 1060px; top: 300px; width: 740px; }
        #e-note { left: 1060px; top: 650px; width: 740px; }
""", """
          <h2 id="e-title" class="k-abs k-title">A short rules file</h2>
          <div id="e-main" class="k-abs k-file">
            <div class="k-file-name">CLAUDE.md</div>
            <pre class="k-code"><span id="e-l1"><i># Project rules</i></span><span id="e-l2"><b>@AGENTS.md</b></span><span id="e-l3"> </span><span id="e-l4">- Use pnpm, not npm.</span><span id="e-l5">- Run the tests before committing.</span></pre>
          </div>
          <div id="e-rule" class="k-abs k-file">
            <div class="k-file-name">.claude/rules/api.md</div>
            <pre class="k-code"><span>---</span><span><b>paths:</b></span><span>  - "src/api/**"</span><span>---</span><span>- Validate every input.</span><span>- Use the shared error format.</span></pre>
          </div>
          <p id="e-note" class="k-abs k-dim">Loads only when the agent reads or edits a file under src/api/.</p>
""", """
          k.title("#e-title")
          k.fade("#e-main", at("l08"))
          k.lines("#e-l1", at("l08") + 0.3)
          k.lines("#e-l4", at("l09", "use pnpm"))
          k.lines("#e-l5", at("l09", "run the tests"))
          k.lines("#e-l2", at("l10", "import"))
          k.fade("#e-rule", at("l11"))
          k.lines("#e-rule .k-code span", at("l11") + 0.3, 0.1)
          k.rise("#e-note", at("l11", "so it loads"))
""")

scene(C, "gotchas", "4 / 4 · Gotchas", SRC, """
        #g-left { left: 120px; top: 196px; width: 840px; }
        #g-left .k-row { height: 120px; padding-left: 28px; }
        #g-left .k-dim { width: 380px; }
        #g-right { left: 1040px; top: 196px; width: 760px; }
        #g-right .k-row { height: 120px; padding-left: 28px; }
        #g-right .k-dim { width: 440px; }
        .g-head { margin-top: 30px; }
""", """
          <div id="g-left" class="k-abs">
            <h2 id="g-t1" class="k-title">Keep it lean</h2>
            <div id="g-h1" class="k-head g-head"><span style="padding-left: 28px">Rule</span><span style="width: 380px">Why</span></div>
            <div id="g-r1" class="k-row"><span class="k-name">Under 200 lines</span><span class="k-dim">Longer costs context and gets followed less</span></div>
            <div id="g-r2" class="k-row"><span class="k-name">Imports don't shrink it</span><span class="k-dim">Imported files load too</span></div>
            <div id="g-r3" class="k-row"><span class="k-name">Prune contradictions</span><span class="k-dim">The agent may pick either one</span></div>
          </div>
          <div id="g-right" class="k-abs">
            <h2 id="g-t2" class="k-title">Codex</h2>
            <div id="g-h2" class="k-head g-head"><span style="padding-left: 28px">Reads</span><span style="width: 440px">Limit</span></div>
            <div id="g-c1" class="k-row"><span class="k-tag">AGENTS.md</span><span class="k-dim">Stops adding files at <span class="k-cobalt">32 KiB</span> combined, by default</span></div>
          </div>
""", """
          k.title("#g-t1")
          k.fade("#g-h1", at("l12") - 0.2)
          k.rise("#g-r1", at("l12"))
          k.rise("#g-r2", at("l13"))
          k.rise("#g-r3", at("l14"))
          k.title("#g-t2", at("l15"))
          k.fade("#g-h2", at("l15") + 0.3)
          k.rise("#g-c1", at("l15", "and stops"))
""", last=True)
print("03 scenes written")
