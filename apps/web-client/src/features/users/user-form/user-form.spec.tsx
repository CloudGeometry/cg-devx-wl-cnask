import { render } from '@testing-library/react';

import UserForm from './user-form';

describe('UserForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserForm />);
    expect(baseElement).toBeTruthy();
  });
});
