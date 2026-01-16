import { Router } from 'express';
import rateLimit from 'express-rate-limit';

const emailRouter = Router();

const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 3, // max 3 emails from an ip in 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

emailRouter.post('/', emailLimiter, (req, res) => {
  console.log('Email sending logic would be here');
  res.status(200).send('Email sent successfully');
});

export default emailRouter;
