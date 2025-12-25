import AccountBalance from '@mui/icons-material/AccountBalance';
import FacebookRounded from '@mui/icons-material/FacebookRounded';
import Instagram from '@mui/icons-material/Instagram';
import { IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FACEBOOK_URL, INSTAGRAM_URL } from '../constants';
import { NavigationButton } from './NavigationButton';

import '../less/navbar.less';

export const Navbar = () => {

  const { t } = useTranslation();

  const options = {
    join: [
      { label: t('navbar.join.beavers'), url: '/beavers' },
      { label: t('navbar.join.cubs'), url: '/cubs' },
      { label: t('navbar.join.scouts'), url: '/scouts' },
    ],
    parents: [
      { label: t('navbar.parents.shop'), url: '/shop' },
    ],
    volunteers: [
      { label: t('navbar.volunteers.fundraising'), url: '/fundraising' },
      { label: t('navbar.volunteers.volunteer'), url: '/volunteer' },
    ],
    about: [
      { label: t('navbar.about.hut'), url: '/hut-renovation' },
      { label: t('navbar.about.bookings'), url: '/bookings' },
      { label: t('navbar.about.documentation'), url: '/documentation' },
      { label: t('navbar.about.faq'), url: '/faq' },
      { label: t('navbar.about.contact'), url: '/contact' },
    ],
  };

  return (
    <div className='navbar' data-testid='navbar'>
      <AccountBalance className='navbar__icon' sx={{ fontSize: '2rem' }} data-testid='navbar-icon' />
      <span className='navbar__title'>{t('navbar.title')}</span>

      <div className='navbar__navigation' data-testid='navbar-navigation'>
        <NavigationButton title={t('navbar.join.label')} options={options.join} testId='nav-join' />
        <NavigationButton title={t('navbar.parents.label')} options={options.parents} testId='nav-parents' />
        <NavigationButton title={t('navbar.volunteers.label')} options={options.volunteers} testId='nav-volunteers' />
        <NavigationButton title={t('navbar.about.label')} options={options.about} testId='nav-about' />
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
    </div>
  );
};
