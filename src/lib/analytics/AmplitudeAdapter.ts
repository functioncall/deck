// AmplitudeAdapter — implements AnalyticsClient against Amplitude's HTTP V2 API
// (https://amplitude.com/docs/apis/analytics/http-v2). Thin fetch-based adapter
// (no SDK); the API key is pulled from `getEnv()` at CALL time so importing this
// module never touches a key (SPEC "Locked decisions" §5).
//
// No accounts/auth (ADR-0004): funnel events have no logged-in user, so each
// event carries a `device_id` (callers may pass one in `props.device_id`,
// otherwise a per-call id is generated). The EU-consent note lives on /privacy.
import { randomUUID } from 'node:crypto';
import type { AnalyticsClient } from '@/types';
import type { AnalyticsEvent, AnalyticsEventProps } from './events';
import { getEnv } from '@/lib/env';

const AMPLITUDE_HTTP_API = 'https://api2.amplitude.com/2/httpapi';

export class AmplitudeAdapter implements AnalyticsClient {
  async track(event: AnalyticsEvent, props?: AnalyticsEventProps): Promise<void> {
    const { AMPLITUDE_API_KEY } = getEnv();

    const deviceId =
      typeof props?.device_id === 'string' ? props.device_id : randomUUID();

    const payload = {
      api_key: AMPLITUDE_API_KEY,
      events: [
        {
          event_type: event,
          device_id: deviceId,
          time: Date.now(),
          event_properties: props ?? {},
        },
      ],
    };

    const res = await fetch(AMPLITUDE_HTTP_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error(`Amplitude track failed (${res.status})`);
    }
  }
}
