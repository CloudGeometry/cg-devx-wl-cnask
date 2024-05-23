import { render } from '@testing-library/react';

import Paginator from './paginator';

describe('Paginator', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Paginator />);
    expect(baseElement).toBeTruthy();
  });
});
