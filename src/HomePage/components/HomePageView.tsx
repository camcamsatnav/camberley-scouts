import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
} from '@mui/material';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import {
  BEAVERS_IMAGE_PATH,
  CUBS_IMAGE_PATH,
  HOME_PAGE_IMAGE_PATH,
  SCOUTS_IMAGE_PATH,
} from '../constants';

import '../less/homePageView.less';

export const HomePageView = () => {
  const { t } = useTranslation();

  const descriptionLines = t('home.intro.description', {
    returnObjects: true,
  }) as string[];

  return (
    <div className='home-page' data-testid='home-page'>
      <div className='home-page__top-section'>
        <div className='home-page__top-section__kayak'>
          <img
            src={HOME_PAGE_IMAGE_PATH}
            alt='Children in kayaks'
            width={608}
            height={280}
            data-testid='intro-image'
          />
        </div>
        <div className='home-page__intro' data-testid='intro-text'>
          <div className='home-page__intro__title'>
            {t('home.welcome.title')}
          </div>
          <div className='home-page__intro__subtitle'>
            {t('home.welcome.subtitle')}
          </div>
          <div className='home-page__intro__buttons'>
            <Button
              component={Link}
              to='/about-us/contact'
              color='primary'
              variant='contained'
              size='large'
              data-testid='join-button'
            >
              {t('home.buttons.join')}
            </Button>
            <Button
              color='primary'
              variant='contained'
              size='large'
              data-testid='volunteer-button'
            >
              {t('home.buttons.volunteer')}
            </Button>
          </div>
        </div>
      </div>
      <div className='home-page__bottom-section'>
        <Card className='home-page-card' data-testid='intro-card'>
          <CardHeader title={t('home.intro.title')} />
          <CardContent className='home-page-card__text-content'>
            {descriptionLines.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </CardContent>
        </Card>
        <Card className='home-page-card' data-testid='beavers-card'>
          <CardActionArea component={Link} to='/beavers'>
            <CardHeader title={t('home.cards.title')} />
            <CardContent className='home-page-card__content'>
              <CardMedia component='img' image={BEAVERS_IMAGE_PATH} />
              {t('home.cards.age.beavers')}
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className='home-page-card' data-testid='cubs-card'>
          <CardActionArea component={Link} to='/cubs'>
            <CardHeader title={t('home.cards.title')} />
            <CardContent className='home-page-card__content'>
              <CardMedia component='img' image={CUBS_IMAGE_PATH} />
              {t('home.cards.age.cubs')}
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className='home-page-card' data-testid='scouts-card'>
          <CardActionArea component={Link} to='/scouts'>
            <CardHeader title={t('home.cards.title')} />
            <CardContent className='home-page-card__content'>
              <CardMedia component='img' image={SCOUTS_IMAGE_PATH} />
              {t('home.cards.age.scouts')}
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
};
