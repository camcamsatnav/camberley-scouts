import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { HttpError } from '../../common/errors/HttpError';
import { useContactFormSubmit } from './useContactFormSubmit';

const mockPost = vi.fn();
const mockSuccess = vi.fn();
const mockError = vi.fn();

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

  it('should return submitContactForm, data, and loading', () => {
    const { result } = renderHook(() => useContactFormSubmit());

    expect(result.current.submitContactForm).toBeTypeOf('function');
    expect(result.current.data).toBeUndefined();
    expect(result.current.loading).toBe(false);
  });

  it('should call post with the correct path and form data', async () => {
    mockPost.mockResolvedValue(undefined);
    const { result } = renderHook(() => useContactFormSubmit());

    await result.current.submitContactForm(validFormData);

    expect(mockPost).toHaveBeenCalledOnce();
    expect(mockPost).toHaveBeenCalledWith('/contact', validFormData);
  });

  it('should call success toast and not error toast on successful submission', async () => {
    mockPost.mockResolvedValue(undefined);
    const { result } = renderHook(() => useContactFormSubmit());

    await result.current.submitContactForm(validFormData);

    expect(mockSuccess).toHaveBeenCalledOnce();
    expect(mockSuccess).toHaveBeenCalledWith(
      'Your message has been sent successfully.',
      'Form submitted',
    );
    expect(mockError).not.toHaveBeenCalled();
  });

  it('should call rate limit error toast and not generic error toast when a 429 HttpError is thrown', async () => {
    mockPost.mockRejectedValue(new HttpError(429, 'Too Many Requests'));
    const { result } = renderHook(() => useContactFormSubmit());

    await result.current.submitContactForm(validFormData);

    expect(mockError).toHaveBeenCalledOnce();
    expect(mockError).toHaveBeenCalledWith(
      'You have submitted this form too many times, please try again later.',
      'Failed to submit form',
    );
    expect(mockSuccess).not.toHaveBeenCalled();
  });

  it('should call generic error toast and not success toast when a non-429 HttpError is thrown', async () => {
    mockPost.mockRejectedValue(new HttpError(500, 'Internal Server Error'));
    const { result } = renderHook(() => useContactFormSubmit());

    await result.current.submitContactForm(validFormData);

    expect(mockError).toHaveBeenCalledOnce();
    expect(mockError).toHaveBeenCalledWith(
      'Something went wrong, please try again later.',
      'Failed to submit form',
    );
    expect(mockSuccess).not.toHaveBeenCalled();
  });

  it('should call generic error toast and not success toast when a non-HttpError is thrown', async () => {
    mockPost.mockRejectedValue(new Error('Network error'));
    const { result } = renderHook(() => useContactFormSubmit());

    await result.current.submitContactForm(validFormData);

    expect(mockError).toHaveBeenCalledOnce();
    expect(mockError).toHaveBeenCalledWith(
      'Something went wrong, please try again later.',
      'Failed to submit form',
    );
    expect(mockSuccess).not.toHaveBeenCalled();
  });
});
