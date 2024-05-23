import { render } from '@testing-library/react';

import UsersList from './users-list';

describe('UsersList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UsersList />);
    expect(baseElement).toBeTruthy();
  });
});
