import { render } from '@testing-library/react';

import Notistack from './notistack';

describe('Notistack', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Notistack />);
    expect(baseElement).toBeTruthy();
  });
});
