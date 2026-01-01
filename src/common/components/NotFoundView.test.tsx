import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { NotFoundView } from './NotFoundView';

it('should render NotFoundView correctly', () => {
  render(<NotFoundView />);

  expect(screen.getByTestId('not-found-view')).toBeInTheDocument();
  expect(screen.getByText('Not Found')).toBeInTheDocument();
  expect(screen.getByText('The requested page was not found.'));
});
