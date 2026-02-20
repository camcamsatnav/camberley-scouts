import { Request, Response } from 'express';
import { emailService, SendEmailRequest } from '../services/email.service';

export const emailController = {
  sendEmail: async (req: Request, res: Response): Promise<void> => {
    try {
      const emailData: SendEmailRequest = req.body;
      // TODO: revisit, probably wont be all the parameters, will probably need to switch between templates/emails depending on frontend selection

      console.info('sendEmail ->'); // TODO: put info here, jsut not determined what yet

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
