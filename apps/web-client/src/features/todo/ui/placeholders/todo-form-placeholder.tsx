import { Box, Skeleton } from '@mui/material';

export const TodoFormPlaceholder = () => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      p={1}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Box
          key={index}
          mb={3}
        >
          <Skeleton
            variant='rectangular'
            sx={{
              borderRadius: '4px',
              height: '56px'
            }}
          />
        </Box>
      ))}

      <Skeleton
        variant='rectangular'
        sx={{
          borderRadius: '4px',
          py: '1rem',
          mt: 2,
          width: '80%',
          marginInline: 'auto',
          height: '56px'
        }}
      />
    </Box>
  );
};
