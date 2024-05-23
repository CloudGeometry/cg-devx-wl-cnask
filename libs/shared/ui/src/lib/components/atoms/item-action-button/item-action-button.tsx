import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import StartIcon from '@mui/icons-material/Start';

export type ItemActionButtonProps = {
  type: 'update' | 'delete' | 'email' | 'start';
  onClick: () => void;
  disabled?: boolean;
} & Pick<IconButtonProps, 'sx'>;

const IconMap = {
  update: EditIcon,
  start: StartIcon,
  email: EmailIcon,
  delete: DeleteIcon
};

export function ItemActionButton({
  type,
  onClick,
  disabled,
  ...rest
}: ItemActionButtonProps) {
  const Component = IconMap[type] || null;
  return (
    <IconButton
      {...rest}
      edge='end'
      aria-label={type}
      onClick={onClick}
      disabled={disabled}
    >
      <Tooltip title={type}>
        <Component />
      </Tooltip>
    </IconButton>
  );
}

export default ItemActionButton;
