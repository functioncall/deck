// Barrel: analytics integration (Amplitude) behind the AnalyticsClient port
// (ADR-0002).
import type { AnalyticsClient } from '@/types';
import { AmplitudeAdapter } from './AmplitudeAdapter';

export { AmplitudeAdapter } from './AmplitudeAdapter';
export type { AnalyticsEvent, AnalyticsEventProps } from './events';
export {
  analyticsAllowed,
  getConsent,
  setConsent,
  CONSENT_STORAGE_KEY,
  CONSENT_CHANGED_EVENT,
} from './consent';
export type { ConsentChoice } from './consent';

// Factory: returns the AnalyticsClient port. The adapter reads config via
// getEnv() at call time, so constructing it here touches no keys.
export function createAnalyticsClient(): AnalyticsClient {
  return new AmplitudeAdapter();
}
