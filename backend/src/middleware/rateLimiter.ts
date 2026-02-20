import rateLimit from 'express-rate-limit';

export const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 3, // max 3 emails from an ip in 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
