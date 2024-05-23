import { useNotistack } from '@cnask/shared/feature';
import { BootsrappedDialog } from '@cnask/shared/ui';
import { useCreateInviteMutation } from '@cnask/utils/api-client';
import { Box } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserNewFrom } from './form';

export function UserNew() {
  const navigate = useNavigate();

  const onClose = useCallback(() => navigate('/users'), [navigate]);
  const { showSuccessNotification, showErrorNotification } = useNotistack();
  const [createInvite, state] = useCreateInviteMutation({
    onCompleted(data) {
      showSuccessNotification(
        `Invintation for ${data.createInvite?.email} created`
      );
      onClose();
    },
    onError(error) {
      showErrorNotification(error);
    }
  });

  const onSubmit = useCallback(
    (data: { email: string }) => {
      createInvite({
        variables: {
          data: {
            email: data.email
          }
        }
      });
    },
    [createInvite]
  );

  const Title = (
    <Box>
      Invite user
      <span
        style={{ margin: 'auto 1rem' }}
        role='img'
        aria-label='edit-icon'
      >
        👤
      </span>
    </Box>
  );

  return (
    <BootsrappedDialog
      onClose={onClose}
      heading={Title}
    >
      <UserNewFrom
        values={{
          email: ''
        }}
        loading={state.loading}
        onSubmit={onSubmit}
      />
    </BootsrappedDialog>
  );
}
