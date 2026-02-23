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
    vi.stubEnv('BEAVERS_EMAILS', 'beavers@test.com,general@test.com');
    vi.stubEnv('CUBS_EMAILS', 'cubs@test.com,general@test.com');
    vi.stubEnv('SCOUTS_EMAILS', 'scouts@test.com,general@test.com');
    vi.stubEnv('VOLUNTEER_EMAILS', 'general@test.com');
    vi.stubEnv('GENERAL_EMAILS', 'general@test.com');
    vi.stubEnv('SMTP_USER', 'noreply@scouts.test');
  });

  const validRequest = {
    recipientType: 'BEAVERS' as const,
    name: 'Jane Smith',
    senderEmail: 'sender@example.com',
    phone: '07700 900123',
    body: 'Test message body',
    sendCopy: false,
  };

  describe('contact', () => {
    describe('successful email sending', () => {
      it('should send email to correct recipients for BEAVERS', async () => {
        vi.mocked(emailService.sendEmail).mockResolvedValue({ success: true });

        const result = await contactService.contact(validRequest);

        expect(result).toEqual({ success: true });
        expect(emailService.sendEmail).toHaveBeenCalledWith(
          expect.objectContaining({
            from: { name: 'Camberley Scouts', address: 'noreply@scouts.test' },
            to: ['beavers@test.com', 'general@test.com'],
            subject: 'Contact Form Submission - BEAVERS',
            replyTo: 'sender@example.com',
          }),
        );
      });

      it('should send email to correct recipients for CUBS', async () => {
        vi.mocked(emailService.sendEmail).mockResolvedValue({ success: true });

        const result = await contactService.contact({
          ...validRequest,
          recipientType: 'CUBS',
        });

        expect(result).toEqual({ success: true });
        expect(emailService.sendEmail).toHaveBeenCalledWith(
          expect.objectContaining({
            from: { name: 'Camberley Scouts', address: 'noreply@scouts.test' },
            to: ['cubs@test.com', 'general@test.com'],
            subject: 'Contact Form Submission - CUBS',
            replyTo: 'sender@example.com',
          }),
        );
      });

      it('should send email to correct recipients for SCOUTS', async () => {
        vi.mocked(emailService.sendEmail).mockResolvedValue({ success: true });

        const result = await contactService.contact({
          ...validRequest,
          recipientType: 'SCOUTS',
        });

        expect(result).toEqual({ success: true });
        expect(emailService.sendEmail).toHaveBeenCalledWith(
          expect.objectContaining({
            from: { name: 'Camberley Scouts', address: 'noreply@scouts.test' },
            to: ['scouts@test.com', 'general@test.com'],
            subject: 'Contact Form Submission - SCOUTS',
            replyTo: 'sender@example.com',
          }),
        );
      });

      it('should send email to correct recipients for VOLUNTEER', async () => {
        vi.mocked(emailService.sendEmail).mockResolvedValue({ success: true });

        const result = await contactService.contact({
          ...validRequest,
          recipientType: 'VOLUNTEER',
        });

        expect(result).toEqual({ success: true });
        expect(emailService.sendEmail).toHaveBeenCalledWith(
          expect.objectContaining({
            from: { name: 'Camberley Scouts', address: 'noreply@scouts.test' },
            to: ['general@test.com'],
            subject: 'Contact Form Submission - VOLUNTEER',
            replyTo: 'sender@example.com',
          }),
        );
      });

      it('should send email to correct recipients for GENERAL', async () => {
        vi.mocked(emailService.sendEmail).mockResolvedValue({ success: true });

        const result = await contactService.contact({
          ...validRequest,
          recipientType: 'GENERAL',
        });

        expect(result).toEqual({ success: true });
        expect(emailService.sendEmail).toHaveBeenCalledWith(
          expect.objectContaining({
            from: { name: 'Camberley Scouts', address: 'noreply@scouts.test' },
            to: ['general@test.com'],
            subject: 'Contact Form Submission - GENERAL',
            replyTo: 'sender@example.com',
          }),
        );
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
        expect(emailService.sendEmail).toHaveBeenNthCalledWith(
          1,
          expect.objectContaining({
            from: { name: 'Camberley Scouts', address: 'noreply@scouts.test' },
            to: ['beavers@test.com', 'general@test.com'],
            subject: 'Contact Form Submission - BEAVERS',
            replyTo: 'sender@example.com',
          }),
        );

        // Second call: copy to sender
        expect(emailService.sendEmail).toHaveBeenNthCalledWith(2, {
          from: { name: 'Camberley Scouts', address: 'noreply@scouts.test' },
          to: ['sender@example.com'],
          subject: 'Copy: Contact Form Submission - BEAVERS',
          body: expect.stringContaining('This is a copy of the message you submitted via our contact form'),
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

      it('should return error for undefined recipients', async () => {
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
      it('should use SMTP_USER as from address and sender email as replyTo', async () => {
        vi.mocked(emailService.sendEmail).mockResolvedValue({ success: true });

        await contactService.contact({
          ...validRequest,
          senderEmail: 'custom@sender.com',
        });

        expect(emailService.sendEmail).toHaveBeenCalledWith(
          expect.objectContaining({
            from: { name: 'Camberley Scouts', address: 'noreply@scouts.test' },
            replyTo: 'custom@sender.com',
          }),
        );
      });

      it('should include name in email body', async () => {
        vi.mocked(emailService.sendEmail).mockResolvedValue({ success: true });

        await contactService.contact({ ...validRequest, name: 'Jane Smith' });

        expect(emailService.sendEmail).toHaveBeenCalledWith(
          expect.objectContaining({
            body: expect.stringContaining('Jane Smith'),
          }),
        );
      });

      it('should include sender email in email body', async () => {
        vi.mocked(emailService.sendEmail).mockResolvedValue({ success: true });

        await contactService.contact({ ...validRequest, senderEmail: 'jane@example.com' });

        expect(emailService.sendEmail).toHaveBeenCalledWith(
          expect.objectContaining({
            body: expect.stringContaining('jane@example.com'),
          }),
        );
      });

      it('should include phone in email body when provided', async () => {
        vi.mocked(emailService.sendEmail).mockResolvedValue({ success: true });

        await contactService.contact({ ...validRequest, phone: '07700 900123' });

        expect(emailService.sendEmail).toHaveBeenCalledWith(
          expect.objectContaining({
            body: expect.stringContaining('07700 900123'),
          }),
        );
      });

      it('should not include phone in email body when not provided', async () => {
        vi.mocked(emailService.sendEmail).mockResolvedValue({ success: true });

        await contactService.contact({ ...validRequest, phone: undefined });

        expect(emailService.sendEmail).toHaveBeenCalledWith(
          expect.objectContaining({
            body: expect.not.stringContaining('Phone'),
          }),
        );
      });

      it('should include message body in email body', async () => {
        vi.mocked(emailService.sendEmail).mockResolvedValue({ success: true });

        await contactService.contact({ ...validRequest, body: 'Custom message content' });

        expect(emailService.sendEmail).toHaveBeenCalledWith(
          expect.objectContaining({
            body: expect.stringContaining('Custom message content'),
          }),
        );
      });

      it('should include recipient type in subject', async () => {
        vi.mocked(emailService.sendEmail).mockResolvedValue({ success: true });

        await contactService.contact({ ...validRequest, recipientType: 'SCOUTS' });

        expect(emailService.sendEmail).toHaveBeenCalledWith(
          expect.objectContaining({
            subject: 'Contact Form Submission - SCOUTS',
          }),
        );
      });
    });
  });
});
