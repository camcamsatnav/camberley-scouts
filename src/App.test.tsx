import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { App } from './App';

it('should render correct title', () => {
  render(<App />);

  expect(screen.getByText('temp title')).toBeInTheDocument();
});
