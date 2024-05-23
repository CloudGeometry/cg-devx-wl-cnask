import type { Meta } from '@storybook/react';
import { ThemeProvider } from '../theme-provider/theme-provider';
import { ThemeSwitcher } from './theme-switcher';

const Story: Meta<typeof ThemeSwitcher> = {
  component: ThemeSwitcher,
  title: 'ThemeSwitcher',
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};
export default Story;

export const Primary = {
  args: {},
};
