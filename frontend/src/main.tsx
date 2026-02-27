import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { ToastProvider } from './common/components/ToastProvider';
import { App } from './App.tsx';
import './i18n/i18n';

import './index.less';

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: { main: '#2A6432' }, // --green
    secondary: { main: '#7C3DEF' }, // --purple
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ToastProvider>
          <App />
        </ToastProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
