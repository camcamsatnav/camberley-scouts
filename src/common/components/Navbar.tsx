import AccountBalance from '@mui/icons-material/AccountBalance';
import FacebookRounded from '@mui/icons-material/FacebookRounded';
import Instagram from '@mui/icons-material/Instagram';
import { IconButton } from '@mui/material';
import { Link } from '@tanstack/react-router';
import type { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import { FACEBOOK_URL, INSTAGRAM_URL } from '../constants';
import { NavigationButton } from './NavigationButton';

import '../less/navbar.less';

export const Navbar = () => {
  const { t } = useTranslation();

  const options = {
    join: [
      { label: t('navbar.join.beavers'), to: '/beavers' },
      { label: t('navbar.join.cubs'), to: '/cubs' },
      { label: t('navbar.join.scouts'), to: '/scouts' },
    ],
    parents: [{ label: t('navbar.parents.shop'), to: '/shop' }],
    volunteers: [
      {
        label: t('navbar.volunteers.fundraising'),
        to: '/fundraising',
      },
      {
        label: t('navbar.volunteers.volunteer'),
        to: '/volunteer',
      },
    ],
    about: [
      { label: t('navbar.about.hut'), to: '/about-us/hut-renovation' },
      { label: t('navbar.about.bookings'), to: '/about-us/bookings' },
      {
        label: t('navbar.about.documentation'),
        to: '/about-us/documentation',
      },
      { label: t('navbar.about.faq'), to: '/about-us/faq' },
      { label: t('navbar.about.contact'), to: '/about-us/contact' },
    ],
  } satisfies Record<
    string,
    { label: string; to: ComponentProps<typeof Link>['to'] }[]
  >;

  return (
    <nav className='navbar' data-testid='navbar'>
      <IconButton
        aria-label='home'
        component={Link}
        to='/'
        target='_self'
        rel='noopener noreferrer'
        sx={{ marginRight: 'var(--spacing-2)' }}
        data-testid='navbar-home'
      >
        <AccountBalance
          sx={{ fontSize: '2rem', color: 'var(--mui-palette-common-white)' }}
        />
      </IconButton>
      <span className='navbar__title'>{t('navbar.title')}</span>

      <div className='navbar__navigation' data-testid='navbar-navigation'>
        <NavigationButton
          title={t('navbar.join.label')}
          options={options.join}
          testId='nav-join'
        />
        <NavigationButton
          title={t('navbar.parents.label')}
          options={options.parents}
          testId='nav-parents'
        />
        <NavigationButton
          title={t('navbar.volunteers.label')}
          options={options.volunteers}
          testId='nav-volunteers'
        />
        <NavigationButton
          title={t('navbar.about.label')}
          options={options.about}
          testId='nav-about'
        />
      </div>

      <div className='navbar__socials' data-testid='navbar-socials'>
        <IconButton
          aria-label='facebook'
          href={FACEBOOK_URL}
          target='_blank'
          rel='noopener noreferrer'
          data-testid='navbar-facebook'
        >
          <FacebookRounded sx={{ color: 'var(--mui-palette-common-white)' }} />
        </IconButton>
        <IconButton
          aria-label='instagram'
          href={INSTAGRAM_URL}
          target='_blank'
          rel='noopener noreferrer'
          data-testid='navbar-instagram'
        >
          <Instagram sx={{ color: 'var(--mui-palette-common-white)' }} />
        </IconButton>
      </div>
    </nav>
  );
};
