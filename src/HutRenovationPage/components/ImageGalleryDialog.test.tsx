import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { ImageGalleryDialog } from './ImageGalleryDialog';

it('should render ImageGalleryDialog correctly', () => {
  render(
    <ImageGalleryDialog
      open={true}
      setOpen={vi.fn()}
      images={[
        { src: '/example/image1', alt: 'image1' },
        { src: '/example/image2', alt: 'image2' },
      ]}
    />,
  );

  expect(screen.getByTestId('image-gallery-dialog')).toBeInTheDocument();
  expect(screen.getByTestId('image-gallery-dialog-close-button')).toBeInTheDocument();
  expect(screen.getByTestId('image-gallery-dialog-prev-button')).toBeInTheDocument();
  expect(screen.getByTestId('image-gallery-dialog-next-button')).toBeInTheDocument();
  expect(screen.getByTestId('image-gallery-dialog-image')).toBeInTheDocument();

  expect(screen.getByTestId('image-gallery-dialog-image')).toHaveAttribute('src', '/example/image1');
  expect(screen.getByTestId('image-gallery-dialog-image')).toHaveAttribute('alt', 'image1');
});

it('should handle next and prev button presses', () => {
  render(
    <ImageGalleryDialog
      open={true}
      setOpen={vi.fn()}
      images={[
        { src: '/example/image1', alt: 'image1' },
        { src: '/example/image2', alt: 'image2' },
      ]}
    />,
  );

  // first page, previous button should be disabled
  expect(screen.getByTestId('image-gallery-dialog-prev-button')).toBeDisabled();
  expect(screen.getByTestId('image-gallery-dialog-next-button')).not.toBeDisabled();

  fireEvent.click(screen.getByTestId('image-gallery-dialog-next-button'));

  // second page, next button should be disabled
  expect(screen.getByTestId('image-gallery-dialog-prev-button')).not.toBeDisabled();
  expect(screen.getByTestId('image-gallery-dialog-next-button')).toBeDisabled();

  fireEvent.click(screen.getByTestId('image-gallery-dialog-next-button'));

  // still second page, next button should be disabled
  expect(screen.getByTestId('image-gallery-dialog-prev-button')).not.toBeDisabled();
  expect(screen.getByTestId('image-gallery-dialog-next-button')).toBeDisabled();

  fireEvent.click(screen.getByTestId('image-gallery-dialog-prev-button'));

  // back to first page, previous button should be disabled
  expect(screen.getByTestId('image-gallery-dialog-prev-button')).toBeDisabled();
  expect(screen.getByTestId('image-gallery-dialog-next-button')).not.toBeDisabled();
});

it('should render correctly when open is false', () => {
  render(
    <ImageGalleryDialog
      open={false}
      setOpen={vi.fn()}
      images={[
        { src: '/example/image1', alt: 'image1' },
        { src: '/example/image2', alt: 'image2' },
      ]}
    />,
  );

  expect(screen.queryByTestId('image-gallery-dialog')).not.toBeInTheDocument();
});

it('should handle close button click', () => {
  const setOpen = vi.fn();

  render(
    <ImageGalleryDialog
      open={true}
      setOpen={setOpen}
      images={[
        { src: '/example/image1', alt: 'image1' },
        { src: '/example/image2', alt: 'image2' },
      ]}
    />,
  );

  fireEvent.click(screen.getByTestId('image-gallery-dialog-close-button'));

  expect(setOpen).toHaveBeenCalledWith(false);
});

it('should reset to first image when reopening the dialog', () => {
  const { rerender } = render(
    <ImageGalleryDialog
      open={true}
      setOpen={vi.fn()}
      images={[
        { src: '/example/image1', alt: 'image1' },
        { src: '/example/image2', alt: 'image2' },
      ]}
    />,
  );

  // go to next image
  fireEvent.click(screen.getByTestId('image-gallery-dialog-next-button'));
  expect(screen.getByTestId('image-gallery-dialog-image')).toHaveAttribute('src', '/example/image2');
  expect(screen.getByTestId('image-gallery-dialog-image')).toHaveAttribute('alt', 'image2');

  // close dialog
  rerender(
    <ImageGalleryDialog
      open={false}
      setOpen={vi.fn()}
      images={[
        { src: '/example/image1', alt: 'image1' },
        { src: '/example/image2', alt: 'image2' },
      ]}
    />,
  );

  // reopen dialog
  rerender(
    <ImageGalleryDialog
      open={true}
      setOpen={vi.fn()}
      images={[
        { src: '/example/image1', alt: 'image1' },
        { src: '/example/image2', alt: 'image2' },
      ]}
    />,
  );
  expect(screen.getByTestId('image-gallery-dialog-image')).toHaveAttribute('src', '/example/image1');
  expect(screen.getByTestId('image-gallery-dialog-image')).toHaveAttribute('alt', 'image1');
});

it('should handle keyboard navigation', async () => {
  const setOpen = vi.fn();
  render(
    <ImageGalleryDialog
      open={true}
      setOpen={setOpen}
      images={[
        { src: '/example/image1', alt: 'image1' },
        { src: '/example/image2', alt: 'image2' },
      ]}
    />,
  );

  fireEvent.keyDown(document, { key: 'ArrowRight' });

  expect(screen.getByTestId('image-gallery-dialog-image')).toHaveAttribute('src', '/example/image2');
  expect(screen.getByTestId('image-gallery-dialog-image')).toHaveAttribute('alt', 'image2');

  fireEvent.keyDown(document, { key: 'ArrowRight' });
  // still on second image
  expect(screen.getByTestId('image-gallery-dialog-image')).toHaveAttribute('src', '/example/image2');
  expect(screen.getByTestId('image-gallery-dialog-image')).toHaveAttribute('alt', 'image2');

  fireEvent.keyDown(document, { key: 'ArrowLeft' });

  expect(screen.getByTestId('image-gallery-dialog-image')).toHaveAttribute('src', '/example/image1');
  expect(screen.getByTestId('image-gallery-dialog-image')).toHaveAttribute('alt', 'image1');

  fireEvent.keyDown(document, { key: 'ArrowLeft' });
  // still on first image
  expect(screen.getByTestId('image-gallery-dialog-image')).toHaveAttribute('src', '/example/image1');
  expect(screen.getByTestId('image-gallery-dialog-image')).toHaveAttribute('alt', 'image1');

  // close dialog using escape
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(setOpen).toHaveBeenCalledWith(false);
});
