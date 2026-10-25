import { readFileSync } from "node:fs"
import { join } from "node:path"

import { ARTICLE_VIDEOS, type ArticleVideo } from "@/data/article-videos"

export function articleVideos(slug: string): readonly ArticleVideo[] {
  return ARTICLE_VIDEOS[slug] ?? []
}

export function articleVideo(slug: string, id: string): ArticleVideo {
  const video = articleVideos(slug).find((entry) => entry.id === id)
  if (!video) throw new Error(`No clip "${id}" for article ${slug} in src/data/article-videos.ts`)
  return video
}

export function videoPaths(slug: string, video: ArticleVideo) {
  const base = `/videos/${slug}/${video.file}`
  return { mp4: `${base}.mp4`, vtt: `${base}.vtt`, poster: `${base}.webp` }
}

/** 87 → "1:27", for the figure caption. */
export function clockDuration(seconds: number): string {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`
}

/** 87 → "PT1M27S", for the VideoObject. */
export function isoDuration(seconds: number): string {
  return `PT${Math.floor(seconds / 60)}M${seconds % 60}S`
}

/**
 * The clip's spoken words, from its captions file, in paragraphs of a few
 * sentences. Read at build time, so the captions stay the only copy.
 */
export function videoTranscript(slug: string, video: ArticleVideo): string[] {
  const vtt = readFileSync(join(process.cwd(), "public", videoPaths(slug, video).vtt), "utf8")
  const text = vtt
    .replace(/\r/g, "")
    .split("\n\n")
    .map((cue) => cue.split("\n").filter((line) => line && line !== "WEBVTT" && !line.includes("-->")).join(" "))
    .filter(Boolean)
    .join(" ")
  // Split only where punctuation meets a space, so CLAUDE.md stays one word.
  const sentences = text.split(/(?<=[.!?])\s+/)
  const paragraphs: string[] = []
  let current = ""
  for (const sentence of sentences) {
    current += `${sentence} `
    if (current.split(/\s+/).length >= 55) {
      paragraphs.push(current.trim())
      current = ""
    }
  }
  if (current.trim()) paragraphs.push(current.trim())
  return paragraphs
}
