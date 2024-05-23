import { ApolloError } from '@apollo/client';
import { SmartForm } from '@cnask/shared/feature';
import { FormInput, FormInputPassword, RouterLink } from '@cnask/shared/ui';
import { rules } from '@cnask/shared/utils';
import LoadingButton from '@mui/lab/LoadingButton';
import { Grid, Stack, Typography } from '@mui/material';

type SignupInput = {
  email: string;
  firstname: string;
  lastname: string;
  locale?: string;
  password: string;
  phoneNumber?: string;
  role?: string;
  username: string;
  inviteId?: string;
  tenantAlias?: string;
};

export interface SignUpFormProps {
  onSubmit: (values: SignupInput) => void;
  errors?: ApolloError;
  loading: boolean;
  inviteData?: {
    id: string;
    email: string;
    tenantAlias: string;
  };
}

export function SignUpForm({ onSubmit, loading, inviteData }: SignUpFormProps) {
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
            Sign up to your account
          </Typography>
          <SmartForm<SignupInput>
            onSubmit={onSubmit}
            values={{
              username: '',
              email: inviteData?.email || '',
              lastname: '',
              firstname: '',
              password: '',
              inviteId: inviteData?.id || undefined,
              tenantAlias: inviteData?.tenantAlias
            }}
          >
            <FormInput
              label='Enter your username'
              type='text'
              name='username'
              rules={rules.username}
              required
            />
            <FormInput
              label='Enter your firstname'
              type='text'
              name='firstname'
              rules={rules.firstname}
              required
            />
            <FormInput
              label='Enter your lastname'
              type='text'
              name='lastname'
              rules={rules.lastname}
              required
            />
            <FormInput
              label='Enter your email'
              type='email'
              name='email'
              rules={rules.email}
              required
              disabled={!!inviteData?.email}
            />
            <FormInputPassword
              label='Password'
              name='password'
              rules={rules.password}
              required
            />

            <LoadingButton
              loading={loading}
              type='submit'
              variant='contained'
              sx={{
                py: '0.8rem',
                mt: 2,
                width: '80%',
                marginInline: 'auto'
              }}
            >
              Sign up
            </LoadingButton>
          </SmartForm>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent='center'
      >
        <Stack sx={{ mt: '3rem', textAlign: 'center' }}>
          <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
            Already have an account?{' '}
            <RouterLink to='/login'>Log in here</RouterLink>
          </Typography>
          <Typography sx={{ fontSize: '0.9rem' }}>
            Forgot your <RouterLink to='/forgot-password'>password?</RouterLink>
          </Typography>
        </Stack>
      </Grid>
    </>
  );
}

export default SignUpForm;
