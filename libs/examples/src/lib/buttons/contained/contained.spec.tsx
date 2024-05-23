import { render } from '@testing-library/react';

import Contained from './contained';

describe('Contained', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Contained />);
    expect(baseElement).toBeTruthy();
  });
});
