/* eslint-disable no-undef */
import { ValidatedEmailRequest } from '../validators/email.validator';
import { emailService, SendEmailResponse } from './email.service';

const EMAIL_MAPPING = {
  BEAVERS: process.env.BEAVERS_EMAILS?.split(','),
  CUBS: process.env.CUBS_EMAILS?.split(','),
  SCOUTS: process.env.SCOUTS_EMAILS?.split(','),
  VOLUNTEER: process.env.VOLUNTEER_EMAILS?.split(','),
  GENERAL: process.env.GENERAL_EMAILS?.split(','),
};

export interface ContactResponse {
  success: boolean;
  error?: string;
}

export const contactService = {
  /* Send emails to required recipients and send a copy to original sender if needed */
  contact: async (request: ValidatedEmailRequest): Promise<ContactResponse> => {
    const recipients = EMAIL_MAPPING[request.recipientType];

    if (!recipients) {
      const error = `Invalid recipient type: ${request.recipientType}`;
      console.error(error);
      return { success: false, error };
    }

    // send to recipients
    const result: SendEmailResponse = await emailService.sendEmail({
      from: request.senderEmail,
      to: recipients,
      subject: `Contact Form Submission - ${request.recipientType}`,
      body: request.body,
    });

    if (!result.success) {
      return { success: false, error: result.error };
    }

    // send copy to sender if requested
    if (request.sendCopy) {
      const copyResult = await emailService.sendEmail({
        from: request.senderEmail,
        to: [request.senderEmail],
        subject: `Copy: Contact Form Submission - ${request.recipientType}`,
        body: request.body,
      });

      if (!copyResult.success) {
        console.warn(`Failed to send copy to ${request.senderEmail}: ${copyResult.error}`);
      }
    }

    return { success: true };
  },
};
