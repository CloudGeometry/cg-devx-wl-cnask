import { useState } from 'react';
import { ViewItemProps, ViewProps } from './types';
import {
  Fade,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import { ItemActionButton } from '@cnask/shared/ui';

export function TenantCardsView({
  data,
  onUpdate,
  onDelete,
  loadingState
}: ViewProps) {
  return (
    <List sx={{ width: '100%', p: 3, bgcolor: 'background.paper' }}>
      {data?.map((value) => (
        <TenantItem
          value={value}
          loading={loadingState[value.id]}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </List>
  );
}

export function TenantItem({
  value,
  loading,
  onUpdate,
  onDelete
}: ViewItemProps) {
  const labelId = `checkbox-list-label-${value.id}`;
  const [isHovered, setHovered] = useState(false);

  return (
    <ListItem
      sx={{
        '&:hover': { bgcolor: 'rgba(grey.600, 0.3)' },
        maxWidth: 600,
        margin: 'auto auto 20px auto'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      key={value.id}
      secondaryAction={
        isHovered && (
          <Fade>
            <>
              <ItemActionButton
                type='update'
                onClick={() => onUpdate(value)}
                disabled={loading}
              />
              <ItemActionButton
                sx={{ ml: 2 }}
                type='delete'
                disabled={loading}
                onClick={() => onDelete(value)}
              />
            </>
          </Fade>
        )
      }
      disablePadding
    >
      <ListItemButton
        role={undefined}
        onClick={() => onUpdate(value)}
        dense
        disabled={loading}
        sx={({ palette }) => ({
          borderRadius: 4,
          padding: 2,
          border: '1px solid ' + palette.grey[600]
        })}
      >
        <ListItemText
          id={labelId}
          primary={'Alias: ' + value.alias}
          secondary={
            <div>
              {/* <span color='text.primary'>owner: {value?.owner}</span> */}
              <div />
              <span>email: {value.email}</span>
              <div />
              <span>state: {value.status}</span>
            </div>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
