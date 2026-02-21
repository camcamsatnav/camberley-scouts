import { transporter } from '../config/email.config';

export interface FromAddress {
  name: string;
  address: string;
}

export interface SendEmailRequest {
  from: string | FromAddress;
  to: string[];
  subject: string;
  body: string;
  replyTo?: string;
}

export interface SendEmailResponse {
  success: boolean;
  error?: string;
}

export const emailService = {
  /* Send emails to people */
  sendEmail: async (data: SendEmailRequest): Promise<SendEmailResponse> => {
    try {
      await transporter.sendMail({
        from: data.from,
        to: data.to,
        subject: data.subject,
        html: data.body,
        replyTo: data.replyTo,
      });

      console.debug(`Email sent to ${data.to} with subject "${data.subject}"`);

      return {
        success: true,
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send email',
      };
    }
  },
};
