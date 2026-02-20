import { describe, it, expect } from 'vitest';
import { healthService } from './health.service';

describe('healthService', () => {
  describe('checkHealth', () => {
    it('should return OK status', () => {
      const result = healthService.checkHealth();

      expect(result.status).toBe('OK');
    });

    it('should return a valid timestamp', () => {
      const before = new Date();
      const result = healthService.checkHealth();
      const after = new Date();

      expect(result.timestamp).toBeInstanceOf(Date);
      expect(result.timestamp.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(result.timestamp.getTime()).toBeLessThanOrEqual(after.getTime());
    });
  });
});
