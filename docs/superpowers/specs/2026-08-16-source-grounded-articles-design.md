# Source-Grounded Article Batch — Design

**Date:** 2026-08-16
**Status:** Approved in conversation

## Purpose

Publish one substantial article in each of the portfolio's four editorial categories, using recent Obsidian vault notes and live repository evidence as the factual foundation. The ERP article is a standalone technical article until its project resources are complete; it must not create or link to a portfolio project page.

The writing should show engineering judgment, not merely summarize implementation details. It must remain safe for a public, reputation-sensitive portfolio: specific people, customer records, account values, private repository locations, cloud identifiers, credentials, unresolved exploit details, and internal client names stay out of the published copy.

## Deliverables

1. A `Business Systems & Data Integrity` article about why a mathematically correct ledger can still render a misleading billing statement when chronological and reporting-period boundaries disagree.
2. A `SaaS, Cloud & Security` article about packaging a Python 3.14 FastAPI/Mangum ERP backend for AWS Lambda and API Gateway with Terraform, while clearly labelling multi-tenancy as partially implemented.
3. An `AI & Automation` article about durable AI-assisted development memory using a dual-read, forward-write Obsidian workflow, atomic notes, and maps of content.
4. An `Engineering Practice & Reliability` article about recurring automation that passes while taking a no-op path and fails only when its rare action path is finally needed.
5. GitHub Flavored Markdown table support in the shared MDX renderer so article pipe tables render as semantic HTML tables.

All four articles are complete MDX files with no `draft` flag. They use the real creation/publication date `2026-08-16`, so they appear in the local Articles listing, sitemap, RSS feed, listing JSON-LD, and related-article links. The owner will review them locally before deciding whether to deploy the repository changes.

## Public article set

| Category | Slug | Public title | Primary project reference |
|---|---|---|---|
| Business Systems & Data Integrity | `correct-ledger-wrong-billing-statement` | `Why a Correct Ledger Total Can Still Produce a Wrong Billing Statement` | Initao Water Billing System |
| SaaS, Cloud & Security | `fastapi-erp-terraform-aws-lambda` | `Deploying a Python 3.14 FastAPI ERP to AWS Lambda with Terraform` | None while the ERP project is unpublished |
| AI & Automation | `durable-ai-memory-obsidian-mocs` | `Building Durable AI Memory with Obsidian, Atomic Notes, and MOCs` | Cross-project engineering workflow |
| Engineering Practice & Reliability | `automation-no-op-rare-paths` | `Automation That Usually No-Ops Has Not Proved It Can Act` | Adam AI |

## Editorial design

### Correct ledger, wrong statement

The article distinguishes two legitimate orderings over the same ledger rows: chronological presentation by effective transaction time and reporting placement by billing period. It explains why changing only the transaction date can fix a statement-of-account view while leaving a period-based Billing Statement wrong, why a null period becomes a presentation defect rather than harmless missing metadata, and why total-equality tests cannot validate the rendered artifact.

The public version uses generic examples and pseudocode. It does not identify a customer, connection, exact correction amount, or production database row.

### FastAPI ERP with Terraform

The article follows the request path from API Gateway REST v1 through a custom authorizer, Lambda, Mangum, FastAPI, PostgreSQL, and S3. It explains how Terraform packages the application and dependency layer and owns the Lambda, IAM, parameter access, gateway, authorizer, usage plan, and deployment wiring.

Python is stated as **3.14**, supported by the active `pyproject.toml`, local Docker image, Lambda runtime variable, and current interpreter. The article does not call the system fully multi-tenant: the current code validates one configured tenant and resolves one engine and bucket per deployment, while the tenant control plane and multi-tenant routing remain future work. Terraform is presented as infrastructure-as-code that makes this boundary explicit, not as proof that every planned architecture layer is already live.

### Durable AI memory

The article presents the durable-memory problem as retrieval and lifecycle design rather than storage volume. Its architecture is dual-read and forward-write: retain existing tool-managed memory, inject only a small vault catalog at session start, write new non-secret knowledge into Obsidian, anchor atomic notes to project MOCs, and prune stale knowledge.

It explicitly separates secrets from portable notes and avoids publishing local paths, hook configuration, private corpus counts, or tool credentials. The portable lesson is that a context window is temporary working state, while durable memory needs indexing, provenance, scoping, and decay control.

### Automation and rare paths

The article uses an anonymized branch-sync workflow to show how repeated green runs exercised only a fast-forward/no-op path. The first true merge required an author identity that had never been configured, so the workflow failed exactly when it had work to perform.

The article generalizes this to retry handlers, rollback jobs, recovery scripts, alerts, and migrations. It recommends enumerating branches, making harmless prerequisites unconditional, forcing rare-path exercises, and verifying action artifacts rather than trusting schedule frequency or green status alone. It includes generic Git configuration and workflow pseudocode without repository, branch-policy, or pull-request identifiers.

## Unpublished ERP boundary

The ERP's project resources are not complete, so it is excluded from `lib/projects.ts`, project listings, generated project routes, structured data, and the sitemap. The FastAPI/Terraform article remains published because it is useful on its own and is grounded in verified implementation notes. It describes the technical system without presenting it as a portfolio project or linking to `/projects/multi-tenant-erp-backend`.

## MDX table rendering

Article content uses GitHub Flavored Markdown pipe tables. The shared server-side MDX renderer enables `remark-gfm`, allowing those tables to compile into semantic `table`, `thead`, `th`, and `td` elements. Existing styled table components remain responsible for responsive horizontal overflow and visual presentation.

## Linking and discoverability

- Each article ends with a concise author or published-project reference in the style of the five existing articles.
- Project links use canonical `https://ehnand.com/projects/...` URLs.
- The ERP article has no project link until the corresponding portfolio entry is ready.
- Relevant new and existing articles cross-link only when the destination adds context.
- Public article bodies never link to the Obsidian vault or private repositories.
- Metadata, `BlogPosting` JSON-LD, sitemap, RSS, and category filtering retain their existing architecture. The MDX renderer gains only the GFM parsing plugin required for pipe tables.

## Verification

Regression tests cover:

1. Nine total published articles.
2. All four approved categories visible in the Articles filter rail.
3. Each new article rendered at its canonical `/articles/[slug]` URL.
4. No new article rendered as a draft.
5. The durable-memory article renders its Store/Best use pipe table as semantic HTML rather than paragraph text.
6. No new article or sitemap output advertises `/projects/multi-tenant-erp-backend`.
7. Sitemap and RSS discovery for all four new article URLs.

After the red-green integration check, run the separate Docker Compose lint command and the production build with `NODE_ENV=production`. Inspect the final diff for accidental private names, identifiers, unsupported metrics, placeholder language, and unrelated file changes.

## Success criteria

- Every category contains at least one published article and therefore appears in the category rail.
- The four articles read as complete, useful essays rather than outlines or note dumps.
- Every material system claim can be traced to a vault note or current source file inspected during this work.
- The ERP article says Python 3.14 and never Python 3.12.
- The ERP's partial multi-tenancy boundary remains explicit in the article without exposing an incomplete project page.
- GitHub Flavored Markdown tables render as semantic, horizontally scrollable HTML tables.
- No confidential client or production details are introduced into the public portfolio.
