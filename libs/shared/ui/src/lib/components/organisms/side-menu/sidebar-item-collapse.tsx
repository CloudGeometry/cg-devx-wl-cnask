import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useState } from 'react';
import { SidebarItemProps } from './types';
import { SidebarItem } from './sidebar-item';

export type SidebarItemCollapseProps = SidebarItemProps & {
  child?: SidebarItemProps[];
};

export const SidebarItemCollapse = ({
  icon,
  label,
  child
}: SidebarItemCollapseProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          disableTypography
          primary={<Typography>{label}</Typography>}
        />
        {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
      </ListItemButton>
      <Collapse
        in={open}
        timeout='auto'
      >
        <List
          sx={{
            ml: 3
          }}
        >
          {child?.map((route, index) => (
            <SidebarItem
              {...route}
              key={index}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};
