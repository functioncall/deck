// POST /api/webhook — the Lemon Squeezy webhook (SPEC §4.2). On payment Lemon
// POSTs the order here. SECURITY-CRITICAL ordering (SPEC risk register):
//
//   1. Read the RAW body via `req.text()` — NOT `req.json()` — for the HMAC.
//   2. Verify the Lemon `X-Signature` on that raw body BEFORE any other work.
//   3. Reject (401) a missing/invalid signature so a forged webhook NEVER
//      reaches the controller/service layer.
//   4. Only then: PurchaseController (validate + shape) → PurchaseService
//      (record Purchase → tag `founding` → fire `purchase_completed`).
//
// Adapters are built via their factories HERE so `getEnv()` runs only at request
// time and the build stays green without keys. Node runtime: HMAC via node:crypto.
import { NextResponse } from "next/server";
import { PurchaseController } from "@/server/controllers";
import { PurchaseService } from "@/server/services";
import { createPaymentAdapter, createPurchaseRepository } from "@/lib/payments";
import { createSubscriberRepository } from "@/lib/email";
import { createAnalyticsClient } from "@/lib/analytics";

export const runtime = "nodejs";

// Lemon signs the webhook with an HMAC-SHA256 (hex) of the raw body in this header.
const SIGNATURE_HEADER = "x-signature";

export async function POST(request: Request): Promise<NextResponse> {
  const rawBody = await request.text();
  const signature = request.headers.get(SIGNATURE_HEADER) ?? "";

  // Verify FIRST, on the raw body, before any controller/service side effect.
  const payments = createPaymentAdapter();
  if (!signature || !payments.verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json(
      { ok: false, error: "Invalid signature." },
      { status: 401 },
    );
  }

  const controller = new PurchaseController(
    new PurchaseService(
      createPurchaseRepository(),
      createSubscriberRepository(),
      createAnalyticsClient(),
    ),
  );

  const result = await controller.handleWebhook(rawBody);
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
