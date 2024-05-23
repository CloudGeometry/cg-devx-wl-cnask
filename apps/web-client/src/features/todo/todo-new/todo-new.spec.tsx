import { render } from '@testing-library/react';

import TodoNew from './todo-new';

describe('TodoNew', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TodoNew />);
    expect(baseElement).toBeTruthy();
  });
});
