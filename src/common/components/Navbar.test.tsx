import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FACEBOOK_URL, INSTAGRAM_URL } from '../constants';
import { Navbar } from './Navbar';
import type { NavigationButtonProps } from './NavigationButton';

vi.mock('./NavigationButton', () => ({
  NavigationButton: ({ title, options, testId }: NavigationButtonProps) => (
    <div
      data-options={options.map((option) => option.label).join('|')}
      data-testid={testId}
    >
      {title}
    </div>
  ),
}));

const renderNavbar = () => render(<Navbar />);

describe('Navbar', () => {
  it('renders the navbar container', () => {
    renderNavbar();

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  it('renders the home link', () => {
    renderNavbar();

    expect(screen.getByTestId('navbar-home')).toBeInTheDocument();
  });

  it('renders the group title', () => {
    renderNavbar();

    expect(screen.getByText('Camberley 478 Scout Group')).toBeInTheDocument();
  });

  it.each([
    ['nav-join', 'Join', 'Beavers|Cubs|Scouts'],
    ['nav-parents', 'Info for parents', 'Scout shop'],
    ['nav-volunteers', 'Info for volunteers', 'Fundraising|Volunteer'],
    [
      'nav-about',
      'About us',
      'Hut renovation|Bookings|Official documentation|FAQ|Contact',
    ],
  ])('passes the %s navigation options', (testId, label, options) => {
    renderNavbar();

    expect(screen.getByTestId(testId)).toHaveTextContent(label);
    expect(screen.getByTestId(testId)).toHaveAttribute('data-options', options);
  });

  it('links the Facebook button to the group page', () => {
    renderNavbar();

    expect(screen.getByTestId('navbar-facebook')).toHaveAttribute(
      'href',
      FACEBOOK_URL,
    );
  });

  it('links the Instagram button to the group page', () => {
    renderNavbar();

    expect(screen.getByTestId('navbar-instagram')).toHaveAttribute(
      'href',
      INSTAGRAM_URL,
    );
  });
});
