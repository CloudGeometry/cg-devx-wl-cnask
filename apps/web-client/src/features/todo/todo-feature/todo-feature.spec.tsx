import { render } from '@testing-library/react';

import TodoFeature from './todo-feature';

describe('TodoFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TodoFeature />);
    expect(baseElement).toBeTruthy();
  });
});
