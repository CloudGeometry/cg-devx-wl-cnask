import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

export interface PaginatorProps {
  onFetchMore: (value: number) => void;
  loading?: boolean;
  total?: number;
}

export function Paginator({ total, onFetchMore, loading }: PaginatorProps) {
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onFetchMore(value);
  };

  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination
        count={total}
        page={page}
        onChange={handleChange}
        boundaryCount={2}
      />
    </Stack>
  );
}

export default Paginator;
