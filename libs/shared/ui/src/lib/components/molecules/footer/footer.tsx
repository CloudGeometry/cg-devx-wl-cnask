import { LangSwitcher } from '@cnask/i18n/feature';
import { Box, Container, Paper, Typography } from '@mui/material';
import { ThemeSwitcher } from '../../../theme';

export function Footer() {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2
      }}
    >
      <Container maxWidth={'lg'}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box>
            <LangSwitcher />
          </Box>
          <Box>
            <ThemeSwitcher />
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              justifyContent: 'flex-end',
              display: 'flex'
            }}
          >
            <Typography variant={'caption'}>
              all rights reserved © {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Paper>
  );
}

export default Footer;
