// POST /api/checkout — the money path's first step (SPEC §4.2): create a
// Lemon-hosted checkout at the FOUNDING price (the paid hero, read from
// offers.ts) via LemonSqueezyAdapter, fire the `checkout_started` funnel event,
// and return the hosted-checkout `{ url }` the buy CTA redirects to.
//
// Per the no-pass-through rule (ADR-0002) there is NO checkout controller/service
// — that would only forward to `createCheckout`; the route orchestrates the
// adapter + analytics directly. Adapters are built via their factories HERE so
// `getEnv()` is only called at request time and the build stays green without
// keys (SPEC "Locked decisions" §5). Node runtime: the adapters use `node:crypto`.
import { NextResponse } from "next/server";
import { createPaymentAdapter } from "@/lib/payments";
import { createAnalyticsClient } from "@/lib/analytics";
import { harnessStarterKit } from "@/content";

export const runtime = "nodejs";

export async function POST(): Promise<NextResponse> {
  try {
    const { url } = await createPaymentAdapter().createCheckout({
      offerId: harnessStarterKit.id,
    });

    // Funnel: a checkout was started at the Founding price (offers.ts). Best
    // effort — analytics must never block the money path / the redirect.
    await createAnalyticsClient()
      .track("checkout_started", {
        offerId: harnessStarterKit.id,
        amountCents: harnessStarterKit.priceCents,
      })
      .catch(() => undefined);

    return NextResponse.json({ url });
  } catch {
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 },
    );
  }
}
