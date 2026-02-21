import { Router } from 'express';
import contactRouter from './contact';
import healthRouter from './health';

const router = Router();

router.use('/health', healthRouter);
router.use('/contact', contactRouter);

export default router;
