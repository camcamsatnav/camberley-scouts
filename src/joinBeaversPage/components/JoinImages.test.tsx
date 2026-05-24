import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { JOIN_BEAVERS_IMAGES } from '../constants';
import { JoinImages } from './JoinImages';

const renderJoinImages = () =>
  render(<JoinImages images={JOIN_BEAVERS_IMAGES} />);

describe('JoinImages', () => {
  it('renders the image section', () => {
    renderJoinImages();

    expect(screen.getByTestId('join-images')).toBeInTheDocument();
  });

  it.each(
    JOIN_BEAVERS_IMAGES,
  )('renders $alt with the configured source', (image) => {
    renderJoinImages();

    expect(screen.getByAltText(image.alt)).toHaveAttribute('src', image.src);
  });
});
