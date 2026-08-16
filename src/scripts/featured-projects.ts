import { canAutoAdvance, wrapProjectIndex } from "@/lib/featured-carousel"

const ROTATION_DELAY = 7_000

function initializeFeaturedProjects(root: HTMLElement): void {
  const slides = Array.from(
    root.querySelectorAll<HTMLElement>("[data-featured-project]"),
  )
  const selectors = Array.from(
    root.querySelectorAll<HTMLButtonElement>("[data-featured-selector]"),
  )
  const controls = Array.from(
    root.querySelectorAll<HTMLElement>("[data-featured-controls]"),
  )
  const previous = root.querySelector<HTMLButtonElement>(
    "[data-featured-previous]",
  )
  const next = root.querySelector<HTMLButtonElement>("[data-featured-next]")
  const pause = root.querySelector<HTMLButtonElement>("[data-featured-pause]")
  const position = root.querySelector<HTMLElement>("[data-featured-position]")
  const status = root.querySelector<HTMLElement>("[data-featured-status]")

  if (
    slides.length === 0
    || !previous
    || !next
    || !pause
    || !position
    || !status
  ) return

  const pauseButton = pause
  const positionLabel = position
  const statusMessage = status

  const media = window.matchMedia("(prefers-reduced-motion: reduce)")
  let index = 0
  let timer: number | undefined
  let userPaused = false
  let hovered = false
  let focusWithin = false
  let documentHidden = document.hidden
  let reducedMotion = media.matches

  function clearTimer(): void {
    if (timer !== undefined) window.clearTimeout(timer)
    timer = undefined
  }

  function currentState() {
    return {
      userPaused,
      hovered,
      focusWithin,
      documentHidden,
      reducedMotion,
    }
  }

  function render(nextIndex: number, announce: boolean): void {
    index = wrapProjectIndex(nextIndex, slides.length)

    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index
      slide.dataset.active = String(active)
      slide.setAttribute("aria-hidden", String(!active))
      slide.inert = !active
    })

    selectors.forEach((button, buttonIndex) => {
      button.setAttribute("aria-pressed", String(buttonIndex === index))
    })

    positionLabel.textContent = `${String(index + 1).padStart(2, "0")} / ${String(
      slides.length,
    ).padStart(2, "0")}`
    pauseButton.textContent = userPaused
      ? "Resume rotation"
      : "Pause rotation"
    pauseButton.setAttribute("aria-pressed", String(userPaused))

    if (announce) {
      statusMessage.textContent = `Showing ${
        slides[index].getAttribute("aria-label") ?? `project ${index + 1}`
      }`
    }
  }

  function schedule(): void {
    clearTimer()
    if (!canAutoAdvance(currentState())) return

    timer = window.setTimeout(() => {
      render(index + 1, false)
      schedule()
    }, ROTATION_DELAY)
  }

  function show(nextIndex: number): void {
    render(nextIndex, true)
    schedule()
  }

  previous.addEventListener("click", () => show(index - 1))
  next.addEventListener("click", () => show(index + 1))
  selectors.forEach((button) => {
    button.addEventListener("click", () => {
      const target = Number(button.dataset.featuredSelector)
      if (Number.isInteger(target)) show(target)
    })
  })
  pauseButton.addEventListener("click", () => {
    userPaused = !userPaused
    render(index, false)
    schedule()
  })
  root.addEventListener("mouseenter", () => {
    hovered = true
    schedule()
  })
  root.addEventListener("mouseleave", () => {
    hovered = false
    schedule()
  })
  root.addEventListener("focusin", () => {
    focusWithin = true
    schedule()
  })
  root.addEventListener("focusout", (event) => {
    focusWithin = event.relatedTarget instanceof Node
      && root.contains(event.relatedTarget)
    schedule()
  })
  document.addEventListener("visibilitychange", () => {
    documentHidden = document.hidden
    schedule()
  })
  media.addEventListener("change", (event) => {
    reducedMotion = event.matches
    schedule()
  })

  controls.forEach((control) => {
    control.hidden = false
  })
  root.dataset.enhanced = "true"
  render(0, false)
  schedule()
}

for (const root of document.querySelectorAll<HTMLElement>(
  "[data-featured-projects]",
)) {
  initializeFeaturedProjects(root)
}
