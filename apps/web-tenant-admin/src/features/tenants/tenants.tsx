import { useNotistack, useQueryParams } from '@cnask/shared/feature';
import {
  TenantFieldsFragment, useBootstrapTenantMutation,
  useDeleteTenantMutation,
  useTenantsQuery
} from '@cnask/utils/api-tenant';
import { useCallback, useMemo } from 'react';
import { TableView } from './ui/table-view/table-view';
import { TenantAdd } from './tenant-add';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import TableRowsIcon from '@mui/icons-material/TableRows';
import GridViewIcon from '@mui/icons-material/GridView';
import { headerHeight } from '@cnask/shared/utils';
import { TenantCardsView } from './ui/card-view';

export function Tenants() {
  const [searchParams, setSearchParams] = useSearchParams();

  const view = searchParams.get('view') || 'table';

  const handleViewChange = (value: 'table' | 'grid') => {
    searchParams.set('view', value);
    setSearchParams(searchParams);
  };

  const { data, loading } = useTenantsQuery();
  const { enchanceRequestWithNotistack } = useNotistack();

  const [deleteTenant] = useDeleteTenantMutation();
  const [bootstrapTenant] = useBootstrapTenantMutation(
    {
      ...enchanceRequestWithNotistack({ successMessage: 'Tenant bootstrapped' }),
      refetchQueries: ['Tenants']
    });

  const query = useQueryParams();
  const navigate = useNavigate();

  const onUpdate = useCallback(
    (value: TenantFieldsFragment) => navigate('/tenants/edit/' + value.id),
    [navigate]
  );

  const onDelete = useCallback(
    (value: TenantFieldsFragment) =>
      deleteTenant({
        variables: {
          id: value.id
        },
        update: (cache) => {
          cache.evict({ id: cache.identify(value) });
        }
      }),
    [deleteTenant]
  );

  const onBootstrap = useCallback(
    (value: TenantFieldsFragment) => bootstrapTenant({
      variables: {
        id: value.id
      }
    }),
    [bootstrapTenant]
  );

  const { Component, Placeholder } = useMemo(() => {
    const view = query.get('view') || 'table';

    return view === 'table'
      ? { Component: TableView, Placeholder: <div>Loading...</div> }
      : { Component: TenantCardsView, Placeholder: <div>Loading...</div> };
  }, [query]);

  if (!data?.tenants?.length && loading) {
    return Placeholder;
  }

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        position: 'relative'
      }}
    >
      <Box
        sx={(theme) => ({
          my: 2,
          display: 'flex',
          alignItems: 'center',
          position: 'sticky',
          top: headerHeight,
          zIndex: theme.zIndex.appBar - 1,
          backgroundColor: theme.palette.background.paper
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
          <ToggleButton
            value='table'
            key='table'
          >
            <TableRowsIcon />
          </ToggleButton>
          ,
          <ToggleButton
            value='grid'
            key='grid'
          >
            <GridViewIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box
        sx={{
          flexGrow: 1
        }}
      >
        <Component
          data={data?.tenants || []}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onBootstrap={onBootstrap}
          loadingState={{ str: false }}
        />
      </Box>

      <TenantAdd />

      <Outlet />
    </Box>
  );
}

export default Tenants;
