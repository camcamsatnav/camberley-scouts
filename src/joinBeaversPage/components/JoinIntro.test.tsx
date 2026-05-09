import { render, screen, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import { RecipientTypes } from '../../contactPage/constants';
import { JOIN_BEAVERS_LOCATIONS, JOIN_BEAVERS_LOGO } from '../constants';
import { JoinIntro } from './JoinIntro';

const defaultProps = {
  title: 'title',
  image: JOIN_BEAVERS_LOGO,
  ageRange: '10-12',
  locations: JOIN_BEAVERS_LOCATIONS,
  recipientType: RecipientTypes.BEAVERS,
};

it('should render JoinIntro correctly', () => {
  render(<JoinIntro {...defaultProps} />);

  expect(screen.getByTestId('join-intro')).toBeInTheDocument();
  expect(screen.getByTestId('join-intro-title')).toHaveTextContent('title');
  expect(screen.getByTestId('join-logo')).toHaveAttribute(
    'src',
    JOIN_BEAVERS_LOGO.src,
  );
  expect(screen.getByTestId('join-logo')).toHaveAttribute(
    'alt',
    JOIN_BEAVERS_LOGO.alt,
  );
  expect(screen.getByText('10-12')).toBeInTheDocument();
  expect(screen.getByTestId('join-button')).toBeInTheDocument();

  const location1 = screen.getAllByTestId('location-card')[0];
  expect(location1).toBeInTheDocument();
  expect(location1).toHaveTextContent('Friday 6:00 - 7:15 PM');
  expect(location1).toHaveTextContent("St Mary's Church");
  expect(location1).toHaveTextContent('Park Road');
  expect(location1).toHaveTextContent('Camberley');
  expect(location1).toHaveTextContent('GU15 2SR');
  expect(within(location1).getByTestId('location-card-link')).toHaveAttribute(
    'href',
    JOIN_BEAVERS_LOCATIONS[0].googleMapsLink,
  );

  const location2 = screen.getAllByTestId('location-card')[1];
  expect(location2).toBeInTheDocument();
  expect(location2).toHaveTextContent('Thursday 4:45 - 6:00 PM');
  expect(location2).toHaveTextContent("St Martin's Church");
  expect(location2).toHaveTextContent('231 Upper College Ride');
  expect(location2).toHaveTextContent('Camberley');
  expect(location2).toHaveTextContent('GU15 4HE');
  expect(within(location2).getByTestId('location-card-link')).toHaveAttribute(
    'href',
    JOIN_BEAVERS_LOCATIONS[1].googleMapsLink,
  );
});

it('should have correct link to contact page', () => {
  render(<JoinIntro {...defaultProps} />);

  const joinButton = screen.getByTestId('join-button');
  expect(joinButton).toBeInTheDocument();

  expect(joinButton).toHaveAttribute('href', '/about-us/contact?query=BEAVERS');
});
