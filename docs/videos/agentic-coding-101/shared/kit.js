// Scene kit for clips 03 to 10, inlined into each clip's index.html by shell.mjs.
// A scene creates its own paused timeline, asks the kit for helpers bound to it
// (window.__kit(tl, sceneId)), then registers the timeline under its own scene id.
// Example: k.rise("#row", k.at("l04", "user settings")) raises #row as the
// narration reaches "user settings" in line l04.
// Every tween states both ends (fromTo), so any frame renders from its time alone.
window.__kit = (tl, scene) => {
  const V = window.__vo
  const [S, E] = V.scenes[scene]
  // When a phrase is said: its share of the line's characters, from the line's exact start.
  const at = (id, words) => {
    const [s, e, say] = V.lines[id]
    const i = words ? say.indexOf(words) : 0
    if (i < 0) throw new Error(`"${words}" is not in ${id}`)
    return s - S + (i / say.length) * (e - s)
  }
  return {
    at,
    end: E - S,
    title: (el, t = 0.05) => tl.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power4.out" }, t),
    rise: (el, t, y = 20) => tl.fromTo(el, { opacity: 0, y }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, t),
    slide: (el, t, x = -20) => tl.fromTo(el, { opacity: 0, x }, { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" }, t),
    fade: (el, t, d = 0.4) => tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: d }, t),
    pop: (el, t) => tl.fromTo(el, { opacity: 0, scale: 0.92, transformOrigin: "0% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.6)" }, t),
    draw: (el, t, d = 0.6) => tl.fromTo(el, { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: d, ease: "power2.inOut" }, t),
    // Lines of a file appear one after another, like the file being written.
    lines: (sel, t, stagger = 0.12) => tl.fromTo(sel, { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.35, ease: "power3.out", stagger }, t),
    tint: (el, t, color = "#164bc5") => tl.to(el, { color, duration: 0.4 }, t),
    exit: (el) => tl.to(el, { opacity: 0, duration: 0.3, ease: "power1.in" }, E - S - 0.3),
  }
}
