// Barrel: email integration (Loops) behind SubscriberRepository (ADR-0002).
import type { SubscriberRepository } from '@/types';
import { LoopsAdapter } from './LoopsAdapter';

export { LoopsAdapter } from './LoopsAdapter';

// Factory: returns the SubscriberRepository port (services depend on the
// interface, never on the concrete adapter). The adapter reads config via
// getEnv() at call time, so constructing it here touches no keys.
export function createSubscriberRepository(): SubscriberRepository {
  return new LoopsAdapter();
}
