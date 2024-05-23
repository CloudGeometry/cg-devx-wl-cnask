import { render } from '@testing-library/react';

import UserItem from './user-item';

describe('UserItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserItem />);
    expect(baseElement).toBeTruthy();
  });
});
