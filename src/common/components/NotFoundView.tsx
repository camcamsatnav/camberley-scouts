import CarCrash from '@mui/icons-material/CarCrash';
import { useTranslation } from 'react-i18next';
import { PagePlaceholder } from './PagePlaceholder';

export const NotFoundView = () => {
  const { t } = useTranslation();

  return (
    <PagePlaceholder
      icon={<CarCrash sx={{ color: 'var(--red);' }} />}
      mainText={t('notFound.title')}
      subText={t('notFound.body')}
    />
  );
};
