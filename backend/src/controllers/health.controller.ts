import { Request, Response } from 'express';
import { healthService } from '../services/health.service';

export const healthController = {
  getHealth: (_req: Request, res: Response): void => {
    const status = healthService.checkHealth();
    console.log('health check -> OK');
    res.status(200).json(status);
  },
};
