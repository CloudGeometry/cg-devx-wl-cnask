import { Box, Container, Grid, Toolbar } from '@mui/material';
import AccountMenu from '../account-menu/account-menu';

type Props = {
  user: { username: string; id: string; profile: { photo?: string } } | null;
  logout: (cb: VoidFunction) => void;
};

export function Header({ user, logout }: Props) {
  return (
    <Toolbar disableGutters={true}>
      <Container maxWidth={'lg'}>
        <Grid
          container
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Grid
            item
            xs={'auto'}
          >
            <Box sx={{ flexGrow: 1 }} />
          </Grid>
          <Grid
            item
            xs={2}
          >
            {user && (
              <AccountMenu
                user={user}
                logout={logout}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </Toolbar>
  );
}

export default Header;
