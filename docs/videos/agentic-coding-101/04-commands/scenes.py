import sys; sys.path.insert(0, "/home/blank/Desktop/Projects/Personal_Projects/agentic-coding-101-video/shared")
from scene import scene
C = "04-commands"
S1 = "Source: code.claude.com/docs/en/commands"
S2 = "Source: code.claude.com/docs/en/skills"

scene(C, "what", "1 / 4 · What it is", S1, """
        #w-title { left: 120px; top: 300px; width: 700px; }
        #w-input { left: 120px; top: 600px; width: 640px; }
        #w-builtin { left: 900px; top: 252px; width: 900px; }
        #w-builtin .k-row { height: 104px; padding-left: 28px; }
        #w-builtin .k-dim { width: 480px; }
""", """
          <h1 id="w-title" class="k-abs k-title-xl">A saved prompt behind a slash</h1>
          <div id="w-input" class="k-abs k-file">
            <div class="k-file-name">Prompt</div>
            <pre class="k-code"><span><b>/deploy</b> staging</span></pre>
          </div>
          <div id="w-builtin" class="k-abs">
            <div id="w-head" class="k-head"><span style="padding-left: 28px">Built in</span><span style="width: 480px">What it does</span></div>
            <div id="w-r1" class="k-row"><span class="k-tag">/clear</span><span class="k-dim">Starts a new conversation</span></div>
            <div id="w-r2" class="k-row"><span class="k-tag">/compact</span><span class="k-dim">Summarizes it to free context</span></div>
            <div id="w-r3" class="k-row"><span class="k-tag">/context</span><span class="k-dim">Shows what's loaded</span></div>
            <div id="w-r4" class="k-row"><span class="k-tag">/model</span><span class="k-dim">Switches the model</span></div>
          </div>
""", """
          k.rise("#w-input", at("l02"))
          k.fade("#w-head", at("l03"))
          k.rise("#w-r1", at("l03", "slash clear"))
          k.rise("#w-r2", at("l03", "slash compact"))
          k.rise("#w-r3", at("l03", "slash context"))
          k.rise("#w-r4", at("l03", "slash model"))
""")

scene(C, "how", "2 / 4 · How it works", S2, """
        #h-title { left: 120px; top: 196px; }
        #h-files { left: 120px; top: 300px; width: 1000px; }
        #h-files .k-row { height: 104px; padding-left: 28px; }
        #h-same { left: 1240px; top: 350px; width: 560px; }
        #h-big { display: inline-block; padding: 10px 24px; background: #164bc5; color: #ffffff; font-size: 44px; }
        #h-same .k-dim { margin-top: 18px; }
        #h-args { left: 120px; top: 590px; width: 1000px; }
        #h-home { left: 120px; top: 830px; width: 1000px; }
        #h-home .k-row { height: 96px; padding-left: 28px; }
""", """
          <h2 id="h-title" class="k-abs k-title">Commands are skills now</h2>
          <div id="h-files" class="k-abs">
            <div id="h-head" class="k-head"><span style="padding-left: 28px">Either file</span></div>
            <div id="h-r1" class="k-row"><span class="k-tag">.claude/commands/deploy.md</span></div>
            <div id="h-r2" class="k-row"><span class="k-tag">.claude/skills/deploy/SKILL.md</span></div>
          </div>
          <div id="h-same" class="k-abs">
            <span id="h-big" class="k-tag">/deploy</span>
            <span class="k-dim">The same command, either way</span>
          </div>
          <div id="h-args" class="k-abs k-file">
            <div class="k-file-name">You type /deploy staging, and the file receives</div>
            <pre class="k-code"><span><b>$ARGUMENTS</b> = staging</span></pre>
          </div>
          <div id="h-home" class="k-abs">
            <div id="h-r3" class="k-row"><span class="k-tag">~/.claude/skills/deploy/</span><span class="k-dim" style="width: 420px">Yours, in every project</span></div>
          </div>
""", """
          k.title("#h-title")
          k.fade("#h-head", at("l05"))
          k.rise("#h-r1", at("l05", "dot claude slash commands"))
          k.rise("#h-r2", at("l05", "a skill at"))
          k.pop("#h-same", at("l05", "both give you"))
          k.rise("#h-args", at("l06"))
          k.rise("#h-r3", at("l06b"))
""")

