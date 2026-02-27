/* eslint-disable no-undef */
import nodemailer, { type Transporter } from 'nodemailer';

function createTransporter(): Transporter {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT ?? '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const clientId = process.env.SMTP_CLIENT_ID;
  const clientSecret = process.env.SMTP_CLIENT_SECRET;
  const refreshToken = process.env.SMTP_REFRESH_TOKEN;
  const secure = process.env.SMTP_SECURE === 'true';

  // OAuth2 (e.g. Gmail with Google API credentials)
  if (clientId && clientSecret && refreshToken) {
    return nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        type: 'OAuth2',
        user,
        clientId,
        clientSecret,
        refreshToken,
      },
    });
  }

  // Plain SMTP auth (e.g. Ethereal, SendGrid, Mailgun, etc.)
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
  });
}

export const transporter: Transporter = createTransporter();
