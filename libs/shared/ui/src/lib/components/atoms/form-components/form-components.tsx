import { Box } from '@mui/material';
import { ReactNode } from 'react';

export function FormLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      justifyContent="center"
      alignItems="center"
      sx={{ width: '100%', height: '100%' }}
    >
      <Box
        sx={(theme) => ({
          maxWidth: '70rem',
          width: '100%',
          backgroundColor: theme.palette.background.paper,
        })}
      >
        {children}
      </Box>
    </Box>
  );
}
