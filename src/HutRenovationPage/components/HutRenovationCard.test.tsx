import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { HutRenovationCard } from './HutRenovationCard';

const galleryImages = [
  { src: '/example/image1', alt: 'image1' },
  { src: '/example/image2', alt: 'image2' },
];

vi.mock('./ImageGalleryDialog', () => ({
  ImageGalleryDialog: ({
    open,
    setOpen,
    images,
  }: {
    open: boolean;
    setOpen: (open: boolean) => void;
    images: unknown[];
  }) => (
    <div
      data-images-count={images.length}
      data-open={String(open)}
      data-testid='image-gallery-dialog'
    >
      {open && (
        <button
          data-testid='image-gallery-dialog-close-button'
          onClick={() => setOpen(false)}
          type='button'
        >
          Close
        </button>
      )}
    </div>
  ),
}));

const renderHutRenovationCard = () =>
  render(
    <HutRenovationCard
      description='Example description'
      galleryImages={galleryImages}
      mainImagePath='/example/image'
      title='Example title'
    />,
  );

describe('HutRenovationCard', () => {
  it('renders the card container', () => {
    renderHutRenovationCard();

    expect(screen.getByTestId('hut-renovation-card')).toBeInTheDocument();
  });

  it('renders the configured title', () => {
    renderHutRenovationCard();

    expect(screen.getByText('Example title')).toBeInTheDocument();
  });

  it('renders the configured description', () => {
    renderHutRenovationCard();

    expect(screen.getByText('Example description')).toBeInTheDocument();
  });

  it('renders the configured main image', () => {
    renderHutRenovationCard();

    expect(screen.getByTestId('hut-renovation-card-image')).toHaveStyle(
      'background-image: url("/example/image")',
    );
  });

  it('passes the gallery images to ImageGalleryDialog', () => {
    renderHutRenovationCard();

    expect(screen.getByTestId('image-gallery-dialog')).toHaveAttribute(
      'data-images-count',
      String(galleryImages.length),
    );
  });

  it('keeps ImageGalleryDialog closed initially', () => {
    renderHutRenovationCard();

    expect(screen.getByTestId('image-gallery-dialog')).toHaveAttribute(
      'data-open',
      'false',
    );
  });

  it('opens ImageGalleryDialog when the image button is clicked', () => {
    renderHutRenovationCard();

    fireEvent.click(screen.getByTestId('hut-renovation-card-button'));

    expect(screen.getByTestId('image-gallery-dialog')).toHaveAttribute(
      'data-open',
      'true',
    );
  });

  it('closes ImageGalleryDialog when setOpen is called with false', () => {
    renderHutRenovationCard();

    fireEvent.click(screen.getByTestId('hut-renovation-card-button'));
    fireEvent.click(screen.getByTestId('image-gallery-dialog-close-button'));

    expect(screen.getByTestId('image-gallery-dialog')).toHaveAttribute(
      'data-open',
      'false',
    );
  });
});
