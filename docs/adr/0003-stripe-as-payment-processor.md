# Lemon Squeezy (Merchant of Record) as the payment provider

**Status:** accepted

We sell the **Pre-sell** via **Lemon Squeezy**, a Merchant of Record, rather than raw Stripe. The seller is a solo founder based in **Japan** selling a digital product **worldwide**.

**Why:** as a Merchant of Record, Lemon Squeezy is the legal seller and therefore registers, collects, and **remits all global VAT/GST** on our behalf — removing the single biggest operational burden of selling digital goods internationally as a one-person business. Worth the higher fee for the compliance offload.

**Trade-off accepted:** ~5% + payment fee (vs raw Stripe's ~3.6% in Japan), checkout is Lemon-hosted (embeddable/branded overlay, not fully custom), and payouts arrive on Lemon's schedule to the Japanese bank. We accept these in exchange for zero foreign-tax liability.

**Considered and rejected:**
- *Raw Stripe* — lowest fees + native checkout, and the founder already has it wired to a Japanese bank; rejected because it makes the founder the seller of record, owning VAT/GST registration + filing in every jurisdiction sold to. Stripe Tax calculates but does not file. Too much admin/risk for a solo seller going global.
- *Paddle* — equivalent MoR tax benefit but subscription/SaaS-oriented; overkill for a single $50 screencast.

**Seam:** Lemon Squeezy sits behind the `PurchaseRepository` port as the `LemonSqueezyAdapter`; the app depends on the interface, not on Lemon. If we ever switch processors, only the adapter changes.
