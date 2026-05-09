import { useSearch } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { PageHeading } from '../../common/components/PageHeading';
import { GOOGLE_MAPS_EMBED_URL, RecipientTypes } from '../constants';
import { ContactForm } from './ContactForm';

import '../less/contactPageView.less';

const recipientTypeSchema = z.enum(Object.values(RecipientTypes));

export const ContactPageView = () => {
  const { t } = useTranslation();

  const search = useSearch({ strict: false });

  const queryParam = recipientTypeSchema
    .catch(RecipientTypes.GENERAL)
    .parse(search.query);

  return (
    <div className='contact-page' data-testid='contact-page'>
      <PageHeading title={t('aboutUs.contact.title')} />
      <div className='contact-page__content'>
        <div className='contact-page__content__info'>
          <span
            className='contact-page__content__info__title'
            data-testid='contact-page-title'
          >
            {t('aboutUs.contact.info.line1')}
          </span>
          <span
            className='contact-page__content__info__text'
            data-testid='contact-page-text'
          >
            {t('aboutUs.contact.info.line2')}
          </span>
          <iframe
            src={GOOGLE_MAPS_EMBED_URL}
            className='contact-page__content__info__map'
            title='Camberley 478 Scout Group location map'
            allowFullScreen
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            data-testid='contact-page-map'
          />
        </div>
        <ContactForm defaultQuery={queryParam} />
      </div>
    </div>
  );
};
