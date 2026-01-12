import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, it } from 'vitest';
import { HutRenovationCard } from './HutRenovationCard';

it('should render HutRenovationCard correctly', () => {
  render(
    <HutRenovationCard
      title={'Example title'}
      mainImagePath={'/example/image'}
      description={'Example description'}
      galleryImages={[{ src: '/example/image1', alt: 'image1' }, { src: '/example/image2', alt: 'image2' }]}
    />,
  );

  expect(screen.getByTestId('hut-renovation-card')).toBeInTheDocument();
  expect(screen.getByTestId('hut-renovation-card-image')).toBeInTheDocument();
  expect(screen.getByTestId('hut-renovation-card-button')).toBeInTheDocument();

  expect(screen.getByRole('img')).toHaveStyle('background-image: url("/example/image")');
  expect(screen.getByText('Example title')).toBeInTheDocument();
  expect(screen.getByText('Example description')).toBeInTheDocument();
});

it('should handle image gallery correctly', async () => {
  render(
    <HutRenovationCard
      title={'Example title'}
      mainImagePath={'/example/image'}
      description={'Example description'}
      galleryImages={[{ src: '/example/image1', alt: 'image1' }, { src: '/example/image2', alt: 'image2' }]}
    />,
  );

  // open image gallery
  fireEvent.click(screen.getByTestId('hut-renovation-card-button'));

  expect(screen.getByTestId('image-gallery-dialog')).toBeInTheDocument();

  expect(screen.getByTestId('image-gallery-dialog-image')).toHaveAttribute('src', '/example/image1');
  expect(screen.getByTestId('image-gallery-dialog-image')).toHaveAttribute('alt', 'image1');

  // go to next image
  fireEvent.click(screen.getByTestId('image-gallery-dialog-next-button'));

  expect(screen.getByTestId('image-gallery-dialog-image')).toHaveAttribute('src', '/example/image2');
  expect(screen.getByTestId('image-gallery-dialog-image')).toHaveAttribute('alt', 'image2');

  // close image gallery
  fireEvent.click(screen.getByTestId('image-gallery-dialog-close-button'));

  await waitFor(() => expect(screen.queryByTestId('image-gallery-dialog')).not.toBeInTheDocument());
});
