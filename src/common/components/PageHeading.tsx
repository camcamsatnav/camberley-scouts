import { HomeFilled } from '@mui/icons-material';
import { Breadcrumbs, IconButton, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation } from 'react-router';

import '../less/pageHeading.less';

interface PageHeadingProps {
  title: string;
}

export const PageHeading = ({ title }: PageHeadingProps) => {

  const { t } = useTranslation();

  const location = useLocation();

  const paths = location.pathname.split('/').filter(path => path.length > 0);

  return (
    <div className='page-heading' data-testid='page-heading'>
      <div className='page-heading__breadcrumbs' data-testid='page-heading-breadcrumbs'>
        <Breadcrumbs aria-label='breadcrumbs'>
          <IconButton
            aria-label='home'
            component={RouterLink}
            to='/'
            target='_self'
            rel='noopener noreferrer'
            data-testid='breadcrumbs-home'
          >
            <HomeFilled sx={{ fontSize: '1rem', color: 'var(--color-neutral-700)' }} />
          </IconButton>
          {paths.map((path, index) => (
            <Link
              key={index}
              component={RouterLink}
              to={`/${paths.slice(0, index + 1).join('/')}`}
              underline='hover'
              color='var(--color-neutral-700)'
              data-testid={`breadcrumbs-link-${index}`}
            >
              {t(`routes.${path.replaceAll('-', '')}`)}
            </Link>
          ))}
        </Breadcrumbs>
      </div>
      <div className='page-heading__title'>{title}</div>
    </div>
  );
};
