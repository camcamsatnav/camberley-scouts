import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { NavigationButton } from './NavigationButton';

const defaultProps = {
  title: 'Example nav',
  options: [
    { label: 'Option 1', url: '/option1' },
    { label: 'Option 2', url: '/option2' },
    { label: 'Option 3', url: '/option3' },
  ],
  testId: 'example-nav',
};

it('should render NavigationButton correctly', () => {
  render(<NavigationButton {...defaultProps} />);

  expect(screen.getByTestId('example-nav-button')).toBeInTheDocument();
  expect(screen.getByText('Example nav')).toBeInTheDocument();
});

it('should handle click and display menu options', () => {
  render(<NavigationButton {...defaultProps} />);

  fireEvent.click(screen.getByTestId('example-nav-button'));

  expect(screen.getByTestId('example-nav-menu')).toBeInTheDocument();
  defaultProps.options.forEach((option, index) => {
    expect(screen.getByTestId(`example-nav-menu-item-${index}-container`)).toBeInTheDocument();
    expect(screen.getByTestId(`example-nav-menu-item-${index}-container`)).toHaveAttribute('href', option.url);
    expect(screen.getByTestId(`example-nav-menu-item-${index}`)).toBeInTheDocument();
    expect(screen.getByTestId(`example-nav-menu-item-${index}`)).toHaveTextContent(option.label);
  });
});
