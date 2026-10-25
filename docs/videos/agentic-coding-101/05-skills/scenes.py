import sys; sys.path.insert(0, "/home/blank/Desktop/Projects/Personal_Projects/agentic-coding-101-video/shared")
from scene import scene
C = "05-skills"
S = "Source: code.claude.com/docs/en/skills"

scene(C, "what", "1 / 4 · What it is", "Sources: code.claude.com/docs/en/skills, agentskills.io", """
        #w-title { left: 120px; top: 300px; width: 700px; }
        #w-tree { left: 900px; top: 252px; width: 900px; }
        #w-fields { left: 900px; top: 560px; width: 900px; }
        #w-tags { display: flex; gap: 16px; padding: 24px 0 0 28px; }
        #w-std { left: 900px; top: 760px; width: 900px; }
        #w-std .k-dim { margin-top: 12px; }
""", """
          <h1 id="w-title" class="k-abs k-title-xl">Know-how in a folder</h1>
          <div id="w-tree" class="k-abs k-file">
            <div class="k-file-name">.claude/skills/</div>
            <pre class="k-code"><span id="w-l1">my-skill/</span><span id="w-l2">  <b>SKILL.md</b></span><span id="w-l3">  scripts/check.sh</span><span id="w-l4">  reference.md</span></pre>
          </div>
          <div id="w-fields" class="k-abs">
            <div id="w-head" class="k-head"><span style="padding-left: 28px">SKILL.md holds</span></div>
            <div id="w-tags"><span id="w-t1" class="k-tag">name</span><span id="w-t2" class="k-tag">description</span><span id="w-t3" class="k-tag">instructions</span></div>
          </div>
          <div id="w-std" class="k-abs">
            <div id="w-std-label" class="k-label">An open standard</div>
            <span id="w-std-dim" class="k-dim">Claude Code and Codex read the same format (agentskills.io)</span>
          </div>
""", """
          k.fade("#w-tree", at("l01") - 0.2)
          k.lines("#w-l1, #w-l2", at("l01", "folder"), 0.4)
          k.fade("#w-head", at("l01", "inside"))
          k.pop("#w-t1", at("l01", "a name"))
          k.pop("#w-t2", at("l01", "a description"))
          k.pop("#w-t3", at("l01", "instructions"))
          k.lines("#w-l3", at("l02", "scripts"))
          k.lines("#w-l4", at("l02", "reference"))
          k.slide("#w-std-label", at("l03"))
          k.fade("#w-std-dim", at("l03", "so Claude"))
""")

scene(C, "how", "2 / 4 · How it works", S, """
        #h-title { left: 120px; top: 196px; }
        #h-table { left: 120px; top: 300px; width: 1680px; }
        #h-table .k-row { justify-content: flex-start; height: 130px; padding-left: 28px; }
        .h-when { display: block; width: 420px; }
        .h-what { display: block; width: 520px; }
        .h-bar { display: block; height: 34px; background: #164bc5; }
        #h-scale { right: 120px; top: 256px; }
        #h-note { left: 120px; top: 780px; width: 1680px; }
        #h-note .k-dim { margin-top: 12px; }
""", """
          <h2 id="h-title" class="k-abs k-title">Loaded in stages</h2>
          <div id="h-scale" class="k-abs k-dim">Illustrative, not to scale</div>
          <div id="h-table" class="k-abs">
            <div id="h-head" class="k-head"><span style="padding-left: 28px; width: 448px">When</span><span style="width: 520px">What loads</span><span style="width: 712px">Context used</span></div>
            <div id="h-r1" class="k-row"><span class="h-when k-name">Session start</span><span class="h-what k-dim">Name and description only</span><i id="h-b1" class="h-bar" style="width: 60px"></i></div>
            <div id="h-r2" class="k-row"><span class="h-when k-name">Task matches, or /name</span><span class="h-what k-dim">The full SKILL.md</span><i id="h-b2" class="h-bar" style="width: 300px"></i></div>
            <div id="h-r3" class="k-row"><span class="h-when k-name">Instructions need them</span><span class="h-what k-dim">Scripts and reference files</span><i id="h-b3" class="h-bar" style="width: 640px"></i></div>
          </div>
          <div id="h-note" class="k-abs">
            <div id="h-note-label" class="k-label">Cheap until used</div>
            <span id="h-note-dim" class="k-dim">A long list of skills costs one description each.</span>
          </div>
""", """
          k.title("#h-title")
          k.fade("#h-head", at("l04"))
          k.fade("#h-scale", at("l04") + 0.4)
          k.rise("#h-r1", at("l05"))
          k.draw("#h-b1", at("l05", "name and"), 0.4)
          k.rise("#h-r2", at("l06"))
          k.draw("#h-b2", at("l06", "the full"), 0.6)
          k.rise("#h-r3", at("l07"))
          k.draw("#h-b3", at("l07", "load only"), 0.8)
          k.slide("#h-note-label", at("l07", "so a long list"))
          k.fade("#h-note-dim", at("l07", "costs little"))
""")

