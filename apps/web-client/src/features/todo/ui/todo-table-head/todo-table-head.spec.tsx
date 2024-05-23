import { render } from '@testing-library/react';

import TodoTableHead from './todo-table-head';

describe('TodoTableHead', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TodoTableHead />);
    expect(baseElement).toBeTruthy();
  });
});
