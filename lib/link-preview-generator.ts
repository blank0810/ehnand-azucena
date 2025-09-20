interface LinkPreviewData {
  title: string
  description: string
  image: string
  url: string
  siteName: string
  type: string
  locale: string
}

interface MetaTagsData {
  openGraph: Record<string, string>
  twitter: Record<string, string>
  linkedin: Record<string, string>
  whatsapp: Record<string, string>
}

export class LinkPreviewGenerator {
  private static instance: LinkPreviewGenerator
  private previewData: LinkPreviewData

  constructor() {
    this.previewData = {
      title: "Ehnand Azucena - Full Stack Developer | Laravel, React, Symfony Expert",
      description:
        "Professional Full Stack Developer specializing in Laravel, React, Symfony, and modern web technologies. Expert in SaaS platforms, database optimization, and scalable web applications.",
      image: "/images/og-image.jpg",
      url: "https://your-portfolio-domain.com",
      siteName: "Ehnand Azucena Portfolio",
      type: "website",
      locale: "en_US",
    }
  }

  static getInstance(): LinkPreviewGenerator {
    if (!LinkPreviewGenerator.instance) {
      LinkPreviewGenerator.instance = new LinkPreviewGenerator()
    }
    return LinkPreviewGenerator.instance
  }

  // Generate meta tags data object (not HTML strings)
  generateMetaTagsData(): MetaTagsData {
    return {
      openGraph: {
        "og:type": this.previewData.type,
        "og:title": this.previewData.title,
        "og:description": this.previewData.description,
        "og:image": this.previewData.image,
        "og:image:width": "1200",
        "og:image:height": "630",
        "og:image:alt": "Ehnand Azucena - Full Stack Developer Portfolio",
        "og:url": this.previewData.url,
        "og:site_name": this.previewData.siteName,
        "og:locale": this.previewData.locale,
        "og:image:type": "image/jpeg",
        "og:image:secure_url": this.previewData.image,
      },
      twitter: {
        "twitter:card": "summary_large_image",
        "twitter:site": "@ehnandazucena",
        "twitter:creator": "@ehnandazucena",
        "twitter:title": this.previewData.title,
        "twitter:description": this.previewData.description,
        "twitter:image": this.previewData.image,
        "twitter:image:alt": "Ehnand Azucena - Full Stack Developer Portfolio",
      },
      linkedin: {
        author: "Ehnand Azucena",
      },
      whatsapp: {
        // WhatsApp uses Open Graph tags
      },
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
        "Web Development",
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: "Full Stack Developer",
        occupationLocation: {
          "@type": "Country",
          name: "Philippines",
        },
        skills: [
          "Laravel Development",
          "React Development",
          "Symfony Development",
          "Database Optimization",
          "SaaS Platform Development",
          "API Development",
          "Cloud Infrastructure",
        ],
      },
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

  // Validate image for social media requirements (browser-safe version)
  validateImageDimensions(imageUrl: string): Promise<{ width: number; height: number; isValid: boolean }> {
    return new Promise((resolve) => {
      if (typeof window === "undefined") {
        // Server-side: assume valid
        resolve({ width: 1200, height: 630, isValid: true })
        return
      }

      const img = new Image()
      img.onload = () => {
        const isValidSize = img.width >= 1200 && img.height >= 630
        const hasCorrectRatio = Math.abs(img.width / img.height - 1200 / 630) < 0.1
        resolve({
          width: img.width,
          height: img.height,
          isValid: isValidSize && hasCorrectRatio,
        })
      }
      img.onerror = () => resolve({ width: 0, height: 0, isValid: false })
      img.crossOrigin = "anonymous"
      img.src = imageUrl
    })
  }

  // Get preview data for specific platform
  getPreviewDataForPlatform(platform: "facebook" | "twitter" | "linkedin" | "whatsapp"): LinkPreviewData {
    const baseData = this.getPreviewData()

    switch (platform) {
      case "facebook":
        return {
          ...baseData,
          description: baseData.description.substring(0, 300), // Facebook limit
        }
      case "twitter":
        return {
          ...baseData,
          title: baseData.title.substring(0, 70), // Twitter title limit
          description: baseData.description.substring(0, 200), // Twitter description limit
        }
      case "linkedin":
        return {
          ...baseData,
          description: baseData.description.substring(0, 256), // LinkedIn limit
        }
      case "whatsapp":
        return {
          ...baseData,
          description: baseData.description.substring(0, 300), // WhatsApp limit
        }
      default:
        return baseData
    }
  }
}

export const linkPreviewGenerator = LinkPreviewGenerator.getInstance()
