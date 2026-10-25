# Agentic Coding 101: article and section clips

Validated with the owner on 2026-10-25 through brainstorming, one section at a time.

## Goal

Publish an explainer article, *Agentic Coding 101*, with one narrated clip per section. It is the general, public version of the agentic coding field guide presented to the ClouDesk team on 14 October 2026 (see *Leaving ClouDesk*). It explains what a coding agent is and the layers that shape it, using Claude Code as the main example and naming the Codex equivalent of each layer. The title is tool-neutral on purpose: the content is not only about Claude.

## Decisions

| Topic | Decision |
|---|---|
| Angle | A 101 anchored in the owner's real setup, described in general terms, never specifics |
| Title | *Agentic Coding 101* |
| Spine | "Build up a setup": thirteen sections in three parts |
| Delivery | One clip per section for sections 01 to 10, each about 1:30, embedded under its heading; 00, 11 and 12 are text only |
| Playback | Press to play, never autoplay; captions on by default |
| Voice | Kokoro `af_heart` (Apache 2.0, local), chosen from a six-voice listening test |
| Hosting | Self-hosted static assets, routed through the Worker with Workers Caching so range requests work |
| Plugins recommended | superpowers, playwright, security-guidance, claude-code-setup, each with an example of it in use |

## Content plan

Every clip uses the same four scenes so a 15-minute series stays navigable:

1. **What it is** (0:00 to 0:15): one-line definition and where it lives.
2. **How it works** (0:15 to 0:45): the mechanism, animated.
3. **Example** (0:45 to 1:10): a real file or command on screen.
4. **Gotchas and other agents** (1:10 to 1:30): the trap, and what Codex and others call it.

About 220 narrated words per clip. Sections 09 and 10 flex the template, as noted.

### Part 1: Foundations

**00 · Same model, different setup** (text). Opens on the incident: explaining the setup to a team exposed two failures, guard hooks that had never run and a 1,025-line instructions file. Links *Leaving ClouDesk*. States the rule in bold: *"Everyone rents the same model. The setup around it is the part you build, and the part you have to check."* Uses this repository's Docker-only, pnpm-only rule as the first example of a setup choice.

**01 · What a coding agent is**
1. A model using tools in a loop; not autocomplete, not a chatbot. Runs in the terminal, IDE, desktop and web.
2. The loop animates: gather context, act, verify, repeat. You can interrupt it; it asks before risky actions.
3. The context window filling before you type: system prompt, rules file, skill descriptions, MCP tool names, memory, git status, then your prompt.
4. Context is the budget; every later section spends it. Codex, Cursor, Gemini CLI and Copilot run the same loop.
Text: the tools, and the retired two-agent handoff (one agent planned, another built, 8 July to 27 September 2026). Links *A Gate Built for a Person Waits Forever Where No Person Is*.

**02 · Scopes**
1. Every setting, rule, skill and agent lives at a scope.
2. The four settings scopes and which wins (the existing sample scene): managed, project local, shared project, user. `--settings` ranks just below managed.
3. A grid of layers against scopes: rules (`~/.claude/CLAUDE.md`, `./CLAUDE.md`, `CLAUDE.local.md`), skills (`~/.claude/skills`, `.claude/skills`), agents and MCP the same way. Rules combine; permission lists merge.
4. Rule of thumb: true in every repo goes in user scope; a teammate needs it goes in the project. Codex: `~/.codex` and project `.codex/`.

**03 · Rules**
1. Plain Markdown read at every session start (`CLAUDE.md`, `AGENTS.md`): build commands, conventions, layout, never-do rules.
2. Loads broad to specific (organisation, user, project, subfolder), combined, closest read last, sent with every request.
3. A short rules file on screen: "Use pnpm, not npm", an `@AGENTS.md` import, a path-scoped rule with `paths: src/api/**`.
4. Under 200 lines; imports don't save context; contradictions get resolved arbitrarily; wrong twice means write the rule. Codex reads `AGENTS.md`, up to 32 KiB combined.

### Part 2: The layers

