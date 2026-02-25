import type { ReactElement } from 'react';

import '../less/pagePlaceHolder.less';

interface PagePlaceholderProps {
  icon: ReactElement;
  mainText: string;
  subText?: string;
}

export const PagePlaceholder = ({ icon, mainText, subText }: PagePlaceholderProps) => {
  return (
    <div className='page-placeholder' data-testid='page-placeholder'>
      <div className='page-placeholder__icon' data-testid='page-placeholder-icon'>{icon}</div>
      <div className='page-placeholder__text'>{mainText}</div>
      {subText && <div className='page-placeholder__sub-text' data-testid='page-placeholder-subtext'>{subText}</div>}
    </div>
  );
};
