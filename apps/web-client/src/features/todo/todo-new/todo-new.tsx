import { useAuth } from '../../auth/auth-provider';
import { BootsrappedDialog } from '@cnask/shared/ui';
import { CreateItemInput, ItemFieldsFragment } from '@cnask/utils/api-client';
import { useTodoActions } from '../hooks';
import { TodoForm } from '../ui/todo-form/todo-form';

import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
export function TodoNew() {
  const location = useLocation();
  const data = location.state?.data as ItemFieldsFragment;
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    navigate('/todo');
  }, [navigate]);

  const { create } = useTodoActions();
  const { t } = useTranslation();
  const onSubmit = useCallback(
    (data: CreateItemInput & { createdBy?: string }) => {
      const { createdBy, ...rest } = data;

      create.onCreate(rest, handleClose);
    },
    [create, handleClose]
  );

  const Title = (
    <Box>
      {t('features.todo.createTitle')}
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
      <TodoForm
        values={{
          title: data?.title || '',
          description: data?.description || '',
          dueDate: data?.dueDate || dayjs().add(1, 'day').toString(),
          assigneeId: user?.id,
          createdBy: user?.profile?.firstname + ' ' + user?.profile?.lastname
        }}
        onSubmit={onSubmit}
        loading={create.state.loading}
      />
    </BootsrappedDialog>
  );
}

export default TodoNew;
