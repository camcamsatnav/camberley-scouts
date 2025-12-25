import { Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';

import '../less/navigationButton.less';

export interface NavigationButtonProps {
  title: string;
  options: { label: string; url: string }[];
  testId: string;
}

export const NavigationButton = ({ title, options, testId }: NavigationButtonProps) => {

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOnButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOnClose = () => {
    setAnchorEl(null);
  };

  const open = !!anchorEl;

  return (
    <>
      <Button
        id='nav-button'
        variant='text'
        size='large'
        aria-controls={open ? 'nav-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOnButtonClick}
        data-testid={`${testId}-button`}
      >
        <span className='navigation-button__text'>{title}</span>
      </Button>
      <Menu
        id='nav-menu'
        anchorEl={anchorEl}
        open={open}
        slotProps={{
          list: {
            'aria-labelledby': 'nav-button',
          },
        }}
        onClose={handleOnClose}
        data-testid={`${testId}-menu`}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option.label}
            component='a'
            href={option.url}
            onClick={handleOnClose}
            data-testid={`${testId}-menu-item-${index}-container`}
          >
            <span className='navigation-button__option' data-testid={`${testId}-menu-item-${index}`}>
              {option.label}
            </span>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
