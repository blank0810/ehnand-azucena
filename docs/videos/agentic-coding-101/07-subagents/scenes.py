import sys; sys.path.insert(0, "/home/blank/Desktop/Projects/Personal_Projects/agentic-coding-101-video/shared")
from scene import scene
C = "07-subagents"
S = "Source: code.claude.com/docs/en/sub-agents"

scene(C, "what", "1 / 4 · What it is", S, """
        #w-title { left: 120px; top: 300px; width: 700px; }
        #w-main { left: 900px; top: 252px; width: 900px; }
        #w-sub { left: 1000px; top: 560px; width: 800px; }
        #w-task { left: 920px; top: 470px; }
        #w-back { left: 920px; top: 860px; }
""", """
          <h1 id="w-title" class="k-abs k-title-xl">A worker with its own context</h1>
          <div id="w-main" class="k-abs k-file">
            <div class="k-file-name">Main session</div>
            <pre class="k-code"><span>Your conversation, your context</span></pre>
          </div>
          <div id="w-task" class="k-abs k-label">Side task ↓</div>
          <div id="w-sub" class="k-abs k-file">
            <div class="k-file-name">Subagent</div>
            <pre class="k-code"><span id="w-s1">Its own context</span><span id="w-s2">Its own tools</span><span id="w-s3">Its own instructions</span></pre>
          </div>
          <div id="w-back" class="k-abs k-label">↑ Only a summary comes back</div>
""", """
          k.fade("#w-main", at("l01") - 0.2)
          k.rise("#w-sub", at("l01", "separate worker"))
          k.lines("#w-s1", at("l01", "own context"))
          k.lines("#w-s2", at("l01", "tools"))
          k.lines("#w-s3", at("l01", "instructions"))
          k.slide("#w-task", at("l02"))
          k.slide("#w-back", at("l02", "hands back"))
""")

scene(C, "how", "2 / 4 · How it works", S, """
        #h-title { left: 120px; top: 196px; }
        #h-scale { right: 120px; top: 256px; }
        .h-row { position: absolute; left: 120px; width: 1680px; }
        .h-row .k-dim { margin-bottom: 10px; }
        .h-bar { display: block; height: 40px; transform-origin: 0 50%; }
        #h-a { top: 300px; }
        #h-b { top: 420px; }
        #h-c { top: 540px; }
        #h-ab { width: 1300px; background: rgba(22, 75, 197, 0.45); }
        #h-bb { width: 70px; background: #164bc5; }
        #h-cb { width: 1300px; background: #87919d; }
        #h-note { left: 120px; top: 660px; width: 1680px; }
        #h-built { left: 120px; top: 760px; width: 800px; }
        #h-tags { display: flex; flex-wrap: wrap; gap: 14px; padding-top: 22px; }
        #h-ask { left: 980px; top: 760px; width: 820px; }
""", """
          <h2 id="h-title" class="k-abs k-title">Forty files, ten lines</h2>
          <div id="h-scale" class="k-abs k-dim">Illustrative, not to scale</div>
          <div id="h-a" class="h-row"><span class="k-dim">Your context, if the main session reads all forty files</span><i id="h-ab" class="h-bar"></i></div>
          <div id="h-b" class="h-row"><span class="k-dim">Your context, if a subagent reads them and returns ten lines</span><i id="h-bb" class="h-bar"></i></div>
          <div id="h-c" class="h-row"><span class="k-dim">The subagent's own window, discarded after</span><i id="h-cb" class="h-bar"></i></div>
          <div id="h-note" class="k-abs k-label">It starts fresh: no history of your conversation</div>
          <div id="h-built" class="k-abs">
            <div id="h-built-head" class="k-head"><span>Built in, and your own</span></div>
            <div id="h-tags"><span id="h-t1" class="k-tag">Explore</span><span id="h-t2" class="k-tag">Plan</span><span id="h-t3" class="k-tag">general-purpose</span><span id="h-t4" class="k-tag">.claude/agents/</span></div>
          </div>
          <div id="h-ask" class="k-abs k-file">
            <div class="k-file-name">Or ask for one</div>
            <pre class="k-code"><span>Use a subagent to find every</span><span>place the config is read.</span></pre>
          </div>
""", """
          k.title("#h-title")
          k.fade("#h-scale", at("l03") + 0.3)
          k.fade("#h-a .k-dim", at("l04"))
          k.draw("#h-ab", at("l04", "all forty"), 1.2)
          k.fade("#h-b .k-dim", at("l05"))
          k.fade("#h-c .k-dim", at("l05", "in its own window"))
          k.draw("#h-cb", at("l05", "in its own window"), 1.0)
          k.draw("#h-bb", at("l05", "then returns"), 0.4)
          k.slide("#h-note", at("l06"))
          k.fade("#h-built-head", at("l07"))
          k.pop("#h-t1", at("l07", "Explore"))
          k.pop("#h-t2", at("l07", "Plan"))
          k.pop("#h-t3", at("l07", "general purpose"))
          k.pop("#h-t4", at("l07", "Your own"))
          k.rise("#h-ask", at("l07b"))
""")

