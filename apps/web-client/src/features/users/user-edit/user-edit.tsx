import { useNotistack } from '@cnask/shared/feature';
import {
  MeFieldsFragment,
  useActivateUserMutation,
  useDeactivateUserMutation,
  useRolesQuery,
  useUpdateUserRoleMutation,
  useUsersQuery
} from '@cnask/utils/api-client';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserForm } from '../user-form/user-form';
import { BootsrappedDialog } from '@cnask/shared/ui';

export function UserEdit() {
  const { id } = useParams<{ id: string }>();
  const { showErrorNotification } = useNotistack();

  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/users');
  };
  const { data } = useUsersQuery({
    fetchPolicy: 'cache-and-network',
    onError: (error) => {
      showErrorNotification(error);
    }
  });

  const userData = data?.users?.find((user) => user.id === id);

  const { data: rolesData, loading: rolesLoading } = useRolesQuery({
    fetchPolicy: 'cache-and-network',
    onError: (error) => {
      showErrorNotification(error);
    }
  });

  const [updateRole] = useUpdateUserRoleMutation({
    onError: (error) => {
      showErrorNotification(error);
    },
    update: (cache, { data }) => {
      if (data?.updateUserRole) {
        cache.modify({
          fields: {
            users: (existingUsers: MeFieldsFragment[] = []) => {
              return existingUsers.map((i: MeFieldsFragment) => {
                if (i.id === id) {
                  return {
                    ...i,
                    ...data.updateUserRole
                  };
                }
                return i;
              });
            }
          }
        });
      }
    }
  });

  const [activate] = useActivateUserMutation({
    variables: {
      id: id as string
    },
    onError: (error) => {
      showErrorNotification(error);
    },
    update: (cache, { data }) => {
      if (data?.activateUser) {
        cache.modify({
          fields: {
            users: (existingUsers: MeFieldsFragment[] = []) => {
              return existingUsers.map((i: MeFieldsFragment) => {
                if (i.id === id) {
                  return {
                    ...i,
                    ...data.activateUser
                  };
                }
                return i;
              });
            }
          }
        });
      }
    }
  });

  const [deactivate] = useDeactivateUserMutation({
    variables: {
      id: id as string
    },
    onError: (error) => {
      showErrorNotification(error);
    },
    update: (cache, { data }) => {
      if (data?.deactivateUser) {
        cache.modify({
          fields: {
            users: (existingUsers: MeFieldsFragment[] = []) => {
              return existingUsers.map((i: MeFieldsFragment) => {
                if (i.id === id) {
                  return {
                    ...i,
                    ...data.deactivateUser
                  };
                }
                return i;
              });
            }
          }
        });
      }
    }
  });

  const onRoleChange = useCallback(
    (roleId: string) => {
      updateRole({
        variables: {
          id: id as string,
          data: {
            roleId
          }
        }
      });
    },
    [id, updateRole]
  );
  const onStateChange = useCallback(
    (active: boolean) => {
      if (active) {
        activate();
      } else {
        deactivate();
      }
    },
    [activate, deactivate]
  );

  return (
    <BootsrappedDialog
      onClose={handleClose}
      heading={
        <>
          Edit User: <strong>{userData?.username}</strong>
        </>
      }
    >
      {userData?.id && rolesData?.roles ? (
        <UserForm
          {...userData}
          onRoleChange={onRoleChange}
          onStateChange={onStateChange}
          roles={rolesData.roles}
        />
      ) : (
        <p>Loading...</p>
      )}
    </BootsrappedDialog>
  );
}

export default UserEdit;
