import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller, ControllerProps } from 'react-hook-form';

export type Props = {
  name: string;
  options: { value: any; name: string }[];
  label: string;
} & Partial<ControllerProps>;

export const FormSelect = ({ name, options, label, control, rules }: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue=''
      render={({ field }) => (
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>{label}</InputLabel>
          <Select
            {...field}
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            label={label}
            sx={{ mb: '1.5rem' }}
          >
            {options.map((option) => (
              <MenuItem
                value={option.value}
                key={option.value}
              >
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};
