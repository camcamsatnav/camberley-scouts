import sanitizeHtml from 'sanitize-html';
import { serverEnv } from '../config/env';
import type { ValidatedEmailRequest } from '../validators/email.validator';
import { emailService, type SendEmailResponse } from './email.service';

const getEmailMapping = () => ({
  BEAVERS: serverEnv.BEAVERS_EMAILS,
  CUBS: serverEnv.CUBS_EMAILS,
  SCOUTS: serverEnv.SCOUTS_EMAILS,
  VOLUNTEER: serverEnv.VOLUNTEER_EMAILS,
  GENERAL: serverEnv.GENERAL_EMAILS,
});

const getFromAddress = (): string => {
  return serverEnv.SMTP_USER || 'noreply@example.com';
};

export interface ContactResponse {
  success: boolean;
  error?: string;
}

export const contactService = {
  contact: async (request: ValidatedEmailRequest): Promise<ContactResponse> => {
    const emailMapping = getEmailMapping();
    const recipients = emailMapping[request.recipientType];
    const fromAddress = getFromAddress();

    if (!recipients) {
      const error = `Invalid recipient type: ${request.recipientType}`;
      console.error(error);
      return { success: false, error };
    }

    const emailBody = `
      <p><strong>Name:</strong> ${sanitizeHtml(request.name)}</p>
      <p><strong>Email:</strong> ${sanitizeHtml(request.senderEmail)}</p>
      ${request.phone ? `<p><strong>Phone:</strong> ${sanitizeHtml(request.phone)}</p>` : ''}
      <hr>
      <p>${sanitizeHtml(request.body).replace(/\n/g, '<br>')}</p>
    `;

    const result: SendEmailResponse = await emailService.sendEmail({
      from: { name: 'Camberley Scouts', address: fromAddress },
      to: recipients,
      subject: `Contact Form Submission - ${request.recipientType}`,
      body: emailBody,
      replyTo: request.senderEmail,
    });

    if (!result.success) {
      return { success: false, error: result.error };
    }

    if (request.sendCopy) {
      const copyBody = `
        <p><strong>This is a copy of the message you submitted via our contact form.</strong></p>
        <hr>
        <p><strong>Sent to:</strong> ${request.recipientType}</p>
        <hr>
        ${emailBody}
      `;

      const copyResult = await emailService.sendEmail({
        from: { name: 'Camberley Scouts', address: fromAddress },
        to: [request.senderEmail],
        subject: `Copy: Contact Form Submission - ${request.recipientType}`,
        body: copyBody,
      });

      if (!copyResult.success) {
        console.warn(
          `Failed to send copy to ${request.senderEmail}: ${copyResult.error}`,
        );
      }
    }

    return { success: true };
  },
};
