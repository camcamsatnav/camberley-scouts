import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  RecipientTypes,
  type ValidatedEmailRequest,
} from '../validators/email.validator';
import { contactService } from './contact.service';
import { emailService } from './email.service';

const request: ValidatedEmailRequest = {
  recipientType: RecipientTypes.BEAVERS,
  name: '<Jane>',
  senderEmail: 'jane@example.com',
  phone: '07700 900123',
  body: '<script>alert("x")</script>Hello\nthere',
  sendCopy: false,
};

describe('contactService', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it('sends a sanitized email to the configured recipient group', async () => {
    vi.stubEnv('BEAVERS_EMAILS', 'beavers@example.com,leader@example.com');
    vi.stubEnv('SMTP_USER', 'noreply@example.com');
    const sendEmail = vi
      .spyOn(emailService, 'sendEmail')
      .mockResolvedValue({ success: true });

    const result = await contactService.contact(request);

    expect(result).toEqual({ success: true });
    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: { name: 'Camberley Scouts', address: 'noreply@example.com' },
        to: ['beavers@example.com', 'leader@example.com'],
        subject: 'Contact Form Submission - BEAVERS',
        replyTo: 'jane@example.com',
      }),
    );
    expect(sendEmail.mock.calls[0]?.[0].body).not.toContain('<Jane>');
    expect(sendEmail.mock.calls[0]?.[0].body).not.toContain('<script>');
  });

  it('sends a copy to the sender when requested', async () => {
    vi.stubEnv('BEAVERS_EMAILS', 'beavers@example.com');
    const sendEmail = vi
      .spyOn(emailService, 'sendEmail')
      .mockResolvedValue({ success: true });

    const result = await contactService.contact({ ...request, sendCopy: true });

    expect(result).toEqual({ success: true });
    expect(sendEmail).toHaveBeenCalledTimes(2);
    expect(sendEmail).toHaveBeenLastCalledWith(
      expect.objectContaining({
        to: ['jane@example.com'],
        subject: 'Copy: Contact Form Submission - BEAVERS',
      }),
    );
  });

  it('returns an error when the target recipient group is not configured', async () => {
    const sendEmail = vi.spyOn(emailService, 'sendEmail');

    const result = await contactService.contact(request);

    expect(result).toEqual({
      success: false,
      error: 'Invalid recipient type: BEAVERS',
    });
    expect(sendEmail).not.toHaveBeenCalled();
  });
});
