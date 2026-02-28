import { render, screen } from '@testing-library/react';
import { it, expect } from 'vitest';
import { JOIN_BEAVERS_IMAGES } from '../constants';
import { JoinImages } from './JoinImages';

it('should render JoinImages correctly', () => {
  render(<JoinImages images={JOIN_BEAVERS_IMAGES} />);

  expect(screen.getByTestId('join-images')).toBeInTheDocument();
  JOIN_BEAVERS_IMAGES.forEach(image => {
    const imgElement = screen.getByAltText(image.alt);
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', image.src);
    expect(imgElement).toHaveAttribute('alt', image.alt);
  });
});
