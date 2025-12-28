import { Button, Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';

import '../less/homePageView.less';

export const HomePageView = () => {

  const { t } = useTranslation();

  return (
    <div className='home-page' data-testid='home-page'>
      <div className='home-page__top-section'>

        <div className='home-page__kayak'>
          <img
            src='/kayaks.png'
            alt='Children in kayaks'
            width={608}
            height={280}
            data-testid='intro-image'
          />
        </div>
        <div className='home-page__intro' data-testid='intro-text'>
          <div className='line-1'>{t('home.welcome.title')}</div>
          <div className='line-2'>{t('home.welcome.subtitle')}</div>
          <div className='buttons'>
            <Button color='primary' variant='contained' size='large' data-testid='join-button'>
              {t('home.buttons.join')}
            </Button>
            <Button color='primary' variant='contained' size='large' data-testid='volunteer-button'>
              {t('home.buttons.volunteer')}
            </Button>
          </div>
        </div>
      </div>
      <div className='home-page__bottom-section'>
        <Card className='home-page-card' data-testid='intro-card'>
          <CardContent>
            <div className='card-header'>{t('home.intro.title')}</div>
            <div className='card-body'>
              <div className='card-text'>{t('home.intro.line1')}</div>
              <div className='card-text'>{t('home.intro.line2')}</div>
              <div className='card-text'>{t('home.intro.line3')}</div>
            </div>
          </CardContent>
        </Card>
        <Card className='home-page-card' data-testid='beavers-card'>
          <CardContent>
            <div className='card-header'>{t('home.cards.title')}</div>
            <img className='card-image' src='/beavers.png' alt='beavers logo' width={200} height={75} />
            <div className='card-caption'>{t('home.cards.age.beavers')}</div>
          </CardContent>
        </Card>
        <Card className='home-page-card' data-testid='cubs-card'>
          <CardContent>
            <div className='card-header'>{t('home.cards.title')}</div>
            <img className='card-image' src='/cubs.png' alt='cubs logo' width={200} height={75} />
            <div className='card-caption'>{t('home.cards.age.cubs')}</div>
          </CardContent>
        </Card>
        <Card className='home-page-card' data-testid='scouts-card'>
          <CardContent>
            <div className='card-header'>{t('home.cards.title')}</div>
            <img className='card-image' src='/scouts.png' alt='scouts logo' width={200} height={75} />
            <div className='card-caption'>{t('home.cards.age.scouts')}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
