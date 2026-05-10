import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  RecipientTypes,
  type ValidatedEmailRequest,
} from '../validators/email.validator';

const request: ValidatedEmailRequest = {
  recipientType: RecipientTypes.BEAVERS,
  name: '<Jane>',
  senderEmail: 'jane@example.com',
  phone: '07700 900123',
  body: '<script>alert("x")</script>Hello\nthere',
  sendCopy: false,
};

const DEFAULT_SMTP_PORT = 587;

const defaultServerEnv = {
  SMTP_PORT: DEFAULT_SMTP_PORT,
  SMTP_SECURE: false,
};

const loadContactModules = async (serverEnv: Record<string, unknown> = {}) => {
  vi.doMock('../config/env', () => ({
    serverEnv: { ...defaultServerEnv, ...serverEnv },
  }));

  const [{ contactService }, { emailService }] = await Promise.all([
    import('./contact.service'),
    import('./email.service'),
  ]);

  return { contactService, emailService };
};

describe('contactService', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.doUnmock('../config/env');
    vi.resetModules();
  });

  it('sends a sanitized email to the configured recipient group', async () => {
    const { contactService, emailService } = await loadContactModules({
      BEAVERS_EMAILS: ['beavers@example.com', 'leader@example.com'],
      SMTP_USER: 'noreply@example.com',
    });
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
    const { contactService, emailService } = await loadContactModules({
      BEAVERS_EMAILS: ['beavers@example.com'],
    });
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
    const { contactService, emailService } = await loadContactModules();
    const sendEmail = vi.spyOn(emailService, 'sendEmail');

    const result = await contactService.contact(request);

    expect(result).toEqual({
      success: false,
      error: 'Invalid recipient type: BEAVERS',
    });
    expect(sendEmail).not.toHaveBeenCalled();
  });
});
