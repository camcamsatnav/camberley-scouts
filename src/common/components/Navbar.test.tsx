import { fireEvent, render, screen, within } from '@testing-library/react';
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

  it('renders an accessible mobile navigation button', () => {
    renderNavbar();

    expect(
      screen.getByRole('button', { name: 'Open navigation menu' }),
    ).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens a mobile drawer containing every navigation route', () => {
    renderNavbar();

    const menuButton = screen.getByRole('button', {
      name: 'Open navigation menu',
    });
    fireEvent.click(menuButton);

    const mobileNavigation = screen.getByTestId('navbar-mobile-navigation');

    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    for (const [label, href] of [
      ['Beavers', '/beavers'],
      ['Cubs', '/cubs'],
      ['Scouts', '/scouts'],
      ['Scout shop', '/shop'],
      ['Fundraising', '/fundraising'],
      ['Volunteer', '/volunteer'],
      ['Hut renovation', '/about-us/hut-renovation'],
      ['Bookings', '/about-us/bookings'],
      ['Official documentation', '/about-us/documentation'],
      ['FAQ', '/about-us/faq'],
      ['Contact', '/about-us/contact'],
    ]) {
      expect(
        within(mobileNavigation).getByRole('link', { name: label }),
      ).toHaveAttribute('href', href);
    }
  });

  it('includes social links in the mobile drawer', () => {
    renderNavbar();

    fireEvent.click(
      screen.getByRole('button', { name: 'Open navigation menu' }),
    );

    const mobileSocials = screen.getByTestId('navbar-mobile-socials');

    expect(
      within(mobileSocials).getByRole('link', { name: 'facebook' }),
    ).toHaveAttribute('href', FACEBOOK_URL);
    expect(
      within(mobileSocials).getByRole('link', { name: 'instagram' }),
    ).toHaveAttribute('href', INSTAGRAM_URL);
  });

  it('closes the mobile drawer from its accessible close button', () => {
    renderNavbar();

    const menuButton = screen.getByRole('button', {
      name: 'Open navigation menu',
    });
    fireEvent.click(menuButton);
    fireEvent.click(
      screen.getByRole('button', { name: 'Close navigation menu' }),
    );

    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the mobile drawer after selecting a route', () => {
    renderNavbar();

    const menuButton = screen.getByRole('button', {
      name: 'Open navigation menu',
    });
    fireEvent.click(menuButton);
    const beaversLink = within(
      screen.getByTestId('navbar-mobile-navigation'),
    ).getByRole('link', { name: 'Beavers' });
    beaversLink.addEventListener('click', (event) => event.preventDefault());
    fireEvent.click(beaversLink);

    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });
});
