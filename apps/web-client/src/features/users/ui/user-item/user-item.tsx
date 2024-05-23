import { ColoredAvatar } from '@cnask/shared/ui';
import { MeFieldsFragment } from '@cnask/utils/api-client';
import { ItemActionButton } from '@cnask/shared/ui';
import {
  Fade,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';
import { Fragment, useState } from 'react';

export function UserItem({
  value,
  loading,
  onEdit,
  disabled
}: {
  value: MeFieldsFragment | undefined;
  loading?: boolean;
  onEdit: (value: MeFieldsFragment) => void;
  disabled?: boolean;
}) {
  const [isHovered, setHovered] = useState(false);

  if (!value) return null;

  return (
    <ListItem
      sx={{
        '&:hover': { bgcolor: 'rgba(grey.600, 0.3)' },
        maxWidth: 600,
        margin: 'auto auto 20px auto',
        cursor: disabled ? 'default' : 'pointer'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      secondaryAction={
        isHovered && (
          <Fade>
            <>
              {!disabled && (
                <ItemActionButton
                  type='update'
                  onClick={() => onEdit(value)}
                  disabled={loading}
                />
              )}

              <div />
            </>
          </Fade>
        )
      }
      disablePadding
    >
      <ListItemButton
        sx={({ palette }) => ({
          borderRadius: 4,
          padding: 2,
          border: '1px solid ' + palette.grey[600]
        })}
        onClick={() => onEdit(value)}
      >
        <ListItemAvatar>
          <ColoredAvatar username={value.username ?? 'Anonymous'} />
        </ListItemAvatar>
        <ListItemText
          sx={{
            ml: 2
          }}
          primary={value.profile?.firstname + ' ' + value.profile?.lastname}
          secondary={
            <Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component='span'
                variant='body2'
                color='text.primary'
              >
                username: {value?.username}
              </Typography>
              <Typography
                component='span'
                sx={{ display: 'block' }}
              >
                role: {value.role?.name}
              </Typography>
              <Typography component='span'>state: {value.baseState}</Typography>
            </Fragment>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}

export default UserItem;
