import express from 'express';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import { Router } from 'express';
import { contactController } from '../controllers/contact.controller';
import { contactService } from '../services/contact.service';
import rateLimit from 'express-rate-limit';

vi.mock('../services/contact.service', () => ({
  contactService: {
    contact: vi.fn(),
  },
}));

describe('POST /contact', () => {
  let app: express.Express;

  const validRequestBody = {
    recipientType: 'BEAVERS',
    name: 'Jane Smith',
    senderEmail: 'test@example.com',
    phone: '07700 900123',
    body: 'Test message body',
    sendCopy: false,
  };

  // router without rate limiting for functional tests
  const createAppWithoutRateLimiter = () => {
    const testApp = express();
    testApp.use(express.json());
    const router = Router();
    router.post('/', contactController.contact);
    testApp.use('/contact', router);
    return testApp;
  };

  // router with rate limiting for rate limit tests
  const createAppWithRateLimiter = () => {
    const testApp = express();
    testApp.use(express.json());
    const router = Router();
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 3,
      standardHeaders: true,
      legacyHeaders: false,
      message: 'Too many requests from this IP, please try again after 15 minutes',
    });
    router.post('/', limiter, contactController.contact);
    testApp.use('/contact', router);
    return testApp;
  };

  beforeEach(() => {
    app = createAppWithoutRateLimiter();
    vi.clearAllMocks();
  });

  describe('successful requests', () => {
    it('should return 200 when contact form is submitted successfully', async () => {
      vi.mocked(contactService.contact).mockResolvedValue({ success: true });

      const response = await request(app)
        .post('/contact')
        .send(validRequestBody);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Contact form submitted successfully',
      });
    });

    it('should accept all valid recipient types', async () => {
      vi.mocked(contactService.contact).mockResolvedValue({ success: true });

      const recipientTypes = ['BEAVERS', 'CUBS', 'SCOUTS', 'VOLUNTEER', 'GENERAL'];

      for (const recipientType of recipientTypes) {
        const response = await request(app)
          .post('/contact')
          .send({ ...validRequestBody, recipientType });

        expect(response.status).toBe(200);
      }
    });

    it('should accept an empty phone number', async () => {
      vi.mocked(contactService.contact).mockResolvedValue({ success: true });

      const response = await request(app)
        .post('/contact')
        .send({ ...validRequestBody, phone: '' });

      expect(response.status).toBe(200);
    });

    it('should accept a missing phone number', async () => {
      vi.mocked(contactService.contact).mockResolvedValue({ success: true });

      const response = await request(app)
        .post('/contact')
        .send({ ...validRequestBody, phone: undefined });

      expect(response.status).toBe(200);
    });

    it('should accept name with exactly 100 characters', async () => {
      vi.mocked(contactService.contact).mockResolvedValue({ success: true });

      const response = await request(app)
        .post('/contact')
        .send({ ...validRequestBody, name: 'a'.repeat(100) });

      expect(response.status).toBe(200);
    });

    it('should accept body with exactly 2000 characters', async () => {
      vi.mocked(contactService.contact).mockResolvedValue({ success: true });

      const response = await request(app)
        .post('/contact')
        .send({ ...validRequestBody, body: 'a'.repeat(2000) });

      expect(response.status).toBe(200);
    });
  });

  describe('validation errors', () => {
    it('should return 400 when recipientType is invalid', async () => {
      const response = await request(app)
        .post('/contact')
        .send({ ...validRequestBody, recipientType: 'INVALID' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation failed');
      expect(response.body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ field: 'recipientType' }),
        ]),
      );
    });

    it('should return 400 when senderEmail is invalid', async () => {
      const response = await request(app)
        .post('/contact')
        .send({ ...validRequestBody, senderEmail: 'not-an-email' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation failed');
    });

    it('should return 400 when body is empty', async () => {
      const response = await request(app)
        .post('/contact')
        .send({ ...validRequestBody, body: '' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation failed');
    });

    it('should return 400 when body exceeds 2000 characters', async () => {
      const response = await request(app)
        .post('/contact')
        .send({ ...validRequestBody, body: 'a'.repeat(2001) });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation failed');
      expect(response.body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ field: 'body' }),
        ]),
      );
    });

    it('should return 400 when name is missing', async () => {
      const response = await request(app)
        .post('/contact')
        .send({ ...validRequestBody, name: undefined });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation failed');
      expect(response.body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ field: 'name' }),
        ]),
      );
    });

    it('should return 400 when name is empty', async () => {
      const response = await request(app)
        .post('/contact')
        .send({ ...validRequestBody, name: '' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation failed');
      expect(response.body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ field: 'name' }),
        ]),
      );
    });

    it('should return 400 when name exceeds 100 characters', async () => {
      const response = await request(app)
        .post('/contact')
        .send({ ...validRequestBody, name: 'a'.repeat(101) });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation failed');
      expect(response.body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ field: 'name' }),
        ]),
      );
    });

    it('should return 400 when phone is invalid', async () => {
      const response = await request(app)
        .post('/contact')
        .send({ ...validRequestBody, phone: '123' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation failed');
      expect(response.body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ field: 'phone' }),
        ]),
      );
    });

    it('should return 400 when required fields are missing', async () => {
      const response = await request(app)
        .post('/contact')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation failed');
    });
  });

  describe('service errors', () => {
    it('should return 500 when contact service fails', async () => {
      vi.mocked(contactService.contact).mockResolvedValue({
        success: false,
        error: 'Email service unavailable',
      });

      const response = await request(app)
        .post('/contact')
        .send(validRequestBody);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Email service unavailable');
    });
  });

  describe('rate limiting', () => {
    it('should rate limit after 3 requests', async () => {
      // create app with rate limiter
      const rateLimitedApp = createAppWithRateLimiter();
      vi.mocked(contactService.contact).mockResolvedValue({ success: true });

      // make 3 requests which should succeed
      await request(rateLimitedApp).post('/contact').send(validRequestBody).expect(200);
      await request(rateLimitedApp).post('/contact').send(validRequestBody).expect(200);
      await request(rateLimitedApp).post('/contact').send(validRequestBody).expect(200);

      // 4th request should be rate limited
      const response = await request(rateLimitedApp).post('/contact').send(validRequestBody);
      expect(response.status).toBe(429);
      expect(response.text).toBe('Too many requests from this IP, please try again after 15 minutes');
    });
  });
});
