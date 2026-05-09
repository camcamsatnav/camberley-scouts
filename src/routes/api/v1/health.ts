import { createFileRoute } from '@tanstack/react-router';
import { healthService } from '#/server/services/health.service';

export const Route = createFileRoute('/api/v1/health')({
  server: {
    handlers: {
      GET: async () => {
        console.info('health check -> OK');

        return Response.json(healthService.checkHealth());
      },
    },
  },
});
