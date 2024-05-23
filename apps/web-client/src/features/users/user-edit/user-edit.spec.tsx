import { render } from '@testing-library/react';

import UserEdit from './user-edit';

describe('UserEdit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserEdit />);
    expect(baseElement).toBeTruthy();
  });
});
