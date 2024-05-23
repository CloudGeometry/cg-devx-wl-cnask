import { render } from '@testing-library/react';

import FormAutocomplete from './form-autocomplete';

describe('FormAutocomplete', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormAutocomplete />);
    expect(baseElement).toBeTruthy();
  });
});
