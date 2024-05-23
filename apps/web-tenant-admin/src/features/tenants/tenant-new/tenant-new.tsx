import { BootsrappedDialog } from '@cnask/shared/ui';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateTenantForm } from '../ui/tenant-form/create-tenant-form';
import { RegistrateTenantInput, TenantStatus, useRegistrateTenantMutation } from '@cnask/utils/api-tenant';
import { Box } from '@mui/material';
import { useNotistack } from '@cnask/shared/feature';

export function TenantNew() {
  const { enchanceRequestWithNotistack } = useNotistack();

  const [registrateTenant, state] = useRegistrateTenantMutation({
    ...enchanceRequestWithNotistack({ successMessage: 'Tenant created' }),
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
    (data: RegistrateTenantInput) => {
      registrateTenant({
        variables: { data },
        optimisticResponse: {
          __typename: 'Mutation',
          registrateTenant: {
            __typename: 'Tenant',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            baseState: 'ACTIVE',
            id: 'temp-id',
            alias: data.alias,
            config: null,
            email: data.email,
            owner: 'Owner',
            status: TenantStatus.New,
            createdBy: {
              __typename: 'User',
              id: 'temp-id',
              username: 'hhh'
            },
            updatedBy: {
              __typename: 'User',
              id: 'temp-id',
              username: 'hhh'
            }
          }
        }
      });
    },
    [registrateTenant]
  );

  const Title = (
    <Box>
      Create tenant
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
      <CreateTenantForm
        onSubmit={onSubmit}
        loading={state.loading}
        values={{
          alias: '',
          email: ''
        }}
      />
    </BootsrappedDialog>
  );
}