scene(C, "example", "3 / 4 · Example", "Source: this repository's .claude/agents/article-writer.md", """
        #e-title { left: 120px; top: 196px; }
        #e-file { left: 120px; top: 290px; width: 960px; }
        #e-tools { left: 1140px; top: 290px; width: 660px; }
        #e-tags { display: flex; flex-wrap: wrap; gap: 12px; padding-top: 22px; }
        #e-hand { left: 1140px; top: 640px; width: 660px; }
        #e-hand .k-dim { margin-top: 12px; }
""", """
          <h2 id="e-title" class="k-abs k-title">This portfolio's article writer</h2>
          <div id="e-file" class="k-abs k-file">
            <div class="k-file-name">.claude/agents/article-writer.md</div>
            <pre class="k-code"><span>---</span><span>name: <b>article-writer</b></span><span id="e-d1">description: &gt;</span><span id="e-d2">  Portfolio article writer for ehnand.com.</span><span id="e-d3">  <b>Use proactively whenever asked to</b> write,</span><span id="e-d4">  draft, plan, revise ... an article ...</span><span>tools: Read, Write, Edit, Bash, ...</span><span>---</span><span class="e-h">## Hard rules, never traded away</span><span class="e-h">## The house form</span><span class="e-h">## The verification gate</span></pre>
          </div>
          <div id="e-tools" class="k-abs">
            <div id="e-tools-head" class="k-head"><span>Tools it may use</span></div>
            <div id="e-tags"><span class="k-tag">Read</span><span class="k-tag">Write</span><span class="k-tag">Edit</span><span class="k-tag">Bash</span><span class="k-tag">Glob</span><span class="k-tag">Grep</span><span class="k-tag">WebFetch</span><span class="k-tag">WebSearch</span><span class="k-tag">Skill</span></div>
          </div>
          <div id="e-hand" class="k-abs">
            <div id="e-hand-label" class="k-label">The description is the handoff</div>
            <span id="e-hand-dim" class="k-dim">"Use proactively whenever asked to write..." tells the main agent when to call it.</span>
          </div>
""", """
          k.title("#e-title")
          k.fade("#e-file", at("l08"))
          k.lines("#e-file .k-code span:not(.e-h)", at("l08") + 0.3, 0.1)
          k.fade("#e-tools-head", at("l09", "the tools"))
          k.lines("#e-tags .k-tag", at("l09", "the tools"), 0.06)
          k.lines("#e-file .e-h", at("l09", "the house rules"), 0.3)
          k.tint("#e-d3", at("l10"))
          k.slide("#e-hand-label", at("l10"))
          k.fade("#e-hand-dim", at("l10") + 0.3)
""")

scene(C, "gotchas", "4 / 4 · Gotchas", "Sources: code.claude.com/docs/en/sub-agents, developers.openai.com/codex/subagents", """
        #g-left { left: 120px; top: 196px; width: 900px; }
        #g-left .k-row { height: 100px; padding-left: 28px; }
        #g-left .k-dim { width: 380px; }
        #g-when { left: 120px; top: 760px; width: 900px; }
        #g-when .k-dim { margin-top: 12px; }
        #g-when-label { line-height: 1.35; }
        #g-right { left: 1100px; top: 196px; width: 700px; }
        #g-right .k-row { height: 104px; padding-left: 28px; }
        .g-head { margin-top: 30px; }
""", """
          <div id="g-left" class="k-abs">
            <h2 id="g-t1" class="k-title">The costs</h2>
            <div id="g-h1" class="k-head g-head"><span style="padding-left: 28px">Cost</span><span style="width: 380px">So</span></div>
            <div id="g-r1" class="k-row"><span class="k-name">Summaries lose detail</span><span class="k-dim">You see only what it reports</span></div>
            <div id="g-r2" class="k-row"><span class="k-name">More tokens overall</span><span class="k-dim">Each builds its own context</span></div>
            <div id="g-r3" class="k-row"><span class="k-name">It knows nothing yet</span><span class="k-dim">Give it a full brief</span></div>
          </div>
          <div id="g-when" class="k-abs">
            <div id="g-when-label" class="k-label">Use one when a side task would flood the conversation</div>
            <span id="g-when-dim" class="k-dim">The setup behind this series now defaults to the main session.</span>
          </div>
          <div id="g-right" class="k-abs">
            <h2 id="g-t2" class="k-title">Codex</h2>
            <div id="g-h2" class="k-head g-head"><span style="padding-left: 28px">Custom agents</span></div>
            <div id="g-c1" class="k-row"><span class="k-tag">config.toml</span><span class="k-dim">Defined in TOML</span></div>
          </div>
""", """
          k.title("#g-t1")
          k.fade("#g-h1", at("l11") - 0.2)
          k.rise("#g-r1", at("l11"))
          k.rise("#g-r2", at("l12"))
          k.rise("#g-r3", at("l12b"))
          k.slide("#g-when-label", at("l13"))
          k.fade("#g-when-dim", at("l13", "The setup behind"))
          k.title("#g-t2", at("l14"))
          k.fade("#g-h2", at("l14") + 0.3)
          k.rise("#g-c1", at("l14", "defined"))
""", last=True)
print("07 scenes written")
