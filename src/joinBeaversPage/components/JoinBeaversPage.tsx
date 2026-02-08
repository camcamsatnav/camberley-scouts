import { Card, CardContent, CardHeader } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PageHeading } from '../../common/components/PageHeading';
import { BEAVERS_LOCATION_ONE, BEAVERS_LOCATION_TWO } from '../constants';
import { LocationCard } from './LocationCard';

import '../less/joinBeaversPage.less';

export const JoinBeaversPage = () => {

  const { t } = useTranslation();

  const activityLines = t('join.beavers.info.activities.items', { returnObjects: true }) as string[];

  return (
    <div className='join-beavers-page' data-testid='join-beavers-page'>
      <PageHeading title={t('join.beavers.title')} />
      <div className='join-beavers-page__content'>
        <div className='join-beavers-page__content__cards'>
          <LocationCard {...BEAVERS_LOCATION_ONE} />
          <LocationCard {...BEAVERS_LOCATION_TWO} />
        </div>
        <div className='join-beavers-page__content__information' data-testid='beavers-info'>
          <ul className='join-beavers-page__content__information__list' data-testid='beavers-info-list'>
            <li>{t('join.beavers.info.line1')}</li>
            <li>{t('join.beavers.info.line2')}</li>
          </ul>
          <Card className='join-beavers-page__content__information__card' data-testid='beavers-info-card'>
            <CardHeader
              className='join-beavers-page__content__information__card__header'
              title={t('join.beavers.info.activities.title')}
            />
            <CardContent className='join-beavers-page__content__information__card__content'>
              <ul>
                {activityLines.map((line, i) => (
                  <li key={`activity-line-${i}`}>{line}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
