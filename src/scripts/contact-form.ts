/**
 * Progressive enhancement for the contact form.
 *
 * Without this script the form still posts natively and the Worker answers with
 * a redirect. With it, submission stays on the page and the Worker's per-field
 * guidance is rendered inline. No technical detail ever reaches the visitor:
 * anything that is not a field error becomes one generic, actionable line.
 */

interface TurnstileApi {
  reset(container?: Element | string): void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

interface ContactResponse {
  ok?: boolean
  message?: string
  errors?: Record<string, string>
}

const ENDPOINT = "/api/contact"
const SENT_MESSAGE = "Message sent. I'll reply from my own inbox shortly."

function initializeContactForm(form: HTMLFormElement): void {
  const status = form.querySelector<HTMLElement>("[data-contact-status]")
  const submit = form.querySelector<HTMLButtonElement>("[data-contact-submit]")
  const challenge = form.querySelector<HTMLElement>("[data-contact-challenge]")
  const fallbackLink = form.querySelector<HTMLAnchorElement>(
    ".contact-form__alt a",
  )

  if (!status || !submit) return

  const address = fallbackLink?.textContent?.trim() ?? "the address below"
  const genericMessage =
    "Your message didn't go through. Email " +
    address +
    " directly and it'll reach me."

  // Our own messages replace the browser's, so native validation stands down.
  form.noValidate = true

  function showStatus(message: string, tone: "sent" | "unsent"): void {
    status!.textContent = message
    status!.dataset.tone = tone
    status!.hidden = false
  }

  function clearStatus(): void {
    status!.textContent = ""
    status!.hidden = true
    delete status!.dataset.tone
  }

  function fieldControl(field: string): HTMLElement | null {
    return form.querySelector<HTMLElement>("[name='" + field + "']")
  }

  function clearErrors(): void {
    for (const element of form.querySelectorAll<HTMLElement>("[data-field-error]")) {
      element.textContent = ""
      element.hidden = true
    }
    for (const control of form.querySelectorAll<HTMLElement>("[aria-invalid]")) {
      control.removeAttribute("aria-invalid")
    }
  }

  function showErrors(errors: Record<string, string>): void {
    let firstInvalid: HTMLElement | null = null

    for (const [field, message] of Object.entries(errors)) {
      const target = form.querySelector<HTMLElement>(
        "[data-field-error='" + field + "']",
      )
      if (target) {
        target.textContent = message
        target.hidden = false
      }

      const control = fieldControl(field)
      if (control) {
        control.setAttribute("aria-invalid", "true")
        firstInvalid ??= control
      }
    }

    firstInvalid?.focus()
  }

  function resetChallenge(): void {
    if (challenge && window.turnstile) window.turnstile.reset(challenge)
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault()
    clearErrors()
    clearStatus()

    submit!.disabled = true

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { accept: "application/json" },
        body: new FormData(form),
      })

      const result = (await response
        .json()
        .catch(() => ({}))) as ContactResponse

      if (response.ok && result.ok) {
        form.reset()
        resetChallenge()
        showStatus(SENT_MESSAGE, "sent")
        status!.focus()
        return
      }

      resetChallenge()

      if (result.errors && Object.keys(result.errors).length > 0) {
        showErrors(result.errors)
        return
      }

      showStatus(result.message ?? genericMessage, "unsent")
    } catch {
      resetChallenge()
      showStatus(genericMessage, "unsent")
    } finally {
      submit!.disabled = false
    }
  })

  // The native fallback path lands back here with a neutral marker.
  const url = new URL(window.location.href)
  if (url.searchParams.get("contact") === "unsent") {
    showStatus(genericMessage, "unsent")
    url.searchParams.delete("contact")
    window.history.replaceState({}, "", url.pathname + url.search + url.hash)
  }
}

const contactForm = document.querySelector<HTMLFormElement>("[data-contact-form]")
if (contactForm) initializeContactForm(contactForm)

export {}
