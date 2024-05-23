import { footerHeight } from '@cnask/shared/utils';
import AddIcon from '@mui/icons-material/Add';
import { Box, Container, Fab } from '@mui/material';

export interface FabAddButtonProps {
  onClick: () => void;
}

export function FabAddButton({ onClick }: FabAddButtonProps) {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        width: '100%'
      }}
    >
      <Container
        maxWidth='lg'
        sx={{
          mb: footerHeight + 'px',
          position: 'relative',
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Fab
          sx={() => ({
            mr: 1
          })}
          size='medium'
          color='primary'
          aria-label='add'
          onClick={onClick}
        >
          <AddIcon />
        </Fab>
      </Container>
    </Box>
  );
}

export default FabAddButton;
