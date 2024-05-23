import { render } from '@testing-library/react';

import AccountMenu from './account-menu';

describe('AccountMenu', () => {

  const defaultProps = {
    name: 'Any',
    surname: 'One',
  }

  it('should render successfully', () => {
    const { baseElement } = render(<AccountMenu {...defaultProps} />);
    expect(baseElement).toBeTruthy();
  });
});
