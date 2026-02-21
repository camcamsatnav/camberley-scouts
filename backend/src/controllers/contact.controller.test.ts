import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { Request, Response } from 'express';
import { contactController } from './contact.controller';
import { contactService } from '../services/contact.service';

vi.mock('../services/contact.service', () => ({
  contactService: {
    contact: vi.fn(),
  },
}));

describe('contactController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: Mock;
  let mockStatus: Mock;

  const validRequestBody = {
    recipientType: 'BEAVERS',
    senderEmail: 'test@example.com',
    body: 'Test message body',
    sendCopy: false,
  };

  beforeEach(() => {
    mockJson = vi.fn();
    mockStatus = vi.fn().mockReturnValue({ json: mockJson });
    mockRequest = {
      body: { ...validRequestBody },
    };
    mockResponse = {
      status: mockStatus,
      json: mockJson,
    };
    vi.clearAllMocks();
  });

  describe('contact', () => {
    describe('validation', () => {
      it('should return 400 when recipientType is missing', async () => {
        mockRequest.body = { ...validRequestBody, recipientType: undefined };

        await contactController.contact(
          mockRequest as Request,
          mockResponse as Response,
        );

        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith(
          expect.objectContaining({
            error: 'Validation failed',
            details: expect.arrayContaining([
              expect.objectContaining({ field: 'recipientType' }),
            ]),
          }),
        );
      });

      it('should return 400 when recipientType is invalid', async () => {
        mockRequest.body = { ...validRequestBody, recipientType: 'INVALID' };

        await contactController.contact(
          mockRequest as Request,
          mockResponse as Response,
        );

        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith(
          expect.objectContaining({
            error: 'Validation failed',
            details: expect.arrayContaining([
              expect.objectContaining({ field: 'recipientType' }),
            ]),
          }),
        );
      });

      it('should return 400 when senderEmail is invalid', async () => {
        mockRequest.body = { ...validRequestBody, senderEmail: 'not-an-email' };

        await contactController.contact(
          mockRequest as Request,
          mockResponse as Response,
        );

        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith(
          expect.objectContaining({
            error: 'Validation failed',
            details: expect.arrayContaining([
              expect.objectContaining({ field: 'senderEmail' }),
            ]),
          }),
        );
      });

      it('should return 400 when senderEmail is missing', async () => {
        mockRequest.body = { ...validRequestBody, senderEmail: undefined };

        await contactController.contact(
          mockRequest as Request,
          mockResponse as Response,
        );

        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith(
          expect.objectContaining({
            error: 'Validation failed',
            details: expect.arrayContaining([
              expect.objectContaining({ field: 'senderEmail' }),
            ]),
          }),
        );
      });

      it('should return 400 when body is empty', async () => {
        mockRequest.body = { ...validRequestBody, body: '' };

        await contactController.contact(
          mockRequest as Request,
          mockResponse as Response,
        );

        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith(
          expect.objectContaining({
            error: 'Validation failed',
            details: expect.arrayContaining([
              expect.objectContaining({ field: 'body' }),
            ]),
          }),
        );
      });

      it('should return 400 when body exceeds max length', async () => {
        mockRequest.body = { ...validRequestBody, body: 'a'.repeat(5001) };

        await contactController.contact(
          mockRequest as Request,
          mockResponse as Response,
        );

        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith(
          expect.objectContaining({
            error: 'Validation failed',
            details: expect.arrayContaining([
              expect.objectContaining({ field: 'body' }),
            ]),
          }),
        );
      });

      it('should return 400 when sendCopy is not a boolean', async () => {
        mockRequest.body = { ...validRequestBody, sendCopy: 'yes' };

        await contactController.contact(
          mockRequest as Request,
          mockResponse as Response,
        );

        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith(
          expect.objectContaining({
            error: 'Validation failed',
            details: expect.arrayContaining([
              expect.objectContaining({ field: 'sendCopy' }),
            ]),
          }),
        );
      });

      it('should return 400 with multiple errors when multiple fields are invalid', async () => {
        mockRequest.body = {
          recipientType: 'INVALID',
          senderEmail: 'not-an-email',
          body: '',
          sendCopy: 'yes',
        };

        await contactController.contact(
          mockRequest as Request,
          mockResponse as Response,
        );

        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith(
          expect.objectContaining({
            error: 'Validation failed',
            details: expect.arrayContaining([
              expect.objectContaining({ field: 'recipientType' }),
              expect.objectContaining({ field: 'senderEmail' }),
              expect.objectContaining({ field: 'body' }),
              expect.objectContaining({ field: 'sendCopy' }),
            ]),
          }),
        );
      });
    });

    describe('successful submission', () => {
      it('should return 200 when contact form is submitted successfully', async () => {
        vi.mocked(contactService.contact).mockResolvedValue({ success: true });

        await contactController.contact(
          mockRequest as Request,
          mockResponse as Response,
        );

        expect(contactService.contact).toHaveBeenCalledWith(validRequestBody);
        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockJson).toHaveBeenCalledWith({
          message: 'Contact form submitted successfully',
        });
      });

      it('should pass all recipient types correctly', async () => {
        vi.mocked(contactService.contact).mockResolvedValue({ success: true });

        const recipientTypes = ['BEAVERS', 'CUBS', 'SCOUTS', 'VOLUNTEER', 'GENERAL'];

        for (const recipientType of recipientTypes) {
          mockRequest.body = { ...validRequestBody, recipientType };

          await contactController.contact(
            mockRequest as Request,
            mockResponse as Response,
          );

          expect(contactService.contact).toHaveBeenCalledWith(
            expect.objectContaining({ recipientType }),
          );
        }
      });

      it('should pass sendCopy true to the service', async () => {
        vi.mocked(contactService.contact).mockResolvedValue({ success: true });
        mockRequest.body = { ...validRequestBody, sendCopy: true };

        await contactController.contact(
          mockRequest as Request,
          mockResponse as Response,
        );

        expect(contactService.contact).toHaveBeenCalledWith(
          expect.objectContaining({ sendCopy: true }),
        );
      });
    });

    describe('service errors', () => {
      it('should return 500 when contact service returns failure', async () => {
        vi.mocked(contactService.contact).mockResolvedValue({
          success: false,
          error: 'Email service unavailable',
        });

        await contactController.contact(
          mockRequest as Request,
          mockResponse as Response,
        );

        expect(mockStatus).toHaveBeenCalledWith(500);
        expect(mockJson).toHaveBeenCalledWith({
          error: 'Email service unavailable',
        });
      });

      it('should return generic error when service returns failure without error message', async () => {
        vi.mocked(contactService.contact).mockResolvedValue({
          success: false,
        });

        await contactController.contact(
          mockRequest as Request,
          mockResponse as Response,
        );

        expect(mockStatus).toHaveBeenCalledWith(500);
        expect(mockJson).toHaveBeenCalledWith({
          error: 'Failed to send email',
        });
      });

      it('should return 500 when an unexpected exception is thrown', async () => {
        vi.mocked(contactService.contact).mockRejectedValue(
          new Error('Unexpected error'),
        );

        await contactController.contact(
          mockRequest as Request,
          mockResponse as Response,
        );

        expect(mockStatus).toHaveBeenCalledWith(500);
        expect(mockJson).toHaveBeenCalledWith({
          error: 'An unexpected error occurred',
        });
      });
    });
  });
});
