import { transporter } from '../config/email.config';

export interface SendEmailRequest {
  from: string;
  to: string;
  subject: string;
  body: string;
}

export interface SendEmailResponse {
  success: boolean;
  error?: string;
}

export const emailService = {
  sendEmail: async (data: SendEmailRequest): Promise<SendEmailResponse> => {
    try {
      await transporter.sendMail({
        from: data.from,
        to: data.to,
        subject: data.subject,
        html: data.body,
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
