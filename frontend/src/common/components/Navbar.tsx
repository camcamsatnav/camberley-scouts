import AccountBalance from '@mui/icons-material/AccountBalance';
import FacebookRounded from '@mui/icons-material/FacebookRounded';
import Instagram from '@mui/icons-material/Instagram';
import { IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { FACEBOOK_URL, INSTAGRAM_URL, ROUTES } from '../constants';
import { NavigationButton } from './NavigationButton';

import '../less/navbar.less';

export const Navbar = () => {

  const { t } = useTranslation();

  const options = {
    join: [
      { label: t('navbar.join.beavers'), url: ROUTES.JOIN.BEAVERS },
      { label: t('navbar.join.cubs'), url: ROUTES.JOIN.CUBS },
      { label: t('navbar.join.scouts'), url: ROUTES.JOIN.SCOUTS },
    ],
    parents: [
      { label: t('navbar.parents.shop'), url: ROUTES.PARENTS.SHOP },
    ],
    volunteers: [
      { label: t('navbar.volunteers.fundraising'), url: ROUTES.VOLUNTEERS.FUNDRAISING },
      { label: t('navbar.volunteers.volunteer'), url: ROUTES.VOLUNTEERS.VOLUNTEER },
    ],
    about: [
      { label: t('navbar.about.hut'), url: ROUTES.ABOUT.HUT_RENOVATION },
      { label: t('navbar.about.bookings'), url: ROUTES.ABOUT.BOOKINGS },
      { label: t('navbar.about.documentation'), url: ROUTES.ABOUT.DOCUMENTATION },
      { label: t('navbar.about.faq'), url: ROUTES.ABOUT.FAQ },
      { label: t('navbar.about.contact'), url: ROUTES.ABOUT.CONTACT },
    ],
  };

  return (
    <nav className='navbar' data-testid='navbar'>
      <IconButton
        aria-label='home'
        component={Link}
        to={ROUTES.HOME}
        target='_self'
        rel='noopener noreferrer'
        sx={{ marginRight: 'var(--spacing-2)' }}
        data-testid='navbar-home'
      >
        <AccountBalance sx={{ fontSize: '2rem', color: 'var(--mui-palette-common-white)' }} />
      </IconButton>
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
    </nav>
  );
};
