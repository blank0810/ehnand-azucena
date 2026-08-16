import mdx from "@astrojs/mdx"
import { unified } from "@astrojs/markdown-remark"
import { defineConfig } from "astro/config"
import remarkGfm from "remark-gfm"

const site = (process.env.SITE_URL ?? "https://ehnand.com").replace(/\/+$/, "")

export default defineConfig({
  site,
  output: "static",
  trailingSlash: "never",
  integrations: [mdx()],
  markdown: {
    syntaxHighlight: false,
    processor: unified({
      gfm: false,
      remarkPlugins: [remarkGfm],
    }),
  },
})
