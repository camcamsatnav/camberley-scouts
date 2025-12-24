import AccountBalance from '@mui/icons-material/AccountBalance';
import FacebookRounded from '@mui/icons-material/FacebookRounded';
import Instagram from '@mui/icons-material/Instagram';
import { IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FACEBOOK_URL, INSTAGRAM_URL } from '../constants';

import '../less/navbar.less';

export const Navbar = () => {

  const { t } = useTranslation();

  return (
    <div className='navbar' data-testid='navbar'>
      <AccountBalance className='navbar__icon' sx={{ fontSize: '2rem' }} data-testid='navbar-icon' />
      <span className='navbar__title'>{t('title')}</span>

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
