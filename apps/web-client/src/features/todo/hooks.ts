import { useNotistack } from '@cnask/shared/feature';
import {
  CreateItemInput,
  ItemFieldsFragment,
  ItemState,
  UpdateItemInput,
  useCreateItemMutation,
  useDeleteItemMutation,
  useUpdateItemMutation
} from '@cnask/utils/api-client';
import { useCallback, useRef } from 'react';

export const useTodoListActions = () => {
  const { enchanceRequestWithNotistack } = useNotistack();

  const loadingState = useRef<Record<string, boolean | undefined>>({});

  const [updateItem] = useUpdateItemMutation({
    ...enchanceRequestWithNotistack({ successMessage: 'Todo updated' }),
    refetchQueries: ['FirstItemsAfterUseEdges']
  });

  const onStateToggle = useCallback(
    (item: ItemFieldsFragment) => {
      loadingState.current[item.id] = true;
      const nextState =
        item.itemState === ItemState.Done ? ItemState.Todo : ItemState.Done;

      updateItem({
        variables: {
          id: item.id,
          data: {
            itemState: nextState
          }
        },
        update: (cache, { data }) => {
          if (data?.updateItem) {
            cache.modify({
              id: cache.identify(item),
              fields: {
                items: (existingItems = []) => {
                  return existingItems.map((i: ItemFieldsFragment) => {
                    if (i.id === item.id) {
                      return {
                        ...i,
                        itemState: data.updateItem.itemState
                      };
                    }
                    return i;
                  });
                }
              }
            });
          }
        },
        onCompleted: () => {
          loadingState.current[item.id] = false;
        }
      });
    },
    [updateItem]
  );

  const [deleteItem] = useDeleteItemMutation({
    ...enchanceRequestWithNotistack({ successMessage: 'Todo deleted' }),
    refetchQueries: ['FirstItemsAfterUseEdges']
  });

  const onDelete = useCallback(
    (item: ItemFieldsFragment) => {
      loadingState.current[item.id] = true;
      deleteItem({
        variables: {
          id: item.id
        },
        update: (cache) => {
          cache.evict({ id: cache.identify(item) });
        },
        onCompleted: () => {
          loadingState.current[item.id] = false;
        }
      });
    },
    [deleteItem]
  );

  return {
    actions: {
      onDelete,
      onStateToggle
    },
    loadingState: loadingState.current
  };
};

export function useTodoActions() {
  const { enchanceRequestWithNotistack } = useNotistack();

  // create item
  const [createItem, createState] = useCreateItemMutation({
    ...enchanceRequestWithNotistack({ successMessage: 'Todo created' }),
    refetchQueries: ['FirstItemsAfterUseEdges']
  });
  const onCreate = useCallback(
    (data: CreateItemInput, cb: VoidFunction) => {
      createItem({
        variables: {
          data
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createItem: {
            __typename: 'Item',
            id: 'temp-id',
            title: data.title,
            description: data.description,
            dueDate: data.dueDate,
            assignee: {
              __typename: 'User',
              id: 'temp-id'
            },
            itemState: ItemState.Todo,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: {
              baseState: 'ACTIVE',
              __typename: 'User',
              id: 'temp-id',
              profile: {
                __typename: 'Profile',
                lastname: 'temp-lastname',
                firstname: 'temp-firstname'
              }
            },
            updatedBy: {
              baseState: 'ACTIVE',

              __typename: 'User',
              id: 'temp-id',
              username: 'temp-name'
            }
          }
        },
        onCompleted: () => {
          cb();
        }
      });
    },
    [createItem]
  );

  // update item
  const [updateItem, updateState] = useUpdateItemMutation({
    ...enchanceRequestWithNotistack({ successMessage: 'Todo updated' }),
    refetchQueries: ['FirstItemsAfterUseEdges']
  });

  const onUpdate = useCallback(
    (data: UpdateItemInput, id: string, cb: VoidFunction) => {
      updateItem({
        variables: {
          id,
          data
        },
        onCompleted: () => {
          cb();
        }
      });
    },
    [updateItem]
  );

  return {
    create: {
      onCreate,
      state: createState
    },

    update: {
      onUpdate,
      state: updateState
    }
  };
}
