import { Router } from 'express';
import { emailLimiter } from '../middleware/rateLimiter';
import { emailController } from '../controllers/email.controller';

const emailRouter = Router();

emailRouter.post('/', emailLimiter, emailController.sendEmail);

export default emailRouter;
