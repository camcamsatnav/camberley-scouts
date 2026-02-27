export const GOOGLE_MAPS_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d623.1375550672341!2d-0.7541541900344815!3d51.33779221851142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48742aac380a7c9d%3A0x8e40237acac77c48!2sCamberley%20478%20Scout%20Group!5e0!3m2!1sen!2suk!4v1771871528012!5m2!1sen!2suk';

// eslint-disable-next-line max-len
export const UK_PHONE_REGEX = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?#(\d{4}|\d{3}))?$/;

// This matches RecipientTypes in email.validator.ts in the backend
export const RecipientTypes = {
  BEAVERS: 'BEAVERS',
  CUBS: 'CUBS',
  SCOUTS: 'SCOUTS',
  VOLUNTEER: 'VOLUNTEER',
  GENERAL: 'GENERAL',
} as const;

export type RecipientType = (typeof RecipientTypes)[keyof typeof RecipientTypes];
