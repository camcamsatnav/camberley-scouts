import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ImageGalleryDialog } from './ImageGalleryDialog';

const images = [
  { src: '/example/image1', alt: 'image1' },
  { src: '/example/image2', alt: 'image2' },
];

const renderImageGalleryDialog = ({
  open = true,
  setOpen = vi.fn(),
}: {
  open?: boolean;
  setOpen?: (open: boolean) => void;
} = {}) =>
  render(<ImageGalleryDialog images={images} open={open} setOpen={setOpen} />);

const getImage = () => screen.getByTestId('image-gallery-dialog-image');
const getNextButton = () =>
  screen.getByTestId('image-gallery-dialog-next-button');
const getPrevButton = () =>
  screen.getByTestId('image-gallery-dialog-prev-button');

describe('ImageGalleryDialog', () => {
  it('renders the dialog when open', () => {
    renderImageGalleryDialog();

    expect(screen.getByTestId('image-gallery-dialog')).toBeInTheDocument();
  });

  it('does not render the dialog when closed', () => {
    renderImageGalleryDialog({ open: false });

    expect(
      screen.queryByTestId('image-gallery-dialog'),
    ).not.toBeInTheDocument();
  });

  it('renders the close button', () => {
    renderImageGalleryDialog();

    expect(
      screen.getByTestId('image-gallery-dialog-close-button'),
    ).toBeInTheDocument();
  });

  it('renders the previous button', () => {
    renderImageGalleryDialog();

    expect(getPrevButton()).toBeInTheDocument();
  });

  it('renders the next button', () => {
    renderImageGalleryDialog();

    expect(getNextButton()).toBeInTheDocument();
  });

  it('renders the first image source initially', () => {
    renderImageGalleryDialog();

    expect(getImage()).toHaveAttribute('src', '/example/image1');
  });

  it('renders the first image alt text initially', () => {
    renderImageGalleryDialog();

    expect(getImage()).toHaveAttribute('alt', 'image1');
  });

  it('disables the previous button on the first image', () => {
    renderImageGalleryDialog();

    expect(getPrevButton()).toBeDisabled();
  });

  it('enables the next button on the first image', () => {
    renderImageGalleryDialog();

    expect(getNextButton()).not.toBeDisabled();
  });

  it('advances to the next image when next is clicked', () => {
    renderImageGalleryDialog();

    fireEvent.click(getNextButton());

    expect(getImage()).toHaveAttribute('src', '/example/image2');
  });

  it('disables the next button on the last image', () => {
    renderImageGalleryDialog();

    fireEvent.click(getNextButton());

    expect(getNextButton()).toBeDisabled();
  });

  it('does not advance past the last image', () => {
    renderImageGalleryDialog();

    fireEvent.click(getNextButton());
    fireEvent.click(getNextButton());

    expect(getImage()).toHaveAttribute('src', '/example/image2');
  });

  it('returns to the previous image when previous is clicked', () => {
    renderImageGalleryDialog();

    fireEvent.click(getNextButton());
    fireEvent.click(getPrevButton());

    expect(getImage()).toHaveAttribute('src', '/example/image1');
  });

  it('does not move before the first image', () => {
    renderImageGalleryDialog();

    fireEvent.click(getPrevButton());

    expect(getImage()).toHaveAttribute('src', '/example/image1');
  });

  it('calls setOpen with false when the close button is clicked', () => {
    const setOpen = vi.fn();
    renderImageGalleryDialog({ setOpen });

    fireEvent.click(screen.getByTestId('image-gallery-dialog-close-button'));

    expect(setOpen).toHaveBeenCalledWith(false);
  });

  it('resets to the first image when reopened', () => {
    const { rerender } = renderImageGalleryDialog();

    fireEvent.click(getNextButton());
    rerender(
      <ImageGalleryDialog images={images} open={false} setOpen={vi.fn()} />,
    );
    rerender(
      <ImageGalleryDialog images={images} open={true} setOpen={vi.fn()} />,
    );

    expect(getImage()).toHaveAttribute('src', '/example/image1');
  });

  it('advances when ArrowRight is pressed', () => {
    renderImageGalleryDialog();

    fireEvent.keyDown(window, { key: 'ArrowRight' });

    expect(getImage()).toHaveAttribute('src', '/example/image2');
  });

  it('does not advance past the last image with ArrowRight', () => {
    renderImageGalleryDialog();

    fireEvent.keyDown(window, { key: 'ArrowRight' });
    fireEvent.keyDown(window, { key: 'ArrowRight' });

    expect(getImage()).toHaveAttribute('src', '/example/image2');
  });

  it('returns when ArrowLeft is pressed', () => {
    renderImageGalleryDialog();

    fireEvent.keyDown(window, { key: 'ArrowRight' });
    fireEvent.keyDown(window, { key: 'ArrowLeft' });

    expect(getImage()).toHaveAttribute('src', '/example/image1');
  });

  it('does not move before the first image with ArrowLeft', () => {
    renderImageGalleryDialog();

    fireEvent.keyDown(window, { key: 'ArrowLeft' });

    expect(getImage()).toHaveAttribute('src', '/example/image1');
  });

  it('calls setOpen with false when Escape is pressed', () => {
    const setOpen = vi.fn();
    renderImageGalleryDialog({ setOpen });

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(setOpen).toHaveBeenCalledWith(false);
  });
});
