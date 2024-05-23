import { MeFieldsFragment } from '@cnask/utils/api-client';
import { Avatar, Box, Typography } from '@mui/material';
import { ImageUpload } from './image-upload';

export function UserPhoto({ user }: { user: MeFieldsFragment | null }) {
  if (!user?.profile) {
    return <>Loading...</>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexFlow: 'column',
        mb: 4
      }}
    >
      <Typography
        variant='h6'
        component='h3'
        sx={{ textAlign: 'center', mb: '1.5rem' }}
      >
        Update user photo
      </Typography>

      <Avatar
        sx={{ width: 108, height: 108, mb: 2 }}
        variant='square'
        src={user?.profile?.photo || ''}
        alt={user?.username ?? 'Anonimous'}
      />

      <ImageUpload userId={user.id} />
    </Box>
  );
}
