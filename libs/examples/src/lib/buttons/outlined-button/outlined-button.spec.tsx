import { render } from '@testing-library/react';

import OutlinedButton from './outlined-button';

describe('OutlinedButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OutlinedButton />);
    expect(baseElement).toBeTruthy();
  });
});
