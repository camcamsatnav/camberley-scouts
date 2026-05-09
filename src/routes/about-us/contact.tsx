import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { ContactPageView } from '#/contactPage/components/ContactPageView';
import { RecipientTypes } from '#/contactPage/constants';

const contactSearchSchema = z.object({
  query: z.enum(Object.values(RecipientTypes)).optional(),
});

export const Route = createFileRoute('/about-us/contact')({
  validateSearch: contactSearchSchema,
  component: ContactPageView,
});
