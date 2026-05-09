import { HomeFilled } from '@mui/icons-material';
import { Breadcrumbs, IconButton, Link } from '@mui/material';
import { Link as RouterLink, useLocation } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import '../less/pageHeading.less';

interface PageHeadingProps {
  title: string;
}

/**
 * Contains the page title and breadcrumbs navigation.
 */
export const PageHeading = ({ title }: PageHeadingProps) => {
  // The keys used assume that the route paths are in kebab-case, all '-' will be replaced with '' to match the translation keys
  const { t } = useTranslation();

  const location = useLocation();

  const paths = location.pathname.split('/').filter((path) => path.length > 0);

  return (
    <div className='page-heading' data-testid='page-heading'>
      <div
        className='page-heading__breadcrumbs'
        data-testid='page-heading-breadcrumbs'
      >
        <Breadcrumbs aria-label='breadcrumbs'>
          <IconButton
            aria-label='home'
            component={RouterLink}
            to='/'
            target='_self'
            rel='noopener noreferrer'
            data-testid='breadcrumbs-home'
          >
            <HomeFilled
              sx={{ fontSize: '1rem', color: 'var(--color-neutral-700)' }}
            />
          </IconButton>
          {paths.map((path, index) => (
            <Link
              key={`/${paths.slice(0, index + 1).join('/')}`}
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
