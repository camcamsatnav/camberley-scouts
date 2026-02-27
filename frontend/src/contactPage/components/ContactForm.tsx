import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { type TFunction } from 'i18next';
import { useMemo } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { RecipientTypes, UK_PHONE_REGEX } from '../constants';
import { useContactFormSubmit } from '../hooks/useContactFormSubmit';

import '../less/contactForm.less';

const createSchema = (t: TFunction) => z.object({
  name: z.string().min(1, t('aboutUs.contact.form.name.required')).max(100, t('aboutUs.contact.form.name.maxLength')),
  email: z.email(t('aboutUs.contact.form.email.invalid')),
  phone: z.string().regex(UK_PHONE_REGEX, t('aboutUs.contact.form.phone.invalid')).or(z.literal('')).optional(),
  query: z.string().min(1, t('aboutUs.contact.form.query.required')),
  message: z.string().min(1, t('aboutUs.contact.form.message.required')).max(
    2000,
    t('aboutUs.contact.form.message.maxLength'),
  ),
  sendCopy: z.boolean(),
});

type Inputs = z.infer<ReturnType<typeof createSchema>>;

interface ContactFormProps {
  defaultQuery?: string;
}

export const ContactForm = ({ defaultQuery }: ContactFormProps) => {

  const { t } = useTranslation();

  const schema = useMemo(() => createSchema(t), [t]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', phone: '', query: defaultQuery ?? 'GENERAL', message: '', sendCopy: false },
  });

  const { submitContactForm, loading } = useContactFormSubmit();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await submitContactForm({
      name: data.name,
      senderEmail: data.email,
      phone: data.phone,
      recipientType: data.query as (typeof RecipientTypes)[keyof typeof RecipientTypes],
      body: data.message,
      sendCopy: data.sendCopy,
    });
  };

  return (
    <div className='contact-form' data-testid='contact-form'>
      <span className='contact-form__title' data-testid='contact-form-text'>{t('aboutUs.contact.form.title')}</span>
      <form
        className='contact-form__form'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-label={t('aboutUs.contact.form.title')}
        data-testid='contact-form-form'
      >
        <TextField
          {...register('name')}
          label={t('aboutUs.contact.form.name.label')}
          required
          error={!!errors.name}
          helperText={errors.name?.message ?? ' '}
          placeholder={t('aboutUs.contact.form.name.placeholder')}
        />
        <TextField
          {...register('email')}
          label={t('aboutUs.contact.form.email.label')}
          required
          error={!!errors.email}
          helperText={errors.email?.message ?? ' '}
          placeholder={t('aboutUs.contact.form.email.placeholder')}
        />
        <TextField
          {...register('phone')}
          label={t('aboutUs.contact.form.phone.label')}
          error={!!errors.phone}
          helperText={errors.phone?.message ?? ' '}
          placeholder={t('aboutUs.contact.form.phone.placeholder')}
        />
        <FormControl required error={!!errors.query}>
          <InputLabel id='query-type-label'>{t('aboutUs.contact.form.query.label')}</InputLabel>
          <Controller
            name='query'
            control={control}
            render={({ field }) => (
              <Select {...field} labelId='query-type-label' label={t('aboutUs.contact.form.query.label')} fullWidth>
                <MenuItem value={RecipientTypes.GENERAL}>{t('aboutUs.contact.form.query.general')}</MenuItem>
                <MenuItem value={RecipientTypes.BEAVERS}>{t('aboutUs.contact.form.query.beavers')}</MenuItem>
                <MenuItem value={RecipientTypes.CUBS}>{t('aboutUs.contact.form.query.cubs')}</MenuItem>
                <MenuItem value={RecipientTypes.SCOUTS}>{t('aboutUs.contact.form.query.scouts')}</MenuItem>
                <MenuItem value={RecipientTypes.VOLUNTEER}>{t('aboutUs.contact.form.query.volunteer')}</MenuItem>
              </Select>
            )}
          />
          <FormHelperText>{errors.query?.message ?? ' '}</FormHelperText>
        </FormControl>
        <TextField
          {...register('message')}
          label={t('aboutUs.contact.form.message.label')}
          required
          error={!!errors.message}
          helperText={errors.message?.message ?? ' '}
          placeholder={t('aboutUs.contact.form.message.placeholder')}
          multiline
          rows={6}
        />
        <FormControlLabel
          control={<Checkbox {...register('sendCopy')} />} label={t('aboutUs.contact.form.copy.label')}
        />
        <div className='contact-form__form__buttons'>
          <Button
            variant='outlined'
            color='primary'
            size='large'
            type='button'
            onClick={() => reset()}
            disabled={loading}
            data-testid='contact-form-reset-button'
          >
            {t('aboutUs.contact.form.buttons.reset')}
          </Button>
          <Button
            variant='contained'
            color='primary'
            size='large'
            type='submit'
            disabled={loading}
            data-testid='contact-form-submit-button'
          >
            {t('aboutUs.contact.form.buttons.submit')}
          </Button>
        </div>
      </form>
    </div>
  );
};
