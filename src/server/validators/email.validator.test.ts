import { describe, expect, it } from 'vitest';
import { emailRequestSchema, RecipientTypes } from './email.validator';

const validRequest = {
  recipientType: RecipientTypes.GENERAL,
  name: 'Jane Smith',
  senderEmail: 'jane@example.com',
  phone: '07700 900123',
  body: 'Hello, I have a question.',
  sendCopy: false,
};

describe('emailRequestSchema', () => {
  it('accepts a valid contact request', () => {
    const result = emailRequestSchema.safeParse(validRequest);

    expect(result.success).toBe(true);
  });

  it('rejects an invalid recipient type', () => {
    const result = emailRequestSchema.safeParse({
      ...validRequest,
      recipientType: 'INVALID',
    });

    expect(result.success).toBe(false);
  });

  it('rejects invalid sender email addresses', () => {
    const result = emailRequestSchema.safeParse({
      ...validRequest,
      senderEmail: 'not-an-email',
    });

    expect(result.success).toBe(false);
  });

  it('accepts an omitted phone number', () => {
    const { phone: _phone, ...requestWithoutPhone } = validRequest;

    const result = emailRequestSchema.safeParse(requestWithoutPhone);

    expect(result.success).toBe(true);
  });
});
