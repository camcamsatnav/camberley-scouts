import Agriculture from '@mui/icons-material/Agriculture';
import { useTranslation } from 'react-i18next';
import { PagePlaceholder } from './PagePlaceholder';

export const NotImplementedView = () => {

  const { t } = useTranslation();

  return (
    <PagePlaceholder
      icon={<Agriculture sx={{ color: 'var(--purple)' }} />}
      mainText={t('notImplemented.title')}
      subText={t('notImplemented.body')}
    />
  );
};
