import { createFileRoute } from '@tanstack/react-router';
import { JoinBeaversPage } from '#/joinBeaversPage/components/JoinBeaversPage';

export const Route = createFileRoute('/beavers')({
  component: JoinBeaversPage,
});
