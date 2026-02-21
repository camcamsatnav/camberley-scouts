import { describe, it, expect, vi, beforeEach } from 'vitest';
import { emailService } from './email.service';
import { transporter } from '../config/email.config';

vi.mock('../config/email.config', () => ({
  transporter: {
    sendMail: vi.fn(),
  },
}));

describe('emailService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const validEmailData = {
    from: { name: 'Sender Name', address: 'sender@example.com' },
    to: ['recipient@example.com'],
    subject: 'Test Subject',
    body: '<p>Test body content</p>',
  };

  describe('sendEmail', () => {
    describe('successful email sending', () => {
      it('should return success when email is sent', async () => {
        vi.mocked(transporter.sendMail).mockResolvedValue({} as never);

        const result = await emailService.sendEmail(validEmailData);

        expect(result).toEqual({ success: true });
      });

      it('should call transporter.sendMail with correct parameters', async () => {
        vi.mocked(transporter.sendMail).mockResolvedValue({} as never);

        await emailService.sendEmail(validEmailData);

        expect(transporter.sendMail).toHaveBeenCalledWith({
          from: { name: 'Sender Name', address: 'sender@example.com' },
          to: ['recipient@example.com'],
          subject: 'Test Subject',
          html: '<p>Test body content</p>',
          replyTo: undefined,
        });
      });

      it('should send to multiple recipients', async () => {
        vi.mocked(transporter.sendMail).mockResolvedValue({} as never);

        const multiRecipientData = {
          ...validEmailData,
          to: ['recipient1@example.com', 'recipient2@example.com', 'recipient3@example.com'],
        };

        const result = await emailService.sendEmail(multiRecipientData);

        expect(result).toEqual({ success: true });
        expect(transporter.sendMail).toHaveBeenCalledWith(
          expect.objectContaining({
            to: ['recipient1@example.com', 'recipient2@example.com', 'recipient3@example.com'],
          }),
        );
      });

      it('should include replyTo header when provided', async () => {
        vi.mocked(transporter.sendMail).mockResolvedValue({} as never);

        const dataWithReplyTo = {
          ...validEmailData,
          replyTo: 'replyto@example.com',
        };

        const result = await emailService.sendEmail(dataWithReplyTo);

        expect(result).toEqual({ success: true });
        expect(transporter.sendMail).toHaveBeenCalledWith(
          expect.objectContaining({
            replyTo: 'replyto@example.com',
          }),
        );
      });

      it('should log debug message on success', async () => {
        vi.mocked(transporter.sendMail).mockResolvedValue({} as never);
        const consoleSpy = vi.spyOn(console, 'debug').mockImplementation(() => {
        });

        await emailService.sendEmail(validEmailData);

        expect(consoleSpy).toHaveBeenCalledWith(
          'Email sent to recipient@example.com with subject "Test Subject"',
        );

        consoleSpy.mockRestore();
      });
    });

    describe('error handling', () => {
      it('should return error when transporter throws an Error', async () => {
        vi.mocked(transporter.sendMail).mockRejectedValue(new Error('SMTP connection failed'));

        const result = await emailService.sendEmail(validEmailData);

        expect(result).toEqual({
          success: false,
          error: 'SMTP connection failed',
        });
      });

      it('should return generic error message when transporter throws non-Error', async () => {
        vi.mocked(transporter.sendMail).mockRejectedValue('Unknown error');

        const result = await emailService.sendEmail(validEmailData);

        expect(result).toEqual({
          success: false,
          error: 'Failed to send email',
        });
      });

      it('should log error when sending fails', async () => {
        const error = new Error('SMTP connection failed');
        vi.mocked(transporter.sendMail).mockRejectedValue(error);
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {
        });

        await emailService.sendEmail(validEmailData);

        expect(consoleSpy).toHaveBeenCalledWith('Error sending email:', error);

        consoleSpy.mockRestore();
      });

      it('should handle authentication errors', async () => {
        vi.mocked(transporter.sendMail).mockRejectedValue(
          new Error('Invalid login: 535 Authentication failed'),
        );

        const result = await emailService.sendEmail(validEmailData);

        expect(result).toEqual({
          success: false,
          error: 'Invalid login: 535 Authentication failed',
        });
      });

      it('should handle network timeout errors', async () => {
        vi.mocked(transporter.sendMail).mockRejectedValue(
          new Error('Connection timeout'),
        );

        const result = await emailService.sendEmail(validEmailData);

        expect(result).toEqual({
          success: false,
          error: 'Connection timeout',
        });
      });
    });

    describe('email content', () => {
      it('should pass HTML content as html field', async () => {
        vi.mocked(transporter.sendMail).mockResolvedValue({} as never);

        const htmlContent = '<h1>Welcome</h1><p>This is a <strong>test</strong> email.</p>';
        await emailService.sendEmail({
          ...validEmailData,
          body: htmlContent,
        });

        expect(transporter.sendMail).toHaveBeenCalledWith(
          expect.objectContaining({
            html: htmlContent,
          }),
        );
      });

      it('should handle empty body', async () => {
        vi.mocked(transporter.sendMail).mockResolvedValue({} as never);

        const result = await emailService.sendEmail({
          ...validEmailData,
          body: '',
        });

        expect(result).toEqual({ success: true });
        expect(transporter.sendMail).toHaveBeenCalledWith(
          expect.objectContaining({
            html: '',
          }),
        );
      });

      it('should handle special characters in subject', async () => {
        vi.mocked(transporter.sendMail).mockResolvedValue({} as never);

        const specialSubject = 'Test: Special chars & symbols <>"\'';
        await emailService.sendEmail({
          ...validEmailData,
          subject: specialSubject,
        });

        expect(transporter.sendMail).toHaveBeenCalledWith(
          expect.objectContaining({
            subject: specialSubject,
          }),
        );
      });
    });
  });
});
