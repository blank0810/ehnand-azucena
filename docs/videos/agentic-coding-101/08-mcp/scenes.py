import sys; sys.path.insert(0, "/home/blank/Desktop/Projects/Personal_Projects/agentic-coding-101-video/shared")
from scene import scene
C = "08-mcp"
S = "Source: code.claude.com/docs/en/mcp"

scene(C, "what", "1 / 4 · What it is", "Sources: code.claude.com/docs/en/mcp, modelcontextprotocol.io", """
        #w-title { left: 120px; top: 300px; width: 700px; }
        #w-label { left: 900px; top: 252px; }
        #w-sys { left: 900px; top: 320px; width: 900px; }
        #w-who { left: 900px; top: 600px; width: 900px; }
        .w-tags { display: flex; flex-wrap: wrap; gap: 16px; padding: 24px 0 0 28px; }
""", """
          <h1 id="w-title" class="k-abs k-title-xl">Outside systems, plugged in as tools</h1>
          <div id="w-label" class="k-abs k-label">Model Context Protocol, an open standard</div>
          <div id="w-sys" class="k-abs">
            <div id="w-sys-head" class="k-head"><span style="padding-left: 28px">For example</span></div>
            <div class="w-tags"><span id="w-t1" class="k-tag">A browser</span><span id="w-t2" class="k-tag">A database</span><span id="w-t3" class="k-tag">Your docs</span><span id="w-t4" class="k-tag">A search engine</span></div>
          </div>
          <div id="w-who" class="k-abs">
            <div id="w-who-head" class="k-head"><span style="padding-left: 28px">Supported by</span></div>
            <div class="w-tags"><span id="w-a1" class="k-tag">Claude Code</span><span id="w-a2" class="k-tag">Codex</span><span id="w-a3" class="k-tag">Cursor</span><span id="w-a4" class="k-tag">Many others</span></div>
          </div>
""", """
          k.slide("#w-label", at("l01", "Model Context"))
          k.fade("#w-sys-head", at("l02") - 0.2)
          ;[["#w-t1", "browser"], ["#w-t2", "database"], ["#w-t3", "docs"], ["#w-t4", "search"]].forEach(([el, w]) => k.pop(el, at("l02", w)))
          k.fade("#w-who-head", at("l03") - 0.2)
          ;[["#w-a1", "Claude Code"], ["#w-a2", "Codex"], ["#w-a3", "Cursor"], ["#w-a4", "many others"]].forEach(([el, w]) => k.pop(el, at("l03", w)))
""")

scene(C, "how", "2 / 4 · How it works", S, """
        #h-title { left: 120px; top: 196px; }
        .h-box { position: absolute; top: 300px; width: 440px; padding: 22px 28px; background: #ffffff; border: 2px solid #15191f; }
        .h-box .k-dim { margin-top: 8px; }
        #h-b1 { left: 120px; }
        #h-b2 { left: 740px; border-color: #164bc5; }
        #h-b3 { left: 1360px; }
        .h-link { position: absolute; top: 352px; width: 180px; height: 3px; background: #164bc5; transform-origin: 0 50%; }
        #h-k1 { left: 560px; }
        #h-k2 { left: 1180px; }
        #h-load { left: 120px; top: 520px; width: 1680px; }
        #h-load .k-row { justify-content: flex-start; height: 92px; padding-left: 28px; }
        .h-when { display: block; width: 420px; }
        #h-scope { left: 120px; top: 790px; width: 1680px; }
        #h-order { display: flex; gap: 40px; align-items: center; padding: 22px 0 0 28px; }
        .h-step { display: flex; gap: 14px; align-items: center; }
""", """
          <h2 id="h-title" class="k-abs k-title">Agent, server, system</h2>
          <div id="h-b1" class="h-box"><span class="k-name">Agent</span><span class="k-dim">Calls a tool by name</span></div>
          <i id="h-k1" class="h-link"></i>
          <div id="h-b2" class="h-box"><span class="k-name k-cobalt">MCP server</span><span class="k-dim">On your machine, or remote over HTTP</span></div>
          <i id="h-k2" class="h-link"></i>
          <div id="h-b3" class="h-box"><span class="k-name">System</span><span class="k-dim">Browser, database, docs</span></div>
          <div id="h-load" class="k-abs">
            <div id="h-load-head" class="k-head"><span style="padding-left: 28px; width: 448px">When</span><span style="flex: 1">What loads</span></div>
            <div id="h-l1" class="k-row"><span class="h-when k-name">Session start</span><span class="k-dim">Tool names only</span></div>
            <div id="h-l2" class="k-row"><span class="h-when k-name">A tool is needed</span><span class="k-dim">Its full definition</span></div>
          </div>
          <div id="h-scope" class="k-abs">
            <div id="h-scope-head" class="k-head"><span style="padding-left: 28px">Scopes, first wins</span></div>
            <div id="h-order"><span id="h-s1" class="h-step"><b class="k-num">1</b><span class="k-name">Local</span></span><span id="h-s2" class="h-step"><b class="k-num">2</b><span class="k-tag">.mcp.json</span><span class="k-dim">project</span></span><span id="h-s3" class="h-step"><b class="k-num">3</b><span class="k-name">User config</span></span></div>
          </div>
""", """
          k.title("#h-title")
          k.rise("#h-b1", at("l04"))
          k.draw("#h-k1", at("l04", "talks to"), 0.4)
          k.rise("#h-b2", at("l04", "an M C P server"))
          k.draw("#h-k2", at("l04", "and the server"), 0.4)
          k.rise("#h-b3", at("l04", "the system"))
          tl.fromTo("#h-b2", { borderColor: "#15191f" }, { borderColor: "#164bc5", duration: 0.3, immediateRender: false }, at("l05"))
          k.fade("#h-load-head", at("l06"))
          k.rise("#h-l1", at("l06", "only tool names"))
          k.rise("#h-l2", at("l06", "Full definitions"))
          k.fade("#h-scope-head", at("l07"))
          k.slide("#h-s1", at("l07", "local first"))
          k.slide("#h-s2", at("l07", "the project"))
          k.slide("#h-s3", at("l07", "your user"))
""")

