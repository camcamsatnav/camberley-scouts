import { Button, Card, CardContent, CardHeader } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PageHeading } from '../../common/components/PageHeading';
import { BEAVERS_LOCATION_ONE, BEAVERS_LOCATION_TWO } from '../constants';
import { BEAVERS_IMAGE_PATH } from '../../HomePage/constants';
import { LocationCard } from './LocationCard';

import '../less/joinBeaversPage.less';

export const JoinBeaversPage = () => {

  const { t } = useTranslation();

  const activityLines = t('join.beavers.info.activities.items', { returnObjects: true }) as string[];

  return (
    <div className='join-beavers-page' data-testid='join-beavers-page'>
      <PageHeading title={t('join.beavers.title')} />
      <div className='join-beavers-page__content'>
        <div className='join-beavers-page__content__top'>
          <div className='join-beavers-page__content__top__info'>
            <p className='join-beavers-page__content__top__info__text'>{t('join.beavers.intro.title')}</p>
            <div className='join-beavers-page__content__top__info__logo'>
              <img
                src={BEAVERS_IMAGE_PATH}
                alt='Beavers logo and age range'
                width={200}
                height={75}
                data-testid='beavers-logo-image'
              />
              <p className='join-beavers-page__content__top__info__logo__age'>{t('join.beavers.intro.age')}</p>
            </div>
            <div className='join-beavers-page__content__top__info__button'>
              <Button
                color='secondary'
                variant='contained'
                size='large'
                data-testid='beavers-join-button'
              >
                {t('home.buttons.join')}
              </Button>
            </div>
          </div>
          <div className='join-beavers-page__content__top__cards'>
            <LocationCard {...BEAVERS_LOCATION_ONE} />
            <LocationCard {...BEAVERS_LOCATION_TWO} />
          </div>
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
