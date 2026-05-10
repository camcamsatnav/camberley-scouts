import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NotImplementedView } from './NotImplementedView';

const renderNotImplementedView = () => render(<NotImplementedView />);

describe('NotImplementedView', () => {
  it('renders the placeholder', () => {
    renderNotImplementedView();

    expect(screen.getByTestId('page-placeholder')).toBeInTheDocument();
  });

  it('renders the placeholder icon', () => {
    renderNotImplementedView();

    expect(screen.getByTestId('page-placeholder-icon')).toBeInTheDocument();
  });

  it('renders the main text', () => {
    renderNotImplementedView();

    expect(screen.getByText('No content yet')).toBeInTheDocument();
  });

  it('renders the sub text', () => {
    renderNotImplementedView();

    expect(screen.getByText('This page will come soon...')).toBeInTheDocument();
  });
});
