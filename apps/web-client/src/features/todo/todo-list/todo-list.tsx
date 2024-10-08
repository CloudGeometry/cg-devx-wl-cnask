import { useAbility } from '@casl/react';
import { AbilityContext } from '@cnask/casl/feature';
import { ItemFieldsFragment, ItemState } from '@cnask/utils/api-client';
import {
  Checkbox,
  Fade,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useState } from 'react';

import { ItemProps, ItemsViewProps } from '../types';
import { ItemActionButton } from '@cnask/shared/ui';

export function TodoList({
  data,
  onEdit,
  onDelete,
  onStateToggle,
  loadingState
}: ItemsViewProps<ItemFieldsFragment>) {
  return (
    <List sx={{ width: '100%', p: 3, bgcolor: 'background.paper' }}>
      {data?.map((value) => (
        <TodoItem
          key={value.id}
          value={value}
          onEdit={onEdit}
          onDelete={onDelete}
          onStateToggle={onStateToggle}
          loading={!!loadingState[value.id]}
        />
      ))}
    </List>
  );
}
export default TodoList;

export function TodoItem({
  value,
  loading,
  onStateToggle,
  onEdit,
  onDelete
}: ItemProps<ItemFieldsFragment>) {
  const labelId = `checkbox-list-label-${value.id}`;
  const [isHovered, setHovered] = useState(false);

  const ability = useAbility(AbilityContext);

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
              {ability.can('update', 'Item') && (
                <ItemActionButton
                  type='update'
                  onClick={() => onEdit(value)}
                  disabled={loading}
                />
              )}
              {ability.can('delete', 'Item') && (
                <ItemActionButton
                  sx={{ ml: 2 }}
                  type='delete'
                  disabled={loading}
                  onClick={() => onDelete(value)}
                />
              )}
            </>
          </Fade>
        )
      }
      disablePadding
    >
      <ListItemButton
        role={undefined}
        onClick={() => onStateToggle(value)}
        dense
        disabled={loading || !ability.can('update', 'Item')}
        sx={({ palette }) => ({
          borderRadius: 4,
          padding: 2,
          border: '1px solid ' + palette.grey[600]
        })}
      >
        <ListItemIcon>
          <Checkbox
            edge='start'
            checked={value.itemState === ItemState.Done}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>

        <ListItemText
          id={labelId}
          primary={value.title}
        />
      </ListItemButton>
    </ListItem>
  );
}
