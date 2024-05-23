import { Box, Divider, Drawer, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { Logo } from '../../atoms/logo/logo';
import { SidebarItemCollapse } from './sidebar-item-collapse';
import { SidebarItem } from './sidebar-item';

type LinkType = {
  label: string;
  icon: JSX.Element;
  path: string;
  child?: LinkType[];
};

export interface SideMenuProps {
  linksConfig: LinkType[];
}

export function SideMenu({ linksConfig }: SideMenuProps) {
  return (
    <Drawer
      variant='permanent'
      sx={(theme) => ({
        width: '300px',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '300px',
          boxSizing: 'border-box',
          borderRight: '1px solid ' + theme.palette.divider,
          backgroundColor: theme.palette.background.paper
        }
      })}
    >
      <Toolbar
        sx={(theme) => {
          const color =
            theme.palette.mode === 'light' ? '0,0,0' : '255,255,255';

          return {
            backgroundImage: `linear-gradient(rgba(${color}, 0.09), rgba(${color}, 0.09))`
          };
        }}
      >
        <Link
          to='/'
          style={{
            display: 'flex',
            flex: '1 1 100%'
          }}
        >
          <Logo />
        </Link>
      </Toolbar>
      <Divider />

      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'flex-start'
        }}
      >
        {linksConfig.map((link) =>
          link.child ? (
            <SidebarItemCollapse
              key={link.path}
              {...link}
            />
          ) : (
            <SidebarItem
              key={link.path}
              {...link}
            />
          )
        )}
      </Box>
    </Drawer>
  );
}

export default SideMenu;
