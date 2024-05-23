import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Login, ProtectedRoute } from '../features/auth';
import Layout from './layout/layout';
import Tenants from '../features/tenants/tenants';
import { TenantNew } from '../features/tenants/tenant-new/tenant-new';
import { TenantUpdate } from '../features/tenants/tenant-update/tenant-update';

const NotFound = () => {
  return <div>404</div>;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <Navigate to={'/tenants'} />,
        index: true
      },
      {
        path: '/login',
        element: <Login />
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/tenants',
            element: <Tenants />,
            children: [
              {
                path: 'new',
                element: <TenantNew />
              },
              {
                path: 'edit/:id',
                element: <TenantUpdate />
              }
            ]
          }
        ]
      },

      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);
