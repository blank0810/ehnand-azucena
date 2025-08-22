interface ImageOptimizationOptions {
  quality?: number
  format?: "webp" | "avif" | "jpeg" | "png"
  sizes?: string
  priority?: boolean
}

export class ImageOptimizer {
  private static instance: ImageOptimizer
  private cache = new Map<string, string>()

  static getInstance(): ImageOptimizer {
    if (!ImageOptimizer.instance) {
      ImageOptimizer.instance = new ImageOptimizer()
    }
    return ImageOptimizer.instance
  }

  // Generate optimized image URL
  generateOptimizedUrl(src: string, options: ImageOptimizationOptions = {}): string {
    const { quality = 85, format = "webp" } = options
    const cacheKey = `${src}-${quality}-${format}`

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!
    }

    // For Next.js Image Optimization API
    const optimizedUrl = `/_next/image?url=${encodeURIComponent(src)}&w=800&q=${quality}&f=${format}`
    this.cache.set(cacheKey, optimizedUrl)
    return optimizedUrl
  }

  // Preload critical images
  preloadCriticalImages(images: string[]) {
    if (typeof window === "undefined") return

    images.forEach((src) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.as = "image"
      link.href = this.generateOptimizedUrl(src, { priority: true })
      document.head.appendChild(link)
    })
  }

  // Generate responsive image srcSet
  generateSrcSet(src: string, widths: number[] = [400, 800, 1200, 1600]): string {
    return widths
      .map((width) => {
        const optimizedUrl = `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=85&f=webp`
        return `${optimizedUrl} ${width}w`
      })
      .join(", ")
  }

  // Check WebP support
  supportsWebP(): Promise<boolean> {
    return new Promise((resolve) => {
      const webP = new Image()
      webP.onload = webP.onerror = () => resolve(webP.height === 2)
      webP.src =
        "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"
    })
  }
}

export const imageOptimizer = ImageOptimizer.getInstance()
