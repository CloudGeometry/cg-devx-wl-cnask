import { StyledLoadingButton } from '@cnask/shared/ui';
import {
  ValidationRules,
  rules,
  useSetServerErrors
} from '@cnask/shared/utils';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material';
import { useRef, useState, MouseEvent } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ApolloError } from '@apollo/client';

type ChangePasswordInput = {
  oldPassword: string;
  newPassword: string;
};

const registerOptions: ValidationRules = {
  password: rules.password
};

export interface PasswordFormProps {
  onSubmit: (values: ChangePasswordInput) => Promise<void>;
  error?: ApolloError;
  loading: boolean;
}

export function PasswordForm({
  onSubmit,
  loading,
  error,
  ...rest
}: PasswordFormProps) {
  const {
    watch,
    control,
    setError,
    formState: { errors: errorsForm },
    handleSubmit
  } = useForm({
    values: {
      oldPassword: '',
      newPassword: '',
      newPasswordRepeat: ''
    }
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const { t } = useTranslation();
  const password = useRef({});

  password.current = watch('newPassword', '');

  // 👇 Submit Handler
  const onSubmitHandler: SubmitHandler<ChangePasswordInput> = async (
    values: ChangePasswordInput
  ) => {
    await onSubmit({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword
    });
  };

  useSetServerErrors(setError, error);
  return (
    <>
      <Typography
        variant='h6'
        component='h3'
        sx={{ textAlign: 'center', mb: '1.5rem' }}
      >
        {t('features.profile.passwordForm.title')}
      </Typography>

      <Box
        display='flex'
        flexDirection='column'
        component='form'
        noValidate
        autoComplete='off'
        p={1}
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <input
          type='text'
          autoComplete='username'
          hidden={true}
        />

        <Controller
          control={control}
          name='oldPassword'
          defaultValue=''
          rules={registerOptions.password}
          render={({ field }) => (
            <TextField
              {...field}
              type='password'
              autoComplete='current-password'
              label={t('features.profile.passwordForm.currentPassword')}
              variant='outlined'
              sx={{ mb: '1.5rem' }}
              error={!!errorsForm?.oldPassword}
              helperText={(errorsForm?.oldPassword?.message || '') as string}
            />
          )}
        />

        <Controller
          control={control}
          name='newPassword'
          defaultValue=''
          rules={registerOptions.password}
          render={({ field }) => (
            <TextField
              {...field}
              autoComplete='new-password'
              label={t('features.profile.passwordForm.newPassword')}
              variant='outlined'
              sx={{ mb: '1.5rem' }}
              error={!!errorsForm?.newPassword}
              helperText={(errorsForm?.newPassword?.message || '') as string}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position='end'
                    sx={{
                      mr: '1rem'
                    }}
                  >
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          )}
        />
        <Controller
          control={control}
          name='newPasswordRepeat'
          defaultValue=''
          rules={registerOptions.password}
          render={({ field }) => (
            <TextField
              {...field}
              type='password'
              autoComplete='new-password'
              label={t('features.profile.passwordForm.newPasswordRepeat')}
              variant='outlined'
              sx={{ mb: '1.5rem' }}
              error={!!errorsForm?.newPasswordRepeat}
              helperText={
                (errorsForm?.newPasswordRepeat?.message || '') as string
              }
            />
          )}
        />

        <StyledLoadingButton loading={loading}>
          {t('features.profile.passwordForm.submit')}
        </StyledLoadingButton>
      </Box>
    </>
  );
}

export default PasswordForm;
