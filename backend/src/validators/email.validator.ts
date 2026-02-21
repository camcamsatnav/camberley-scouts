import { z } from 'zod';

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
  senderEmail: z.email('Invalid email address'),
  body: z.string().min(1, 'Message body is required').max(5000, 'Message body is too long'),
  sendCopy: z.boolean(),
});

export type ValidatedEmailRequest = z.infer<typeof emailRequestSchema>;
