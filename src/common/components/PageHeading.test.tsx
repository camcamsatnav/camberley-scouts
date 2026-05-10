import * as RR from '@tanstack/react-router';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PageHeading } from './PageHeading';

const renderPageHeading = () => {
  vi.spyOn(RR, 'useLocation').mockReturnValue({
    pathname: '/about-us/hut-renovation',
  } as never);

  render(<PageHeading title='Example header' />);
};

describe('PageHeading', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the heading container', () => {
    renderPageHeading();

    expect(screen.getByTestId('page-heading')).toBeInTheDocument();
  });

  it('renders the title', () => {
    renderPageHeading();

    expect(screen.getByText('Example header')).toBeInTheDocument();
  });

  it('renders the home breadcrumb', () => {
    renderPageHeading();

    expect(screen.getByTestId('breadcrumbs-home')).toBeInTheDocument();
  });

  it.each([
    ['breadcrumbs-link-0', 'About us'],
    ['breadcrumbs-link-1', 'Hut renovation'],
  ])('renders the %s breadcrumb label', (testId, label) => {
    renderPageHeading();

    expect(screen.getByTestId(testId)).toHaveTextContent(label);
  });
});
