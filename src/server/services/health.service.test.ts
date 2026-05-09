import { expect, it, vi } from 'vitest';
import { healthService } from './health.service';

it('returns an OK health status with the current timestamp', () => {
  const now = new Date('2026-05-09T12:00:00Z');
  vi.setSystemTime(now);

  const status = healthService.checkHealth();

  expect(status).toEqual({
    status: 'OK',
    timestamp: now,
  });

  vi.useRealTimers();
});
