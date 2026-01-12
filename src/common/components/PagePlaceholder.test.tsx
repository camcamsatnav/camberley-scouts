import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { PagePlaceholder } from './PagePlaceholder';

it('should render PagePlaceholder correctly', () => {
  render(<PagePlaceholder icon={<div>icon</div>} mainText={'Main text'} subText={'Sub text'} />);

  expect(screen.getByTestId('page-placeholder')).toBeInTheDocument();
  expect(screen.getByTestId('page-placeholder-icon')).toBeInTheDocument();
  expect(screen.getByText('Main text')).toBeInTheDocument();
  expect(screen.getByText('Sub text')).toBeInTheDocument();
});
