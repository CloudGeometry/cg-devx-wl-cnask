import type { Meta } from '@storybook/react';
import { HashRouter } from 'react-router-dom';
import { RouterLink } from './router-link';

const Story: Meta<typeof RouterLink> = {
  component: RouterLink,
  title: 'RouterLink',
  decorators: [
    (Story) => (
      <HashRouter>
        <Story />
      </HashRouter>
    ),
  ],
};
export default Story;

export const Primary = {
  args: {
    children: 'Hi there!',
  },
};
