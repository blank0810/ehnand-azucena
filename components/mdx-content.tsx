// Server-side MDX renderer with an explicit element map.
//
// The map exists instead of @tailwindcss/typography on purpose: it's one fewer
// dependency and one fewer config surface, and it keeps the article styling in the
// same dark-first visual language as the rest of the site.
//
// Headings get explicit ids so they're linkable and so AI crawlers can anchor a
// citation to the exact section that answers a question.
import { MDXRemote } from "next-mdx-remote/rsc"
import Link from "next/link"
import type { ReactNode } from "react"

function slugify(children: ReactNode): string {
  return String(children)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

const components = {
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 id={slugify(children)} className="text-2xl md:text-3xl font-bold text-white mt-12 mb-4 font-poppins scroll-mt-24">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 id={slugify(children)} className="text-xl md:text-2xl font-semibold text-white mt-8 mb-3 scroll-mt-24">
      {children}
    </h3>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <p className="text-gray-300 leading-relaxed mb-5">{children}</p>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="list-disc pl-6 mb-5 space-y-2 text-gray-300 marker:text-primary">{children}</ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="list-decimal pl-6 mb-5 space-y-2 text-gray-300 marker:text-primary">{children}</ol>
  ),
  li: ({ children }: { children?: ReactNode }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),
  em: ({ children }: { children?: ReactNode }) => <em className="italic text-gray-200">{children}</em>,
  a: ({ href = "", children }: { href?: string; children?: ReactNode }) => {
    const isExternal = href.startsWith("http") && !href.includes("ehnand.com")
    return (
      <Link
        href={href}
        className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    )
  },
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="border-l-2 border-gray-700 pl-5 my-6 text-gray-400 italic">{children}</blockquote>
  ),
  hr: () => <hr className="my-12 border-gray-800" />,
  // Inline code. Fenced blocks arrive wrapped in <pre>, styled below.
  code: ({ children }: { children?: ReactNode }) => (
    <code className="px-1.5 py-0.5 rounded bg-gray-800 text-primary text-[0.9em] font-mono">{children}</code>
  ),
  pre: ({ children }: { children?: ReactNode }) => (
    <pre className="my-6 p-4 rounded-lg bg-gray-900 border border-gray-800 overflow-x-auto text-sm leading-relaxed [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-gray-200">
      {children}
    </pre>
  ),
  // Tables get lifted into AI answers almost verbatim, so they earn real styling.
  // Wrapped so a wide table scrolls itself instead of the page.
  table: ({ children }: { children?: ReactNode }) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-gray-800">
      <table className="w-full text-left text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }: { children?: ReactNode }) => <thead className="bg-gray-900">{children}</thead>,
  th: ({ children }: { children?: ReactNode }) => (
    <th className="px-4 py-3 font-semibold text-white border-b border-gray-800">{children}</th>
  ),
  td: ({ children }: { children?: ReactNode }) => (
    <td className="px-4 py-3 text-gray-300 border-b border-gray-800/60 align-top">{children}</td>
  ),
}

export default function MdxContent({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />
}
