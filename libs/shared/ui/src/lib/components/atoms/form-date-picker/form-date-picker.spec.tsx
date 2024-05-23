import { render } from '@testing-library/react';

import FormDatePicker from './form-date-picker';

describe('FormDatePicker', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormDatePicker />);
    expect(baseElement).toBeTruthy();
  });
});
