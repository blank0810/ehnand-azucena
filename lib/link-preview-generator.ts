interface LinkPreviewData {
  title: string
  description: string
  image: string
  url: string
  siteName: string
  type: string
  locale: string
}

interface PlatformPreview {
  title: string
  description: string
  image: string
  url: string
  platform: string
  characterLimits: {
    title: number
    description: number
  }
}

interface CompletePreviewResult {
  preview: PlatformPreview
  metaTags: Record<string, string>
  structuredData: object
}

export class LinkPreviewGenerator {
  private previewData: LinkPreviewData

  constructor(baseUrl?: string) {
    const url =
      baseUrl || (typeof window !== "undefined" ? window.location.origin : "https://your-portfolio-domain.com")

    this.previewData = {
      title: "Ehnand Azucena - Full Stack Developer | Laravel, React, Symfony Expert",
      description:
        "Professional Full Stack Developer specializing in Laravel, React, Symfony, and modern web technologies. Expert in SaaS platforms, database optimization, and scalable web applications.",
      image: `${url}/images/profile-new.jpg`,
      url: url,
      siteName: "Ehnand Azucena Portfolio",
      type: "website",
      locale: "en_US",
    }
  }

  // Generate meta tags object (not HTML strings)
  generateMetaTags(): Record<string, string> {
    return {
      // Open Graph
      "og:type": this.previewData.type,
      "og:title": this.previewData.title,
      "og:description": this.previewData.description,
      "og:image": this.previewData.image,
      "og:image:width": "800",
      "og:image:height": "800",
      "og:image:alt": "Ehnand Azucena - Professional Full Stack Developer",
      "og:url": this.previewData.url,
      "og:site_name": this.previewData.siteName,
      "og:locale": this.previewData.locale,
      "og:image:type": "image/jpeg",
      "og:image:secure_url": this.previewData.image,

      // Twitter Card
      "twitter:card": "summary_large_image",
      "twitter:site": "@ehnandazucena",
      "twitter:creator": "@ehnandazucena",
      "twitter:title": this.previewData.title,
      "twitter:description": this.previewData.description,
      "twitter:image": this.previewData.image,
      "twitter:image:alt": "Ehnand Azucena - Professional Full Stack Developer",

      // General
      title: this.previewData.title,
      description: this.previewData.description,
      author: "Ehnand Azucena",
    }
  }

  // Generate JSON-LD structured data
  generateStructuredData(): object {
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Ehnand Azucena",
      jobTitle: "Full Stack Developer",
      description: this.previewData.description,
      url: this.previewData.url,
      image: this.previewData.image,
      email: "ehnand.azucena00@gmail.com",
      telephone: "+639534678287",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Initao",
        addressRegion: "Northern Mindanao",
        postalCode: "9022",
        addressCountry: "Philippines",
      },
      sameAs: [
        "https://www.linkedin.com/in/ehnand-azucena-3028a7194",
        "https://github.com/blank0810",
        "https://twitter.com/ehnandazucena",
      ],
      knowsAbout: [
        "Full Stack Development",
        "Laravel",
        "React",
        "Symfony",
        "PHP",
        "JavaScript",
        "TypeScript",
        "Database Design",
        "SaaS Development",
      ],
    }
  }

  // Generate platform-specific preview
  generatePlatformPreview(platform?: string): PlatformPreview {
    const platformLimits = {
      facebook: { title: 100, description: 300 },
      twitter: { title: 70, description: 200 },
      linkedin: { title: 120, description: 300 },
      whatsapp: { title: 65, description: 160 },
      default: { title: 60, description: 160 },
    }

    const limits = platformLimits[platform as keyof typeof platformLimits] || platformLimits.default

    return {
      title: this.truncateText(this.previewData.title, limits.title),
      description: this.truncateText(this.previewData.description, limits.description),
      image: this.previewData.image,
      url: this.previewData.url,
      platform: platform || "default",
      characterLimits: limits,
    }
  }

  // Generate complete preview data
  async generateCompletePreview(platform?: string): Promise<CompletePreviewResult> {
    const preview = this.generatePlatformPreview(platform)
    const metaTags = this.generateMetaTags()
    const structuredData = this.generateStructuredData()

    return {
      preview,
      metaTags,
      structuredData,
    }
  }

  // Update preview data dynamically
  updatePreviewData(data: Partial<LinkPreviewData>): void {
    this.previewData = { ...this.previewData, ...data }
  }

  // Get current preview data
  getPreviewData(): LinkPreviewData {
    return { ...this.previewData }
  }

  // Validate image for social media requirements
  validateImage(imageUrl: string): Promise<boolean> {
    if (typeof window === "undefined") {
      // Server-side: assume valid
      return Promise.resolve(true)
    }

    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        // Check if image meets social media requirements
        const isValidSize = img.width >= 400 && img.height >= 400
        resolve(isValidSize)
      }
      img.onerror = () => resolve(false)
      img.crossOrigin = "anonymous"
      img.src = imageUrl
    })
  }

  // Helper method to truncate text
  private truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength - 3) + "..."
  }
}

// Factory function to create instances
export function createLinkPreviewGenerator(baseUrl?: string): LinkPreviewGenerator {
  return new LinkPreviewGenerator(baseUrl)
}

// Default instance
export const linkPreviewGenerator = new LinkPreviewGenerator()
