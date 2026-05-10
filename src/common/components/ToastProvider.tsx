import {
  Alert,
  LinearProgress,
  Snackbar,
  type SnackbarCloseReason,
} from '@mui/material';
import {
  type ReactNode,
  type SyntheticEvent,
  useCallback,
  useReducer,
  useState,
} from 'react';
import { ToastContext } from '../context/ToastContext';
import { ToastContent } from './ToastContent';

type ToastSeverity = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  message: string;
  title?: string;
  severity: ToastSeverity;
  open: boolean;
}

type ToastAction =
  | { type: 'SHOW'; message: string; title?: string; severity: ToastSeverity }
  | { type: 'HIDE' };

const toastReducer = (state: Toast, action: ToastAction): Toast => {
  switch (action.type) {
    case 'SHOW':
      return {
        message: action.message,
        title: action.title,
        severity: action.severity,
        open: true,
      };
    case 'HIDE':
      return { ...state, open: false };
    default:
      return state;
  }
};

const initialState: Toast = { message: '', severity: 'info', open: false };

interface ToastProviderProps {
  children: ReactNode;
}

const TOAST_DURATION = 5000;

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, dispatch] = useReducer(toastReducer, initialState);
  const [toastKey, setToastKey] = useState(0);

  const show = useCallback(
    (message: string, severity: ToastSeverity, title?: string) => {
      setToastKey((k) => k + 1);
      dispatch({ type: 'SHOW', message, title, severity });
    },
    [],
  );

  const success = useCallback(
    (message: string, title?: string) => show(message, 'success', title),
    [show],
  );
  const error = useCallback(
    (message: string, title?: string) => show(message, 'error', title),
    [show],
  );
  const info = useCallback(
    (message: string, title?: string) => show(message, 'info', title),
    [show],
  );
  const warning = useCallback(
    (message: string, title?: string) => show(message, 'warning', title),
    [show],
  );

  const handleClose = useCallback(() => {
    dispatch({ type: 'HIDE' });
  }, []);

  const handleSnackbarClose = useCallback(
    (_event: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
      if (reason !== 'timeout') {
        return;
      }

      handleClose();
    },
    [handleClose],
  );

  return (
    <ToastContext.Provider value={{ success, error, info, warning }}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={toast.severity === 'error' ? null : TOAST_DURATION}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={toast.severity} variant='filled'>
          <ToastContent message={toast.message} title={toast.title} />
          {toast.severity !== 'error' && (
            <LinearProgress
              key={toastKey}
              variant='determinate'
              value={100}
              sx={{
                mt: 1,
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                backgroundColor: 'rgba(255,255,255,0.3)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  transformOrigin: 'left',
                  transform: 'none !important',
                  width: '100%',
                  animation: `toast-shrink ${TOAST_DURATION}ms linear forwards`,
                },
                '@keyframes toast-shrink': {
                  from: { width: '100%' },
                  to: { width: '0%' },
                },
              }}
            />
          )}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};
