import { render } from '@testing-library/react';

import RouterLink from './router-link';

describe('RouterLink', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RouterLink to={'/'} />);
    expect(baseElement).toBeTruthy();
  });
});
