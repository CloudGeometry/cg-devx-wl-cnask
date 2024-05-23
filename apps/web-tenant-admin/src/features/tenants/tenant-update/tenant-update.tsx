import { BootsrappedDialog } from '@cnask/shared/ui';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UpdateTenantForm } from '../ui/tenant-form/update-tenant-form';
import {
  UpdateTenantInput,
  useUpdateTenantMutation,
  useTenantQuery, TenantStatus
} from '@cnask/utils/api-tenant';
import { Box } from '@mui/material';
import { useNotistack } from '@cnask/shared/feature';

export function TenantUpdate() {
  const { id } = useParams<{ id: string }>();

  const { data: tenantData, loading } = useTenantQuery({
    variables: {
      id: id as string
    }
  });

  const { enchanceRequestWithNotistack } = useNotistack();

  const [updateTenant, state] = useUpdateTenantMutation({
    ...enchanceRequestWithNotistack({ successMessage: 'Tenant updated' }),
    refetchQueries: ['Tenants'],
    onCompleted() {
      handleClose();
    }
  });

  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    navigate('/tenants');
  }, [navigate]);
  const onSubmit = useCallback(
    (data: UpdateTenantInput) => {
      updateTenant({ variables: { id: id as string, data } });
    },
    [updateTenant, id]
  );

  const Title = (
    <Box>
      Update tenant
      <span
        style={{ margin: 'auto 1rem' }}
        role='img'
        aria-label='edit-icon'
      >
        🖌️
      </span>
    </Box>
  );

  return (
    <BootsrappedDialog
      onClose={handleClose}
      heading={Title}
    >
      {loading ? (
        <>Loading...</>
      ) : (
        <UpdateTenantForm
          onSubmit={onSubmit}
          loading={state.loading}
          values={{
            config: tenantData?.tenant.config,
            status: tenantData?.tenant.status,
            owner: tenantData?.tenant.owner
          }}
        />
      )}
    </BootsrappedDialog>
  );
}
