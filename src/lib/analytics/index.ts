// Barrel: analytics integration (Amplitude) behind the AnalyticsClient port
// (ADR-0002).
import type { AnalyticsClient } from '@/types';
import { AmplitudeAdapter } from './AmplitudeAdapter';

export { AmplitudeAdapter } from './AmplitudeAdapter';
export type { AnalyticsEvent, AnalyticsEventProps } from './events';

// Factory: returns the AnalyticsClient port. The adapter reads config via
// getEnv() at call time, so constructing it here touches no keys.
export function createAnalyticsClient(): AnalyticsClient {
  return new AmplitudeAdapter();
}
