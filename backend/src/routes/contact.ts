import { Router } from 'express';
import { emailLimiter } from '../middleware/rateLimiter';
import { contactController } from '../controllers/contact.controller';

const contactRouter = Router();

contactRouter.post('/', emailLimiter, contactController.contact);

export default contactRouter;
