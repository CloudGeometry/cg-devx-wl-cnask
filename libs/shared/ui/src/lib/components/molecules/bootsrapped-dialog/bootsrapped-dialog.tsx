import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  IconButton,
  Slide,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ReactNode } from 'react';

export type BootsrappedDialogProps = {
  children: ReactNode;
  onClose: () => void;
  heading?: ReactNode;
} & Partial<DialogProps>;

export function BootsrappedDialog({
  children,
  heading,
  onClose,
}: BootsrappedDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <BootstrapDialog
      TransitionComponent={Slide}
      fullScreen={fullScreen}
      onClose={onClose}
      open={true}
      fullWidth={true}
      maxWidth="sm"
    >
      <BootstrapDialogTitle onClose={onClose}>{heading}</BootstrapDialogTitle>
      <Divider />
      <DialogContent sx={{ m: 1, pt: 1 }}>{children}</DialogContent>
    </BootstrapDialog>
  );
}

export default BootsrappedDialog;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  children?: ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
