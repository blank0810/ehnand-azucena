import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"
import { ARTICLE_CATEGORIES } from "./data/article-categories"

const isoDate = z.preprocess(
  (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
)

const articles = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./content/articles" }),
  schema: z
    .object({
      title: z.string().min(1),
      seoTitle: z.string().min(1).max(53).optional(),
      date: isoDate,
      updated: isoDate.optional(),
      category: z.enum(ARTICLE_CATEGORIES),
      tags: z.array(z.string().min(1)).min(1),
      summary: z.string().min(1),
      draft: z.boolean().default(false),
      syndicated: z
        .object({
          devto: z.url().optional(),
          hashnode: z.url().optional(),
        })
        .optional(),
    })
    .superRefine((article, context) => {
      if (article.updated && article.updated < article.date) {
        context.addIssue({
          code: "custom",
          path: ["updated"],
          message: "updated must not be earlier than date",
        })
      }
    }),
})

const caseStudies = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./content/case-studies" }),
  schema: z.object({
    updated: isoDate.optional(),
  }),
})

export const collections = { articles, caseStudies }
