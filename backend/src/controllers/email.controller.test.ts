import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { Request, Response } from 'express';
import { emailController } from './email.controller';
import { emailService } from '../services/email.service';

vi.mock('../services/email.service', () => ({
  emailService: {
    sendEmail: vi.fn(),
  },
}));

describe('emailController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: Mock;
  let mockStatus: Mock;

  beforeEach(() => {
    mockJson = vi.fn();
    mockStatus = vi.fn().mockReturnValue({ json: mockJson });
    mockRequest = {
      body: {
        to: 'test@example.com',
        subject: 'Test Subject',
        body: 'Test body',
      },
    };
    mockResponse = {
      status: mockStatus,
      json: mockJson,
    };
    vi.clearAllMocks();
  });

  describe('sendEmail', () => {
    it('should return 200 when email is sent successfully', async () => {
      vi.mocked(emailService.sendEmail).mockResolvedValue({ success: true });

      await emailController.sendEmail(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({ message: 'Email sent successfully' });
    });

    it('should return 500 when email service returns failure', async () => {
      vi.mocked(emailService.sendEmail).mockResolvedValue({
        success: false,
        error: 'Email service unavailable',
      });

      await emailController.sendEmail(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Email service unavailable' });
    });

    it('should return 500 when an exception is thrown', async () => {
      vi.mocked(emailService.sendEmail).mockRejectedValue(new Error('Unexpected error'));

      await emailController.sendEmail(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Failed to send email' });
    });
  });
});

