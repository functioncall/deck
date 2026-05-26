# Layered clean architecture with repository ports, despite being a marketing site

**Status:** accepted

BeyondTheLoop is primarily a marketing + pre-sell site whose only dynamic surface today is: capture an email, start a checkout, receive a payment webhook. We nonetheless chose **full layered clean architecture** — `controller → service → repository` — over a lighter right-sized structure, and back the repository layer with **ports & adapters** rather than a database.

**Why:** a single uniform pattern is more predictable for agentic coding (every future feature has an obvious home) and the brand will grow to host more offers (member area, consultation, accounts). Predictability for the Ralph loop was valued over minimal file count.

**The guardrail (non-negotiable):** every layer must have a *real* responsibility — controllers validate (Zod) + shape responses, services hold business rules/orchestration, repositories persist. **No pure pass-through files.** If a layer would do nothing, it is omitted, not stubbed.

**Data-access seam:** services depend on repository *interfaces* (`SubscriberRepository`, `PurchaseRepository`). Today these are implemented by SaaS adapters (Kit/Loops for subscribers, Lemon Squeezy for purchases). When a layer later needs a real database, a `PostgresAdapter` is dropped in and **services do not change**.

**Considered and rejected:**
- *Right-sized content-site structure* (thin server actions, entities as types, no repository) — fewer files, but inconsistent homes for logic as the app grows; rejected for predictability.
- *Full SaaS backend now* (Postgres + ORM + auth up front) — premature; no persistence need before validating the pre-sell.

**Consequence:** no local database is provisioned in early layers; persistence is deferred to the future layer (member area) that genuinely needs it, added behind the existing repository interface.
