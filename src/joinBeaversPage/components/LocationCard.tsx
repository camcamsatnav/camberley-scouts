import { OpenInNew } from '@mui/icons-material';
import { Card, CardContent, CardHeader } from '@mui/material';
import { useTranslation } from 'react-i18next';

import '../less/locationCard.less';

export interface LocationCardProps {
  title: string; // i18n key
  sessionTimes: string; // i18n key
  addressLines: string; // i18n key
  googleMapsLink: string;
  spacesAvailable: boolean;
}

export const LocationCard = ({
  title,
  sessionTimes,
  addressLines,
  googleMapsLink,
  spacesAvailable,
}: LocationCardProps) => {

  const { t } = useTranslation();

  const parsedAddressLines = t(addressLines, { returnObjects: true }) as string[];

  return (
    <Card className='location-card' data-testid='location-card'>
      <CardHeader title={t(title)} className='location-card__header' data-testid='location-card-title' />
      <CardContent className='location-card__content'>
        <div className='location-card__date'>
          <div className='location-card-title'>{t('join.common.schedule')}</div>
          <div className='location-card-body' data-testid='location-card-date'>{t(sessionTimes)}</div>
        </div>

        <div className='location-card__location'>
          <div className='location-card-title'>{t('join.common.location')}</div>
          <div className='location-card-body' data-testid='location-card-address'>
            {parsedAddressLines.map((line, i) => (
              <div key={`${title}-${i}`}>{line}</div>
            ))}
          </div>
          <a
            className='location-card-link'
            href={googleMapsLink}
            target='_blank'
            rel='noopener noreferrer'
            data-testid='location-card-link'
            aria-label={`${t('join.common.maps')} (opens in new tab)`}
          >
            <OpenInNew className='location-card-link__icon' />
            <div className='location-card-link__text'>{t('join.common.maps')}</div>
          </a>
        </div>

        <div className='location-card__spaces' data-testid='location-card-spaces'>
          <div className='location-card-title'>{t('join.common.spaces')}</div>
          <div className='location-card-body'>{spacesAvailable ? t('common.yes') : t('common.no')}</div>
        </div>
      </CardContent>
    </Card>
  );
};
