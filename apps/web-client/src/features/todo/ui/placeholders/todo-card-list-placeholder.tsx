import { Box, Skeleton } from '@mui/material';

export const TodoCardListPlaceholder = () => (
  <Box p={3}>
    {Array.from({ length: 5 }).map((_, index) => (
      <TodoCardPlaceholder key={index} />
    ))}
  </Box>
);

export const TodoCardPlaceholder = () => {
  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        flexFlow: 'row nowrap',
        p: 2,
        borderRadius: '16px',
        border: '1px solid ' + theme.palette.grey[600],
        maxWidth: 600,
        width: '100%',
        margin: 'auto auto 20px auto'
      })}
    >
      <Box
        sx={{
          minWidth: '52px',
          height: '42px',
          display: 'flex',
          margin: 'auto 0'
        }}
      >
        <Skeleton
          variant='rectangular'
          sx={{
            margin: 'auto 0',
            borderRadius: '4px',
            width: '20px',
            height: '20px'
          }}
        />
      </Box>

      <Skeleton
        variant='text'
        sx={{
          borderRadius: '4px',
          width: '108px',
          height: '24px',
          margin: 'auto 0'
        }}
      />
    </Box>
  );
};
