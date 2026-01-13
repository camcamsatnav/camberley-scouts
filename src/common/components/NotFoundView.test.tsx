import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { NotFoundView } from './NotFoundView';

it('should render NotFoundView correctly', () => {
  render(<NotFoundView />);

  expect(screen.getByTestId('page-placeholder')).toBeInTheDocument();
  expect(screen.getByTestId('page-placeholder-icon')).toBeInTheDocument();
  expect(screen.getByText('Oops...')).toBeInTheDocument();
  expect(screen.getByText('We cannot find this page. Please check URL and try again.')).toBeInTheDocument();
});
