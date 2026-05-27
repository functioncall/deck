// PurchaseService — the money-path business rules (SPEC §4.2). Depends on the
// repository INTERFACES (`PurchaseRepository`, `SubscriberRepository`,
// `AnalyticsClient`), never on a concrete adapter (ADR-0002) — the route injects
// the adapters via their factories. Holds the rules a controller/adapter must
// not: confirm + record the Purchase, promote the buyer to `founding`, and fire
// the `purchase_completed` funnel event, in that order.
import type {
  Purchase,
  PurchaseRepository,
  SubscriberRepository,
  AnalyticsClient,
} from "@/types";

export class PurchaseService {
  constructor(
    private readonly purchases: PurchaseRepository,
    private readonly subscribers: SubscriberRepository,
    private readonly analytics: AnalyticsClient,
  ) {}

  /**
   * Record a completed purchase. `record` confirms the order against Lemon (the
   * MoR + system of record) and returns the canonical `Purchase`; we then tag the
   * buyer `founding` (email-based access, no accounts — ADR-0004) and fire
   * `purchase_completed`.
   */
  async recordPurchase(purchase: Purchase): Promise<void> {
    const recorded = await this.purchases.record(purchase);
    await this.subscribers.addTag(recorded.email, "founding");
    await this.analytics.track("purchase_completed", {
      orderId: recorded.id,
      email: recorded.email,
      offerId: recorded.offerId,
      amountCents: recorded.amountCents,
      currency: recorded.currency,
    });
  }
}
