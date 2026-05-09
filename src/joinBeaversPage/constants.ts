import type { FileImage } from '../common/types';
import type { LocationCardProps } from './components/LocationCard';

export const BEAVERS_LOCATION_ONE: LocationCardProps = {
  title: 'join.beavers.location1.title',
  sessionTimes: 'join.beavers.location1.sessionTimes',
  addressLines: 'join.beavers.location1.addressLines',
  googleMapsLink: 'https://maps.app.goo.gl/CFDX869WgfsKcrbs7',
  spacesAvailable: true,
};

export const BEAVERS_LOCATION_TWO: LocationCardProps = {
  title: 'join.beavers.location2.title',
  sessionTimes: 'join.beavers.location2.sessionTimes',
  addressLines: 'join.beavers.location2.addressLines',
  googleMapsLink: 'https://maps.app.goo.gl/Mu9sFMDQs1YHnjRy9',
  spacesAvailable: false,
};

export const JOIN_BEAVERS_LOCATIONS: LocationCardProps[] = [
  BEAVERS_LOCATION_ONE,
  BEAVERS_LOCATION_TWO,
];

export const JOIN_BEAVERS_IMAGES: FileImage[] = [
  { src: '/joinBeaversPage/joinbeavers1.jpg', alt: 'Beavers climbing' },
  {
    src: '/joinBeaversPage/joinbeavers2.jpg',
    alt: 'Beavers at an outdoor event',
  },
  {
    src: '/joinBeaversPage/joinbeavers3.jpg',
    alt: 'Beavers at the Surrey Bazzaz',
  },
];

export const JOIN_BEAVERS_LOGO: FileImage = {
  src: '/homePage/beavers.png',
  alt: 'Beavers',
};
