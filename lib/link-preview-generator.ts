export interface PreviewData {
  title: string
  description: string
  image: string
  url: string
  siteName: string
  type: string
}

export interface StructuredData {
  "@context": string
  "@type": string
  name: string
  description: string
  url: string
  image: string
  author: {
    "@type": string
    name: string
    jobTitle: string
    url: string
  }
  sameAs: string[]
}

export interface MetaTags {
  title: string
  description: string
  keywords: string
  "og:title": string
  "og:description": string
  "og:image": string
  "og:url": string
  "og:type": string
  "og:site_name": string
  "twitter:card": string
  "twitter:title": string
  "twitter:description": string
  "twitter:image": string
  "twitter:creator": string
  "linkedin:owner": string
}

export class LinkPreviewGenerator {
  private baseUrl: string
  private defaultImage: string

  constructor(baseUrl = "https://your-portfolio-domain.com") {
    this.baseUrl = baseUrl
    this.defaultImage = `${baseUrl}/images/og-image.jpg`
  }

  generatePreviewData(platform?: string): PreviewData {
    const baseData = {
      title: "Ehnand Azucena - Full Stack Developer | Laravel, React, Symfony Expert",
      description:
        "Professional Full Stack Developer specializing in Laravel, React, Symfony, and modern web technologies. Expert in SaaS platforms, database optimization, and scalable web applications.",
      image: this.defaultImage,
      url: this.baseUrl,
      siteName: "Ehnand Azucena Portfolio",
      type: "website",
    }

    // Platform-specific optimizations
    switch (platform) {
      case "twitter":
        return {
          ...baseData,
          title: "Ehnand Azucena - Full Stack Developer 🚀",
          description:
            "Laravel • React • Symfony • SaaS Expert\n\n✨ Building scalable web applications\n🔧 Database optimization specialist\n💼 Professional portfolio & projects",
        }

      case "linkedin":
        return {
          ...baseData,
          title: "Ehnand Azucena | Full Stack Developer | Laravel & React Specialist",
          description:
            "Experienced Full Stack Developer with expertise in Laravel, React, and Symfony. Specialized in building enterprise-level SaaS platforms, optimizing database performance, and creating scalable web applications. Open to new opportunities and collaborations.",
        }

      case "facebook":
        return {
          ...baseData,
          description:
            "Check out my professional portfolio showcasing expertise in Laravel, React, Symfony, and modern web development. Featuring real-world projects, certifications, and technical skills in full-stack development.",
        }

      case "whatsapp":
        return {
          ...baseData,
          title: "Ehnand Azucena - Portfolio",
          description: "Full Stack Developer | Laravel, React, Symfony Expert. View my projects and get in touch!",
        }

      default:
        return baseData
    }
  }

  generateStructuredData(): StructuredData {
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Ehnand Azucena",
      description: "Full Stack Developer specializing in Laravel, React, Symfony, and modern web technologies",
      url: this.baseUrl,
      image: this.defaultImage,
      author: {
        "@type": "Person",
        name: "Ehnand Azucena",
        jobTitle: "Full Stack Developer",
        url: this.baseUrl,
      },
      sameAs: [
        "https://github.com/ehnandazucena",
        "https://linkedin.com/in/ehnandazucena",
        "https://twitter.com/ehnandazucena",
      ],
    }
  }

  generateMetaTags(platform?: string): MetaTags {
    const previewData = this.generatePreviewData(platform)

    return {
      title: previewData.title,
      description: previewData.description,
      keywords:
        "Full Stack Developer, Laravel, React, Symfony, Web Development, SaaS, Database Optimization, PHP, JavaScript, TypeScript",
      "og:title": previewData.title,
      "og:description": previewData.description,
      "og:image": previewData.image,
      "og:url": previewData.url,
      "og:type": previewData.type,
      "og:site_name": previewData.siteName,
      "twitter:card": "summary_large_image",
      "twitter:title": previewData.title,
      "twitter:description": previewData.description,
      "twitter:image": previewData.image,
      "twitter:creator": "@ehnandazucena",
      "linkedin:owner": "ehnandazucena",
    }
  }

  validateImageDimensions(imageUrl: string): Promise<{ width: number; height: number; isValid: boolean }> {
    return new Promise((resolve) => {
      if (typeof window === "undefined") {
        // Server-side: assume valid
        resolve({ width: 1200, height: 630, isValid: true })
        return
      }

      const img = new Image()
      img.crossOrigin = "anonymous"

      img.onload = () => {
        const isValid = img.width >= 1200 && img.height >= 630
        resolve({
          width: img.width,
          height: img.height,
          isValid,
        })
      }

      img.onerror = () => {
        resolve({ width: 0, height: 0, isValid: false })
      }

      img.src = imageUrl
    })
  }

  async generateCompletePreview(platform?: string) {
    const preview = this.generatePreviewData(platform)
    const structuredData = this.generateStructuredData()
    const metaTags = this.generateMetaTags(platform)

    // Validate image if in browser environment
    let imageValidation = { width: 1200, height: 630, isValid: true }
    if (typeof window !== "undefined") {
      imageValidation = await this.validateImageDimensions(preview.image)
    }

    return {
      preview,
      structuredData,
      metaTags,
      imageValidation,
      meta: {
        generated_at: new Date().toISOString(),
        platform: platform || "default",
        format: "json",
      },
    }
  }
}

// Export a default instance
export const linkPreviewGenerator = new LinkPreviewGenerator()
