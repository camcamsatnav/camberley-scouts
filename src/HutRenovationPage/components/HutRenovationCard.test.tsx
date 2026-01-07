import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { HutRenovationCard } from './HutRenovationCard';

it('should render HutRenovationCard correctly', () => {
  render(
    <HutRenovationCard
      title={'Example title'} mainImagePath={'/example/image'} description={'Example description'}
    />,
  );

  expect(screen.getByTestId('hut-renovation-card')).toBeInTheDocument();
  expect(screen.getByTestId('hut-renovation-card-image')).toBeInTheDocument();
  expect(screen.getByTestId('hut-renovation-card-button')).toBeInTheDocument();

  expect(screen.getByRole('img')).toHaveStyle('background-image: url("/example/image")');
  expect(screen.getByText('Example title')).toBeInTheDocument();
  expect(screen.getByText('Example description')).toBeInTheDocument();
});
