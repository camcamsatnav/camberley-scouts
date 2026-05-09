interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

const WINDOW_MS = 15 * 60 * 1000;
const LIMIT = 3;
const buckets = new Map<string, { count: number; resetAt: number }>();

const getClientKey = (request: Request) => {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
};

export const checkEmailRateLimit = (request: Request): RateLimitResult => {
  const now = Date.now();
  const key = getClientKey(request);
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + WINDOW_MS;
    buckets.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: LIMIT - 1, resetAt };
  }

  if (existing.count >= LIMIT) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: LIMIT - existing.count,
    resetAt: existing.resetAt,
  };
};

export const rateLimitHeaders = ({ remaining, resetAt }: RateLimitResult) => {
  return {
    'RateLimit-Limit': String(LIMIT),
    'RateLimit-Remaining': String(remaining),
    'RateLimit-Reset': String(Math.ceil(resetAt / 1000)),
  };
};

export const resetEmailRateLimit = () => {
  buckets.clear();
};
