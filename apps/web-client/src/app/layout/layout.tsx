import { useAuth } from '../../features/auth';
import { Footer, Header, SideMenu } from '@cnask/shared/ui';
import { footerHeight, headerHeight } from '@cnask/shared/utils';
import { AppBar, Box, Container } from '@mui/material';
import { Outlet, ScrollRestoration } from 'react-router-dom';

import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import AppsIcon from '@mui/icons-material/Apps';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import TableViewIcon from '@mui/icons-material/TableView';
import PeopleIcon from '@mui/icons-material/People';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import { i18n } from '@cnask/i18n/feature';

const linksConfig = [
  {
    label: i18n.t('menu.links.todo'),
    icon: <DashboardCustomizeIcon />,
    path: '/todo'
  },
  {
    label: i18n.t('menu.links.users'),
    icon: <PeopleIcon />,
    path: '/users'
  },
  {
    label: i18n.t('menu.links.components'),
    icon: <AppsIcon />,
    path: '/components',
    child: [
      {
        label: i18n.t('menu.links.buttons'),
        path: '/components/buttons',
        icon: <SmartButtonIcon />
      },
      {
        label: i18n.t('menu.links.form'),
        icon: <FormatAlignLeftIcon />,
        path: '/components/form'
      },
      {
        label: i18n.t('menu.links.table'),
        icon: <TableViewIcon />,
        path: '/components/table'
      }
    ]
  }
];

export function Layout() {
  const { logout, user, isAuthenticated } = useAuth();

  const drawerWidth = isAuthenticated ? '300px' : '0px';
  return (
    <Box sx={{ display: 'flex' }}>
      {isAuthenticated && (
        <Box
          component='nav'
          sx={(theme) => ({
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
            backgroundColor: theme.palette.background.paper
          })}
          aria-label='folders'
        >
          <SideMenu linksConfig={linksConfig} />
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column nowrap',
          width: `calc(100% - ${drawerWidth} )`
        }}
      >
        <AppBar
          sx={(theme) => ({
            ml: { sm: drawerWidth },
            zIndex: theme.zIndex.appBar
          })}
        >
          <Header
            user={user}
            logout={logout.action}
          />
        </AppBar>

        <Box
          component='main'
          sx={{
            flexGrow: 1,
            mt: headerHeight + 'px',
            minHeight: `calc(100vh - ${footerHeight + 'px'} - ${
              headerHeight + 'px'
            })`
          }}
        >
          <Main />
        </Box>

        <Box
          component='footer'
          sx={{
            flexGrow: 0
          }}
        >
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;

const Main = () => (
  <>
    <Container
      maxWidth={'lg'}
      sx={{
        p: 0,
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Outlet />
    </Container>
    <ScrollRestoration />
  </>
);
