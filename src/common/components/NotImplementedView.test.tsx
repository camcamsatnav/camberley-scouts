import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { NotImplementedView } from './NotImplementedView';

it('should render NotImplementedView correctly', () => {
  render(<NotImplementedView />);

  expect(screen.getByTestId('page-placeholder')).toBeInTheDocument();
  expect(screen.getByTestId('page-placeholder-icon')).toBeInTheDocument();
  expect(screen.getByText('No content yet')).toBeInTheDocument();
  expect(screen.getByText('This page will come soon...')).toBeInTheDocument();
});
