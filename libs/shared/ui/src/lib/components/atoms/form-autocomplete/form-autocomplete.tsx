import { useNotistack } from '@cnask/shared/feature';
import { AssigneeFieldsFragment, useUsersQuery } from '@cnask/utils/api-client';
import {
  Autocomplete,
  CircularProgress,
  MenuItem,
  TextField
} from '@mui/material';
import { useCallback, useId, useState } from 'react';
import { Controller, ControllerProps } from 'react-hook-form';

export type FormAutocompleteProps = {
  label: string;
  name: string;
  error?: {
    message: string;
  };
} & Partial<ControllerProps>;

export function FormAutocomplete({
  name,
  label,
  rules,
  control,
  error
}: FormAutocompleteProps) {
  const { showErrorNotification } = useNotistack();
  const [options, setOptions] = useState([] as AssigneeFieldsFragment[]);

  const { loading } = useUsersQuery({
    onCompleted: (data) => {
      data?.users && setOptions(data.users);
    },
    onError: (err) => showErrorNotification(err)
  });

  const id = useId();

  const getValue = useCallback(
    (id: string) => {
      return options.find((opt) => opt.id === id);
    },
    [options]
  );

  if (!options.length) {
    return <span>loading options...</span>;
  }

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, ...field } }) => (
        <Autocomplete
          {...field}
          onChange={(e, val) => onChange(val?.id)}
          value={getValue(value)}
          loading={loading}
          isOptionEqualToValue={(a, b) => a.id === b.id}
          id={id}
          options={options}
          fullWidth={true}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              sx={{ mb: '1.5rem' }}
              error={!!error}
              helperText={error?.message as string}
              InputProps={{
                ...params.InputProps,

                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress
                        color='inherit'
                        size={20}
                      />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
            />
          )}
          getOptionLabel={(option) =>
            option.profile?.firstname + ' ' + option.profile?.lastname
          }
          renderOption={(props, option) => {
            return (
              <MenuItem
                {...props}
                key={option.id}
              >
                {option.profile?.firstname + ' ' + option.profile?.lastname}
              </MenuItem>
            );
          }}
        />
      )}
    />
  );
}

export default FormAutocomplete;
