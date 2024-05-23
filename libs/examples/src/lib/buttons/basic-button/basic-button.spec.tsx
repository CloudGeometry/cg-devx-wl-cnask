import { render } from '@testing-library/react';

import BasicButton from './basic-button';

describe('BasicButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BasicButton />);
    expect(baseElement).toBeTruthy();
  });
});
