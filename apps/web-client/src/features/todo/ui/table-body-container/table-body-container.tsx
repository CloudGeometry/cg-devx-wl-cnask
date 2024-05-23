import { Box, Paper, Table, TableContainer } from '@mui/material';
import { ReactNode } from 'react';

export interface TableBodyContainerProps {
  children: ReactNode;
}

export function TableBodyContainer({ children }: TableBodyContainerProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            aria-labelledby='tableTitle'
            size={'medium'}
          >
            {children}
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default TableBodyContainer;
