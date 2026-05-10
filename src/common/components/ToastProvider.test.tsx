import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useToast } from '../hooks/useToast';
import { ToastProvider } from './ToastProvider';

const ToastTrigger = () => {
  const toast = useToast();
  return (
    <div>
      <button
        type='button'
        onClick={() => toast.success('Operation succeeded')}
        data-testid='trigger-success'
      >
        Success
      </button>
      <button
        type='button'
        onClick={() => toast.success('Operation succeeded', 'Success Title')}
        data-testid='trigger-success-title'
      >
        Success with title
      </button>
      <button
        type='button'
        onClick={() => toast.error('Something went wrong')}
        data-testid='trigger-error'
      >
        Error
      </button>
      <button
        type='button'
        onClick={() => toast.error('Something went wrong', 'Error Title')}
        data-testid='trigger-error-title'
      >
        Error with title
      </button>
      <button
        type='button'
        onClick={() => toast.info('Here is some info')}
        data-testid='trigger-info'
      >
        Info
      </button>
      <button
        type='button'
        onClick={() => toast.warning('Be careful')}
        data-testid='trigger-warning'
      >
        Warning
      </button>
    </div>
  );
};

const renderWithProvider = () =>
  render(
    <ToastProvider>
      <ToastTrigger />
    </ToastProvider>,
  );

describe('ToastProvider', () => {
  it('renders children', () => {
    renderWithProvider();

    expect(screen.getByTestId('trigger-success')).toBeInTheDocument();
  });

  it('does not show a toast initially', () => {
    renderWithProvider();

    expect(screen.queryByTestId('toast-content')).not.toBeInTheDocument();
  });

  it('shows a success toast message', () => {
    renderWithProvider();

    act(() => {
      fireEvent.click(screen.getByTestId('trigger-success'));
    });

    expect(screen.getByText('Operation succeeded')).toBeInTheDocument();
  });

  it('shows a success toast title', () => {
    renderWithProvider();

    act(() => {
      fireEvent.click(screen.getByTestId('trigger-success-title'));
    });

    expect(screen.getByText('Success Title')).toBeInTheDocument();
  });

  it('shows an error toast message', () => {
    renderWithProvider();

    act(() => {
      fireEvent.click(screen.getByTestId('trigger-error'));
    });

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('shows an error toast title', () => {
    renderWithProvider();

    act(() => {
      fireEvent.click(screen.getByTestId('trigger-error-title'));
    });

    expect(screen.getByText('Error Title')).toBeInTheDocument();
  });

  it('shows an info toast message', () => {
    renderWithProvider();

    act(() => {
      fireEvent.click(screen.getByTestId('trigger-info'));
    });

    expect(screen.getByText('Here is some info')).toBeInTheDocument();
  });

  it('shows a warning toast message', () => {
    renderWithProvider();

    act(() => {
      fireEvent.click(screen.getByTestId('trigger-warning'));
    });

    expect(screen.getByText('Be careful')).toBeInTheDocument();
  });

  it('shows a progress bar for non-error toasts', () => {
    renderWithProvider();

    act(() => {
      fireEvent.click(screen.getByTestId('trigger-success'));
    });

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('does not show a progress bar for error toasts', () => {
    renderWithProvider();

    act(() => {
      fireEvent.click(screen.getByTestId('trigger-error'));
    });

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('keeps the toast open when the page outside it is clicked', async () => {
    renderWithProvider();

    act(() => {
      fireEvent.click(screen.getByTestId('trigger-success'));
    });

    act(() => {
      fireEvent.mouseDown(document.body);
      fireEvent.mouseUp(document.body);
      fireEvent.click(document.body);
    });

    await waitFor(() => {
      expect(screen.getByTestId('toast-content')).toBeInTheDocument();
    });
  });

  it('dismisses the toast when the close button is clicked', async () => {
    renderWithProvider();

    act(() => {
      fireEvent.click(screen.getByTestId('trigger-success'));
    });

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /close/i }));
    });

    await waitFor(() => {
      expect(screen.queryByTestId('toast-content')).not.toBeInTheDocument();
    });
  });
});
