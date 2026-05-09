import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { ToastContent } from './ToastContent';

it('should render ToastContent correctly', () => {
  render(<ToastContent message='Test message' title='Test title' />);

  expect(screen.getByTestId('toast-content')).toBeInTheDocument();
  expect(screen.getByText('Test title')).toBeInTheDocument();
  expect(screen.getByText('Test message')).toBeInTheDocument();

  expect(screen.getByText('Test title')).toHaveClass('toast-content__title');
  expect(screen.getByText('Test message')).toHaveClass('toast-content__body');
});

it('should render message as title when title is not provided', () => {
  render(<ToastContent message='Test message' />);

  expect(screen.getByTestId('toast-content')).toBeInTheDocument();

  expect(screen.getByText('Test message')).toBeInTheDocument();
  expect(screen.getByText('Test message')).toHaveClass('toast-content__title');
});
