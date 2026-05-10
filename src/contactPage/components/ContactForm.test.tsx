import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ContactForm } from './ContactForm';

const mockSubmitContactForm = vi.fn();
let mockLoading = false;

const MAX_NAME_LENGTH = 100;
const ABOVE_MAX_NAME_LENGTH = MAX_NAME_LENGTH + 1;
const MAX_MESSAGE_LENGTH = 2000;
const ABOVE_MAX_MESSAGE_LENGTH = MAX_MESSAGE_LENGTH + 1;

vi.mock('../hooks/useContactFormSubmit', () => ({
  useContactFormSubmit: () => ({
    submitContactForm: mockSubmitContactForm,
    data: undefined,
    get loading() {
      return mockLoading;
    },
  }),
}));

const getNameInput = () => screen.getByRole('textbox', { name: /^name/i });
const getEmailInput = () => screen.getByRole('textbox', { name: /^email/i });
const getPhoneInput = () => screen.getByRole('textbox', { name: /^phone/i });
const getMessageInput = () =>
  screen.getByRole('textbox', { name: /^message/i });
const getSubmitButton = () => screen.getByTestId('contact-form-submit-button');
const getResetButton = () => screen.getByTestId('contact-form-reset-button');

const setFieldValue = (input: HTMLElement, value: string) => {
  fireEvent.change(input, { target: { value } });
};

const fillValidForm = () => {
  setFieldValue(getNameInput(), 'Jane Smith');
  setFieldValue(getEmailInput(), 'jane@example.com');
  setFieldValue(getPhoneInput(), '07700 900123');
  setFieldValue(getMessageInput(), 'Hello, I have a question.');
};

const renderContactForm = (props: Parameters<typeof ContactForm>[0] = {}) =>
  render(<ContactForm {...props} />);

