import type { Meta } from '@storybook/react';
import { LocaleSelect } from './locale-select';

const Story: Meta<typeof LocaleSelect> = {
  component: LocaleSelect,
  title: 'LocaleSelect'
};
export default Story;

export const Primary = {
  args: {}
};
