import { render, screen, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import {
  JOIN_BEAVERS_IMAGES,
  JOIN_BEAVERS_LOCATIONS,
  JOIN_BEAVERS_LOGO,
} from '../constants';
import { JoinBeaversPage } from './JoinBeaversPage';

it('should render JoinBeaversPage correctly', () => {
  render(<JoinBeaversPage />);

  expect(screen.getByTestId('join-beavers-page')).toBeInTheDocument();
  expect(screen.getByTestId('page-heading')).toBeInTheDocument();
});

it('should render JoinIntro with the correct content', () => {
  render(<JoinBeaversPage />);

  expect(screen.getByTestId('join-intro')).toBeInTheDocument();
  expect(screen.getByTestId('join-intro-title')).toHaveTextContent(
    'We have 2 Beaver Colonies',
  );
  expect(screen.getByTestId('join-logo')).toHaveAttribute(
    'src',
    JOIN_BEAVERS_LOGO.src,
  );
  expect(screen.getByTestId('join-logo')).toHaveAttribute(
    'alt',
    JOIN_BEAVERS_LOGO.alt,
  );
  expect(screen.getByText('6-8 years')).toBeInTheDocument();
  expect(screen.getByTestId('join-button')).toBeInTheDocument();
});

it('should render JoinIntro with the correct location cards', () => {
  render(<JoinBeaversPage />);

  const locationCards = screen.getAllByTestId('location-card');
  expect(locationCards).toHaveLength(JOIN_BEAVERS_LOCATIONS.length);

  const location1 = locationCards[0];
  expect(within(location1).getByTestId('location-card-link')).toHaveAttribute(
    'href',
    JOIN_BEAVERS_LOCATIONS[0].googleMapsLink,
  );

  const location2 = locationCards[1];
  expect(within(location2).getByTestId('location-card-link')).toHaveAttribute(
    'href',
    JOIN_BEAVERS_LOCATIONS[1].googleMapsLink,
  );
});

it('should render JoinInformation with the correct content', () => {
  render(<JoinBeaversPage />);

  expect(screen.getByTestId('join-info')).toBeInTheDocument();
  expect(screen.getByTestId('join-info-list')).toBeInTheDocument();
  expect(screen.getByTestId('join-info-card')).toBeInTheDocument();
  expect(screen.getByText('Activities')).toBeInTheDocument();
});

it('should render JoinImages with the correct images', () => {
  render(<JoinBeaversPage />);

  expect(screen.getByTestId('join-images')).toBeInTheDocument();
  JOIN_BEAVERS_IMAGES.forEach((image) => {
    const imgElement = screen.getByAltText(image.alt);
    expect(imgElement).toHaveAttribute('src', image.src);
  });
});
