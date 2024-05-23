import { Avatar, AvatarProps } from '@mui/material';
import { stringAvatar } from './utils';

export interface ColoredAvatarProps extends AvatarProps {
  firstname?: string;
  lastname?: string;
  username: string;
}

export function ColoredAvatar({ username, ...rest }: ColoredAvatarProps) {
  return (
    <Avatar
      {...rest}
      {...stringAvatar(username ?? '')}
    />
  );
}

export default ColoredAvatar;
