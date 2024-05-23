import { Login, ProtectedRoute, SignUp } from '../features/auth';
import { ProfileFeature } from '../features/profile';
import { TodoEdit, TodoFeature, TodoNew } from '../features/todo';
import { ButtonsView, Form, Table } from '@cnask/examples';
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import { Layout } from './layout/layout';
import { UserEdit, UsersFeature, UserNew } from '../features/users';
import { ConfirmInvite } from '../features/confirm-invite/confirm-invite';
import { ConfirmTenantRegistration } from '../features/confirm-tenant-registration/confirm-tenant-registration';

const NotFound = () => {
  return <div>404</div>;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <Navigate to={'/todo'} />,
        index: true
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/confirm-invite',
        element: <ConfirmInvite />
      },
      {
        path: '/confirm-tenant-registration',
        element: <ConfirmTenantRegistration />
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/profile',
            element: <ProfileFeature />
          },
          {
            path: '/todo',
            element: <TodoFeature />,
            children: [
              {
                path: 'new',
                element: <TodoNew />
              },
              {
                path: 'edit/:id',
                element: <TodoEdit />
              }
            ]
          },
          {
            path: '/users',
            element: <UsersFeature />,
            children: [
              {
                path: 'new',
                element: <UserNew />
              },
              {
                path: 'edit/:id',
                element: <UserEdit />
              }
            ]
          }
        ]
      },

      {
        path: '/components',
        element: <Outlet />,

        children: [
          {
            path: 'buttons',
            element: <ButtonsView />
          },
          {
            path: 'table',
            element: <Table />
          },
          {
            path: 'form',
            element: <Form />
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
