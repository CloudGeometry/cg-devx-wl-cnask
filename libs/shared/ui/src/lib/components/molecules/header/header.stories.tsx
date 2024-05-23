import type { Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './header';

const Story: Meta<typeof Header> = {
  component: Header,
  title: 'Header',
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
