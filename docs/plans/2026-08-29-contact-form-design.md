# Contact form on an asset-only Cloudflare Worker

Date: 2026-08-29
Status: accepted

## Problem

The contact section offers a `mailto:` link and nothing else. A visitor who is
convinced by the evidence has to leave the page, open a mail client, and compose
a message from a blank window. That is the highest-friction point on the site and
it sits directly after the strongest proof.

## Constraint being relaxed

`wrangler.jsonc` was deliberately asset-only: no `main`, no server adapter, no
bindings, no secrets. A contact form cannot be delivered inside that constraint.
This document records the decision to relax it in the narrowest way that works.

Astro stays `output: "static"`. There is no `@astrojs/cloudflare` adapter, no
`prerender = false`, and no server island. Every existing page is still
prerendered HTML served from the assets binding. The Worker owns exactly one
route and passes everything else through untouched.

## Architecture

```text
worker/
  index.ts      fetch handler: POST /api/contact, else env.ASSETS.fetch(request)
  contact.ts    orchestration: parse -> validate -> turnstile -> rate limit -> send
  validate.ts   pure functions, no Worker globals, unit-testable under node --test
  turnstile.ts  siteverify round-trip
  notify.ts     the only module that touches env.EMAIL
```

`notify.ts` is isolated so the transport can be swapped without touching
validation, spam defence, or response shaping.

### Bindings

`wrangler.jsonc` gains four things and nothing else:

- `"main": "worker/index.ts"`
- `"binding": "ASSETS"` inside the existing `assets` block
- `send_email` with `destination_address` pinned, so the Worker cannot be
  coerced into mailing a third party even if every other check is defeated
- `ratelimit` for per-IP throttling

`TURNSTILE_SECRET_KEY` is a Worker secret and never enters the repository. The
Turnstile *site* key is public and is a build-time value in `src/config/site.ts`.

## Transport

Cloudflare Email Service via the `send_email` binding:

```ts
await env.EMAIL.send({ to, from, subject, text, replyTo })
```

No `mimetext`, no hand-rolled MIME. `replyTo` carries the visitor address so a
reply from the owner's inbox reaches them directly.

### Owner-controlled prerequisites

These are dashboard actions and are not automatable from this repository:

1. `ehnand.com` onboarded to Email Service with MX, SPF, DKIM, and DMARC on
   Cloudflare DNS.
2. Confirmation that Email Service coexists with the existing Email Routing
   forwarding for `contact@ehnand.com` before any MX change.
3. Account access to Email Service, which launched as a private beta.
4. A Turnstile widget created, yielding the site key and secret key.

If (3) blocks, `notify.ts` is the only file that changes.

## Form

Placement is inline in the existing `#contact` section, left column of
`.contact__layout`, beneath the intro copy. The records list on the right is
untouched. No new canonical route, no nav change, no sitemap change.

The section sits on `--inverse-surface`, which is dark under both site themes,
so the Turnstile widget is pinned `data-theme="dark"` unconditionally.

| Field | Rules |
| --- | --- |
| `name` | optional, <= 100 |
| `email` | required, shape-validated, <= 254 |
| `company` | optional, <= 100 |
| `message` | required, 10-4000 |
| `website` | honeypot, hidden, non-empty means bot |

Subject falls back to the address when no name is given:
`New enquiry from {name ?? email}`.

### Progressive enhancement

Turnstile cannot mint a token without JavaScript, so the form is itself a
JavaScript-dependent enhancement. The existing `mailto:` remains the no-script
path and is promoted to the headline action inside `<noscript>`. Turnstile needs
JavaScript only to *render the widget*; it injects `cf-turnstile-response` into
the form, so a plain native `method="post"` submit still works once rendered.

The machine-readable address is unaffected either way: `schema.ts:18` already
emits `email` on the Person entity.

### Accessibility

Real `<label>` per field, `aria-describedby` wiring each error, `aria-invalid`
toggled on failure, one `role="status" aria-live="polite"` region for submission
state, and focus moved to the first invalid field. `:focus-visible` inherits the
existing inverse outline rule.

## Failure handling

The controlling rule: **a technical error is never displayed.**

