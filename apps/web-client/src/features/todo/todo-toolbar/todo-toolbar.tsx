import { ItemState, Sort } from '@cnask/utils/api-client';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { useId } from 'react';
import { useSearchParams } from 'react-router-dom';

import TableRowsIcon from '@mui/icons-material/TableRows';
import GridViewIcon from '@mui/icons-material/GridView';
import { headerHeight } from '@cnask/shared/utils';

const buttons = [
  <ToggleButton
    value='table'
    key='table'
  >
    <TableRowsIcon />
  </ToggleButton>,
  <ToggleButton
    value='grid'
    key='grid'
  >
    <GridViewIcon />
  </ToggleButton>
];

const AllowedParams = ['orderBy', 'sort', 'state', 'quantity', 'view'] as const;
const quantityOptions = ['5', '10', '15', '20'];

type Filter = {
  [key in (typeof AllowedParams)[number]]?: string | Sort | undefined;
};

const initialFilter: Filter = {
  orderBy: 'title',
  sort: Sort.Asc,
  state: undefined,
  quantity: quantityOptions[0],
  view: 'table'
};

export function TodoToolbar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderBy = searchParams.get('orderBy') || initialFilter.orderBy;
  const sort = (searchParams.get('sort') as Sort) || initialFilter.sort;
  const state = searchParams.get('state') || initialFilter.state;
  const quantity = searchParams.get('quantity') || initialFilter.quantity;
  const view = searchParams.get('view') || initialFilter.view;

  const handleViewChange = (value: 'table' | 'grid') => {
    searchParams.set('view', value);

    setSearchParams(searchParams);
  };

  const handleCompleted = (e: SelectChangeEvent) => {
    if (e.target.value === 'all') {
      searchParams.delete('state');
    } else {
      searchParams.set('state', e.target.value);
    }
    setSearchParams(searchParams);
  };

  const handleChange = (
    e: SelectChangeEvent,
    name: (typeof AllowedParams)[number]
  ) => {
    searchParams.set(name, e.target.value);
    setSearchParams(searchParams);
  };

  const id = useId();

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: headerHeight,
        zIndex: theme.zIndex.appBar - 1,
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`
      })}
    >
      <ToggleButtonGroup
        onChange={(_, value) => {
          handleViewChange(value);
        }}
        value={view}
        exclusive
        aria-label='Items view'
      >
        {buttons}
      </ToggleButtonGroup>

      <FormControl
        variant='standard'
        sx={{ m: 1, minWidth: 80 }}
      >
        <InputLabel id={id + '-state'}>Show:</InputLabel>
        <Select
          onChange={(e) => handleCompleted(e)}
          value={state || 'all'}
          id={id + '-state'}
        >
          <MenuItem value={'all'}>All</MenuItem>
          <MenuItem value={ItemState.Done}>Completed</MenuItem>
          <MenuItem value={ItemState.Todo}>Active</MenuItem>
        </Select>
      </FormControl>

      <FormControl
        variant='standard'
        sx={{ m: 1, minWidth: 80 }}
      >
        <InputLabel id={id + '-orderBy'}>Order by:</InputLabel>

        <Select
          onChange={(e) => handleChange(e, 'orderBy')}
          value={orderBy}
          id={id + '-orderBy'}
        >
          <MenuItem value='title'>Title</MenuItem>
          <MenuItem value='createdAt'>Date</MenuItem>
          <MenuItem value='itemState'>State</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        variant='standard'
        sx={{ m: 1, minWidth: 80 }}
      >
        <InputLabel id={id + '-sort'}>Sort:</InputLabel>
        <Select
          onChange={(e) => handleChange(e, 'sort')}
          value={sort || Sort.Asc}
          id={id + '-order'}
        >
          <MenuItem value={Sort.Asc}>Ascending</MenuItem>
          <MenuItem value={Sort.Desc}>Descending</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        variant='standard'
        sx={{ m: 1, minWidth: 50 }}
      >
        <InputLabel id={id + '-quantity'}>Quantity:</InputLabel>
        <Select
          onChange={(e) => handleChange(e, 'quantity')}
          value={quantity || quantityOptions[0]}
          id={id + '-quantity'}
        >
          {quantityOptions.map((q) => (
            <MenuItem
              key={q}
              value={q}
            >
              {q}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default TodoToolbar;
