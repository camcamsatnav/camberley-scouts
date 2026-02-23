import { useTranslation } from 'react-i18next';
import { PageHeading } from '../../common/components/PageHeading';
import { GOOGLE_MAPS_EMBED_URL } from '../constants';
import { ContactForm } from './ContactForm';

import '../less/contactPageView.less';

export const ContactPageView = () => {

  const { t } = useTranslation();

  return (
    <div className='contact-page' data-testid='contact-page'>
      <PageHeading title={t('aboutUs.contact.title')} />
      <div className='contact-page__content'>
        <div className='contact-page__content__info'>
          <span className='contact-page__content__info__title' data-testid='contact-page-title'>
            {t('aboutUs.contact.info.line1')}
          </span>
          <span className='contact-page__content__info__text' data-testid='contact-page-text'>
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
        <ContactForm />
      </div>
    </div>
  );
};
