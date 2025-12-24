import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Navbar } from './Navbar';

it('should render Navbar correctly', () => {
  render(<Navbar />);

  expect(screen.getByTestId('navbar')).toBeInTheDocument();
  expect(screen.getByTestId('navbar-icon')).toBeInTheDocument();
  expect(screen.getByText('Camberley 478 Scout Group')).toBeInTheDocument();

  expect(screen.getByTestId('navbar-socials')).toBeInTheDocument();
  expect(screen.getByTestId('navbar-facebook')).toBeInTheDocument();
  expect(screen.getByTestId('navbar-instagram')).toBeInTheDocument();
});

it('should have correct social media links', () => {
  render(<Navbar />);

  expect(screen.getByTestId('navbar-facebook')).toHaveAttribute('href', 'https://www.facebook.com/camberley478');
  expect(screen.getByTestId('navbar-instagram')).toHaveAttribute(
    'href',
    'https://www.instagram.com/camberley.478.scout.group',
  );
});
