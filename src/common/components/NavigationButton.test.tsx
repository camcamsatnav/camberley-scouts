import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NavigationButton } from './NavigationButton';

const defaultProps = {
  title: 'Example nav',
  options: [
    { label: 'Option 1', to: '/beavers' },
    { label: 'Option 2', to: '/cubs' },
    { label: 'Option 3', to: '/scouts' },
  ],
  testId: 'example-nav',
};

const renderNavigationButton = () =>
  render(<NavigationButton {...defaultProps} />);

describe('NavigationButton', () => {
  it('renders the navigation button', () => {
    renderNavigationButton();

    expect(screen.getByTestId('example-nav-button')).toBeInTheDocument();
  });

  it('renders the button title', () => {
    renderNavigationButton();

    expect(screen.getByText('Example nav')).toBeInTheDocument();
  });

  it('opens the menu when clicked', () => {
    renderNavigationButton();

    fireEvent.click(screen.getByTestId('example-nav-button'));

    expect(screen.getByTestId('example-nav-menu')).toBeInTheDocument();
  });

  it.each(
    defaultProps.options.map((option, index) => [option, index] as const),
  )('links option %i to its route', (option, index) => {
    renderNavigationButton();

    fireEvent.click(screen.getByTestId('example-nav-button'));

    expect(
      screen.getByTestId(`example-nav-menu-item-${index}-container`),
    ).toHaveAttribute('href', option.to);
  });

  it.each(
    defaultProps.options.map((option, index) => [option, index] as const),
  )('renders option %i label', (option, index) => {
    renderNavigationButton();

    fireEvent.click(screen.getByTestId('example-nav-button'));

    expect(
      screen.getByTestId(`example-nav-menu-item-${index}`),
    ).toHaveTextContent(option.label);
  });
});
