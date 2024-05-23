import { Box, Skeleton, TableBody, TableCell, TableRow } from '@mui/material';
import { TodoTableHead } from '../todo-table-head/todo-table-head';
import { TableBodyContainer } from '../table-body-container/table-body-container';

export const TodoTableListPlaceholder = () => (
  <TableBodyContainer>
    <TodoTableHead />

    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        <TodoTableRowPlaceholder key={index} />
      ))}
    </TableBody>
  </TableBodyContainer>
);

export const TodoTableRowPlaceholder = () => {
  return (
    <TableRow>
      <TableCell>
        {/* // title */}
        <Skeleton
          variant='text'
          sx={{ fontSize: '1.4rem' }}
        />
      </TableCell>

      <TableCell scope='row'>
        {/* // description */}

        <Skeleton
          variant='text'
          sx={{ fontSize: '1rem', minWidth: '90px' }}
        />
      </TableCell>

      <TableCell scope='row'>
        {/* // createdBy */}
        <Skeleton
          variant='text'
          sx={{ fontSize: '1rem', minWidth: '90px' }}
        />
      </TableCell>

      <TableCell
        scope='row'
        sx={{ fontSize: '1rem', minWidth: '90px' }}
      >
        {/* // assignee */}
        <Skeleton variant='text' />
      </TableCell>

      {/* actions */}
      <TableCell
        align='right'
        sx={{
          minWidth: '80px'
        }}
      />

      <TableCell
        align='center'
        padding='checkbox'
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Skeleton
            variant='rectangular'
            sx={{
              margin: 'auto 0',
              borderRadius: '4px',
              width: '20px',
              height: '20px'
            }}
          />
        </Box>
      </TableCell>
    </TableRow>
  );
};
