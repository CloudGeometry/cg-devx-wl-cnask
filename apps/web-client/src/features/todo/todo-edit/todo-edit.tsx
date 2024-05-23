import { useAuth } from '../../auth/auth-provider';
import { BootsrappedDialog } from '@cnask/shared/ui';
import {
  ItemState,
  UpdateItemInput,
  useItemQuery
} from '@cnask/utils/api-client';
import { useTodoActions } from '../hooks';
import { TodoForm } from '../ui/todo-form/todo-form';
import { Box } from '@mui/material';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

export function TodoEdit() {
  const navigate = useNavigate();
  const handleClose = useCallback(() => {
    navigate('/todo');
  }, [navigate]);
  const { t } = useTranslation();

  const { id } = useParams<{ id: string }>();

  const { user } = useAuth();
  const { data, loading: fetchLoading } = useItemQuery({
    skip: !id,
    variables: {
      id: id!
    }
  });

  const { update } = useTodoActions();

  const onSubmit = useCallback(
    (data: UpdateItemInput & { createdBy?: string }) => {
      const { createdBy, ...rest } = data;

      if (!id) {
        navigate('new', { state: { data: rest } });
        return;
      }

      update.onUpdate(rest, id, handleClose);
    },
    [id, navigate, update, handleClose]
  );

  const Title = (
    <Box>
      {t('features.todo.editTitle')}
      <span
        style={{ margin: 'auto 1rem' }}
        role='img'
        aria-label='edit-icon'
      >
        ✍️
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
          title: data?.item?.title || '',
          description: data?.item?.description || '',
          dueDate: data?.item?.dueDate || '',
          itemState: data?.item?.itemState || ItemState.Todo,
          assigneeId: data?.item.assignee?.id || user?.id,
          createdBy:
            data?.item?.createdBy?.profile?.firstname +
            ' ' +
            data?.item?.createdBy?.profile?.lastname
        }}
        onSubmit={onSubmit}
        loading={fetchLoading || update.state.loading}
      />
    </BootsrappedDialog>
  );
}

export default TodoEdit;
