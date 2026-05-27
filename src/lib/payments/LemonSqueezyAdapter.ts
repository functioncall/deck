// LemonSqueezyAdapter — implements PurchaseRepository against the Lemon Squeezy
// API (https://docs.lemonsqueezy.com/api). Lemon is the Merchant of Record
// (ADR-0003): it is the legal seller and the system of record for orders, so the
// app never persists Purchases itself — it confirms them against Lemon. Thin
// fetch-based adapter (no SDK); config is pulled from `getEnv()` at CALL time so
// importing this module never touches a key (SPEC "Locked decisions" §5).
//
// Beyond the port, this adapter also creates Lemon-hosted checkouts and verifies
// inbound webhook signatures (used by /api/checkout and /api/webhook in epic-2).
import { createHmac, timingSafeEqual } from 'node:crypto';
import type { Purchase, PurchaseRepository } from '@/types';
import { getEnv } from '@/lib/env';

const LEMON_BASE_URL = 'https://api.lemonsqueezy.com/v1';
// Lemon Squeezy speaks JSON:API.
const JSON_API = 'application/vnd.api+json';

export type CreateCheckoutOptions = {
  email?: string;
  offerId: string;
};

// Minimal shape of a Lemon `orders` resource (the fields we map to Purchase).
type LemonOrder = {
  data?: {
    id: string;
    attributes: {
      user_email: string;
      total: number; // cents
      currency: string;
      created_at: string;
      first_order_item?: { product_name?: string };
    };
  };
};

export class LemonSqueezyAdapter implements PurchaseRepository {
  private headers(): HeadersInit {
    const { LEMONSQUEEZY_API_KEY } = getEnv();
    return {
      Authorization: `Bearer ${LEMONSQUEEZY_API_KEY}`,
      Accept: JSON_API,
      'Content-Type': JSON_API,
    };
  }

  async findById(id: string): Promise<Purchase | null> {
    const res = await fetch(`${LEMON_BASE_URL}/orders/${encodeURIComponent(id)}`, {
      headers: this.headers(),
    });
    if (res.status === 404) return null;
    if (!res.ok) {
      throw new Error(`Lemon findById failed (${res.status})`);
    }
    const order = (await res.json()) as LemonOrder;
    return order.data ? toPurchase(order, id) : null;
  }

  // Lemon (MoR) already persisted the order at payment time. "Recording" here
  // means confirming the order is real in Lemon — the system of record — and
  // returning the canonical Purchase. We refuse to record an order Lemon does
  // not know about (a defence even after the webhook signature check).
  async record(purchase: Purchase): Promise<Purchase> {
    const canonical = await this.findById(purchase.id);
    if (!canonical) {
      throw new Error(`Lemon order ${purchase.id} not found — refusing to record`);
    }
    return canonical;
  }

  // Creates a Lemon-hosted checkout at the founding-price variant from env.
  // Returns the hosted checkout URL the buyer is sent to.
  async createCheckout(opts: CreateCheckoutOptions): Promise<{ url: string }> {
    const { LEMONSQUEEZY_STORE_ID, LEMONSQUEEZY_VARIANT_ID } = getEnv();

    const body = {
      data: {
        type: 'checkouts',
        attributes: {
          checkout_data: {
            ...(opts.email ? { email: opts.email } : {}),
            custom: { offer_id: opts.offerId },
          },
        },
        relationships: {
          store: { data: { type: 'stores', id: LEMONSQUEEZY_STORE_ID } },
          variant: { data: { type: 'variants', id: LEMONSQUEEZY_VARIANT_ID } },
        },
      },
    };

    const res = await fetch(`${LEMON_BASE_URL}/checkouts`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(`Lemon createCheckout failed (${res.status})`);
    }
    const json = (await res.json()) as { data?: { attributes?: { url?: string } } };
    const url = json.data?.attributes?.url;
    if (!url) {
      throw new Error('Lemon createCheckout returned no checkout URL');
    }
    return { url };
  }

  // Verifies the `X-Signature` HMAC-SHA256 (hex) of the RAW request body against
  // the webhook secret. Must be called BEFORE parsing/recording anything — a
  // forged webhook must never reach the service layer. Constant-time compare.
  verifyWebhookSignature(rawBody: string, signature: string): boolean {
    const { LEMONSQUEEZY_WEBHOOK_SECRET } = getEnv();
    const expected = createHmac('sha256', LEMONSQUEEZY_WEBHOOK_SECRET)
      .update(rawBody, 'utf8')
      .digest();
    let provided: Buffer;
    try {
      provided = Buffer.from(signature, 'hex');
    } catch {
      return false;
    }
    if (provided.length !== expected.length) return false;
    return timingSafeEqual(provided, expected);
  }
}

function toPurchase(order: LemonOrder, id: string): Purchase {
  const attrs = order.data!.attributes;
  return {
    id: order.data!.id ?? id,
    email: attrs.user_email,
    offerId: 'harness-starter-kit',
    amountCents: attrs.total,
    currency: attrs.currency,
    createdAt: attrs.created_at,
  };
}
