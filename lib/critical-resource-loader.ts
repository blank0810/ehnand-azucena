interface CriticalResource {
  url: string
  type: "script" | "style" | "font" | "image"
  priority: "high" | "medium" | "low"
  preload?: boolean
}

export class CriticalResourceLoader {
  private loadedResources = new Set<string>()
  private loadingPromises = new Map<string, Promise<void>>()

  // Load critical resources in order of priority
  async loadCriticalResources(resources: CriticalResource[]): Promise<void> {
    const highPriority = resources.filter((r) => r.priority === "high")
    const mediumPriority = resources.filter((r) => r.priority === "medium")
    const lowPriority = resources.filter((r) => r.priority === "low")

    // Load high priority resources first
    await Promise.all(highPriority.map((resource) => this.loadResource(resource)))

    // Load medium priority resources
    await Promise.all(mediumPriority.map((resource) => this.loadResource(resource)))

    // Load low priority resources (can be deferred)
    setTimeout(() => {
      lowPriority.forEach((resource) => this.loadResource(resource))
    }, 100)
  }

  private async loadResource(resource: CriticalResource): Promise<void> {
    if (this.loadedResources.has(resource.url)) {
      return Promise.resolve()
    }

    if (this.loadingPromises.has(resource.url)) {
      return this.loadingPromises.get(resource.url)!
    }

    const loadPromise = this.createLoadPromise(resource)
    this.loadingPromises.set(resource.url, loadPromise)

    try {
      await loadPromise
      this.loadedResources.add(resource.url)
    } catch (error) {
      console.warn(`Failed to load resource: ${resource.url}`, error)
    } finally {
      this.loadingPromises.delete(resource.url)
    }
  }

  private createLoadPromise(resource: CriticalResource): Promise<void> {
    return new Promise((resolve, reject) => {
      switch (resource.type) {
        case "script":
          this.loadScript(resource.url, resolve, reject)
          break
        case "style":
          this.loadStylesheet(resource.url, resolve, reject)
          break
        case "font":
          this.loadFont(resource.url, resolve, reject)
          break
        case "image":
          this.loadImage(resource.url, resolve, reject)
          break
        default:
          reject(new Error(`Unknown resource type: ${resource.type}`))
      }
    })
  }

  private loadScript(url: string, resolve: () => void, reject: (error: Error) => void) {
    const script = document.createElement("script")
    script.src = url
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load script: ${url}`))
    document.head.appendChild(script)
  }

  private loadStylesheet(url: string, resolve: () => void, reject: (error: Error) => void) {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = url
    link.onload = () => resolve()
    link.onerror = () => reject(new Error(`Failed to load stylesheet: ${url}`))
    document.head.appendChild(link)
  }

  private loadFont(url: string, resolve: () => void, reject: (error: Error) => void) {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "font"
    link.type = "font/woff2"
    link.crossOrigin = "anonymous"
    link.href = url
    link.onload = () => resolve()
    link.onerror = () => reject(new Error(`Failed to load font: ${url}`))
    document.head.appendChild(link)
  }

  private loadImage(url: string, resolve: () => void, reject: (error: Error) => void) {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`))
    img.src = url
  }
}

export const criticalResourceLoader = new CriticalResourceLoader()
