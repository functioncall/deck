// Repository ports (ADR-0002). Interfaces only in L0 — services depend on these
// shapes; concrete adapters (LoopsAdapter, LemonSqueezyAdapter, AmplitudeAdapter)
// land in L4.

import type { Subscriber, Purchase } from '@/types/entities';
import type { AnalyticsEvent, AnalyticsEventProps } from '@/lib/analytics/events';

export interface SubscriberRepository {
  findByEmail(email: string): Promise<Subscriber | null>;
  upsert(subscriber: Subscriber): Promise<Subscriber>;
  addTag(email: string, tag: Subscriber['tags'][number]): Promise<void>;
}

export interface PurchaseRepository {
  findById(id: string): Promise<Purchase | null>;
  record(purchase: Purchase): Promise<Purchase>;
}

// Product-analytics port (Amplitude in L4). Services fire funnel events through
// this interface; the AmplitudeAdapter does the I/O. Names live in
// `src/lib/analytics/events.ts` so the funnel is centralized + portable.
export interface AnalyticsClient {
  track(event: AnalyticsEvent, props?: AnalyticsEventProps): Promise<void>;
}
