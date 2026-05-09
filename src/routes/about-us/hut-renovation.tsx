import { createFileRoute } from '@tanstack/react-router';
import { HutRenovationPage } from '#/HutRenovationPage/components/HutRenovationPage';

export const Route = createFileRoute('/about-us/hut-renovation')({
  component: HutRenovationPage,
});