scene(C, "example", "3 / 4 · Example", S2, """
        #e-title { left: 120px; top: 196px; }
        #e-file { left: 120px; top: 290px; width: 960px; }
        #e-notes { left: 1180px; top: 290px; width: 620px; }
        #e-notes .k-row { display: block; height: auto; padding: 22px 0 22px 28px; }
        #e-notes .k-dim { margin-top: 6px; }
""", """
          <h2 id="e-title" class="k-abs k-title">A command only you can run</h2>
          <div id="e-file" class="k-abs k-file">
            <div class="k-file-name">.claude/skills/deploy/SKILL.md</div>
            <pre class="k-code"><span class="e-fm">---</span><span class="e-fm">name: deploy</span><span class="e-fm">description: Deploy to an environment</span><span id="e-dmi" class="e-fm">disable-model-invocation: true</span><span class="e-fm">---</span><span class="e-body">Deploy to $ARGUMENTS:</span><span class="e-body">1. Build the site.</span><span class="e-body">2. Run the checks.</span><span class="e-body">3. Deploy to $ARGUMENTS.</span></pre>
          </div>
          <div id="e-notes" class="k-abs">
            <div id="e-head" class="k-head"><span style="padding-left: 28px">What that buys you</span></div>
            <div id="e-n1" class="k-row"><span class="k-name">Only you can run it</span><span class="k-dim">The agent can't trigger it on its own</span></div>
            <div id="e-n2" class="k-row"><span class="k-name">Steps in plain words</span><span class="k-dim">No code, just the procedure</span></div>
            <div id="e-n3" class="k-row"><span class="k-name">No surprise deploys</span><span class="k-dim">Not when the code merely looks ready</span></div>
            <div id="e-n4" class="k-row"><span class="k-name">Zero context until run</span><span class="k-dim">Its description isn't loaded either</span></div>
          </div>
""", """
          k.title("#e-title")
          k.fade("#e-file", at("l07"))
          k.lines("#e-file .e-fm", at("l07") + 0.2, 0.1)
          k.tint("#e-dmi", at("l08", "disable model"))
          k.fade("#e-head", at("l08", "disable model"))
          k.rise("#e-n1", at("l08", "so only you"))
          k.lines("#e-file .e-body", at("l08b"), 0.2)
          k.rise("#e-n2", at("l08b", "plain words"))
          k.rise("#e-n3", at("l09"))
          k.rise("#e-n4", at("l10"))
""")

scene(C, "gotchas", "4 / 4 · Gotchas", "Sources: code.claude.com/docs/en/skills, developers.openai.com/codex/custom-prompts", """
        #g-left { left: 120px; top: 196px; width: 840px; }
        #g-left .k-row { height: 118px; padding-left: 28px; }
        #g-left .k-dim { width: 340px; }
        #g-right { left: 1040px; top: 196px; width: 760px; }
        #g-right .k-row { height: 118px; padding-left: 28px; }
        .g-head { margin-top: 30px; }
        #g-tags { display: flex; gap: 14px; }
""", """
          <div id="g-left" class="k-abs">
            <h2 id="g-t1" class="k-title">When to make one</h2>
            <div id="g-h1" class="k-head g-head"><span style="padding-left: 28px">Signal</span><span style="width: 340px">Do</span></div>
            <div id="g-r1" class="k-row"><span class="k-name">The same prompt, again</span><span class="k-dim">Save it as a command</span></div>
            <div id="g-r2" class="k-row"><span class="k-name">The team needs it</span><span class="k-dim">Commit it to .claude/</span></div>
            <div id="g-r3" class="k-row"><span class="k-name">It has side effects</span><span class="k-dim">Keep it manual</span></div>
          </div>
          <div id="g-right" class="k-abs">
            <h2 id="g-t2" class="k-title">Codex</h2>
            <div id="g-h2" class="k-head g-head"><span style="padding-left: 28px">Commands</span></div>
            <div id="g-c1" class="k-row"><span id="g-tags"><span class="k-tag">/init</span><span class="k-tag">/review</span><span class="k-tag">/model</span></span><span class="k-dim">Built in</span></div>
            <div id="g-c2" class="k-row"><span class="k-name">Custom prompts</span><span class="k-dim">Deprecated: <span class="k-cobalt">write a skill</span></span></div>
          </div>
""", """
          k.title("#g-t1")
          k.fade("#g-h1", at("l11") - 0.2)
          k.rise("#g-r1", at("l11"))
          k.rise("#g-r2", at("l12"))
          k.rise("#g-r3", at("l13"))
          k.title("#g-t2", at("l14"))
          k.fade("#g-h2", at("l14") + 0.3)
          k.rise("#g-c1", at("l14", "slash init"))
          k.rise("#g-c2", at("l15"))
""", last=True)
print("04 scenes written")
