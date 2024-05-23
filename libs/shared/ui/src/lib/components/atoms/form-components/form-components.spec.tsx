import { render } from '@testing-library/react';

import { FormLayout } from './form-components';

describe('FormComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormLayout>test</FormLayout>);
    expect(baseElement).toBeTruthy();
  });
});
