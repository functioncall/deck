// SubscribeController — the validate-and-shape boundary for POST /api/subscribe
// (ADR-0002). Zod-validates the request input ({ email }) and shapes a plain
// result the route serializes; it holds NO business logic (that is
// `SubscribeService`). Errors — bad input or a downstream failure — are shaped
// into `{ ok: false, error }` so the route never leaks an exception or a secret.
import { z } from 'zod';
import type { SubscribeService } from '@/server/services';

const subscribeInput = z.object({
  email: z.string().trim().email(),
});

export type SubscribeResult = { ok: true } | { ok: false; error: string };

export class SubscribeController {
  constructor(private readonly service: SubscribeService) {}

  async handle(input: unknown): Promise<SubscribeResult> {
    const parsed = subscribeInput.safeParse(input);
    if (!parsed.success) {
      return { ok: false, error: 'Enter a valid email address.' };
    }

    try {
      await this.service.subscribe(parsed.data.email);
      return { ok: true };
    } catch {
      return { ok: false, error: 'Could not complete signup. Please try again.' };
    }
  }
}
