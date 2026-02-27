import '../less/toastContent.less';

interface ToastContentProps {
  message: string;
  title?: string;
}

export const ToastContent = ({ message, title }: ToastContentProps) => (
  <div className='toast-content' data-testid='toast-content'>
    <div className='toast-content__title'>{title ?? message}</div>
    {!!title && <div className='toast-content__body'>{message}</div>}
  </div>
);
