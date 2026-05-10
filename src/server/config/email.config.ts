import nodemailer, { type Transporter } from 'nodemailer';
import { serverEnv } from './env';

function createTransporter(): Transporter {
  const host = serverEnv.SMTP_HOST;
  const port = serverEnv.SMTP_PORT;
  const user = serverEnv.SMTP_USER;
  const pass = serverEnv.SMTP_PASS;
  const clientId = serverEnv.SMTP_CLIENT_ID;
  const clientSecret = serverEnv.SMTP_CLIENT_SECRET;
  const refreshToken = serverEnv.SMTP_REFRESH_TOKEN;
  const secure = serverEnv.SMTP_SECURE;

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

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
  });
}

export const transporter: Transporter = createTransporter();
