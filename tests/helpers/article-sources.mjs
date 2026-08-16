import { readdir, readFile } from "node:fs/promises"

function frontmatterValue(frontmatter, name) {
  const match = frontmatter.match(new RegExp("^" + name + ":\\s*(.+)$", "m"))
  if (!match) return undefined
  return match[1].trim().replace(/^["']|["']$/g, "")
}

export async function readArticleSources() {
  const files = (await readdir("content/articles"))
    .filter((file) => file.endsWith(".mdx"))
    .sort()

  return Promise.all(
    files.map(async (file) => {
      const source = await readFile("content/articles/" + file, "utf8")
      const frontmatter = source.split("---", 3)[1] ?? ""
      return {
        slug: file.slice(0, -4),
        title: frontmatterValue(frontmatter, "title"),
        category: frontmatterValue(frontmatter, "category"),
        draft: frontmatterValue(frontmatter, "draft") === "true",
      }
    }),
  )
}
