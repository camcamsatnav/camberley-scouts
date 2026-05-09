import { createFileRoute } from '@tanstack/react-router';
import {
  checkEmailRateLimit,
  rateLimitHeaders,
} from '#/server/middleware/rateLimiter';
import { contactService } from '#/server/services/contact.service';
import { emailRequestSchema } from '#/server/validators/email.validator';

export const Route = createFileRoute('/api/v1/contact')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const rateLimit = checkEmailRateLimit(request);
        const headers = rateLimitHeaders(rateLimit);

        if (!rateLimit.allowed) {
          return Response.json(
            {
              error:
                'Too many requests from this IP, please try again after 15 minutes',
            },
            {
              status: 429,
              headers: {
                ...headers,
                'Retry-After': String(
                  Math.max(
                    1,
                    Math.ceil((rateLimit.resetAt - Date.now()) / 1000),
                  ),
                ),
              },
            },
          );
        }

        try {
          const body = await request.json();
          const parseResult = emailRequestSchema.safeParse(body);

          if (!parseResult.success) {
            return Response.json(
              {
                error: 'Validation failed',
                details: parseResult.error.issues.map((e) => ({
                  field: e.path.join('.'),
                  message: e.message,
                })),
              },
              { status: 400, headers },
            );
          }

          const result = await contactService.contact(parseResult.data);

          if (!result.success) {
            console.error('Contact service error:', result.error);
            return Response.json(
              { error: result.error || 'Failed to send email' },
              { status: 500, headers },
            );
          }

          console.info('Contact form submitted successfully');
          return Response.json(
            { message: 'Contact form submitted successfully' },
            { headers },
          );
        } catch (error) {
          console.error('Error in contact route:', error);
          return Response.json(
            { error: 'An unexpected error occurred' },
            { status: 500, headers },
          );
        }
      },
    },
  },
});
