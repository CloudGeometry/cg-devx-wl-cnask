import { ApolloError } from '@apollo/client/errors';
import { SmartForm } from '@cnask/shared/feature';
import { FormInput, StyledLoadingButton } from '@cnask/shared/ui';
import { MeFieldsFragment, UpdateProfileInput } from '@cnask/utils/api-client';

import {
  ValidationRules,
  isValidEmail,
  isValidName
} from '@cnask/shared/utils';

import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export interface ProfileFormProps {
  user: MeFieldsFragment | null;
  onSubmit: (values: UpdateProfileInput) => Promise<void>;
  errors?: ApolloError;
  loading: boolean;
}

// todo names validation
const registerOptions: ValidationRules = {
  email: { validate: (value) => (value ? isValidEmail(value) : true) },
  firstname: { validate: (value) => (value ? isValidName(value) : true) },
  lastname: { validate: (value) => (value ? isValidName(value) : true) }
};

export function ProfileForm({
  onSubmit,
  loading,
  errors,
  user
}: ProfileFormProps) {
  const { t } = useTranslation();

  return (
    <>
      <Typography
        variant='h6'
        component='h3'
        sx={{ textAlign: 'center', mb: '1.5rem' }}
      >
        {t('features.profile.accountForm.title')}
      </Typography>

      <SmartForm<Pick<UpdateProfileInput, 'email' | 'firstname' | 'lastname'>>
        onSubmit={onSubmit}
        values={{
          email: user?.profile?.email,
          firstname: user?.profile?.firstname,
          lastname: user?.profile?.lastname
        }}
      >
        <FormInput
          type='email'
          autoComplete='email'
          label={t('features.profile.accountForm.email')}
          name='email'
          rules={registerOptions.email}
        />

        <FormInput
          type='text'
          autoComplete='name'
          label={t('features.profile.accountForm.firstname')}
          name='firstname'
          rules={registerOptions.firstname}
        />

        <FormInput
          autoComplete='name'
          type='text'
          label={t('features.profile.accountForm.lastname')}
          name='lastname'
          rules={registerOptions.lastname}
        />

        <StyledLoadingButton loading={loading}>
          {t('features.profile.accountForm.submit')}
        </StyledLoadingButton>
      </SmartForm>
    </>
  );
}
export default ProfileForm;
