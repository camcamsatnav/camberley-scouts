import { render, screen, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import { HomePageView } from './HomePageView';

it('renders HomePageView correctly', () => {
  render(<HomePageView />);

  expect(screen.getByTestId('home-page')).toBeInTheDocument();
  expect(screen.getByTestId('intro-image')).toBeInTheDocument();
  expect(screen.getByTestId('intro-text')).toBeInTheDocument();
  expect(screen.getByTestId('join-button')).toBeInTheDocument();
  expect(screen.getByTestId('volunteer-button')).toBeInTheDocument();
  expect(screen.getByTestId('intro-card')).toBeInTheDocument();
  expect(screen.getByTestId('beavers-card')).toBeInTheDocument();
  expect(screen.getByTestId('cubs-card')).toBeInTheDocument();
  expect(screen.getByTestId('scouts-card')).toBeInTheDocument();

  expect(screen.getByText('Welcome to Camberley 478 scout group')).toBeInTheDocument();
  expect(screen.getByText('where every child has the right to an adventure')).toBeInTheDocument();
  expect(screen.getByText('Join')).toBeInTheDocument();
  expect(screen.getByText('Volunteer')).toBeInTheDocument();
  expect(screen.getByText('Our group')).toBeInTheDocument();
  expect(within(screen.getByTestId('intro-card')).getByText(
    'We currently have: 2 Beaver colonies, 1 Cub pack and 1 Scout troop.')).toBeInTheDocument();
  expect(within(screen.getByTestId('intro-card')).getByText(
    'Camberley 478 Scout Group was formed after the original groups in Camberley (4th, 7th and 8th) were at risk of closure.'))
    .toBeInTheDocument();
  expect(within(screen.getByTestId('intro-card')).getByText(
    'The group has now grown significantly since 2022 and our numbers are increasing further.'))
    .toBeInTheDocument();
  expect(screen.getAllByText('View').length).toEqual(3);
  expect(within(screen.getByTestId('beavers-card')).getByText('6-8 years')).toBeInTheDocument();
  expect(within(screen.getByTestId('cubs-card')).getByText('8-10½ years')).toBeInTheDocument();
  expect(within(screen.getByTestId('scouts-card')).getByText('10½-14 years')).toBeInTheDocument();
});
