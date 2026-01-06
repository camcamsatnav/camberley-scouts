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

type RouterLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  to?: string | Record<string, unknown>;
  children?: React.ReactNode;
};

vi.mock('react-router-dom', () => {
  return {
    BrowserRouter: ({ children }: { children?: React.ReactNode }) => children ?? null,
    Routes: ({ children }: { children?: React.ReactNode }) => children ?? null,
    Route: ({ element }: { element?: React.ReactNode }) => element ?? null,
    Link: (props: RouterLinkProps) => {
      const { to, children, ...rest } = props;
      const href = typeof to === 'string' ? to : '';
      return React.createElement('a', { href, ...rest }, children);
    },
    NavLink: (props: RouterLinkProps) => {
      const { to, children, ...rest } = props;
      const href = typeof to === 'string' ? to : '';
      return React.createElement('a', { href, ...rest }, children);
    },
    useNavigate: () => () => {
    },
    useLocation: () => ({ pathname: '/', search: '', hash: '', state: null, key: 'test' }),
    useParams: () => ({}),
    useMatch: () => null,
  };
});

vi.mock('react-router', () => {
  return {
    BrowserRouter: ({ children }: { children?: React.ReactNode }) => children ?? null,
    Routes: ({ children }: { children?: React.ReactNode }) => children ?? null,
    Route: ({ element }: { element?: React.ReactNode }) => element ?? null,
    Link: (props: RouterLinkProps) => {
      const { to, children, ...rest } = props;
      const href = typeof to === 'string' ? to : '';
      return React.createElement('a', { href, ...rest }, children);
    },
    NavLink: (props: RouterLinkProps) => {
      const { to, children, ...rest } = props;
      const href = typeof to === 'string' ? to : '';
      return React.createElement('a', { href, ...rest }, children);
    },
    useNavigate: () => () => {
    },
    useLocation: () => ({ pathname: '/', search: '', hash: '', state: null, key: 'test' }),
    useParams: () => ({}),
    useMatch: () => null,
  };
});
