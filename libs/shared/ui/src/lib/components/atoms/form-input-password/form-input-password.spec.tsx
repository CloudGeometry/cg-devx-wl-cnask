import { render } from '@testing-library/react';

import FormInputPassword from './form-input-password';

describe('FormInputPassword', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormInputPassword />);
    expect(baseElement).toBeTruthy();
  });
});
