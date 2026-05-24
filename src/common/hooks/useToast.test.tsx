import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { ToastContext, type ToastContextValue } from '../context/ToastContext';
import { useToast } from './useToast';

const mockContextValue: ToastContextValue = {
  success: () => {},
  error: () => {},
  info: () => {},
  warning: () => {},
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <ToastContext.Provider value={mockContextValue}>
    {children}
  </ToastContext.Provider>
);

describe('useToast', () => {
  it('returns the context value when used within a ToastProvider', () => {
    const { result } = renderHook(() => useToast(), { wrapper });

    expect(result.current).toBe(mockContextValue);
  });

  it('throws when used outside of a ToastProvider', () => {
    expect(() => renderHook(() => useToast())).toThrow(
      'useToast must be used within a ToastProvider',
    );
  });
});
