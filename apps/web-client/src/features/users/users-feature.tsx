import { useUsersQuery } from '@cnask/utils/api-client';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import UsersList from './users-list/users-list';
import { FabAddButton } from '@cnask/shared/ui';
import { useCallback } from 'react';
import { useAbility } from '@casl/react';
import { AbilityContext } from '@cnask/casl/feature';
import { useNotistack } from '@cnask/shared/feature';

export function UsersFeature() {
  const { showErrorNotification } = useNotistack();

  const { data, loading } = useUsersQuery({
    fetchPolicy: 'cache-and-network',
    onError: (error) => {
      showErrorNotification(error);
    }
  });

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        position: 'relative'
      }}
    >
      <Box
        sx={{
          flexGrow: 1
        }}
      >
        <UsersList
          data={data}
          loading={loading}
        />

        <AddUserButton />
        <Outlet />
      </Box>
    </Box>
  );
}

export default UsersFeature;

function AddUserButton() {
  const navigate = useNavigate();
  const onAdd = useCallback(() => {
    navigate('/users/new');
  }, [navigate]);
  const ability = useAbility(AbilityContext);

  if (!ability.can('create', 'User')) {
    return null;
  }

  return <FabAddButton onClick={onAdd} />;
}
