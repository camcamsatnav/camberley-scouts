import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { TanStackDevtools } from '@tanstack/react-devtools';
import type { QueryClient } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import type { ReactNode } from 'react';
import { Footer } from '#/common/components/Footer';
import { Navbar } from '#/common/components/Navbar';
import { NotFoundView } from '#/common/components/NotFoundView';
import { ToastProvider } from '#/common/components/ToastProvider';
import { theme } from '#/setup/theme';
import '../i18n/i18n';
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools';
import appCss from '../styles.css?url';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Camberley 478 Scout Group',
      },
      {
        name: 'description',
        content: 'Camberley 478 Scout Group website',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFoundView,
});

const Providers = ({ children }: { children: ReactNode }) => {
  const emotionCache = createCache({ key: 'css' });

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastProvider>{children}</ToastProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <HeadContent />
      </head>
      <body>
        <Providers>
          <div className='main-container' data-testid='main-container'>
            <Navbar />
            <main className='content' data-testid='content'>
              {children}
            </main>
            <Footer />
          </div>
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
              TanStackQueryDevtools,
            ]}
          />
        </Providers>
        <Scripts />
      </body>
    </html>
  );
}
