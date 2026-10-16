import {
  HEIGHT,
  LOOP_SECONDS,
  STILL_TIME,
  WIDTH,
  canAnimate,
  frameAt,
  renderFrame,
} from "@/lib/farewell-scene"

function initializeFarewellScene(root: HTMLElement): void {
  const canvas = root.querySelector<HTMLCanvasElement>("[data-farewell-canvas]")
  const fallback = root.querySelector<HTMLElement>("[data-farewell-fallback]")
  const pause = root.querySelector<HTMLButtonElement>("[data-farewell-pause]")
  const context = canvas?.getContext("2d")

  if (!canvas || !fallback || !pause || !context) return

  const pauseButton = pause
  const surface = context
  const image = surface.createImageData(WIDTH, HEIGHT)
  const media = window.matchMedia("(prefers-reduced-motion: reduce)")
  let userPaused = false
  let offscreen = true
  let documentHidden = document.hidden
  let reducedMotion = media.matches
  let elapsed = 0
  let lastTimestamp: number | undefined
  let drawnFrame = -1
  let request: number | undefined

  function draw(seconds: number): void {
    const frame = frameAt(seconds)
    if (frame === drawnFrame) return
    drawnFrame = frame
    renderFrame(image.data, seconds)
    surface.putImageData(image, 0, 0)
  }

  function tick(timestamp: number): void {
    if (lastTimestamp !== undefined) {
      elapsed = (elapsed + (timestamp - lastTimestamp) / 1000) % LOOP_SECONDS
    }
    lastTimestamp = timestamp
    draw(elapsed)
    request = window.requestAnimationFrame(tick)
  }

  function update(): void {
    const running = canAnimate({
      userPaused,
      offscreen,
      documentHidden,
      reducedMotion,
    })

    if (running && request === undefined) {
      lastTimestamp = undefined
      request = window.requestAnimationFrame(tick)
    }
    if (!running && request !== undefined) {
      window.cancelAnimationFrame(request)
      request = undefined
    }

    if (reducedMotion) {
      elapsed = STILL_TIME
      draw(STILL_TIME)
    }

    pauseButton.hidden = reducedMotion
    pauseButton.textContent = userPaused ? "Play animation" : "Pause animation"
  }

  pauseButton.addEventListener("click", () => {
    userPaused = !userPaused
    update()
  })
  document.addEventListener("visibilitychange", () => {
    documentHidden = document.hidden
    update()
  })
  media.addEventListener("change", (event) => {
    reducedMotion = event.matches
    update()
  })
  new IntersectionObserver((entries) => {
    offscreen = !entries.some((entry) => entry.isIntersecting)
    update()
  }).observe(root)

  draw(reducedMotion ? STILL_TIME : 0)
  canvas.hidden = false
  fallback.hidden = true
  root.dataset.enhanced = "true"
  update()
}

for (const root of document.querySelectorAll<HTMLElement>(
  "[data-farewell-scene]",
)) {
  initializeFarewellScene(root)
}
