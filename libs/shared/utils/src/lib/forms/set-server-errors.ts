import { ApolloError } from '@apollo/client';
import { useEffect } from 'react';

export function useSetServerErrors<T>(
  setError: (
    fieldName: keyof T,
    error: { type: string; message: string }
  ) => void,
  error?: ApolloError
) {
  useEffect(() => {
    if (error?.graphQLErrors?.[0]?.extensions?.code === 'BAD_USER_INPUT') {
      error?.graphQLErrors?.[0]?.extensions.errors.forEach(
        (err: { argumentName: string; message: string }) => {
          setError(err.argumentName as keyof T, {
            type: 'server',
            message: err.message
          });
        }
      );
    }
  }, [error, setError]);

  return null;
}

export type ServerError = Record<string, string>;
