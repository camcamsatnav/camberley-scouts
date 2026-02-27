import { useToast } from '../../common/hooks/useToast';
import { HTTP_STATUS } from '../../common/constants';
import { usePost } from '../../common/hooks/usePost';
import { HttpError } from '../../common/errors/HttpError';
import { type RecipientType } from '../constants';

interface ContactFormData {
  name: string;
  recipientType: RecipientType;
  senderEmail: string;
  body: string;
  sendCopy: boolean;
  phone?: string;
}

export const useContactFormSubmit = () => {

  const { post, data, loading } = usePost<void, ContactFormData>();

  const { success, error } = useToast();

  const submitContactForm = async (formData: ContactFormData) => {
    try {
      await post('/contact', formData);
      success('Your message has been sent successfully.', 'Form submitted');
    } catch (e) {
      if (e instanceof HttpError) {
        if (e.status === HTTP_STATUS.TOO_MANY_REQUESTS) {
          error('You have submitted this form too many times, please try again later.', 'Failed to submit form');
          return;
        }
      }
      error('Something went wrong, please try again later.', 'Failed to submit form');
    }
  };

  return { submitContactForm, data, loading };
};
