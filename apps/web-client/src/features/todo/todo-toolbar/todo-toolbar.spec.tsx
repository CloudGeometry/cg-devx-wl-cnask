import { render } from '@testing-library/react';

import TodoToolbar from './todo-toolbar';

describe('TodoSearchBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TodoToolbar />);
    expect(baseElement).toBeTruthy();
  });
});
