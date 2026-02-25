import { render, screen } from '@testing-library/react';
import * as RR from 'react-router';
import { afterEach, expect, it, vi } from 'vitest';
import { PageHeading } from './PageHeading';

afterEach(() => {
  vi.restoreAllMocks();
});

it('should render PageHeading correctly', () => {
  vi.spyOn(RR, 'useLocation').mockReturnValue({
    pathname: '/about-us/hut-renovation',
    search: '',
    hash: '',
    state: null,
    key: 'test',
  });

  render(<PageHeading title={'Example header'} />);

  expect(screen.getByTestId('page-heading')).toBeInTheDocument();
  expect(screen.getByTestId('page-heading-breadcrumbs')).toBeInTheDocument();
  expect(screen.getByText('Example header')).toBeInTheDocument();

  expect(screen.getByTestId('breadcrumbs-home')).toBeInTheDocument();

  expect(screen.getByTestId('breadcrumbs-link-0')).toBeInTheDocument();
  expect(screen.getByTestId('breadcrumbs-link-1')).toBeInTheDocument();

  // renders all texts with correct translation
  expect(screen.getByText('About us')).toBeInTheDocument();
  expect(screen.getByText('Hut renovation')).toBeInTheDocument();
});
