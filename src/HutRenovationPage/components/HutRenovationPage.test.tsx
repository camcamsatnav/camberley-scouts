import * as RR from '@tanstack/react-router';
import { render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { HutRenovationPage } from './HutRenovationPage';

afterEach(() => {
  vi.restoreAllMocks();
});

it('should render HutRenovationPage correctly', () => {
  vi.spyOn(RR, 'useLocation').mockReturnValue({
    pathname: '/about-us/hut-renovation',
  } as never);

  render(<HutRenovationPage />);

  expect(screen.getByTestId('hut-renovation-page')).toBeInTheDocument();
  expect(screen.getByTestId('hut-renovation-page-image')).toBeInTheDocument();
  expect(screen.getByAltText('Renovated scout hut')).toBeInTheDocument();

  // page heading and description
  expect(screen.getAllByText('Hut renovation').length).toEqual(2); // 1 in heading, 1 in breadcrumb
  expect(
    screen.getByText('The scout hut has been given a new lease of life'),
  ).toBeInTheDocument();

  // there should be three cards
  expect(screen.getAllByTestId('hut-renovation-card').length).toBe(3);

  // card titles
  expect(screen.getByText('Grand reopening')).toBeInTheDocument();
  expect(screen.getByText('Progress')).toBeInTheDocument();
  expect(screen.getByText('Improvements')).toBeInTheDocument();

  // card descriptions
  expect(
    screen.getByText((content) =>
      content.includes('On the 27th September 2025'),
    ),
  ).toBeInTheDocument();
  expect(
    screen.getByText((content) =>
      content.includes('The whole process took about xx months'),
    ),
  ).toBeInTheDocument();
  expect(
    screen.getByText('The space has been increased by 25%'),
  ).toBeInTheDocument();
  expect(
    screen.getByText('A new leader’s room has been created'),
  ).toBeInTheDocument();
  expect(
    screen.getByText('New roof, new flooring and new boiler'),
  ).toBeInTheDocument();
  expect(
    screen.getByText('A new kitchen with new appliances'),
  ).toBeInTheDocument();
  expect(
    screen.getByText('A redecorated hall, much more inviting'),
  ).toBeInTheDocument();
});
