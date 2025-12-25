import { fireEvent, render, screen } from '@testing-library/react';
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

it('shows the correct options for each navigation button when clicked', async () => {
  render(<Navbar />);

  const cases = [
    {
      testId: 'nav-join',
      expected: ['Beavers', 'Cubs', 'Scouts'],
    },
    {
      testId: 'nav-parents',
      expected: ['Scout shop'],
    },
    {
      testId: 'nav-volunteers',
      expected: ['Fundraising', 'Volunteer'],
    },
    {
      testId: 'nav-about',
      expected: ['Hut renovation', 'Bookings', 'Official documentation', 'FAQ', 'Contact'],
    },
  ];

  for (const c of cases) {
    const button = screen.getByTestId(`${c.testId}-button`);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    const menu = screen.getByTestId(`${c.testId}-menu`);
    expect(menu).toBeInTheDocument();

    // shows all options
    for (let i = 0; i < c.expected.length; i++) {
      const item = screen.getByTestId(`${c.testId}-menu-item-${i}`);
      expect(item).toBeInTheDocument();
      expect(item).toHaveTextContent(c.expected[i]);
    }

    // Close the menu after checking
    fireEvent.click(document.body);
  }
});

