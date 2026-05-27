// SubscribeService — the email-capture business rules (SPEC §4.1). Depends on the
// repository INTERFACES (`SubscriberRepository`, `AnalyticsClient`), never on a
// concrete adapter (ADR-0002) — the route injects the adapters via their
// factories. Holds the rules a controller/adapter must not: dedupe, the lead-tag
// step, and firing the `email_signup` funnel event in order.
import type { Subscriber, SubscriberRepository, AnalyticsClient } from '@/types';

export class SubscribeService {
  constructor(
    private readonly subscribers: SubscriberRepository,
    private readonly analytics: AnalyticsClient,
  ) {}

  /**
   * Capture an email as a "lead". Dedupes via `findByEmail`: an existing lead is a
   * no-op (no double upsert / double funnel event). Otherwise upserts the contact
   * (preserving any existing tags), applies the `lead` tag, and fires
   * `email_signup`.
   */
  async subscribe(email: string): Promise<void> {
    const existing = await this.subscribers.findByEmail(email);
    if (existing?.tags.includes('lead')) return;

    const subscriber: Subscriber = existing ?? {
      email,
      tags: [],
      createdAt: new Date().toISOString(),
    };

    await this.subscribers.upsert(subscriber);
    await this.subscribers.addTag(email, 'lead');
    await this.analytics.track('email_signup', { email });
  }
}
