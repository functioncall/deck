// Repository ports (ADR-0002). Interfaces only in L0 — services depend on these
// shapes; concrete adapters (e.g. LemonSqueezyAdapter, LoopsAdapter) land in L4.

import type { Subscriber, Purchase } from '@/types/entities';

export interface SubscriberRepository {
  findByEmail(email: string): Promise<Subscriber | null>;
  upsert(subscriber: Subscriber): Promise<Subscriber>;
  addTag(email: string, tag: Subscriber['tags'][number]): Promise<void>;
}

export interface PurchaseRepository {
  findById(id: string): Promise<Purchase | null>;
  record(purchase: Purchase): Promise<Purchase>;
}
