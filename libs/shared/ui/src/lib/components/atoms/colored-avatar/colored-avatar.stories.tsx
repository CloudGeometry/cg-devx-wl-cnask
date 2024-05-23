import type { Meta } from '@storybook/react';
import { ColoredAvatar } from './colored-avatar';

const Story: Meta<typeof ColoredAvatar> = {
  component: ColoredAvatar,
  title: 'ColoredAvatar',
};
export default Story;

export const Primary = {
  args: {},
};
