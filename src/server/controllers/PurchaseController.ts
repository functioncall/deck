// PurchaseController — the validate-and-shape boundary for the Lemon webhook
// (ADR-0002). The route verifies the Lemon signature on the RAW body FIRST and
// only then calls this controller, so it RELIES on that signature check and does
// not re-verify. Its job: parse + Zod-validate the webhook payload, map a
// completed order to a `Purchase`, and shape a plain result the route
// serializes. Business rules (record → tag → analytics) live in `PurchaseService`.
import { z } from "zod";
import type { PurchaseService } from "@/server/services";
import type { Purchase } from "@/types";
import { harnessStarterKit } from "@/content";

// The Lemon Squeezy webhook envelope (JSON:API) — only the fields we map to a
// `Purchase`. `meta.custom_data` echoes the `custom` we set at checkout creation.
const lemonWebhook = z.object({
  meta: z.object({
    event_name: z.string(),
    custom_data: z.object({ offer_id: z.string() }).partial().optional(),
  }),
  data: z.object({
    id: z.string(),
    attributes: z.object({
      user_email: z.string().email(),
      total: z.number(),
      currency: z.string(),
      created_at: z.string(),
    }),
  }),
});

export type WebhookResult = { ok: true } | { ok: false; error: string };

export class PurchaseController {
  constructor(private readonly service: PurchaseService) {}

  async handleWebhook(rawBody: string): Promise<WebhookResult> {
    let json: unknown;
    try {
      json = JSON.parse(rawBody);
    } catch {
      return { ok: false, error: "Malformed webhook payload." };
    }

    const parsed = lemonWebhook.safeParse(json);
    if (!parsed.success) {
      return { ok: false, error: "Unrecognized webhook payload." };
    }

    // We only record on a completed order; other Lemon events are acknowledged
    // (200) without side effects so Lemon does not retry them.
    if (parsed.data.meta.event_name !== "order_created") {
      return { ok: true };
    }

    const { data, meta } = parsed.data;
    const purchase: Purchase = {
      id: data.id,
      offerId: meta.custom_data?.offer_id ?? harnessStarterKit.id,
      email: data.attributes.user_email,
      amountCents: data.attributes.total,
      currency: data.attributes.currency,
      createdAt: data.attributes.created_at,
    };

    try {
      await this.service.recordPurchase(purchase);
      return { ok: true };
    } catch {
      return { ok: false, error: "Could not record purchase." };
    }
  }
}
