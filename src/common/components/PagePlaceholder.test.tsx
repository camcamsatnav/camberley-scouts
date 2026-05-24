import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PagePlaceholder } from './PagePlaceholder';

const renderPagePlaceholder = (subText?: string) =>
  render(
    <PagePlaceholder
      icon={<div>icon</div>}
      mainText='Main text'
      subText={subText}
    />,
  );

describe('PagePlaceholder', () => {
  it('renders the placeholder container', () => {
    renderPagePlaceholder('Sub text');

    expect(screen.getByTestId('page-placeholder')).toBeInTheDocument();
  });

  it('renders the icon', () => {
    renderPagePlaceholder('Sub text');

    expect(screen.getByTestId('page-placeholder-icon')).toBeInTheDocument();
  });

  it('renders the main text', () => {
    renderPagePlaceholder('Sub text');

    expect(screen.getByText('Main text')).toBeInTheDocument();
  });

  it('renders the sub text when provided', () => {
    renderPagePlaceholder('Sub text');

    expect(screen.getByText('Sub text')).toBeInTheDocument();
  });

  it('does not render sub text when omitted', () => {
    renderPagePlaceholder();

    expect(
      screen.queryByTestId('page-placeholder-subtext'),
    ).not.toBeInTheDocument();
  });
});
