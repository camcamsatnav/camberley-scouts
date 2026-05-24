import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
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

const renderJoinIntro = () => render(<JoinIntro {...defaultProps} />);

describe('JoinIntro', () => {
  it('renders the intro section', () => {
    renderJoinIntro();

    expect(screen.getByTestId('join-intro')).toBeInTheDocument();
  });

  it('renders the title', () => {
    renderJoinIntro();

    expect(screen.getByTestId('join-intro-title')).toHaveTextContent('title');
  });

  it('renders the logo image', () => {
    renderJoinIntro();

    expect(screen.getByTestId('join-logo')).toHaveAttribute(
      'src',
      JOIN_BEAVERS_LOGO.src,
    );
  });

  it('renders the age range', () => {
    renderJoinIntro();

    expect(screen.getByText('10-12')).toBeInTheDocument();
  });

  it('links the join button to the contact page for the recipient type', () => {
    renderJoinIntro();

    expect(screen.getByTestId('join-button')).toHaveAttribute(
      'href',
      '/about-us/contact?query=BEAVERS',
    );
  });

  it.each([
    [0, JOIN_BEAVERS_LOCATIONS[0].googleMapsLink],
    [1, JOIN_BEAVERS_LOCATIONS[1].googleMapsLink],
  ])('links location card %i to its Google Maps location', (index, href) => {
    renderJoinIntro();

    expect(
      within(screen.getAllByTestId('location-card')[index]).getByTestId(
        'location-card-link',
      ),
    ).toHaveAttribute('href', href);
  });
});
