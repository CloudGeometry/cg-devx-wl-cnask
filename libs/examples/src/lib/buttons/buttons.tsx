import { Box, Grid } from '@mui/material';
import BasicButtons from './basic-button/basic-button';
import OutlinedButtons from './outlined-button/outlined-button';
import TextButtons from './text-button/text-button';
import ContainedButtons from './contained/contained';

export function ButtonsView() {
  return (
    <Grid
      container
      spacing={2}
    >
      <Grid
        item
        xs={12}
      >
        <h4>Basic :</h4>
        <BasicButtons />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <h4>Outlined :</h4>

        <OutlinedButtons />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <h4>Text :</h4>

        <TextButtons />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <h4>Contained :</h4>

        <ContainedButtons />
      </Grid>
    </Grid>
  );
}
