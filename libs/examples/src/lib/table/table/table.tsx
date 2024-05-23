import { Grid } from '@mui/material';
import EnhancedTable from '../data-table/data-table';

/* eslint-disable-next-line */
export interface TableProps {}

export function Table(props: TableProps) {
  return (
    <Grid
      container
      spacing={2}
    >
      <Grid
        item
        xs={12}
      >
        <h4>Sorting :</h4>

        <EnhancedTable />
      </Grid>
    </Grid>
  );
}

export default Table;
