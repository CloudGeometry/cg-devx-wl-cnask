import type { Meta } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInput } from './form-input';

const meta = {
  title: 'FormInput',
  component: FormInput,
  decorators: [
    (Story) => (
      <FormProvider {...useForm()}>
        <Story />
      </FormProvider>
    ),
  ],
  args: {
    name: 'name',
  },
} satisfies Meta<typeof FormInput>;

export default meta;

export const Primary = {
  args: {
    name: 'name',
  },
};
