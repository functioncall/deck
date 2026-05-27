// The funnel event names (SPEC §4). These are the ONLY events the app emits;
// every analytics call goes through the `AnalyticsClient` port (no raw provider
// calls scattered in components) so the funnel stays portable + EU-consent-able.
export type AnalyticsEvent =
  | 'deck_slide_viewed'
  | 'deck_completed'
  | 'email_signup'
  | 'checkout_started'
  | 'purchase_completed';

// Free-form per-event properties. Kept open (Record<string, unknown>) because the
// payload differs per event (e.g. a slide index, an offerId, an order id); the
// port validates the event *name*, not the shape of its props.
export type AnalyticsEventProps = Record<string, unknown>;
