import request from 'supertest';
import { describe, beforeAll, it, expect } from 'vitest';
import express from 'express';
import healthRouter from './health';

describe('GET /health', () => {
  let app: express.Express;

  beforeAll(() => {
    app = express();
    app.use('/health', healthRouter);
  });

  it('should return 200 and status OK', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'OK' });
  });
});

