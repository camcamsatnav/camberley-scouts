import type { FileImage } from '../common/types';

export const RENOVATED_HUT_IMAGE_PATH = '/hutRenovationPage/renovated-hut.png';
export const REOPENING_CARD_IMAGE_PATH =
  '/hutRenovationPage/grandReopening/main.png';
export const PROGRESS_CARD_IMAGE_PATH = '/hutRenovationPage/progress/main.png';
export const IMPROVEMENTS_CARD_IMAGE_PATH =
  '/hutRenovationPage/improvements/main.png';

// TODO: Replace with actual images
export const REOPENING_CARD_IMAGES: FileImage[] = [
  {
    src: '/hutRenovationPage/grandReopening/main.png',
    alt: 'Grand reopening event 1',
  },
  {
    src: '/hutRenovationPage/improvements/main.png',
    alt: 'Grand reopening event 2',
  },
];

export const PROGRESS_CARD_IMAGES: FileImage[] = [
  {
    src: '/hutRenovationPage/progress/main.png',
    alt: 'Hut renovation progress 1',
  },
  {
    src: '/hutRenovationPage/improvements/main.png',
    alt: 'Hut renovation progress 2',
  },
];

export const IMPROVEMENTS_CARD_IMAGES: FileImage[] = [
  {
    src: '/hutRenovationPage/improvements/main.png',
    alt: 'Hut improvements 1',
  },
  {
    src: '/hutRenovationPage/grandReopening/main.png',
    alt: 'Hut improvements 2',
  },
];
