import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as nodemailer from 'nodemailer';

vi.mock('nodemailer', () => {
  const createTransport = vi.fn().mockReturnValue({ sendMail: vi.fn() });
  return {
    default: { createTransport },
    createTransport,
  };
});

const loadConfig = async () => {
  vi.resetModules();
  const { transporter } = await import('./email.config');
  return transporter;
};

describe('email.config', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
  });

  describe('plain SMTP auth', () => {
    it('should create a plain auth transporter when no OAuth2 env vars are set', async () => {
      vi.stubEnv('SMTP_HOST', 'smtp.ethereal.email');
      vi.stubEnv('SMTP_PORT', '587');
      vi.stubEnv('SMTP_SECURE', 'false');
      vi.stubEnv('SMTP_USER', 'user@ethereal.email');
      vi.stubEnv('SMTP_PASS', 'secret');

      await loadConfig();

      expect(nodemailer.createTransport).toHaveBeenCalledWith({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: { user: 'user@ethereal.email', pass: 'secret' },
      });
    });

    it('should set secure to true when SMTP_SECURE is "true"', async () => {
      vi.stubEnv('SMTP_SECURE', 'true');
      vi.stubEnv('SMTP_USER', 'user@example.com');
      vi.stubEnv('SMTP_PASS', 'secret');

      await loadConfig();

      expect(nodemailer.createTransport).toHaveBeenCalledWith(
        expect.objectContaining({ secure: true }),
      );
    });

    it('should set auth to undefined when SMTP_USER and SMTP_PASS are not set', async () => {
      vi.stubEnv('SMTP_HOST', 'smtp.example.com');

      await loadConfig();

      expect(nodemailer.createTransport).toHaveBeenCalledWith(
        expect.objectContaining({ auth: undefined }),
      );
    });
  });

  describe('OAuth2 auth', () => {
    it('should create an OAuth2 transporter when all OAuth2 env vars are set', async () => {
      vi.stubEnv('SMTP_HOST', 'smtp.gmail.com');
      vi.stubEnv('SMTP_PORT', '465');
      vi.stubEnv('SMTP_SECURE', 'true');
      vi.stubEnv('SMTP_USER', 'user@gmail.com');
      vi.stubEnv('SMTP_CLIENT_ID', 'client-id');
      vi.stubEnv('SMTP_CLIENT_SECRET', 'client-secret');
      vi.stubEnv('SMTP_REFRESH_TOKEN', 'refresh-token');

      await loadConfig();

      expect(nodemailer.createTransport).toHaveBeenCalledWith({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          type: 'OAuth2',
          user: 'user@gmail.com',
          clientId: 'client-id',
          clientSecret: 'client-secret',
          refreshToken: 'refresh-token',
        },
      });
    });

    it('should fall back to plain auth when only some OAuth2 env vars are set', async () => {
      vi.stubEnv('SMTP_USER', 'user@example.com');
      vi.stubEnv('SMTP_PASS', 'secret');
      vi.stubEnv('SMTP_CLIENT_ID', 'client-id');

      await loadConfig();

      expect(nodemailer.createTransport).toHaveBeenCalledWith(
        expect.objectContaining({
          auth: { user: 'user@example.com', pass: 'secret' },
        }),
      );
    });
  });

  describe('port parsing', () => {
    it('should default to port 587 when SMTP_PORT is not set', async () => {
      await loadConfig();

      expect(nodemailer.createTransport).toHaveBeenCalledWith(
        expect.objectContaining({ port: 587 }),
      );
    });

    it('should parse SMTP_PORT as an integer', async () => {
      vi.stubEnv('SMTP_PORT', '465');

      await loadConfig();

      expect(nodemailer.createTransport).toHaveBeenCalledWith(
        expect.objectContaining({ port: 465 }),
      );
    });
  });
});
