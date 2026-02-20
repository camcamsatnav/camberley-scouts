import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { JoinBeaversPage } from './JoinBeaversPage';
import { BEAVERS_IMAGE_PATH } from '../../HomePage/constants';

it('should render JoinBeaversPage correctly', () => {
  render(<JoinBeaversPage />);

  expect(screen.getByTestId('join-beavers-page')).toBeInTheDocument();
  expect(screen.getByTestId('page-heading')).toBeInTheDocument();

  expect(screen.getByText('We have 2 Beaver Colonies')).toBeInTheDocument();

  expect(screen.getByTestId('beavers-logo-image')).toBe('IMG');

  expect(screen.getByTestId('beavers-page-join-button')).toBeInTheDocument();

  expect(screen.getAllByTestId('location-card')).toHaveLength(2);

  expect(screen.getByTestId('beavers-info')).toBeInTheDocument();
  expect(screen.getByTestId('beavers-info-list')).toBeInTheDocument();
  expect(screen.getByTestId('beavers-info-card')).toBeInTheDocument();
});
