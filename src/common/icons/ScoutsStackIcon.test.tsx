import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ScoutsStackIcon } from './ScoutsStackIcon';

const renderScoutsStackIcon = () => render(<ScoutsStackIcon />);

describe('ScoutsStackIcon', () => {
  it('renders the icon container', () => {
    renderScoutsStackIcon();

    expect(screen.getByTestId('scouts-icon')).toBeInTheDocument();
  });

  it('renders the Scouts image', () => {
    renderScoutsStackIcon();

    expect(
      within(screen.getByTestId('scouts-icon')).getByAltText('scouts icon'),
    ).toBeInTheDocument();
  });
});
