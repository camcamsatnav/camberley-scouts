import { createFileRoute } from '@tanstack/react-router';
import { HomePageView } from '#/HomePage/components/HomePageView';

export const Route = createFileRoute('/')({ component: HomePageView });
