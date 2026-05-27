// POST /api/subscribe — the email-capture flow (SPEC §4.1):
// route → SubscribeController (validate + shape) → SubscribeService (rules) →
// LoopsAdapter (SubscriberRepository) + AmplitudeAdapter (AnalyticsClient).
//
// Adapters are constructed via their factories HERE, inside the handler, so
// `getEnv()` is only ever called at request time — importing this module touches
// no keys and the build stays green without them (SPEC "Locked decisions" §5).
// Node runtime: the AmplitudeAdapter uses `node:crypto`.
import { NextResponse } from 'next/server';
import { SubscribeController } from '@/server/controllers';
import { SubscribeService } from '@/server/services';
import { createSubscriberRepository } from '@/lib/email';
import { createAnalyticsClient } from '@/lib/analytics';

export const runtime = 'nodejs';

export async function POST(request: Request): Promise<NextResponse> {
  const input = await request.json().catch(() => null);

  const controller = new SubscribeController(
    new SubscribeService(createSubscriberRepository(), createAnalyticsClient()),
  );

  const result = await controller.handle(input);
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