**04 · Commands**
1. A saved prompt behind `/name`. Built-ins run the session: `/clear`, `/compact`, `/context`, `/model`.
2. Custom commands merged into skills: `.claude/commands/deploy.md` and `.claude/skills/deploy/SKILL.md` both give `/deploy`. `$ARGUMENTS` passes what you type after it.
3. A command file with `disable-model-invocation: true`: only you trigger it, and it costs no context until you do.
4. Typing the same opening prompt again means save it. Codex has its own built-ins (`/init`, `/review`, `/model`); for your own, a skill.

**05 · Skills**
1. A folder with `SKILL.md` (name, description, instructions) plus optional scripts and references. An open standard: Claude Code and Codex read the same format.
2. Progressive disclosure animates: names and descriptions at start, the full file when the task matches or on `/name`, scripts and references only if needed.
3. These clips were built with a video skill that knew rules the author didn't: frame zero is the thumbnail, text under 28 px fails.
4. The description is the trigger, so write "Use when..."; every description costs context on every request; the third pasted playbook becomes a skill. Codex: `.agents/skills`.

**06 · Hooks**
1. Your code at a lifecycle point, every time, no model judgement. The only layer that enforces.
2. A lifecycle timeline: session start, prompt, before tool, tool, after tool, stop. 33 events in Claude Code; handlers can be a command, HTTP, an MCP tool, a prompt or an agent; exit code 2 before a tool blocks it; hooks from every scope all fire.
3. A before-tool hook blocks `git push --force` and tells the agent why.
4. "Never edit `.env`" in a rules file is a request, a hook is a guarantee; prove a hook fires (the farewell repository's never ran); zero context unless it prints. Codex: `hooks.json`, a smaller event set.

**07 · Subagents**
1. A separate worker with its own context, tools and instructions that returns only a summary.
2. The main context bar barely moves while a subagent reads 40 files and returns 10 lines. Built-ins: Explore, Plan, general-purpose. Custom: `.claude/agents/<name>.md`.
3. This repository's `article-writer` agent, which carries the house article rules.
4. Summaries are lossy and you only see what is reported; more tokens overall, which is why the owner's default is now the main session; use one when a side task would flood the conversation. Codex: custom agents in TOML.
Text links *An AI Implementer's Sandbox Is Your Verification Boundary*.

**08 · MCP**
1. An open protocol that plugs outside systems in as tools: browser, database, docs, search.
2. Agent to MCP server to the system; local or remote. Tool names load at start, schemas on demand. Scopes: local, then project (`.mcp.json`), then user.
3. The web-search server that fact-checked these clips.
4. Each server is a new set of permissions; large tool output lands in context; pair the connection with a skill for the know-how. Codex: `[mcp_servers]` in `config.toml`; the same servers work in both.

**09 · Plugins** (template flexes: the four picks take 0:30 to 1:20)
1. One install bundling skills, commands, hooks, subagents and MCP servers, distributed through marketplaces.
2. `/plugin install name@marketplace`; plugin skills are prefixed (`/superpowers:brainstorming`); a second repository needing the same setup is the trigger.
3. The four picks, each a different layer in a box:
   - superpowers (skills): brainstorm, plan, test first, debug, verify. This article was planned with its brainstorming skill.
   - playwright (MCP): a real browser the agent drives, for example the dev server at phone width, then a screenshot.
   - security-guidance (hooks): pattern warnings on edits, an AI review of the diff when the agent stops, a commit review. It flagged the sample clip's CDN script tag with no integrity hash.
   - claude-code-setup (skill): a read-only scan that recommends the top automations per layer. Run it on this repository during production so the example is real output.
4. A plugin loads into every session and can run code, so read its hooks first. Codex has plugins too, shared with ChatGPT.

### Part 3: Putting it together

**10 · Feature highlights** (template flexes: five beats of about 15 seconds)
1. Intro: the layers shape the agent; these shape a session.
2. Steer: `Shift+Tab` cycles permission modes (default, accept edits, plan, auto). Plan mode explores and writes a plan without editing until approved.
3. Undo: `Esc Esc` or `/rewind` restores code, conversation or both. Not shell-made changes; not a replacement for git.
4. Inspect: `/context` shows what loaded and its cost; `/doctor` runs a setup checkup. Check here before blaming the model.
5. Parallel: `--worktree` gives each session its own checkout. Then subagent, agent view (`claude agents`), agent teams, dynamic workflows.
6. Codex: `/permissions` for approval and sandbox modes, `/review`.
Text links *Parallel AI Coding Agents: Use Locks, Not Agreements*.

**11 · Which layer should I use?** (text). A table from the official trigger list and context-cost table:

| Symptom | Layer | Context cost |
|---|---|---|
| The agent gets a convention wrong twice | Rules file | Every request |
| Same opening prompt typed again | Command | None until used, if user-only |
| Same playbook pasted a third time | Skill | A description per request |
| Copying data from a tab it can't see | MCP | Tool names only |
| A side task floods the conversation | Subagent | Kept separate |
| Something must happen every time | Hook | Zero unless it prints |
| A second repository needs the same setup | Plugin | The sum of its parts |

**12 · What to actually do** (text), then **The takeaway**:
1. Start with one rules file under 200 lines; add a rule only after the agent gets something wrong twice.
2. Put anything that must always hold in a hook, then trigger it once on purpose to prove it fires.
3. Run `/context` at the start of a session and check what actually loaded.
4. Turn the third repeat of a playbook into a skill with a "Use when..." description.
5. Use subagents for side tasks that would flood the conversation, not by default.
6. Read a plugin's hooks before installing it, and install only what you use.

Takeaway: a setup you can't explain is a setup you haven't checked.

## Video production

### Files

- Source (compositions, narration scripts, line lists) lives in `docs/videos/agentic-coding-101/`, one folder per clip, following the `docs/diagrams/` precedent. Small text, reproducible.
- Voice audio, copied fonts and draft renders stay out of git, in the working folder outside the repository.
- Only final outputs ship, in `public/videos/agentic-coding-101/`: `NN-slug.mp4`, `NN-slug.vtt`, `NN-slug.webp` (poster).

### Shared shell

Production Trace tokens and IBM Plex, light theme only. Chapter rail 01 to 10 with the current chapter in cobalt; eyebrow "Agentic Coding 101". Text never under 28 px. GSAP vendored locally, no CDN. Each of the four scenes is a sub-composition. Frame 0 shows the title, because it is the poster.

### Per clip

1. Script of about 220 words, split into lines. The narration says everything important that is on screen, so no separate audio description is needed (WCAG 1.2.5).
2. Kokoro `af_heart` voices each line separately; exact line starts drive the timeline so reveals land on the words that name them.
3. Captions (WebVTT) from the exact line times, at most two lines per cue.
4. Render 1920x1080 at 30 fps, h264 with `+faststart`; mono AAC voice; loudness -16 LUFS. Expect 3 to 4 MB per clip, well under the 25 MiB asset limit.
5. Done only when: `hyperframes check` passes (lint, layout, contrast, craft), a listening pass is clean, every claim maps to a source URL in the clip's sources list, and captions are in sync.

### Order

1. Pilot: rebuild the scopes clip (02) at full 1:30 with the new title, Kokoro voice and four-scene template. Owner reviews.
2. Then the other nine, in section order.
3. Then the article text, written around the finished clips.

## Site integration

### On the page

Each clip sits directly under its section heading as a `<figure>`:

- Native `<video controls preload="none" playsinline>` with `width`/`height` set (no layout shift), poster from frame 0, and `<track kind="captions" default>`.
- `<figcaption>`: "Video version of this section · 1:30 · AI-narrated voice".
- A collapsed `<details>` transcript built from the caption text.

Native controls (Jakob's Law) and one action per clip (Hick's Law); the transcript is progressive disclosure. No video bytes load until play.

### Data

One clip data module (for example `src/data/article-videos.ts`) holds each clip's id, title, description, duration and file paths. It feeds both the `<figure>` component and the VideoObject JSON-LD, the way `faq.ts` feeds the FAQ and its schema. The MDX places `<Clip id="scopes" />` under each heading. This is the first article to use a component in MDX.

### Structured data

The BlogPosting gets a `video` array of VideoObject entries (name, description, thumbnailUrl, uploadDate, ISO 8601 duration, contentUrl, transcript), referencing the canonical Person id. Google mostly shows video thumbnails when video is the page's main content; here the article is, so this is for correctness rather than expected rich results.

### Hosting

The live site ignores range requests (tested 2026-10-25: `Range: bytes=0-99` returned `200` with the full body). Safari needs `206` responses to play video.

**Built (2026-10-25): the fallback, not Workers Caching.** Cloudflare's pricing docs say that with Workers Caching enabled, every static asset request on the site is billed against the Workers request limit (100,000 a day on the free plan, with errors past it), where today those requests are free and unlimited. So:

- `assets.run_worker_first: ["/api/*", "/videos/*"]` in `wrangler.jsonc`. With a pattern list, unlisted paths never reach the Worker, so the contact route is listed too.
- `worker/video.ts` reads the clip from `env.ASSETS` and answers single byte ranges itself (`206`, `416`, `HEAD`), with `Cache-Control: public, max-age=86400`. Only video and contact requests count against the limit.
- Covered by `tests/unit/video-range.test.mjs` and a `wrangler dev` range check in `tests/integration/cloudflare-routes.test.mjs`. `CLAUDE.md` and the Worker's header comment describe the new route.

Superseded plan: `cache.enabled: true` (Workers Caching), which slices ranges from a cached full response but bills every asset request.

## Article metadata

| Field | Value |
|---|---|
| title | Agentic Coding 101 |
| seoTitle | Agentic Coding 101: Rules, Skills, Hooks and MCP (48 characters) |
| slug | `agentic-coding-101` |
| category | AI & Automation |
| tags | agentic-coding, ai-assisted-development, claude-code, codex, workflow |
| date | Set on publish |

Summary: "What a coding agent is and the seven layers that shape it, from rules files to skills, hooks, subagents, MCP and plugins, explained with Claude Code and the Codex equivalents. Ten 90-second narrated clips, plus the two checks my own setup failed when I had to explain it."

"Agentic coding" appears in the title, seoTitle, summary, the first hundred words and one heading, and nowhere forced. Add the slug to `RELATED_ARTICLES` for `serverless-erp-backend` and `water-billing-system`; the byline links those two project pages and the contact route. Body links: *Leaving ClouDesk* (00), *A Gate Built for a Person Waits Forever Where No Person Is* (01), *An AI Implementer's Sandbox Is Your Verification Boundary* (07), *Parallel AI Coding Agents: Use Locks, Not Agreements* (10).

House checks before publish: no em dashes, no heading starting with a digit, no client names, and the Docker verification gate (`check`, `lint`, production `build`, `validate:html`, `test`).

## Verified facts and open items

Verified 2026-10-24 and 2026-10-25 against code.claude.com, developers.openai.com and the installed plugin files: settings precedence, the 200-line guidance, commands merged into skills, the trigger and context-cost tables, 33 hook events and five handler types, exit code 2, permission modes and plan mode, `/rewind` limits, the parallel-work ladder, Codex skills in `.agents/skills`, Codex `hooks.json`, custom agents in TOML, `[mcp_servers]` in `config.toml`, Codex plugins, and each recommended plugin's contents.

Open before scripting or shipping:

- Codex custom prompts: still supported, and how a skill is invoked by name.
- Whether the Cloudflare plan includes Workers Caching, and that enabling it caches nothing besides `/videos/*` (the contact POST must stay uncached).
- After deploy, owner-run: `curl -H "Range: bytes=0-99"` on a clip returns `206`, and a clip plays and seeks in Safari.
- Run claude-code-setup on this repository for the section 09 example.

## Out of scope

Dark-theme clip renders, a single combined video, YouTube or other third-party hosting, autoplay, and a hero visual.
