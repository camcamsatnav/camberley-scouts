import { useTranslation } from 'react-i18next';
import { PageHeading } from '../../common/components/PageHeading';
import { JOIN_BEAVERS_IMAGES, JOIN_BEAVERS_LOCATIONS, JOIN_BEAVERS_LOGO } from '../constants';
import { JoinImages } from './JoinImages';
import { JoinInformation } from './JoinInformation';
import { JoinIntro } from './JoinIntro';

import '../less/joinBeaversPage.less';

export const JoinBeaversPage = () => {

  const { t } = useTranslation();

  const textLines = t('join.beavers.info.text', { returnObjects: true }) as string[];

  const activityLines = t('join.beavers.info.activities.items', { returnObjects: true }) as string[];

  return (
    <div className='join-beavers-page' data-testid='join-beavers-page'>
      <PageHeading title={t('join.beavers.title')} />
      <div className='join-beavers-page__content'>
        <JoinIntro
          title={t('join.beavers.intro.title')}
          image={JOIN_BEAVERS_LOGO}
          ageRange={t('join.beavers.intro.age')}
          locations={JOIN_BEAVERS_LOCATIONS}
        />
        <JoinInformation textLines={textLines} activityLines={activityLines} />
        <JoinImages images={JOIN_BEAVERS_IMAGES} />
      </div>
    </div>
  );
};
