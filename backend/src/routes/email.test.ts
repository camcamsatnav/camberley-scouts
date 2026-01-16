import express from 'express';
import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import emailRouter from './email';

describe('POST /v1/email', () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.use('/email', emailRouter);
  });

  it('should reate limit after 3 requests', async () => {
    await request(app).post('/email').expect(200);
    await request(app).post('/email').expect(200);
    await request(app).post('/email').expect(200);
    const response = await request(app).post('/email');
    expect(response.status).toBe(429);
    expect(response.text).toBe('Too many requests from this IP, please try again after 15 minutes');
  });
});
