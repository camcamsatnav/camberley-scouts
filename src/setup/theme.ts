import { createTheme } from '@mui/material';

export const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: '"Roboto Variable", Roboto, Arial, sans-serif',
  },
  palette: {
    primary: { main: '#2A6432' },
    secondary: { main: '#7C3DEF' },
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
