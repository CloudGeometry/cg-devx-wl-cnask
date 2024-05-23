import { AuthFormLayout, SignUpForm } from '@cnask/shared/ui';
import { UserAddInput } from '@cnask/utils/api-client';
import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth-provider';

export function SignUp() {
  const {
    user,
    register: { action, loading, error }
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const inviteId = location.state?.id;
  const email = location.state?.email;
  const tenantAlias = location.state?.tenantAlias;

  const handleSubmit = useCallback(
    (values: UserAddInput) => {
      action({ ...values, tenantAlias }, () => navigate('/'));
    },
    [action, navigate]
  );

  useEffect(() => {
    if (user?.id) {
      navigate('/');
    }
  }, [navigate, user?.id]);

  return (
    <AuthFormLayout>
      <SignUpForm
        onSubmit={handleSubmit}
        loading={loading}
        errors={error}
        inviteData={{
          id: inviteId,
          email,
          tenantAlias,
        }}
      />
    </AuthFormLayout>
  );
}

export default SignUp;
