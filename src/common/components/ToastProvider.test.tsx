import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { expect, it } from 'vitest';
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

it('should render children without showing a toast initially', () => {
  renderWithProvider();

  expect(screen.getByTestId('trigger-success')).toBeInTheDocument();
  expect(screen.queryByTestId('toast-content')).not.toBeInTheDocument();
});

it('should show a success toast with the correct message', () => {
  renderWithProvider();

  act(() => {
    fireEvent.click(screen.getByTestId('trigger-success'));
  });

  expect(screen.getByTestId('toast-content')).toBeInTheDocument();
  expect(screen.getByText('Operation succeeded')).toBeInTheDocument();
});

it('should show a success toast with a title and message', () => {
  renderWithProvider();

  act(() => {
    fireEvent.click(screen.getByTestId('trigger-success-title'));
  });

  expect(screen.getByText('Success Title')).toBeInTheDocument();
  expect(screen.getByText('Operation succeeded')).toBeInTheDocument();
});

it('should show an error toast with the correct message', () => {
  renderWithProvider();

  act(() => {
    fireEvent.click(screen.getByTestId('trigger-error'));
  });

  expect(screen.getByTestId('toast-content')).toBeInTheDocument();
  expect(screen.getByText('Something went wrong')).toBeInTheDocument();
});

it('should show an error toast with a title and message', () => {
  renderWithProvider();

  act(() => {
    fireEvent.click(screen.getByTestId('trigger-error-title'));
  });

  expect(screen.getByText('Error Title')).toBeInTheDocument();
  expect(screen.getByText('Something went wrong')).toBeInTheDocument();
});

it('should show an info toast with the correct message', () => {
  renderWithProvider();

  act(() => {
    fireEvent.click(screen.getByTestId('trigger-info'));
  });

  expect(screen.getByTestId('toast-content')).toBeInTheDocument();
  expect(screen.getByText('Here is some info')).toBeInTheDocument();
});

it('should show a warning toast with the correct message', () => {
  renderWithProvider();

  act(() => {
    fireEvent.click(screen.getByTestId('trigger-warning'));
  });

  expect(screen.getByTestId('toast-content')).toBeInTheDocument();
  expect(screen.getByText('Be careful')).toBeInTheDocument();
});

it('should show a progress bar for non-error toasts', () => {
  renderWithProvider();

  act(() => {
    fireEvent.click(screen.getByTestId('trigger-success'));
  });

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

it('should not show a progress bar for error toasts', () => {
  renderWithProvider();

  act(() => {
    fireEvent.click(screen.getByTestId('trigger-error'));
  });

  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});

it('should keep the toast open when the page outside it is clicked', async () => {
  renderWithProvider();

  act(() => {
    fireEvent.click(screen.getByTestId('trigger-success'));
  });

  expect(screen.getByTestId('toast-content')).toBeInTheDocument();

  act(() => {
    fireEvent.mouseDown(document.body);
    fireEvent.mouseUp(document.body);
    fireEvent.click(document.body);
  });

  await waitFor(() => {
    expect(screen.getByTestId('toast-content')).toBeInTheDocument();
  });
});

it('should dismiss the toast when the close button is clicked', async () => {
  renderWithProvider();

  act(() => {
    fireEvent.click(screen.getByTestId('trigger-success'));
  });

  expect(screen.getByTestId('toast-content')).toBeInTheDocument();

  act(() => {
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
  });

  await waitFor(() => {
    expect(screen.queryByTestId('toast-content')).not.toBeInTheDocument();
  });
});

it('should throw if useToast is used outside of ToastProvider', () => {
  const ThrowingComponent = () => {
    useToast();
    return null;
  };

  expect(() => render(<ThrowingComponent />)).toThrow(
    'useToast must be used within a ToastProvider',
  );
});
