import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

const DEFAULT_SMTP_PORT = 587;

const commaSeparatedEmails = z
  .string()
  .transform((value, context) => {
    const emails = value
      .split(',')
      .map((email) => email.trim())
      .filter(Boolean);

    for (const email of emails) {
      if (!z.email().safeParse(email).success) {
        context.addIssue({
          code: 'custom',
          message: `${email} is not a valid email address`,
        });
        return z.NEVER;
      }
    }

    return emails;
  })
  .optional();

export const serverEnv = createEnv({
  server: {
    SMTP_HOST: z.string().optional(),
    SMTP_PORT: z.coerce.number().int().positive().default(DEFAULT_SMTP_PORT),
    SMTP_USER: z.email().optional(),
    SMTP_PASS: z.string().optional(),
    SMTP_SECURE: z
      .enum(['true', 'false'])
      .optional()
      .transform((value) => value === 'true'),
    SMTP_CLIENT_ID: z.string().optional(),
    SMTP_CLIENT_SECRET: z.string().optional(),
    SMTP_REFRESH_TOKEN: z.string().optional(),
    BEAVERS_EMAILS: commaSeparatedEmails,
    CUBS_EMAILS: commaSeparatedEmails,
    SCOUTS_EMAILS: commaSeparatedEmails,
    VOLUNTEER_EMAILS: commaSeparatedEmails,
    GENERAL_EMAILS: commaSeparatedEmails,
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
