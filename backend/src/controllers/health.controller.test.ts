import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { Request, Response } from 'express';
import { healthController } from './health.controller';
import { healthService } from '../services/health.service';

vi.mock('../services/health.service', () => ({
  healthService: {
    checkHealth: vi.fn(),
  },
}));

describe('healthController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: Mock;
  let mockStatus: Mock;

  beforeEach(() => {
    mockJson = vi.fn();
    mockStatus = vi.fn().mockReturnValue({ json: mockJson });
    mockRequest = {};
    mockResponse = {
      status: mockStatus,
      json: mockJson,
    };
    vi.clearAllMocks();
  });

  describe('getHealth', () => {
    it('should return 200 with health status', () => {
      const mockHealthStatus = {
        status: 'OK',
        timestamp: new Date('2026-02-19T12:00:00Z'),
      };
      vi.mocked(healthService.checkHealth).mockReturnValue(mockHealthStatus);

      healthController.getHealth(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockHealthStatus);
    });
  });
});
