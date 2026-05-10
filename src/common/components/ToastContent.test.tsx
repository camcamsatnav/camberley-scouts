import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ToastContent } from './ToastContent';

describe('ToastContent', () => {
  it('renders the toast content container', () => {
    render(<ToastContent message='Test message' title='Test title' />);

    expect(screen.getByTestId('toast-content')).toBeInTheDocument();
  });

  it('renders the provided title as the title', () => {
    render(<ToastContent message='Test message' title='Test title' />);

    expect(screen.getByText('Test title')).toHaveClass('toast-content__title');
  });

  it('renders the provided message as the body', () => {
    render(<ToastContent message='Test message' title='Test title' />);

    expect(screen.getByText('Test message')).toHaveClass('toast-content__body');
  });

  it('renders the message as the title when title is omitted', () => {
    render(<ToastContent message='Test message' />);

    expect(screen.getByText('Test message')).toHaveClass(
      'toast-content__title',
    );
  });
});
