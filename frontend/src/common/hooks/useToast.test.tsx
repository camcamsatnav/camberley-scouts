import { renderHook } from '@testing-library/react';
import { type ReactNode } from 'react';
import { expect, it } from 'vitest';
import { ToastContext, type ToastContextValue } from '../context/ToastContext';
import { useToast } from './useToast';

const mockContextValue: ToastContextValue = {
  success: () => {
  },
  error: () => {
  },
  info: () => {
  },
  warning: () => {
  },
};

it('should return the context value when used within a ToastProvider', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <ToastContext.Provider value={mockContextValue}>{children}</ToastContext.Provider>
  );

  const { result } = renderHook(() => useToast(), { wrapper });

  expect(result.current).toBe(mockContextValue);
});

it('should throw when used outside of a ToastProvider', () => {
  expect(() => renderHook(() => useToast())).toThrow('useToast must be used within a ToastProvider');
});
