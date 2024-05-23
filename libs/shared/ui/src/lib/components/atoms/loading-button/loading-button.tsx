import { LoadingButton } from '@mui/lab';

export interface LoadingButtonProps {
  loading: boolean;
  children: React.ReactNode;
}

export function StyledLoadingButton({ loading, children }: LoadingButtonProps) {
  return (
    <LoadingButton
      loading={loading}
      type="submit"
      variant="contained"
      sx={{
        py: '1rem',
        mt: 2,
        width: '80%',
        marginInline: 'auto',
      }}
    >
      {children}
    </LoadingButton>
  );
}

export default StyledLoadingButton;
