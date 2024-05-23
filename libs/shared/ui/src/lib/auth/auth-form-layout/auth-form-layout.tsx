import { Grid } from '@mui/material';
import { ReactNode } from 'react';

export interface AuthFormLayoutProps {
  children: ReactNode;
}

export function AuthFormLayout(props: AuthFormLayoutProps) {
  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      sx={{ width: '100%', height: '100%', display: 'flex' }}
    >
      <Grid
        item
        sx={(theme) => ({
          maxWidth: '70rem',
          width: '100%',
          backgroundColor: theme.palette.background.paper
        })}
      >
        {props.children}
      </Grid>
    </Grid>
  );
}

export default AuthFormLayout;
