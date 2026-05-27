// Typed, LAZY env loader (the build-without-keys guarantee — SPEC "Locked
// decisions" §5). `process.env.*` is read and Zod-validated INSIDE `getEnv()`,
// memoized after the first successful parse. Nothing here validates at module
// eval / import, so `pnpm build`, `tsc`, and `lint` never require a real key — a
// missing key fails at REQUEST time with a clear, value-free error.
//
// Adapters/factories must call `getEnv()` from within a request handler only;
// importing an adapter module never touches a key.
import { z } from 'zod';

// Defining the schema does NOT read process.env — validation happens in getEnv().
const envSchema = z.object({
  // Loops (email list) — LoopsAdapter / SubscriberRepository. The ONLY key the
  // waitlist launch needs (see Deck-n87).
  LOOPS_API_KEY: z.string().min(1),
  // Payments + analytics are OFF for the waitlist launch (no live checkout, no
  // funnel events). Kept in the schema but OPTIONAL with an empty-string default
  // so the app runs on the Loops key alone AND the inferred types stay `string`
  // (the webhook HMAC needs a real string). Fill these in — and re-wire the CTAs
  // to a real checkout — to turn Lemon/Amplitude back on.
  LEMONSQUEEZY_API_KEY: z.string().default(''),
  LEMONSQUEEZY_STORE_ID: z.string().default(''),
  LEMONSQUEEZY_VARIANT_ID: z.string().default(''), // the founding-price variant
  LEMONSQUEEZY_WEBHOOK_SECRET: z.string().default(''),
  AMPLITUDE_API_KEY: z.string().default(''),
});

export type Env = z.infer<typeof envSchema>;

let cached: Env | null = null;

/**
 * Returns the validated server environment. Reads `process.env` and validates
 * lazily on first call, then memoizes. Throws a clear error (naming only the
 * missing/invalid keys — never their values) if validation fails.
 */
export function getEnv(): Env {
  if (cached) return cached;

  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const keys = parsed.error.issues
      .map((issue) => issue.path.join('.'))
      .filter(Boolean)
      .join(', ');
    throw new Error(
      `Missing or invalid environment variables: ${keys}. ` +
        `See .env.example for the required keys.`,
    );
  }

  cached = parsed.data;
  return cached;
}
