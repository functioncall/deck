# Integrations

> Every third-party service sits **behind a repository/client port** so it is
> swappable. This doc lists the integrations, the adapter that wraps each, and the
> flows they participate in. No adapter code and **no keys** exist in L0 — ports
> only. Payments decision: [ADR-0003](../docs/adr/0003-stripe-as-payment-processor.md).

## The principle: everything behind a port

The app depends on **interfaces**, never on a vendor SDK directly. Each external
service is reached through an **adapter** that implements a repository/client port
([ADR-0002](../docs/adr/0002-layered-architecture-with-repository-ports.md)). Switch
a provider → only its adapter changes; services and controllers stay put.

Adapters live in `src/lib/{email,payments,analytics}/`. In L0 those are empty
barrels (`export {}`); the adapters are implemented in **L4**.

## The integrations table

| Concern | Tool | Adapter | Port | Layer |
|---|---|---|---|---|
| Payments (Merchant of Record — handles global VAT/GST) | **Lemon Squeezy** | `LemonSqueezyAdapter` | `PurchaseRepository` | L4 |
| Email list + sequences | **Loops** | `LoopsAdapter` | `SubscriberRepository` | L4 |
| Product analytics (funnel events) | **Amplitude** | `AmplitudeAdapter` | `AnalyticsClient` | L4 |
| Video host | **Bunny / Mux** | `VideoAdapter` | (video port) | L6 |

- **Lemon Squeezy** is a **Merchant of Record**: it is the legal seller and
  registers/collects/**remits all global VAT/GST** on our behalf — the reason we
  pay its higher fee over raw Stripe
  ([ADR-0003](../docs/adr/0003-stripe-as-payment-processor.md)). It sits behind
  `PurchaseRepository` as `LemonSqueezyAdapter`; the app depends on the interface,
  not on Lemon.
- **Loops** holds the email list and runs the founding sequence, behind
  `SubscriberRepository` as `LoopsAdapter`.
- **Amplitude** receives funnel events behind an `AnalyticsClient` port as
  `AmplitudeAdapter`.
- **Video** (`VideoAdapter`, Bunny/Mux) powers the `/watch` screencast player — **L6**.

## Flow summary (implemented in L4)

### Email capture (browser → list)

```
EmailForm ─▶ api/subscribe ─▶ SubscribeController (Zod)
          ─▶ SubscribeService (dedupe, tag "lead", analytics event)
          ─▶ SubscriberRepository ─▶ LoopsAdapter
```

### Checkout → access (the money path)

```
"Get the Kit" ─▶ Lemon-hosted checkout (email + card)
              ─▶ api/webhook (Lemon): verify signature
              ─▶ PurchaseController ─▶ PurchaseService
                   ├─ PurchaseRepository.record         (LemonSqueezyAdapter)
                   ├─ SubscriberRepository.addTag "founding" (LoopsAdapter)
                   └─ AnalyticsClient ─ purchase_completed   (AmplitudeAdapter)
              ─▶ thank-you + instant Harness Starter Kit download
```

The webhook **verifies the Lemon signature** before recording anything. The Kit
downloads instantly; the bundled **Screencast** ships later via a signed/expiring
email link to `/watch` ([ADR-0004](../docs/adr/0004-no-user-accounts.md) — no auth,
email-based access). Full sequence diagrams: [docs/SPEC.md](../docs/SPEC.md) §4.

## Keys & accounts

**No API keys or secrets in L0** — and never commit them. Real Lemon Squeezy /
Loops / Amplitude / Vercel accounts and keys are provisioned by **L4**. Do **not**
read or write `.env*` files. Tax note: Lemon Squeezy (MoR) handles foreign VAT; the
founder files only Japan income tax.
