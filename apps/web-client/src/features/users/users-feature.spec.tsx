import { render } from '@testing-library/react';

import UsersFeature from './users-feature';

describe('UsersFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UsersFeature />);
    expect(baseElement).toBeTruthy();
  });
});
