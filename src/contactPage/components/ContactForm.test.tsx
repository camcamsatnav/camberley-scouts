import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { ContactForm } from './ContactForm';

const getNameInput = () => screen.getByRole('textbox', { name: /^name/i });
const getEmailInput = () => screen.getByRole('textbox', { name: /^email/i });
const getPhoneInput = () => screen.getByRole('textbox', { name: /^phone/i });
const getMessageInput = () => screen.getByRole('textbox', { name: /^message/i });
const getSubmitButton = () => screen.getByTestId('contact-form-submit-button');
const getResetButton = () => screen.getByTestId('contact-form-reset-button');

const fillValidForm = async () => {
  await userEvent.type(getNameInput(), 'Jane Smith');
  await userEvent.type(getEmailInput(), 'jane@example.com');
  await userEvent.type(getPhoneInput(), '07700 900123');
  await userEvent.type(getMessageInput(), 'Hello, I have a question.');
};

it('should render ContactForm correctly', () => {
  render(<ContactForm />);

  expect(screen.getByTestId('contact-form')).toBeInTheDocument();
  expect(screen.getByTestId('contact-form-text')).toBeInTheDocument();
  expect(screen.getByTestId('contact-form-form')).toBeInTheDocument();
  expect(screen.getByTestId('contact-form-submit-button')).toBeInTheDocument();
  expect(screen.getByTestId('contact-form-reset-button')).toBeInTheDocument();
});

it('should render all form fields with correct labels', () => {
  render(<ContactForm />);

  expect(screen.getByText('Please fill the form')).toBeInTheDocument();
  expect(getNameInput()).toBeInTheDocument();
  expect(getEmailInput()).toBeInTheDocument();
  expect(getPhoneInput()).toBeInTheDocument();
  expect(getMessageInput()).toBeInTheDocument();
  expect(screen.getByText('Send me a copy of this message')).toBeInTheDocument();
});

it('should render all form fields with correct placeholders', () => {
  render(<ContactForm />);

  expect(getNameInput()).toHaveAttribute('placeholder', 'e.g. Jane Smith');
  expect(getEmailInput()).toHaveAttribute('placeholder', 'e.g. jane@example.com');
  expect(getPhoneInput()).toHaveAttribute('placeholder', 'e.g. 07700 900123');
  expect(getMessageInput()).toHaveAttribute('placeholder', 'How can we help you?');
});

it('should render the query type dropdown with all options', () => {
  render(<ContactForm />);

  fireEvent.mouseDown(screen.getByRole('combobox'));

  expect(screen.getByRole('listbox')).toBeInTheDocument();

  expect(screen.getByRole('option', { name: 'General' })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: 'Beavers' })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: 'Cubs' })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: 'Scouts' })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: 'Volunteering' })).toBeInTheDocument();
});

it('should default the query type dropdown to General', () => {
  render(<ContactForm />);

  expect(screen.getByRole('combobox')).toHaveTextContent('General');
});

it('should render the submit and reset buttons with correct labels', () => {
  render(<ContactForm />);

  expect(getSubmitButton()).toHaveTextContent('Send message');
  expect(getResetButton()).toHaveTextContent('Clear form');
});

it('should show required validation errors when submitting empty form', async () => {
  render(<ContactForm />);

  fireEvent.click(getSubmitButton());

  expect(await screen.findByText('Please enter your name')).toBeInTheDocument();
  expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument();
  expect(await screen.findByText('Please enter a message')).toBeInTheDocument();
});

it('should show invalid email error when email format is wrong', async () => {
  render(<ContactForm />);

  await userEvent.type(getNameInput(), 'Jane Smith');
  await userEvent.type(getEmailInput(), 'not-an-email');
  await userEvent.type(getMessageInput(), 'Hello');
  fireEvent.click(getSubmitButton());

  expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument();
});

it('should show invalid phone error when phone format is wrong', async () => {
  render(<ContactForm />);

  await userEvent.type(getNameInput(), 'Jane Smith');
  await userEvent.type(getEmailInput(), 'jane@example.com');
  await userEvent.type(getPhoneInput(), '123');
  await userEvent.type(getMessageInput(), 'Hello');
  fireEvent.click(getSubmitButton());

  expect(await screen.findByText('Please enter a valid UK phone number')).toBeInTheDocument();
});

it('should not show phone error when phone is left empty', async () => {
  render(<ContactForm />);

  await userEvent.type(getNameInput(), 'Jane Smith');
  await userEvent.type(getEmailInput(), 'jane@example.com');
  await userEvent.type(getMessageInput(), 'Hello');
  fireEvent.click(getSubmitButton());

  await waitFor(() => {
    expect(screen.queryByText('Please enter a valid UK phone number')).not.toBeInTheDocument();
  });
});

it('should not show validation errors when form is valid', async () => {
  render(<ContactForm />);

  await fillValidForm();
  fireEvent.click(getSubmitButton());

  await waitFor(() => {
    expect(screen.queryByText('Please enter your name')).not.toBeInTheDocument();
    expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
    expect(screen.queryByText('Please enter a valid UK phone number')).not.toBeInTheDocument();
    expect(screen.queryByText('Please enter a message')).not.toBeInTheDocument();
  });
});

it('should allow selecting a different query type', async () => {
  render(<ContactForm />);

  const combobox = screen.getByRole('combobox');
  fireEvent.mouseDown(combobox);

  fireEvent.click(await screen.findByRole('option', { name: 'Beavers' }));

  expect(combobox).toHaveTextContent('Beavers');
});

it('should reset all fields to default values when reset is clicked', async () => {
  render(<ContactForm />);

  await fillValidForm();

  const combobox = screen.getByRole('combobox');
  fireEvent.mouseDown(combobox);
  fireEvent.click(await screen.findByRole('option', { name: 'Scouts' }));
  expect(combobox).toHaveTextContent('Scouts');

  fireEvent.click(getResetButton());

  await waitFor(() => {
    expect(getNameInput()).toHaveValue('');
    expect(getEmailInput()).toHaveValue('');
    expect(getPhoneInput()).toHaveValue('');
    expect(getMessageInput()).toHaveValue('');
    expect(combobox).toHaveTextContent('General');
  });
});

it('should clear validation errors after reset', async () => {
  render(<ContactForm />);

  fireEvent.click(getSubmitButton());
  expect(await screen.findByText('Please enter your name')).toBeInTheDocument();

  fireEvent.click(getResetButton());

  await waitFor(() => {
    expect(screen.queryByText('Please enter your name')).not.toBeInTheDocument();
  });
});

it('should toggle the send copy checkbox', async () => {
  render(<ContactForm />);

  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();

  await userEvent.click(checkbox);
  expect(checkbox).toBeChecked();

  await userEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
});

it('should reset the send copy checkbox to unchecked on reset', async () => {
  render(<ContactForm />);

  const checkbox = screen.getByRole('checkbox');
  await userEvent.click(checkbox);
  expect(checkbox).toBeChecked();

  fireEvent.click(getResetButton());

  await waitFor(() => {
    expect(checkbox).not.toBeChecked();
  });
});