scene(C, "example", "3 / 4 · Example", "Sources: Firecrawl MCP search; developers.openai.com/codex/agent-configuration/agents-md", """
        #e-title { left: 120px; top: 196px; }
        #e-call { left: 120px; top: 290px; width: 980px; }
        #e-became { left: 1160px; top: 290px; width: 640px; }
        #e-became .k-code { white-space: pre-wrap; }
        #e-trace { left: 1160px; top: 640px; width: 640px; }
        #e-trace .k-dim { margin-top: 12px; }
        #e-memory { left: 120px; top: 860px; width: 980px; }
""", """
          <h2 id="e-title" class="k-abs k-title">How these clips were checked</h2>
          <div id="e-call" class="k-abs k-file">
            <div class="k-file-name">Tool call: firecrawl_search</div>
            <pre class="k-code"><span class="e-q">query: "Codex AGENTS.md</span><span class="e-q">        project_doc_max_bytes"</span><span class="e-q"> </span><span class="e-r"><i>returned, from developers.openai.com:</i></span><span class="e-r">"...stops adding files once the combined</span><span class="e-r"> size reaches the limit defined by</span><span class="e-r"> project_doc_max_bytes (<b>32 KiB by default</b>)."</span></pre>
          </div>
          <div id="e-became" class="k-abs k-file">
            <div class="k-file-name">Became, in clip 03</div>
            <pre class="k-code"><span>"Codex reads AGENTS.md, and stops adding files at thirty-two kilobytes by default."</span></pre>
          </div>
          <div id="e-trace" class="k-abs">
            <div id="e-trace-label" class="k-label">Every claim has a source</div>
            <span id="e-trace-dim" class="k-dim">Each clip lists its sources on screen.</span>
          </div>
          <p id="e-memory" class="k-abs k-dim">Without it, the agent works from memory, which can be out of date.</p>
""", """
          k.title("#e-title")
          k.fade("#e-call", at("l08"))
          k.lines("#e-call .e-q", at("l08", "web search"), 0.15)
          k.lines("#e-call .e-r", at("l09"), 0.2)
          k.rise("#e-became", at("l09", "and the agent compared"))
          k.slide("#e-trace-label", at("l09b"))
          k.fade("#e-trace-dim", at("l09b", "and each clip"))
          k.rise("#e-memory", at("l10"))
""")

scene(C, "gotchas", "4 / 4 · Gotchas", "Sources: code.claude.com/docs/en/mcp, developers.openai.com/codex/mcp", """
        #g-left { left: 120px; top: 196px; width: 860px; }
        #g-left .k-row { height: 110px; padding-left: 28px; }
        #g-left .k-dim { width: 360px; }
        #g-right { left: 1060px; top: 196px; width: 740px; }
        #g-file { margin-top: 30px; }
        #g-same { left: 1060px; top: 660px; width: 740px; }
        .g-head { margin-top: 30px; }
""", """
          <div id="g-left" class="k-abs">
            <h2 id="g-t1" class="k-title">Before you add one</h2>
            <div id="g-h1" class="k-head g-head"><span style="padding-left: 28px">Watch</span><span style="width: 360px">So</span></div>
            <div id="g-r1" class="k-row"><span class="k-name">New permissions</span><span class="k-dim">Add only what you trust</span></div>
            <div id="g-r2" class="k-row"><span class="k-name">Big results</span><span class="k-dim">They land in your context</span></div>
            <div id="g-r3" class="k-row"><span class="k-name">Access isn't know-how</span><span class="k-dim">Pair the server with a skill</span></div>
          </div>
          <div id="g-right" class="k-abs">
            <h2 id="g-t2" class="k-title">Codex</h2>
            <div id="g-file" class="k-file">
              <div class="k-file-name">~/.codex/config.toml</div>
              <pre class="k-code"><span><b>[mcp_servers.playwright]</b></span><span>command = "npx"</span><span>args = ["@playwright/mcp@latest"]</span></pre>
            </div>
          </div>
          <p id="g-same" class="k-abs k-dim">The same servers work in Claude Code and Codex.</p>
""", """
          k.title("#g-t1")
          k.fade("#g-h1", at("l11") - 0.2)
          k.rise("#g-r1", at("l11"))
          k.rise("#g-r2", at("l12"))
          k.rise("#g-r3", at("l13"))
          k.title("#g-t2", at("l14"))
          k.rise("#g-file", at("l14", "under M C P"))
          k.rise("#g-same", at("l14", "and the same"))
""", last=True)
print("08 scenes written")
