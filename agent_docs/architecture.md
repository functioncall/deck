# Architecture

> How code is layered in BeyondTheLoop, where each layer lives, and the rules an
> agent must keep. Decisions are fixed in the ADRs cited inline — this doc
> explains them, it does not re-decide them. Source of truth for sequencing:
> [docs/SPEC.md](../docs/SPEC.md) §2; this layer's frozen spec:
> [docs/specs/2026-05-27-l0-foundation.md](../docs/specs/2026-05-27-l0-foundation.md).

## The shape

Full **layered clean architecture** with **ports & adapters**
([ADR-0002](../docs/adr/0002-layered-architecture-with-repository-ports.md)).
A request flows in one direction:

```
 app/api route ─▶ Controller (Zod validate, shape) ─▶ Service (business rules)
                                                          └─▶ Repository (interface)
                                                                ├─ SaaS adapter (now)
                                                                └─ Postgres adapter (later)
```

- **Controller** — validates input with Zod, shapes the response. No business logic.
- **Service** — holds business rules and orchestration (dedupe, tagging, ordering
  of side-effects). Depends on repository **interfaces**, never on a concrete adapter.
- **Repository** — a TypeScript **interface** (a port). Persists / fetches entities.
- **Adapter** — the concrete implementation of a repository for a specific provider
  (e.g. `LoopsAdapter`, `LemonSqueezyAdapter`). Lives in `src/lib/*`. **L4.**

Why a marketing site carries this much structure: a single uniform pattern is
predictable for agentic coding (every future feature has an obvious home) and the
brand will grow to host more offers. Predictability was valued over minimal file
count ([ADR-0002](../docs/adr/0002-layered-architecture-with-repository-ports.md)).

## The non-negotiable guardrail: no pure pass-through files

**Every layer must have a real job.** Controllers validate + shape; services hold
rules; repositories persist. **If a layer would do nothing, it is omitted, not
stubbed.** Do not create empty class shells that only forward a call to the next
layer — that is the one thing this architecture forbids
([ADR-0002](../docs/adr/0002-layered-architecture-with-repository-ports.md)).

In L0 this means the repo ships only files with **real content**: entity types,
repository interfaces, barrels, config, and tokens. There are **no stub
controllers or services with placeholder bodies** — `src/server/{controllers,
services}` currently hold only barrels, and real classes arrive in L4 when there
is actual logic to host.

## The repository-port seam

Services depend on repository **interfaces**, so the data backend is swappable
without touching business rules:

- `SubscriberRepository` → today `LoopsAdapter` (email list), later could be Postgres.
- `PurchaseRepository` → today `LemonSqueezyAdapter`
  ([ADR-0003](../docs/adr/0003-stripe-as-payment-processor.md)); the app depends on
  the interface, not on Lemon Squeezy. Switch processors → only the adapter changes.

When a layer eventually needs a real database, a `PostgresAdapter` is dropped in
behind the existing interface and **services do not change**. No local database is
provisioned in early layers; persistence is deferred to the layer (member area)
that genuinely needs it ([ADR-0002](../docs/adr/0002-layered-architecture-with-repository-ports.md)).

## Entities are types, not tables

Domain entities (`Subscriber`, `Purchase`, `Offer`) are **TypeScript types** in
`src/types/entities.ts` — **no DB in L0**. Repository ports
(`SubscriberRepository`, `PurchaseRepository`) are interfaces in
`src/types/repositories.ts`. The barrel `src/types/index.ts` re-exports both.
See [content-model.md](./content-model.md) for the entity shapes.

## No accounts, no auth

Buying requires no account (Lemon Squeezy checkout takes email + card only).
Access is **email-based**: when the deliverable ships, buyers get a signed/expiring
link by email. There is **no login, no password, no auth system** in the codebase
([ADR-0004](../docs/adr/0004-no-user-accounts.md)). A magic-link member area is the
planned graduation path (a future layer), added behind the existing repository
seam — not retrofitted now.

## Where each layer lives

| Concern | Location |
|---|---|
| Routes / pages (App Router) | `src/app/` |
| Controllers (Zod validate, shape) | `src/server/controllers/` |
| Services (business rules) | `src/server/services/` |
| Repository interfaces (ports) + entity types | `src/types/` |
| Adapters (concrete repositories per provider) | `src/lib/{email,payments,analytics}/` |
| UI components | `src/components/{atoms,molecules,organisms,templates}/` |
| Typed content | `src/content/` |
| Tokens + globals | `src/styles/` |

## Aliases & barrels

- `@/*` resolves to `src/*` (`tsconfig.json` `paths`). Import `@/types`,
  `@/components/atoms`, etc. — never deep relative paths across layers.
- Each layer directory has an `index.ts` **barrel** so imports stay stable as a
  layer's internals change. Barrels currently `export {}` where a layer has no
  members yet — that is intentional, not a pass-through violation (a barrel is a
  legitimate export surface, not a forwarding stub).

## Verification

No test framework, no CI. The automated gate is the ralph driver's
**build + lint + typecheck**:
`pnpm install && pnpm lint && pnpm exec tsc --noEmit && pnpm build`.
Final functional verification is **manual**. Agents do **not** run a test suite.
