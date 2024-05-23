import { render } from '@testing-library/react';

import LoadingButton from './loading-button';

describe('LoadingButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LoadingButton />);
    expect(baseElement).toBeTruthy();
  });
});
