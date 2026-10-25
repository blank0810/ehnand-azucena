/**
 * Narrated section clips, by article slug. One record feeds both the
 * `ArticleClip` figure in the MDX and the article's `VideoObject` JSON-LD, the
 * way `faq.ts` feeds the FAQ and its schema.
 *
 * Files ship in `public/videos/<article slug>/<file>.{mp4,vtt,webp}`; the
 * scripts and compositions that produced them are in `docs/videos/`.
 */

export interface ArticleVideo {
  /** What the MDX passes: `<Clip id="scopes" />`. */
  id: string
  /** File stem under `public/videos/<article slug>/`. */
  file: string
  title: string
  description: string
  /** Rounded length of the rendered clip. */
  seconds: number
}

export const ARTICLE_VIDEOS: Record<string, readonly ArticleVideo[]> = {
  "agentic-coding-101": [
    {
      id: "coding-agent",
      file: "01-coding-agent",
      title: "What a coding agent is",
      description: "A model using tools in a loop: gather context, act, verify, and what fills the context window before you type.",
      seconds: 83,
    },
    {
      id: "scopes",
      file: "02-scopes",
      title: "Scopes",
      description: "Where every setting, rule, skill and agent lives: user, project, local and managed scopes, which one wins, and the Codex equivalent.",
      seconds: 82,
    },
    {
      id: "rules",
      file: "03-rules",
      title: "Rules files",
      description: "How CLAUDE.md and AGENTS.md load, what to put in them, path-scoped rules, and why to keep them under 200 lines.",
      seconds: 80,
    },
    {
      id: "commands",
      file: "04-commands",
      title: "Commands",
      description: "Built-in and custom slash commands, how commands became skills, $ARGUMENTS, and a deploy command only you can run.",
      seconds: 88,
    },
    {
      id: "skills",
      file: "05-skills",
      title: "Skills",
      description: "What a skill is, how skills load in stages, the rules a video skill carried for this series, and how Codex calls a skill.",
      seconds: 84,
    },
    {
      id: "hooks",
      file: "06-hooks",
      title: "Hooks",
      description: "The only layer that enforces: lifecycle events, exit code 2, a hook that blocks force pushes, and why to prove a hook fires.",
      seconds: 86,
    },
    {
      id: "subagents",
      file: "07-subagents",
      title: "Subagents",
      description: "Separate workers with their own context: what they save, this portfolio's article writer, and what they cost.",
      seconds: 82,
    },
    {
      id: "mcp",
      file: "08-mcp",
      title: "MCP",
      description: "How MCP servers plug outside systems in as tools, how they load and scope, and how one checked the facts in this series.",
      seconds: 80,
    },
    {
      id: "plugins",
      file: "09-plugins",
      title: "Plugins",
      description: "One install for every layer: how plugins install, four worth installing, and what to read before you add one.",
      seconds: 90,
    },
    {
      id: "features",
      file: "10-features",
      title: "Feature highlights",
      description: "Four session features: permission modes, rewind, /context and /doctor, and parallel sessions in their own worktrees.",
      seconds: 83,
    },
  ],
}
