import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Footer } from './Footer';

const renderFooter = () => render(<Footer />);

describe('Footer', () => {
  it('renders the footer container', () => {
    renderFooter();

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders the hall name', () => {
    renderFooter();

    expect(screen.getByText('Scout Hall')).toBeInTheDocument();
  });

  it('renders the address', () => {
    renderFooter();

    expect(
      screen.getByText(
        '270 London Rd, Royal Military Academy, Camberley GU15 3JP',
      ),
    ).toBeInTheDocument();
  });

  it('renders the charity number', () => {
    renderFooter();

    expect(
      screen.getByText('Registered Charity Number: 1212891'),
    ).toBeInTheDocument();
  });

  it('renders the Scouts icon', () => {
    renderFooter();

    expect(screen.getByTestId('scouts-icon')).toBeInTheDocument();
  });
});
