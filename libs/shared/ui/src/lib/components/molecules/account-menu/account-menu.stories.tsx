import type { Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { AccountMenu } from './account-menu';

const Story: Meta<typeof AccountMenu> = {
  component: AccountMenu,
  title: 'AccountMenu',
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};
export default Story;

export const Primary = {
  args: {
    user: {
      id: '1',
      username: 'test',
      email: '',
      role: 'user',
    },
    logout: () => undefined,
  },
};
