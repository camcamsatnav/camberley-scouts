import { render, screen, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import { ScoutsStackIcon } from './ScoutsStackIcon';

it('should render icon', () => {
  render(<ScoutsStackIcon />);

  expect(screen.getByTestId('scouts-icon')).toBeInTheDocument();
  expect(within(screen.getByTestId('scouts-icon')).getByAltText('scouts icon')).toBeInTheDocument();
});
