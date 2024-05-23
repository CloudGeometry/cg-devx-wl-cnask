import {
  ApolloError,
  BaseMutationOptions,
  QueryFunctionOptions,
} from '@apollo/client';
import { BaseVariant, SnackbarProvider, useSnackbar } from 'notistack';
import { ReactNode, useCallback } from 'react';

export interface NotistackProps {
  children: ReactNode;
}

export function NotistackProvider({ children }: NotistackProps) {
  return <SnackbarProvider>{children}</SnackbarProvider>;
}

export function useNotistack() {
  const { enqueueSnackbar } = useSnackbar();

  const showNotification = useCallback(
    (message: string, variant?: BaseVariant) =>
      enqueueSnackbar(message, {
        variant: variant || 'default',
        preventDuplicate: true,
      }),
    [enqueueSnackbar]
  );

  const showErrorNotification = useCallback(
    (error: Error) => {
      showNotification(error.message, 'error');
    },
    [showNotification]
  );

  const showSuccessNotification = useCallback(
    (message: string) => {
      showNotification(message, 'success');
    },
    [showNotification]
  );

  const enchanceRequestWithNotistack = ({
    successMessage,
  }: {
    successMessage: string;
  }): Pick<
    QueryFunctionOptions | BaseMutationOptions,
    'onCompleted' | 'onError'
  > => {
    return {
      onError: (error: ApolloError) => {
        showErrorNotification(error);
      },
      onCompleted: () => {
        showSuccessNotification(successMessage);
      },
    };
  };

  return {
    showNotification,
    showErrorNotification,
    showSuccessNotification,
    enchanceRequestWithNotistack,
  };
}

export default NotistackProvider;
