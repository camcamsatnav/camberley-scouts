import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { ContactPageView } from './ContactPageView';

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

