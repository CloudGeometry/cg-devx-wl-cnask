import { render } from '@testing-library/react';

import TodoForm from './todo-form';

describe('TodoForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TodoForm />);
    expect(baseElement).toBeTruthy();
  });
});
