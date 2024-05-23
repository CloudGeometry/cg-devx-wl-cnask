import { ApolloError } from '@apollo/client';
import { SmartForm } from '@cnask/shared/feature';

import { rules } from '@cnask/shared/utils';
import { Grid, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FormInput from '../../components/atoms/form-input/form-input';
import FormInputPassword from '../../components/atoms/form-input-password/form-input-password';
import StyledLoadingButton from '../../components/atoms/loading-button/loading-button';
import RouterLink from '../../components/atoms/router-link/router-link';

type LoginInput = {
  username: string;
  password: string;
  tenantAlias?: string;
};

const registerOptions = {
  username: rules.username,
  password: rules.password
};

export interface LoginFormProps {
  onSubmit: (values: LoginInput) => void;
  error?: ApolloError;
  loading: boolean;
  tenantLoginEnabled: boolean;
}

export function LoginForm({ onSubmit, loading, error, tenantLoginEnabled }: LoginFormProps) {
  const { t } = useTranslation();
  return (
    <>
      <Grid
        container
        justifyContent='center'
        rowSpacing={5}
        sx={{
          maxWidth: { sm: '45rem' },
          marginInline: 'auto'
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Typography
            variant='h6'
            component='h1'
            sx={{ textAlign: 'center', mb: '1.5rem' }}
          >
            {t('features.auth.login.title')}
          </Typography>

          <SmartForm<LoginInput>
            onSubmit={onSubmit}
            error={error}
            values={{
              username: '',
              password: ''
            }}
          >
            <FormInput
              label={t('features.auth.login.username')}
              type='text'
              name='username'
              autoComplete='username'
              rules={registerOptions.username}
              required
              focused
            />
            <FormInputPassword
              autoComplete='current-password'
              label={t('features.auth.login.password')}
              name='password'
              rules={registerOptions.password}
              required
            />
            {tenantLoginEnabled && (<FormInput
              label={t('features.auth.login.tenantAlias')}
              type='text'
              name='tenantAlias'
            />)}

            <StyledLoadingButton loading={loading}>
              {t('features.auth.login.submit')}
            </StyledLoadingButton>
          </SmartForm>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent='center'
      >
        <Stack sx={{ mt: '3rem', textAlign: 'center' }}>
          <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
            Need an account? <RouterLink to='/signup'>Sign up here</RouterLink>
          </Typography>
          <Typography sx={{ fontSize: '0.9rem' }}>
            Forgot your <RouterLink to='/forgot-password'>password?</RouterLink>
          </Typography>
        </Stack>
      </Grid>
    </>
  );
}

export default LoginForm;
