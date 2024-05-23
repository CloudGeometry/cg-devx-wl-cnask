import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps
} from '@mui/material';
import { useState, MouseEvent } from 'react';
import { Controller, ControllerProps } from 'react-hook-form';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// 👇 Type of Props the FormInput will receive
export type FormInputProps = {
  name: string;
  error?: {
    message: string;
  };
} & TextFieldProps &
  Partial<ControllerProps>;

export function FormInputPassword({
  rules,
  name,
  control,
  error,
  ...rest
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

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
          type={showPassword ? 'text' : 'password'}
          sx={{ mb: '1.5rem', position: 'relative' }}
          error={!!error}
          helperText={(error?.message || '') as string}
          InputProps={{
            sx: { pr: 0 },
            endAdornment: (
              <InputAdornment
                position='end'
                sx={{
                  position: 'absolute',
                  right: '0.5rem'
                }}
              >
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  // edge='middle'
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      )}
    />
  );
}

export default FormInputPassword;
