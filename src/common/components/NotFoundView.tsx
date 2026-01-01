import { useTranslation } from 'react-i18next';

import '../less/notFoundView.less';

export const NotFoundView = () => {

  const { t } = useTranslation();

  return (
    <div className='not-found-view' data-testid='not-found-view'>
      <div className='not-found-view__title'>{t('notFound.title')}</div>
      <div className='not-found-view__body'>{t('notFound.body')}</div>
    </div>
  );
};
