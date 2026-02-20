import { Request, Response } from 'express';
import { emailService, SendEmailRequest } from '../services/email.service';

export const emailController = {
  sendEmail: async (req: Request, res: Response): Promise<void> => {
    try {
      const emailData: SendEmailRequest = req.body;

      const result = await emailService.sendEmail(emailData);

      if (result.success) {
        res.status(200).json({ message: 'Email sent successfully' });
      } else {
        res.status(500).json({ error: result.error });
      }
    } catch (error) {
      console.error('Error in email controller:', error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  },
};
