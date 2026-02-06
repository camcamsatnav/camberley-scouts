import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { JoinBeaversPage } from './JoinBeaversPage';

it('should render JoinBeaversPage correctly', () => {
  render(<JoinBeaversPage />);

  expect(screen.getByTestId('join-beavers-page')).toBeInTheDocument();
  expect(screen.getByTestId('page-heading')).toBeInTheDocument();

  expect(screen.getAllByTestId('location-card')).toHaveLength(2);
});
