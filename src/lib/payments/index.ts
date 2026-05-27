// Barrel: payments integration (Lemon Squeezy, MoR) behind PurchaseRepository
// (ADR-0002/0003).
import type { PurchaseRepository } from '@/types';
import { LemonSqueezyAdapter } from './LemonSqueezyAdapter';

export { LemonSqueezyAdapter } from './LemonSqueezyAdapter';
export type { CreateCheckoutOptions } from './LemonSqueezyAdapter';

// Factory: returns the concrete LemonSqueezyAdapter. The return type is the
// adapter itself (not just PurchaseRepository) because the money path also needs
// `createCheckout` + `verifyWebhookSignature`, which live on the adapter beyond
// the persistence port. The adapter reads config via getEnv() at call time.
export function createPurchaseRepository(): PurchaseRepository {
  return new LemonSqueezyAdapter();
}

export function createPaymentAdapter(): LemonSqueezyAdapter {
  return new LemonSqueezyAdapter();
}
