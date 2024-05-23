import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth-provider';

export function useRedirectIfAuthenticated(): void {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const navigate = useNavigate();

  if (isAuthenticated) {
    const locationState = location.state as {
      from: { pathname: string; search?: string };
    };
    const to = locationState?.from || { pathname: '/tenants' };
    navigate(to, {
      replace: true
    });
  }
}

export default useRedirectIfAuthenticated;
