import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  console.log('health check -> OK');
  res.status(200).json({ status: 'OK' });
});

export default router;
