import { render } from '@testing-library/react';

import TodoEdit from './todo-edit';

describe('TodoEdit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TodoEdit />);
    expect(baseElement).toBeTruthy();
  });
});
