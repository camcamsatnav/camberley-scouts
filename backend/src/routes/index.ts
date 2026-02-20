import { Router } from 'express';
import emailRouter from './email';
import healthRouter from './health';

const router = Router();

router.use('/health', healthRouter);
router.use('/email', emailRouter);

export default router;
