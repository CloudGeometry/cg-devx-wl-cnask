import { render } from '@testing-library/react';

import TodoAdd from './todo-add';

describe('TodoAdd', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TodoAdd />);
    expect(baseElement).toBeTruthy();
  });
});
