import { TextField, TextFieldProps } from '@mui/material';
import { Controller, ControllerProps } from 'react-hook-form';

// 👇 Type of Props the FormInput will receive
export type FormInputProps = {
  name: string;
  error?: {
    message: string;
  };
} & TextFieldProps &
  Partial<ControllerProps>;

export function FormInput({
  rules,
  name,
  control,
  error,
  ...rest
}: FormInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=''
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          {...rest}
          variant='outlined'
          sx={{ mb: '1.5rem' }}
          error={!!error}
          helperText={(error?.message || '') as string}
        />
      )}
    />
  );
}

export default FormInput;
