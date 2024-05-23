import { render } from '@testing-library/react';

import TodoList from './todo-list';

describe('TodoList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TodoList />);
    expect(baseElement).toBeTruthy();
  });
});
