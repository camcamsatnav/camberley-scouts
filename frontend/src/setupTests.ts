import '@testing-library/jest-dom/vitest';
import React from 'react';
import { vi } from 'vitest';
import en from './i18n/locales/en.json';

const resolveKey = (key: string) => {
  try {
    // @ts-expect-error just a mock
    return key.split('.').reduce((acc: never, part) => (acc && acc[part] !== null ? acc[part] : undefined), en) ?? key;
  } catch {
    return key;
  }
};

const translate = (key: string, opts?: Record<string, unknown>) => {
  let value = resolveKey(key);
  // If the caller explicitly requested objects back from i18next, return the raw value (array/object) when available.
  if (opts && typeof opts === 'object' && Object.prototype.hasOwnProperty.call(
    opts,
    'returnObjects',
  ) && (opts as Record<string, unknown>).returnObjects) {
    // If value is undefined, fall back to the key string for compatibility.
    return value ?? key;
  }

  if (opts && typeof opts === 'object') {
    value = String(value).replace(
      /{{\s*(\w+)\s*}}/g,
      (_, p) => String((opts as Record<string, unknown>)[p] ?? `{{${p}}}`),
    );
  }
  return String(value);
};

// Global mock for react-i18next used throughout the app's components in tests.
vi.mock('react-i18next', () => {
  return {
    useTranslation: () => ({
      t: translate,
      i18n: {
        changeLanguage: async () => Promise.resolve(),
        language: 'en',
      },
    }),
    Trans: ({ children }: { children: React.ReactNode }) => children,
    initReactI18next: {},
  };
});
