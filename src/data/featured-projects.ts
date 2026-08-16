import { getProjectBySlug, type Project } from "@/data/projects"

export const FEATURED_PROJECT_SLUGS = [
  "adam-ai",
  "repsshield",
  "initao-water-billing-system",
  "memberpulse",
  "swiss-energy-platform-suite",
] as const

export function getFeaturedProjects(): Project[] {
  return FEATURED_PROJECT_SLUGS.map((slug) => {
    const project = getProjectBySlug(slug)
    if (!project) throw new Error(`Featured project ${slug} is missing`)
    return project
  })
}
