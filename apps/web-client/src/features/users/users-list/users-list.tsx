import { MeFieldsFragment, UsersQuery } from '@cnask/utils/api-client';
import { List } from '@mui/material';
import { UserItem } from '../ui/user-item/user-item';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { AbilityContext } from '@cnask/casl/feature';
import { useAbility } from '@casl/react';

export interface UsersListProps {
  data: UsersQuery | undefined;
  loading: boolean;
}

export function UsersList({ data, loading }: UsersListProps) {
  const navigate = useNavigate();

  const ability = useAbility(AbilityContext);
  const canUpdate = ability.can('update', 'User');

  const onEdit = useCallback(
    (value: MeFieldsFragment) => {
      return canUpdate ? navigate(`/users/edit/${value.id}`) : undefined;
    },
    [navigate, canUpdate]
  );

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {data?.users?.map((user) => (
        <UserItem
          key={user.id}
          {...{ value: user, loading: false, onEdit, disabled: !canUpdate }}
        />
      ))}
    </List>
  );
}

export default UsersList;
