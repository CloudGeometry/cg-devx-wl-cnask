import { useNotistack } from '@cnask/shared/feature';
import { useConfirmTenantMutation } from '@cnask/utils/api-client';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function ConfirmTenantRegistration() {
  const [params] = useSearchParams();

  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();
  const { showErrorNotification, showSuccessNotification } = useNotistack();
  const [confirmEmail, state] = useConfirmTenantMutation({
    onError(error) {
      showErrorNotification(error);
      setError(error?.message);
    },

    onCompleted() {
      showSuccessNotification('Tenant registration request is successfully confirmed');
      navigate('/login');
    }
  });
  const token = params.get('token');

  useEffect(() => {
    if (token && !state.called) {
      confirmEmail({ variables: { token } });
    }
  }, [confirmEmail, state.called, token]);

  return (
    <Box
      sx={{
        flex: '1 0 100%',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
      }}
    >
      <Box
        sx={{
          margin: 'auto'
        }}
      >
        {error ? <Typography>{error}</Typography> : <CircularProgress />}
      </Box>
    </Box>
  );
}