scene(C, "example", "3 / 4 · Example", "Source: hyperframes.heygen.com (the video skill behind this series)", """
        #e-title { left: 120px; top: 196px; }
        #e-shot { left: 120px; top: 300px; width: 804px; }
        #e-shot img { display: block; width: 800px; height: 450px; }
        #e-cap { left: 120px; top: 780px; width: 804px; }
        #e-rules { left: 1040px; top: 300px; width: 760px; }
        #e-rules .k-row { display: block; height: auto; padding: 22px 0 22px 28px; }
        #e-rules .k-dim { margin-top: 6px; }
        #e-loaded { left: 1040px; top: 700px; width: 760px; }
        #e-loaded .k-dim { margin-top: 12px; }
        #e-also { left: 1040px; top: 850px; width: 760px; }
""", """
          <h2 id="e-title" class="k-abs k-title">Rules from a video skill</h2>
          <div id="e-shot" class="k-abs k-file"><img src="assets/frame0-02-scopes.png" alt="The first frame of clip 02, showing its title" /></div>
          <p id="e-cap" class="k-abs k-dim">Frame 0 of clip 02: the title is already on screen, because that frame is the thumbnail.</p>
          <div id="e-rules" class="k-abs">
            <div id="e-head" class="k-head"><span style="padding-left: 28px">Rules it carried</span></div>
            <div id="e-r1" class="k-row"><span class="k-name">Frame 0 is the thumbnail</span><span class="k-dim">So the title shows from the first frame</span></div>
            <div id="e-r2" class="k-row"><span class="k-name">No text under 28 px</span><span class="k-dim">Smaller text gets flagged by its check</span></div>
          </div>
          <div id="e-loaded" class="k-abs">
            <div id="e-loaded-label" class="k-label">Not in any prompt</div>
            <span id="e-loaded-dim" class="k-dim">The skill loaded it when the task needed it.</span>
          </div>
          <p id="e-also" class="k-abs k-dim">It also carried how to check and render each clip.</p>
""", """
          k.title("#e-title")
          k.fade("#e-head", at("l08", "video skill"))
          k.rise("#e-r1", at("l09", "the first frame"))
          k.fade("#e-shot", at("l09", "the first frame"))
          k.fade("#e-cap", at("l09", "thumbnail"))
          k.rise("#e-r2", at("l09", "and text"))
          k.slide("#e-loaded-label", at("l10"))
          k.fade("#e-loaded-dim", at("l10", "The skill loaded"))
          k.rise("#e-also", at("l10b"))
""")

scene(C, "gotchas", "4 / 4 · Gotchas", "Sources: code.claude.com/docs/en/skills, developers.openai.com/codex/build-skills", """
        #g-left { left: 120px; top: 196px; width: 860px; }
        #g-left .k-row { height: 104px; padding-left: 28px; }
        #g-left .k-dim { width: 330px; }
        #g-right { left: 1060px; top: 196px; width: 740px; }
        #g-right .k-row { height: 104px; padding-left: 28px; }
        #g-right .k-dim { width: 340px; }
        .g-head { margin-top: 30px; }
""", """
          <div id="g-left" class="k-abs">
            <h2 id="g-t1" class="k-title">Skills that trigger</h2>
            <div id="g-h1" class="k-head g-head"><span style="padding-left: 28px">Rule</span><span style="width: 330px">Why</span></div>
            <div id="g-r1" class="k-row"><span class="k-name">Start with "Use when"</span><span class="k-dim">The description is the trigger</span></div>
            <div id="g-r2" class="k-row"><span class="k-name">Keep it short</span><span class="k-dim">Every description costs context</span></div>
            <div id="g-r3" class="k-row"><span class="k-name">Same name? Yours wins</span><span class="k-dim">Personal beats project</span></div>
            <div id="g-r4" class="k-row"><span class="k-name">Third paste</span><span class="k-dim">Make it a skill</span></div>
            <div id="g-r5" class="k-row"><span class="k-name">Long procedure</span><span class="k-dim">Run it in its own subagent</span></div>
          </div>
          <div id="g-right" class="k-abs">
            <h2 id="g-t2" class="k-title">Codex</h2>
            <div id="g-h2" class="k-head g-head"><span style="padding-left: 28px">Skills</span></div>
            <div id="g-c1" class="k-row"><span class="k-tag">.agents/skills/</span><span class="k-dim">Where it looks</span></div>
            <div id="g-c2" class="k-row"><span class="k-tag">$skill-name</span><span class="k-dim">How you call one</span></div>
          </div>
""", """
          k.title("#g-t1")
          k.fade("#g-h1", at("l11") - 0.2)
          k.rise("#g-r1", at("l11"))
          k.rise("#g-r2", at("l12"))
          k.rise("#g-r3", at("l13"))
          k.rise("#g-r4", at("l14"))
          k.rise("#g-r5", at("l14b"))
          k.title("#g-t2", at("l15"))
          k.fade("#g-h2", at("l15") + 0.3)
          k.rise("#g-c1", at("l15", "dot agents"))
          k.rise("#g-c2", at("l15", "dollar sign"))
""", last=True)
print("05 scenes written")
