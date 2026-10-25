# claude-code-setup run on the ehnand-azucena repository, 2026-10-25

Skill: `claude-code-setup:claude-automation-recommender` 1.0.0 (read-only; nothing in the repo changed).
Used as the real example in clip 09 (Plugins).

## Codebase profile

- Astro 7 static site, TypeScript, MDX content, one Cloudflare Worker for `POST /api/contact`
- pnpm 10 through Docker Compose only; ESLint, `astro check`, html-validate, `node --test` unit and integration suites
- Existing Claude Code setup: one project subagent (`.claude/agents/article-writer.md`, untracked), `settings.local.json`; no hooks, no project skills, no `.mcp.json`
- Secrets on disk: `.env` (git-ignored); `wrangler deploy` is an owner-only action

## Top recommendations

- **Hook (PreToolUse, Bash):** block `pnpm`, `npm`, `npx` and `node` run on the host, so the CLAUDE.md rule "run every Node command through Docker Compose" is enforced, not just asked for. Second pick: block `wrangler deploy` and edits to `.env`.
- **Skill (user-only):** `/verify`, which runs the five Docker gates in order (`check`, `lint`, production `build`, `validate:html`, `test`) and reports the first failure. `disable-model-invocation: true`.
- **MCP server:** context7, for current Astro 7 and Cloudflare Workers docs. Playwright is already installed as a plugin, for phone-width checks of the built pages.
- **Subagent:** an accessibility reviewer that checks changed pages against WCAG 2.2 AA (contrast, focus, keyboard, targets), since the project treats AA as a floor.
