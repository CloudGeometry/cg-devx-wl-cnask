  import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { Link } from 'react-router-dom';
import { SidebarItemProps } from './types';

export function SidebarItem(props: SidebarItemProps) {
  return (
    <ListItem
      key={props.label}
      disablePadding
    >
      <ListItemButton
        component={Link}
        to={props.path}
      >
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText primary={props.label} />
      </ListItemButton>
    </ListItem>
  );
}
