import { useTranslation } from 'react-i18next';
import { PageHeading } from '../../common/components/PageHeading';
import {
  IMPROVEMENTS_CARD_IMAGE_PATH,
  PROGRESS_CARD_IMAGE_PATH,
  RENOVATED_HUT_IMAGE_PATH,
  REOPENING_CARD_IMAGE_PATH,
} from '../constants';
import { HutRenovationCard } from './HutRenovationCard';

import '../less/hutRenovationPage.less';

export const HutRenovationPage = () => {

  const { t } = useTranslation();

  const improvementsList = () => (
    <ul>
      <li>{t('aboutUs.hutRenovation.card3.list1')}</li>
      <li>{t('aboutUs.hutRenovation.card3.list2')}</li>
      <li>{t('aboutUs.hutRenovation.card3.list3')}</li>
      <li>{t('aboutUs.hutRenovation.card3.list4')}</li>
      <li>{t('aboutUs.hutRenovation.card3.list5')}</li>
    </ul>
  );

  return (
    <div className='hut-renovation-page' data-testid='hut-renovation-page'>
      <PageHeading title={t('aboutUs.hutRenovation.title')} />
      <div className='hut-renovation-page__image' data-testid='hut-renovation-page-image'>
        <img src={RENOVATED_HUT_IMAGE_PATH} alt='Picture of renovated scout hut' />
      </div>
      <div className='hut-renovation-page__description'>{t('aboutUs.hutRenovation.description')}</div>
      <div className='hut-renovation-page__cards'>
        <HutRenovationCard
          title={t('aboutUs.hutRenovation.card1.title')}
          mainImagePath={REOPENING_CARD_IMAGE_PATH}
          description={t('aboutUs.hutRenovation.card1.description')}
        />
        <HutRenovationCard
          title={t('aboutUs.hutRenovation.card2.title')}
          mainImagePath={PROGRESS_CARD_IMAGE_PATH}
          description={t('aboutUs.hutRenovation.card2.description')}
        />
        <HutRenovationCard
          title={t('aboutUs.hutRenovation.card3.title')}
          mainImagePath={IMPROVEMENTS_CARD_IMAGE_PATH}
          description={improvementsList()}
        />
      </div>
    </div>
  );
};
