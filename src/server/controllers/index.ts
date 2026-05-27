// Barrel: controllers (Zod-validated entry points for api/ routes). Layering:
// route → controller → service (ADR-0002).
export { SubscribeController } from './SubscribeController';
export type { SubscribeResult } from './SubscribeController';
export { PurchaseController } from './PurchaseController';
export type { WebhookResult } from './PurchaseController';
