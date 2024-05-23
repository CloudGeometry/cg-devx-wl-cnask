import { DatePickerProps } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Controller, ControllerProps } from 'react-hook-form';

export type FormDatePickerProps = Partial<ControllerProps> & {
  name: string;
  error?: {
    message: string;
  };
} & DatePickerProps<unknown>;

export function FormDatePicker({
  name,
  rules,
  control,
  error,
  ...rest
}: FormDatePickerProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { ref, ...field } }) => {
        return (
          <DatePicker
            {...rest}
            {...field}
            sx={{ mb: '1.5rem' }}
            value={field.value ? dayjs(field.value) : dayjs().add(1, 'day')}
            inputRef={ref}
            format='DD/MM/YYYY'
            slotProps={{
              textField: {
                helperText: error?.message || '',
                error: !!error
              }
            }}

            // helperText={errors ? errors[name]?.message : ''}
          />
        );
      }}
    />
  );
}

export default FormDatePicker;
