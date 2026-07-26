import AccountBalance from '@mui/icons-material/AccountBalance';
import Close from '@mui/icons-material/Close';
import FacebookRounded from '@mui/icons-material/FacebookRounded';
import Instagram from '@mui/icons-material/Instagram';
import Menu from '@mui/icons-material/Menu';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { Link } from '@tanstack/react-router';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FACEBOOK_URL, INSTAGRAM_URL } from '../constants';
import { NavigationButton } from './NavigationButton';

import '../less/navbar.less';

export const Navbar = () => {
  const { t } = useTranslation();
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);

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

  const navigationGroups = [
    { label: t('navbar.join.label'), options: options.join },
    { label: t('navbar.parents.label'), options: options.parents },
    { label: t('navbar.volunteers.label'), options: options.volunteers },
    { label: t('navbar.about.label'), options: options.about },
  ];

  const closeMobileNavigation = () => {
    setMobileNavigationOpen(false);
  };

  return (
    <nav className='navbar' data-testid='navbar'>
      <IconButton
        className='navbar__home'
        aria-label='home'
        component={Link}
        to='/'
        target='_self'
        rel='noopener noreferrer'
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

      <IconButton
        className='navbar__mobile-menu-button'
        aria-label={t('navbar.menu.open')}
        aria-controls={
          mobileNavigationOpen ? 'navbar-mobile-navigation' : undefined
        }
        aria-expanded={mobileNavigationOpen}
        onClick={() => setMobileNavigationOpen(true)}
        data-testid='navbar-mobile-menu-button'
      >
        <Menu sx={{ color: 'var(--mui-palette-common-white)' }} />
      </IconButton>

      <Drawer
        anchor='right'
        open={mobileNavigationOpen}
        onClose={closeMobileNavigation}
        slotProps={{
          paper: {
            className: 'navbar-mobile-drawer',
          },
        }}
      >
        <div
          className='navbar-mobile-navigation'
          id='navbar-mobile-navigation'
          data-testid='navbar-mobile-navigation'
        >
          <div className='navbar-mobile-navigation__header'>
            <span>{t('navbar.menu.label')}</span>
            <IconButton
              aria-label={t('navbar.menu.close')}
              onClick={closeMobileNavigation}
              data-testid='navbar-mobile-menu-close'
            >
              <Close />
            </IconButton>
          </div>
          <div className='navbar-mobile-navigation__links'>
            {navigationGroups.map((group) => (
              <List
                key={group.label}
                subheader={
                  <ListSubheader disableSticky>{group.label}</ListSubheader>
                }
              >
                {group.options.map((option) => (
                  <ListItem key={option.to} disablePadding>
                    <ListItemButton
                      component={Link}
                      to={option.to}
                      onClick={closeMobileNavigation}
                    >
                      <ListItemText primary={option.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            ))}
          </div>
          <div
            className='navbar-mobile-navigation__socials'
            data-testid='navbar-mobile-socials'
          >
            <IconButton
              aria-label='facebook'
              href={FACEBOOK_URL}
              target='_blank'
              rel='noopener noreferrer'
            >
              <FacebookRounded />
            </IconButton>
            <IconButton
              aria-label='instagram'
              href={INSTAGRAM_URL}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Instagram />
            </IconButton>
          </div>
        </div>
      </Drawer>
    </nav>
  );
};
