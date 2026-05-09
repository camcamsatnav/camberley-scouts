import { Button, Menu, MenuItem } from '@mui/material';
import { Link } from '@tanstack/react-router';
import type React from 'react';
import type { ComponentProps } from 'react';
import { useState } from 'react';

import '../less/navigationButton.less';

type RouterLinkTo = NonNullable<ComponentProps<typeof Link>['to']>;

export interface NavigationButtonProps {
  title: string;
  options: { label: string; to: RouterLinkTo }[];
  testId: string;
}

export const NavigationButton = ({
  title,
  options,
  testId,
}: NavigationButtonProps) => {
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
        id={`${testId}-nav-button`}
        variant='text'
        size='large'
        aria-controls={open ? `${testId}-nav-menu` : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOnButtonClick}
        data-testid={`${testId}-button`}
      >
        <span className='navigation-button__text'>{title}</span>
      </Button>
      <Menu
        id={`${testId}-nav-menu`}
        anchorEl={anchorEl}
        open={open}
        slotProps={{
          list: {
            'aria-labelledby': `${testId}-nav-button`,
          },
        }}
        onClose={handleOnClose}
        data-testid={`${testId}-menu`}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option.to}
            component={Link}
            to={option.to}
            onClick={handleOnClose}
            data-testid={`${testId}-menu-item-${index}-container`}
          >
            <span
              className='navigation-button__option'
              data-testid={`${testId}-menu-item-${index}`}
            >
              {option.label}
            </span>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
