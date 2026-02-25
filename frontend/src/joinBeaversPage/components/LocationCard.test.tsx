import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { BEAVERS_LOCATION_ONE } from '../constants';
import { LocationCard } from './LocationCard';

it('should render LocationCard correctly', () => {
  render(<LocationCard {...BEAVERS_LOCATION_ONE} />);

  expect(screen.getByTestId('location-card')).toBeInTheDocument();
  expect(screen.getByTestId('location-card-title')).toBeInTheDocument();
  expect(screen.getByTestId('location-card-date')).toBeInTheDocument();
  expect(screen.getByTestId('location-card-address')).toBeInTheDocument();
  expect(screen.getByTestId('location-card-link')).toBeInTheDocument();
  expect(screen.getByTestId('location-card-spaces')).toBeInTheDocument();

  expect(screen.getByText('Day and time')).toBeInTheDocument();
  expect(screen.getByText('Location')).toBeInTheDocument();
  expect(screen.getByText('Find us on Google maps')).toBeInTheDocument();
  expect(screen.getByText('Spaces available?')).toBeInTheDocument();

  expect(screen.getByText('St Mary\'s')).toBeInTheDocument();
  expect(screen.getByText('St Mary\'s Church')).toBeInTheDocument();
  expect(screen.getByText('Park Road')).toBeInTheDocument();
  expect(screen.getByText('Camberley')).toBeInTheDocument();
  expect(screen.getByText('GU15 2SR')).toBeInTheDocument();

  expect(screen.getByTestId('location-card-link')).toHaveAttribute('href', 'https://maps.app.goo.gl/CFDX869WgfsKcrbs7');

  expect(screen.getByTestId('location-card-spaces')).toHaveTextContent('Yes');
  expect(screen.getByTestId('location-card-spaces')).not.toHaveTextContent('No');
});

it('should render LocationCard with no spaces available', () => {
  render(<LocationCard {...BEAVERS_LOCATION_ONE} spacesAvailable={false} />);

  expect(screen.getByTestId('location-card-spaces')).toHaveTextContent('No');
  expect(screen.getByTestId('location-card-spaces')).not.toHaveTextContent('Yes');
});
