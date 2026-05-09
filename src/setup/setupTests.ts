import '@testing-library/jest-dom/vitest';
import { createElement, type ReactNode } from 'react';
import { vi } from 'vitest';
import en from '../i18n/locales/en.json';

const resolveKey = (key: string) => {
  try {
    return (
      key
        .split('.')
        .reduce<unknown>(
          (acc, part) =>
            acc && typeof acc === 'object'
              ? (acc as Record<string, unknown>)[part]
              : undefined,
          en,
        ) ?? key
    );
  } catch {
    return key;
  }
};

const translate = (key: string, opts?: Record<string, unknown>) => {
  let value = resolveKey(key);

  if (
    opts &&
    typeof opts === 'object' &&
    Object.hasOwn(opts, 'returnObjects') &&
    opts.returnObjects
  ) {
    return value ?? key;
  }

  if (opts && typeof opts === 'object') {
    value = String(value).replace(/{{\s*(\w+)\s*}}/g, (_, p) =>
      String(opts[p] ?? `{{${p}}}`),
    );
  }

  return String(value);
};

vi.mock('react-i18next', () => {
  return {
    useTranslation: () => ({
      t: translate,
      i18n: {
        changeLanguage: async () => Promise.resolve(),
        language: 'en',
      },
    }),
    Trans: ({ children }: { children: ReactNode }) => children,
    initReactI18next: {},
  };
});

vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-router')>(
    '@tanstack/react-router',
  );

  return {
    ...actual,
    Link: ({
      children,
      search,
      to,
      ...props
    }: {
      children: ReactNode;
      search?: Record<string, string>;
      to?: string;
    }) => {
      const params = search ? `?${new URLSearchParams(search).toString()}` : '';

      return createElement(
        'a',
        { ...props, href: `${to ?? ''}${params}` },
        children,
      );
    },
    useLocation: () => ({ pathname: '/' }),
    useSearch: () => ({ query: 'GENERAL' }),
  };
});
