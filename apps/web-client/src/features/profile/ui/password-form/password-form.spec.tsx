import { render } from '@testing-library/react';

import PasswordForm from './password-form';

describe('PasswordForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PasswordForm />);
    expect(baseElement).toBeTruthy();
  });
});
