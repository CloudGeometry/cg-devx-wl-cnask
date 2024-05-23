import type { Meta } from '@storybook/react';
import { Logo } from './logo';

const Story: Meta<typeof Logo> = {
  component: Logo,
  title: 'Logo',
};
export default Story;

export const Primary = {
  args: {},
};
