import { render } from '@testing-library/react';

import TodoTableView from './todo-table-view';

describe('TodoTableView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TodoTableView />);
    expect(baseElement).toBeTruthy();
  });
});
