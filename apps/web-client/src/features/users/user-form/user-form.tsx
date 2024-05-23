import { ColoredAvatar } from '@cnask/shared/ui';
import { MeFieldsFragment, RoleFieldsFragment } from '@cnask/utils/api-client';
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { BaseState } from '../types';

export type UserFormProps = {
  onRoleChange: (roleId: string) => void;
  onStateChange: (active: boolean) => void;
  roles: RoleFieldsFragment[];
} & MeFieldsFragment;

export function UserForm({
  baseState,
  username,
  id,
  role,
  onRoleChange,
  onStateChange,
  roles
}: UserFormProps) {
  const handleChangeRole = (e: SelectChangeEvent<string>) => {
    onRoleChange(e.target.value as string);
  };

  const handleChangeState = (e: SelectChangeEvent<string>) => {
    onStateChange(e.target.value === BaseState.Active);
  };

  return (
    <Grid container>
      <Grid
        item
        xs={3}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}
        >
          <ColoredAvatar username={username ?? 'Anonymous'} />
        </Box>
      </Grid>
      <Grid
        item
        xs={9}
      >
        <Box>
          <FormControl
            variant='standard'
            sx={{ m: 1, minWidth: 80 }}
          >
            <InputLabel id={id + '-state'}>User state:</InputLabel>
            <Select
              onChange={(e) => handleChangeState(e)}
              value={baseState}
              id={id + '-state'}
            >
              {Object.values(BaseState)?.map((state) => (
                <MenuItem
                  key={state}
                  value={state}
                >
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl
            variant='standard'
            sx={{ m: 1, minWidth: 80 }}
          >
            <InputLabel id={id + '-role'}>Role:</InputLabel>
            <Select
              onChange={(e) => handleChangeRole(e)}
              value={role?.id}
              id={id + '-role'}
            >
              {roles?.map((role) => (
                <MenuItem
                  key={role.id}
                  value={role.id}
                >
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
}

export default UserForm;
