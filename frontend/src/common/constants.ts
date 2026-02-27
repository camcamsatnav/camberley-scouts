export const FACEBOOK_URL = 'https://www.facebook.com/camberley478';

export const INSTAGRAM_URL = 'https://www.instagram.com/camberley.478.scout.group';

export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
} as const;

export const ROUTES = {
  HOME: '/',
  JOIN: {
    BEAVERS: '/beavers',
    CUBS: '/cubs',
    SCOUTS: '/scouts',
  },
  PARENTS: {
    SHOP: '/shop',
  },
  VOLUNTEERS: {
    FUNDRAISING: '/fundraising',
    VOLUNTEER: '/volunteer',
  },
  ABOUT: {
    HUT_RENOVATION: '/about-us/hut-renovation',
    BOOKINGS: '/about-us/bookings',
    DOCUMENTATION: '/about-us/documentation',
    FAQ: '/about-us/faq',
    CONTACT: '/about-us/contact',
  },
};
