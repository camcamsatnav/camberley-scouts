/* eslint-disable no-undef */
import sanitizeHtml from 'sanitize-html';
import { ValidatedEmailRequest } from '../validators/email.validator';
import { emailService, SendEmailResponse } from './email.service';

const getEmailMapping = () => ({
  BEAVERS: process.env.BEAVERS_EMAILS?.split(','),
  CUBS: process.env.CUBS_EMAILS?.split(','),
  SCOUTS: process.env.SCOUTS_EMAILS?.split(','),
  VOLUNTEER: process.env.VOLUNTEER_EMAILS?.split(','),
  GENERAL: process.env.GENERAL_EMAILS?.split(','),
});

const getFromAddress = (): string => {
  return process.env.SMTP_USER || 'noreply@example.com';
};

export interface ContactResponse {
  success: boolean;
  error?: string;
}

export const contactService = {
  /* Send emails to required recipients and send a copy to original sender if needed */
  contact: async (request: ValidatedEmailRequest): Promise<ContactResponse> => {
    const emailMapping = getEmailMapping();
    const recipients = emailMapping[request.recipientType];
    const fromAddress = getFromAddress();

    if (!recipients) {
      const error = `Invalid recipient type: ${request.recipientType}`;
      console.error(error);
      return { success: false, error };
    }

    // send to recipients
    const result: SendEmailResponse = await emailService.sendEmail({
      from: { name: 'Camberley Scouts', address: fromAddress },
      to: recipients,
      subject: `Contact Form Submission - ${request.recipientType}`,
      body: sanitizeHtml(request.body),
      replyTo: request.senderEmail,
    });

    if (!result.success) {
      return { success: false, error: result.error };
    }

    // send copy to sender if requested
    if (request.sendCopy) {
      const copyBody = `
        <p><strong>This is a copy of the message you submitted via our contact form.</strong></p>
        <hr>
        <p><strong>Sent to:</strong> ${request.recipientType}</p>
        <hr>
        ${sanitizeHtml(request.body)}
      `;

      const copyResult = await emailService.sendEmail({
        from: { name: 'Camberley Scouts', address: fromAddress },
        to: [request.senderEmail],
        subject: `Copy: Contact Form Submission - ${request.recipientType}`,
        body: copyBody,
      });

      if (!copyResult.success) {
        console.warn(`Failed to send copy to ${request.senderEmail}: ${copyResult.error}`);
      }
    }

    return { success: true };
  },
};
