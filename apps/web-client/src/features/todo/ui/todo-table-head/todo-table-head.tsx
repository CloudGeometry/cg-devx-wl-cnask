import { TableCell, TableHead, TableRow } from '@mui/material';

export const TodoTableHead = () => (
  <TableHead sx={{ width: '100%' }}>
    <TableRow>
      <TableCell key={'title'}>Title</TableCell>
      <TableCell key={'description'}>Descrition</TableCell>
      <TableCell key={'author'}>Author</TableCell>
      <TableCell key={'assignee'}>Assignee</TableCell>
      <TableCell key={'actions'}>Actions</TableCell>
      <TableCell key={'status'}>Completed</TableCell>
    </TableRow>
  </TableHead>
);
