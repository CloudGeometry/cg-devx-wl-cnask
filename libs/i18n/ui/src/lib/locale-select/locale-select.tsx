import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { useId } from 'react';

export interface LocaleSelectProps {
  onChange: (lang: string) => void;
  value: string;
  label: string;
  options: { code: string; name: string }[];
}

export function LocaleSelect({
  onChange,
  value,
  label,
  options
}: LocaleSelectProps) {
  const id = useId();

  const handleOnChange = (e: SelectChangeEvent) => {
    onChange(e.target.value);
  };

  return (
    <Box>
      <FormControl
        variant='outlined'
        size='small'
        sx={{ minWidth: 120 }}
      >
        <InputLabel id={id}>{label}</InputLabel>

        <Select
          onChange={handleOnChange}
          value={value}
          id={id}
          label={label}
        >
          {options.map((lang) => (
            <MenuItem
              key={lang.code}
              value={lang.code}
            >
              {lang.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default LocaleSelect;
