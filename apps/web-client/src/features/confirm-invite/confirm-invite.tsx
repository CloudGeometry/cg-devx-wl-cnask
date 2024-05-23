import { useNotistack } from '@cnask/shared/feature';
import { useDecodeInviteTokenMutation } from '@cnask/utils/api-client';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function getPayload(token: string | null): { tenantAlias: string } | null {
  if (!token) {
    return null;
  }

  const tokenParts = token.split('.');

  return JSON.parse(atob(tokenParts[1]));
}

export function ConfirmInvite() {
  const [params] = useSearchParams();

  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();
  const { showErrorNotification, showSuccessNotification } = useNotistack();
  const [decodeToken, state] = useDecodeInviteTokenMutation({
    onError(error) {
      showErrorNotification(error);
      setError(error?.message);
    },

    onCompleted(data) {
      showSuccessNotification('Invite link successfully confirmed');

      navigate('/signup', {
        state: {
          email: data?.decodeInviteToken?.email,
          id: data?.decodeInviteToken?.id,
          tenantAlias: getPayload(token)?.alias
        }
      });
    }
  });
  const token = params.get('token');

  useEffect(() => {
    if (token && !state.called) {
      decodeToken({
        variables: {
          token
        }
      });
    }
  }, [decodeToken, state.called, token]);

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
