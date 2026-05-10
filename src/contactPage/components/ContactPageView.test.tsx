import * as ReactRouter from '@tanstack/react-router';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RecipientTypes } from '../constants';
import { ContactPageView } from './ContactPageView';

vi.mock('../../common/components/PageHeading', () => ({
  PageHeading: ({ title }: { title: string }) => (
    <div data-testid='page-heading'>{title}</div>
  ),
}));

vi.mock('./ContactForm', () => ({
  ContactForm: ({ defaultQuery }: { defaultQuery?: string }) => (
    <div data-default-query={defaultQuery} data-testid='contact-form' />
  ),
}));

const setSearchParams = (query: string | null) => {
  vi.spyOn(ReactRouter, 'useSearch').mockReturnValue(
    query === null ? {} : { query },
  );
};

const renderContactPageView = () => render(<ContactPageView />);

describe('ContactPageView', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the page container', () => {
    renderContactPageView();

    expect(screen.getByTestId('contact-page')).toBeInTheDocument();
  });

  it('renders the page heading title', () => {
    renderContactPageView();

    expect(screen.getByTestId('page-heading')).toHaveTextContent('Contact');
  });

  it('renders the info heading', () => {
    renderContactPageView();

    expect(screen.getByText("We'd love to hear from you.")).toBeInTheDocument();
  });

  it('renders the info body copy', () => {
    renderContactPageView();

    expect(
      screen.getByText(
        'Whether you have a question, need support, or want to volunteer, just drop us a message. Our team will get back to you as soon as possible.',
      ),
    ).toBeInTheDocument();
  });

  it('renders the Google Maps iframe', () => {
    renderContactPageView();

    expect(screen.getByTestId('contact-page-map')).toBeInTheDocument();
  });

  it('renders the contact form', () => {
    renderContactPageView();

    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
  });

  it.each(
    Object.values(RecipientTypes),
  )('passes "%s" to ContactForm when the query param is valid', (recipientType) => {
    setSearchParams(recipientType);
    renderContactPageView();

    expect(screen.getByTestId('contact-form')).toHaveAttribute(
      'data-default-query',
      recipientType,
    );
  });

  it.each([
    ['undefined', null],
    ['empty string', ''],
    ['invalid value', 'INVALID'],
    ['wrong case - lowercase', 'cubs'],
    ['wrong case - mixed case', 'Cubs'],
  ])('passes GENERAL to ContactForm when the query param is %s', (_, query) => {
    setSearchParams(query);
    renderContactPageView();

    expect(screen.getByTestId('contact-form')).toHaveAttribute(
      'data-default-query',
      RecipientTypes.GENERAL,
    );
  });
});
