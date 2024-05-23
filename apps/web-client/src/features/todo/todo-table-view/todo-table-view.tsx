import { ItemFieldsFragment, ItemState } from '@cnask/utils/api-client';
import {
  Box,
  Checkbox,
  Fade,
  TableBody,
  TableCell,
  TableRow
} from '@mui/material';
import { useState } from 'react';
import { useAbility } from '@casl/react';
import { AbilityContext } from '@cnask/casl/feature';
import { TableBodyContainer } from '../ui/table-body-container/table-body-container';

import { TodoTableHead } from '../ui/todo-table-head/todo-table-head';

import { ItemProps, ItemsViewProps } from '../types';
import { ItemActionButton } from '@cnask/shared/ui';

export function TodoTableView({
  data,
  onDelete,
  onEdit,
  onStateToggle,
  loadingState
}: ItemsViewProps<ItemFieldsFragment>) {
  return (
    <TableBodyContainer>
      <TodoTableHead />
      <TableBody>
        {data?.map((value) => (
          <TodoTableRow
            key={value.id}
            value={value}
            onEdit={onEdit}
            onDelete={onDelete}
            onStateToggle={onStateToggle}
            loading={!!loadingState[value.id]}
          />
        ))}
      </TableBody>
    </TableBodyContainer>
  );
}

export default TodoTableView;

export function TodoTableRow({
  value,
  loading,
  onStateToggle,
  onEdit,
  onDelete
}: ItemProps<ItemFieldsFragment>) {
  const [isHovered, setHovered] = useState(false);
  const ability = useAbility(AbilityContext);
  const labelId = `checkbox-table-label-${value.id}`;
  return (
    <TableRow
      hover
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onStateToggle(value)}
      role='checkbox'
      tabIndex={-1}
      key={value.id}
      selected={value.itemState === ItemState.Done}
      sx={{
        cursor: 'pointer'
      }}
    >
      <TableCell
        id={labelId}
        scope='row'
        sx={{ fontSize: '1.4rem' }}
      >
        {value.title}
      </TableCell>

      <TableCell
        scope='row'
        sx={{ fontSize: '1rem' }}
      >
        {value.description}
      </TableCell>

      <TableCell
        scope='row'
        sx={{ fontSize: '1rem' }}
      >
        {`${value.createdBy?.profile?.firstname} ${value.assignee?.profile?.lastname}`}
      </TableCell>

      <TableCell
        scope='row'
        sx={{ fontSize: '1rem' }}
      >
        {`${value.assignee?.profile?.firstname} ${value.assignee?.profile?.lastname}`}
      </TableCell>

      <TableCell
        align='right'
        padding='none'
      >
        <Fade in={isHovered}>
          <Box
            mx={2}
            display={'flex'}
          >
            {ability.can('update', 'Item') && (
              <ItemActionButton
                type='update'
                onClick={() => onEdit(value)}
                disabled={!!loading}
              />
            )}
            {ability.can('delete', 'Item') && (
              <ItemActionButton
                sx={{ ml: 2 }}
                type='delete'
                disabled={!!loading}
                onClick={() => onDelete(value)}
              />
            )}
          </Box>
        </Fade>
      </TableCell>
      <TableCell
        padding='checkbox'
        align='center'
      >
        <Checkbox
          color='primary'
          checked={value.itemState === ItemState.Done}
          inputProps={{
            'aria-labelledby': labelId
          }}
        />
      </TableCell>
    </TableRow>
  );
}
