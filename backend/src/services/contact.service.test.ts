import { describe, it, expect, vi, beforeEach } from 'vitest';
import { contactService } from './contact.service';
import { emailService } from './email.service';

vi.mock('./email.service', () => ({
  emailService: {
    sendEmail: vi.fn(),
  },
}));

describe('contactService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const validRequest = {
    recipientType: 'BEAVERS' as const,
    senderEmail: 'sender@example.com',
    body: 'Test message body',
    sendCopy: false,
  };

  describe('contact', () => {
    describe('successful email sending', () => {
      it('should send email to correct recipients for BEAVERS', async () => {
        vi.mocked(emailService.sendEmail).mockResolvedValue({ success: true });

        const result = await contactService.contact(validRequest);

        expect(result).toEqual({ success: true });
        expect(emailService.sendEmail).toHaveBeenCalledWith({
          from: 'sender@example.com',
          to: ['beavers@478.com', 'general@478.com'],
          subject: 'Contact Form Submission - BEAVERS',
          body: 'Test message body',
        });
      });

      it('should send email to correct recipients for CUBS', async () => {
        vi.mocked(emailService.sendEmail).mockResolvedValue({ success: true });

        const result = await contactService.contact({
          ...validRequest,
          recipientType: 'CUBS',
        });

        expect(result).toEqual({ success: true });
        expect(emailService.sendEmail).toHaveBeenCalledWith({
          from: 'sender@example.com',
          to: ['cubs@478.com', 'general@478.com'],
          subject: 'Contact Form Submission - CUBS',
          body: 'Test message body',
        });
      });

      it('should send email to correct recipients for SCOUTS', async () => {
        vi.mocked(emailService.sendEmail).mockResolvedValue({ success: true });

        const result = await contactService.contact({
          ...validRequest,
          recipientType: 'SCOUTS',
        });

        expect(result).toEqual({ success: true });
        expect(emailService.sendEmail).toHaveBeenCalledWith({
          from: 'sender@example.com',
          to: ['scouts@478.com', 'general@478.com'],
          subject: 'Contact Form Submission - SCOUTS',
          body: 'Test message body',
        });
      });

      it('should send email to correct recipients for VOLUNTEER', async () => {
        vi.mocked(emailService.sendEmail).mockResolvedValue({ success: true });

        const result = await contactService.contact({
          ...validRequest,
          recipientType: 'VOLUNTEER',
        });

        expect(result).toEqual({ success: true });
        expect(emailService.sendEmail).toHaveBeenCalledWith({
          from: 'sender@example.com',
          to: ['general@478.com'],
          subject: 'Contact Form Submission - VOLUNTEER',
          body: 'Test message body',
        });
      });

      it('should send email to correct recipients for GENERAL', async () => {
        vi.mocked(emailService.sendEmail).mockResolvedValue({ success: true });

        const result = await contactService.contact({
          ...validRequest,
          recipientType: 'GENERAL',
        });

        expect(result).toEqual({ success: true });
        expect(emailService.sendEmail).toHaveBeenCalledWith({
          from: 'sender@example.com',
          to: ['general@478.com'],
          subject: 'Contact Form Submission - GENERAL',
          body: 'Test message body',
        });
      });
    });

    describe('sendCopy functionality', () => {
      it('should send copy to sender when sendCopy is true', async () => {
        vi.mocked(emailService.sendEmail).mockResolvedValue({ success: true });

        const result = await contactService.contact({
          ...validRequest,
          sendCopy: true,
        });

        expect(result).toEqual({ success: true });
        expect(emailService.sendEmail).toHaveBeenCalledTimes(2);

        // First call: main email
        expect(emailService.sendEmail).toHaveBeenNthCalledWith(1, {
          from: 'sender@example.com',
          to: ['beavers@478.com', 'general@478.com'],
          subject: 'Contact Form Submission - BEAVERS',
          body: 'Test message body',
        });

        // Second call: copy to sender
        expect(emailService.sendEmail).toHaveBeenNthCalledWith(2, {
          from: 'sender@example.com',
          to: ['sender@example.com'],
          subject: 'Copy: Contact Form Submission - BEAVERS',
          body: 'Test message body',
        });
      });

      it('should not send copy when sendCopy is false', async () => {
        vi.mocked(emailService.sendEmail).mockResolvedValue({ success: true });

        const result = await contactService.contact({
          ...validRequest,
          sendCopy: false,
        });

        expect(result).toEqual({ success: true });
        expect(emailService.sendEmail).toHaveBeenCalledTimes(1);
      });

      it('should still return success if main email succeeds but copy fails', async () => {
        vi.mocked(emailService.sendEmail)
          .mockResolvedValueOnce({ success: true }) // main email succeeds
          .mockResolvedValueOnce({ success: false, error: 'Copy failed' }); // copy fails

        const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {
        });

        const result = await contactService.contact({
          ...validRequest,
          sendCopy: true,
        });

        expect(result).toEqual({ success: true });
        expect(consoleSpy).toHaveBeenCalledWith(
          'Failed to send copy to sender@example.com: Copy failed',
        );

        consoleSpy.mockRestore();
      });
    });

    describe('error handling', () => {
      it('should return error when email service fails', async () => {
        vi.mocked(emailService.sendEmail).mockResolvedValue({
          success: false,
          error: 'SMTP connection failed',
        });

        const result = await contactService.contact(validRequest);

        expect(result).toEqual({
          success: false,
          error: 'SMTP connection failed',
        });
      });

      it('should not attempt to send copy if main email fails', async () => {
        vi.mocked(emailService.sendEmail).mockResolvedValue({
          success: false,
          error: 'SMTP connection failed',
        });

        const result = await contactService.contact({
          ...validRequest,
          sendCopy: true,
        });

        expect(result).toEqual({
          success: false,
          error: 'SMTP connection failed',
        });
        expect(emailService.sendEmail).toHaveBeenCalledTimes(1);
      });

      it('should return error for invalid recipient type', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {
        });

        const result = await contactService.contact({
          ...validRequest,
          // @ts-expect-error - testing invalid input
          recipientType: 'INVALID',
        });

        expect(result).toEqual({
          success: false,
          error: 'Invalid recipient type: INVALID',
        });
        expect(emailService.sendEmail).not.toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledWith('Invalid recipient type: INVALID');

        consoleSpy.mockRestore();
      });
    });

    describe('email content', () => {
      it('should include sender email in from field', async () => {
        vi.mocked(emailService.sendEmail).mockResolvedValue({ success: true });

        await contactService.contact({
          ...validRequest,
          senderEmail: 'custom@sender.com',
        });

        expect(emailService.sendEmail).toHaveBeenCalledWith(
          expect.objectContaining({
            from: 'custom@sender.com',
          }),
        );
      });

      it('should include message body in email body', async () => {
        vi.mocked(emailService.sendEmail).mockResolvedValue({ success: true });

        await contactService.contact({
          ...validRequest,
          body: 'Custom message content',
        });

        expect(emailService.sendEmail).toHaveBeenCalledWith(
          expect.objectContaining({
            body: 'Custom message content',
          }),
        );
      });

      it('should include recipient type in subject', async () => {
        vi.mocked(emailService.sendEmail).mockResolvedValue({ success: true });

        await contactService.contact({
          ...validRequest,
          recipientType: 'SCOUTS',
        });

        expect(emailService.sendEmail).toHaveBeenCalledWith(
          expect.objectContaining({
            subject: 'Contact Form Submission - SCOUTS',
          }),
        );
      });
    });
  });
});
