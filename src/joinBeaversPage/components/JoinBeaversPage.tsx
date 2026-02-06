import { useTranslation } from 'react-i18next';
import { PageHeading } from '../../common/components/PageHeading';
import { BEAVERS_LOCATION_ONE, BEAVERS_LOCATION_TWO } from '../constants';
import { LocationCard } from './LocationCard';

import '../less/joinBeaversPage.less';

export const JoinBeaversPage = () => {

  const { t } = useTranslation();

  return (
    <div className='join-beavers-page' data-testid='join-beavers-page'>
      <PageHeading title={t('join.beavers.title')} />
      <div className='join-beavers-page-top'>
        <div className='join-beavers-page-top__cards'>
          <LocationCard {...BEAVERS_LOCATION_ONE} />
          <LocationCard {...BEAVERS_LOCATION_TWO} />
        </div>
      </div>
    </div>
  );
};
