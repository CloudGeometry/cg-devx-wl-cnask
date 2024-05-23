import { render } from '@testing-library/react';

import FormInput from './form-input';

describe('FormInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormInput name={'test'} />);
    expect(baseElement).toBeTruthy();
  });
});
