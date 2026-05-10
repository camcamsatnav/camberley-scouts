import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NotFoundView } from './NotFoundView';

const renderNotFoundView = () => render(<NotFoundView />);

describe('NotFoundView', () => {
  it('renders the placeholder', () => {
    renderNotFoundView();

    expect(screen.getByTestId('page-placeholder')).toBeInTheDocument();
  });

  it('renders the placeholder icon', () => {
    renderNotFoundView();

    expect(screen.getByTestId('page-placeholder-icon')).toBeInTheDocument();
  });

  it('renders the main text', () => {
    renderNotFoundView();

    expect(screen.getByText('Oops...')).toBeInTheDocument();
  });

  it('renders the sub text', () => {
    renderNotFoundView();

    expect(
      screen.getByText(
        'We cannot find this page. Please check URL and try again.',
      ),
    ).toBeInTheDocument();
  });
});
