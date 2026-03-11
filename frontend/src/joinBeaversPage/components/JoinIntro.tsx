import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { ROUTES } from '../../common/constants';
import { type RecipientType } from '../../contactPage/constants';
import type { FileImage } from '../../common/types';
import { LocationCard, type LocationCardProps } from './LocationCard';

import '../less/joinIntro.less';

interface JoinIntroProps {
  title: string;
  image: FileImage;
  ageRange: string;
  locations: LocationCardProps[];
  recipientType: RecipientType
}

export const JoinIntro = ({ title, image, ageRange, locations, recipientType }: JoinIntroProps) => {

  const { t } = useTranslation();

  return (
    <div className='join-intro' data-testid='join-intro'>
      <div className='join-intro__info'>
        <p className='join-intro__info__text' data-testid='join-intro-title'>{title}</p>
        <div className='join-intro__info__logo'>
          <img
            src={image.src}
            alt={image.alt}
            width={200}
            height={75}
            data-testid='join-logo'
          />
          <p className='join-intro__info__logo__age'>{ageRange}</p>
        </div>
        <div className='join-intro__info__button'>
          <Button
            component={Link} to={{ pathname: ROUTES.ABOUT.CONTACT, search: `?query=${recipientType}` }}
            color='secondary'
            variant='contained'
            size='large'
            data-testid='join-button'
          >
            {t('join.common.join')}
          </Button>
        </div>
      </div>
      <div className='join-intro__cards'>
        {locations.map((location, i) => (
          <LocationCard key={`location-card-${i}`} {...location} />
        ))}
      </div>
    </div>
  );
};
