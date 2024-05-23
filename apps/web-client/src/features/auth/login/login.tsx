import { AuthFormLayout, LoginForm } from '@cnask/shared/ui';
import { LoginInput } from '@cnask/utils/api-client';
import { useAuth } from '../auth-provider';

import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export const Login = () => {
  const {
    login: { action, loading, error }
  } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = useCallback(
    (values: LoginInput) => {
      action(values, () => {
        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.
        navigate(from, { replace: true });
      });
    },
    [navigate, from, action]
  );

  return (
    <AuthFormLayout>
      <LoginForm
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        tenantLoginEnabled={true}
      />
    </AuthFormLayout>
  );
};

export default Login;
