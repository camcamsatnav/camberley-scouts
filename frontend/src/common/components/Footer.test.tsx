import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Footer } from './Footer';

it('should render correctly', () => {
  render(<Footer />);

  expect(screen.getByTestId('footer')).toBeInTheDocument();
  expect(screen.getByTestId('footer-address')).toBeInTheDocument();
  expect(screen.getByTestId('footer-charity')).toBeInTheDocument();
  expect(screen.getByTestId('scouts-icon')).toBeInTheDocument();

  expect(screen.getByText('Scout Hall')).toBeInTheDocument();
  expect(screen.getByText('270 London Rd, Royal Military Academy, Camberley GU15 3JP')).toBeInTheDocument();
  expect(screen.getByText('Registered Charity Number: 1212891')).toBeInTheDocument();
});
