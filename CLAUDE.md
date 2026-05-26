# Project Instructions for AI Agents

This file provides instructions and context for AI coding agents working on this project.

<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:ca08a54f -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

## Session Completion

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   bd dolt push
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
<!-- END BEADS INTEGRATION -->


## Build & Test

**pnpm only** (no npm/yarn). Next.js 16 App Router, TypeScript strict, Tailwind 4.

```bash
pnpm install      # install deps + write pnpm-lock.yaml
pnpm dev          # next dev (local)
pnpm build        # next build (production)
pnpm start        # next start (serve the production build)
pnpm lint         # eslint — includes the no-hard-coded-values rule
pnpm typecheck    # tsc --noEmit (TS strict)
```

There is **no `test` script and no CI** — by design there is no test framework. The
automated gate is **build + lint + typecheck**, run by the ralph driver:
`pnpm install && pnpm lint && pnpm exec tsc --noEmit && pnpm build`. Final
functional verification is **manual**. Agents do **not** run a test suite.

## Architecture Overview

Full **layered clean architecture** with **ports & adapters** — see
[agent_docs/architecture.md](./agent_docs/architecture.md) for the deep-dive.

```
 app/api route ─▶ Controller (Zod validate, shape) ─▶ Service (business rules)
                                                          └─▶ Repository (interface) ─▶ Adapter
```

- **Controllers** validate (Zod) + shape; **services** hold business rules;
  **repositories** are interfaces (ports); **adapters** implement them per provider.
- **No-pass-through guardrail (non-negotiable):** every layer must do a real job.
  **If a layer would do nothing, omit it — do not stub an empty pass-through file.**
- Services depend on repository **interfaces**, never on a concrete adapter, so the
  backend is swappable (e.g. `LemonSqueezyAdapter` → Postgres later) without
  changing services. **No DB and no adapters before L4** (ADR-0002).
- Entities (`Subscriber`, `Purchase`, `Offer`) are **TS types**, not tables.
- **No accounts / no auth** — email-based access (ADR-0004).

### Where each thing lives (`src/`)

| Path | Holds |
|---|---|
| `src/app/` | routes / pages (App Router) |
| `src/components/{atoms,molecules,organisms,templates}/` | UI components |
| `src/content/` | typed content (`offers.ts`, `faq.ts`, `testimonials.ts` — L3) |
| `src/lib/{email,payments,analytics}/` | adapters (concrete repositories — L4) |
| `src/server/{controllers,services}/` | controllers + services |
| `src/types/` | entity types + repository interfaces (ports) |
| `src/styles/` | `theme.css` (tokens) + `globals.css` |

Use `@/*` aliases (→ `src/*`) and the per-layer `index.ts` **barrels** — never deep
relative paths across layers.

## Conventions & Patterns

- **Tailwind 4 `@theme` is the single styling source** (`src/styles/theme.css`,
  extracted verbatim from `index.html`). Components reference theme tokens only —
  **never raw hex/px**. An ESLint rule enforces **no-hard-coded-values** in
  `src/components/**` (hex, `rgb/rgba/hsl`, `px/rem/em`). Fix violations with a
  token or utility, not an inline value (ADR-0005). See
  [agent_docs/design-system.md](./agent_docs/design-system.md).
- **Bespoke atoms from deck tokens + Radix** primitives — no MUI/shadcn (ADR-0005).
- **TypeScript strict**; Zod for input validation at the controller boundary.
- Ground domain language in [CONTEXT.md](./CONTEXT.md):
  [agent_docs/](./agent_docs/) holds the architecture, design-system, content-model,
  integrations, and deck-player deep-dives.

### The don'ts

- ❌ No pure pass-through files / empty stub layers (ADR-0002).
- ❌ No hard-coded color/size values in `src/components/**` — use theme tokens.
- ❌ No database or persistence in early layers; no adapters before **L4** (ADR-0002/0003).
- ❌ Do **not** embed `index.html`, edit it, or delete it before **L2** — it is the
  read-only deck migration source (ADR-0001).
- ❌ No npm/yarn — **pnpm only**. No new deps beyond the fixed stack (+ Radix, Zod).
- ❌ Do not read or write `.env*` files (secrets); no API keys in the repo.
