import { ApolloError } from '@apollo/client';
import { useSetServerErrors } from '@cnask/shared/utils';
import { Box } from '@mui/material';
import { createElement } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

export type FormProps<T extends FieldValues> = {
  values: T;
  children: React.ReactNode;
  onSubmit: (values: T) => void;
  error?: ApolloError;
};

export function SmartForm<T extends FieldValues = FieldValues>({
  values,
  children,
  onSubmit,
  error: serverError
}: FormProps<T>) {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors }
  } = useForm({ values });

  useSetServerErrors(setError, serverError);

  return (
    <Box
      display='flex'
      flexDirection='column'
      component='form'
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit(onSubmit)}
      p={1}
    >
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props && child.props.name
              ? createElement(child.type, {
                  ...{
                    ...child.props,
                    control,
                    key: child.props.name,
                    error: errors?.[child.props.name]
                  }
                })
              : child;
          })
        : children}
    </Box>
  );
}
