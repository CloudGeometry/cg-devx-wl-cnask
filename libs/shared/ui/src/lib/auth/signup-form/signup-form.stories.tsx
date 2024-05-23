import type { Meta } from '@storybook/react';
import { SignUpForm } from './signup-form';

const Story: Meta<typeof SignUpForm> = {
  component: SignUpForm,
  title: 'SignUpForm',
};
export default Story;

export const Primary = {
  args: {},
};