describe('ContactForm', () => {
  beforeEach(() => {
    mockSubmitContactForm.mockReset();
    mockLoading = false;
  });

  describe('rendering', () => {
    it('renders the form container', () => {
      renderContactForm();

      expect(screen.getByTestId('contact-form')).toBeInTheDocument();
    });

    it('renders the form title', () => {
      renderContactForm();

      expect(screen.getByText('Please fill the form')).toBeInTheDocument();
    });

    it.each([
      ['name', getNameInput],
      ['email', getEmailInput],
      ['phone', getPhoneInput],
      ['message', getMessageInput],
    ])('renders the %s field', (_, getInput) => {
      renderContactForm();

      expect(getInput()).toBeInTheDocument();
    });

    it.each([
      ['name', getNameInput, 'e.g. Jane Smith'],
      ['email', getEmailInput, 'e.g. jane@example.com'],
      ['phone', getPhoneInput, 'e.g. 07700 900123'],
      ['message', getMessageInput, 'How can we help you?'],
    ])('renders the %s placeholder', (_, getInput, placeholder) => {
      renderContactForm();

      expect(getInput()).toHaveAttribute('placeholder', placeholder);
    });

    it.each([
      'General',
      'Beavers',
      'Cubs',
      'Scouts',
      'Volunteering',
    ])('renders the query type option "%s"', (optionLabel) => {
      renderContactForm();

      fireEvent.mouseDown(screen.getByRole('combobox'));

      expect(
        screen.getByRole('option', { name: optionLabel }),
      ).toBeInTheDocument();
    });

    it('defaults the query type dropdown to General', () => {
      renderContactForm();

      expect(screen.getByRole('combobox')).toHaveTextContent('General');
    });

    it('renders the send copy checkbox label', () => {
      renderContactForm();

      expect(
        screen.getByText('Send me a copy of this message'),
      ).toBeInTheDocument();
    });

    it('renders the submit button label', () => {
      renderContactForm();

      expect(getSubmitButton()).toHaveTextContent('Send message');
    });

    it('renders the reset button label', () => {
      renderContactForm();

      expect(getResetButton()).toHaveTextContent('Clear form');
    });
  });

  describe('query type', () => {
    it('allows selecting a different query type', async () => {
      renderContactForm();

      const combobox = screen.getByRole('combobox');
      fireEvent.mouseDown(combobox);

      fireEvent.click(await screen.findByRole('option', { name: 'Beavers' }));

      expect(combobox).toHaveTextContent('Beavers');
    });

    it('uses the default query type from props', () => {
      renderContactForm({ defaultQuery: 'CUBS' });

      expect(screen.getByRole('combobox')).toHaveTextContent('Cubs');
    });

    it('falls back to General when defaultQuery is undefined', () => {
      renderContactForm({ defaultQuery: undefined });

      expect(screen.getByRole('combobox')).toHaveTextContent('General');
    });
  });

  describe('reset', () => {
    it('resets the name field', async () => {
      renderContactForm();

      setFieldValue(getNameInput(), 'Jane Smith');
      fireEvent.click(getResetButton());

      await waitFor(() => {
        expect(getNameInput()).toHaveValue('');
      });
    });

    it('resets the email field', async () => {
      renderContactForm();

      setFieldValue(getEmailInput(), 'jane@example.com');
      fireEvent.click(getResetButton());

      await waitFor(() => {
        expect(getEmailInput()).toHaveValue('');
      });
    });

    it('resets the phone field', async () => {
      renderContactForm();

      setFieldValue(getPhoneInput(), '07700 900123');
      fireEvent.click(getResetButton());

      await waitFor(() => {
        expect(getPhoneInput()).toHaveValue('');
      });
    });

    it('resets the message field', async () => {
      renderContactForm();

      setFieldValue(getMessageInput(), 'Hello, I have a question.');
      fireEvent.click(getResetButton());

      await waitFor(() => {
        expect(getMessageInput()).toHaveValue('');
      });
    });

    it('resets the query type to General', async () => {
      renderContactForm();

      const combobox = screen.getByRole('combobox');
      fireEvent.mouseDown(combobox);
      fireEvent.click(await screen.findByRole('option', { name: 'Scouts' }));
      fireEvent.click(getResetButton());

      await waitFor(() => {
        expect(combobox).toHaveTextContent('General');
      });
    });

    it('resets the send copy checkbox to unchecked', async () => {
      renderContactForm();

      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      fireEvent.click(getResetButton());

      await waitFor(() => {
        expect(checkbox).not.toBeChecked();
      });
    });

    it('clears validation errors', async () => {
      renderContactForm();

      fireEvent.click(getSubmitButton());
      await screen.findByText('Please enter your name');
      fireEvent.click(getResetButton());

      await waitFor(() => {
        expect(
          screen.queryByText('Please enter your name'),
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('send copy', () => {
    it('checks the send copy checkbox when clicked', () => {
      renderContactForm();

      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);

      expect(checkbox).toBeChecked();
    });

    it('unchecks the send copy checkbox when clicked again', () => {
      renderContactForm();

      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      fireEvent.click(checkbox);

      expect(checkbox).not.toBeChecked();
    });
  });

  describe('validation', () => {
    it.each([
      ['name', 'Please enter your name'],
      ['email', 'Please enter a valid email address'],
      ['message', 'Please enter a message'],
    ])('shows the required %s validation error', async (_, errorMessage) => {
      renderContactForm();

      fireEvent.click(getSubmitButton());

      expect(await screen.findByText(errorMessage)).toBeInTheDocument();
    });

    it('shows invalid email error when email format is wrong', async () => {
      renderContactForm();

      setFieldValue(getNameInput(), 'Jane Smith');
      setFieldValue(getEmailInput(), 'not-an-email');
      setFieldValue(getMessageInput(), 'Hello');
      fireEvent.click(getSubmitButton());

      expect(
        await screen.findByText('Please enter a valid email address'),
      ).toBeInTheDocument();
    });

    it('shows invalid phone error when phone format is wrong', async () => {
      renderContactForm();

      setFieldValue(getNameInput(), 'Jane Smith');
      setFieldValue(getEmailInput(), 'jane@example.com');
      setFieldValue(getPhoneInput(), '123');
      setFieldValue(getMessageInput(), 'Hello');
      fireEvent.click(getSubmitButton());

      expect(
        await screen.findByText('Please enter a valid UK phone number'),
      ).toBeInTheDocument();
    });

    it('allows phone to be empty', async () => {
      renderContactForm();

      setFieldValue(getNameInput(), 'Jane Smith');
      setFieldValue(getEmailInput(), 'jane@example.com');
      setFieldValue(getMessageInput(), 'Hello');
      fireEvent.click(getSubmitButton());

      await waitFor(() => {
        expect(
          screen.queryByText('Please enter a valid UK phone number'),
        ).not.toBeInTheDocument();
      });
    });

    it.each([
      ['name', 'Please enter your name'],
      ['email', 'Please enter a valid email address'],
      ['phone', 'Please enter a valid UK phone number'],
      ['message', 'Please enter a message'],
    ])('does not show the %s validation error when valid', async (_, error) => {
      renderContactForm();

      fillValidForm();
      fireEvent.click(getSubmitButton());

      await waitFor(() => {
        expect(screen.queryByText(error)).not.toBeInTheDocument();
      });
    });

    it('shows error when name exceeds 100 characters', async () => {
      renderContactForm();

      setFieldValue(getNameInput(), 'a'.repeat(ABOVE_MAX_NAME_LENGTH));
      fireEvent.click(getSubmitButton());

      expect(
        await screen.findByText('Name must be less than 100 characters'),
      ).toBeInTheDocument();
    });

    it('allows name to be exactly 100 characters', async () => {
      renderContactForm();

      setFieldValue(getNameInput(), 'a'.repeat(MAX_NAME_LENGTH));
      setFieldValue(getEmailInput(), 'jane@example.com');
      setFieldValue(getMessageInput(), 'Hello');
      fireEvent.click(getSubmitButton());

      await waitFor(() => {
        expect(
          screen.queryByText('Name must be less than 100 characters'),
        ).not.toBeInTheDocument();
      });
    });

    it('shows error when message exceeds 2000 characters', async () => {
      renderContactForm();

      setFieldValue(getNameInput(), 'Jane Smith');
      setFieldValue(getEmailInput(), 'jane@example.com');
      setFieldValue(getMessageInput(), 'a'.repeat(ABOVE_MAX_MESSAGE_LENGTH));
      fireEvent.click(getSubmitButton());

      expect(
        await screen.findByText('Message must be less than 2000 characters'),
      ).toBeInTheDocument();
    });

    it('allows message to be exactly 2000 characters', async () => {
      renderContactForm();

      setFieldValue(getNameInput(), 'Jane Smith');
      setFieldValue(getEmailInput(), 'jane@example.com');
      setFieldValue(getMessageInput(), 'a'.repeat(MAX_MESSAGE_LENGTH));
      fireEvent.click(getSubmitButton());

      await waitFor(() => {
        expect(
          screen.queryByText('Message must be less than 2000 characters'),
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('submission', () => {
    it('calls submitContactForm once on valid submission', async () => {
      renderContactForm();

      fillValidForm();
      fireEvent.click(getSubmitButton());

      await waitFor(() => {
        expect(mockSubmitContactForm).toHaveBeenCalledOnce();
      });
    });

    it('submits the typed name', async () => {
      renderContactForm();

      fillValidForm();
      fireEvent.click(getSubmitButton());

      await waitFor(() => {
        expect(mockSubmitContactForm).toHaveBeenCalledWith(
          expect.objectContaining({ name: 'Jane Smith' }),
        );
      });
    });

    it('submits the typed email', async () => {
      renderContactForm();

      fillValidForm();
      fireEvent.click(getSubmitButton());

      await waitFor(() => {
        expect(mockSubmitContactForm).toHaveBeenCalledWith(
          expect.objectContaining({ senderEmail: 'jane@example.com' }),
        );
      });
    });

    it('submits the typed phone number', async () => {
      renderContactForm();

      fillValidForm();
      fireEvent.click(getSubmitButton());

      await waitFor(() => {
        expect(mockSubmitContactForm).toHaveBeenCalledWith(
          expect.objectContaining({ phone: '07700 900123' }),
        );
      });
    });

    it('submits the typed message body', async () => {
      renderContactForm();

      fillValidForm();
      fireEvent.click(getSubmitButton());

      await waitFor(() => {
        expect(mockSubmitContactForm).toHaveBeenCalledWith(
          expect.objectContaining({ body: 'Hello, I have a question.' }),
        );
      });
    });

    it('submits sendCopy false by default', async () => {
      renderContactForm();

      fillValidForm();
      fireEvent.click(getSubmitButton());

      await waitFor(() => {
        expect(mockSubmitContactForm).toHaveBeenCalledWith(
          expect.objectContaining({ sendCopy: false }),
        );
      });
    });

    it('submits sendCopy true when checkbox is checked', async () => {
      renderContactForm();

      fillValidForm();
      fireEvent.click(screen.getByRole('checkbox'));
      fireEvent.click(getSubmitButton());

      await waitFor(() => {
        expect(mockSubmitContactForm).toHaveBeenCalledWith(
          expect.objectContaining({ sendCopy: true }),
        );
      });
    });

    it('submits the selected query type', async () => {
      renderContactForm();

      fillValidForm();
      fireEvent.mouseDown(screen.getByRole('combobox'));
      fireEvent.click(await screen.findByRole('option', { name: 'Beavers' }));
      fireEvent.click(getSubmitButton());

      await waitFor(() => {
        expect(mockSubmitContactForm).toHaveBeenCalledWith(
          expect.objectContaining({ recipientType: 'BEAVERS' }),
        );
      });
    });

    it('does not submit an invalid form', async () => {
      renderContactForm();

      fireEvent.click(getSubmitButton());

      await screen.findByText('Please enter your name');
      expect(mockSubmitContactForm).not.toHaveBeenCalled();
    });

    it('disables the submit button while loading', () => {
      mockLoading = true;
      renderContactForm();

      expect(getSubmitButton()).toBeDisabled();
    });

    it('disables the reset button while loading', () => {
      mockLoading = true;
      renderContactForm();

      expect(getResetButton()).toBeDisabled();
    });

    it('enables the submit button when not loading', () => {
      renderContactForm();

      expect(getSubmitButton()).not.toBeDisabled();
    });

    it('enables the reset button when not loading', () => {
      renderContactForm();

      expect(getResetButton()).not.toBeDisabled();
    });
  });
});
