import { render } from '@testing-library/react';

import AuthFormLayout from './auth-form-layout';

describe('AuthFormLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthFormLayout />);
    expect(baseElement).toBeTruthy();
  });
});
