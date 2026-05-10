import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { HttpError } from '../../common/errors/HttpError';
import { useContactFormSubmit } from './useContactFormSubmit';

const mockPost = vi.fn();
const mockSuccess = vi.fn();
const mockError = vi.fn();

const RATE_LIMIT_STATUS = 429;
const SERVER_ERROR_STATUS = 500;

vi.mock('../../common/hooks/usePost', () => ({
  usePost: () => ({
    post: mockPost,
    data: undefined,
    loading: false,
  }),
}));

vi.mock('../../common/hooks/useToast', () => ({
  useToast: () => ({
    success: mockSuccess,
    error: mockError,
    info: vi.fn(),
    warning: vi.fn(),
  }),
}));

const validFormData = {
  name: 'Jane Smith',
  recipientType: 'GENERAL' as const,
  senderEmail: 'jane@example.com',
  body: 'Hello, I have a question.',
  sendCopy: false,
};

describe('useContactFormSubmit', () => {
  beforeEach(() => {
    mockPost.mockReset();
    mockSuccess.mockReset();
    mockError.mockReset();
  });

  it('returns submitContactForm', () => {
    const { result } = renderHook(() => useContactFormSubmit());

    expect(result.current.submitContactForm).toBeTypeOf('function');
  });

  it('returns data from usePost', () => {
    const { result } = renderHook(() => useContactFormSubmit());

    expect(result.current.data).toBeUndefined();
  });

  it('returns loading from usePost', () => {
    const { result } = renderHook(() => useContactFormSubmit());

    expect(result.current.loading).toBe(false);
  });

  it('posts the form data to the contact endpoint', async () => {
    mockPost.mockResolvedValue(undefined);
    const { result } = renderHook(() => useContactFormSubmit());

    await result.current.submitContactForm(validFormData);

    expect(mockPost).toHaveBeenCalledWith('/contact', validFormData);
  });

  it('shows the success toast on successful submission', async () => {
    mockPost.mockResolvedValue(undefined);
    const { result } = renderHook(() => useContactFormSubmit());

    await result.current.submitContactForm(validFormData);

    expect(mockSuccess).toHaveBeenCalledWith(
      'Your message has been sent successfully.',
      'Form submitted',
    );
  });

  it('does not show the error toast on successful submission', async () => {
    mockPost.mockResolvedValue(undefined);
    const { result } = renderHook(() => useContactFormSubmit());

    await result.current.submitContactForm(validFormData);

    expect(mockError).not.toHaveBeenCalled();
  });

  it('shows the rate limit toast for a 429 HttpError', async () => {
    mockPost.mockRejectedValue(
      new HttpError(RATE_LIMIT_STATUS, 'Too Many Requests'),
    );
    const { result } = renderHook(() => useContactFormSubmit());

    await result.current.submitContactForm(validFormData);

    expect(mockError).toHaveBeenCalledWith(
      'You have submitted this form too many times, please try again later.',
      'Failed to submit form',
    );
  });

  it('does not show the success toast for a 429 HttpError', async () => {
    mockPost.mockRejectedValue(
      new HttpError(RATE_LIMIT_STATUS, 'Too Many Requests'),
    );
    const { result } = renderHook(() => useContactFormSubmit());

    await result.current.submitContactForm(validFormData);

    expect(mockSuccess).not.toHaveBeenCalled();
  });

  it('shows the generic error toast for a non-429 HttpError', async () => {
    mockPost.mockRejectedValue(
      new HttpError(SERVER_ERROR_STATUS, 'Internal Server Error'),
    );
    const { result } = renderHook(() => useContactFormSubmit());

    await result.current.submitContactForm(validFormData);

    expect(mockError).toHaveBeenCalledWith(
      'Something went wrong, please try again later.',
      'Failed to submit form',
    );
  });

  it('does not show the success toast for a non-429 HttpError', async () => {
    mockPost.mockRejectedValue(
      new HttpError(SERVER_ERROR_STATUS, 'Internal Server Error'),
    );
    const { result } = renderHook(() => useContactFormSubmit());

    await result.current.submitContactForm(validFormData);

    expect(mockSuccess).not.toHaveBeenCalled();
  });

  it('shows the generic error toast for a non-HttpError', async () => {
    mockPost.mockRejectedValue(new Error('Network error'));
    const { result } = renderHook(() => useContactFormSubmit());

    await result.current.submitContactForm(validFormData);

    expect(mockError).toHaveBeenCalledWith(
      'Something went wrong, please try again later.',
      'Failed to submit form',
    );
  });

  it('does not show the success toast for a non-HttpError', async () => {
    mockPost.mockRejectedValue(new Error('Network error'));
    const { result } = renderHook(() => useContactFormSubmit());

    await result.current.submitContactForm(validFormData);

    expect(mockSuccess).not.toHaveBeenCalled();
  });
});
