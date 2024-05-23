import {
  FormDatePicker,
  FormInput,
  StyledLoadingButton
} from '@cnask/shared/ui';
import { VolumeDown, VolumeUp } from '@mui/icons-material';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import dayjs from 'dayjs';
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext
} from 'react-hook-form';

/* eslint-disable-next-line */
export interface FormProps {}

export function Form(props: FormProps) {
  const methods = useForm({
    // 👇 Default Values
    defaultValues: {
      username: '',
      password: '',
      dueDate: dayjs().format('YYYY-MM-DD'),
      select: 10,
      slider: 42,
      switch: true,
      toggleButtons: 'left'
    }
  });

  // 👇 Submit Handler
  const onSubmitHandler = (values: any) => {
    alert('values: ' + JSON.stringify(values));
  };
  return (
    <Grid
      container
      justifyContent='center'
      rowSpacing={5}
      sx={{
        maxWidth: { sm: '45rem' },
        marginInline: 'auto'
      }}
    >
      <Grid
        item
        xs={12}
        sm={6}
      >
        <FormProvider {...methods}>
          <Box
            display='flex'
            flexDirection='column'
            component='form'
            noValidate
            autoComplete='off'
            onSubmit={methods.handleSubmit(onSubmitHandler)}
          >
            <Typography
              variant='h6'
              component='h1'
              sx={{ textAlign: 'center', mb: '1.5rem' }}
            >
              Check out MUI inputs
            </Typography>

            <FormInput
              label='Enter your username'
              type='text'
              name='username'
              autoComplete='username'
              required
              focused
            />
            <FormInput
              autoComplete='current-password'
              type='password'
              label='Password'
              name='password'
              required
              focused
            />

            <FormDatePicker
              label='Due date'
              name='dueDate'
              rules={{ required: true }}
            />

            <FormSelect name='select' />

            <FormSlider name='slider' />
            <FormSwitch name='switch' />

            <FormToggleButtons name='toggleButtons' />

            <StyledLoadingButton loading={false}>Submit</StyledLoadingButton>
          </Box>
        </FormProvider>
      </Grid>
    </Grid>
  );
}

export default Form;

const ButtonGroupForm = ({ name }: { name: string }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=''
      render={({ field }) => (
        <ButtonGroup
          {...field}
          sx={{
            width: 'fit-content'
          }}
          variant='contained'
          aria-label='outlined primary button group'
        >
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      )}
    />
  );
};

const FormSelect = ({ name }: { name: string }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=''
      render={({ field }) => (
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Age</InputLabel>
          <Select
            {...field}
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            label='Age'
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      )}
    />
  );
};

const FormSlider = ({ name }: { name: string }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=''
      render={({ field }) => (
        <Box sx={{ width: 200 }}>
          <Stack
            spacing={2}
            direction='row'
            sx={{ my: 1 }}
            alignItems='center'
          >
            <VolumeDown />
            <Slider
              {...field}
              aria-label='Volume'
            />
            <VolumeUp />
          </Stack>
        </Box>
      )}
    />
  );
};

const FormSwitch = ({ name }: { name: string }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <Switch {...field} />}
    />
  );
};

const FormToggleButtons = ({ name }: { name: string }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, ...field } }) => (
        <ToggleButtonGroup
          {...field}
          onChange={(event, value) => {
            onChange(value);
          }}
          exclusive
          aria-label='Medium sizes'
        >
          <ToggleButton
            value='left'
            key='left'
          >
            <FormatAlignLeftIcon />
          </ToggleButton>
          ,
          <ToggleButton
            value='center'
            key='center'
          >
            <FormatAlignCenterIcon />
          </ToggleButton>
          ,
          <ToggleButton
            value='right'
            key='right'
          >
            <FormatAlignRightIcon />
          </ToggleButton>
          ,
          <ToggleButton
            value='justify'
            key='justify'
          >
            <FormatAlignJustifyIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      )}
    />
  );
};
