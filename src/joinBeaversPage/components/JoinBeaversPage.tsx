import { useTranslation } from 'react-i18next';
import { PageHeading } from '../../common/components/PageHeading';

import '../less/joinBeaversPage.less';

export const JoinBeaversPage = () => {

  const { t } = useTranslation();

  return (
    <div className='join-beavers-page' data-testid='join-beavers-page'>
      <PageHeading title={t('join.beavers.title')} />
      <div className='join-beavers-page__top'></div>
    </div>
  );
};
