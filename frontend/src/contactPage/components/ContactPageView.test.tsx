import * as ReactRouter from 'react-router';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RecipientTypes } from '../constants';
import { ContactPageView } from './ContactPageView';

vi.mock('../hooks/useContactFormSubmit', () => ({
  useContactFormSubmit: () => ({
    submitContactForm: vi.fn(),
    data: undefined,
    loading: false,
  }),
}));

const recipientTypeLabels: Record<string, string> = {
  [RecipientTypes.GENERAL]: 'General',
  [RecipientTypes.BEAVERS]: 'Beavers',
  [RecipientTypes.CUBS]: 'Cubs',
  [RecipientTypes.SCOUTS]: 'Scouts',
  [RecipientTypes.VOLUNTEER]: 'Volunteering',
};

const setSearchParams = (query: string | null) => {
  const params = new URLSearchParams(query !== null ? { query } : {});
  vi.spyOn(ReactRouter, 'useSearchParams').mockReturnValue([params, vi.fn()]);
};

afterEach(() => {
  vi.restoreAllMocks();
});

it('should render ContactPage correctly', () => {
  render(<ContactPageView />);

  expect(screen.getByTestId('contact-page')).toBeInTheDocument();
});

it('should render the page heading with the correct title', () => {
  render(<ContactPageView />);

  expect(screen.getByTestId('page-heading')).toBeInTheDocument();
  expect(screen.getByText('Contact')).toBeInTheDocument();
});

it('should render the info section with the correct text', () => {
  render(<ContactPageView />);

  expect(screen.getByTestId('contact-page-title')).toBeInTheDocument();
  expect(screen.getByTestId('contact-page-text')).toBeInTheDocument();
  expect(screen.getByText('We\'d love to hear from you.')).toBeInTheDocument();
  expect(screen.getByText(
    'Whether you have a question, need support, or want to volunteer, just drop us a message. Our team will get back to you as soon as possible.',
  )).toBeInTheDocument();
});

it('should render the google maps iframe', () => {
  render(<ContactPageView />);

  expect(screen.getByTestId('contact-page-map')).toBeInTheDocument();
});

it('should render the contact form', () => {
  render(<ContactPageView />);

  expect(screen.getByTestId('contact-form')).toBeInTheDocument();
});

describe('query param', () => {
  it.each(Object.values(RecipientTypes))('should pass "%s" to the form when query param is valid', (recipientType) => {
    setSearchParams(recipientType);
    render(<ContactPageView />);

    expect(screen.getByRole('combobox')).toHaveTextContent(recipientTypeLabels[recipientType]);
  });

  it.each([
    ['undefined', null],
    ['empty string', ''],
    ['invalid value', 'INVALID'],
    ['wrong case - lowercase', 'cubs'],
    ['wrong case - mixed case', 'Cubs'],
  ])('should fall back to GENERAL when query param is %s', (_, query) => {
    setSearchParams(query);
    render(<ContactPageView />);

    expect(screen.getByRole('combobox')).toHaveTextContent(recipientTypeLabels[RecipientTypes.GENERAL]);
  });
});
