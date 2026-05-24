import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  IMPROVEMENTS_CARD_IMAGES,
  PROGRESS_CARD_IMAGES,
  REOPENING_CARD_IMAGES,
} from '../constants';
import { HutRenovationPage } from './HutRenovationPage';

const RENOVATION_SECTION_COUNT = 3;

vi.mock('../../common/components/PageHeading', () => ({
  PageHeading: ({ title }: { title: string }) => (
    <div data-testid='page-heading'>{title}</div>
  ),
}));

vi.mock('./HutRenovationCard', () => ({
  HutRenovationCard: ({
    title,
    description,
    galleryImages,
  }: {
    title: string;
    description: React.ReactNode;
    galleryImages: unknown[];
  }) => (
    <div
      data-gallery-images-count={galleryImages.length}
      data-testid='hut-renovation-card'
    >
      <div data-testid='hut-renovation-card-title'>{title}</div>
      <div data-testid='hut-renovation-card-description'>{description}</div>
    </div>
  ),
}));

const renderHutRenovationPage = () => render(<HutRenovationPage />);

describe('HutRenovationPage', () => {
  it('renders the page container', () => {
    renderHutRenovationPage();

    expect(screen.getByTestId('hut-renovation-page')).toBeInTheDocument();
  });

  it('renders the page heading title', () => {
    renderHutRenovationPage();

    expect(screen.getByTestId('page-heading')).toHaveTextContent(
      'Hut renovation',
    );
  });

  it('renders the renovated hut image', () => {
    renderHutRenovationPage();

    expect(screen.getByAltText('Renovated scout hut')).toBeInTheDocument();
  });

  it('renders the page description', () => {
    renderHutRenovationPage();

    expect(
      screen.getByText('The scout hut has been given a new lease of life'),
    ).toBeInTheDocument();
  });

  it('renders one card for each renovation section', () => {
    renderHutRenovationPage();

    expect(screen.getAllByTestId('hut-renovation-card')).toHaveLength(
      RENOVATION_SECTION_COUNT,
    );
  });

  it.each([
    'Grand reopening',
    'Progress',
    'Improvements',
  ])('passes "%s" as a card title', (title) => {
    renderHutRenovationPage();

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it.each([
    [0, REOPENING_CARD_IMAGES.length],
    [1, PROGRESS_CARD_IMAGES.length],
    [2, IMPROVEMENTS_CARD_IMAGES.length],
  ])('passes the configured gallery images to card %i', (index, imageCount) => {
    renderHutRenovationPage();

    expect(screen.getAllByTestId('hut-renovation-card')[index]).toHaveAttribute(
      'data-gallery-images-count',
      String(imageCount),
    );
  });
});
