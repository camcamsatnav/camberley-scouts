import { z } from 'zod';

const UK_PHONE_REGEX =
  /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?#(\d{4}|\d{3}))?$/;

export const RecipientTypes = {
  BEAVERS: 'BEAVERS',
  CUBS: 'CUBS',
  SCOUTS: 'SCOUTS',
  VOLUNTEER: 'VOLUNTEER',
  GENERAL: 'GENERAL',
} as const;

export const emailRequestSchema = z.object({
  recipientType: z.enum([
    RecipientTypes.BEAVERS,
    RecipientTypes.CUBS,
    RecipientTypes.SCOUTS,
    RecipientTypes.VOLUNTEER,
    RecipientTypes.GENERAL,
  ]),
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  senderEmail: z.email('Invalid email address'),
  phone: z
    .string()
    .regex(UK_PHONE_REGEX, 'Invalid phone number')
    .or(z.literal(''))
    .optional(),
  body: z
    .string()
    .min(1, 'Message body is required')
    .max(2000, 'Message body is too long'),
  sendCopy: z.boolean(),
});

export type ValidatedEmailRequest = z.infer<typeof emailRequestSchema>;
