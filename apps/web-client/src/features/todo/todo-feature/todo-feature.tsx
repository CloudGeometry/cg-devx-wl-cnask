import { useNotistack, useQueryParams } from '@cnask/shared/feature';
import {
  ItemState,
  Sort,
  useFirstItemsAfterUseEdgesQuery
} from '@cnask/utils/api-client';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import TodoAdd from '../todo-add/todo-add';
import TodoToolbar from '../todo-toolbar/todo-toolbar';
import { Suspense, lazy, useCallback, useMemo } from 'react';
import { useTodoListActions } from '../hooks';
import { TodoTableListPlaceholder } from '../ui/placeholders/todo-table-list-placeholder';
import { TodoCardListPlaceholder } from '../ui/placeholders/todo-card-list-placeholder';

const TodoTableView = lazy(() => import('../todo-table-view/todo-table-view'));
const TodoList = lazy(() => import('../todo-list/todo-list'));

export function TodoFeature() {
  const { showErrorNotification } = useNotistack();
  const navigate = useNavigate();

  const query = useQueryParams();

  const orderBy = useMemo(() => {
    const querySort = query.get('sort') || Sort.Asc;
    const queryOrder = query.get('orderBy') || 'title';

    return {
      [queryOrder]: querySort as Sort
    };
  }, [query]);

  const first = useMemo(() => {
    const queryQuantity = query.get('quantity') || '5';
    const quantity = parseInt(queryQuantity, 10);

    return quantity;
  }, [query]);

  const filter = useMemo(() => {
    const state = query.get('state');

    return {
      itemState: state === 'all' ? undefined : (state as ItemState)
    };
  }, [query]);

  const { Component, Placeholder } = useMemo(() => {
    const view = query.get('view') || 'table';

    return view === 'table'
      ? { Component: TodoTableView, Placeholder: <TodoTableListPlaceholder /> }
      : { Component: TodoList, Placeholder: <TodoCardListPlaceholder /> };
  }, [query]);

  const { actions, loadingState } = useTodoListActions();

  const onEdit = useCallback(
    ({ id }: { id: string }) => {
      navigate(`/todo/edit/${id}`);
    },
    [navigate]
  );

  const { data, loading, fetchMore } = useFirstItemsAfterUseEdgesQuery({
    variables: {
      first,
      orderBy,
      filter: {
        ...(filter.itemState ? { itemState: filter.itemState } : {})
      }
    },

    fetchPolicy: 'cache-and-network',
    onError: (error) => {
      showErrorNotification(error);
    }
  });

  const nodes = useMemo(
    () => data?.items?.edges?.map((edge) => edge?.node, [data]),
    [data]
  );

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
      <TodoToolbar />

      <Box
        sx={{
          flexGrow: 1
        }}
      >
        <Suspense fallback={Placeholder}>
          <Component
            data={nodes}
            loading={loading}
            onEdit={onEdit}
            loadingState={loadingState}
            {...actions}
          />
        </Suspense>
      </Box>

      {data?.items?.pageInfo?.hasNextPage && (
        <FetchMoreButton
          loading={loading}
          onClick={() =>
            fetchMore({
              variables: {
                after: data?.items?.pageInfo?.endCursor
              }
            })
          }
        />
      )}

      <TodoAdd />

      <Outlet />
    </Box>
  );
}

export default TodoFeature;

function FetchMoreButton({
  onClick,
  loading
}: {
  onClick: () => void;
  loading: boolean;
}) {
  return (
    <LoadingButton
      variant='outlined'
      sx={{
        py: '1rem',
        my: 2,
        width: '400px',
        maxWidth: '80%',
        marginInline: 'auto'
      }}
      loading={loading}
      onClick={onClick}
    >
      Load more
    </LoadingButton>
  );
}
