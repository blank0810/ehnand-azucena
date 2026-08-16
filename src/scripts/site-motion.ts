const media = window.matchMedia("(prefers-reduced-motion: reduce)")

if (!media.matches && "IntersectionObserver" in window) {
  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>(".section, .archive-intro, .record"),
  )
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue

        const element = entry.target as HTMLElement
        element.classList.remove("is-reveal-pending")
        element.classList.add("is-revealed")
        observer.unobserve(element)
      }
    },
    { rootMargin: "0px 0px -8%", threshold: 0.08 },
  )

  for (const element of candidates) {
    if (element.getBoundingClientRect().top <= window.innerHeight * 0.92) {
      element.classList.add("is-revealed")
      continue
    }

    element.classList.add("is-reveal-pending")
    observer.observe(element)
  }

  document.documentElement.dataset.motion = "ready"
}
