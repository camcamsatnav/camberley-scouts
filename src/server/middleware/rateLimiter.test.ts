import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  checkEmailRateLimit,
  rateLimitHeaders,
  resetEmailRateLimit,
} from './rateLimiter';

const requestForIp = (ip: string) =>
  new Request('http://localhost/api/v1/contact', {
    headers: { 'x-forwarded-for': ip },
  });

describe('email rate limiter', () => {
  afterEach(() => {
    vi.useRealTimers();
    resetEmailRateLimit();
  });

  it('allows three requests from the same client inside the window', () => {
    const request = requestForIp('192.0.2.10');

    expect(checkEmailRateLimit(request).allowed).toBe(true);
    expect(checkEmailRateLimit(request).allowed).toBe(true);
    expect(checkEmailRateLimit(request).allowed).toBe(true);
  });

  it('blocks the fourth request from the same client inside the window', () => {
    const request = requestForIp('192.0.2.20');

    checkEmailRateLimit(request);
    checkEmailRateLimit(request);
    checkEmailRateLimit(request);

    const result = checkEmailRateLimit(request);

    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it('returns standard rate limit headers', () => {
    vi.setSystemTime(new Date('2026-05-09T12:00:00Z'));

    const result = checkEmailRateLimit(requestForIp('192.0.2.30'));

    expect(rateLimitHeaders(result)).toMatchObject({
      'RateLimit-Limit': '3',
      'RateLimit-Remaining': '2',
    });
  });
});
