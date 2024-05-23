export type SidebarItemProps = {
  label: string;
  icon: React.ReactNode;
  path: string;
  child?: SidebarItemProps[];
};
