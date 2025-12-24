import { useTranslation } from 'react-i18next';
import { ScoutsStackIcon } from '../icons/ScoutsStackIcon';

import '../less/footer.less';

export const Footer = () => {

  const { t } = useTranslation();

  return (
    <div className='footer' data-testid='footer'>
      <ScoutsStackIcon />
      <span className='footer__address' data-testid='footer-address'>
        <div>{t('footer.address1')}</div>
        <div>{t('footer.address2')}</div>
      </span>
      <span className='footer__charity' data-testid='footer-charity'>
        {t('footer.charity')}
      </span>
    </div>
  );
};
