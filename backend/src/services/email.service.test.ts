import { describe, it, expect } from 'vitest';
import { emailService } from './email.service';

describe('emailService', () => {
  describe('sendEmail', () => {
    it('should return success when sending email', async () => {
      const emailData = {
        to: 'test@example.com',
        subject: 'Test Subject',
        body: 'Test body content',
      };

      const result = await emailService.sendEmail(emailData);

      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should handle empty email data', async () => {
      const result = await emailService.sendEmail({});

      expect(result.success).toBe(true);
    });
  });
});