Visible copy is limited to two classes. Field-level guidance ("Enter an email
address I can reply to") and, for every other failure without exception, a single
line that always offers an action the visitor can take immediately:

> Your message didn't go through. Email contact@ehnand.com directly and it'll
> reach me.

No status codes, no service names, no error identifiers, no "try again later"
hedge that leaves someone stuck.

The real cause goes to `console.error` with a request id, into the observability
already enabled in `wrangler.jsonc`. Wire-level statuses stay semantically
correct because they are useful in logs and to well-behaved clients; they simply
never reach rendered copy.

| Condition | Wire | Rendered |
| --- | --- | --- |
| Honeypot filled | 303 -> `/thank-you` | Fake success. Never tell a bot it failed. |
| Field invalid | 400 | Per-field guidance only |
| Turnstile rejected | 403 | The single generic line |
| Rate limit hit | 429 | The single generic line |
| Send failure or daily cap | 502 | The single generic line |

Checks run cheapest-first: method and content type, honeypot, field validation,
then Turnstile, then rate limit, then send. Turnstile costs a network round-trip
and sits behind the free checks.

Response shape is negotiated on `Accept`. The enhanced path sends
`application/json` and gets `{ ok, errors }` rendered inline. The native path
gets a `303`: success to `/thank-you`, failure to `/?contact=unsent#contact`, a
neutral parameter that reveals nothing.

Because a static-assets site cannot re-render an Astro page from the Worker, the
native path relies on HTML5 `required` and `type="email"` for field errors before
submit. The Worker revalidates everything regardless.

## Security

- Plain-text mail body only. No HTML part, so there is no injection surface.
- CRLF stripped from address and subject inputs to prevent header injection.
- Recipient pinned at the binding, not chosen at runtime.
- Length caps enforced before any outbound call.

## Verification

- `validate.ts` is pure and gets `node --test` unit tests under `tests/unit/`.
- An integration test asserts the built page contains the form, the honeypot, and
  the `<noscript>` fallback, and that the endpoint rejects a bad payload.
- Turnstile's documented always-pass test keys cover `wrangler dev --local`.
- `CONTACT_DRY_RUN` keeps local and integration runs from attempting real sends.

## Implementation notes

### workerd has no outbound network in the container

Discovered while wiring the integration suite: a bare
`fetch("https://example.com/")` from inside `wrangler dev --local` fails with
`internal error; reference = ...`, while Node's `fetch` to the same host from the
same container succeeds. Live `siteverify` is therefore unreachable in local
development, and the endpoint correctly failed closed with a 403.

Rather than weaken the real path, `CONTACT_DRY_RUN=true` now also swaps
`verifyTurnstile` for `verifyDummyToken`, which accepts only Cloudflare's
documented dummy token in process. An empty token is still refused, and a
real-looking token is still refused, so the 403 path stays under test. The
committed configuration pins `CONTACT_DRY_RUN` to `"false"`, and a unit test
asserts it.

Live verification is covered instead by unit tests with a stubbed `fetch`,
including the fail-closed cases: unreachable verifier, non-200 response, and
rejected token.

### Deployment checklist

Owner actions, in order:

1. Onboard `ehnand.com` to Cloudflare Email Service and confirm coexistence with
   the existing Email Routing forwarding.
2. Create a Turnstile widget for `ehnand.com`.
3. Note that `TURNSTILE_SECRET_KEY` cannot be set yet. Cloudflare refuses runtime
   variables on a Worker that only has static assets, so the panel is locked
   until a deploy carries `worker/index.ts`. It is set in step 6, not here.
4. Set `TURNSTILE_SITE_KEY` as a Workers Builds **build** variable, alongside the
   existing `SITE_URL`. A local `.env` is gitignored and never reaches the
   Cloudflare builder, so it covers local builds only. Without the build
   variable the deploy succeeds, warns in the build log, and ships a form that
   rejects every submission.
5. Only then push to `main`. Workers Builds treats `main` as the production
   branch, so the push is the deploy.
6. With the script now deployed, add `TURNSTILE_SECRET_KEY` under the Worker's
   runtime Variables and Secrets.
7. Send one real message and confirm it arrives with a working `Reply-To`.

The form is live but fails closed between steps 5 and 6, showing its generic
message and the `mailto:` fallback.

Build variables and runtime secrets are separate scopes. Putting either key in
the other place fails silently: the site key is consumed by Astro at build time,
the secret by the Worker per request.
