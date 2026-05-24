import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HomePageView } from './HomePageView';

const renderHomePage = () => render(<HomePageView />);

describe('HomePageView', () => {
  it('renders the page container', () => {
    renderHomePage();

    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('renders the intro image', () => {
    renderHomePage();

    expect(screen.getByTestId('intro-image')).toBeInTheDocument();
  });

  it('renders the welcome title', () => {
    renderHomePage();

    expect(
      screen.getByText('Welcome to Camberley 478 scout group'),
    ).toBeInTheDocument();
  });

  it('renders the welcome subtitle', () => {
    renderHomePage();

    expect(
      screen.getByText('where every child has the right to an adventure'),
    ).toBeInTheDocument();
  });

  it('links the join button to the contact page', () => {
    renderHomePage();

    expect(screen.getByTestId('join-button')).toHaveAttribute(
      'href',
      '/about-us/contact',
    );
  });

  it('renders the volunteer button', () => {
    renderHomePage();

    expect(screen.getByText('Volunteer')).toBeInTheDocument();
  });

  it('renders the group information card title', () => {
    renderHomePage();

    expect(screen.getByText('Our group')).toBeInTheDocument();
  });

  it.each([
    'We currently have: 2 Beaver colonies, 1 Cub pack and 1 Scout troop.',
    'Camberley 478 Scout Group was formed after the original groups in Camberley (4th, 7th and 8th) were at risk of closure.',
    'The group has now grown significantly since 2022 and our numbers are increasing further.',
  ])('renders the group description line "%s"', (descriptionLine) => {
    renderHomePage();

    expect(
      within(screen.getByTestId('intro-card')).getByText(descriptionLine),
    ).toBeInTheDocument();
  });

  it.each([
    ['beavers-card', '/beavers'],
    ['cubs-card', '/cubs'],
    ['scouts-card', '/scouts'],
  ])('links %s to %s', (testId, href) => {
    renderHomePage();

    expect(
      within(screen.getByTestId(testId)).getByRole('link'),
    ).toHaveAttribute('href', href);
  });

  it.each([
    ['beavers-card', '6-8 years'],
    ['cubs-card', '8-10½ years'],
    ['scouts-card', '10½-14 years'],
  ])('renders the age range for %s', (testId, ageRange) => {
    renderHomePage();

    expect(
      within(screen.getByTestId(testId)).getByText(ageRange),
    ).toBeInTheDocument();
  });
});
