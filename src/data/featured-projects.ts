import { getProjectBySlug, type Project } from "@/data/projects"

/**
 * Hand-picked rather than derived: the strongest proof and the newest work are
 * not the same set. Keep this at five so the rotation completes in ~35s, and
 * leave /projects to carry the full record. Review when a project ships.
 */
export const FEATURED_PROJECT_SLUGS = [
  "adam-ai",
  "repsshield",
  "initao-water-billing-system",
  "kai-assistant",
  "swiss-energy-platform-suite",
] as const

export function getFeaturedProjects(): Project[] {
  return FEATURED_PROJECT_SLUGS.map((slug) => {
    const project = getProjectBySlug(slug)
    if (!project) throw new Error(`Featured project ${slug} is missing`)
    return project
  })
}
