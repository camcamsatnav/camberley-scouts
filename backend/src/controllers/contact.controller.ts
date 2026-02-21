import { Request, Response } from 'express';
import { contactService } from '../services/contact.service';
import { emailRequestSchema } from '../validators/email.validator';

export const contactController = {
  /* POST /contact */
  contact: async (req: Request, res: Response): Promise<void> => {
    try {
      const parseResult = emailRequestSchema.safeParse(req.body);

      if (!parseResult.success) {
        res.status(400).json({
          error: 'Validation failed',
          details: parseResult.error.issues.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        });
        return;
      }

      const result = await contactService.contact(parseResult.data);

      if (!result.success) {
        console.error('Contact service error:', result.error);
        res.status(500).json({ error: result.error || 'Failed to send email' });
        return;
      }

      console.info('Contact form submitted successfully');
      res.status(200).json({ message: 'Contact form submitted successfully' });
    } catch (error) {
      console.error('Error in contact controller:', error);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  },
};
