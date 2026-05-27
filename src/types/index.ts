// Barrel: import domain types/ports via `@/types`.
export type { Subscriber, SubscriberTag, Purchase, Offer } from './entities';
export type {
  SubscriberRepository,
  PurchaseRepository,
  AnalyticsClient,
} from './repositories';
