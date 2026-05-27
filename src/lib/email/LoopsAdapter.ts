// LoopsAdapter — implements SubscriberRepository against the Loops API
// (https://loops.so/docs/api-reference). Thin fetch-based adapter (no SDK).
// Config is pulled from `getEnv()` at CALL time so importing this module never
// touches a key (SPEC "Locked decisions" §5). Loops is the system of record for
// subscribers; we model our domain `SubscriberTag`s as boolean contact
// properties (`lead`, `founding`) — the common Loops segmentation pattern.
import type { Subscriber, SubscriberRepository, SubscriberTag } from '@/types';
import { getEnv } from '@/lib/env';

const LOOPS_BASE_URL = 'https://app.loops.so/api/v1';

// Shape of a Loops contact (the fields we read). Loops returns custom properties
// flattened alongside the standard ones.
type LoopsContact = {
  email: string;
  createdAt?: string;
  lead?: boolean;
  founding?: boolean;
  [key: string]: unknown;
};

export class LoopsAdapter implements SubscriberRepository {
  private headers(): HeadersInit {
    const { LOOPS_API_KEY } = getEnv();
    return {
      Authorization: `Bearer ${LOOPS_API_KEY}`,
      'Content-Type': 'application/json',
    };
  }

  async findByEmail(email: string): Promise<Subscriber | null> {
    const url = `${LOOPS_BASE_URL}/contacts/find?email=${encodeURIComponent(email)}`;
    const res = await fetch(url, { headers: this.headers() });
    if (!res.ok) {
      throw new Error(`Loops findByEmail failed (${res.status})`);
    }
    const contacts = (await res.json()) as LoopsContact[];
    const contact = contacts[0];
    return contact ? toSubscriber(contact) : null;
  }

  async upsert(subscriber: Subscriber): Promise<Subscriber> {
    // PUT /contacts/update upserts: creates the contact if absent, else updates.
    const body: Record<string, unknown> = { email: subscriber.email };
    for (const tag of subscriber.tags) body[tag] = true;

    const res = await fetch(`${LOOPS_BASE_URL}/contacts/update`, {
      method: 'PUT',
      headers: this.headers(),
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(`Loops upsert failed (${res.status})`);
    }
    return subscriber;
  }

  async addTag(email: string, tag: SubscriberTag): Promise<void> {
    const res = await fetch(`${LOOPS_BASE_URL}/contacts/update`, {
      method: 'PUT',
      headers: this.headers(),
      body: JSON.stringify({ email, [tag]: true }),
    });
    if (!res.ok) {
      throw new Error(`Loops addTag failed (${res.status})`);
    }
  }
}

function toSubscriber(contact: LoopsContact): Subscriber {
  const tags: SubscriberTag[] = [];
  if (contact.lead) tags.push('lead');
  if (contact.founding) tags.push('founding');
  return {
    email: contact.email,
    tags,
    createdAt: contact.createdAt ?? new Date().toISOString(),
  };
}
