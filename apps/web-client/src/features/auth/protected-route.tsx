import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './auth-provider';
import { getToken } from '../../app/utils';

export function ProtectedRoute() {
  const { user } = useAuth();
  const token = getToken();
  // Redirect them to the /login page, but save the current location they were
  // trying to go to when they were redirected. This allows us to send them
  // along to that page after they log in, which is a nicer user experience
  // than dropping them off on the home page.

  const location = useLocation();

  if (!user && token) {
    return <>Loading...</>;
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate
      to={'/login'}
      state={{ from: location }}
      replace
    />
  );
}
