import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BEAVERS_LOCATION_ONE } from '../constants';
import { LocationCard } from './LocationCard';

const renderLocationCard = (
  props: Partial<Parameters<typeof LocationCard>[0]> = {},
) => render(<LocationCard {...BEAVERS_LOCATION_ONE} {...props} />);

describe('LocationCard', () => {
  it('renders the location card', () => {
    renderLocationCard();

    expect(screen.getByTestId('location-card')).toBeInTheDocument();
  });

  it('renders the location title', () => {
    renderLocationCard();

    expect(screen.getByText("St Mary's")).toBeInTheDocument();
  });

  it.each([
    'Day and time',
    'Location',
    'Find us on Google maps',
  ])('renders the "%s" label', (label) => {
    renderLocationCard();

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it.each([
    "St Mary's Church",
    'Park Road',
    'Camberley',
    'GU15 2SR',
  ])('renders the address line "%s"', (addressLine) => {
    renderLocationCard();

    expect(screen.getByText(addressLine)).toBeInTheDocument();
  });

  it('links to the configured Google Maps location', () => {
    renderLocationCard();

    expect(screen.getByTestId('location-card-link')).toHaveAttribute(
      'href',
      'https://maps.app.goo.gl/CFDX869WgfsKcrbs7',
    );
  });

  it('shows that spaces are available', () => {
    renderLocationCard();

    expect(screen.getByTestId('location-card-spaces')).toHaveTextContent('Yes');
  });

  it('shows that spaces are unavailable', () => {
    renderLocationCard({ spacesAvailable: false });

    expect(screen.getByTestId('location-card-spaces')).toHaveTextContent('No');
  });
});
