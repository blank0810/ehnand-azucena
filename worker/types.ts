/**
 * Minimal structural types for the bindings this Worker uses.
 *
 * Declared by hand rather than pulling in `@cloudflare/workers-types`: the
 * surface is four members wide and the dependency would outweigh it.
 */

export interface EmailBinding {
  send(message: {
    to: string
    from: string
    subject: string
    text: string
    replyTo?: string
  }): Promise<{ messageId: string }>
}

export interface RateLimitBinding {
  limit(options: { key: string }): Promise<{ success: boolean }>
}

export interface AssetBinding {
  fetch(request: Request): Promise<Response>
}

export interface Env {
  ASSETS: AssetBinding
  EMAIL: EmailBinding
  CONTACT_RATE_LIMIT: RateLimitBinding
  TURNSTILE_SECRET_KEY: string
  CONTACT_TO: string
  CONTACT_FROM: string
  CONTACT_DRY_RUN: string
}
