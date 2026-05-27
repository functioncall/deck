// POST /api/track — the server relay for the browser-side deck funnel events
// (SPEC §4: `deck_slide_viewed`, `deck_completed`). The deck player runs in the
// browser; this route funnels its events through the SAME `AnalyticsClient` port
// (`AmplitudeAdapter`) server-side, so no Amplitude key is ever exposed to the
// client and the no-keys-at-build guarantee holds (the adapter reads `getEnv()`
// at request time).
//
// Only the two CLIENT-originating deck events are accepted: the money/email
// events (`checkout_started`, `email_signup`, `purchase_completed`) are
// server-authoritative and fire from their own flows — they must not be forgeable
// from the browser. Per the no-pass-through rule (ADR-0002) there is no
// controller/service here: the route does a real job (allowlist-validate + funnel)
// and orchestrates the adapter directly, like /api/checkout. Best-effort: a track
// failure never surfaces to the player.
import { NextResponse } from "next/server";
import { z } from "zod";
import { createAnalyticsClient } from "@/lib/analytics";

export const runtime = "nodejs";

const trackInput = z.object({
  event: z.enum(["deck_slide_viewed", "deck_completed"]),
  props: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(request: Request): Promise<NextResponse> {
  const parsed = trackInput.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  await createAnalyticsClient()
    .track(parsed.data.event, parsed.data.props)
    .catch(() => undefined);

  return NextResponse.json({ ok: true });
}
