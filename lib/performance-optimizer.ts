interface PerformanceConfig {
  enableImageOptimization: boolean
  enableResourcePreloading: boolean
  enableCriticalCSS: boolean
  enableServiceWorker: boolean
  enableLazyLoading: boolean
}

class PerformanceOptimizer {
  private config: PerformanceConfig

  constructor(config: PerformanceConfig) {
    this.config = config
  }

  preloadCriticalResources() {
    if (typeof window === "undefined") return

    const criticalResources = [
      { href: "/images/profile-new.jpg", as: "image", type: "image/jpeg" },
      { href: "/fonts/inter.woff2", as: "font", type: "font/woff2", crossorigin: "anonymous" },
      { href: "/api/performance-data", as: "fetch" },
    ]

    criticalResources.forEach((resource) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.href = resource.href
      link.as = resource.as
      if (resource.type) link.type = resource.type
      if (resource.crossorigin) link.crossOrigin = resource.crossorigin
      document.head.appendChild(link)
    })
  }

  optimizeImages() {
    if (typeof window === "undefined") return

    const images = document.querySelectorAll("img[data-src]")
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            const src = img.dataset.src
            if (src) {
              img.src = src
              img.removeAttribute("data-src")
              observer.unobserve(img)
            }
          }
        })
      },
      { rootMargin: "50px" },
    )

    images.forEach((img) => imageObserver.observe(img))
  }

  addResourceHints() {
    if (typeof window === "undefined") return

    const hints = [
      { rel: "dns-prefetch", href: "//fonts.googleapis.com" },
      { rel: "dns-prefetch", href: "//api.vercel.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous" },
    ]

    hints.forEach((hint) => {
      const link = document.createElement("link")
      link.rel = hint.rel
      link.href = hint.href
      if (hint.crossorigin) link.crossOrigin = hint.crossorigin
      document.head.appendChild(link)
    })
  }

  inlineCriticalCSS() {
    const criticalCSS = `
      body { 
        font-family: system-ui, -apple-system, sans-serif;
        background: #0f172a;
        color: #f8fafc;
        margin: 0;
        padding: 0;
      }
      .hero-section {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .loading-placeholder {
        width: 100%;
        height: 200px;
        background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }
      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `

    const style = document.createElement("style")
    style.textContent = criticalCSS
    document.head.insertBefore(style, document.head.firstChild)
  }

  deferNonCriticalJS() {
    if (typeof window === "undefined") return

    const scripts = document.querySelectorAll('script[data-defer="true"]')
    scripts.forEach((script) => {
      const newScript = document.createElement("script")
      newScript.src = script.getAttribute("src") || ""
      newScript.defer = true
      document.body.appendChild(newScript)
      script.remove()
    })
  }

  initialize() {
    if (typeof window === "undefined") return

    this.addResourceHints()
    this.inlineCriticalCSS()

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        this.preloadCriticalResources()
        this.optimizeImages()
        this.deferNonCriticalJS()
      })
    } else {
      this.preloadCriticalResources()
      this.optimizeImages()
      this.deferNonCriticalJS()
    }
  }
}

export const performanceOptimizer = new PerformanceOptimizer({
  enableImageOptimization: true,
  enableResourcePreloading: true,
  enableCriticalCSS: true,
  enableServiceWorker: true,
  enableLazyLoading: true,
})
