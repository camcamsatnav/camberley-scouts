import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { RecipientTypes } from '../../contactPage/constants';
import {
  JOIN_BEAVERS_IMAGES,
  JOIN_BEAVERS_LOCATIONS,
  JOIN_BEAVERS_LOGO,
} from '../constants';
import { JoinBeaversPage } from './JoinBeaversPage';

vi.mock('../../common/components/PageHeading', () => ({
  PageHeading: ({ title }: { title: string }) => (
    <div data-testid='page-heading'>{title}</div>
  ),
}));

vi.mock('./JoinIntro', () => ({
  JoinIntro: ({
    title,
    image,
    ageRange,
    locations,
    recipientType,
  }: {
    title: string;
    image: { src: string; alt: string };
    ageRange: string;
    locations: unknown[];
    recipientType: string;
  }) => (
    <div
      data-age-range={ageRange}
      data-image-alt={image.alt}
      data-image-src={image.src}
      data-locations-count={locations.length}
      data-recipient-type={recipientType}
      data-testid='join-intro'
    >
      {title}
    </div>
  ),
}));

vi.mock('./JoinInformation', () => ({
  JoinInformation: ({
    textLines,
    activityLines,
  }: {
    textLines: string[];
    activityLines: string[];
  }) => (
    <div
      data-activity-lines-count={activityLines.length}
      data-testid='join-info'
      data-text-lines-count={textLines.length}
    />
  ),
}));

vi.mock('./JoinImages', () => ({
  JoinImages: ({ images }: { images: unknown[] }) => (
    <div data-images-count={images.length} data-testid='join-images' />
  ),
}));

const renderJoinBeaversPage = () => render(<JoinBeaversPage />);

describe('JoinBeaversPage', () => {
  it('renders the page container', () => {
    renderJoinBeaversPage();

    expect(screen.getByTestId('join-beavers-page')).toBeInTheDocument();
  });

  it('renders the page heading title', () => {
    renderJoinBeaversPage();

    expect(screen.getByTestId('page-heading')).toHaveTextContent('Beavers');
  });

  it('passes the translated intro title to JoinIntro', () => {
    renderJoinBeaversPage();

    expect(screen.getByTestId('join-intro')).toHaveTextContent(
      'We have 2 Beaver Colonies',
    );
  });

  it('passes the configured logo to JoinIntro', () => {
    renderJoinBeaversPage();

    expect(screen.getByTestId('join-intro')).toHaveAttribute(
      'data-image-src',
      JOIN_BEAVERS_LOGO.src,
    );
  });

  it('passes the configured locations to JoinIntro', () => {
    renderJoinBeaversPage();

    expect(screen.getByTestId('join-intro')).toHaveAttribute(
      'data-locations-count',
      String(JOIN_BEAVERS_LOCATIONS.length),
    );
  });

  it('passes the Beavers recipient type to JoinIntro', () => {
    renderJoinBeaversPage();

    expect(screen.getByTestId('join-intro')).toHaveAttribute(
      'data-recipient-type',
      RecipientTypes.BEAVERS,
    );
  });

  it('passes information text lines to JoinInformation', () => {
    renderJoinBeaversPage();

    expect(screen.getByTestId('join-info')).toHaveAttribute(
      'data-text-lines-count',
      '2',
    );
  });

  it('passes activity lines to JoinInformation', () => {
    renderJoinBeaversPage();

    expect(screen.getByTestId('join-info')).toHaveAttribute(
      'data-activity-lines-count',
      '5',
    );
  });

  it('passes the configured images to JoinImages', () => {
    renderJoinBeaversPage();

    expect(screen.getByTestId('join-images')).toHaveAttribute(
      'data-images-count',
      String(JOIN_BEAVERS_IMAGES.length),
    );
  });
});
